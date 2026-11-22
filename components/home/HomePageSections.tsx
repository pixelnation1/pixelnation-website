import Image from "next/image";
import Link from "next/link";
import { FaqSection as FaqSectionBlock } from "@/components/faq/FaqSection";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  HERO_BULLETS,
  HERO_HEADLINE,
  HERO_SUPPORT,
  HOME_VISIT,
  HOME_FAQS,
  HOME_SERVICES,
  HOME_TRUST_ITEMS,
  MAIL_IN_STEPS,
} from "@/lib/homepage";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-card-border"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-muted via-accent-secondary-muted to-background" />
      <div className="relative mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 py-10 sm:gap-10 sm:py-14 md:py-16 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0 order-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="hero-heading"
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {HERO_HEADLINE}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {HERO_SUPPORT}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {HERO_BULLETS.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="cta-group mt-8">
            <Button href="/contact">Start a Repair</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>Call {SITE.phone}</Button>
          </div>
        </div>
        <div className="relative order-2 mx-auto aspect-[16/9] w-full max-w-md min-w-0 lg:max-w-none">
          <Image
            src="/images/microsoldering.png"
            alt="Microsoldering and electronics repair at PixelNation"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}

export function VisitPixelNationSection() {
  return (
    <Section
      id="visit"
      title={HOME_VISIT.title}
      subtitle={HOME_VISIT.body}
    >
      <address className="mb-8 not-italic text-sm leading-relaxed text-muted sm:text-base">
        <span className="block font-semibold text-foreground">{SITE.name}</span>
        <span className="block">{SITE.address.streetLine1}</span>
        <span className="block">{SITE.address.cityStateZip}</span>
      </address>
      <div className="max-w-xl rounded-xl border border-card-border bg-card p-5 sm:p-6">
        <h3 className="mb-4 font-semibold text-foreground">Store hours</h3>
        <dl className="space-y-3 text-sm sm:text-base">
          {SITE.businessHours.map(({ days, display }) => (
            <div key={days} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
              <dt className="text-muted">{days}</dt>
              <dd className="font-medium text-foreground">{display}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="cta-group mt-8">
        <Button href={SITE.maps.directionsUrl} external>
          Get Directions
        </Button>
        <Button href="/contact" variant="outline">
          Start a Repair
        </Button>
      </div>
    </Section>
  );
}

export function TrustBar() {
  return (
    <section className="border-b border-card-border bg-card py-6" aria-label="Trust highlights">
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-3 px-4 text-center text-xs font-medium text-muted sm:text-sm">
        {HOME_TRUST_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhatWeRepairSection() {
  return (
    <Section
      id="services"
      title="What we repair"
      subtitle="Professional repair services in Emporia, Kansas—with dedicated pages for each specialty."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_SERVICES.map((service) => (
          <article
            key={service.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/50"
          >
            <Link href={service.href} className="flex flex-1 flex-col">
              <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-background">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold text-foreground group-hover:text-accent">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-accent">
                  Learn more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function MailInRepairSection() {
  return (
    <Section
      id="mail-in-repair"
      title="Mail-in repair"
      subtitle="Nationwide mail-in service with the same diagnostic standards as our Emporia shop."
      alt
    >
      <p className="-mt-6 mb-8 max-w-3xl text-muted leading-relaxed">
        Cannot visit in person? PixelNation accepts mail-in repair for phones,
        computers, consoles, and many board-level cases. Ship securely, receive clear
        updates, and get your device returned after repair.
      </p>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAIL_IN_STEPS.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-card-border bg-card p-5"
          >
            <span className="text-sm font-bold text-accent">Step {index + 1}</span>
            <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Button href="/contact">Start mail-in repair</Button>
      </div>
    </Section>
  );
}

export function FAQSection() {
  return (
    <section className="bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-6xl min-w-0 px-4">
        <FaqSectionBlock items={HOME_FAQS} initialVisible={6} />
      </div>
    </section>
  );
}
