import { CompactWeeklySchedule } from "@/components/events/CompactWeeklySchedule";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { VisitPixelNationEvents } from "@/components/events/EventsPageSections";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/Section";
import {
  EVENTS_HUB_METADATA,
  getUpcomingEvents,
  todayIsoInChicago,
} from "@/lib/events";
import { eventSchema, eventsItemListSchema } from "@/lib/events/schema";
import { breadcrumbListSchema } from "@/lib/seo/schema";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { BreadcrumbItem } from "@/lib/seo/types";

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

type Props = {
  searchParams: Promise<{ event?: string }>;
};

export default async function EventsPage({ searchParams }: Props) {
  const now = new Date();
  const events = getUpcomingEvents(now);
  const todayIso = todayIsoInChicago(now);
  const { event: initialEventId } = await searchParams;

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbListSchema(breadcrumbs),
          eventsItemListSchema(events),
          ...events.map(eventSchema),
        ]}
      />

      <section className="border-b border-card-border py-8 sm:py-10" aria-labelledby="events-heading">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <h1
            id="events-heading"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            PixelNation Events
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Trading cards, tournaments, gaming nights and community events in Emporia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10" aria-label="Event calendar">
        <EventsCalendar todayIso={todayIso} initialEventId={initialEventId} />
      </section>

      <Section
        id="weekly-nights"
        title="Typical week"
        subtitle="Recurring nights. Saturday is reserved for posted tournaments and specials."
        alt
      >
        <CompactWeeklySchedule />
      </Section>

      <Section id="visit" title="Play at PixelNation">
        <VisitPixelNationEvents />
      </Section>
    </article>
  );
}
