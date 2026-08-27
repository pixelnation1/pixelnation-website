import Link from "next/link";
import {
  eventHref,
  formatEventTime,
  getWeeklyEventsByDay,
  RECURRING_DAY_LABELS,
  WEEKDAY_ORDER,
} from "@/lib/events";

export function WeeklyScheduleBoard() {
  const byDay = getWeeklyEventsByDay();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {WEEKDAY_ORDER.map((day) => {
        const events = byDay[day];
        const hasEvents = events.length > 0;
        return (
          <section
            key={day}
            aria-labelledby={`schedule-${day}`}
            className={`flex min-h-[180px] flex-col rounded-2xl border p-4 ${
              hasEvents
                ? "border-accent/50 bg-accent-muted/40"
                : "border-card-border bg-card"
            }`}
          >
            <h3
              id={`schedule-${day}`}
              className={`text-sm font-semibold uppercase tracking-wide ${
                hasEvents ? "text-accent" : "text-muted"
              }`}
            >
              {RECURRING_DAY_LABELS[day]}
            </h3>
            {hasEvents ? (
              <ul className="mt-3 flex flex-1 flex-col gap-3">
                {events.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={eventHref(event)}
                      className="block rounded-xl border border-card-border bg-background/70 p-3 transition hover:border-accent-secondary"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {event.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                        Every {RECURRING_DAY_LABELS[day]}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {formatEventTime(event)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                No weekly event posted.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
