import { TCG_LAUNCH } from "@/lib/tcg/launch";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/seo/types";

export const TRADING_CARDS_METADATA = {
  title: "Trading Cards Emporia KS | TCG & Gaming | PixelNation",
  description:
    "Trading cards and gaming in Emporia, Kansas—Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana, One Piece, sealed products, singles, accessories, and weekly events at PixelNation.",
  path: "/trading-cards",
} as const;

export const TRADING_CARDS_HERO = {
  eyebrow: `${SITE.address.region} · Trading Cards & Gaming`,
  headline: "Trading Cards, Gaming and Community in Emporia",
  intro:
    "PixelNation is a local destination for trading cards, sealed products, accessories, organized play, casual gaming, and community events in downtown Emporia.",
} as const;

/** Broad product list for the "What we carry" section on /trading-cards. */
export const TRADING_CARDS_CARRY_ITEMS = [
  "Booster packs",
  "Booster boxes",
  "Elite Trainer Boxes",
  "Collection boxes",
  "Starter decks",
  "Commander decks",
  "Theme decks",
  "Bundles",
  "Gift sets",
  "Trading-card singles",
  "Card sleeves",
  "Deck boxes",
  "Binders",
  "Playmats",
  "Storage boxes",
  "Dice and counters",
  "Gaming accessories",
] as const;

export const TRADING_CARDS_CARRY_NOTICE =
  "Products and availability vary by release, distributor allocation, and current inventory. Contact PixelNation for current availability.";

/** Who the local community is for — welcoming, not competitive-first. */
export const TRADING_CARDS_COMMUNITY = {
  title: "A welcoming local community",
  intro:
    "PixelNation’s goal is a friendly, accessible place to play, collect, and learn—no matter where you are starting from.",
  audiences: [
    "New players picking up their first deck",
    "Experienced players looking for regular games",
    "Collectors building and protecting collections",
    "Families and kids learning together",
    "Casual groups who just want a fun night",
    "Competitive players preparing for organized play",
    "Anyone learning a new game for the first time",
  ],
} as const;

export const TRADING_CARDS_SECTIONS = {
  sealed: {
    title: "Sealed products",
    body: `Booster packs, boxes, and specialty sealed releases across supported games. ${TCG_LAUNCH.availabilityNote}`,
  },
  singles: {
    title: "Singles",
    body: `Individual cards for collectors and competitive players. ${TCG_LAUNCH.inventoryExpanding} ${TCG_LAUNCH.contactAvailability}`,
  },
  accessories: {
    title: "Supplies & accessories",
    body: "Sleeves, binders, deck boxes, playmats, and storage options help protect collections and prepare decks for play. Selection varies.",
  },
  preorders: {
    title: "Preorders & upcoming releases",
    body: TCG_LAUNCH.preorderStatus,
  },
  buySellTrade: {
    title: "Buy, sell & trade",
    body: "PixelNation buys and trades eligible trading-card singles, collections, sealed products, video games, consoles, and gaming accessories. Offers may be cash or store credit.",
  },
  community: {
    title: "Local gaming community",
    body: "We are a welcoming space for collectors, casual players, and competitive fans in Emporia. Join community play and weekly events at our downtown shop.",
  },
  events: {
    title: "Events & organized play",
    body: TCG_LAUNCH.eventsComing,
  },
} as const;

export const TRADING_CARDS_FAQS: readonly FaqItem[] = [
  {
    question: "Does PixelNation sell trading cards in Emporia?",
    answer:
      "Yes. Trading cards and gaming are a primary division alongside electronics repair. Selection and availability vary—contact PixelNation for current stock.",
  },
  {
    question: "Which games do you support?",
    answer:
      "We support Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and the One Piece Card Game, with sealed products, singles, and accessories.",
  },
  {
    question: "Can I buy, sell, or trade cards?",
    answer:
      "Eligible items may be reviewed for purchase or trade based on condition, authenticity, demand, and market value. Identification may be required. PixelNation may decline any item or collection.",
    links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
  },
  {
    question: "When are gaming events?",
    answer:
      "PixelNation has a weekly schedule including Pokémon Night every Wednesday, Commander on Thursday, Friday Night Magic, retro gaming, and Sunday trade & play. Check the events page for the full calendar.",
    links: [{ label: "Events", href: "/events" }],
  },
  {
    question: "Is electronics repair still available?",
    answer:
      "Absolutely. Phone, computer, console, appliance, data recovery, and board-level repair remain core PixelNation services.",
    links: [{ label: "Explore Repairs", href: "/repairs" }],
  },
];
