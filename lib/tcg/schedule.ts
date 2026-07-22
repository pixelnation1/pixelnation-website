import type { WeeklyScheduleEntry } from "@/lib/tcg/types";

/**
 * Weekly schedule — staff-editable.
 * Add real entries with status "confirmed" once days and times are locked in.
 * Entries with status "planned" or "coming-soon" render without implying
 * an active schedule.
 */
export const WEEKLY_SCHEDULE: readonly WeeklyScheduleEntry[] = [];

export const SCHEDULE_PLACEHOLDER_MESSAGE =
  "PixelNation’s regular event schedule will be announced as the expanded location gets closer to opening.";

export function hasConfirmedSchedule(): boolean {
  return WEEKLY_SCHEDULE.some((entry) => entry.status === "confirmed");
}
