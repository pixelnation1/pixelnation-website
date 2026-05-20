import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  ADVANCED_REPAIR_ITEMS,
  COMMON_PROBLEMS,
  DATA_RECOVERY_DEVICES,
  HERO_BULLETS,
  HOME_FAQ,
  HOME_SERVICES,
  HOME_TRUST_ITEMS,
  MAIL_IN_STEPS,
  WHY_CHOOSE,
} from "@/lib/homepage";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-card-border"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-muted via-accent-secondary-muted to-background" />
      <div className="relative mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 py-12 sm:gap-10 sm:py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0 order-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="hero-heading"
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Phone, Computer, Console &amp; Appliance Repair in Emporia, KS
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            PixelNation provides professional diagnostics and repair for phones,
            computers, game consoles, appliances, data recovery, and advanced
            board-level electronics.
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
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
        <div className="relative order-2 mx-auto aspect-square w-full max-w-md min-w-0 lg:max-w-none">
          <Image
            src="/images/coverlogo.png"
            alt="PixelNation tech repair in Emporia, Kansas"
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
                <p className="mt-1 text-xs font-medium text-accent-secondary">
                  {service.seoLabel}
                </p>
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

export function CommonProblemsSection() {
  return (
    <Section
      id="common-problems"
      title="Common problems we solve"
      subtitle="If your device matches one of these issues, we can help you understand repair options."
      alt
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
  );
}

export function WhyChooseSection() {
  return (
    <Section
      id="why-pixelnation"
      title="Why customers choose PixelNation"
      subtitle="Real bench experience, clear communication, and repair paths that match the actual fault."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </Section>
  );
}

export function EducationalSection() {
  return (
    <Section
      id="repair-vs-replace"
      title="Not every device needs to be replaced"
      subtitle="Understanding your options can save money and recover data you thought was lost."
      alt
    >
      <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
        <p>
          Many people assume a phone with a dead charging port, a laptop that will
          not power on, or a PS5 with no HDMI signal is beyond help. In practice,
          issues like charging failures, power rail faults, HDMI damage, and storage
          errors are often repairable—or recoverable—when diagnosed correctly.
        </p>
        <p>
          At PixelNation, we start with structured diagnostics: confirming symptoms,
          testing power and data paths, and explaining what failed before quoting
          repair. That approach helps you decide whether board-level work, part
          replacement, or data recovery is the right path instead of replacing a
          device unnecessarily.
        </p>
        <p>
          Whether you need{" "}
          <Link href="/phone-repair" className="text-accent hover:underline">
            iPhone repair in Emporia
          </Link>
          ,{" "}
          <Link href="/console-repair-emporia-ks" className="text-accent hover:underline">
            PS5 HDMI repair
          </Link>
          , or{" "}
          <Link href="/data-recovery" className="text-accent hover:underline">
            data recovery
          </Link>
          , you get honest guidance based on the condition of your device.
        </p>
      </div>
    </Section>
  );
}

export function AdvancedRepairSection() {
  return (
    <Section
      id="advanced-repair"
      title="Advanced repair & board-level work"
      subtitle="Microsoldering and precision diagnostics when parts alone cannot fix the fault."
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-muted leading-relaxed">
            Board-level repair addresses the root cause on the logic board—ideal for
            charging IC failures, damaged HDMI ports, corroded connectors, and shorted
            power rails. PixelNation combines microscopy, microsoldering, and methodical
            testing for phones, consoles, and computers.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {ADVANCED_REPAIR_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="cta-group mt-8">
            <Button href="/board-repair">Board repair in Emporia</Button>
            <Button href="/board-repair" variant="secondary">
              Microsoldering services
            </Button>
          </div>
        </div>
        <div className="relative flex aspect-[4/3] min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:min-h-[260px]">
          <Image
            src="/images/microsoldering.png"
            alt="Microsoldering and board-level repair bench at PixelNation, Emporia KS"
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
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

export function DataRecoveryHomeSection() {
  return (
    <Section
      id="data-recovery"
      title="Data recovery"
      subtitle="Recover important files when storage fails or devices stop responding."
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-muted leading-relaxed">
            Data loss is stressful whether it involves family photos, business files,
            or a phone that will not boot. We evaluate media health and recommend the
            safest recovery path—software access, drive transplant, or board work to
            restore power to storage.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
            Recoverable devices
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {DATA_RECOVERY_DEVICES.map((device) => (
              <li
                key={device}
                className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-muted"
              >
                {device}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/data-recovery">Data recovery services</Button>
          </div>
        </div>
        <div className="relative flex aspect-[4/3] min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:min-h-[260px]">
          <Image
            src="/images/datarecovery.png"
            alt="Data recovery from phones, SSDs, and hard drives at PixelNation Emporia KS"
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}

export function TrainingHomeSection() {
  return (
    <Section
      id="training"
      title="Repair & board-level training"
      subtitle="Hands-on courses for technicians who want practical microsoldering and diagnostics skills."
      alt
    >
      <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
        PixelNation offers training focused on real bench work—device teardown,
        multimeter use, soldering fundamentals, charging circuit troubleshooting, and
        board-level repair workflows. Courses are designed for learners who want
        usable skills, not theory-only lectures.
      </p>
      <div className="mt-8">
        <Button href="/training">View training courses</Button>
      </div>
    </Section>
  );
}

export function FAQSection() {
  return (
    <Section
      id="faq"
      title="Frequently asked questions"
      subtitle="Answers about repair times, board work, data recovery, mail-in service, training, and appliances."
      alt
    >
      <FAQ items={HOME_FAQ} />
    </Section>
  );
}

export function FinalCTASection() {
  return (
    <section
      className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 id="final-cta-heading" className="text-2xl font-bold sm:text-3xl">
          Ready to get your device fixed?
        </h2>
        <p className="mt-3 text-muted">
          Start online or call our Emporia shop.
        </p>
        <div className="cta-group mt-8 justify-center">
          <Button href="/contact">Start a Repair</Button>
          <Button href="/contact" variant="secondary" ariaLabel="Contact PixelNation">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}
