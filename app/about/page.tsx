import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { AboutStructuredData } from "@/components/services/AboutStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  ABOUT_FAQ,
  ABOUT_METADATA,
  HERO_BULLETS,
  WHAT_WE_OFFER,
  WHY_CHOOSE,
} from "@/lib/about-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: ABOUT_METADATA.title,
  },
  description: ABOUT_METADATA.description,
  alternates: { canonical: ABOUT_METADATA.canonical },
  openGraph: {
    title: ABOUT_METADATA.title,
    description: ABOUT_METADATA.description,
    type: "website",
    url: ABOUT_METADATA.canonical,
  },
};

export default function AboutPage() {
  return (
    <article>
      <AboutStructuredData />

      {/* Hero */}
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
              About PixelNation · Repair Shop Emporia KS
            </p>
            <h1
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              About PixelNation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Advanced repair, data recovery, and hands-on training built on real-world
              technical experience.
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
              <Button href="/training" variant="secondary">
                Explore Training
              </Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
            <Image
              src="/images/coverlogo.png"
              alt="PixelNation advanced repair and training in Emporia Kansas"
              fill
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <Section
        id="our-story"
        title="Built from real repair experience"
        subtitle="Established in 2007 — advanced diagnostics, honest service, and a passion for solving hard problems."
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          <p>
            Looking for reliable repair with fast turnaround and real experience behind
            the work? PixelNation is built on years of hands-on repair knowledge and
            advanced diagnostics across phones, computers, game consoles, appliances, and
            board-level electronics.
          </p>
          <p>
            Since <span className="font-semibold text-foreground">2007</span>, our focus
            has been honest repair solutions, accurate diagnostics, and quality workmanship
            customers can trust. What started as a passion for technology and
            problem-solving grew into a specialized business—expanding beyond basic
            screen and battery work into microsoldering, data recovery, and training that
            helps others build real bench skills.
          </p>
          <p>
            From cracked screens and charging issues to complex board failures and
            recovery cases, we take pride in solving problems many shops turn away. We
            believe repairs should be straightforward, professional, and done right the
            first time—with clear communication so you understand your options before work
            begins.
          </p>
          <p>
            Today, PixelNation serves {SITE.address.region} and customers nationwide
            through mail-in repair. We are committed to helping people save devices,
            recover irreplaceable data, and learn practical technical skills through
            hands-on education—not theory alone.
          </p>
        </div>
      </Section>

      {/* What we do */}
      <Section
        id="what-we-do"
        title="More than a typical repair shop"
        subtitle="A specialized technical business for repair, recovery, training, and technology."
        alt
      >
        <p className="-mt-6 mb-8 max-w-3xl text-muted leading-relaxed">
          PixelNation is an electronics repair specialist in Emporia, Kansas offering
          advanced diagnostics, board-level work, and professional training alongside
          everyday device and appliance repair.
        </p>
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
        <div className="mt-8">
          <Button href="/repairs" variant="secondary">
            Repairs overview
          </Button>
        </div>
      </Section>

      {/* Mission */}
      <Section id="mission" title="Our mission" subtitle="Practical solutions, real skills, honest service.">
        <p className="-mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          To provide practical repair solutions, recover valuable data, teach real-world
          technical skills, and serve customers with honesty and professionalism. Whether
          you need a quick repair or advanced board-level diagnostics, our goal is
          dependable service backed by experience you can trust.
        </p>
      </Section>

      {/* Why choose */}
      <Section
        id="why-choose"
        title="Why customers choose PixelNation"
        subtitle="Technical depth, clear communication, and service beyond basic part swaps."
        alt
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
      </Section>

      {/* Training vision */}
      <Section
        id="training-vision"
        title="Sharing knowledge through hands-on training"
        subtitle="Helping technicians, shop owners, and entrepreneurs build real board repair skills."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation offers practical microsoldering and board repair training designed
          for repair shop owners, technicians, and entrepreneurs who want skills they can
          apply immediately—from charging port and HDMI rework to diagnostics and
          structured troubleshooting on real circuit boards.
        </p>
        <div className="cta-group mt-8">
          <Button href="/training">Training overview</Button>
          <Button href="/training-courses" variant="secondary">
            Training courses & pricing
          </Button>
        </div>
      </Section>

      {/* Community */}
      <Section
        id="community"
        title="Built to serve more than repairs"
        subtitle="Technology, education, and community-focused service."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation is focused on solving real problems, creating opportunities, and
          making a positive impact through education, technology, and community
          involvement. Beyond the bench, we connect with customers who care about gaming,
          electronics, and learning—building a business that supports local needs while
          sharing expertise with the broader repair community.
        </p>
        <div className="cta-group mt-8">
          <Button href="/shop" variant="secondary">
            Visit the shop
          </Button>
          <Button href="/contact" variant="outline">
            Get in touch
          </Button>
        </div>
      </Section>

      {/* Quick answers */}
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

      {/* FAQ */}
      <Section id="faq" title="About PixelNation FAQ" subtitle="History, services, and training.">
        <FAQ items={ABOUT_FAQ} />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="about-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="about-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to Work with PixelNation?
          </h2>
          <p className="mt-3 text-muted">
            Whether you need advanced repair, data recovery, or professional training,
            PixelNation is here to help.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/training" variant="secondary">
              Explore Training
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Service pages"
          >
            <Link href="/repairs" className="hover:text-accent">
              Repairs
            </Link>
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
            <Link href="/training-courses" className="hover:text-accent">
              Training Courses
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
