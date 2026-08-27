import { SITE } from "@/lib/site";
import type {
  EventFilterId,
  EventGame,
  EventStatus,
  EventType,
  RecurringDay,
  StoreEvent,
} from "@/lib/events/types";

export const STORE_TIMEZONE = "America/Chicago";

export const EVENT_GAME_LABELS: Record<EventGame, string> = {
  pokemon: "Pokémon",
  magic: "Magic: The Gathering",
  lorcana: "Disney Lorcana",
  "one-piece": "One Piece",
  yugioh: "Yu-Gi-Oh!",
  "video-games": "Video Games",
  multi: "Multiple Games",
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  weekly: "Weekly",
  tournament: "Tournament",
  "trade-night": "Trade Night",
  prerelease: "Prerelease",
  draft: "Draft",
  release: "Release",
  "learn-to-play": "Learn to Play",
  "video-game": "Video Games",
  special: "Special Event",
};

export const RECURRING_DAY_LABELS: Record<RecurringDay, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const WEEKDAY_ORDER: readonly RecurringDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const WEEKDAY_INDEX: Record<RecurringDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const SPECIAL_EVENT_TYPES: ReadonlySet<EventType> = new Set([
  "tournament",
  "prerelease",
  "draft",
  "release",
  "special",
]);

export function getEventLocation(event: StoreEvent): string {
  return event.location ?? SITE.address.singleLine;
}

export function getEventLocationLines(event: StoreEvent): string[] {
  if (event.location) return [event.location];
  return [SITE.name, SITE.address.streetLine1, SITE.address.cityStateZip];
}

export function gameLabel(game: EventGame): string {
  return EVENT_GAME_LABELS[game];
}

export function eventTypeLabel(type: EventType): string {
  return EVENT_TYPE_LABELS[type];
}

export function isFreeEntry(event: StoreEvent): boolean {
  return /^free$/i.test(event.entryFee.trim());
}

export function seatsRemaining(event: StoreEvent): number | null {
  if (typeof event.capacity !== "number") return null;
  const taken = event.registeredCount ?? 0;
  return Math.max(0, event.capacity - taken);
}

export function isSoldOut(event: StoreEvent): boolean {
  if (event.status === "sold-out") return true;
  const remaining = seatsRemaining(event);
  return remaining === 0;
}

export function capacityLabel(event: StoreEvent): string | null {
  if (typeof event.capacity !== "number") return null;
  if (isSoldOut(event)) return "Sold Out";
  const remaining = seatsRemaining(event);
  if (remaining !== null && event.registeredCount != null) {
    return `${remaining} ${remaining === 1 ? "Seat" : "Seats"} Remaining`;
  }
  return `${event.capacity} ${event.capacity === 1 ? "Seat" : "Seats"}`;
}

export function registrationStatusLabel(event: StoreEvent): string {
  if (event.status === "cancelled") return "Cancelled";
  if (event.status === "completed") return "Completed";
  if (isSoldOut(event)) return "Sold Out";
  if (event.registrationRequired) return "Registration required";
  return "No registration required";
}

export function statusBadgeLabel(status: EventStatus): string {
  switch (status) {
    case "sold-out":
      return "Sold Out";
    case "cancelled":
      return "Cancelled";
    case "completed":
      return "Completed";
    default:
      return "Scheduled";
  }
}

export function recurringDayLabel(day: RecurringDay): string {
  return `Every ${RECURRING_DAY_LABELS[day]}`;
}

export function formatEventWhen(event: StoreEvent): string {
  if (event.recurring && event.recurringDay) {
    return recurringDayLabel(event.recurringDay).toUpperCase();
  }
  if (event.startDate) {
    return formatDisplayDate(event.startDate);
  }
  return "Date TBA";
}

export function formatEventTime(event: StoreEvent): string {
  if (event.startTime && event.endTime) {
    return `${event.startTime} – ${event.endTime}`;
  }
  return event.startTime;
}

export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: STORE_TIMEZONE,
  }).format(new Date(Date.UTC(year, month - 1, day, 18, 0, 0)));
}

function chicagoWeekdayIndex(now = new Date()): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: STORE_TIMEZONE,
  }).format(now);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekday] ?? now.getDay();
}

function chicagoYmd(now = new Date()): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STORE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

function addDaysIso(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const utc = Date.UTC(year ?? 0, (month ?? 1) - 1, (day ?? 1) + days);
  const next = new Date(utc);
  const y = next.getUTCFullYear();
  const m = String(next.getUTCMonth() + 1).padStart(2, "0");
  const d = String(next.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayIsoInChicago(now = new Date()): string {
  const { year, month, day } = chicagoYmd(now);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function nextOccurrenceIso(event: StoreEvent, now = new Date()): string | null {
  if (event.recurring && event.recurringDay) {
    const todayIndex = chicagoWeekdayIndex(now);
    const target = WEEKDAY_INDEX[event.recurringDay];
    const delta = (target - todayIndex + 7) % 7;
    return addDaysIso(todayIsoInChicago(now), delta);
  }
  return event.startDate ?? null;
}

export function sortKey(event: StoreEvent, now = new Date()): number {
  const iso = nextOccurrenceIso(event, now);
  if (!iso) return Number.MAX_SAFE_INTEGER;
  return Date.parse(`${iso}T00:00:00`);
}

export function isUpcoming(event: StoreEvent, now = new Date()): boolean {
  if (event.status === "cancelled" || event.status === "completed") return false;
  if (event.recurring) return true;
  if (!event.startDate) return true;
  const end = event.endDate ?? event.startDate;
  return end >= todayIsoInChicago(now);
}

export function eventHref(event: StoreEvent): string {
  return `/events/${event.slug}`;
}

export function matchesFilter(event: StoreEvent, filter: EventFilterId): boolean {
  switch (filter) {
    case "upcoming":
      return true;
    case "weekly":
      return event.recurring || event.eventType === "weekly" || event.eventType === "trade-night";
    case "special":
      return SPECIAL_EVENT_TYPES.has(event.eventType);
    case "pokemon":
    case "magic":
    case "lorcana":
    case "one-piece":
    case "yugioh":
    case "video-games":
      return event.game === filter || event.game === "multi";
    default:
      return true;
  }
}

export function parseClockToIsoTime(displayTime: string): string | null {
  const match = displayTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

export function toOffsetDateTime(isoDate: string, displayTime: string): string | null {
  const clock = parseClockToIsoTime(displayTime);
  if (!clock) return null;
  return `${isoDate}T${clock}-05:00`;
}

export function offerPrice(event: StoreEvent): string {
  if (isFreeEntry(event)) return "0";
  const digits = event.entryFee.replace(/[^0-9.]/g, "");
  return digits || "0";
}
