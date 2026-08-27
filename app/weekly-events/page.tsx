import { EventCard } from "@/components/events/EventCard";
import { WeeklyScheduleGrid } from "@/components/events/WeeklyScheduleGrid";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { getWeeklyEvents } from "@/lib/events";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  WEEKLY_EVENTS_METADATA,
  WEEKLY_EVENTS_PAGE,
} from "@/lib/tcg/community-pages";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: WEEKLY_EVENTS_METADATA.title,
  description: WEEKLY_EVENTS_METADATA.description,
  path: WEEKLY_EVENTS_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "weekly gaming events Emporia",
    "Friday Night Magic Emporia",
    "Commander night Emporia",
  ],
});

export default function WeeklyEventsPage() {
  const weeklyEvents = getWeeklyEvents();

  return (
    <CommunityPageShell
      title="Weekly Events"
      description={WEEKLY_EVENTS_METADATA.description}
      path={WEEKLY_EVENTS_METADATA.path}
      heroTitle={WEEKLY_EVENTS_PAGE.heroTitle}
      heroSupport={WEEKLY_EVENTS_PAGE.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: "Weekly Events", path: "/weekly-events" },
      ]}
      primaryCta={{ href: "/events#weekly-schedule", label: "Weekly schedule" }}
      secondaryCta={{ href: "/events/friday-night-magic", label: "Friday Night Magic" }}
    >
      <Section
        id="weekly-schedule"
        title="Weekly schedule"
        subtitle={WEEKLY_EVENTS_PAGE.note}
      >
        <WeeklyScheduleGrid />
      </Section>

      <Section
        id="weekly-events"
        title="Recurring events"
        subtitle="Recurring PixelNation nights in downtown Emporia."
        alt
      >
        <div className="grid gap-6 md:grid-cols-2">
          {weeklyEvents.map((event) => (
            <EventCard key={event.id} event={event} featured={event.featured} />
          ))}
        </div>
        <div className="cta-group mt-8">
          <Button href="/commander-nights">Commander Nights</Button>
          <Button href="/events" variant="secondary">
            All events
          </Button>
        </div>
      </Section>
    </CommunityPageShell>
  );
}
