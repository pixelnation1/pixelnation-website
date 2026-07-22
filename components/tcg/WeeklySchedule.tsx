import type { WeeklyScheduleEntry } from "@/lib/tcg/types";
import {
  hasConfirmedSchedule,
  SCHEDULE_PLACEHOLDER_MESSAGE,
  WEEKLY_SCHEDULE,
} from "@/lib/tcg/schedule";

function scheduleStatusLabel(status: WeeklyScheduleEntry["status"]): string {
  switch (status) {
    case "confirmed":
      return "Confirmed";
    case "planned":
      return "Planned";
    default:
      return "Coming soon";
  }
}

function formatTime(entry: WeeklyScheduleEntry): string | null {
  if (entry.startTime && entry.endTime) {
    return `${entry.startTime} – ${entry.endTime}`;
  }
  return entry.startTime ?? null;
}

/**
 * Weekly schedule — renders confirmed/planned rows from lib/tcg/schedule.ts,
 * or a coming-soon notice when no schedule is configured.
 */
export function WeeklySchedule() {
  if (!hasConfirmedSchedule() && WEEKLY_SCHEDULE.length === 0) {
    return (
      <div className="rounded-2xl border border-card-border bg-card px-6 py-8 text-center sm:px-10">
        <p className="mx-auto max-w-2xl text-muted leading-relaxed">
          {SCHEDULE_PLACEHOLDER_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {WEEKLY_SCHEDULE.map((entry) => {
        const time = formatTime(entry);
        return (
          <li
            key={`${entry.day}-${entry.eventName}`}
            className="flex flex-col rounded-xl border border-card-border bg-card p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                {entry.day}
              </span>
              <span className="rounded-md border border-accent-secondary/40 bg-accent-secondary-muted px-2 py-0.5 text-xs font-medium text-accent-secondary">
                {scheduleStatusLabel(entry.status)}
              </span>
            </div>
            <h3 className="mt-2 font-semibold text-foreground">
              {entry.eventName}
            </h3>
            {entry.game ? (
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-secondary">
                {entry.game}
              </p>
            ) : null}
            {time ? <p className="mt-2 text-sm text-muted">{time}</p> : null}
            {entry.description ? (
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {entry.description}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
