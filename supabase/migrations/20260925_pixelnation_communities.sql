-- PixelNation Communities / Top Supporters foundation.
-- Separate from trade values. Do not apply 20260805_trade_values.sql as part of this feature.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.app_role as enum ('customer', 'staff', 'admin');

create type public.account_status as enum ('active', 'suspended');

create type public.support_point_source as enum (
  'purchase',
  'check_in',
  'event',
  'community_builder',
  'adjustment',
  'reversal'
);

create type public.reward_period_status as enum ('scheduled', 'active', 'closed');

create type public.reward_redemption_status as enum (
  'pending',
  'redeemed',
  'forfeited'
);

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  account_status public.account_status not null default 'active',
  app_role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_len check (char_length(display_name) between 1 and 40)
);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  active boolean not null default true,
  top_supporters_enabled boolean not null default false,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint communities_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.community_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  community_id uuid not null references public.communities (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (profile_id, community_id)
);

create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  community_id uuid not null references public.communities (id) on delete cascade,
  location_id text not null,
  business_date date not null,
  created_at timestamptz not null default now(),
  unique (profile_id, community_id, business_date)
);

create index check_ins_community_date_idx
  on public.check_ins (community_id, business_date);

create table public.reward_periods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.reward_period_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  closed_at timestamptz,
  constraint reward_periods_range check (ends_at > starts_at)
);

create table public.support_point_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  community_id uuid not null references public.communities (id) on delete cascade,
  points integer not null,
  source public.support_point_source not null,
  source_id text not null,
  reward_period_id uuid references public.reward_periods (id) on delete restrict,
  created_by uuid references public.profiles (id) on delete set null,
  reason text,
  created_at timestamptz not null default now(),
  constraint support_point_entries_nonzero check (points <> 0)
);

-- Same profile, community, source, and source_id cannot award twice.
create unique index support_point_entries_idempotency_idx
  on public.support_point_entries (profile_id, community_id, source, source_id);

create index support_point_entries_period_idx
  on public.support_point_entries (reward_period_id, community_id);

create table public.reward_winners (
  id uuid primary key default gen_random_uuid(),
  reward_period_id uuid not null references public.reward_periods (id) on delete restrict,
  community_id uuid not null references public.communities (id) on delete restrict,
  profile_id uuid not null references public.profiles (id) on delete restrict,
  display_name_snapshot text not null,
  rank integer not null check (rank > 0),
  points_snapshot integer not null,
  reward_amount numeric(10, 2),
  reward_type text not null,
  redemption_status public.reward_redemption_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (reward_period_id, community_id, profile_id),
  unique (reward_period_id, community_id, rank)
);

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and app_role in ('staff', 'admin')
      and account_status = 'active'
  );
$$;

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'profile id cannot change';
  end if;

  -- Customers and staff cannot change role or account status from the client.
  -- The service role (server-only) bypasses this.
  if auth.role() is distinct from 'service_role' then
    new.app_role := old.app_role;
    new.account_status := old.account_status;
  end if;

  new.created_at := old.created_at;
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_protect_privileges
  before update on public.profiles
  for each row
  execute function public.protect_profile_privileges();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chosen_name text;
begin
  chosen_name := nullif(trim(new.raw_user_meta_data ->> 'display_name'), '');
  if chosen_name is null then
    chosen_name := 'Player';
  end if;
  chosen_name := left(chosen_name, 40);

  insert into public.profiles (id, display_name)
  values (new.id, chosen_name)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Business date is always the Emporia (America/Chicago) calendar date of insert time.
create or replace function public.set_check_in_business_date()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.created_at := now();
  new.business_date := (new.created_at at time zone 'America/Chicago')::date;
  return new;
end;
$$;

create trigger check_ins_set_business_date
  before insert on public.check_ins
  for each row
  execute function public.set_check_in_business_date();

create or replace function public.prevent_ledger_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'support point entries are append-only';
end;
$$;

create trigger support_point_entries_no_update
  before update on public.support_point_entries
  for each row
  execute function public.prevent_ledger_mutation();

create trigger support_point_entries_no_delete
  before delete on public.support_point_entries
  for each row
  execute function public.prevent_ledger_mutation();

create or replace function public.prevent_reward_winner_rescore()
returns trigger
language plpgsql
as $$
begin
  if new.points_snapshot is distinct from old.points_snapshot
    or new.rank is distinct from old.rank
    or new.display_name_snapshot is distinct from old.display_name_snapshot
    or new.profile_id is distinct from old.profile_id
    or new.community_id is distinct from old.community_id
    or new.reward_period_id is distinct from old.reward_period_id
    or new.reward_amount is distinct from old.reward_amount
    or new.reward_type is distinct from old.reward_type
  then
    raise exception 'historical reward results cannot be rewritten';
  end if;
  return new;
end;
$$;

create trigger reward_winners_freeze_snapshot
  before update on public.reward_winners
  for each row
  execute function public.prevent_reward_winner_rescore();

create or replace function public.prevent_reward_winner_delete()
returns trigger
language plpgsql
as $$
begin
  raise exception 'historical reward results cannot be deleted';
end;
$$;

create trigger reward_winners_no_delete
  before delete on public.reward_winners
  for each row
  execute function public.prevent_reward_winner_delete();

-- Staff-only ledger insert. created_by is always the signed-in staff user.
create or replace function public.staff_insert_support_point_entry(
  p_profile_id uuid,
  p_community_id uuid,
  p_points integer,
  p_source public.support_point_source,
  p_source_id text,
  p_reward_period_id uuid,
  p_reason text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if not public.is_staff() then
    raise exception 'not authorized';
  end if;

  if nullif(trim(p_source_id), '') is null then
    raise exception 'source_id is required';
  end if;

  insert into public.support_point_entries (
    profile_id,
    community_id,
    points,
    source,
    source_id,
    reward_period_id,
    created_by,
    reason
  )
  values (
    p_profile_id,
    p_community_id,
    p_points,
    p_source,
    trim(p_source_id),
    p_reward_period_id,
    auth.uid(),
    nullif(trim(p_reason), '')
  )
  returning id into new_id;

  return new_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Safe public leaderboard (no auth id, email, or phone)
-- ---------------------------------------------------------------------------

create or replace view public.public_leaderboard
with (security_invoker = false)
as
select
  c.slug as community_slug,
  c.name as community_name,
  p.display_name,
  sum(e.points)::integer as points,
  rank() over (
    partition by c.id
    order by sum(e.points) desc, p.display_name
  )::integer as rank
from public.support_point_entries e
join public.profiles p on p.id = e.profile_id
join public.communities c on c.id = e.community_id
where p.account_status = 'active'
  and c.active = true
  and c.top_supporters_enabled = true
group by c.id, c.slug, c.name, p.id, p.display_name
having sum(e.points) > 0;

create or replace function public.leaderboard_for_period(p_period_id uuid)
returns table (
  community_slug text,
  community_name text,
  display_name text,
  points integer,
  rank integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.slug,
    c.name,
    p.display_name,
    sum(e.points)::integer as points,
    rank() over (
      partition by c.id
      order by sum(e.points) desc, p.display_name
    )::integer as rank
  from public.support_point_entries e
  join public.profiles p on p.id = e.profile_id
  join public.communities c on c.id = e.community_id
  where e.reward_period_id = p_period_id
    and p.account_status = 'active'
    and c.active = true
    and c.top_supporters_enabled = true
  group by c.id, c.slug, c.name, p.id, p.display_name
  having sum(e.points) > 0;
$$;

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

revoke all on public.profiles from anon, authenticated;
revoke all on public.communities from anon, authenticated;
revoke all on public.community_members from anon, authenticated;
revoke all on public.check_ins from anon, authenticated;
revoke all on public.support_point_entries from anon, authenticated;
revoke all on public.reward_periods from anon, authenticated;
revoke all on public.reward_winners from anon, authenticated;
revoke all on public.public_leaderboard from anon, authenticated;

grant select, update on public.profiles to authenticated;
grant select on public.communities to anon, authenticated;
grant select, insert, delete on public.community_members to authenticated;
grant select on public.check_ins to authenticated;
grant select on public.support_point_entries to authenticated;
grant select on public.reward_periods to anon, authenticated;
grant select on public.public_leaderboard to anon, authenticated;

revoke all on function public.is_staff() from public, anon, authenticated;
grant execute on function public.is_staff() to authenticated;

revoke all on function public.staff_insert_support_point_entry(uuid, uuid, integer, public.support_point_source, text, uuid, text) from public, anon, authenticated;
grant execute on function public.staff_insert_support_point_entry(uuid, uuid, integer, public.support_point_source, text, uuid, text) to authenticated;

revoke all on function public.leaderboard_for_period(uuid) from public, anon, authenticated;
grant execute on function public.leaderboard_for_period(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.check_ins enable row level security;
alter table public.support_point_entries enable row level security;
alter table public.reward_periods enable row level security;
alter table public.reward_winners enable row level security;

create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_staff());

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy communities_select_active
  on public.communities
  for select
  to anon, authenticated
  using (active = true);

create policy communities_select_staff
  on public.communities
  for select
  to authenticated
  using (public.is_staff());

create policy community_members_select_own
  on public.community_members
  for select
  to authenticated
  using (profile_id = auth.uid() or public.is_staff());

create policy community_members_insert_own
  on public.community_members
  for insert
  to authenticated
  with check (
    profile_id = auth.uid()
    and exists (
      select 1
      from public.communities c
      where c.id = community_id
        and c.active = true
    )
  );

create policy community_members_delete_own
  on public.community_members
  for delete
  to authenticated
  using (profile_id = auth.uid());

create policy check_ins_select_own
  on public.check_ins
  for select
  to authenticated
  using (profile_id = auth.uid() or public.is_staff());

create policy support_points_select_own
  on public.support_point_entries
  for select
  to authenticated
  using (profile_id = auth.uid() or public.is_staff());

create policy reward_periods_select
  on public.reward_periods
  for select
  to anon, authenticated
  using (true);

-- reward_winners has no client policies. Staff writes go through the service role.
-- Public standings use public_leaderboard / leaderboard_for_period.

-- ---------------------------------------------------------------------------
-- Seed communities
-- ---------------------------------------------------------------------------

insert into public.communities (name, slug, description, active, top_supporters_enabled, sort_order)
values
  ('Pokémon', 'pokemon', 'Pokémon community play and Top Supporters.', true, true, 10),
  ('Magic: The Gathering', 'magic-the-gathering', 'Magic: The Gathering community play and Top Supporters.', true, true, 20),
  ('One Piece', 'one-piece', 'One Piece Card Game community play and Top Supporters.', true, true, 30),
  ('Riftbound', 'riftbound', 'Riftbound community tracking.', true, false, 40),
  ('Gundam', 'gundam', 'Gundam Card Game community tracking.', true, false, 50),
  ('Lorcana', 'lorcana', 'Disney Lorcana community tracking.', true, false, 60),
  ('Yu-Gi-Oh!', 'yu-gi-oh', 'Yu-Gi-Oh! community tracking.', true, false, 70),
  ('CookieRun', 'cookierun', 'CookieRun community tracking.', true, false, 80),
  ('Warhammer', 'warhammer', 'Warhammer community tracking.', true, false, 90);
