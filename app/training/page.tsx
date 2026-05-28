import Image from "next/image";
import Link from "next/link";

import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { TrainingPageFaq } from "@/components/faq/RepairPageFaq";
import { TrainingStructuredData } from "@/components/services/TrainingStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  COURSE_OBJECTIVES,
  COURSE_TOPICS,
  HERO_BULLETS,
  SKILL_LEVELS,
  STUDENT_LEARNING,
  TOOLS_EQUIPMENT,
  TRAINING_FORMATS,
  TRAINING_METADATA,
  WHATS_PROVIDED,
  WHO_IS_FOR,
  WHY_TRAIN_BENEFITS,
  WORKSHOP_CURRICULUM,
} from "@/lib/training-page";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(TRAINING_METADATA);

export default function TrainingPage() {
  return (
    <article>
      <TrainingStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="training-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Training</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Microsoldering Classes Kansas · Board Repair Training
            </p>
            <h1
              id="training-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Microsoldering & Board Repair Training
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Hands-on training designed to teach real diagnostics, microsoldering, and
              board-level repair for phones, game consoles, computers, and electronics.
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
              <Button href="/training-courses">View Courses & Pricing</Button>
              <Button href="/contact" variant="secondary">
                Book Training
              </Button>
              <Button href="#course-options" variant="outline">
                Course Topics
              </Button>
              <Button href={SITE.phoneHref} variant="outline" external>
                Call {SITE.phone}
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
            <Image
              src="/images/boardrepair.png"
              alt="Hands-on microsoldering and board repair training at PixelNation"
              fill
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Why train */}
      <Section
        id="why-train"
        title="Learn practical skills you can use immediately"
        subtitle="Real repair work—not theory alone."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation training focuses on real repair work rather than theory alone.
          Students learn under a microscope, practice on real circuit boards, and gain
          structured troubleshooting skills they can apply to customer devices and
          business workflows. The majority of workshop time is spent performing actual
          repairs and guided practice—not sitting through lectures.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_TRAIN_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </Section>

      {/* Course topics */}
      <Section
        id="course-options"
        title="Course topics"
        subtitle="Foundational through advanced board-level skills for modern repair shops."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSE_TOPICS.map((topic) => (
            <article
              key={topic.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{topic.title}</h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {topic.keyword}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* 3-day workshop */}
      <Section
        id="workshop"
        title="Hands-on microsoldering & diagnostics workshop"
        subtitle="3-day structured curriculum in Emporia, Kansas—seats limited to 4 students."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          This flagship workshop provides practical, hands-on training in board-level
          repair and microsoldering. Students work directly on real devices and practice
          common repair scenarios under guided instruction—developing foundational skills
          that can be applied immediately in a repair environment.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {WORKSHOP_CURRICULUM.map((block) => (
            <article
              key={block.day}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-accent">{block.day}</h3>
              <ul className="mt-4 space-y-2">
                {block.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-accent-secondary/30 bg-accent-secondary-muted p-5">
          <p className="text-sm font-semibold text-foreground">By the end of training, students will:</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {COURSE_OBJECTIVES.map((objective) => (
              <li key={objective} className="flex gap-2 text-sm text-muted">
                <span className="text-accent" aria-hidden>
                  ✓
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-muted">
          <span className="font-medium text-foreground">Location:</span> {SITE.name},{" "}
          {SITE.address.region} ·{" "}
          <span className="font-medium text-foreground">Duration:</span> 3-day workshop
          (exact schedule provided upon registration)
        </p>
      </Section>

      {/* Who is for */}
      <Section
        id="who-for"
        title="Who this training is for"
        subtitle="From first-time learners to experienced bench techs leveling up."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHO_IS_FOR.map((audience) => (
            <article
              key={audience.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{audience.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Skill levels */}
      <Section
        id="skill-levels"
        title="Skill levels"
        subtitle="Beginner through advanced paths—including private training for complex work."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {SKILL_LEVELS.map((tier) => (
            <article
              key={tier.level}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="text-lg font-semibold text-accent">{tier.level}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tier.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          The 3-day workshop focuses on foundational skills and common repair scenarios.
          Advanced board-level diagnostics and specialized repairs may be offered in
          future courses or through one-on-one private training—contact us for options.
        </p>
      </Section>

      {/* What students learn */}
      <Section
        id="learning"
        title="What students will learn"
        subtitle="Bench skills that translate directly to customer repairs."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENT_LEARNING.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Tools */}
      <Section
        id="tools"
        title="Tools and equipment used"
        subtitle="Professional repair bench gear—provided during training."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS_EQUIPMENT.map((tool) => (
            <li
              key={tool}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-center text-sm font-medium text-muted"
            >
              {tool}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground">What is provided</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {WHATS_PROVIDED.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <span className="text-accent-secondary" aria-hidden>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Students are not required to bring tools for the group workshop.
          </p>
        </div>
      </Section>

      {/* Formats */}
      <Section
        id="formats"
        title="Training formats"
        subtitle="Choose the instruction style that fits your goals and schedule."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {TRAINING_FORMATS.map((format) => (
            <article
              key={format.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{format.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {format.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section
        id="outcomes"
        title="Build skills that can increase your repair capability"
        subtitle="Expand services, confidence, and revenue potential."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Students gain practical skills that can expand the range of repairs they can
          offer, improve troubleshooting confidence, and open new revenue opportunities.
          Whether you run a shop or want to start one, structured microsoldering training
          helps you handle board-level faults that part-swap-only workflows cannot fix.
        </p>
        <div className="cta-group mt-8">
          <Button href="/board-repair">Board repair services</Button>
          <Button href="/phone-repair" variant="secondary">
            Phone repair
          </Button>
          <Button href="/console-repair" variant="outline">
            Console repair
          </Button>
        </div>
      </Section>

      {/* Quick answers */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Microsoldering training at PixelNation in Kansas."
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
        title="Training FAQ"
        subtitle="Experience, tools, booking, and what to expect."
      >
        <TrainingPageFaq />
      </Section>

      {/* Booking */}
      <section
        id="booking"
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="training-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="training-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to learn advanced repair skills?
          </h2>
          <p className="mt-3 text-muted">
            Seats are limited to ensure individual instruction. Reserve your spot through
            the shop or contact us for private and custom training in Emporia, Kansas.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/training-courses">View Courses & Pricing</Button>
            <Button href="/contact">Book Training</Button>
            <Button href="/contact" variant="secondary">
              Contact for Custom Training
            </Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Related pages"
          >
            <Link href="/board-repair" className="hover:text-accent">
              Board Repair
            </Link>
            <Link href="/phone-repair" className="hover:text-accent">
              Phone Repair
            </Link>
            <Link href="/console-repair" className="hover:text-accent">
              Console Repair
            </Link>
            <Link href="/data-recovery" className="hover:text-accent">
              Data Recovery
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
