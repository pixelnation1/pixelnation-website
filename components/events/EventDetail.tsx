import Image from "next/image";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { ShareEventButton } from "@/components/events/ShareEventButton";
import { Button } from "@/components/ui/Button";
import {
  capacityLabel,
  eventTypeLabel,
  formatEventTime,
  formatEventWhen,
  gameLabel,
  getEventLocationLines,
  isFreeEntry,
  isSoldOut,
  registrationStatusLabel,
  seatsRemaining,
} from "@/lib/events";
import type { StoreEvent } from "@/lib/events/types";
import { SITE } from "@/lib/site";

type EventDetailProps = {
  event: StoreEvent;
  shareUrl: string;
};

export function EventDetail({ event, shareUrl }: EventDetailProps) {
  const soldOut = isSoldOut(event);
  const cancelled = event.status === "cancelled";
  const completed = event.status === "completed";
  const free = isFreeEntry(event);
  const showRegistration =
    event.registrationRequired && !soldOut && !cancelled && !completed;
  const remaining = seatsRemaining(event);
  const seats = capacityLabel(event);
  const locationLines = getEventLocationLines(event);

  return (
    <article>
      {event.image ? (
        <div className="relative aspect-[21/9] min-h-[220px] w-full overflow-hidden border-b border-card-border bg-background sm:min-h-[280px]">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : null}

      <section className="border-b border-card-border bg-card py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-accent/40 bg-accent-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {eventTypeLabel(event.eventType)}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-accent-secondary">
              {gameLabel(event.game)}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>
          {event.subtitle ? (
            <p className="mt-2 text-lg font-medium text-accent">{event.subtitle}</p>
          ) : null}
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-accent-secondary">
            {formatEventWhen(event)} · {formatEventTime(event)}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground">About this event</h2>
            {event.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mt-3 text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>

          {event.format ? (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Format</h2>
              <p className="mt-3 text-muted leading-relaxed">{event.format}</p>
            </section>
          ) : null}

          {event.prizing ? (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Prizing</h2>
              <p className="mt-3 text-muted leading-relaxed">{event.prizing}</p>
            </section>
          ) : null}

          {event.playerInfo ? (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Player information</h2>
              <p className="mt-3 text-muted leading-relaxed">{event.playerInfo}</p>
            </section>
          ) : null}

          {event.whatToBring?.length ? (
            <section>
              <h2 className="text-xl font-semibold text-foreground">What to bring</h2>
              <ul className="mt-3 space-y-2">
                {event.whatToBring.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showRegistration ? (
            <section
              id="register"
              className="rounded-2xl border border-card-border bg-card p-5 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-foreground">Register</h2>
              {event.registrationInfo ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {event.registrationInfo}
                </p>
              ) : null}
              <div className="mt-6">
                <EventRegistrationForm
                  eventSlug={event.slug}
                  eventTitle={event.title}
                  remainingSeats={remaining}
                />
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground">Event details</h2>
            <dl className="mt-4 space-y-3 text-sm text-muted">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  Date
                </dt>
                <dd className="mt-1">{formatEventWhen(event)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  Time
                </dt>
                <dd className="mt-1">{formatEventTime(event)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  Entry fee
                </dt>
                <dd className="mt-1">{free ? "Free" : event.entryFee}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  Registration
                </dt>
                <dd className="mt-1">{registrationStatusLabel(event)}</dd>
              </div>
              {seats ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                    Capacity
                  </dt>
                  <dd className="mt-1">{seats}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  Location
                </dt>
                <dd className="mt-1">
                  {locationLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            {free && !event.registrationRequired && !cancelled && !completed ? (
              <div className="mt-5 grid gap-2">
                <p className="rounded-lg border border-accent/40 bg-accent-muted px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-accent">
                  Free Entry
                </p>
                <p className="rounded-lg border border-accent-secondary/40 bg-accent-secondary-muted px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                  No Registration Required
                </p>
              </div>
            ) : null}

            <div className="cta-group mt-6">
              {showRegistration ? (
                event.registrationUrl ? (
                  <Button href={event.registrationUrl} external>
                    Register Now
                  </Button>
                ) : (
                  <Button href="#register">Register Now</Button>
                )
              ) : null}
              <Button href={SITE.maps.directionsUrl} variant="secondary" external>
                Get Directions
              </Button>
              <ShareEventButton title={event.title} url={shareUrl} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
