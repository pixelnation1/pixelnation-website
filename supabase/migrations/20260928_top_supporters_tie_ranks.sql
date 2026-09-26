-- Fix Top Supporters tie ranks: RANK by points only.
-- Equal point totals share a rank (1, 1, 3). Display name must not break ties.
-- Extends 20260927. Do not modify applied migrations.
-- Does not rewrite support_point_entries or touch trade / check-in award amounts.

-- ---------------------------------------------------------------------------
-- public_leaderboard: same period window filter as 20260927; rank by points only
-- ---------------------------------------------------------------------------

create or replace view public.public_leaderboard
with (security_invoker = false)
as
select
  community_slug,
  community_name,
  display_name,
  points,
  rank() over (
    partition by community_id
    order by points desc
  )::integer as rank
from (
  select
    c.id as community_id,
    c.slug as community_slug,
    c.name as community_name,
    p.display_name,
    sum(e.points)::integer as points
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
  having sum(e.points) > 0
) totals;

grant select on public.public_leaderboard to anon, authenticated;

-- ---------------------------------------------------------------------------
-- leaderboard_for_period: rank by points only (ties share rank)
-- ---------------------------------------------------------------------------

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
    totals.community_slug,
    totals.community_name,
    totals.display_name,
    totals.points,
    rank() over (
      partition by totals.community_id
      order by totals.points desc
    )::integer as rank
  from (
    select
      c.id as community_id,
      c.slug as community_slug,
      c.name as community_name,
      p.display_name,
      sum(e.points)::integer as points
    from public.support_point_entries e
    join public.profiles p on p.id = e.profile_id
    join public.communities c on c.id = e.community_id
    where e.reward_period_id = p_period_id
      and p.account_status = 'active'
      and c.active = true
      and c.top_supporters_enabled = true
    group by c.id, c.slug, c.name, p.id, p.display_name
    having sum(e.points) > 0
  ) totals;
$$;

revoke all on function public.leaderboard_for_period(uuid) from public, anon, authenticated;
grant execute on function public.leaderboard_for_period(uuid) to anon, authenticated;
