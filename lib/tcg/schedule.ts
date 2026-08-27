import { gameLabel, getWeeklyEvents } from "@/lib/events";
import type { WeeklyScheduleEntry } from "@/lib/tcg/types";

/**
 * Weekly schedule derived from recurring store events in lib/events/data.ts.
 * Add a recurring event there to show it here automatically.
 */
export const WEEKLY_SCHEDULE: readonly WeeklyScheduleEntry[] = getWeeklyEvents().map(
  (event) => ({
    day: event.recurringDay
      ? event.recurringDay.charAt(0).toUpperCase() + event.recurringDay.slice(1)
      : "Weekly",
    eventName: event.title,
    startTime: event.startTime,
    endTime: event.endTime,
    game: gameLabel(event.game),
    description: event.shortDescription,
    status: "confirmed" as const,
  }),
);

export const SCHEDULE_PLACEHOLDER_MESSAGE =
  "Check the events page for PixelNation’s current weekly nights in downtown Emporia.";

export function hasConfirmedSchedule(): boolean {
  return WEEKLY_SCHEDULE.length > 0;
}
