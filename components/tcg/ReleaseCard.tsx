import { Button } from "@/components/ui/Button";
import type { ReleaseAnnouncement } from "@/lib/tcg/types";

function releaseStatusLabel(status: ReleaseAnnouncement["status"]): string {
  switch (status) {
    case "preorder-open":
      return "Preorders open";
    case "preorder-planned":
      return "Preorder planned";
    case "released":
      return "Released";
    default:
      return "Details coming";
  }
}

type ReleaseCardProps = {
  release: ReleaseAnnouncement;
};

/** Informational release announcement card — not an online preorder system. */
export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-card-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-accent/40 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
          {releaseStatusLabel(release.status)}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-accent-secondary">
          {release.game}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">
        {release.productName}
      </h3>
      {release.expectedRelease ? (
        <p className="mt-1 text-sm text-muted">
          Expected release: {release.expectedRelease}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {release.description}
      </p>
      {release.availabilityNote ? (
        <p className="mt-3 text-xs text-muted">{release.availabilityNote}</p>
      ) : null}
      <div className="mt-5">
        <Button href="/contact" variant="secondary">
          Contact about this release
        </Button>
      </div>
    </article>
  );
}
