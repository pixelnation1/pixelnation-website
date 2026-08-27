"use client";

import { useMemo, useState } from "react";
import {
  EventCard,
  EventsEmptyState,
  FeaturedEventCard,
} from "@/components/events/EventCard";
import { EVENT_FILTERS, matchesFilter } from "@/lib/events";
import type { EventFilterId, StoreEvent } from "@/lib/events/types";

type EventsHubProps = {
  events: StoreEvent[];
};

export function EventsHub({ events }: EventsHubProps) {
  const [filter, setFilter] = useState<EventFilterId>("upcoming");

  const filtered = useMemo(
    () => events.filter((event) => matchesFilter(event, filter)),
    [events, filter],
  );

  const featured = filter === "upcoming" ? filtered.filter((event) => event.featured) : [];
  const rest =
    filter === "upcoming"
      ? filtered.filter((event) => !event.featured)
      : filtered;

  const activeLabel = EVENT_FILTERS.find((item) => item.id === filter)?.label;

  return (
    <div>
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="tablist"
        aria-label="Filter events"
      >
        {EVENT_FILTERS.map((item) => {
          const active = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.id)}
              className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-accent text-background"
                  : "border border-card-border bg-card text-muted hover:border-accent-secondary hover:text-accent-secondary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EventsEmptyState filterLabel={activeLabel} />
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {featured.map((event) => (
            <FeaturedEventCard key={event.id} event={event} />
          ))}
          {rest.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {rest.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} featured={event.featured && filter !== "upcoming"} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}
