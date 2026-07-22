import Link from "next/link";
import { Section } from "@/components/Section";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  LEARN_TO_PLAY_GUIDES,
  LEARN_TO_PLAY_METADATA,
  LEARN_TO_PLAY_PAGE,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: LEARN_TO_PLAY_METADATA.title,
  description: LEARN_TO_PLAY_METADATA.description,
  path: LEARN_TO_PLAY_METADATA.path,
  keywords: [
    "learn to play TCG Emporia",
    "beginner Magic Emporia",
    "Pokémon learn to play Emporia",
  ],
});

export default function LearnToPlayPage() {
  return (
    <CommunityPageShell
      title="Learn to Play"
      description={LEARN_TO_PLAY_METADATA.description}
      path={LEARN_TO_PLAY_METADATA.path}
      heroTitle={LEARN_TO_PLAY_PAGE.heroTitle}
      heroSupport={LEARN_TO_PLAY_PAGE.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Trading Cards", path: "/trading-cards" },
        { name: "Learn to Play", path: "/learn-to-play" },
      ]}
      primaryCta={{ href: "/gaming-community", label: "Gaming Community" }}
      secondaryCta={{ href: "/family-gaming", label: "Family Gaming" }}
    >
      <Section
        id="mentorship"
        title="Experienced players: help teach"
        subtitle="The best local game stores grow teachers, not just winners."
      >
        <p className="max-w-3xl text-muted leading-relaxed">
          {LEARN_TO_PLAY_PAGE.mentorship}
        </p>
      </Section>

      <Section
        id="guides"
        title="Beginner guides by game"
        subtitle="Start here, then visit each game page for products and local SEO details."
        alt
      >
        <div className="space-y-8">
          {LEARN_TO_PLAY_GUIDES.map((guide) => (
            <article
              key={guide.slug}
              id={guide.slug}
              className="rounded-2xl border border-card-border bg-card p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {guide.name}
                </h3>
                <Link
                  href={guide.href}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {guide.name} page →
                </Link>
              </div>
              <p className="mt-3 text-muted leading-relaxed">{guide.summary}</p>
              <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                {guide.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>
    </CommunityPageShell>
  );
}
