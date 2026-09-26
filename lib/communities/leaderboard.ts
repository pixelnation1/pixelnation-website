import "server-only";
import type { PublicLeaderboardRow } from "@/lib/communities/types";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LeaderboardRpcRow = {
  community_slug: string;
  community_name: string;
  display_name: string;
  points: number;
  rank: number;
};

function mapRow(row: LeaderboardRpcRow): PublicLeaderboardRow {
  return {
    communitySlug: row.community_slug,
    communityName: row.community_name,
    displayName: row.display_name,
    points: row.points,
    rank: row.rank,
  };
}

/**
 * Public period standings via leaderboard_for_period.
 * Returns only display_name, community, points, rank — never emails or UUIDs.
 * Safe for anonymous callers (RPC granted to anon).
 */
export async function fetchLeaderboardForPeriod(
  periodId: string,
  options?: { communitySlug?: string; limit?: number },
): Promise<PublicLeaderboardRow[]> {
  if (!isSupabaseBrowserConfigured() || !periodId) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("leaderboard_for_period", {
    p_period_id: periodId,
  });

  if (error || !data) return [];

  let rows = (data as LeaderboardRpcRow[]).map(mapRow);

  if (options?.communitySlug) {
    rows = rows.filter((r) => r.communitySlug === options.communitySlug);
  }

  // Stable presentation: rank asc, then name
  rows.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    return a.displayName.localeCompare(b.displayName);
  });

  if (options?.limit != null && options.limit > 0) {
    return rows.slice(0, options.limit);
  }

  return rows;
}

export type OwnPeriodStanding = {
  communitySlug: string;
  communityName: string;
  periodPoints: number;
  rank: number | null;
};

type OwnPeriodLedgerRow = {
  points: number;
  communities:
    | {
        name: string;
        slug: string;
        top_supporters_enabled: boolean;
      }
    | {
        name: string;
        slug: string;
        top_supporters_enabled: boolean;
      }[]
    | null;
};

function unwrapCommunity(
  value: OwnPeriodLedgerRow["communities"],
): {
  name: string;
  slug: string;
  top_supporters_enabled: boolean;
} | null {
  if (!value) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

/**
 * Signed-in customer's own points + public rank for a reward period.
 * Points: SUM of own ledger rows for that period (RLS own-select).
 * Rank: from public leaderboard_for_period (matched by display name).
 */
export async function fetchOwnPeriodStandings(input: {
  profileId: string;
  displayName: string;
  periodId: string;
}): Promise<OwnPeriodStanding[]> {
  if (!isSupabaseBrowserConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("support_point_entries")
    .select("points, communities(name, slug, top_supporters_enabled)")
    .eq("profile_id", input.profileId)
    .eq("reward_period_id", input.periodId);

  if (error || !data) return [];

  const bySlug = new Map<
    string,
    { communityName: string; periodPoints: number }
  >();

  for (const row of data as unknown as OwnPeriodLedgerRow[]) {
    const community = unwrapCommunity(row.communities);
    if (!community?.top_supporters_enabled) continue;
    const points = typeof row.points === "number" ? row.points : 0;
    const existing = bySlug.get(community.slug);
    if (existing) {
      existing.periodPoints += points;
    } else {
      bySlug.set(community.slug, {
        communityName: community.name,
        periodPoints: points,
      });
    }
  }

  const board = await fetchLeaderboardForPeriod(input.periodId);
  const rankBySlug = new Map<string, number>();
  for (const row of board) {
    if (row.displayName === input.displayName) {
      rankBySlug.set(row.communitySlug, row.rank);
    }
  }

  // Include eligible communities from the board even if this user has 0
  // (caller usually merges with the full eligible community list).
  const standings: OwnPeriodStanding[] = [...bySlug.entries()].map(
    ([communitySlug, info]) => ({
      communitySlug,
      communityName: info.communityName,
      periodPoints: info.periodPoints,
      rank:
        info.periodPoints > 0
          ? (rankBySlug.get(communitySlug) ?? null)
          : null,
    }),
  );

  standings.sort((a, b) => {
    if (b.periodPoints !== a.periodPoints) {
      return b.periodPoints - a.periodPoints;
    }
    return a.communityName.localeCompare(b.communityName);
  });

  return standings;
}
