-- Atomic community check-in + Support Points award.
-- Extends 20260925_pixelnation_communities.sql. Do not modify that migration.
-- Do not apply 20260805_trade_values.sql as part of this change.

-- ---------------------------------------------------------------------------
-- record_community_check_in_with_points
--
-- Called ONLY from the Next.js check-in API after session auth, via the
-- service-role client. The API passes the session profile id — never trust
-- browser-supplied profile_id / points / business_date / created_by.
--
-- Service role bypasses RLS and auth.uid() is null, so this function:
--   • takes p_profile_id from the server caller (not from the HTTP body)
--   • re-validates active profile + active community as defense in depth
--   • hardcodes points = 5 and source = check_in (never parameters)
--   • sets created_by = NULL for automatic awards (does NOT use
--     staff_insert_support_point_entry; that RPC sets created_by = auth.uid()
--     for staff adjustments and must not be used here)
--
-- Single transaction: check_in insert + ledger insert both commit or neither.
-- On unique (profile_id, community_id, business_date): returns already_checked_in
-- without inserting a ledger row (no second +5).
-- Ledger uniqueness (profile_id, community_id, source, source_id) prevents a
-- second award for the same check-in id if a retry somehow re-enters.
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
      -- Same community, same America/Chicago business day.
      -- Do NOT insert a ledger row.
      return jsonb_build_object(
        'ok', false,
        'code', 'already_checked_in',
        'communityName', v_community_name,
        'communitySlug', v_community_slug
      );
  end;

  -- Append-only ledger row. created_by NULL = automatic system award.
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
      null,
      null,
      null
    );
  exception
    when unique_violation then
      -- Idempotency: same check-in id already has a ledger row.
      -- Should not occur after a fresh check_in insert in this transaction;
      -- treat as already awarded rather than failing the check-in.
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
  'Server-only atomic check-in + +5 Support Points. created_by is NULL (automatic award, not staff). Call via service role after session auth; never grant to anon/authenticated.';

revoke all on function public.record_community_check_in_with_points(uuid, uuid, text)
  from public, anon, authenticated;

grant execute on function public.record_community_check_in_with_points(uuid, uuid, text)
  to service_role;
