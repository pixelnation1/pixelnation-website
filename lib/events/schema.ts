import {
  eventHref,
  eventTypeLabel,
  gameLabel,
  isFreeEntry,
  isSoldOut,
  nextOccurrenceIso,
  offerPrice,
  parseClockToIsoTime,
  STORE_TIMEZONE,
  toOffsetDateTime,
} from "@/lib/events";
import type { StoreEvent } from "@/lib/events/types";
import { sitePostalAddressSchema } from "@/lib/seo/schema";
import { buildCanonical, CANONICAL_ORIGIN } from "@/lib/seo/site-seo";
import { SITE } from "@/lib/site";

function eventStatusUrl(event: StoreEvent): string {
  if (event.status === "cancelled") return "https://schema.org/EventCancelled";
  if (event.status === "completed") return "https://schema.org/EventScheduled";
  if (isSoldOut(event)) return "https://schema.org/EventScheduled";
  return "https://schema.org/EventScheduled";
}

function eventPlace() {
  return {
    "@type": "Place" as const,
    name: SITE.name,
    address: sitePostalAddressSchema(),
  };
}

function eventOffers(event: StoreEvent) {
  const url = event.registrationUrl
    ? event.registrationUrl
    : buildCanonical(eventHref(event));
  return {
    "@type": "Offer" as const,
    url,
    price: offerPrice(event),
    priceCurrency: "USD",
    availability: isSoldOut(event)
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock",
    ...(typeof event.capacity === "number"
      ? { inventoryLevel: { "@type": "QuantitativeValue", value: event.capacity } }
      : {}),
  };
}

export function eventSchema(event: StoreEvent) {
  const pageUrl = buildCanonical(eventHref(event));
  const nextDate = nextOccurrenceIso(event);
  const start = nextDate ? toOffsetDateTime(nextDate, event.startTime) : undefined;
  const end =
    nextDate && event.endTime
      ? toOffsetDateTime(nextDate, event.endTime)
      : undefined;
  const image = event.image?.src
    ? buildCanonical(event.image.src)
    : `${CANONICAL_ORIGIN}/images/pixellogo.png`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": event.recurring ? "Event" : "Event",
    "@id": `${pageUrl}#event`,
    name: event.title,
    description: event.shortDescription,
    url: pageUrl,
    image,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: eventStatusUrl(event),
    location: eventPlace(),
    organizer: {
      "@type": "LocalBusiness",
      "@id": `${CANONICAL_ORIGIN}/#localbusiness`,
      name: SITE.name,
      url: CANONICAL_ORIGIN,
      telephone: SITE.phoneSchema,
    },
    isAccessibleForFree: isFreeEntry(event),
    offers: eventOffers(event),
    about: gameLabel(event.game),
    additionalType: eventTypeLabel(event.eventType),
  };

  if (start) schema.startDate = start;
  if (end) schema.endDate = end;

  if (event.recurring && event.recurringDay) {
    const startClock = parseClockToIsoTime(event.startTime);
    const endClock = event.endTime ? parseClockToIsoTime(event.endTime) : null;
    schema.eventSchedule = {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: `https://schema.org/${capitalize(event.recurringDay)}`,
      scheduleTimezone: STORE_TIMEZONE,
      ...(startClock ? { startTime: startClock } : {}),
      ...(endClock ? { endTime: endClock } : {}),
    };
  }

  return schema;
}

export function eventsItemListSchema(events: readonly StoreEvent[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PixelNation upcoming events",
    description:
      "Upcoming trading card events, weekly trade nights, and community gaming at PixelNation in Emporia, Kansas.",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonical(eventHref(event)),
      name: event.title,
    })),
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
