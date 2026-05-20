import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { ConsoleRepairStructuredData } from "@/components/services/ConsoleRepairStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  BOARD_REPAIR_POINTS,
  COMMON_PROBLEMS,
  CONSOLE_FAQ,
  CONSOLE_REPAIR_METADATA,
  CONSOLES_WE_REPAIR,
  HDMI_REPAIR_ITEMS,
  HERO_BULLETS,
  SERVICE_PROCESS,
} from "@/lib/console-repair";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: CONSOLE_REPAIR_METADATA.title,
  description: CONSOLE_REPAIR_METADATA.description,
  alternates: { canonical: CONSOLE_REPAIR_METADATA.canonical },
  openGraph: {
    title: CONSOLE_REPAIR_METADATA.title,
    description: CONSOLE_REPAIR_METADATA.description,
    type: "website",
    url: CONSOLE_REPAIR_METADATA.canonical,
  },
};

export default function ConsoleRepairPage() {
  return (
    <article>
      <ConsoleRepairStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="console-repair-heading"
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
              <span className="text-foreground">Console Repair</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Console Repair Emporia KS
            </p>
            <h1
              id="console-repair-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Professional Game Console Repair in Emporia, KS
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              PixelNation repairs PlayStation, Xbox, Nintendo Switch, Steam Deck, and
              other gaming consoles with expert diagnostics, HDMI repair, overheating
              solutions, and advanced board-level repair.
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
              src="/images/gameconsolerepair2.png"
              alt="Game console repair in Emporia Kansas including PS5 HDMI repair, Xbox repair, Nintendo Switch repair, and Steam Deck repair"
              fill
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Consoles we repair */}
      <Section
        id="consoles"
        title="Consoles we repair"
        subtitle="Game console repair in Emporia for PlayStation, Xbox, Nintendo, and more."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONSOLES_WE_REPAIR.map((console) => (
            <article
              key={console.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{console.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {console.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {console.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Common problems */}
      <Section
        id="common-problems"
        title="Common console problems we fix"
        subtitle="From HDMI port damage to overheating and no power."
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

      {/* HDMI repair */}
      <Section
        id="hdmi-repair"
        title="PS5 and Xbox HDMI port repair"
        subtitle="Precision HDMI port replacement and video output restoration."
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-muted leading-relaxed">
              A damaged HDMI port is one of the most common console failures. Bent
              pins, loose connections, and no signal to the TV often point to the port
              or surrounding board area—not a dead console. PixelNation performs
              precision microsoldering to replace damaged HDMI ports and restore
              reliable video output on PS5, Xbox, and other HDMI-equipped systems.
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              PS5 HDMI Repair Emporia KS · Xbox HDMI Repair Emporia KS
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {HDMI_REPAIR_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Board-level repair */}
      <Section
        id="board-repair"
        title="When the problem goes beyond a simple part replacement"
        subtitle="Advanced board-level diagnostics and microsoldering for complex console faults."
        alt
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-muted leading-relaxed">
              Some console issues are caused by short circuits, failed components,
              damaged connectors, and power rail faults. PixelNation performs advanced
              board-level diagnostics and microsoldering to repair complex failures
              that many shops cannot handle—including work that goes beyond standard{" "}
              <Link href="/board-repair" className="text-accent hover:underline">
                HDMI port repair
              </Link>{" "}
              alone.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {BOARD_REPAIR_POINTS.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/board-repair">Board repair services</Button>
            </div>
          </div>
          <div className="relative flex aspect-[4/3] min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:min-h-[260px]">
            <Image
              src="/images/microsoldering.png"
              alt="Microsoldering and board-level game console repair at PixelNation Emporia KS"
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
        id="repair-vs-replace"
        title="A broken console does not always need replaced"
        subtitle="Many faults cost far less to repair than buying a new system."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          No power, no display, overheating, and charging issues are often repairable
          for far less than replacing the entire console. Proper diagnostics identify
          whether you need an HDMI port, thermal service, power component, or board-level
          work—so you can make a confident decision before spending on a new unit.
        </p>
      </Section>

      {/* Data recovery */}
      <Section
        id="data-recovery"
        title="Data recovery for consoles"
        subtitle="Save data when storage or system faults put your files at risk."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          In some situations, save data and user files may be recoverable from damaged
          consoles and storage devices. PixelNation evaluates the safest approach when
          a system will not boot or storage shows errors.
        </p>
        <div className="mt-8">
          <Button href="/data-recovery">Data recovery services</Button>
        </div>
      </Section>

      {/* Service process */}
      <Section
        id="process"
        title="Our console repair process"
        subtitle="Clear steps from your first message back to gaming."
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
        <div className="cta-group mt-8">
          <Button href="/repairs" variant="secondary">
            All repair services
          </Button>
          <Button href="/shop">Visit the shop</Button>
        </div>
      </Section>

      {/* AEO / GEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Direct information for common game console repair questions in Emporia."
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
        title="Console repair FAQ"
        subtitle="Questions about PS5 HDMI, Xbox, Switch, Steam Deck, and repair timing."
      >
        <FAQ items={CONSOLE_FAQ} />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="console-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="console-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need your game console repaired?
          </h2>
          <p className="mt-3 text-muted">
            Get professional console diagnostics and repair from PixelNation in Emporia,
            Kansas.
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
