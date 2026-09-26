import "server-only";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Public account balance row — community name + points only (no DB ids). */
export type OwnCommunitySupportBalance = {
  communityName: string;
  points: number;
};

export type OwnSupportPointSummary = {
  totalPoints: number;
  /** Non-zero balances only, highest points first then name. */
  byCommunity: OwnCommunitySupportBalance[];
};

type SupportPointRow = {
  points: number;
  communities: { name: string } | { name: string }[] | null;
};

function unwrapCommunityName(
  value: SupportPointRow["communities"],
): string | null {
  if (!value) return null;
  if (Array.isArray(value)) return value[0]?.name ?? null;
  return value.name ?? null;
}

/**
 * Authenticated customer's Support Points from the ledger (SUM of own rows).
 * RLS: support_points_select_own. No balance column — ledger is source of truth.
 */
export async function fetchOwnSupportPointSummary(
  profileId: string,
): Promise<OwnSupportPointSummary> {
  if (!isSupabaseBrowserConfigured()) {
    return { totalPoints: 0, byCommunity: [] };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("support_point_entries")
    .select("points, communities(name)")
    .eq("profile_id", profileId);

  if (error || !data) {
    return { totalPoints: 0, byCommunity: [] };
  }

  const byName = new Map<string, number>();
  let totalPoints = 0;

  for (const row of data as unknown as SupportPointRow[]) {
    const points = typeof row.points === "number" ? row.points : 0;
    totalPoints += points;
    const name = unwrapCommunityName(row.communities);
    if (!name) continue;
    byName.set(name, (byName.get(name) ?? 0) + points);
  }

  const byCommunity = [...byName.entries()]
    .map(([communityName, points]) => ({ communityName, points }))
    .filter((row) => row.points !== 0)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.communityName.localeCompare(b.communityName);
    });

  return { totalPoints, byCommunity };
}

export type OwnSupportActivityRow = {
  points: number;
  communityName: string;
  sourceLabel: string;
  createdAt: string;
};

type ActivityRow = {
  points: number;
  source: string;
  created_at: string;
  communities: { name: string } | { name: string }[] | null;
};

function activitySourceLabel(source: string): string {
  switch (source) {
    case "check_in":
      return "Community Check-In";
    case "purchase":
      return "In-Store Purchase";
    case "reversal":
      return "Reversal";
    case "adjustment":
      return "Adjustment";
    case "event":
      return "Event";
    case "community_builder":
      return "Community Builder";
    default:
      return "Support Activity";
  }
}

/** Compact recent ledger activity for /account — no ids or Square references. */
export async function fetchOwnRecentSupportActivity(
  profileId: string,
  limit = 8,
): Promise<OwnSupportActivityRow[]> {
  if (!isSupabaseBrowserConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("support_point_entries")
    .select("points, source, created_at, communities(name)")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return (data as unknown as ActivityRow[])
    .map((row) => {
      const name = unwrapCommunityName(row.communities);
      if (!name) return null;
      return {
        points: row.points,
        communityName: name,
        sourceLabel: activitySourceLabel(row.source),
        createdAt: row.created_at,
      };
    })
    .filter((row): row is OwnSupportActivityRow => row != null);
}
