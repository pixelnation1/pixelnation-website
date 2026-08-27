import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  capacityLabel,
  eventHref,
  eventTypeLabel,
  formatEventTime,
  formatEventWhen,
  gameLabel,
  isFreeEntry,
  isSoldOut,
  registrationStatusLabel,
} from "@/lib/events";
import type { StoreEvent } from "@/lib/events/types";

type EventCardProps = {
  event: StoreEvent;
  featured?: boolean;
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const seats = capacityLabel(event);
  const soldOut = isSoldOut(event);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-card ${
        featured
          ? "border-accent/70 shadow-lg shadow-accent/10"
          : "border-card-border"
      }`}
    >
      {event.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-card-border bg-background">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            className="object-cover"
            sizes={featured ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-accent/40 bg-accent-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {eventTypeLabel(event.eventType)}
          </span>
          {featured ? (
            <span className="rounded-md border border-accent-secondary/40 bg-accent-secondary-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-secondary">
              Featured
            </span>
          ) : null}
          {soldOut ? (
            <span className="rounded-md border border-card-border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Sold Out
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          {event.title}
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-secondary">
          {gameLabel(event.game)}
        </p>

        <dl className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <div>
            <dt className="font-medium text-foreground">Date</dt>
            <dd>{formatEventWhen(event)}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Time</dt>
            <dd>{formatEventTime(event)}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Entry</dt>
            <dd>{isFreeEntry(event) ? "Free" : event.entryFee}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Registration</dt>
            <dd>{registrationStatusLabel(event)}</dd>
          </div>
          {seats ? (
            <div className="sm:col-span-2">
              <dt className="font-medium text-foreground">Capacity</dt>
              <dd>{seats}</dd>
            </div>
          ) : null}
        </dl>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
          {event.shortDescription}
        </p>

        <div className="mt-5">
          <Button href={eventHref(event)}>View Event</Button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedEventCard({ event }: { event: StoreEvent }) {
  const seats = capacityLabel(event);

  return (
    <article className="overflow-hidden rounded-2xl border border-accent/70 bg-card shadow-lg shadow-accent/10">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {event.image ? (
          <div className="relative min-h-[220px] overflow-hidden border-b border-card-border bg-background lg:min-h-full lg:border-b-0 lg:border-r">
            <Image
              src={event.image.src}
              alt={event.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        ) : null}
        <div className="flex flex-col p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-accent/40 bg-accent-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Featured
            </span>
            <span className="rounded-md border border-accent-secondary/40 bg-accent-secondary-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-secondary">
              {eventTypeLabel(event.eventType)}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {event.title}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-secondary">
            {gameLabel(event.game)}
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-accent">
            {formatEventWhen(event)} · {formatEventTime(event)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {event.shortDescription}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            <li>
              <span className="font-medium text-foreground">Entry:</span>{" "}
              {isFreeEntry(event) ? "Free" : event.entryFee}
            </li>
            <li>
              <span className="font-medium text-foreground">Registration:</span>{" "}
              {registrationStatusLabel(event)}
            </li>
            {seats ? (
              <li>
                <span className="font-medium text-foreground">Capacity:</span> {seats}
              </li>
            ) : null}
          </ul>
          <div className="mt-6">
            <Button href={eventHref(event)}>View Event</Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EventsEmptyState({ filterLabel }: { filterLabel?: string }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card px-6 py-10 text-center sm:px-10">
      <p className="text-xl font-semibold text-foreground sm:text-2xl">
        {filterLabel
          ? `No ${filterLabel.toLowerCase()} on the calendar right now.`
          : "No upcoming events posted right now."}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-muted leading-relaxed">
        Check PixelNation Friday Nights or contact us for the latest community
        gaming details.
      </p>
      <p className="mt-6 text-sm text-muted">
        <Link href="/contact" className="text-accent hover:underline">
          Contact PixelNation
        </Link>
      </p>
    </div>
  );
}
