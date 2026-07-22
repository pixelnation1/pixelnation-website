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
  productCategories: readonly TcgProductCategory[];
  sealedStatus: string;
  singlesStatus: string;
  accessoriesStatus: string;
  preorderStatus: string;
  organizedPlayStatus: string;
  buySellTradeStatus: string;
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
  startTime?: string;
  entryFee?: string;
  playerCapacity?: number;
  format?: string;
  description: string;
  registrationUrl?: string;
  status: PixelNationEventStatus;
  location?: string;
};
