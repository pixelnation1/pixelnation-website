import { REPAIR_TRACK_INSTRUCTOR } from "@/lib/training-courses-page";

export function RepairTrackInstructor() {
  return (
    <article className="mt-8 max-w-2xl rounded-2xl border border-card-border bg-card p-6 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
        {REPAIR_TRACK_INSTRUCTOR.eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-bold text-foreground">{REPAIR_TRACK_INSTRUCTOR.name}</h3>
      <div className="mt-4 space-y-3">
        {REPAIR_TRACK_INSTRUCTOR.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{REPAIR_TRACK_INSTRUCTOR.disclaimer}</p>
    </article>
  );
}
