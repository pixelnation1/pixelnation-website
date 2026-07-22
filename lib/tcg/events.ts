import type { PixelNationEvent } from "@/lib/tcg/types";

/**
 * Public events list. Keep empty until real event data is confirmed.
 * Do not invent dates, fees, or schedules.
 */
export const PIXELNATION_EVENTS: readonly PixelNationEvent[] = [];

export function getPublishedEvents(): readonly PixelNationEvent[] {
  return PIXELNATION_EVENTS.filter((event) => event.status !== "cancelled");
}

export function hasPublishedEvents(): boolean {
  return getPublishedEvents().length > 0;
}
