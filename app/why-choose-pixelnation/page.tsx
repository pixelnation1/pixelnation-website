import Link from "next/link";

import { PhotoPlaceholder } from "@/components/media/PhotoPlaceholder";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  WHY_CHOOSE_DEPTH,
  WHY_CHOOSE_FEATURES,
  WHY_CHOOSE_HERO,
  WHY_CHOOSE_METADATA,
} from "@/lib/why-choose-page";

export const metadata = createPageMetadata({
  title: WHY_CHOOSE_METADATA.title,
  description: WHY_CHOOSE_METADATA.description,
  path: WHY_CHOOSE_METADATA.path,
});

export default function WhyChoosePixelNationPage() {
  return (
    <article>
      <PageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Why Choose PixelNation", path: "/why-choose-pixelnation" },
        ]}
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="why-choose-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Why Choose PixelNation</span>
          </nav>
          <h1
            id="why-choose-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {WHY_CHOOSE_HERO.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {WHY_CHOOSE_HERO.subtitle}
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/trading-cards" variant="secondary">
              Explore Trading Cards
            </Button>
            <Button href="/about" variant="outline">
              Our story
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="at-a-glance"
        title="What stands out"
        subtitle="The reasons customers choose PixelNation for repair, trading cards, and local support."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_FEATURES.map((item) => (
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

      <Section
        id="in-depth"
        title="A closer look"
        subtitle="Experience, equipment, diagnostics, community, and the standards behind the work."
        alt
      >
        <div className="space-y-10">
          {WHY_CHOOSE_DEPTH.map((section, index) => (
            <article
              key={section.id}
              id={section.id}
              className="grid gap-6 border-b border-card-border pb-10 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_0.85fr] lg:items-start"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {section.title}
                </h3>
                <p className="mt-3 max-w-3xl text-muted leading-relaxed">
                  {section.body}
                </p>
              </div>
              {index % 3 === 0 ? (
                <PhotoPlaceholder
                  label="Repair Bench"
                  description="Future photo of diagnostics and careful repair work."
                />
              ) : index % 3 === 1 ? (
                <PhotoPlaceholder
                  label="Microsoldering"
                  description="Future photo of board-level precision repair."
                />
              ) : (
                <PhotoPlaceholder
                  label="Game Nights"
                  description="Future photo of community play and local gatherings."
                />
              )}
            </article>
          ))}
        </div>
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="why-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="why-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready when you are
          </h2>
          <p className="mt-3 text-muted">
            Bring a device, ask about cards, or just say hello. PixelNation is ready to
            help.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/trading-cards" variant="secondary">
              Explore Trading Cards
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
