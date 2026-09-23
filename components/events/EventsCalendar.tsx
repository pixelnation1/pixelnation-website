"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DayEventsModal, EventDetailModal } from "@/components/events/EventDetailModal";
import {
  CALENDAR_FILTERS,
  CALENDAR_WEEKDAYS,
  calendarLabel,
  eventAccent,
  findOccurrence,
  formatAgendaDate,
  formatMonthHeading,
  getMonthOccurrences,
  matchesCalendarFilter,
  matchesCalendarSearch,
  monthGrid,
  parseIsoDate,
  shiftMonth,
  type CalendarFilterId,
  type CalendarOccurrence,
} from "@/lib/events/calendar";
import { STORE_EVENTS } from "@/lib/events/data";

const MAX_VISIBLE = 3;

type ViewMode = "auto" | "calendar" | "list";
type ModalMode = "details" | "register";

type EventsCalendarProps = {
  todayIso: string;
  initialEventId?: string;
};

export function EventsCalendar({ todayIso, initialEventId }: EventsCalendarProps) {
  const [eventId, setEventId] = useState(initialEventId ?? null);
  const selected = eventId ? findOccurrence(eventId, STORE_EVENTS) : null;
  const selectedDate = selected ? parseIsoDate(selected.date) : null;

  const initial = parseIsoDate(todayIso) ?? { year: 2026, month: 8, day: 1 };
  const [year, setYear] = useState(selectedDate?.year ?? initial.year);
  const [month, setMonth] = useState(selectedDate?.month ?? initial.month);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CalendarFilterId>("all");
  const [view, setView] = useState<ViewMode>("auto");
  const [modalMode, setModalMode] = useState<ModalMode>("details");
  const [dayDate, setDayDate] = useState<string | null>(null);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);

  const occurrences = useMemo(
    () => getMonthOccurrences(year, month, STORE_EVENTS),
    [year, month],
  );

  const filtered = useMemo(
    () =>
      occurrences.filter(
        (item) =>
          matchesCalendarFilter(item.event, filter) &&
          matchesCalendarSearch(item.event, query),
      ),
    [occurrences, filter, query],
  );

  const cells = useMemo(
    () => monthGrid(year, month, filtered, todayIso),
    [year, month, filtered, todayIso],
  );

  const agenda = useMemo(() => {
    const grouped = new Map<string, CalendarOccurrence[]>();
    for (const item of filtered) {
      if (item.date < toIsoDate(year, month, 1)) continue;
      if (item.date > toIsoDate(year, month, daysInCurrentMonth(year, month))) continue;
      const list = grouped.get(item.date) ?? [];
      list.push(item);
      grouped.set(item.date, list);
    }
    return [...grouped.entries()];
  }, [filtered, year, month]);

  const openOccurrence = useCallback(
    (occurrence: CalendarOccurrence, from?: HTMLElement | null) => {
      if (from) setReturnFocus(from);
      setDayDate(null);
      setModalMode("details");
      const parsed = parseIsoDate(occurrence.date);
      if (parsed) {
        setYear(parsed.year);
        setMonth(parsed.month);
      }
      setEventId(occurrence.id);
      window.history.replaceState(null, "", `/events?event=${encodeURIComponent(occurrence.id)}`);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalMode("details");
    setEventId(null);
    window.history.replaceState(null, "", "/events");
    window.requestAnimationFrame(() => returnFocus?.focus());
  }, [returnFocus]);

  useEffect(() => {
    const onPopState = () => {
      setEventId(new URL(window.location.href).searchParams.get("event"));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function goToday() {
    const parsed = parseIsoDate(todayIso);
    if (!parsed) return;
    setYear(parsed.year);
    setMonth(parsed.month);
  }

  function goMonth(delta: number) {
    const next = shiftMonth(year, month, delta);
    setYear(next.year);
    setMonth(next.month);
  }

  const heading = formatMonthHeading(year, month);
  const calendarVisible =
    view === "calendar" ? "block" : view === "list" ? "hidden" : "hidden md:block";
  const listVisible =
    view === "list" ? "block" : view === "calendar" ? "hidden" : "md:hidden";

  const dayOccurrences = dayDate
    ? filtered.filter((item) => item.date === dayDate)
    : [];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconButton label="Previous month" onClick={() => goMonth(-1)}>
              ‹
            </IconButton>
            <IconButton label="Next month" onClick={() => goMonth(1)}>
              ›
            </IconButton>
            <button
              type="button"
              onClick={goToday}
              className="inline-flex min-h-11 items-center rounded-lg border border-card-border px-4 text-sm font-semibold text-foreground hover:border-accent-secondary hover:text-accent-secondary"
            >
              Today
            </button>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {heading}
          </h2>
          <div
            className="flex rounded-lg border border-card-border p-1"
            role="group"
            aria-label="Calendar view"
          >
            <ViewButton
              pressed={view === "calendar" || view === "auto"}
              autoCalendar={view === "auto"}
              onClick={() => setView("calendar")}
            >
              Calendar
            </ViewButton>
            <ViewButton
              pressed={view === "list" || view === "auto"}
              autoList={view === "auto"}
              onClick={() => setView("list")}
            >
              List
            </ViewButton>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem_14rem]">
          <label className="sr-only" htmlFor="event-search">
            Search events
          </label>
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pokémon, Commander, Magic…"
            className="min-h-11 w-full rounded-lg border border-card-border bg-card px-4 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-secondary focus:outline-none focus:ring-1 focus:ring-accent-secondary/40"
          />
          <label className="sr-only" htmlFor="event-type-filter">
            Filter by type
          </label>
          <select
            id="event-type-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as CalendarFilterId)}
            className="min-h-11 w-full rounded-lg border border-card-border bg-card px-3 text-sm text-foreground focus:border-accent-secondary focus:outline-none focus:ring-1 focus:ring-accent-secondary/40"
          >
            {CALENDAR_FILTERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="hidden items-center text-sm text-muted md:flex">
            Times shown in Central Time
          </p>
        </div>
      </div>

      <div className={`mt-6 ${calendarVisible}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                {CALENDAR_WEEKDAYS.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    className="border-b border-card-border px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted"
                  >
                    <span className="hidden lg:inline">{day}</span>
                    <span className="lg:hidden">{day.slice(0, 3)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chunk(cells, 7).map((week) => (
                <tr key={week[0]?.date}>
                  {week.map((cell) => {
                    const visible = cell.occurrences.slice(0, MAX_VISIBLE);
                    const extra = cell.occurrences.length - visible.length;
                    return (
                      <td
                        key={cell.date}
                        className={`h-28 align-top border border-card-border/60 p-1.5 sm:h-32 ${
                          cell.inMonth ? "bg-background" : "bg-card/40"
                        } ${cell.isToday ? "ring-1 ring-inset ring-accent-secondary" : ""}`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-semibold ${
                              cell.inMonth ? "text-foreground" : "text-muted/50"
                            }`}
                          >
                            {cell.day}
                          </span>
                          {cell.isToday ? (
                            <span className="rounded px-1 text-[10px] font-semibold uppercase tracking-wide text-accent-secondary">
                              Today
                            </span>
                          ) : null}
                        </div>
                        <div className="flex flex-col gap-1">
                          {visible.map((item) => (
                            <EventChip
                              key={item.id}
                              occurrence={item}
                              onOpen={openOccurrence}
                            />
                          ))}
                          {extra > 0 ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                setReturnFocus(e.currentTarget);
                                setDayDate(cell.date);
                              }}
                              className="min-h-8 rounded px-1.5 text-left text-[11px] font-semibold text-accent-secondary hover:underline"
                            >
                              +{extra} more
                            </button>
                          ) : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`mt-6 ${listVisible}`}>
        {agenda.length === 0 ? (
          <p className="text-sm text-muted">No events match this month and filter.</p>
        ) : (
          <ol className="space-y-6">
            {agenda.map(([date, items]) => (
              <li key={date}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {date === todayIso ? `Today · ${formatAgendaDate(date)}` : formatAgendaDate(date)}
                </h3>
                <ul className="mt-2 divide-y divide-card-border/70 border-y border-card-border/70">
                  {items.map((item) => {
                    const accent = eventAccent(item.event);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={(e) => openOccurrence(item, e.currentTarget)}
                          className="flex w-full min-h-14 items-center justify-between gap-3 py-3 text-left"
                        >
                          <span className="min-w-0">
                            <span className="block font-semibold text-foreground">
                              {calendarLabel(item.event)}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted">
                              {item.event.startTime}
                              {item.event.endTime ? ` – ${item.event.endTime}` : ""}
                            </span>
                          </span>
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: accent.border }}
                            aria-hidden
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </div>

      <p className="mt-4 text-xs text-muted md:hidden">Times shown in Central Time.</p>

      <EventDetailModal
        occurrence={selected}
        mode={modalMode}
        onModeChange={setModalMode}
        onClose={closeModal}
      />
      <DayEventsModal
        date={dayDate}
        occurrences={dayOccurrences}
        onClose={() => setDayDate(null)}
        onSelect={(item) => openOccurrence(item)}
      />
    </div>
  );
}

function EventChip({
  occurrence,
  onOpen,
}: {
  occurrence: CalendarOccurrence;
  onOpen: (occurrence: CalendarOccurrence, from?: HTMLElement | null) => void;
}) {
  const accent = eventAccent(occurrence.event);
  return (
    <button
      type="button"
      onClick={(e) => onOpen(occurrence, e.currentTarget)}
      className="block w-full rounded px-1.5 py-1 text-left hover:brightness-110"
      style={{ backgroundColor: accent.bg, color: accent.text }}
    >
      <span className="block truncate text-[11px] font-semibold leading-tight">
        {calendarLabel(occurrence.event)}
      </span>
      <span className="block text-[10px] opacity-90">{occurrence.event.startTime}</span>
    </button>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-card-border text-lg font-semibold text-foreground hover:border-accent-secondary hover:text-accent-secondary"
    >
      {children}
    </button>
  );
}

function ViewButton({
  pressed,
  autoCalendar,
  autoList,
  onClick,
  children,
}: {
  pressed: boolean;
  autoCalendar?: boolean;
  autoList?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const autoClass = autoCalendar
    ? "max-md:bg-transparent max-md:text-muted md:bg-accent md:text-background"
    : autoList
      ? "bg-accent text-background md:bg-transparent md:text-muted"
      : "";
  return (
    <button
      type="button"
      aria-pressed={autoCalendar || autoList ? undefined : pressed}
      onClick={onClick}
      className={`min-h-9 rounded-md px-3 text-sm font-semibold ${
        autoCalendar || autoList
          ? autoClass
          : pressed
            ? "bg-accent text-background"
            : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysInCurrentMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
