/**
 * DEVELOPMENT NOTE — SAMPLE TRADE VALUES
 * --------------------------------------
 * Values in sample-items.ts / data/trade-items.json are SAMPLE DATA for UI development.
 * They are NOT official PixelNation offers and must be reviewed and approved by
 * PixelNation staff before publishing as live trade values.
 */

export const TRADE_CATEGORIES = [
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Retro Gaming",
  "Gaming Handhelds",
  "Controllers & Accessories",
  "Virtual Reality",
  "Phones",
  "Tablets",
  "Computers",
  "Other Electronics",
] as const;

export type TradeCategory = (typeof TRADE_CATEGORIES)[number];

export const WORKING_STATUS_OPTIONS = [
  "Fully working",
  "Partially working",
  "Not working",
  "Not sure",
] as const;

export const COSMETIC_CONDITION_OPTIONS = [
  "Excellent",
  "Good",
  "Fair",
  "Damaged",
] as const;

export const PREFERRED_PAYMENT_OPTIONS = [
  "Cash",
  "Store Credit",
  "Not Sure",
] as const;

export type WorkingStatus = (typeof WORKING_STATUS_OPTIONS)[number];
export type CosmeticCondition = (typeof COSMETIC_CONDITION_OPTIONS)[number];
export type PreferredPayment = (typeof PREFERRED_PAYMENT_OPTIONS)[number];

export type TradeItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: TradeCategory | string;
  model: string;
  storage: string;
  imageUrl: string;
  /** Cash offer in integer cents */
  cashValueCents: number;
  /**
   * Store credit in integer cents.
   * When null, public UI may apply settings.storeCreditMultiplier to cash.
   * Manual values always override the multiplier.
   */
  storeCreditValueCents: number | null;
  requiredAccessories: string;
  conditionNote: string;
  acceptsNonworking: boolean;
  nonworkingNote: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  /** When true, item is sample/dev data and should show the sample banner context */
  isSample: boolean;
  repairHref: string | null;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type TradeSettings = {
  storeCreditMultiplier: number;
  showSampleDataBanner: boolean;
  /** When false, sample items are hidden from the public site */
  publishSampleItems: boolean;
};

export type TradeSubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  brand: string;
  model: string;
  storage: string;
  workingStatus: string;
  cosmeticCondition: string;
  includedAccessories: string;
  issueDescription: string;
  preferredPayment: string;
  productSlug?: string;
  productName?: string;
  estimateCashCents?: number | null;
  estimateCreditCents?: number | null;
  consent: boolean;
  /** Honeypot — must stay empty */
  website?: string;
  photoDataUrls?: string[];
};

export type PublicTradeItem = Omit<TradeItem, "internalNotes"> & {
  displayCashCents: number;
  displayStoreCreditCents: number;
};

export type TradeSortOption =
  | "name-asc"
  | "cash-desc"
  | "credit-desc"
  | "updated-desc";

export type TradeFilterState = {
  query: string;
  category: string;
  brand: string;
  workingFilter: "all" | "working-only" | "accepts-nonworking";
  sort: TradeSortOption;
};
