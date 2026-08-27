import { Button } from "@/components/ui/Button";
import { ScheduleIcon } from "@/components/events/ScheduleIcons";
import { eventHref } from "@/lib/events";
import type { ResolvedWeeklyDay } from "@/lib/events/weekly";

type WeeklyEventCardProps = {
  day: ResolvedWeeklyDay;
};

export function WeeklyEventCard({ day }: WeeklyEventCardProps) {
  return (
    <article
      aria-labelledby={`schedule-${day.day}`}
      className={`flex h-full flex-col rounded-2xl border bg-card p-5 transition duration-200 sm:p-6 ${
        day.isToday
          ? "border-accent-secondary/80 shadow-[0_0_28px_rgba(56,221,248,0.16)]"
          : "border-card-border hover:-translate-y-0.5 hover:border-accent-secondary/50 hover:shadow-lg hover:shadow-accent-secondary/5"
      }`}
      style={{ borderLeftWidth: "4px", borderLeftColor: day.accent }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3
          id={`schedule-${day.day}`}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted"
        >
          {day.dayLabel}
        </h3>
        {day.isToday ? (
          <span className="rounded-md border border-accent-secondary/50 bg-accent-secondary-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-secondary">
            Today
          </span>
        ) : null}
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-5">
        {day.slots.map((item) => (
          <li key={item.slot.id} className="min-w-0">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-card-border bg-background text-accent-secondary"
                aria-hidden
              >
                <ScheduleIcon name={item.slot.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {item.slot.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-accent">{item.timeLabel}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                  {item.slot.categoryLabel}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.slot.description}</p>

            {item.highlight ? (
              <p className="mt-3 rounded-lg border border-accent-secondary/30 bg-accent-secondary-muted px-3 py-2 text-sm text-foreground">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-accent-secondary">
                  {item.highlight.label === "This week"
                    ? "This week"
                    : `Next ${day.dayLabel}`}
                </span>
                <a
                  href={eventHref(item.highlight.event)}
                  className="mt-0.5 inline-block font-semibold text-foreground hover:text-accent-secondary"
                >
                  {item.highlight.event.title}
                </a>
              </p>
            ) : null}

            {item.formatLabel ? (
              <p className="mt-3 text-sm text-foreground">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-secondary">
                  This week&apos;s format
                </span>
                <span className="mt-0.5 block font-semibold">{item.formatLabel}</span>
              </p>
            ) : null}

            {item.cta ? (
              <div className="mt-4">
                <Button href={item.cta.href} variant="secondary" className="w-full sm:w-auto">
                  {item.cta.label}
                </Button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}
