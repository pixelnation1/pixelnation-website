import "server-only";
import type { RewardPeriod, RewardPeriodStatus } from "@/lib/communities/types";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RewardPeriodRow = {
  id: string;
  name: string;
  starts_at: string;
  ends_at: string;
  status: RewardPeriodStatus;
  created_at: string;
  closed_at: string | null;
};

export function mapRewardPeriod(row: RewardPeriodRow): RewardPeriod {
  return {
    id: row.id,
    name: row.name,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    status: row.status,
    createdAt: row.created_at,
    closedAt: row.closed_at,
  };
}

/**
 * Effective competition phase from the clock (America/Chicago windows stored
 * as timestamptz). DB status may stay `scheduled` until ops flips it.
 */
export type CompetitionPhase = "upcoming" | "active" | "ended";

export function getCompetitionPhase(
  period: RewardPeriod,
  now: Date = new Date(),
): CompetitionPhase {
  const starts = new Date(period.startsAt).getTime();
  const ends = new Date(period.endsAt).getTime();
  const t = now.getTime();
  if (t < starts) return "upcoming";
  if (t >= ends || period.status === "closed") return "ended";
  return "active";
}

/**
 * Public competition period for standings:
 * 1) in-window non-closed period if any
 * 2) else next upcoming scheduled/active period by starts_at
 * 3) else most recently ended period (for historical display)
 */
export async function fetchPublicCompetitionPeriod(): Promise<RewardPeriod | null> {
  if (!isSupabaseBrowserConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reward_periods")
    .select("id, name, starts_at, ends_at, status, created_at, closed_at")
    .order("starts_at", { ascending: true });

  if (error || !data || data.length === 0) return null;

  const periods = (data as RewardPeriodRow[]).map(mapRewardPeriod);
  const now = Date.now();

  const inWindow = periods.find((p) => {
    if (p.status === "closed") return false;
    const starts = new Date(p.startsAt).getTime();
    const ends = new Date(p.endsAt).getTime();
    return now >= starts && now < ends;
  });
  if (inWindow) return inWindow;

  const upcoming = periods.find((p) => {
    if (p.status === "closed") return false;
    return new Date(p.startsAt).getTime() > now;
  });
  if (upcoming) return upcoming;

  const past = [...periods]
    .filter((p) => new Date(p.endsAt).getTime() <= now || p.status === "closed")
    .sort(
      (a, b) =>
        new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
    );
  return past[0] ?? null;
}
