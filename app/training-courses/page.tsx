import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { TrainingCoursesStructuredData } from "@/components/services/TrainingCoursesStructuredData";
import { CoursePricingCard } from "@/components/training/CoursePricingCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  ALL_COURSES,
  COURSES_FAQ,
  INVESTIGATOR_TRACK_COURSES,
  PAYMENT_POLICY,
  REPAIR_TRACK_COURSES,
  TRAINING_COURSES_METADATA,
  TRAINING_FORMAT_NOTES,
  WHAT_STUDENTS_LEARN,
  WHO_SHOULD_ENROLL,
} from "@/lib/training-courses-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: TRAINING_COURSES_METADATA.title,
  description: TRAINING_COURSES_METADATA.description,
  alternates: { canonical: TRAINING_COURSES_METADATA.canonical },
  openGraph: {
    title: TRAINING_COURSES_METADATA.title,
    description: TRAINING_COURSES_METADATA.description,
    type: "website",
    url: TRAINING_COURSES_METADATA.canonical,
  },
};

const HERO_BULLETS = [
  "Beginner to advanced training",
  "One-on-one instruction",
  "Small group courses",
  "Real devices and practical exercises",
  "Structured troubleshooting methods",
  "Flexible course options",
] as const;

export default function TrainingCoursesPage() {
  return (
    <article>
      <TrainingCoursesStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="training-courses-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/training" className="hover:text-accent">
                Training
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Training Courses</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Microsoldering Training Courses & Pricing
            </p>
            <h1
              id="training-courses-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Microsoldering Training Courses & Pricing
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Choose from hands-on training options designed to teach real board repair,
              diagnostics, and microsoldering skills.
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
              <Button href="/shop">Book Training</Button>
              <Button href="/contact" variant="secondary">
                Request Custom Training
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
              alt="Microsoldering training courses and pricing at PixelNation"
              fill
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Repair track courses */}
      <Section
        id="repair-track"
        title="Repair track courses"
        subtitle="Hands-on microsoldering for repair shops and technicians."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {REPAIR_TRACK_COURSES.map((course) => (
            <CoursePricingCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Investigator track */}
      <Section
        id="investigator-track"
        title="Investigator track"
        subtitle="Restricted enrollment for qualified professionals."
        alt
      >
        <div className="mb-8 rounded-xl border border-accent-secondary/40 bg-accent-secondary-muted p-5">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Enrollment is limited to:</span>{" "}
            law enforcement, government agencies, military intelligence, and corporate
            investigators. This track focuses on device handling, diagnostics, and
            recovery-focused repair for professional workflows.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {INVESTIGATOR_TRACK_COURSES.map((course) => (
            <CoursePricingCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section
        id="comparison"
        title="Course comparison"
        subtitle="Compare skill level, duration, topics, and pricing at a glance."
      >
        <div className="table-scroll overflow-x-auto rounded-2xl border border-card-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-card-border bg-card">
                <th className="px-4 py-3 font-semibold text-foreground">Course</th>
                <th className="px-4 py-3 font-semibold text-foreground">Skill level</th>
                <th className="px-4 py-3 font-semibold text-foreground">Duration</th>
                <th className="px-4 py-3 font-semibold text-foreground">Topics</th>
                <th className="px-4 py-3 font-semibold text-foreground">Hands-on</th>
                <th className="px-4 py-3 font-semibold text-foreground">Experience</th>
                <th className="px-4 py-3 font-semibold text-accent">Price</th>
              </tr>
            </thead>
            <tbody>
              {ALL_COURSES.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-card-border/60 bg-background/50 even:bg-card/30"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    <span className="block text-xs text-accent-secondary">{course.track}</span>
                    {course.name}
                  </td>
                  <td className="px-4 py-3 text-muted">{course.skillLevel}</td>
                  <td className="px-4 py-3 text-muted">{course.duration}</td>
                  <td className="px-4 py-3 text-muted">
                    {course.comparison.topicsCovered}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {course.comparison.handsOnPractice}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {course.comparison.recommendedExperience}
                  </td>
                  <td className="px-4 py-3 font-bold text-accent">
                    {course.priceDisplay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Format & policies */}
      <Section
        id="policies"
        title="Training format, payment & registration"
        subtitle="What to expect when you enroll."
        alt
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">Training format</h3>
            <ul className="mt-3 space-y-2">
              {TRAINING_FORMAT_NOTES.map((note) => (
                <li key={note} className="flex gap-2 text-sm text-muted">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              All courses focus on active participation and real-world repair scenarios
              in {SITE.address.region}.
            </p>
          </div>
          <div className="space-y-4 text-sm text-muted">
            <div>
              <h3 className="font-semibold text-foreground">Payment</h3>
              <p className="mt-2 leading-relaxed">{PAYMENT_POLICY.payment}</p>
              <p className="mt-2 leading-relaxed">{PAYMENT_POLICY.government}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cancellation policy</h3>
              <p className="mt-2 leading-relaxed">{PAYMENT_POLICY.cancellation}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">After registration</h3>
              <p className="mt-2 leading-relaxed">{PAYMENT_POLICY.afterRegistration}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* What students learn */}
      <Section
        id="learning"
        title="What students learn across our courses"
        subtitle="Core skills taught throughout repair and investigator tracks."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_STUDENTS_LEARN.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/training" variant="secondary">
            Training overview
          </Button>
        </div>
      </Section>

      {/* Who should enroll */}
      <Section
        id="who-enroll"
        title="Who should enroll"
        subtitle="Courses for shops, technicians, professionals, and motivated learners."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHO_SHOULD_ENROLL.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-center text-sm font-medium text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Custom training */}
      <Section
        id="custom-training"
        title="Need custom training?"
        subtitle="Private instruction tailored to your team or agency."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation offers private instruction and customized courses tailored to your
          experience level and business goals—ideal for repair shops scaling into board work
          or organizations needing focused skill development.
        </p>
        <div className="cta-group mt-8">
          <Button href="/contact">Request Custom Training</Button>
          <Button href={SITE.phoneHref} variant="secondary" external>
            Call {SITE.phone}
          </Button>
          <Button href="/board-repair" variant="outline">
            Board repair services
          </Button>
        </div>
      </Section>

      {/* AEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Training courses and pricing at PixelNation."
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
      <Section id="faq" title="Training courses FAQ" subtitle="Booking, tools, and what is included.">
        <FAQ items={COURSES_FAQ} />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="courses-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="courses-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to learn advanced repair skills?
          </h2>
          <p className="mt-3 text-muted">
            Choose a training course and start building practical microsoldering and board
            repair skills.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/shop">Book Training</Button>
            <Button href="/contact" variant="secondary">
              Request Custom Training
            </Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Related pages"
          >
            <Link href="/training" className="hover:text-accent">
              Training overview
            </Link>
            <Link href="/board-repair" className="hover:text-accent">
              Board repair
            </Link>
            <Link href="/phone-repair" className="hover:text-accent">
              Phone repair
            </Link>
            <Link href="/console-repair" className="hover:text-accent">
              Console repair
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
