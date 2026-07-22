import Image from "next/image";
import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { FaqSection } from "@/components/faq/FaqSection";
import { PhotoPlaceholder } from "@/components/media/PhotoPlaceholder";
import { AboutStructuredData } from "@/components/services/AboutStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  ABOUT_FAQ,
  ABOUT_METADATA,
  HERO_BULLETS,
  OUR_VALUES,
  STORY_SECTIONS,
  WHAT_WE_OFFER,
  WHY_CHOOSE,
} from "@/lib/about-page";
import { OUR_MISSION, PHOTO_SLOTS } from "@/lib/brand-story";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy({
  ...ABOUT_METADATA,
  titleAbsolute: true,
});

export default function AboutPage() {
  return (
    <article>
      <AboutStructuredData />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">About</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              About PixelNation · Emporia, Kansas
            </p>
            <h1
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              About PixelNation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              A technology, gaming, and community brand built on honest repair,
              shared play, and a place people want to visit in {SITE.address.region}.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="cta-group mt-8">
              <Button href="/contact">Start a Repair</Button>
              <Button href="/trading-cards" variant="secondary">
                Explore Trading Cards
              </Button>
              <Button href="/team" variant="outline">
                Meet the Team
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
              <Image
                src="/images/coverlogo.png"
                alt="PixelNation advanced repair, trading cards, and community in Emporia Kansas"
                fill
                className="h-full w-full object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {STORY_SECTIONS.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          alt={index % 2 === 1}
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            {index === 0 ? (
              <PhotoPlaceholder
                label={PHOTO_SLOTS[2].label}
                description={PHOTO_SLOTS[2].description}
              />
            ) : index === 1 ? (
              <PhotoPlaceholder
                label={PHOTO_SLOTS[0].label}
                description={PHOTO_SLOTS[0].description}
              />
            ) : index === 2 ? (
              <PhotoPlaceholder
                label={PHOTO_SLOTS[4].label}
                description={PHOTO_SLOTS[4].description}
              />
            ) : index === 3 ? (
              <PhotoPlaceholder
                label={PHOTO_SLOTS[3].label}
                description={PHOTO_SLOTS[3].description}
              />
            ) : (
              <PhotoPlaceholder
                label={PHOTO_SLOTS[5].label}
                description={PHOTO_SLOTS[5].description}
              />
            )}
          </div>
        </Section>
      ))}

      <Section
        id="our-values"
        title="Our values"
        subtitle="The principles that guide repair work, community growth, and everyday service."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUR_VALUES.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="mission"
        title={OUR_MISSION.title}
        subtitle={OUR_MISSION.subtitle}
      >
        <p className="-mt-2 mb-8 max-w-3xl text-lg leading-relaxed text-muted">
          {OUR_MISSION.body}
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUR_MISSION.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="what-we-do"
        title="What we do"
        subtitle="Repair, recovery, training, trading cards, gaming, and technology services under one local brand."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_OFFER.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
            >
              <h3 className="font-semibold text-foreground group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {item.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-accent">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        id="why-choose"
        title="Why customers choose PixelNation"
        subtitle="Technical depth, clear communication, and a community worth visiting."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="cta-group mt-8">
          <Button href="/why-choose-pixelnation">Full why-choose page</Button>
          <Button href="/team" variant="secondary">
            Meet the team
          </Button>
        </div>
      </Section>

      <Section
        id="moments"
        title="Moments we want to capture"
        subtitle="These spaces are ready for real PixelNation photography—repair, play, and community."
        alt
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTO_SLOTS.map((slot) => (
            <PhotoPlaceholder
              key={slot.id}
              label={slot.label}
              description={slot.description}
              aspect="square"
            />
          ))}
        </div>
      </Section>

      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="About PixelNation in Emporia, Kansas."
      >
        <div className="space-y-6">
          {AEO_ANSWERS.map((item) => (
            <article
              key={item.question}
              className="rounded-xl border border-card-border bg-card p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="font-semibold text-foreground" itemProp="name">
                {item.question}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-muted"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{item.answer}</span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        title="About PixelNation FAQ"
        subtitle="History, services, community, and training."
        alt
      >
        <FaqSection items={ABOUT_FAQ} initialVisible={6} showPeopleAlsoAsk />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="about-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="about-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to visit PixelNation?
          </h2>
          <p className="mt-3 text-muted">
            Whether you need advanced repair, trading cards, or a friendly place to
            ask a question—we are here to help.
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
