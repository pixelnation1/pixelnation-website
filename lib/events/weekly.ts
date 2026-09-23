import { STORE_EVENTS } from "@/lib/events/data";
import {
  chicagoMinutesNow,
  clockToMinutes,
  eventHref,
  formatEventTime,
  getChicagoWeekday,
  isUpcoming,
  nextOccurrenceIso,
  RECURRING_DAY_LABELS,
  todayIsoInChicago,
  weekdayFromIso,
} from "@/lib/events/helpers";
import type { RecurringDay, StoreEvent } from "@/lib/events/types";
import {
  WEEKLY_SCHEDULE,
  weeklyTemplateSlugs,
  type WeeklyScheduleDay,
  type WeeklyScheduleSlot,
} from "@/lib/events/weekly-schedule";

const HIDDEN_FROM_OVERLAY = new Set(["pixelnation-friday-nights"]);

export type SlotHighlight = {
  label: "This week" | "Next";
  event: StoreEvent;
};

export type ResolvedWeeklySlot = {
  slot: WeeklyScheduleSlot;
  timeLabel: string;
  highlight: SlotHighlight | null;
  formatLabel: string | null;
  cta: { label: string; href: string } | null;
};

export type ResolvedWeeklyDay = {
  day: RecurringDay;
  dayLabel: string;
  accent: string;
  isToday: boolean;
  slots: ResolvedWeeklySlot[];
};

export type NextScheduleItem = {
  title: string;
  whenLabel: string;
  href: string;
  dayLabel: string;
};

export type ThisWeekItem = {
  day: RecurringDay;
  dayLabel: string;
  dateIso: string;
  title: string;
  timeLabel: string;
  href: string;
  isToday: boolean;
};

function addDaysIso(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const utc = Date.UTC(year ?? 0, (month ?? 1) - 1, (day ?? 1) + days);
  const next = new Date(utc);
  const y = next.getUTCFullYear();
  const m = String(next.getUTCMonth() + 1).padStart(2, "0");
  const d = String(next.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function slotTimeLabel(slot: WeeklyScheduleSlot): string {
  if (slot.timesVary) return "Times vary";
  if (slot.startTime && slot.endTime) return `${slot.startTime} – ${slot.endTime}`;
  return slot.startTime ?? "";
}

function isTemplateEvent(event: StoreEvent, slot: WeeklyScheduleSlot): boolean {
  return Boolean(slot.eventSlug && event.slug === slot.eventSlug);
}

function eventMatchesSlot(
  event: StoreEvent,
  day: RecurringDay,
  slot: WeeklyScheduleSlot,
): boolean {
  if (HIDDEN_FROM_OVERLAY.has(event.id) || HIDDEN_FROM_OVERLAY.has(event.slug)) {
    return false;
  }
  if (isTemplateEvent(event, slot)) return false;
  if (event.weeklySlotId) return event.weeklySlotId === slot.id;

  const occ = nextOccurrenceIso(event);
  if (!occ) return false;
  if (weekdayFromIso(occ) !== day) return false;
  if (event.recurring) return false;

  if (day === "friday") {
    if (slot.id === "friday-fnm") return event.game === "magic";
    if (slot.id === "friday-video") {
      return event.game === "video-games" || event.eventType === "video-game";
    }
    return false;
  }

  if (day === "saturday") {
    return (
      event.eventType === "tournament" ||
      event.eventType === "prerelease" ||
      event.eventType === "release" ||
      event.eventType === "draft" ||
      event.eventType === "special" ||
      event.eventType === "video-game"
    );
  }

  return true;
}

function getHighlight(
  day: RecurringDay,
  slot: WeeklyScheduleSlot,
  now: Date,
): SlotHighlight | null {
  const today = todayIsoInChicago(now);
  const candidates = STORE_EVENTS.filter(
    (event) => isUpcoming(event, now) && eventMatchesSlot(event, day, slot),
  )
    .map((event) => ({ event, iso: nextOccurrenceIso(event, now) }))
    .filter((item): item is { event: StoreEvent; iso: string } => Boolean(item.iso))
    .sort((a, b) => a.iso.localeCompare(b.iso));

  const match = candidates[0];
  if (!match) return null;

  const weekEnd = addDaysIso(today, 6);
  const label: SlotHighlight["label"] =
    match.iso >= today && match.iso <= weekEnd ? "This week" : "Next";
  return { label, event: match.event };
}

function slotCta(
  slot: WeeklyScheduleSlot,
  highlight: SlotHighlight | null,
): { label: string; href: string } | null {
  if (highlight && slot.id === "tuesday-rotating") {
    return { label: "See this week's game", href: eventHref(highlight.event) };
  }
  if (highlight && slot.id === "saturday-tournament") {
    return { label: "View Saturday events", href: eventHref(highlight.event) };
  }
  if (highlight && slot.id === "monday-retro") {
    return { label: "View retro events", href: eventHref(highlight.event) };
  }
  if (highlight && slot.id === "friday-video") {
    return { label: "View tournament", href: eventHref(highlight.event) };
  }
  return slot.cta ?? null;
}

function formatLabel(
  slot: WeeklyScheduleSlot,
  highlight: SlotHighlight | null,
): string | null {
  if (slot.id !== "friday-fnm") return null;
  const format = highlight?.event.format?.trim();
  if (!format) return null;
  return format;
}

export function resolveWeeklySchedule(now = new Date()): ResolvedWeeklyDay[] {
  const today = getChicagoWeekday(now);
  return WEEKLY_SCHEDULE.map((item) => ({
    day: item.day,
    dayLabel: RECURRING_DAY_LABELS[item.day],
    accent: item.accent,
    isToday: item.day === today,
    slots: item.slots.map((slot) => {
      const highlight = getHighlight(item.day, slot, now);
      return {
        slot,
        timeLabel: slotTimeLabel(slot),
        highlight,
        formatLabel: formatLabel(slot, highlight),
        cta: slotCta(slot, highlight),
      };
    }),
  }));
}

export function getSaturdayEvents(now = new Date()): StoreEvent[] {
  const saturday = WEEKLY_SCHEDULE.find((item) => item.day === "saturday");
  const slot = saturday?.slots[0];
  if (!slot) return [];
  return STORE_EVENTS.filter(
    (event) => isUpcoming(event, now) && eventMatchesSlot(event, "saturday", slot),
  ).sort((a, b) => {
    const aIso = nextOccurrenceIso(a, now) ?? "";
    const bIso = nextOccurrenceIso(b, now) ?? "";
    return aIso.localeCompare(bIso);
  });
}

export function getSpecialUpcomingEvents(now = new Date()): StoreEvent[] {
  const templates = weeklyTemplateSlugs();
  return STORE_EVENTS.filter((event) => {
    if (!isUpcoming(event, now)) return false;
    if (HIDDEN_FROM_OVERLAY.has(event.slug)) return false;
    if (event.recurring && templates.has(event.slug)) return false;
    return !event.recurring;
  }).sort((a, b) => {
    const aIso = nextOccurrenceIso(a, now) ?? "";
    const bIso = nextOccurrenceIso(b, now) ?? "";
    return aIso.localeCompare(bIso);
  });
}

function slotEndMinutes(slot: WeeklyScheduleSlot): number | null {
  return clockToMinutes(slot.endTime ?? slot.startTime ?? "");
}

function slotStartMinutes(slot: WeeklyScheduleSlot): number | null {
  return clockToMinutes(slot.startTime ?? "");
}

export function getThisWeekItems(now = new Date()): ThisWeekItem[] {
  const todayIso = todayIsoInChicago(now);
  const nowMinutes = chicagoMinutesNow(now);
  const items: ThisWeekItem[] = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const iso = addDaysIso(todayIso, offset);
    const day = weekdayFromIso(iso);
    if (!day) continue;
    const scheduleDay = WEEKLY_SCHEDULE.find((item) => item.day === day);
    if (!scheduleDay) continue;

    for (const slot of scheduleDay.slots) {
      if (slot.timesVary) {
        const highlight = getHighlight(day, slot, now);
        if (!highlight || highlight.event.startDate !== iso) continue;
        items.push({
          day,
          dayLabel: RECURRING_DAY_LABELS[day],
          dateIso: iso,
          title: highlight.event.title,
          timeLabel: formatEventTime(highlight.event),
          href: eventHref(highlight.event),
          isToday: offset === 0,
        });
        continue;
      }

      if (offset === 0) {
        const end = slotEndMinutes(slot);
        if (end !== null && nowMinutes >= end) continue;
      }

      const highlight = getHighlight(day, slot, now);
      const useHighlight = highlight && nextOccurrenceIso(highlight.event, now) === iso;
      const href =
        useHighlight && highlight
          ? eventHref(highlight.event)
          : slot.eventSlug
            ? `/events/${slot.eventSlug}`
            : "/events";

      items.push({
        day,
        dayLabel: RECURRING_DAY_LABELS[day],
        dateIso: iso,
        title: useHighlight && highlight ? highlight.event.title : slot.title,
        timeLabel: useHighlight && highlight ? formatEventTime(highlight.event) : slotTimeLabel(slot),
        href,
        isToday: offset === 0,
      });
    }
  }

  return items;
}

export function getNextScheduleItem(now = new Date()): NextScheduleItem | null {
  const todayIso = todayIsoInChicago(now);
  const nowMinutes = chicagoMinutesNow(now);

  for (let offset = 0; offset < 8; offset += 1) {
    const iso = addDaysIso(todayIso, offset);
    const day = weekdayFromIso(iso);
    if (!day) continue;
    const scheduleDay: WeeklyScheduleDay | undefined = WEEKLY_SCHEDULE.find(
      (item) => item.day === day,
    );
    if (!scheduleDay) continue;

    const ranked = [...scheduleDay.slots].sort((a, b) => {
      const aMin = slotStartMinutes(a) ?? 24 * 60;
      const bMin = slotStartMinutes(b) ?? 24 * 60;
      return aMin - bMin;
    });

    for (const slot of ranked) {
      if (slot.timesVary) {
        const highlight = getHighlight(day, slot, now);
        const occ = highlight ? nextOccurrenceIso(highlight.event, now) : null;
        if (!highlight || occ !== iso) continue;
        const start = clockToMinutes(highlight.event.startTime);
        if (offset === 0 && start !== null && nowMinutes >= start) continue;
        return {
          title: highlight.event.title,
          href: eventHref(highlight.event),
          dayLabel: RECURRING_DAY_LABELS[day],
          whenLabel:
            offset === 0
              ? `Tonight · ${highlight.event.startTime}`
              : `${RECURRING_DAY_LABELS[day]} · ${highlight.event.startTime}`,
        };
      }

      const start = slotStartMinutes(slot);
      if (offset === 0 && start !== null && nowMinutes >= start) continue;

      const highlight = getHighlight(day, slot, now);
      const occ = highlight ? nextOccurrenceIso(highlight.event, now) : null;
      const useHighlight = Boolean(highlight && occ === iso);

      return {
        title: useHighlight && highlight ? highlight.event.title : slot.title,
        href:
          useHighlight && highlight
            ? eventHref(highlight.event)
            : slot.eventSlug
              ? `/events/${slot.eventSlug}`
              : "/events",
        dayLabel: RECURRING_DAY_LABELS[day],
        whenLabel:
          offset === 0
            ? `Tonight · ${slot.startTime}`
            : `${RECURRING_DAY_LABELS[day]} · ${slot.startTime}`,
      };
    }
  }

  return null;
}
