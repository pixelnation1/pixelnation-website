export type EventGame =
  | "pokemon"
  | "magic"
  | "lorcana"
  | "one-piece"
  | "yugioh"
  | "video-games"
  | "multi";

export type EventType =
  | "weekly"
  | "tournament"
  | "trade-night"
  | "prerelease"
  | "draft"
  | "release"
  | "learn-to-play"
  | "video-game"
  | "special";

export type EventStatus = "scheduled" | "sold-out" | "cancelled" | "completed";

export type RecurringDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type EventImage = {
  src: string;
  alt: string;
};

export type StoreEvent = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription: string;
  game: EventGame;
  eventType: EventType;
  image?: EventImage;
  /** ISO date (YYYY-MM-DD) for one-time events. */
  startDate?: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  recurring: boolean;
  recurringDay?: RecurringDay;
  entryFee: string;
  capacity?: number;
  registeredCount?: number;
  registrationRequired: boolean;
  /** Optional external registration link (Eventbrite, etc.). */
  registrationUrl?: string;
  featured: boolean;
  status: EventStatus;
  location?: string;
  format?: string;
  playerInfo?: string;
  whatToBring?: readonly string[];
  registrationInfo?: string;
  /**
   * Attach a one-time or featured event to a weekly schedule slot
   * (see lib/events/weekly-schedule.ts). Example: tuesday-rotating.
   */
  weeklySlotId?: string;
};

export type EventFilterId =
  | "upcoming"
  | "weekly"
  | "pokemon"
  | "magic"
  | "lorcana"
  | "one-piece"
  | "yugioh"
  | "video-games"
  | "special";

export type EventFilter = {
  id: EventFilterId;
  label: string;
};
