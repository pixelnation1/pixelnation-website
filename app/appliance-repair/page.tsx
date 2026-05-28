import Image from "next/image";
import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { RepairPageFaq } from "@/components/faq/RepairPageFaq";
import { ApplianceRepairStructuredData } from "@/components/services/ApplianceRepairStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  APPLIANCES_WE_REPAIR,
  APPLIANCE_REPAIR_METADATA,
  COMMON_PROBLEMS,
  DIAGNOSTICS_ITEMS,
  HERO_BULLETS,
  SERVICE_PROCESS,
} from "@/lib/appliance-repair";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(APPLIANCE_REPAIR_METADATA);

export default function ApplianceRepairPage() {
  return (
    <article>
      <ApplianceRepairStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="appliance-repair-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/repairs" className="hover:text-accent">
                Repairs
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Appliance Repair</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Appliance Repair Emporia KS
            </p>
            <h1
              id="appliance-repair-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Professional Appliance Repair in Emporia, KS
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              PixelNation provides structured appliance diagnostics and repair for
              refrigerators, washers, dryers, ovens, dishwashers, and other household
              appliances.
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
              <Button href={SITE.phoneHref} variant="secondary" external>
                Call {SITE.phone}
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
              <Image
              src="/images/appliancerepair.png"
              alt="Appliance repair in Emporia Kansas for refrigerators, washers, dryers, ovens, and dishwashers"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Appliances we repair */}
      <Section
        id="appliances"
        title="Appliances we repair"
        subtitle="Household appliance repair and appliance diagnostics in Emporia, Kansas."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {APPLIANCES_WE_REPAIR.map((appliance) => (
            <article
              key={appliance.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{appliance.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {appliance.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {appliance.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Common problems */}
      <Section
        id="common-problems"
        title="Common appliance problems we fix"
        subtitle="Appliance troubleshooting starts with the symptoms you notice every day."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_PROBLEMS.map((problem) => (
            <li
              key={problem}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {problem}
            </li>
          ))}
        </ul>
      </Section>

      {/* Diagnostics */}
      <Section
        id="diagnostics"
        title="Advanced diagnostics for modern appliances"
        subtitle="Mechanical and electronic faults require structured appliance diagnostics—not guesswork."
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <p className="text-muted leading-relaxed">
            Today&apos;s appliances contain sensors, control boards, relays, and
            electronic components that require structured troubleshooting. PixelNation
            diagnoses both mechanical and electronic faults to identify the true cause
            of the problem, including{" "}
            <Link href="/board-repair" className="text-accent hover:underline">
              board-level repair
            </Link>{" "}
            when applicable.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {DIAGNOSTICS_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Button href="/board-repair">Board repair services</Button>
        </div>
      </Section>

      {/* Educational */}
      <Section
        id="repair-vs-replace"
        title="Many appliance problems can be repaired"
        subtitle="Cooling, heating, and drainage issues are often fixable with the right part and testing."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          A refrigerator that is not cooling or a dryer that is not heating does not
          automatically mean the appliance must be replaced. Proper appliance
          diagnostics can often identify a repairable component—such as a heating
          element, drain pump, thermostat, or control board—and restore normal operation
          for less than the cost of a new unit.
        </p>
      </Section>

      {/* Service process */}
      <Section
        id="process"
        title="Our appliance repair process"
        subtitle="Clear steps from your first message to a working appliance again."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PROCESS.map((step, index) => (
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
      </Section>

      {/* Who we help */}
      <Section
        id="who-we-help"
        title="Who we help"
        subtitle="Appliance repair for homes and properties in Emporia and nearby communities."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation provides appliance repair for homeowners, landlords, property
          managers, and small businesses in Emporia and surrounding areas. Whether you
          manage a single rental unit or need a dependable shop for recurring issues, we
          focus on accurate appliance troubleshooting and honest repair recommendations.
        </p>
        <div className="cta-group mt-8">
          <Button href="/repairs" variant="secondary">
            All repair services
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Section>

      {/* AEO / GEO — visible direct answers */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Direct information for common appliance repair questions in Emporia."
        alt
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
        title="Appliance repair FAQ"
        subtitle="Questions about refrigerators, washers, control boards, and repair timing."
      >
        <RepairPageFaq page="appliance-repair" />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="appliance-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="appliance-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need your appliance repaired?
          </h2>
          <p className="mt-3 text-muted">
            Get professional appliance diagnostics and repair from PixelNation in
            Emporia, Kansas.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Repair</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
