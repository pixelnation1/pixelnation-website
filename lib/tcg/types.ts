import type { FaqItem } from "@/lib/seo/types";

export type TcgGameSlug =
  | "pokemon"
  | "magic-the-gathering"
  | "yu-gi-oh"
  | "lorcana"
  | "one-piece";

export type TcgGameStatus = "available-now" | "expanding" | "coming-soon";

export type TcgProductCategory = {
  title: string;
  description: string;
};

export type TcgImage = {
  src: string;
  alt: string;
};

export type TcgGame = {
  slug: TcgGameSlug;
  name: string;
  shortName: string;
  href: string;
  /** Short line for cards and nav */
  tagline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Brand-safe accent for placeholder visuals (CSS color) */
  accent: string;
  /** Featured product image (falls back to abstract GameVisual when absent) */
  image?: TcgImage;
  /** Product image gallery for the game page */
  gallery?: readonly TcgImage[];
  productCategories: readonly TcgProductCategory[];
  /** Game-specific product types PixelNation carries or plans to carry */
  productsCarried: readonly string[];
  sealedStatus: string;
  singlesStatus: string;
  accessoriesStatus: string;
  preorderStatus: string;
  organizedPlayStatus: string;
  buySellTradeStatus: string;
  /** Learn-to-play copy for new players */
  learnToPlay: string;
  /** Casual play copy */
  casualPlay: string;
  /** Event types planned for this game (no dates) */
  plannedEventTypes: readonly string[];
  faqs: readonly FaqItem[];
};

export type PixelNationEventStatus =
  | "scheduled"
  | "registration-open"
  | "sold-out"
  | "cancelled"
  | "coming-soon";

/** Reusable event shape for future CMS/database wiring. */
export type PixelNationEvent = {
  id: string;
  title: string;
  game: string;
  date?: string;
  /** Recurring day of week, e.g. "Fridays" */
  day?: string;
  startTime?: string;
  entryFee?: string;
  playerCapacity?: number;
  format?: string;
  skillLevel?: string;
  description: string;
  registrationUrl?: string;
  registrationNote?: string;
  status: PixelNationEventStatus;
  location?: string;
};

export type WeeklyScheduleStatus = "confirmed" | "planned" | "coming-soon";

/** One row of the weekly schedule — easy for staff to edit in lib/tcg/schedule.ts */
export type WeeklyScheduleEntry = {
  day: string;
  eventName: string;
  startTime?: string;
  endTime?: string;
  game?: string;
  description?: string;
  status: WeeklyScheduleStatus;
};

/** Informational event category (no dates) shown on the events hub. */
export type EventCategory = {
  title: string;
  game?: string;
  description: string;
  skillLevel?: string;
  status: "planned" | "coming-soon";
};

export type ReleaseStatus =
  | "preorder-open"
  | "preorder-planned"
  | "released"
  | "tbd";

/** Informational release announcement card — not an online preorder system. */
export type ReleaseAnnouncement = {
  id: string;
  productName: string;
  game: string;
  /** Human-readable expected window, e.g. "Q3 2026" — only when confirmed */
  expectedRelease?: string;
  description: string;
  availabilityNote?: string;
  status: ReleaseStatus;
};
