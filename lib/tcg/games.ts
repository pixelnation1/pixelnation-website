import { TCG_LAUNCH } from "@/lib/tcg/launch";
import type { TcgGame, TcgGameSlug } from "@/lib/tcg/types";

export const TCG_GAMES: Record<TcgGameSlug, TcgGame> = {
  pokemon: {
    slug: "pokemon",
    name: "Pokémon",
    shortName: "Pokémon",
    href: "/trading-cards/pokemon",
    tagline: "Sealed products, singles, and accessories for trainers in Emporia.",
    intro:
      "Looking for Pokémon cards in Emporia, KS? PixelNation is building a local destination for the Pokémon Trading Card Game—sealed products, singles, supplies, and community play as our trading-card and gaming division expands.",
    metaTitle: "Pokémon Cards Emporia KS | Pokémon TCG | PixelNation",
    metaDescription:
      "Buy Pokémon cards in Emporia, Kansas. PixelNation offers Pokémon TCG sealed products, singles, accessories, and plans for organized play. Contact us for availability.",
    keywords: [
      "Pokémon cards Emporia KS",
      "Pokémon TCG Emporia",
      "Buy Pokémon cards Emporia",
      "Sell Pokémon cards Kansas",
    ],
    accent: "#f4c542",
    productCategories: [
      {
        title: "Sealed products",
        description:
          "Booster packs, boxes, and specialty sealed releases when available.",
      },
      {
        title: "Singles",
        description:
          "Individual cards for collectors and competitive players—ask about current stock.",
      },
      {
        title: "Accessories",
        description:
          "Sleeves, binders, deck boxes, and storage options for your collection.",
      },
      {
        title: "Preorders",
        description: TCG_LAUNCH.preorderStatus,
      },
    ],
    sealedStatus: TCG_LAUNCH.availabilityNote,
    singlesStatus:
      "Singles selection is growing. Contact us to ask about specific cards or to sell Pokémon cards in Kansas.",
    accessoriesStatus:
      "Sleeves, binders, and related supplies are part of our expanding inventory.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Pokémon collections, sealed products, and singles may be reviewed for purchase or trade. Identification may be required.",
    faqs: [
      {
        question: "Can I buy Pokémon cards at PixelNation in Emporia?",
        answer:
          "Yes—PixelNation is expanding trading-card inventory in Emporia, including Pokémon TCG products. Products and availability may vary; contact us for current stock.",
      },
      {
        question: "Do you buy or trade Pokémon cards?",
        answer:
          "We plan to purchase and accept trades for eligible Pokémon singles, collections, and sealed products based on condition, authenticity, demand, and market value. Start with a collection review request.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Will there be Pokémon events in Emporia?",
        answer:
          "Weekly gaming events and organized play are coming as PixelNation prepares for its expanded location. Follow our events page for updates.",
        links: [{ label: "View Events", href: "/events" }],
      },
    ],
  },
  "magic-the-gathering": {
    slug: "magic-the-gathering",
    name: "Magic: The Gathering",
    shortName: "MTG",
    href: "/trading-cards/magic-the-gathering",
    tagline: "MTG sealed, singles, Commander interest, and community play in Emporia.",
    intro:
      "Magic: The Gathering players in Emporia, KS can look to PixelNation for sealed product, singles, accessories, and future organized play—including interest in Commander and casual formats—as we expand into a fuller local game store experience.",
    metaTitle: "Magic the Gathering Emporia KS | MTG Cards | PixelNation",
    metaDescription:
      "MTG cards in Emporia, Kansas. PixelNation supports Magic: The Gathering sealed products, singles, Commander interest, and upcoming Magic events. Ask about availability.",
    keywords: [
      "Magic the Gathering Emporia KS",
      "MTG cards Emporia",
      "Commander Emporia KS",
      "Magic events Emporia",
    ],
    accent: "#38ddf8",
    productCategories: [
      {
        title: "Sealed products",
        description:
          "Set boosters, commander products, and specialty releases when available.",
      },
      {
        title: "Singles",
        description:
          "Cards for Constructed, Commander, and casual play—inventory grows over time.",
      },
      {
        title: "Accessories",
        description:
          "Sleeves, deck boxes, playmats, and storage for your decks and binders.",
      },
      {
        title: "Preorders",
        description: TCG_LAUNCH.preorderStatus,
      },
    ],
    sealedStatus: TCG_LAUNCH.availabilityNote,
    singlesStatus:
      "MTG singles are part of our expanding selection. Contact us for specific cards or Commander staples.",
    accessoriesStatus:
      "Deck protection and accessories are available as inventory expands.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus:
      "Magic events in Emporia are in preparation—including plans for casual and Commander-friendly play as the location expands.",
    buySellTradeStatus:
      "Eligible MTG singles, collections, and sealed products may be evaluated for cash or store credit.",
    faqs: [
      {
        question: "Where can I find MTG cards in Emporia?",
        answer:
          "PixelNation carries Magic: The Gathering products as part of our trading-card expansion in Emporia, Kansas. Availability changes as inventory grows—reach out for current stock.",
      },
      {
        question: "Do you support Commander in Emporia?",
        answer:
          "Commander is a priority interest for our community gaming plans. Formal event schedules will be announced when ready; ask us about casual play and product availability.",
      },
      {
        question: "Will there be Magic events in Emporia?",
        answer:
          "Yes—Magic events are part of our upcoming events roadmap. Check the events page or contact us for the latest updates.",
        links: [{ label: "Events", href: "/events" }],
      },
    ],
  },
  "yu-gi-oh": {
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    shortName: "Yu-Gi-Oh!",
    href: "/trading-cards/yu-gi-oh",
    tagline: "Yu-Gi-Oh! products, singles interest, and supplies in Emporia.",
    intro:
      "PixelNation supports Yu-Gi-Oh! cards in Emporia, KS with sealed products, singles interest, accessories, and plans for community play as our trading-card division grows.",
    metaTitle: "Yu-Gi-Oh Cards Emporia KS | Yu-Gi-Oh Products | PixelNation",
    metaDescription:
      "Yu-Gi-Oh cards and products in Emporia, Kansas. PixelNation offers sealed Yu-Gi-Oh! products, singles interest, accessories, and upcoming organized play. Contact for availability.",
    keywords: [
      "Yu-Gi-Oh cards Emporia KS",
      "Yu-Gi-Oh products Emporia",
    ],
    accent: "#7eb8ff",
    productCategories: [
      {
        title: "Sealed products",
        description: "Booster and specialty sealed Yu-Gi-Oh! products when available.",
      },
      {
        title: "Singles",
        description:
          "Individual cards for decks and collections—ask about current availability.",
      },
      {
        title: "Accessories",
        description: "Sleeves, deck boxes, and binders for duelists.",
      },
      {
        title: "Preorders",
        description: TCG_LAUNCH.preorderStatus,
      },
    ],
    sealedStatus: TCG_LAUNCH.availabilityNote,
    singlesStatus:
      "Yu-Gi-Oh! singles selection is expanding. Contact us with card requests or collections to sell.",
    accessoriesStatus: "Dueling supplies are added as inventory grows.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Yu-Gi-Oh! singles, collections, and sealed products may be reviewed for purchase or trade.",
    faqs: [
      {
        question: "Do you sell Yu-Gi-Oh! products in Emporia?",
        answer:
          "Yes. PixelNation is expanding Yu-Gi-Oh! product availability in Emporia, Kansas. Products and availability may vary—contact us for current stock.",
      },
      {
        question: "Can I sell Yu-Gi-Oh! cards to PixelNation?",
        answer:
          "Eligible collections and sealed products may be evaluated based on condition, authenticity, demand, and market value. Request a collection review to get started.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
    ],
  },
  lorcana: {
    slug: "lorcana",
    name: "Disney Lorcana",
    shortName: "Lorcana",
    href: "/trading-cards/lorcana",
    tagline: "Lorcana cards and products for players in Emporia, Kansas.",
    intro:
      "Disney Lorcana fans in Emporia, KS can find sealed products, singles interest, accessories, and community gaming plans at PixelNation as we grow our trading-card selection.",
    metaTitle: "Lorcana Cards Emporia KS | Disney Lorcana | PixelNation",
    metaDescription:
      "Disney Lorcana cards in Emporia, Kansas. PixelNation offers Lorcana sealed products, singles interest, accessories, and upcoming play opportunities. Ask about availability.",
    keywords: [
      "Lorcana cards Emporia KS",
      "Disney Lorcana Emporia",
    ],
    accent: "#c9a227",
    productCategories: [
      {
        title: "Sealed products",
        description: "Booster and specialty Lorcana sealed products when available.",
      },
      {
        title: "Singles",
        description:
          "Individual Lorcana cards for collectors and players—ask about stock.",
      },
      {
        title: "Accessories",
        description: "Sleeves, binders, and storage for your Lorcana collection.",
      },
      {
        title: "Preorders",
        description: TCG_LAUNCH.preorderStatus,
      },
    ],
    sealedStatus: TCG_LAUNCH.availabilityNote,
    singlesStatus:
      "Lorcana singles are part of our expanding inventory. Contact us for specific cards.",
    accessoriesStatus: "Accessories are added as our TCG selection grows.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Lorcana products and collections may be considered for buy or trade.",
    faqs: [
      {
        question: "Where can I get Lorcana cards in Emporia?",
        answer:
          "PixelNation carries Disney Lorcana as part of our trading-card expansion in Emporia, Kansas. Availability varies—contact us for current products.",
      },
      {
        question: "Will there be Lorcana play events?",
        answer:
          "Learn-to-play and community events are part of our broader events roadmap. Check the events page for updates as schedules are announced.",
        links: [{ label: "Events", href: "/events" }],
      },
    ],
  },
  "one-piece": {
    slug: "one-piece",
    name: "One Piece Card Game",
    shortName: "One Piece",
    href: "/trading-cards/one-piece",
    tagline: "One Piece Card Game products for Emporia collectors and players.",
    intro:
      "Looking for One Piece cards in Emporia, KS? PixelNation is expanding support for the One Piece Card Game with sealed products, singles interest, accessories, and future community play.",
    metaTitle: "One Piece Card Game Emporia KS | One Piece Cards | PixelNation",
    metaDescription:
      "One Piece Card Game products in Emporia, Kansas. PixelNation offers sealed One Piece cards, singles interest, accessories, and upcoming play opportunities. Contact for availability.",
    keywords: [
      "One Piece Card Game Emporia KS",
      "One Piece cards Emporia",
    ],
    accent: "#ff6b4a",
    productCategories: [
      {
        title: "Sealed products",
        description:
          "Booster and specialty sealed One Piece Card Game products when available.",
      },
      {
        title: "Singles",
        description:
          "Individual cards for decks and collections—ask about current availability.",
      },
      {
        title: "Accessories",
        description: "Sleeves, deck boxes, and storage for One Piece decks.",
      },
      {
        title: "Preorders",
        description: TCG_LAUNCH.preorderStatus,
      },
    ],
    sealedStatus: TCG_LAUNCH.availabilityNote,
    singlesStatus:
      "One Piece singles selection is growing. Contact us with requests or collections to sell.",
    accessoriesStatus: "Accessories are added alongside sealed and singles inventory.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible One Piece sealed products, singles, and collections may be reviewed for purchase or trade.",
    faqs: [
      {
        question: "Do you sell One Piece cards in Emporia?",
        answer:
          "Yes. PixelNation is expanding One Piece Card Game inventory in Emporia, Kansas. Products and availability may vary—contact us for current stock.",
      },
      {
        question: "Can I preorder One Piece releases?",
        answer:
          "Preorders depend on release timing and demand. Contact us for current preorder information.",
      },
    ],
  },
};

export const TCG_GAME_LIST = Object.values(TCG_GAMES);

export const TCG_GAME_SLUGS = Object.keys(TCG_GAMES) as TcgGameSlug[];

export function getTcgGame(slug: string): TcgGame | undefined {
  if (slug in TCG_GAMES) {
    return TCG_GAMES[slug as TcgGameSlug];
  }
  return undefined;
}

export function isTcgGameSlug(slug: string): slug is TcgGameSlug {
  return slug in TCG_GAMES;
}
