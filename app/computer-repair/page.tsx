import Image from "next/image";
import Link from "next/link";
import { RepairPageFaq } from "@/components/faq/RepairPageFaq";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ComputerRepairStructuredData } from "@/components/services/ComputerRepairStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  COMMON_PROBLEMS,
  COMPUTERS_WE_REPAIR,
  COMPUTER_REPAIR_METADATA,
  GAMING_PC_ITEMS,
  HERO_BULLETS,
  REPAIR_SERVICES,
  SERVICE_PROCESS,
} from "@/lib/computer-repair";
import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { repairBreadcrumbs } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(COMPUTER_REPAIR_METADATA);

export default function ComputerRepairPage() {
  return (
    <article>
      <ComputerRepairStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="computer-repair-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <Breadcrumbs items={repairBreadcrumbs("Computer Repair", "/computer-repair")} />
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Computer Repair Emporia KS
            </p>
            <h1
              id="computer-repair-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Professional Computer Repair in Emporia, KS
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              PixelNation repairs laptops, desktops, gaming PCs, and Macs with expert
              diagnostics, hardware repair, software troubleshooting, performance
              upgrades, and data recovery.
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
                src="/images/computerrepair.png"
                alt="Computer repair in Emporia Kansas for laptops, desktops, Macs, and gaming PCs"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Computers we repair */}
      <Section
        id="computers"
        title="Computers we repair"
        subtitle="Laptop repair, PC repair, Mac repair, and gaming systems in Emporia, Kansas."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPUTERS_WE_REPAIR.map((computer) => (
            <article
              key={computer.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{computer.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {computer.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {computer.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Common problems */}
      <Section
        id="common-problems"
        title="Common computer problems we fix"
        subtitle="From slow laptops to systems that will not power on."
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

      {/* Repair services */}
      <Section
        id="services"
        title="Computer repair services"
        subtitle="Diagnostics, upgrades, virus removal, and hardware repair under one roof."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIR_SERVICES.map((service) => (
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

      {/* Gaming PC */}
      <Section
        id="gaming-pc"
        title="Gaming PC repair, upgrades & performance optimization"
        subtitle="Custom builds, prebuilts, and workstations tuned for speed and stability."
        alt
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <p className="text-muted leading-relaxed">
            PixelNation diagnoses and repairs custom gaming PCs, prebuilt systems, and
            workstations. We upgrade storage, memory, graphics cards, cooling systems,
            and power supplies when your rig needs more performance or reliability.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {GAMING_PC_ITEMS.map((item) => (
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

      {/* Mac */}
      <Section
        id="mac-repair"
        title="Mac & Apple computer repair"
        subtitle="MacBook, iMac, and Mac Mini support in Emporia."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation services MacBook, iMac, and Mac Mini systems, including battery
          replacement, storage upgrades, software troubleshooting, startup failures,
          and data recovery coordination. We explain repair versus upgrade options so
          you can make an informed decision for your Apple computer.
        </p>
      </Section>

      {/* Data recovery */}
      <Section
        id="data-recovery"
        title="Data recovery for computers"
        subtitle="Recover important files when storage fails or systems stop booting."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Failed hard drives, clicking SSDs, and computers that will not boot often still
          hold recoverable data. PixelNation evaluates storage health and recommends the
          safest path for laptops, desktops, and external drives.
        </p>
        <div className="mt-8">
          <Button href="/data-recovery">Data recovery services</Button>
        </div>
      </Section>

      {/* Educational */}
      <Section
        id="repair-vs-replace"
        title="A slow or dead computer does not always need replaced"
        subtitle="Targeted repairs and upgrades often restore reliable performance."
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          <p>
            Many computers are replaced too soon. Slow performance may only need an SSD
            upgrade, malware removal, or thermal maintenance. A system that will not
            turn on might have a failed power supply, corrupted operating system, or a
            repairable board fault.
          </p>
          <p>
            PixelNation tests power, storage, memory, cooling, and software before
            recommending replacement. That approach saves money, preserves your files,
            and extends the life of systems you already own.
          </p>
        </div>
      </Section>

      {/* Who we help */}
      <Section
        id="who-we-help"
        title="Who we help"
        subtitle="Computer repair for everyday users and local businesses."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation supports homeowners, students, gamers, and small businesses in
          Emporia and surrounding areas. When downtime affects schoolwork, gaming, client
          work, or daily operations, we prioritize clear communication and realistic
          turnaround.
        </p>
        <div className="cta-group mt-8">
          <Button href="/repairs" variant="secondary">
            All repair services
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Section>

      {/* Service process */}
      <Section
        id="process"
        title="Our computer repair process"
        subtitle="Four clear steps from your first message to a working computer."
        alt
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
        <div className="mt-8">
          <Button href="/contact">Contact us</Button>
        </div>
      </Section>

      {/* AEO / GEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Direct information for common computer repair questions in Emporia."
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

      <Section id="related" title="Related services" subtitle="More repair options at PixelNation.">
        <RelatedLinks currentPath="/computer-repair" />
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        title="Computer repair FAQ"
        subtitle="Questions about laptops, Macs, viruses, SSD upgrades, and data recovery."
      >
        <RepairPageFaq page="computer-repair" />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="computer-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="computer-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need your computer repaired?
          </h2>
          <p className="mt-3 text-muted">
            Get professional computer diagnostics, upgrades, and repair from PixelNation
            in Emporia, Kansas.
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
