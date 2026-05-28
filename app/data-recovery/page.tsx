import Image from "next/image";
import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { FAQ } from "@/components/FAQ";
import { DataRecoveryStructuredData } from "@/components/services/DataRecoveryStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  BOARD_RECOVERY_POINTS,
  DATA_LOSS_SITUATIONS,
  DATA_RECOVERY_FAQ,
  DATA_RECOVERY_METADATA,
  DEVICES_WE_RECOVER,
  HERO_BULLETS,
  PHONE_RECOVERY_ITEMS,
  SERVICE_PROCESS,
} from "@/lib/data-recovery-page";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(DATA_RECOVERY_METADATA);

export default function DataRecoveryPage() {
  return (
    <article>
      <DataRecoveryStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="data-recovery-heading"
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
              <span className="text-foreground">Data Recovery</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Data Recovery Emporia KS
            </p>
            <h1
              id="data-recovery-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Professional Data Recovery in Emporia, KS
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              PixelNation recovers data from phones, computers, hard drives, SSDs, USB
              drives, SD cards, and other storage devices using structured diagnostics
              and advanced recovery techniques.
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
              <Button href="/contact">Start a Recovery Request</Button>
              <Button href={SITE.phoneHref} variant="secondary" external>
                Call {SITE.phone}
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
              <Image
                src="/images/datarecovery2.png"
                alt="Data recovery in Emporia Kansas for phones, hard drives, SSDs, USB drives, and memory cards"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <Section
        id="devices"
        title="Devices we recover data from"
        subtitle="Phone, computer, and storage media recovery in Emporia and nationwide mail-in cases."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEVICES_WE_RECOVER.map((device) => (
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
      </Section>

      {/* Data loss situations */}
      <Section
        id="data-loss"
        title="Common data loss situations"
        subtitle="We evaluate each case individually—recovery depends on damage and media condition."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DATA_LOSS_SITUATIONS.map((situation) => (
            <li
              key={situation}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {situation}
            </li>
          ))}
        </ul>
      </Section>

      {/* Phone recovery */}
      <Section
        id="phone-recovery"
        title="Recover photos and files from dead phones"
        subtitle="iPhone data recovery and Android phone recovery when devices stop responding."
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <p className="text-muted leading-relaxed">
            If your phone no longer powers on, has liquid damage, or has board-level
            faults, PixelNation may be able to recover photos, videos, contacts, and
            documents. We assess whether the fault is storage, power, or board-related
            before recommending a path—often coordinating with our{" "}
            <Link href="/phone-repair" className="text-accent hover:underline">
              phone repair
            </Link>{" "}
            and board-level services.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {PHONE_RECOVERY_ITEMS.map((item) => (
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

      {/* HDD & SSD */}
      <Section
        id="drive-recovery"
        title="Hard drive and SSD data recovery"
        subtitle="Structured diagnostics for clicking HDDs, failed SSDs, and external drives."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Recover files from failing hard drives, SSDs, and external storage devices,
          including personal archives and business data. Symptoms like clicking sounds,
          disappearing partitions, or sudden unreadable drives need careful handling—we
          focus on stabilizing media and choosing the safest recovery method rather than
          risking further damage with repeated power-on attempts.
        </p>
        <div className="mt-8">
          <Button href="/computer-repair">Computer repair services</Button>
        </div>
      </Section>

      {/* Board-level */}
      <Section
        id="board-recovery"
        title="When the storage device is not the only problem"
        subtitle="Board-level diagnostics and microsoldering to restore access to data."
        alt
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-muted leading-relaxed">
              Some recoveries require repairing the electronics that power the device.
              A phone with a dead charging circuit or a drive enclosure with a failed
              controller may need board-level work before storage can be read. PixelNation
              performs board-level diagnostics and microsoldering when needed to restore
              access to data—capabilities many shops do not offer.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {BOARD_RECOVERY_POINTS.map((item) => (
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
              alt="Board-level data recovery and microsoldering at PixelNation Emporia KS"
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
        id="data-not-lost"
        title="A device that will not turn on does not always mean your data is lost"
        subtitle="Realistic evaluation helps you understand what may still be recoverable."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Even when a phone, computer, or storage device appears dead, the underlying
          issue may be repairable long enough to retrieve important files. Power faults,
          corrupted operating systems, and damaged ports do not always mean permanent
          data loss. PixelNation explains what is realistic for your situation—we do not
          guarantee every device is recoverable, but we pursue every reasonable option
          with clear communication throughout.
        </p>
      </Section>

      {/* Who we help */}
      <Section
        id="who-we-help"
        title="Who we help"
        subtitle="Individuals, students, businesses, and organizations across Emporia and beyond."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation helps individuals, students, businesses, and organizations recover
          irreplaceable photos, documents, and critical records. Whether you lost years of
          family photos or essential business files, we treat your data with care and set
          honest expectations from the first evaluation.
        </p>
        <div className="cta-group mt-8">
          <Button href="/repairs" variant="secondary">
            All repair services
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Section>

      {/* Process */}
      <Section
        id="process"
        title="Our data recovery process"
        subtitle="Four steps from your first message to recovered files."
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
      </Section>

      {/* AEO / GEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Direct information for common data recovery questions in Emporia."
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
        title="Data recovery FAQ"
        subtitle="Questions about phones, drives, water damage, and recovery timing."
      >
        <FAQ items={DATA_RECOVERY_FAQ} />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="data-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="data-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need to recover important files?
          </h2>
          <p className="mt-3 text-muted">
            Get professional data recovery services from PixelNation in Emporia, Kansas.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Recovery Request</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
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
