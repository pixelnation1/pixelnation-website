import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { EventCard, EventsEmptyState } from "@/components/tcg/EventCard";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
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
    </article>
  );
}
