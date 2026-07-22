import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/tcg/EventCard";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  WEEKLY_EVENT_PLACEHOLDERS,
  WEEKLY_EVENTS_METADATA,
  WEEKLY_EVENTS_PAGE,
} from "@/lib/tcg/community-pages";
import { TCG_LAUNCH } from "@/lib/tcg/launch";

export const metadata = createPageMetadata({
  title: WEEKLY_EVENTS_METADATA.title,
  description: WEEKLY_EVENTS_METADATA.description,
  path: WEEKLY_EVENTS_METADATA.path,
  keywords: [
    "weekly gaming events Emporia",
    "Friday Night Magic Emporia",
    "Pokémon League Emporia",
  ],
});

export default function WeeklyEventsPage() {
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
      primaryCta={{ href: "/events", label: "Events hub" }}
      secondaryCta={{ href: "/contact", label: "Contact for updates" }}
    >
      <Section
        id="placeholders"
        title="Planned weekly experiences"
        subtitle="Placeholder cards only—no invented dates, fees, or registration systems."
      >
        <p className="mb-8 max-w-3xl text-sm text-muted">{WEEKLY_EVENTS_PAGE.note}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {WEEKLY_EVENT_PLACEHOLDERS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted">
          {TCG_LAUNCH.eventsComing}
        </p>
        <div className="cta-group mt-8">
          <Button href="/commander-nights">Commander Nights</Button>
          <Button href="/events#weekly-schedule" variant="secondary">
            Weekly schedule
          </Button>
        </div>
      </Section>
    </CommunityPageShell>
  );
}
