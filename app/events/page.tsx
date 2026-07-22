import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { EventCard, EventsEmptyState } from "@/components/tcg/EventCard";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { WeeklySchedule } from "@/components/tcg/WeeklySchedule";
import {
  EVENT_CATEGORIES,
  EVENT_EXPECTATIONS,
} from "@/lib/tcg/event-categories";
import { getPublishedEvents, hasPublishedEvents } from "@/lib/tcg/events";
import { EVENTS_METADATA } from "@/lib/tcg/events-page";
import { TCG_LAUNCH } from "@/lib/tcg/launch";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: EVENTS_METADATA.title,
  description: EVENTS_METADATA.description,
  path: EVENTS_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "gaming events Emporia KS",
    "TCG events Emporia",
    "Magic events Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Gaming", path: "/gaming" },
  { name: "Events", path: "/events" },
];

export default function EventsPage() {
  const events = getPublishedEvents();
  const showEvents = hasPublishedEvents();

  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        pagePath="/events"
        pageName="Events"
        pageDescription={EVENTS_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="events-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="events-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Gaming &amp; Trading Card Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Weekly trading-card events, community gaming nights, learn-to-play sessions,
            and special release events are part of PixelNation’s expanded location plans
            in Emporia, Kansas.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Contact for updates</Button>
            <Button href="/gaming" variant="secondary">
              Explore Gaming
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="upcoming"
        title="Upcoming events"
        subtitle={
          showEvents
            ? "Confirmed PixelNation events in Emporia."
            : "Schedules will appear here when real event details are confirmed."
        }
      >
        {showEvents ? (
          <ul className="grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        ) : (
          <EventsEmptyState
            title={TCG_LAUNCH.eventsEmptyTitle}
            body={TCG_LAUNCH.eventsEmptyBody}
          />
        )}
      </Section>

      <Section
        id="weekly-schedule"
        title="Weekly schedule"
        subtitle="Regular weekly events at PixelNation—updated as days and times are confirmed."
        alt
      >
        <WeeklySchedule />
      </Section>

      <Section
        id="event-types"
        title="Event types we plan to host"
        subtitle="The kinds of events PixelNation is preparing for the expanded location. None of these are on a live schedule yet."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_CATEGORIES.map((category) => (
            <li
              key={category.title}
              className="flex flex-col rounded-xl border border-card-border bg-card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  {category.status === "planned" ? "Planned" : "Coming soon"}
                </span>
                {category.skillLevel ? (
                  <span className="text-xs text-muted">{category.skillLevel}</span>
                ) : null}
              </div>
              <h3 className="mt-2 font-semibold text-foreground">
                {category.title}
              </h3>
              {category.game ? (
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent">
                  {category.game}
                </p>
              ) : null}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="what-to-expect"
        title="What to expect at PixelNation events"
        subtitle="Every event is built around a welcoming, community-first experience."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {EVENT_EXPECTATIONS.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="cta-group mt-8">
          <Button href="/contact">Contact for updates</Button>
          <Button href="/gaming" variant="secondary">
            Explore Gaming
          </Button>
        </div>
      </Section>
    </article>
  );
}
