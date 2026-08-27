import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { NextScheduleItem, ThisWeekItem } from "@/lib/events/weekly";
import { EventCard } from "@/components/events/EventCard";
import { ScheduleIcon } from "@/components/events/ScheduleIcons";
import { OPEN_PLAY } from "@/lib/events/weekly-schedule";
import type { StoreEvent } from "@/lib/events/types";
import { SITE } from "@/lib/site";

export function NextEventBanner({ item }: { item: NextScheduleItem }) {
  return (
    <section
      aria-labelledby="next-event-heading"
      className="border-b border-card-border bg-card"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
        <div>
          <p
            id="next-event-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary"
          >
            Next event
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {item.title}
          </p>
          <p className="mt-1 text-sm font-semibold text-accent">{item.whenLabel}</p>
        </div>
        <Button href={item.href}>View details</Button>
      </div>
    </section>
  );
}

export function ThisWeekStrip({ items }: { items: ThisWeekItem[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={`${item.dateIso}-${item.title}`}>
          <Link
            href={item.href}
            className={`block rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-accent-secondary/60 ${
              item.isToday
                ? "border-accent-secondary/70 bg-accent-secondary-muted"
                : "border-card-border bg-card"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {item.isToday ? "Today · " : ""}
              {item.dayLabel}
            </p>
            <p className="mt-2 font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm text-accent">{item.timeLabel}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function OpenPlaySection() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OPEN_PLAY.categories.map((category) => (
          <li
            key={category.label}
            className="flex items-center gap-3 rounded-2xl border border-card-border bg-card px-4 py-4"
          >
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-card-border bg-background text-accent-secondary"
              aria-hidden
            >
              <ScheduleIcon name={category.icon} />
            </span>
            <p className="font-semibold text-foreground">{category.label}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {OPEN_PLAY.body}
      </p>
    </div>
  );
}

export function VisitPixelNationEvents() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8">
      <address className="not-italic">
        <p className="text-lg font-semibold text-foreground">{SITE.name}</p>
        <p className="mt-1 text-muted">{SITE.address.streetLine1}</p>
        <p className="text-muted">{SITE.address.cityStateZip}</p>
      </address>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Trading card tables, modern gaming, retro gaming, tournaments, events, and
        free open play.
      </p>
      <div className="cta-group mt-6">
        <Button href={SITE.maps.directionsUrl} external>
          Get directions
        </Button>
        <Button href="/contact" variant="secondary">
          View store hours
        </Button>
      </div>
    </div>
  );
}

export function SpecialEventsList({ events }: { events: StoreEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="max-w-2xl text-muted leading-relaxed">
        Special tournaments, prereleases, and release events are listed here when
        they are scheduled. Check Tournament Saturday on the weekly calendar, or
        contact PixelNation to ask what is coming up.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
