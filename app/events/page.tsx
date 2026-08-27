import {
  NextEventBanner,
  OpenPlaySection,
  SpecialEventsList,
  ThisWeekStrip,
  VisitPixelNationEvents,
} from "@/components/events/EventsPageSections";
import { EventsHub } from "@/components/events/EventsHub";
import { WeeklyScheduleGrid } from "@/components/events/WeeklyScheduleGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  EVENTS_HUB_METADATA,
  getSpecialUpcomingEvents,
  getUpcomingEvents,
} from "@/lib/events";
import { getNextScheduleItem, getThisWeekItems } from "@/lib/events/weekly";
import { eventSchema, eventsItemListSchema } from "@/lib/events/schema";
import { breadcrumbListSchema } from "@/lib/seo/schema";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { BreadcrumbItem } from "@/lib/seo/types";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: EVENTS_HUB_METADATA.title,
  description: EVENTS_HUB_METADATA.description,
  path: EVENTS_HUB_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "gaming events Emporia KS",
    "Pokémon events Emporia",
    "Magic the Gathering Emporia",
    "Commander night Emporia",
    "Friday Night Magic Emporia",
    "video game tournaments Emporia",
    "TCG tournaments Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Gaming", path: "/gaming" },
  { name: "Events", path: "/events" },
];

export default function EventsPage() {
  const now = new Date();
  const events = getUpcomingEvents(now);
  const nextEvent = getNextScheduleItem(now);
  const thisWeek = getThisWeekItems(now);
  const specials = getSpecialUpcomingEvents(now);

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
            Events at PixelNation
          </h1>
          <p className="mt-3 text-xl font-medium text-accent-secondary sm:text-2xl">
            There&apos;s something happening almost every day.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Trading cards, tournaments, retro gaming, video games, trade nights, and
            community play in downtown Emporia.
          </p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-muted">
            <span className="block font-semibold text-foreground">{SITE.name}</span>
            <span className="block">{SITE.address.streetLine1}</span>
            <span className="block">{SITE.address.cityStateZip}</span>
          </address>
          <div className="cta-group mt-8">
            <Button href="#this-week">View this week</Button>
            <Button href="#weekly-schedule" variant="secondary">
              Weekly schedule
            </Button>
          </div>
        </div>
      </section>

      {nextEvent ? <NextEventBanner item={nextEvent} /> : null}

      <Section
        id="weekly-schedule"
        title="Weekly gaming schedule"
        subtitle="A regular week at PixelNation—then check this week's calendar for featured games, formats, and Saturday tournaments."
      >
        <WeeklyScheduleGrid now={now} />
      </Section>

      <Section
        id="this-week"
        title="This week at PixelNation"
        subtitle="Upcoming nights and posted events in chronological order."
        alt
      >
        <ThisWeekStrip items={thisWeek} />
      </Section>

      <Section
        id="special-events"
        title="Upcoming special events"
        subtitle="Tournaments, prereleases, release nights, and other one-time events."
      >
        <SpecialEventsList events={specials} />
      </Section>

      <Section
        id="upcoming"
        title="Browse all events"
        subtitle="Filter by game or type. Weekly nights stay on the calendar every week."
        alt
      >
        <EventsHub events={events} />
      </Section>

      <Section
        id="open-play"
        title="Free open play"
        subtitle="Available anytime PixelNation is open."
      >
        <OpenPlaySection />
      </Section>

      <Section id="visit" title="Play at PixelNation" alt>
        <VisitPixelNationEvents />
      </Section>
    </article>
  );
}
