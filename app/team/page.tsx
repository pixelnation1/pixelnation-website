import Link from "next/link";

import { PhotoPlaceholder } from "@/components/media/PhotoPlaceholder";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  BELIEFS,
  CULTURE,
  FOUNDER,
  FUTURE_TEAM,
  TEAM_HERO,
  TEAM_METADATA,
} from "@/lib/team-page";

export const metadata = createPageMetadata({
  title: TEAM_METADATA.title,
  description: TEAM_METADATA.description,
  path: TEAM_METADATA.path,
});

export default function TeamPage() {
  return (
    <article>
      <PageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Meet the Team", path: "/team" },
        ]}
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="team-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Meet the Team</span>
          </nav>
          <h1
            id="team-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {TEAM_HERO.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {TEAM_HERO.subtitle}
          </p>
          <div className="cta-group mt-8">
            <Button href="/about" variant="secondary">
              Our story
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="founder"
        title={FOUNDER.role}
        subtitle={FOUNDER.headline}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <PhotoPlaceholder
            label="Founder portrait"
            description="Future photo placeholder—add a real portrait when ready. No invented identity."
            aspect="square"
          />
          <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
            {FOUNDER.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="future-team"
        title={FUTURE_TEAM.title}
        subtitle="Room to grow—without inventing people who are not here yet."
        alt
      >
        <p className="-mt-2 max-w-3xl text-muted leading-relaxed">
          {FUTURE_TEAM.body}
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted">{FUTURE_TEAM.openingsNote}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Repair specialist", "Retail & gaming support", "Event host"].map(
            (role) => (
              <article
                key={role}
                className="rounded-xl border border-dashed border-card-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">{role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Future team slot—ready to introduce a real teammate later.
                </p>
              </article>
            ),
          )}
        </div>
        <div className="cta-group mt-8">
          <Button href="/contact">Contact about opportunities</Button>
        </div>
      </Section>

      <Section id="culture" title={CULTURE.title} subtitle="How we show up for customers and for each other.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
            {CULTURE.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <ul className="space-y-3">
            {CULTURE.traits.map((trait) => (
              <li
                key={trait}
                className="flex gap-3 rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="beliefs"
        title={BELIEFS.title}
        subtitle="Shared convictions that shape repair, gaming, and community work."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BELIEFS.items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="team-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="team-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Want to connect with PixelNation?
          </h2>
          <p className="mt-3 text-muted">
            Start a repair, ask about trading cards, or say hello—we would love to hear
            from you.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact Us</Button>
            <Button href="/why-choose-pixelnation" variant="secondary">
              Why choose us
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
