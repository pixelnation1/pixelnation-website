import Link from "next/link";
import type { TrainingCourse } from "@/lib/training-courses-page";

type CoursePricingCardProps = {
  course: TrainingCourse;
};

export function CoursePricingCard({ course }: CoursePricingCardProps) {
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

        <div className="mt-6 border-b border-card-border pb-6">
          <p className="text-2xl font-bold text-accent sm:text-3xl">{course.priceDisplay}</p>
          {course.priceNote ? (
            <p className="mt-1 text-xs text-muted">{course.priceNote}</p>
          ) : null}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">{course.summary}</p>
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

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover"
          >
            Book This Course
          </Link>
        </div>
      </div>
    </article>
  );
}
