import { EventsHub } from "@/components/events/EventsHub";
import { WeeklyScheduleBoard } from "@/components/events/WeeklyScheduleBoard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { EVENT_EXPECTATIONS } from "@/lib/tcg/event-categories";
import { EVENTS_HUB_METADATA, getUpcomingEvents } from "@/lib/events";
import { eventSchema, eventsItemListSchema } from "@/lib/events/schema";
import { breadcrumbListSchema } from "@/lib/seo/schema";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { BreadcrumbItem } from "@/lib/seo/types";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: EVENTS_HUB_METADATA.title,
  description: EVENTS_HUB_METADATA.description,
  path: EVENTS_HUB_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "gaming events Emporia KS",
    "TCG events Emporia",
    "Pokémon trade night Emporia",
    "Magic the Gathering Emporia",
    "Friday Night Magic Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Gaming", path: "/gaming" },
  { name: "Events", path: "/events" },
];

export default function EventsPage() {
  const events = getUpcomingEvents();

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbListSchema(breadcrumbs),
          eventsItemListSchema(events),
          ...events.map(eventSchema),
        ]}
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="events-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            Downtown Emporia
          </p>
          <h1
            id="events-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            PixelNation Events
          </h1>
          <p className="mt-3 text-xl font-medium text-accent-secondary sm:text-2xl">
            Play. Trade. Compete. Hang Out.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Weekly gaming, trading card events, tournaments, trade nights and special
            releases in downtown Emporia, Kansas.
          </p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-muted">
            <span className="block font-semibold text-foreground">{SITE.name}</span>
            <span className="block">{SITE.address.streetLine1}</span>
            <span className="block">{SITE.address.cityStateZip}</span>
          </address>
          <div className="cta-group mt-8">
            <Button href="#upcoming">Upcoming Events</Button>
            <Button href="#weekly-schedule" variant="secondary">
              Weekly Schedule
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="upcoming"
        title="Upcoming events"
        subtitle="Filter by game or type. Recurring nights show the weekly cadence instead of a one-off date."
      >
        <EventsHub events={events} />
      </Section>

      <Section
        id="weekly-schedule"
        title="Weekly schedule"
        subtitle="Regular PixelNation nights in downtown Emporia. Additional weekly events can be added to the schedule as they go live."
        alt
      >
        <WeeklyScheduleBoard />
        <div className="mt-8 rounded-2xl border border-card-border bg-background p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Every Friday · 5:00 PM – 10:00 PM
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            PixelNation Friday Nights
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Weekly Trade Night for Pokémon, Magic: The Gathering, Disney Lorcana, One
            Piece, Yu-Gi-Oh!, and video games. Bring binders, cards, games, and items
            you are looking to trade. Friday Night Magic runs during the same evening.
          </p>
        </div>
      </Section>

      <Section
        id="what-to-expect"
        title="What to expect at PixelNation events"
        subtitle="A welcoming local game store night in downtown Emporia."
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
          <Button href="/contact">Contact PixelNation</Button>
          <Button href="/gaming" variant="secondary">
            Explore Gaming
          </Button>
        </div>
      </Section>
    </article>
  );
}
