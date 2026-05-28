import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { RepairPageFaq } from "@/components/faq/RepairPageFaq";
import { RepairsStructuredData } from "@/components/services/RepairsStructuredData";
import { Section } from "@/components/Section";
import { ServiceCardImage } from "@/components/ServiceCardImage";
import { Button } from "@/components/ui/Button";
import {
  ADVANCED_REPAIR_POINTS,
  AEO_ANSWERS,
  COMMON_PROBLEMS,
  POPULAR_REPAIRS,
  REPAIRS_METADATA,
  REPAIRS_SERVICE_CARDS,
} from "@/lib/repairs-page";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(REPAIRS_METADATA);

export default function RepairsPage() {
  return (
    <article>
      <RepairsStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="repairs-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Repair Services</span>
          </nav>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            Repair Services Emporia KS
          </p>
          <h1
            id="repairs-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Repair Services in Emporia, KS
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            PixelNation repairs phones, computers, game consoles, appliances, storage
            devices, and circuit boards with structured diagnostics, advanced repair
            skills, and local support.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Start a Repair</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <Section
        id="overview"
        title="Repair services overview"
        subtitle="One Emporia shop for everyday fixes and advanced electronics repair."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Whether you need a cracked phone screen, a laptop that will not boot, a PS5
          with no HDMI signal, or data from a dead device, PixelNation offers dedicated
          service pages for each specialty. We evaluate your device, explain realistic
          repair options, and keep you informed before work begins—without overpromising
          outcomes on complex board or recovery cases.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          Serving Emporia, Kansas and customers nationwide through mail-in repair when
          local drop-off is not possible.
        </p>
      </Section>

      {/* Popular repairs */}
      <Section
        id="popular"
        title="Popular repairs"
        subtitle="Fast paths to the services customers request most often."
        alt
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_REPAIRS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="block h-full rounded-xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
              >
                <h3 className="font-semibold text-foreground hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-accent">
                  Learn more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* What we repair */}
      <Section
        id="services"
        title="What we repair"
        subtitle="Choose a service to see capabilities, common problems, and how to start a repair."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIRS_SERVICE_CARDS.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/50"
            >
              <ServiceCardImage
                src={service.image}
                alt={service.imageAlt}
                priority={index < 3}
              />
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-semibold text-foreground group-hover:text-accent">
                  {service.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-accent-secondary">
                  {service.seoLabel}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-accent">
                  View service →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Advanced repairs */}
      <Section
        id="advanced"
        title="Advanced repairs other shops may not handle"
        subtitle="Board-level diagnostics and microsoldering when parts alone are not enough."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Many repair shops stop at screen swaps and simple part replacements. PixelNation
          goes deeper with microscopy, microsoldering, and structured power-rail testing
          for charging ports, HDMI connectors, liquid damage, shorts, and no-power devices—
          work that often pairs with{" "}
          <Link href="/data-recovery" className="text-accent hover:underline">
            data recovery
          </Link>{" "}
          when storage must be accessed through a failed board.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_REPAIR_POINTS.map((point) => (
            <li
              key={point}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="cta-group mt-8">
          <Button href="/board-repair">Board repair & microsoldering</Button>
          <Button href="/phone-repair" variant="secondary">
            Phone repair
          </Button>
          <Button href="/data-recovery" variant="outline">
            Data recovery
          </Button>
        </div>
      </Section>

      {/* Common problems */}
      <Section
        id="common-problems"
        title="Common problems we solve"
        subtitle="Jump to the right service for your symptom."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_PROBLEMS.map((problem) => (
            <li key={problem.label}>
              <Link
                href={problem.href}
                className="block rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
              >
                {problem.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mail-in and local */}
      <Section
        id="mail-in"
        title="Mail-in and local repair options"
        subtitle="Visit us in Emporia or ship your device with clear status updates."
        alt
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">Local repair in Emporia</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Drop off phones, laptops, consoles, appliances, and storage devices during
              business hours. We inspect your item, outline options, and explain timing
              before you approve the repair.
            </p>
            <p className="mt-3 text-sm text-muted">
              <span className="font-medium text-foreground">Hours:</span> {SITE.hours}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-foreground">Location:</span>{" "}
              {SITE.address.region}
            </p>
            <div className="mt-6">
              <Button href="/contact">Contact us</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Mail-in repair nationwide</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Customers outside Emporia can ship devices for phone repair, computer repair,
              console HDMI work, data recovery, and board-level repair. Contact us first so
              we can confirm your issue fits our services and share packing guidance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/training" variant="outline">
                Training courses
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick answers */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Repair services in Emporia, Kansas at a glance."
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

      {/* FAQ */}
      <Section
        id="faq"
        title="Repair FAQ"
        subtitle="Services, devices, data recovery, board repair, and tracking your repair."
      >
        <RepairPageFaq page="repairs" />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="repairs-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="repairs-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to start your repair?
          </h2>
          <p className="mt-3 text-muted">
            Get professional repair services from PixelNation in Emporia, Kansas.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Repair</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Service pages"
          >
            <Link href="/phone-repair" className="hover:text-accent">
              Phone Repair
            </Link>
            <Link href="/computer-repair" className="hover:text-accent">
              Computer Repair
            </Link>
            <Link href="/appliance-repair" className="hover:text-accent">
              Appliance Repair
            </Link>
            <Link href="/console-repair" className="hover:text-accent">
              Console Repair
            </Link>
            <Link href="/data-recovery" className="hover:text-accent">
              Data Recovery
            </Link>
            <Link href="/board-repair" className="hover:text-accent">
              Board Repair
            </Link>
            <Link href="/training" className="hover:text-accent">
              Training
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
