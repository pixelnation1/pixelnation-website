import { TCG_LAUNCH } from "@/lib/tcg/launch";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/seo/types";

export const TRADING_CARDS_METADATA = {
  title: "Trading Cards Emporia KS | TCG & Gaming | PixelNation",
  description:
    "Trading cards and gaming in Emporia, Kansas—Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana, One Piece, sealed products, singles, accessories, and upcoming events at PixelNation.",
  path: "/trading-cards",
} as const;

export const TRADING_CARDS_HERO = {
  eyebrow: `${SITE.address.region} · Trading Cards & Gaming`,
  headline: "Trading Cards & Gaming in Emporia, Kansas",
  intro:
    "PixelNation is expanding into a full local destination for trading card games, sealed products, singles, accessories, organized events, and community play—alongside the electronics repair services Emporia already trusts.",
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
    body: "Sleeves, binders, deck boxes, playmats, and storage options help protect collections and prepare decks for play. Selection grows with our trading-card inventory.",
  },
  preorders: {
    title: "Preorders & upcoming releases",
    body: TCG_LAUNCH.preorderStatus,
  },
  buySellTrade: {
    title: "Buy, sell & trade",
    body: "PixelNation plans to purchase and accept trades for eligible trading-card singles, collections, sealed products, video games, consoles, and gaming accessories. Offers may be cash or store credit.",
  },
  community: {
    title: "Local gaming community",
    body: "We are building a welcoming space for collectors, casual players, and competitive fans in Emporia. Community play and learn-to-play sessions are part of the expanded location roadmap.",
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
      "Yes. Trading cards and gaming are a primary division alongside electronics repair. Inventory is expanding—products and availability may vary. Contact us for current stock.",
  },
  {
    question: "Which games do you support?",
    answer:
      "We support Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and the One Piece Card Game, with sealed products, singles interest, and accessories.",
  },
  {
    question: "Can I buy, sell, or trade cards?",
    answer:
      "Eligible items may be reviewed for purchase or trade based on condition, authenticity, demand, and market value. Identification may be required. Final programs may change as we launch the expanded location.",
    links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
  },
  {
    question: "When are gaming events?",
    answer:
      "Weekly events and organized play are coming with our expanded location plans. We do not publish invented schedules—check the events page or contact us for updates.",
    links: [{ label: "Events", href: "/events" }],
  },
  {
    question: "Is electronics repair still available?",
    answer:
      "Absolutely. Phone, computer, console, appliance, data recovery, and board-level repair remain core PixelNation services.",
    links: [{ label: "Explore Repairs", href: "/repairs" }],
  },
];
