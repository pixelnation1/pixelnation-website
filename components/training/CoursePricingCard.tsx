import Link from "next/link";
import type { TrainingCourse } from "@/lib/training-courses-page";
import { PRACTICAL_BOARD_REPAIR_INTENSIVE_BOOKING } from "@/lib/training-courses-page";

type CoursePricingCardProps = {
  course: TrainingCourse;
  /** Repair Track only — Investigator Track keeps the default contact booking CTA. */
  squareBooking?: boolean;
};

export function CoursePricingCard({
  course,
  squareBooking = false,
}: CoursePricingCardProps) {
  const booking = squareBooking ? PRACTICAL_BOARD_REPAIR_INTENSIVE_BOOKING : null;
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card ${
        course.featured
          ? "border-accent shadow-lg shadow-accent/10"
          : "border-card-border"
      }`}
    >
      {course.badge ? (
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-background">
            {course.badge}
          </span>
        </div>
      ) : null}
      {course.restricted ? (
        <div className="border-b border-card-border bg-accent-secondary-muted px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
            Restricted enrollment
          </p>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
          {course.track}
        </p>
        <h3 className="mt-2 pr-24 text-xl font-bold text-foreground">{course.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-card-border px-2.5 py-1 text-muted">
            {course.skillLevel}
          </span>
          <span className="rounded-md border border-card-border px-2.5 py-1 text-muted">
            {course.duration}
          </span>
        </div>
        {course.schedule ? (
          <p className="mt-2 text-sm text-muted">{course.schedule}</p>
        ) : null}

        <div className="mt-6 border-b border-card-border pb-6">
          <p className="text-2xl font-bold text-accent sm:text-3xl">{course.priceDisplay}</p>
          {course.priceNote ? (
            <p className="mt-1 text-xs text-muted">{course.priceNote}</p>
          ) : null}
        </div>

        <div className="mt-5 space-y-3">
          {course.summary.split("\n\n").map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold uppercase text-foreground">
          Who this is for
        </p>
        <p className="mt-1 text-sm text-muted">{course.audience}</p>

        <p className="mt-5 text-xs font-semibold uppercase text-foreground">
          What you will learn
        </p>
        <ul className="mt-2 space-y-1.5">
          {course.learn.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted">
              <span className="shrink-0 text-accent" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {course.handsOn && course.handsOn.length > 0 ? (
          <>
            <p className="mt-5 text-xs font-semibold uppercase text-foreground">
              Hands-on training includes
            </p>
            <ul className="mt-2 space-y-1.5">
              {course.handsOn.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="shrink-0 text-accent-secondary" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="mt-5 text-xs text-muted">
          Includes access to professional repair equipment, practice boards, and guided
          instruction during training. Students are not required to bring tools for
          scheduled group courses.
        </p>

        {booking ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-accent-secondary/40 bg-accent-secondary-muted px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                {booking.nextClassLabel}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {booking.nextClassDates}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {booking.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-foreground">
                {booking.includesNote}
              </p>
            </div>
            <p className="rounded-xl border border-card-border px-3 py-2.5 text-sm font-medium leading-snug text-foreground">
              {booking.paymentMessage}{" "}
              <Link
                href="#repair-registration-policies"
                className="font-semibold text-accent-secondary underline-offset-2 hover:underline"
              >
                Review cancellation policy
              </Link>
            </p>
            <a
              href={booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover"
            >
              {booking.ctaLabel}
            </a>
          </div>
        ) : course.restricted ? (
          <div className="mt-8 space-y-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover"
            >
              Request Agency Enrollment
            </Link>
            <p className="text-xs leading-relaxed text-muted">
              Restricted enrollment. Professional credentials or agency affiliation may be
              verified before registration is approved.
            </p>
            <p className="text-xs leading-relaxed text-muted">
              Agency invoicing, purchase orders, and alternative government payment
              arrangements may be available. Contact PixelNation for agency registration
              assistance.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover"
            >
              Book This Course
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
