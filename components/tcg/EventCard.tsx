import Link from "next/link";
import type { PixelNationEvent } from "@/lib/tcg/types";
import { Button } from "@/components/ui/Button";

function statusLabel(status: PixelNationEvent["status"]): string {
  switch (status) {
    case "registration-open":
      return "Registration open";
    case "sold-out":
      return "Sold out";
    case "cancelled":
      return "Cancelled";
    case "coming-soon":
      return "Coming soon";
    default:
      return "Scheduled";
  }
}

type EventCardProps = {
  event: PixelNationEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-card-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-accent/40 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
          {statusLabel(event.status)}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-accent-secondary">
          {event.game}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{event.title}</h3>
      <dl className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
        {event.date ? (
          <div>
            <dt className="font-medium text-foreground">Date</dt>
            <dd>{event.date}</dd>
          </div>
        ) : null}
        {event.startTime ? (
          <div>
            <dt className="font-medium text-foreground">Start time</dt>
            <dd>{event.startTime}</dd>
          </div>
        ) : null}
        {event.entryFee ? (
          <div>
            <dt className="font-medium text-foreground">Entry fee</dt>
            <dd>{event.entryFee}</dd>
          </div>
        ) : null}
        {typeof event.playerCapacity === "number" ? (
          <div>
            <dt className="font-medium text-foreground">Capacity</dt>
            <dd>{event.playerCapacity} players</dd>
          </div>
        ) : null}
        {event.format ? (
          <div>
            <dt className="font-medium text-foreground">Format</dt>
            <dd>{event.format}</dd>
          </div>
        ) : null}
        {event.location ? (
          <div>
            <dt className="font-medium text-foreground">Location</dt>
            <dd>{event.location}</dd>
          </div>
        ) : null}
      </dl>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {event.description}
      </p>
      {event.registrationUrl ? (
        <div className="mt-5">
          <Button href={event.registrationUrl} external={event.registrationUrl.startsWith("http")}>
            Register
          </Button>
        </div>
      ) : null}
    </article>
  );
}

type EventsEmptyStateProps = {
  title: string;
  body: string;
};

export function EventsEmptyState({ title, body }: EventsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-card-border bg-card px-6 py-10 text-center sm:px-10">
      <p className="text-xl font-semibold text-foreground sm:text-2xl">{title}</p>
      <p className="mx-auto mt-3 max-w-2xl text-muted leading-relaxed">{body}</p>
      <div className="cta-group mt-8 justify-center">
        <Button href="/contact">Contact for updates</Button>
        <Button href="/gaming" variant="secondary">
          Explore Gaming
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted">
        Prefer email?{" "}
        <Link href="/contact" className="text-accent hover:underline">
          Reach PixelNation
        </Link>
      </p>
    </div>
  );
}
