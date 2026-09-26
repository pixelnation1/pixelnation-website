import "server-only";
import { getChicagoBusinessDate } from "@/lib/communities/business-date";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type TodayCheckIn = {
  communitySlug: string;
  communityName: string;
  businessDate: string;
  locationId: string;
  /**
   * Points from a matching check_in ledger row for this check-in, or null when
   * none exists (e.g. historical pre-points check-ins). Never invent +5.
   */
  supportPointsAwarded: number | null;
};

/** Public account history row — community name + date only (no DB ids). */
export type OwnCheckInSummary = {
  communityName: string;
  businessDate: string;
};

export type OwnCheckInHistory = {
  totalCount: number;
  recent: OwnCheckInSummary[];
};

type CommunityEmbed = {
  slug: string;
  name: string;
};

type TodayCheckInRow = {
  id: string;
  business_date: string;
  location_id: string;
  communities: CommunityEmbed | CommunityEmbed[] | null;
};

type CheckInLedgerRow = {
  source_id: string;
  points: number;
};

type HistoryCheckInRow = {
  business_date: string;
  communities: CommunityEmbed | CommunityEmbed[] | null;
};

function unwrapCommunity(
  value: CommunityEmbed | CommunityEmbed[] | null,
): CommunityEmbed | null {
  if (!value) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

/**
 * Own check-ins for the current Chicago business day.
 * Uses the signed-in session client (RLS: check_ins_select_own).
 */
export async function fetchOwnCheckInsForToday(
  profileId: string,
): Promise<TodayCheckIn[]> {
  if (!isSupabaseBrowserConfigured()) return [];

  const businessDate = getChicagoBusinessDate();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("check_ins")
    .select("id, business_date, location_id, communities(slug, name)")
    .eq("profile_id", profileId)
    .eq("business_date", businessDate)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  const rows = data as unknown as TodayCheckInRow[];
  const checkInIds = rows.map((row) => row.id).filter(Boolean);

  const pointsByCheckInId = new Map<string, number>();
  if (checkInIds.length > 0) {
    const { data: ledgerRows } = await supabase
      .from("support_point_entries")
      .select("source_id, points")
      .eq("profile_id", profileId)
      .eq("source", "check_in")
      .in("source_id", checkInIds);

    for (const entry of (ledgerRows ?? []) as CheckInLedgerRow[]) {
      if (entry.source_id && typeof entry.points === "number") {
        pointsByCheckInId.set(entry.source_id, entry.points);
      }
    }
  }

  return rows
    .map((row) => {
      const community = unwrapCommunity(row.communities);
      if (!community?.slug || !community.name) return null;
      const awarded = pointsByCheckInId.get(row.id);
      return {
        communitySlug: community.slug,
        communityName: community.name,
        businessDate: row.business_date,
        locationId: row.location_id,
        supportPointsAwarded:
          typeof awarded === "number" ? awarded : null,
      };
    })
    .filter((row): row is TodayCheckIn => row !== null);
}

/**
 * Authenticated customer's own check-in history for /account.
 * Total count + up to `limit` recent rows (newest first). RLS enforces own rows.
 */
export async function fetchOwnCheckInHistory(
  profileId: string,
  limit = 10,
): Promise<OwnCheckInHistory> {
  if (!isSupabaseBrowserConfigured()) {
    return { totalCount: 0, recent: [] };
  }

  const supabase = await createSupabaseServerClient();
  const safeLimit = Math.min(Math.max(limit, 1), 25);

  const [countResult, recentResult] = await Promise.all([
    supabase
      .from("check_ins")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId),
    supabase
      .from("check_ins")
      .select("business_date, communities(name)")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(safeLimit),
  ]);

  const totalCount = countResult.count ?? 0;
  if (recentResult.error || !recentResult.data) {
    return { totalCount, recent: [] };
  }

  const recent = (recentResult.data as unknown as HistoryCheckInRow[])
    .map((row) => {
      const community = unwrapCommunity(row.communities);
      if (!community?.name || !row.business_date) return null;
      return {
        communityName: community.name,
        businessDate: row.business_date,
      };
    })
    .filter((row): row is OwnCheckInSummary => row !== null);

  return { totalCount, recent };
}
