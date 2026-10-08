import Link from "next/link";
import { WEEKLY_SCHEDULE, OPEN_PLAY } from "@/lib/events/weekly-schedule";
import { RECURRING_DAY_LABELS } from "@/lib/events/helpers";
import { STORE_EVENTS } from "@/lib/events/data";

export function CompactWeeklySchedule() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WEEKLY_SCHEDULE.map((day) => (
          <section key={day.day} className="min-w-0 rounded-xl border border-card-border bg-card p-4">
            <h3 className="text-base font-semibold text-accent-secondary">{RECURRING_DAY_LABELS[day.day]}</h3>
            <ul className="mt-3 space-y-4">
              {day.slots.map((slot) => {
                const event = STORE_EVENTS.find((item) => item.slug === slot.eventSlug);
                return (
                  <li key={slot.id}>
                    <p className="font-medium text-foreground">{slot.title}</p>
                    <p className="mt-1 text-sm text-muted">{slot.timesVary ? "Times vary by posted event" : `${slot.startTime} – ${slot.endTime}`}</p>
                    <p className="mt-1 text-sm text-muted">{event ? `${event.entryFee} · ${event.registrationRequired ? "Registration required" : "Walk-ins welcome"}` : "Entry and registration vary by event"}</p>
                    {slot.cta ? <Link href={slot.cta.href} className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-accent-secondary hover:underline">Event details →</Link> : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{OPEN_PLAY.body}</p>
      <p className="mt-2 text-sm text-muted">All times are Central Time. Special-event fees and registration may differ from the regular weekly night.</p>
    </div>
  );
}
