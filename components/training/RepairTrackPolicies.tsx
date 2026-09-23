import { Button } from "@/components/ui/Button";
import { REPAIR_TRACK_REGISTRATION_POLICIES } from "@/lib/training-courses-page";
import { SITE } from "@/lib/site";

export function RepairTrackPolicies() {
  return (
    <div className="max-w-4xl space-y-5">
      <div className="rounded-2xl border border-accent-secondary/40 bg-accent-secondary-muted px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
          Practical Board Repair Intensive
        </p>
        <p className="mt-2 text-base font-semibold leading-snug text-foreground">
          {REPAIR_TRACK_REGISTRATION_POLICIES.paymentNotice}
        </p>
        <p className="mt-1 text-sm text-muted">
          Please read the cancellation and rescheduling terms below before you pay.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {REPAIR_TRACK_REGISTRATION_POLICIES.sections.map((section) => (
          <article
            key={section.title}
            className={`rounded-2xl border border-card-border bg-card p-5 sm:p-6 ${
              section.title === "Cancellation & Rescheduling Policy"
                ? "sm:col-span-2"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold text-foreground">Contact PixelNation</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Call, email, or send a message before you register if you need help choosing
          this course.
        </p>
        <div className="cta-group mt-5">
          <Button href={SITE.phoneHref} external>
            Call {SITE.phone}
          </Button>
          <Button href={SITE.emailHref} variant="secondary" external>
            Email {SITE.email}
          </Button>
          <Button href="/contact" variant="outline">
            Contact form
          </Button>
        </div>
      </div>
    </div>
  );
}
