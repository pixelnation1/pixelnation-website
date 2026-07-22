import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import {
  CONSOLE_GAMING_FEATURES,
  GAMING_FAQS,
  GAMING_FEATURES,
  GAMING_INTRO,
  GAMING_METADATA,
  gamingStatusLabel,
  NEW_PLAYER_SUPPORT,
  PLAY_SPACE_FEATURES,
} from "@/lib/tcg/gaming-page";
import { TCG_LAUNCH } from "@/lib/tcg/launch";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: GAMING_METADATA.title,
  description: GAMING_METADATA.description,
  path: GAMING_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "gaming Emporia KS",
    "local game store Emporia",
    "community gaming Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Gaming", path: "/gaming" },
];

export default function GamingPage() {
  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        faq={GAMING_FAQS}
        pagePath="/gaming"
        pageName="Gaming"
        pageDescription={GAMING_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="gaming-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region} · Gaming &amp; Community
          </p>
          <h1
            id="gaming-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {GAMING_INTRO.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {GAMING_INTRO.body}
          </p>
          <div className="cta-group mt-8">
            <Button href="/events">View Events</Button>
            <Button href="/trading-cards" variant="secondary">
              Explore Trading Cards
            </Button>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="experiences"
        title="What we are building"
        subtitle="A community gaming destination alongside electronics repair—features will open in phases."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMING_FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col rounded-xl border border-card-border bg-card p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                {gamingStatusLabel(feature.status)}
              </span>
              <h3 className="mt-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-muted">
          {TCG_LAUNCH.gamingForwardLooking}
        </p>
      </Section>

      <Section
        id="play-space"
        title="Play space"
        subtitle="The planned environment at the larger location—details like seating capacity will be shared when confirmed."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLAY_SPACE_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="console-gaming"
        title="Console gaming"
        subtitle="Possible console gaming offerings at the expanded location—these features are planned, not yet open."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSOLE_GAMING_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex flex-col rounded-lg border border-card-border bg-card px-4 py-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                Planned
              </span>
              <span className="mt-1 text-sm text-muted">{feature}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="new-players"
        title="New players welcome"
        subtitle="You do not need prior experience—or your own cards—to get started at PixelNation."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NEW_PLAYER_SUPPORT.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="events"
        title="Organized events"
        subtitle={TCG_LAUNCH.eventsComing}
      >
        <div className="cta-group">
          <Button href="/events">View Events</Button>
          <Button href="/events#weekly-schedule" variant="secondary">
            Weekly Schedule
          </Button>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions" alt>
        <FAQ items={GAMING_FAQS} showHeading={false} />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="gaming-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="gaming-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Follow the expansion
          </h2>
          <p className="mt-3 text-muted">
            Contact PixelNation for updates on gaming space, events, and trading cards
            in {SITE.address.region}.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact us</Button>
            <Button href="/trading-cards" variant="secondary">
              Trading Cards
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
