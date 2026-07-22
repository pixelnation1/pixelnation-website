import { Section } from "@/components/Section";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  TCG_PHILOSOPHY,
  TCG_PHILOSOPHY_METADATA,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: TCG_PHILOSOPHY_METADATA.title,
  description: TCG_PHILOSOPHY_METADATA.description,
  path: TCG_PHILOSOPHY_METADATA.path,
  keywords: [
    "why trading card games matter",
    "TCG community Emporia",
    "local game store philosophy",
  ],
});

export default function TradingCardPhilosophyPage() {
  return (
    <CommunityPageShell
      title="Trading Card Philosophy"
      description={TCG_PHILOSOPHY_METADATA.description}
      path={TCG_PHILOSOPHY_METADATA.path}
      heroTitle={TCG_PHILOSOPHY.heroTitle}
      heroSupport={TCG_PHILOSOPHY.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Trading Cards", path: "/trading-cards" },
        {
          name: "Trading Card Philosophy",
          path: "/trading-card-philosophy",
        },
      ]}
      primaryCta={{ href: "/gaming-community", label: "Gaming Community" }}
      secondaryCta={{ href: "/trading-cards", label: "Explore games" }}
    >
      <Section
        id="pillars"
        title="What cards create"
        subtitle="Friendships. Creativity. Competition. Collecting. Strategy. Community."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TCG_PHILOSOPHY.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted">
          {TCG_PHILOSOPHY.closing}
        </p>
      </Section>
    </CommunityPageShell>
  );
}
