import { STORE_EVENTS } from "@/lib/events/data";
import {
  clockToMinutes,
  EVENT_GAME_LABELS,
  EVENT_TYPE_LABELS,
  formatEventTime,
  STORE_TIMEZONE,
  todayIsoInChicago,
  weekdayFromIso,
} from "@/lib/events/helpers";
import type {
  RecurringDay,
  StoreEvent,
} from "@/lib/events/types";

export const CALENDAR_WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const HIDDEN_CALENDAR_SLUGS = new Set(["pixelnation-friday-nights"]);

export type CalendarFilterId =
  | "all"
  | "pokemon"
  | "magic"
  | "commander"
  | "video-games"
  | "retro"
  | "tournaments"
  | "community"
  | "registration";

export type CalendarFilter = {
  id: CalendarFilterId;
  label: string;
};

export const CALENDAR_FILTERS: readonly CalendarFilter[] = [
  { id: "all", label: "All Events" },
  { id: "pokemon", label: "Pokémon" },
  { id: "magic", label: "Magic" },
  { id: "commander", label: "Commander" },
  { id: "video-games", label: "Video Games" },
  { id: "retro", label: "Retro" },
  { id: "tournaments", label: "Tournaments" },
  { id: "community", label: "Trade / Community" },
  { id: "registration", label: "Registration Required" },
];

export type CalendarAccent = {
  id: string;
  label: string;
  bg: string;
  text: string;
  border: string;
};

export type CalendarOccurrence = {
  id: string;
  date: string;
  event: StoreEvent;
};

export type CalendarCell = {
  date: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  occurrences: CalendarOccurrence[];
};

const RECURRING_INDEX: Record<RecurringDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function parseIsoDate(iso: string): { year: number; month: number; day: number } | null {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

export function addDaysIso(isoDate: string, days: number): string {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return isoDate;
  const utc = Date.UTC(parsed.year, parsed.month - 1, parsed.day + days);
  const next = new Date(utc);
  return toIsoDate(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate());
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function chicagoMonthYear(now = new Date()): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STORE_TIMEZONE,
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month") };
}

export function formatMonthHeading(year: number, month: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatAgendaDate(isoDate: string): string {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day)));
}

export function occurrenceId(slug: string, date: string): string {
  return `${slug}--${date}`;
}

export function parseOccurrenceId(
  value: string,
): { slug: string; date: string | null } {
  const match = value.trim().match(/^(.*)--(\d{4}-\d{2}-\d{2})$/);
  if (match?.[1] && match[2]) {
    return { slug: match[1], date: match[2] };
  }
  return { slug: value.trim(), date: null };
}

export function calendarLabel(event: StoreEvent): string {
  return event.shortTitle?.trim() || event.title;
}

export function eventAccent(event: StoreEvent): CalendarAccent {
  const title = `${event.title} ${event.format ?? ""} ${event.weeklySlotId ?? ""}`.toLowerCase();

  if (event.weeklySlotId === "monday-retro" || title.includes("retro")) {
    return {
      id: "retro",
      label: "Retro",
      bg: "rgba(167, 139, 250, 0.18)",
      text: "#ddd6fe",
      border: "#a78bfa",
    };
  }
  if (event.game === "pokemon" || event.weeklySlotId === "wednesday-pokemon") {
    return {
      id: "pokemon",
      label: "Pokémon",
      bg: "rgba(244, 197, 66, 0.16)",
      text: "#f4c542",
      border: "#f4c542",
    };
  }
  if (title.includes("commander") || event.weeklySlotId === "thursday-commander") {
    return {
      id: "commander",
      label: "Commander",
      bg: "rgba(129, 140, 248, 0.18)",
      text: "#c7d2fe",
      border: "#818cf8",
    };
  }
  if (event.game === "magic") {
    return {
      id: "magic",
      label: "Magic",
      bg: "rgba(56, 189, 248, 0.16)",
      text: "#7dd3fc",
      border: "#38bdf8",
    };
  }
  if (
    event.game === "video-games" ||
    event.eventType === "video-game" ||
    event.weeklySlotId === "friday-video"
  ) {
    return {
      id: "video",
      label: "Video Games",
      bg: "rgba(56, 221, 248, 0.14)",
      text: "#38ddf8",
      border: "#38ddf8",
    };
  }
  if (event.eventType === "trade-night" || event.weeklySlotId === "sunday-trade") {
    return {
      id: "community",
      label: "Community",
      bg: "rgba(196, 181, 253, 0.16)",
      text: "#ddd6fe",
      border: "#c4b5fd",
    };
  }
  if (
    event.eventType === "tournament" ||
    event.eventType === "prerelease" ||
    event.eventType === "release" ||
    event.eventType === "draft"
  ) {
    return {
      id: "tournament",
      label: "Tournament",
      bg: "rgba(244, 197, 66, 0.16)",
      text: "#f4c542",
      border: "#f4c542",
    };
  }
  if (event.eventType === "special") {
    return {
      id: "special",
      label: "Special Event",
      bg: "rgba(251, 146, 60, 0.16)",
      text: "#fdba74",
      border: "#fb923c",
    };
  }

  return {
    id: "default",
    label: EVENT_TYPE_LABELS[event.eventType],
    bg: "rgba(56, 221, 248, 0.12)",
    text: "#38ddf8",
    border: "#38ddf8",
  };
}

export function matchesCalendarFilter(
  event: StoreEvent,
  filter: CalendarFilterId,
): boolean {
  if (filter === "all") return true;
  if (filter === "registration") return event.registrationRequired;
  if (filter === "pokemon") return event.game === "pokemon";
  if (filter === "magic") {
    return event.game === "magic";
  }
  if (filter === "commander") {
    const hay = `${event.title} ${event.format ?? ""}`.toLowerCase();
    return event.game === "magic" && hay.includes("commander");
  }
  if (filter === "video-games") {
    return event.game === "video-games" || event.eventType === "video-game";
  }
  if (filter === "retro") {
    return (
      event.weeklySlotId === "monday-retro" ||
      event.title.toLowerCase().includes("retro")
    );
  }
  if (filter === "tournaments") {
    return (
      event.eventType === "tournament" ||
      event.eventType === "prerelease" ||
      event.eventType === "release" ||
      event.eventType === "draft" ||
      event.eventType === "video-game"
    );
  }
  if (filter === "community") {
    return event.eventType === "trade-night" || event.weeklySlotId === "sunday-trade";
  }
  return true;
}

export function matchesCalendarSearch(event: StoreEvent, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    event.title,
    event.shortTitle ?? "",
    event.format ?? "",
    EVENT_GAME_LABELS[event.game],
    EVENT_TYPE_LABELS[event.eventType],
    event.weeklySlotId ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function datesMatchingWeekday(
  rangeStart: string,
  rangeEnd: string,
  day: RecurringDay,
): string[] {
  const dates: string[] = [];
  let cursor = rangeStart;
  while (cursor <= rangeEnd) {
    if (weekdayFromIso(cursor) === day) dates.push(cursor);
    cursor = addDaysIso(cursor, 1);
  }
  return dates;
}

export function expandOccurrences(
  events: readonly StoreEvent[],
  rangeStart: string,
  rangeEnd: string,
): CalendarOccurrence[] {
  const overlayKeys = new Set(
    events
      .filter(
        (event) =>
          !event.recurring &&
          event.startDate &&
          event.weeklySlotId &&
          event.status !== "cancelled",
      )
      .map((event) => `${event.weeklySlotId}::${event.startDate}`),
  );

  const results: CalendarOccurrence[] = [];

  for (const event of events) {
    if (HIDDEN_CALENDAR_SLUGS.has(event.slug) || HIDDEN_CALENDAR_SLUGS.has(event.id)) {
      continue;
    }
    if (event.status === "cancelled" || event.status === "completed") continue;

    if (event.recurring && event.recurringDay) {
      if (event.recurringDay === "saturday") continue;
      for (const date of datesMatchingWeekday(rangeStart, rangeEnd, event.recurringDay)) {
        if (event.weeklySlotId && overlayKeys.has(`${event.weeklySlotId}::${date}`)) {
          continue;
        }
        results.push({
          id: occurrenceId(event.slug, date),
          date,
          event,
        });
      }
      continue;
    }

    const start = event.startDate;
    if (!start) continue;
    if (start < rangeStart || start > rangeEnd) continue;
    results.push({
      id: occurrenceId(event.slug, start),
      date: start,
      event,
    });
  }

  return results.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    const aMin = clockToMinutes(a.event.startTime) ?? 0;
    const bMin = clockToMinutes(b.event.startTime) ?? 0;
    if (aMin !== bMin) return aMin - bMin;
    return a.event.title.localeCompare(b.event.title);
  });
}

export function monthGrid(
  year: number,
  month: number,
  occurrences: CalendarOccurrence[],
  todayIso: string,
): CalendarCell[] {
  const firstIso = toIsoDate(year, month, 1);
  const firstWeekday = weekdayFromIso(firstIso);
  const leading = firstWeekday ? RECURRING_INDEX[firstWeekday] : 0;
  const startIso = addDaysIso(firstIso, -leading);
  const totalDays = 42;
  const byDate = new Map<string, CalendarOccurrence[]>();
  for (const item of occurrences) {
    const list = byDate.get(item.date) ?? [];
    list.push(item);
    byDate.set(item.date, list);
  }

  const cells: CalendarCell[] = [];
  for (let i = 0; i < totalDays; i += 1) {
    const date = addDaysIso(startIso, i);
    const parsed = parseIsoDate(date);
    cells.push({
      date,
      day: parsed?.day ?? 0,
      inMonth: parsed?.month === month && parsed.year === year,
      isToday: date === todayIso,
      occurrences: byDate.get(date) ?? [],
    });
  }
  return cells;
}

export function monthRange(year: number, month: number): { start: string; end: string } {
  const firstIso = toIsoDate(year, month, 1);
  const firstWeekday = weekdayFromIso(firstIso);
  const leading = firstWeekday ? RECURRING_INDEX[firstWeekday] : 0;
  const start = addDaysIso(firstIso, -leading);
  const end = addDaysIso(start, 41);
  return { start, end };
}

export function getMonthOccurrences(
  year: number,
  month: number,
  events: readonly StoreEvent[] = STORE_EVENTS,
): CalendarOccurrence[] {
  const { start, end } = monthRange(year, month);
  return expandOccurrences(events, start, end);
}

export function findOccurrence(
  id: string,
  events: readonly StoreEvent[] = STORE_EVENTS,
): CalendarOccurrence | null {
  const { slug, date } = parseOccurrenceId(id);
  if (date) {
    const month = parseIsoDate(date);
    if (!month) return null;
    return (
      getMonthOccurrences(month.year, month.month, events).find((item) => item.id === id) ??
      null
    );
  }

  const event = events.find((item) => item.slug === slug);
  if (!event) return null;
  const today = todayIsoInChicago();
  const rangeEnd = addDaysIso(today, 60);
  const upcoming = expandOccurrences(events, today, rangeEnd).find(
    (item) => item.event.slug === slug,
  );
  return upcoming ?? null;
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const utc = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: utc.getUTCFullYear(), month: utc.getUTCMonth() + 1 };
}

export function occurrenceTimeLabel(event: StoreEvent): string {
  return event.startTime;
}

export function occurrenceWhenLabel(occurrence: CalendarOccurrence): string {
  return `${formatAgendaDate(occurrence.date)} · ${formatEventTime(occurrence.event)}`;
}
