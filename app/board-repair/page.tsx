import Image from "next/image";
import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { RepairPageFaq } from "@/components/faq/RepairPageFaq";
import { BoardRepairStructuredData } from "@/components/services/BoardRepairStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  BOARD_REPAIR_METADATA,
  BOARD_REPAIR_PRICING,
  BOARD_REPAIR_PRICING_INTRO,
  BOARD_REPAIR_PRICING_NOTE,
  BOARD_REPAIR_SERVICES,
  COMMON_BOARD_PROBLEMS,
  DEVICES_WE_REPAIR,
  HERO_BULLETS,
  MICROSOLDERING_CAPABILITIES,
  SERVICE_PROCESS,
  WHEN_BOARD_REPAIR_MAKES_SENSE,
} from "@/lib/board-repair-page";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(BOARD_REPAIR_METADATA);

export default function BoardRepairPage() {
  return (
    <article>
      <BoardRepairStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="board-repair-heading"
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
              <span className="text-foreground">Board Repair</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Board Repair Emporia KS · Microsoldering Emporia KS
            </p>
            <h1
              id="board-repair-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Board Repair & Microsoldering in Emporia, KS
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              PixelNation performs advanced circuit board diagnostics, microsoldering,
              connector repair, trace repair, and component-level repair for phones,
              computers, game consoles, and electronics.
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
              src="/images/motherboardrepair2.png"
              alt="Board repair and microsoldering in Emporia Kansas for phones, computers, consoles, and motherboards"
              fill
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* What is board-level repair */}
      <Section
        id="what-is-board-repair"
        title="What is board-level repair?"
        subtitle="Advanced electronics repair when swapping parts is not enough."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Board-level repair means diagnosing and repairing problems directly on the
          circuit board instead of only replacing basic parts. This can help restore
          devices with damaged ports, failed chips, torn pads, broken traces, liquid
          damage, and no-power issues. PixelNation uses microscopy, structured
          diagnostics, and microsoldering to address faults many shops cannot
          evaluate—so you get a clear answer about what is realistic before work begins.
        </p>
      </Section>

      {/* Board repair services */}
      <Section
        id="services"
        title="Board repair services"
        subtitle="Microsoldering and component-level work for complex electronics faults."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BOARD_REPAIR_SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{service.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {service.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Devices */}
      <Section
        id="devices"
        title="Devices we perform board repair on"
        subtitle="Phones, consoles, computers, and specialty electronics in Emporia and by mail-in."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEVICES_WE_REPAIR.map((device) => (
            <article
              key={device.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{device.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {device.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {device.description}
              </p>
            </article>
          ))}
        </div>
        <div className="cta-group mt-8">
          <Button href="/phone-repair" variant="secondary">
            Phone repair
          </Button>
          <Button href="/console-repair" variant="secondary">
            Console repair
          </Button>
          <Button href="/computer-repair">Computer repair</Button>
        </div>
      </Section>

      {/* Common problems */}
      <Section
        id="common-problems"
        title="Common board-level problems we fix"
        subtitle="From no power and liquid damage to torn pads and failed charging circuits."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_BOARD_PROBLEMS.map((problem) => (
            <li
              key={problem}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {problem}
            </li>
          ))}
        </ul>
      </Section>

      {/* Why board repair matters */}
      <Section
        id="why-board-repair"
        title="When parts alone are not enough"
        subtitle="Board-level repair targets the root cause on the circuit board."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Some repair shops stop when a part replacement does not fix the problem.
          Board-level repair goes deeper by testing the circuit, identifying failed
          components, and repairing the root cause when possible. That is how
          PixelNation handles charging port microsoldering, HDMI port replacement, short
          circuits, and power rail faults that standard part swaps cannot resolve—and
          why customers bring devices here after other shops could not help.
        </p>
        <div className="mt-8">
          <Button href="/data-recovery" variant="secondary">
            Data recovery services
          </Button>
        </div>
      </Section>

      {/* Microsoldering capabilities */}
      <Section
        id="microsoldering"
        title="Microsoldering capabilities"
        subtitle="Precision work under microscope for connectors, pads, and dense assemblies."
        alt
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-muted leading-relaxed">
              Microsoldering is the foundation of advanced board repair. PixelNation
              uses fine-pitch techniques for connectors and ports, pad restoration,
              jumper wire repair, and component replacement on phones, consoles,
              laptops, and motherboards—work that requires training, magnification, and
              careful handling.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {MICROSOLDERING_CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex aspect-[4/3] min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:min-h-[260px]">
            <Image
              src="/images/microsoldering.png"
              alt="Microsoldering and precision board repair at PixelNation in Emporia Kansas"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* Educational */}
      <Section
        id="dead-device"
        title="A dead device does not always mean it is done"
        subtitle="Many failures are repairable when diagnosed at the board level."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Phones, consoles, computers, and electronics that appear dead may still be
          repairable. Many failures are caused by damaged ports, shorted components,
          power rail faults, or board damage that can be diagnosed and repaired. We
          explain what is realistic for your device—we do not guarantee every board can
          be fixed, but we pursue every reasonable option with honest communication
          from the first evaluation.
        </p>
      </Section>

      {/* Process */}
      <Section
        id="process"
        title="Our board repair process"
        subtitle="Five clear steps from your first message to tested repair."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="cta-group mt-8">
          <Button href="/repairs" variant="secondary">
            Repairs overview
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        title="Microsoldering & board repair pricing"
        subtitle="Board Repair Emporia KS · Microsoldering Emporia KS — transparent starting points after diagnostics."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          <span className="font-medium text-foreground">
            {BOARD_REPAIR_PRICING_INTRO.lead}
          </span>{" "}
          {BOARD_REPAIR_PRICING_INTRO.detail}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BOARD_REPAIR_PRICING.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-xl border border-card-border bg-card p-5"
            >
              <p className="text-xs font-medium text-accent-secondary">{item.keyword}</p>
              <h3 className="mt-2 flex-1 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm text-muted">Starting at</p>
              <p className="text-2xl font-bold text-accent">{item.price}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          {BOARD_REPAIR_PRICING_NOTE}
        </p>
      </Section>

      {/* When board repair makes sense */}
      <Section
        id="when-board-repair"
        title="When board-level repair makes sense"
        subtitle="Situations where microsoldering and diagnostics may be the right path."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {WHEN_BOARD_REPAIR_MAKES_SENSE.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span className="mt-1 shrink-0 text-accent" aria-hidden>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* AEO / GEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Direct information for board repair and microsoldering in Emporia."
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
        title="Board repair FAQ"
        subtitle="Questions about microsoldering, HDMI, charging ports, liquid damage, and no power."
      >
        <RepairPageFaq page="board-repair" />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="board-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="board-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need Advanced Board Repair?
          </h2>
          <p className="mt-3 text-muted">
            Contact PixelNation for microsoldering, diagnostics, and board-level repair
            solutions.
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
