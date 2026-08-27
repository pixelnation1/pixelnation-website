import { STORE_EVENTS } from "@/lib/events/data";
import {
  isUpcoming,
  matchesFilter,
  sortKey,
  WEEKDAY_ORDER,
} from "@/lib/events/helpers";
import type { EventFilterId, RecurringDay, StoreEvent } from "@/lib/events/types";

export {
  EVENT_FILTERS,
  EVENTS_HUB_METADATA,
  STORE_EVENTS,
} from "@/lib/events/data";
export {
  capacityLabel,
  EVENT_GAME_LABELS,
  EVENT_TYPE_LABELS,
  eventHref,
  eventTypeLabel,
  formatEventTime,
  formatEventWhen,
  gameLabel,
  getEventLocation,
  getEventLocationLines,
  isFreeEntry,
  isSoldOut,
  isUpcoming,
  matchesFilter,
  nextOccurrenceIso,
  offerPrice,
  parseClockToIsoTime,
  RECURRING_DAY_LABELS,
  recurringDayLabel,
  registrationStatusLabel,
  seatsRemaining,
  statusBadgeLabel,
  STORE_TIMEZONE,
  toOffsetDateTime,
  WEEKDAY_ORDER,
} from "@/lib/events/helpers";
export type {
  EventFilter,
  EventFilterId,
  EventGame,
  EventImage,
  EventStatus,
  EventType,
  RecurringDay,
  StoreEvent,
} from "@/lib/events/types";

export function getAllEvents(): readonly StoreEvent[] {
  return STORE_EVENTS;
}

export function getEventBySlug(slug: string): StoreEvent | undefined {
  return STORE_EVENTS.find((event) => event.slug === slug);
}

export function getEventSlugs(): string[] {
  return STORE_EVENTS.map((event) => event.slug);
}

export function getUpcomingEvents(now = new Date()): StoreEvent[] {
  return STORE_EVENTS.filter((event) => isUpcoming(event, now)).sort(
    (a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return sortKey(a, now) - sortKey(b, now);
    },
  );
}

export function getFeaturedEvents(now = new Date()): StoreEvent[] {
  return getUpcomingEvents(now).filter((event) => event.featured);
}

export function getWeeklyEvents(): StoreEvent[] {
  return STORE_EVENTS.filter(
    (event) =>
      event.recurring &&
      event.status !== "cancelled" &&
      event.status !== "completed",
  ).sort((a, b) => {
    const aDay = a.recurringDay ? WEEKDAY_ORDER.indexOf(a.recurringDay) : 99;
    const bDay = b.recurringDay ? WEEKDAY_ORDER.indexOf(b.recurringDay) : 99;
    if (aDay !== bDay) return aDay - bDay;
    return a.title.localeCompare(b.title);
  });
}

export function getEventsByFilter(
  filter: EventFilterId,
  now = new Date(),
): StoreEvent[] {
  return getUpcomingEvents(now).filter((event) => matchesFilter(event, filter));
}

export function getWeeklyEventsByDay(): Record<RecurringDay, StoreEvent[]> {
  const grouped = Object.fromEntries(
    WEEKDAY_ORDER.map((day) => [day, [] as StoreEvent[]]),
  ) as Record<RecurringDay, StoreEvent[]>;

  for (const event of getWeeklyEvents()) {
    if (event.recurringDay) {
      grouped[event.recurringDay].push(event);
    }
  }

  return grouped;
}

export function eventMetaDescription(event: StoreEvent): string {
  return `${event.shortDescription} PixelNation, 22 E. 5th Ave, Emporia, KS 66801.`;
}

export function eventPageTitle(event: StoreEvent): string {
  return `${event.title} | PixelNation`;
}
