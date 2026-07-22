import type { FaqItem } from "@/lib/seo/types";
import type { TcgImage } from "@/lib/tcg/types";
import { TCG_IMAGES } from "@/lib/tcg/images";

export const WHAT_WE_CARRY_METADATA = {
  title: "What We Carry | Trading Cards & Gaming Products Emporia KS | PixelNation",
  description:
    "Trading cards, sealed products, singles, supplies, and gaming products at PixelNation in Emporia, Kansas. A guide to the categories we carry or plan to carry—contact us for availability.",
  path: "/what-we-carry",
} as const;

export type CarryCategory = {
  id: string;
  title: string;
  intro: string;
  items: readonly string[];
  /** "current" = actively stocked category, "mixed" = current + planned, "planned" = future offering */
  availability: "current" | "mixed" | "planned";
  note?: string;
  /** Example product photography for the category */
  images?: readonly TcgImage[];
};

export const CARRY_CATEGORIES: readonly CarryCategory[] = [
  {
    id: "trading-cards",
    title: "Trading cards",
    intro:
      "PixelNation supports the major trading card games with sealed products, singles interest, and accessories.",
    items: [
      "Pokémon",
      "Magic: The Gathering",
      "Yu-Gi-Oh!",
      "Disney Lorcana",
      "One Piece Card Game",
    ],
    availability: "mixed",
    note: "Each game has a dedicated page with details on products, play, and events.",
    images: [
      TCG_IMAGES.pokemonPrismaticEtb,
      TCG_IMAGES.mtgBloomburrowCommanders,
      TCG_IMAGES.pokemon151Etb,
      TCG_IMAGES.mtgFinalFantasyStarterKit,
    ],
  },
  {
    id: "sealed",
    title: "Sealed products",
    intro:
      "Sealed product selection varies by release, distributor allocation, and current inventory.",
    items: [
      "Booster packs",
      "Booster boxes",
      "Bundles",
      "Starter decks",
      "Theme decks",
      "Commander decks",
      "Elite Trainer Boxes",
      "Collection boxes",
      "Tins",
      "Gift sets",
      "Special releases",
    ],
    availability: "mixed",
    images: [
      TCG_IMAGES.pokemonDestinedRivalsBoosterBox,
      TCG_IMAGES.mtgAetherdriftBoosterBox,
      TCG_IMAGES.pokemon151BoosterBundle,
      TCG_IMAGES.mtgHobbitBundle,
    ],
  },
  {
    id: "singles",
    title: "Singles",
    intro:
      "Singles availability varies and grows over time. Depending on stock, singles may include:",
    items: [
      "Playable cards",
      "Collectible cards",
      "Foils",
      "Alternate arts",
      "Promos",
      "Bulk cards",
      "High-value cards",
    ],
    availability: "mixed",
    note: "We do not maintain an online singles catalog—contact us or visit to ask about specific cards.",
  },
  {
    id: "supplies",
    title: "Supplies & accessories",
    intro:
      "Protect and organize your collection with card supplies and gaming accessories.",
    items: [
      "Sleeves",
      "Top loaders",
      "Semi-rigid holders",
      "Deck boxes",
      "Binders",
      "Playmats",
      "Storage boxes",
      "Dice",
      "Counters",
      "Card stands",
      "Penny sleeves",
      "Team bags",
    ],
    availability: "mixed",
    images: [TCG_IMAGES.mtgStrixhavenCodexBundle],
  },
  {
    id: "gaming",
    title: "Gaming products",
    intro:
      "Gaming products are part of the plan for the expanded location. Planned categories include:",
    items: [
      "Video games",
      "Game consoles",
      "Controllers",
      "Headsets",
      "Gaming accessories",
      "Retro gaming products",
      "Used gaming products",
    ],
    availability: "planned",
    note: "These categories are planned or arriving in phases—ask us what is available today.",
  },
];

export const CARRY_AVAILABILITY_NOTICE =
  "Products and availability vary by release, distributor allocation, and current inventory. Contact PixelNation for current availability.";

export const WHAT_WE_CARRY_FAQS: readonly FaqItem[] = [
  {
    question: "Is this a live inventory list?",
    answer:
      "No. This page is a guide to the product categories PixelNation carries or plans to carry. Availability varies—contact us or visit to check current stock.",
  },
  {
    question: "Can I request a specific product?",
    answer:
      "Yes. Contact PixelNation with the product or card you are looking for and we will let you know about availability or ordering options.",
    links: [{ label: "Contact PixelNation", href: "/contact" }],
  },
  {
    question: "Do you sell card-protection supplies?",
    answer:
      "Yes—sleeves, top loaders, deck boxes, binders, and related supplies are part of our expanding accessory selection.",
  },
];
