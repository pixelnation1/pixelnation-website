-- Top Supporters: October 2026 reward period, period-scoped public board,
-- and check-in ledger attachment to the active reward period.
-- Extends 20260925 / 20260926. Do not modify those migrations.
-- Do not apply 20260805_trade_values.sql as part of this change.
--
-- Does NOT rewrite historical support_point_entries (September test rows stay
-- reward_period_id NULL and never appear on the October board).

-- ---------------------------------------------------------------------------
-- public_leaderboard: restrict to the in-window (non-closed) reward period.
-- Previously summed ALL ledger rows (lifetime). Prize standings must not.
-- When no period window contains now(), the view returns no rows.
-- Prefer leaderboard_for_period(uuid) for a specific period in app code.
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
  and e.reward_period_id in (
    select rp.id
    from public.reward_periods rp
    where rp.status is distinct from 'closed'
      and now() >= rp.starts_at
      and now() < rp.ends_at
  )
group by c.id, c.slug, c.name, p.id, p.display_name
having sum(e.points) > 0;

grant select on public.public_leaderboard to anon, authenticated;

-- ---------------------------------------------------------------------------
-- October 2026 reward period (idempotent)
-- America/Chicago: 2026-10-01 00:00 inclusive → 2026-11-01 00:00 exclusive
-- Status scheduled until the window opens (app derives "active" from clock).
-- ---------------------------------------------------------------------------

insert into public.reward_periods (name, starts_at, ends_at, status)
select
  'October 2026',
  timezone('America/Chicago', timestamp '2026-10-01 00:00:00'),
  timezone('America/Chicago', timestamp '2026-11-01 00:00:00'),
  'scheduled'::public.reward_period_status
where not exists (
  select 1
  from public.reward_periods rp
  where rp.name = 'October 2026'
    and rp.starts_at = timezone('America/Chicago', timestamp '2026-10-01 00:00:00')
    and rp.ends_at = timezone('America/Chicago', timestamp '2026-11-01 00:00:00')
);

-- ---------------------------------------------------------------------------
-- record_community_check_in_with_points
-- Same behavior as 20260926, plus: when now() falls inside a non-closed
-- reward period window, set reward_period_id on the ledger row. Outside any
-- window, leave reward_period_id NULL (lifetime /account SUM still includes
-- those rows; period boards do not).
-- Points remain hardcoded +5. Duplicate check-in protection unchanged.
-- ---------------------------------------------------------------------------

create or replace function public.record_community_check_in_with_points(
  p_profile_id uuid,
  p_community_id uuid,
  p_location_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_check_in_id uuid;
  v_business_date date;
  v_location_id text;
  v_community_name text;
  v_community_slug text;
  v_community_active boolean;
  v_account_status public.account_status;
  v_points integer := 5;
  v_reward_period_id uuid;
begin
  if p_profile_id is null or p_community_id is null then
    raise exception 'profile_id and community_id are required';
  end if;

  v_location_id := nullif(trim(p_location_id), '');
  if v_location_id is null then
    raise exception 'location_id is required';
  end if;

  select account_status
    into v_account_status
  from public.profiles
  where id = p_profile_id;

  if v_account_status is null then
    raise exception 'profile not found';
  end if;

  if v_account_status is distinct from 'active' then
    return jsonb_build_object(
      'ok', false,
      'code', 'suspended'
    );
  end if;

  select c.name, c.slug, c.active
    into v_community_name, v_community_slug, v_community_active
  from public.communities c
  where c.id = p_community_id;

  if v_community_name is null then
    return jsonb_build_object(
      'ok', false,
      'code', 'invalid_community'
    );
  end if;

  if not v_community_active then
    return jsonb_build_object(
      'ok', false,
      'code', 'inactive_community',
      'communityName', v_community_name,
      'communitySlug', v_community_slug
    );
  end if;

  begin
    insert into public.check_ins (profile_id, community_id, location_id)
    values (p_profile_id, p_community_id, v_location_id)
    returning id, business_date into v_check_in_id, v_business_date;
  exception
    when unique_violation then
      return jsonb_build_object(
        'ok', false,
        'code', 'already_checked_in',
        'communityName', v_community_name,
        'communitySlug', v_community_slug
      );
  end;

  -- Attach to the in-window reward period when one exists; else NULL.
  select rp.id
    into v_reward_period_id
  from public.reward_periods rp
  where rp.status is distinct from 'closed'
    and now() >= rp.starts_at
    and now() < rp.ends_at
  order by rp.starts_at asc
  limit 1;

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
      v_points,
      'check_in',
      v_check_in_id::text,
      v_reward_period_id,
      null,
      null
    );
  exception
    when unique_violation then
      null;
  end;

  return jsonb_build_object(
    'ok', true,
    'businessDate', v_business_date,
    'pointsAwarded', v_points,
    'communityName', v_community_name,
    'communitySlug', v_community_slug,
    'locationId', v_location_id
  );
end;
$$;

comment on function public.record_community_check_in_with_points(uuid, uuid, text) is
  'Server-only atomic check-in + +5 Support Points. Sets reward_period_id when now() is inside a non-closed period window; otherwise NULL. created_by is NULL. Call via service role after session auth; never grant to anon/authenticated.';

revoke all on function public.record_community_check_in_with_points(uuid, uuid, text)
  from public, anon, authenticated;

grant execute on function public.record_community_check_in_with_points(uuid, uuid, text)
  to service_role;
