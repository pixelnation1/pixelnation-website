import { CompactWeeklySchedule } from "@/components/events/CompactWeeklySchedule";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
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
      primaryCta={{ href: "/events", label: "Event calendar" }}
      secondaryCta={{ href: "/events/friday-night-magic", label: "Friday Night Magic" }}
    >
      <Section
        id="weekly-schedule"
        title="Typical week"
        subtitle={WEEKLY_EVENTS_PAGE.note}
      >
        <CompactWeeklySchedule />
        <div className="cta-group mt-8">
          <Button href="/events">View calendar</Button>
          <Button href="/commander-nights" variant="secondary">
            Commander Nights
          </Button>
        </div>
      </Section>
    </CommunityPageShell>
  );
}
