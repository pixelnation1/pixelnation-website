import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  COMMANDER_NIGHTS,
  COMMANDER_NIGHTS_METADATA,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: COMMANDER_NIGHTS_METADATA.title,
  description: COMMANDER_NIGHTS_METADATA.description,
  path: COMMANDER_NIGHTS_METADATA.path,
  keywords: [
    "Commander night Emporia",
    "MTG Commander Emporia KS",
    "Magic the Gathering Emporia",
  ],
});

export default function CommanderNightsPage() {
  return (
    <CommunityPageShell
      title="Commander Nights"
      description={COMMANDER_NIGHTS_METADATA.description}
      path={COMMANDER_NIGHTS_METADATA.path}
      heroTitle={COMMANDER_NIGHTS.heroTitle}
      heroSupport={COMMANDER_NIGHTS.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Trading Cards", path: "/trading-cards" },
        {
          name: "Magic: The Gathering",
          path: "/trading-cards/magic-the-gathering",
        },
        { name: "Commander Nights", path: "/commander-nights" },
      ]}
      primaryCta={{
        href: "/trading-cards/magic-the-gathering",
        label: "Magic page",
      }}
      secondaryCta={{ href: "/learn-to-play", label: "Learn to Play" }}
    >
      <Section id="what-is-commander" title="What is Commander?">
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {COMMANDER_NIGHTS.whatIs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        id="why-people-love-it"
        title="Why people love Commander"
        alt
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {COMMANDER_NIGHTS.whyLove.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="what-a-night-looks-like" title="What a Commander night looks like">
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {COMMANDER_NIGHTS.nightLooksLike.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        id="how-new-players-join"
        title="How new players can join"
        alt
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {COMMANDER_NIGHTS.howToJoin.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="cta-group mt-8">
          <Button href="/weekly-events">Weekly event placeholders</Button>
          <Button href="/what-to-expect" variant="secondary">
            First visit tips
          </Button>
        </div>
      </Section>

      <Section
        id="casual-and-competitive"
        title="Casual and competitive play"
        subtitle="Both belong—when tables communicate."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {COMMANDER_NIGHTS.casualVsCompetitive.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Looking for cards? Visit the{" "}
          <Link
            href="/trading-cards/magic-the-gathering"
            className="text-accent hover:underline"
          >
            Magic: The Gathering
          </Link>{" "}
          page or ask about availability.
        </p>
      </Section>
    </CommunityPageShell>
  );
}
