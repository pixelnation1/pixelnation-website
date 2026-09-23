"use client";

import Image from "next/image";
import { useCallback } from "react";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { Modal, modalPrimaryClass, modalSecondaryClass } from "@/components/events/Modal";
import { Button } from "@/components/ui/Button";
import {
  eventAccent,
  formatAgendaDate,
  type CalendarOccurrence,
} from "@/lib/events/calendar";
import {
  eventHref,
  eventTypeLabel,
  formatEventTime,
  gameLabel,
  getEventLocationLines,
  isFreeEntry,
  isSoldOut,
  registrationStatusLabel,
  seatsRemaining,
} from "@/lib/events";
import { SITE } from "@/lib/site";

type Mode = "details" | "register";

type EventDetailModalProps = {
  occurrence: CalendarOccurrence | null;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onClose: () => void;
};

export function EventDetailModal({
  occurrence,
  mode,
  onModeChange,
  onClose,
}: EventDetailModalProps) {
  const event = occurrence?.event;

  const handleClose = useCallback(() => {
    onModeChange("details");
    onClose();
  }, [onClose, onModeChange]);

  if (!occurrence || !event) return null;

  const accent = eventAccent(event);
  const soldOut = isSoldOut(event);
  const cancelled = event.status === "cancelled";
  const completed = event.status === "completed";
  const remaining = seatsRemaining(event);
  const canRegister =
    event.registrationRequired && !soldOut && !cancelled && !completed;
  const locationLines = getEventLocationLines(event);
  const titleId = "event-modal-title";
  const walkInLabel =
    event.eventType === "trade-night" ? "Free open play" : "No registration required";

  return (
    <Modal open titleId={titleId} onClose={handleClose}>
      <div className="flex items-start justify-between gap-4 border-b border-card-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          {mode === "register" ? (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-secondary">
              Register
            </p>
          ) : (
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: accent.text }}
            >
              {eventTypeLabel(event.eventType)}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-card-border text-lg text-muted hover:border-accent-secondary hover:text-foreground"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {mode === "register" ? (
          <div>
            <h2 id={titleId} className="text-2xl font-bold tracking-tight">
              Register for {event.title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {formatAgendaDate(occurrence.date)} · {formatEventTime(event)}
            </p>
            {remaining !== null ? (
              <p className="mt-3 text-sm font-semibold text-accent">
                {remaining === 1 ? "1 spot remaining" : `${remaining} spots remaining`}
              </p>
            ) : null}
            {event.registrationInfo || event.registrationDetails ? (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {event.registrationDetails ?? event.registrationInfo}
              </p>
            ) : null}
            <div className="mt-6">
              <EventRegistrationForm
                eventSlug={event.slug}
                eventTitle={event.title}
                remainingSeats={remaining}
                idPrefix="modal-reg"
              />
            </div>
            <button
              type="button"
              className={`${modalSecondaryClass} mt-4`}
              onClick={() => onModeChange("details")}
            >
              Back to details
            </button>
          </div>
        ) : (
          <div>
            <h2 id={titleId} className="text-2xl font-bold tracking-tight sm:text-3xl">
              {event.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-accent-secondary">
              {gameLabel(event.game)}
            </p>

            {canRegister ? (
              event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${modalPrimaryClass} mt-4`}
                >
                  Register now
                </a>
              ) : (
                <button
                  type="button"
                  className={`${modalPrimaryClass} mt-4`}
                  onClick={() => onModeChange("register")}
                >
                  Register now
                </button>
              )
            ) : soldOut ? (
              <p className="mt-4 rounded-lg border border-accent/50 bg-accent-muted px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-accent">
                Event sold out
              </p>
            ) : !event.registrationRequired && !cancelled && !completed ? (
              <p className="mt-4 rounded-lg border border-accent-secondary/40 bg-accent-secondary-muted px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                {walkInLabel}
              </p>
            ) : null}

            {event.image ? (
              <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl border border-card-border bg-card">
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(min-width: 640px) 42rem, 100vw"
                />
              </div>
            ) : null}

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <Detail label="Date" value={formatAgendaDate(occurrence.date)} />
              <Detail label="Time" value={formatEventTime(event)} />
              <Detail label="Entry fee" value={isFreeEntry(event) ? "Free" : event.entryFee} />
              <Detail label="Registration" value={registrationStatusLabel(event)} />
              {remaining !== null || event.capacity ? (
                <Detail
                  label="Capacity"
                  value={
                    soldOut
                      ? "Sold out"
                      : remaining !== null
                        ? remaining === 1
                          ? "1 spot remaining"
                          : `${remaining} spots remaining`
                        : `${event.capacity} seats`
                  }
                />
              ) : null}
              {event.format ? <Detail label="Format" value={event.format} /> : null}
            </dl>

            {event.prizing ? (
              <section className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-secondary">
                  Prizing
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{event.prizing}</p>
              </section>
            ) : null}

            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-secondary">
                About
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{event.shortDescription}</p>
            </section>

            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-secondary">
                Where
              </h3>
              <address className="mt-2 not-italic text-sm leading-relaxed text-muted">
                {locationLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </section>
          </div>
        )}
      </div>

      {mode === "details" ? (
        <div className="cta-group border-t border-card-border px-4 py-4 sm:px-6">
          <Button href={eventHref(event)} variant="secondary">
            View full details
          </Button>
          <Button href={SITE.maps.directionsUrl} variant="outline" external>
            Get directions
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-secondary">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

type DayEventsModalProps = {
  date: string | null;
  occurrences: CalendarOccurrence[];
  onClose: () => void;
  onSelect: (occurrence: CalendarOccurrence) => void;
};

export function DayEventsModal({
  date,
  occurrences,
  onClose,
  onSelect,
}: DayEventsModalProps) {
  const open = Boolean(date);
  const titleId = "day-events-title";

  return (
    <Modal open={open} titleId={titleId} onClose={onClose} fullScreenOnMobile={false}>
      <div className="flex items-center justify-between gap-4 border-b border-card-border px-4 py-3 sm:px-5">
        <h2 id={titleId} className="text-lg font-semibold">
          {date ? formatAgendaDate(date) : "Events"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-card-border text-lg text-muted hover:border-accent-secondary hover:text-foreground"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <ul className="max-h-[70dvh] overflow-y-auto p-3">
        {occurrences.map((item) => {
          const accent = eventAccent(item.event);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex w-full min-h-11 items-start justify-between gap-3 rounded-lg px-3 py-3 text-left hover:bg-card"
              >
                <span>
                  <span className="block font-semibold text-foreground">
                    {item.event.shortTitle ?? item.event.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {formatEventTime(item.event)}
                  </span>
                </span>
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent.border }}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
