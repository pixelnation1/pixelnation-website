import { getUpcomingEvents } from "@/lib/events";

/** @deprecated Use STORE_EVENTS and helpers from @/lib/events */
export function getPublishedEvents() {
  return getUpcomingEvents();
}

export function hasPublishedEvents(): boolean {
  return getUpcomingEvents().length > 0;
}
