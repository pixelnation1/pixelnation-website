-- Square in-store purchase Support Points.
-- Append-only ledger unchanged: awards insert source='purchase'; refunds insert
-- source='reversal'. Does NOT rewrite historical rows or touch trade values.
-- SQUARE_SUPPORT_POINTS_ENABLED is enforced in the app (default off).

-- ---------------------------------------------------------------------------
-- Category → community mapping (admin-managed; no hardcoded product lists)
-- ---------------------------------------------------------------------------

create table public.square_community_mappings (
  id uuid primary key default gen_random_uuid(),
  square_category_id text not null,
  square_category_name text not null default '',
  community_id uuid not null references public.communities (id) on delete restrict,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint square_community_mappings_category_id_nonempty
    check (char_length(trim(square_category_id)) > 0)
);

create unique index square_community_mappings_category_uidx
  on public.square_community_mappings (square_category_id);

create index square_community_mappings_community_idx
  on public.square_community_mappings (community_id)
  where active = true;

create or replace function public.square_community_mappings_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger square_community_mappings_set_updated_at
  before update on public.square_community_mappings
  for each row
  execute function public.square_community_mappings_set_updated_at();

-- ---------------------------------------------------------------------------
-- Award snapshot per Square order × community (for refund reversal lookup)
-- ---------------------------------------------------------------------------

create table public.square_order_community_awards (
  id uuid primary key default gen_random_uuid(),
  square_order_id text not null,
  community_id uuid not null references public.communities (id) on delete restrict,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  points_awarded integer not null check (points_awarded > 0),
  qualifying_cents bigint not null check (qualifying_cents >= 0),
  support_point_entry_id uuid references public.support_point_entries (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (square_order_id, community_id)
);

create index square_order_community_awards_order_idx
  on public.square_order_community_awards (square_order_id);

create index square_order_community_awards_profile_idx
  on public.square_order_community_awards (profile_id);

-- ---------------------------------------------------------------------------
-- Staff-visible unmatched / needs-review Square purchases (no card data)
-- ---------------------------------------------------------------------------

create type public.square_purchase_match_status as enum (
  'no_email',
  'no_match',
  'needs_review',
  'feature_disabled',
  'ignored'
);

create table public.square_unmatched_purchases (
  id uuid primary key default gen_random_uuid(),
  square_order_id text not null,
  square_payment_id text,
  square_refund_id text,
  occurred_at timestamptz not null default now(),
  customer_email text,
  match_status public.square_purchase_match_status not null,
  qualifying_totals jsonb not null default '[]'::jsonb,
  detail text,
  created_at timestamptz not null default now(),
  constraint square_unmatched_purchases_order_id_nonempty
    check (char_length(trim(square_order_id)) > 0)
);

-- One staff-review row per order (purchase path) or per refund (refund path).
create unique index square_unmatched_purchases_order_uidx
  on public.square_unmatched_purchases (square_order_id)
  where square_refund_id is null;

create unique index square_unmatched_purchases_refund_uidx
  on public.square_unmatched_purchases (square_refund_id)
  where square_refund_id is not null;

create index square_unmatched_purchases_status_idx
  on public.square_unmatched_purchases (match_status, occurred_at desc);

-- ---------------------------------------------------------------------------
-- Webhook event receipt log (idempotent by Square event_id; no secrets/PII)
-- ---------------------------------------------------------------------------

create table public.square_webhook_events (
  id uuid primary key default gen_random_uuid(),
  square_event_id text not null,
  event_type text not null,
  square_order_id text,
  square_payment_id text,
  square_refund_id text,
  outcome text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint square_webhook_events_event_id_nonempty
    check (char_length(trim(square_event_id)) > 0)
);

create unique index square_webhook_events_event_uidx
  on public.square_webhook_events (square_event_id);

create index square_webhook_events_created_idx
  on public.square_webhook_events (created_at desc);

-- ---------------------------------------------------------------------------
-- Helpers (service-role / staff)
-- ---------------------------------------------------------------------------

-- Match Square customer email → auth.users.email (exact, case-insensitive).
-- Never match display_name. Returns profile id only when email is unique.
create or replace function public.find_profile_id_by_auth_email(p_email text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_user_id uuid;
  v_count integer;
begin
  v_email := lower(trim(coalesce(p_email, '')));
  if v_email = '' or position('@' in v_email) = 0 then
    return null;
  end if;

  select count(*), min(u.id)
    into v_count, v_user_id
  from auth.users u
  where lower(trim(u.email)) = v_email;

  if v_count <> 1 or v_user_id is null then
    return null;
  end if;

  if not exists (
    select 1 from public.profiles p where p.id = v_user_id
  ) then
    return null;
  end if;

  return v_user_id;
end;
$$;

comment on function public.find_profile_id_by_auth_email(text) is
  'Service-role helper: exact trimmed lowercased match of auth.users.email to a profile. Never matches display_name.';

revoke all on function public.find_profile_id_by_auth_email(text)
  from public, anon, authenticated;
grant execute on function public.find_profile_id_by_auth_email(text)
  to service_role;

-- Same window rule as record_community_check_in_with_points:
-- set reward_period_id only when now() is inside a non-closed period.
create or replace function public.current_open_reward_period_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select rp.id
  from public.reward_periods rp
  where rp.status is distinct from 'closed'
    and now() >= rp.starts_at
    and now() < rp.ends_at
  order by rp.starts_at asc
  limit 1;
$$;

revoke all on function public.current_open_reward_period_id()
  from public, anon, authenticated;
grant execute on function public.current_open_reward_period_id()
  to service_role;

-- Atomic purchase award: ledger insert + award snapshot. Idempotent via unique keys.
create or replace function public.award_square_purchase_support_points(
  p_profile_id uuid,
  p_community_id uuid,
  p_points integer,
  p_source_id text,
  p_square_order_id text,
  p_qualifying_cents bigint
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_entry_id uuid;
  v_reward_period_id uuid;
  v_account_status public.account_status;
begin
  if p_profile_id is null or p_community_id is null then
    raise exception 'profile_id and community_id are required';
  end if;
  if p_points is null or p_points <= 0 then
    raise exception 'points must be positive';
  end if;
  if nullif(trim(p_source_id), '') is null then
    raise exception 'source_id is required';
  end if;
  if nullif(trim(p_square_order_id), '') is null then
    raise exception 'square_order_id is required';
  end if;
  if p_qualifying_cents is null or p_qualifying_cents < 0 then
    raise exception 'qualifying_cents must be >= 0';
  end if;

  select account_status into v_account_status
  from public.profiles
  where id = p_profile_id;

  if v_account_status is null then
    raise exception 'profile not found';
  end if;

  if v_account_status is distinct from 'active' then
    return jsonb_build_object('ok', false, 'code', 'suspended');
  end if;

  select public.current_open_reward_period_id() into v_reward_period_id;

  begin
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
      'purchase',
      trim(p_source_id),
      v_reward_period_id,
      null,
      'square_order:' || trim(p_square_order_id)
    )
    returning id into v_entry_id;
  exception
    when unique_violation then
      return jsonb_build_object('ok', true, 'code', 'already_awarded');
  end;

  insert into public.square_order_community_awards (
    square_order_id,
    community_id,
    profile_id,
    points_awarded,
    qualifying_cents,
    support_point_entry_id
  )
  values (
    trim(p_square_order_id),
    p_community_id,
    p_profile_id,
    p_points,
    p_qualifying_cents,
    v_entry_id
  )
  on conflict (square_order_id, community_id) do nothing;

  return jsonb_build_object(
    'ok', true,
    'code', 'awarded',
    'entryId', v_entry_id,
    'rewardPeriodId', v_reward_period_id
  );
end;
$$;

comment on function public.award_square_purchase_support_points(uuid, uuid, integer, text, text, bigint) is
  'Service-role only. Appends purchase Support Points with reward_period_id when now() is inside a non-closed period; otherwise NULL. Idempotent on (profile, community, purchase, source_id).';

revoke all on function public.award_square_purchase_support_points(uuid, uuid, integer, text, text, bigint)
  from public, anon, authenticated;
grant execute on function public.award_square_purchase_support_points(uuid, uuid, integer, text, text, bigint)
  to service_role;

-- Atomic reversal for a prior purchase award. Idempotent via unique ledger key.
create or replace function public.reverse_square_purchase_support_points(
  p_profile_id uuid,
  p_community_id uuid,
  p_points integer,
  p_source_id text,
  p_square_order_id text,
  p_square_refund_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_entry_id uuid;
  v_reward_period_id uuid;
begin
  if p_profile_id is null or p_community_id is null then
    raise exception 'profile_id and community_id are required';
  end if;
  if p_points is null or p_points <= 0 then
    raise exception 'points must be positive (stored as negative reversal)';
  end if;
  if nullif(trim(p_source_id), '') is null then
    raise exception 'source_id is required';
  end if;

  select public.current_open_reward_period_id() into v_reward_period_id;

  begin
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
      -p_points,
      'reversal',
      trim(p_source_id),
      v_reward_period_id,
      null,
      'square_refund:' || coalesce(nullif(trim(p_square_refund_id), ''), 'unknown')
        || ' order:' || coalesce(nullif(trim(p_square_order_id), ''), 'unknown')
    )
    returning id into v_entry_id;
  exception
    when unique_violation then
      return jsonb_build_object('ok', true, 'code', 'already_reversed');
  end;

  return jsonb_build_object(
    'ok', true,
    'code', 'reversed',
    'entryId', v_entry_id,
    'rewardPeriodId', v_reward_period_id
  );
end;
$$;

comment on function public.reverse_square_purchase_support_points(uuid, uuid, integer, text, text, text) is
  'Service-role only. Appends negative reversal rows; never deletes purchase rows. Idempotent on (profile, community, reversal, source_id).';

revoke all on function public.reverse_square_purchase_support_points(uuid, uuid, integer, text, text, text)
  from public, anon, authenticated;
grant execute on function public.reverse_square_purchase_support_points(uuid, uuid, integer, text, text, text)
  to service_role;

-- ---------------------------------------------------------------------------
-- Grants + RLS (staff select; service role writes; email never public)
-- ---------------------------------------------------------------------------

revoke all on public.square_community_mappings from anon, authenticated;
revoke all on public.square_order_community_awards from anon, authenticated;
revoke all on public.square_unmatched_purchases from anon, authenticated;
revoke all on public.square_webhook_events from anon, authenticated;

grant select on public.square_community_mappings to authenticated;
grant insert, update on public.square_community_mappings to authenticated;

grant select on public.square_order_community_awards to authenticated;
grant select on public.square_unmatched_purchases to authenticated;
grant select on public.square_webhook_events to authenticated;

alter table public.square_community_mappings enable row level security;
alter table public.square_order_community_awards enable row level security;
alter table public.square_unmatched_purchases enable row level security;
alter table public.square_webhook_events enable row level security;

create policy square_community_mappings_staff_select
  on public.square_community_mappings
  for select
  to authenticated
  using (public.is_staff());

create policy square_community_mappings_staff_insert
  on public.square_community_mappings
  for insert
  to authenticated
  with check (public.is_staff());

create policy square_community_mappings_staff_update
  on public.square_community_mappings
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy square_order_awards_staff_select
  on public.square_order_community_awards
  for select
  to authenticated
  using (public.is_staff());

create policy square_unmatched_staff_select
  on public.square_unmatched_purchases
  for select
  to authenticated
  using (public.is_staff());

create policy square_webhook_events_staff_select
  on public.square_webhook_events
  for select
  to authenticated
  using (public.is_staff());
