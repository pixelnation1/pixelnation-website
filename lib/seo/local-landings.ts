import type { FaqItem } from "@/lib/seo/types";

export type LocalLandingSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type LocalLandingPage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  eyebrow: string;
  h1: string;
  intro: string;
  sections: readonly LocalLandingSection[];
  faqs: readonly FaqItem[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  relatedLinks: readonly { label: string; href: string; description?: string }[];
  /** Optional schema hint for repair-oriented landings */
  schemaKind?: "hobby" | "repair" | "service";
};

/**
 * Unique local SEO landings. Each page has its own angle and must not clone
 * /trading-cards/[game], /console-repair, /buy-sell-trade, or /preorders-new-releases.
 */
export const LOCAL_LANDING_PAGES: Record<string, LocalLandingPage> = {
  "pokemon-cards-emporia-ks": {
    slug: "pokemon-cards-emporia-ks",
    path: "/pokemon-cards-emporia-ks",
    metaTitle: "Pokémon Cards in Emporia KS | Local TCG | PixelNation",
    metaDescription:
      "Looking for Pokémon cards in Emporia, Kansas? Learn how PixelNation helps local trainers find sealed products, singles interest, supplies, and a welcoming place to play.",
    keywords: [
      "Pokémon cards Emporia KS",
      "Pokémon TCG Emporia",
      "buy Pokémon cards Emporia",
    ],
    eyebrow: "Emporia, Kansas · Pokémon TCG",
    h1: "Pokémon Cards in Emporia, KS",
    intro:
      "If you live in Emporia or nearby and want Pokémon cards without driving across the state, PixelNation is building a local home for trainers—sealed products when available, growing singles interest, accessories, and community play plans that welcome beginners and collectors alike.",
    sections: [
      {
        heading: "What Emporia trainers usually need",
        paragraphs: [
          "Most local searches for Pokémon cards are practical: a booster for a birthday, an Elite Trainer Box for a new player, sleeves for a first deck, or a place to ask whether a specific card can be sourced. PixelNation answers those needs with honest availability updates—not a fake online catalog.",
          "Because inventory changes with releases and distributor timing, the best next step is often a quick message or visit. We would rather confirm stock than overpromise on a product page.",
        ],
      },
      {
        heading: "A local alternative to big-box aisles",
        paragraphs: [
          "National retailers sometimes carry Pokémon product, but a local game store conversation is different. You can ask which starter product fits a child, how Prize cards work, or whether a learn-to-play night is coming. That guidance is part of why people seek Pokémon cards in Emporia specifically.",
          "PixelNation pairs that community approach with the same shop that already repairs phones and consoles—so families already visiting for tech help can discover cards in the same trusted place.",
        ],
      },
      {
        heading: "How to get started in Emporia",
        paragraphs: [
          "New trainers can begin with a battle deck or other beginner-friendly product, then grow into packs, Elite Trainer Boxes, and binders. Experienced players can ask about singles interest, collection reviews, or upcoming Pokémon play.",
          "For deeper game information—product categories, FAQs, and why we carry Pokémon—visit our dedicated Pokémon trading cards page. This Emporia landing page is focused on helping locals understand what is available nearby and how to connect with the shop.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where can I buy Pokémon cards in Emporia, Kansas?",
        answer:
          "PixelNation in Emporia carries or sources Pokémon TCG sealed products and related supplies as inventory expands. Availability varies—contact us or visit to check current stock.",
        links: [{ label: "Pokémon game page", href: "/trading-cards/pokemon" }],
      },
      {
        question: "Do you help beginners find the right Pokémon products?",
        answer:
          "Yes. Ask about starter-friendly options and learn-to-play resources. Experienced players are also welcome to help teach newcomers.",
        links: [{ label: "Learn to Play", href: "/learn-to-play" }],
      },
      {
        question: "Can I sell Pokémon cards in Emporia?",
        answer:
          "Eligible collections may be reviewed for purchase or trade based on condition, authenticity, demand, and market value.",
        links: [{ label: "Sell Pokémon Cards", href: "/sell-pokemon-cards" }],
      },
    ],
    primaryCta: { label: "Ask about Pokémon availability", href: "/contact" },
    secondaryCta: { label: "Pokémon trading cards page", href: "/trading-cards/pokemon" },
    relatedLinks: [
      { label: "Pokémon at PixelNation", href: "/trading-cards/pokemon", description: "Products, play, and FAQs" },
      { label: "Learn to Play", href: "/learn-to-play", description: "Beginner Pokémon guide" },
      { label: "Sell Pokémon Cards", href: "/sell-pokemon-cards", description: "Collection review interest" },
      { label: "Family Gaming", href: "/family-gaming", description: "Family-friendly play vision" },
      { label: "Trading Cards Overview", href: "/trading-cards" },
    ],
    schemaKind: "hobby",
  },

  "magic-the-gathering-emporia-ks": {
    slug: "magic-the-gathering-emporia-ks",
    path: "/magic-the-gathering-emporia-ks",
    metaTitle: "Magic the Gathering in Emporia KS | MTG | PixelNation",
    metaDescription:
      "Magic: The Gathering in Emporia, Kansas—local sealed interest, Commander focus, accessories, and community play plans at PixelNation.",
    keywords: [
      "Magic the Gathering Emporia KS",
      "MTG Emporia",
      "Commander Emporia KS",
    ],
    eyebrow: "Emporia, Kansas · Magic: The Gathering",
    h1: "Magic: The Gathering in Emporia, KS",
    intro:
      "Emporia Magic players deserve more than mail-order alone. PixelNation is growing MTG support locally—Play Boosters and Commander products when available, accessories, singles interest, and planned nights where pods can actually meet in person.",
    sections: [
      {
        heading: "Why local Magic still matters",
        paragraphs: [
          "Online markets are convenient, but Magic thrives at the table. Commander politics, draft chaos, and prerelease energy are social experiences. Building MTG presence in Emporia means making those moments possible closer to home.",
          "Our Emporia focus is practical: help you find sealed product when we have it, point beginners toward precons or starter kits, and prepare Commander-friendly community nights without inventing fake schedules.",
        ],
      },
      {
        heading: "Commander as the local gateway",
        paragraphs: [
          "For many Kansas players, Commander is the friendliest doorway into Magic. Multiplayer games encourage conversation, precon decks lower the barrier, and power-level talk keeps tables honest. PixelNation treats Commander as a community priority—not a side note.",
          "Read our Commander Nights page for format education. Use this page when you are searching specifically for Magic the Gathering in Emporia and want the local shop context.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Contact us about current sealed or singles interest, browse the full Magic game page for product categories, or ask about learn-to-play help. If you have a collection to sell, we also review eligible Magic cards through our buy/sell process.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there an MTG store in Emporia?",
        answer:
          "PixelNation is expanding Magic: The Gathering products and community play in Emporia, Kansas. We are not claiming official tournament status until confirmed—ask us what is available now.",
        links: [
          { label: "Magic game page", href: "/trading-cards/magic-the-gathering" },
        ],
      },
      {
        question: "Do you support Commander in Emporia?",
        answer:
          "Yes—Commander is a priority for our community plans. Formal night schedules will be announced when ready.",
        links: [{ label: "Commander Nights", href: "/commander-nights" }],
      },
      {
        question: "Can I sell Magic cards locally?",
        answer:
          "Eligible MTG singles, collections, and sealed products may be evaluated for cash or store credit.",
        links: [{ label: "Sell Magic Cards", href: "/sell-magic-cards" }],
      },
    ],
    primaryCta: { label: "Ask about Magic availability", href: "/contact" },
    secondaryCta: {
      label: "Magic trading cards page",
      href: "/trading-cards/magic-the-gathering",
    },
    relatedLinks: [
      {
        label: "Magic: The Gathering",
        href: "/trading-cards/magic-the-gathering",
        description: "Products and play details",
      },
      { label: "Commander Nights", href: "/commander-nights" },
      { label: "Sell Magic Cards", href: "/sell-magic-cards" },
      { label: "Weekly Events", href: "/weekly-events" },
      { label: "Learn to Play", href: "/learn-to-play" },
    ],
    schemaKind: "hobby",
  },

  "yu-gi-oh-cards-emporia-ks": {
    slug: "yu-gi-oh-cards-emporia-ks",
    path: "/yu-gi-oh-cards-emporia-ks",
    metaTitle: "Yu-Gi-Oh Cards in Emporia KS | PixelNation",
    metaDescription:
      "Yu-Gi-Oh! cards in Emporia, Kansas. PixelNation supports sealed products, Structure Decks, singles interest, accessories, and local dueling community plans.",
    keywords: ["Yu-Gi-Oh cards Emporia KS", "Yu-Gi-Oh products Emporia"],
    eyebrow: "Emporia, Kansas · Yu-Gi-Oh!",
    h1: "Yu-Gi-Oh! Cards in Emporia, KS",
    intro:
      "Duelists in Emporia looking for Yu-Gi-Oh! cards can turn to PixelNation for sealed interest, Structure Deck starting points, accessories, and a shop culture that welcomes both nostalgia players and new duelists learning summons for the first time.",
    sections: [
      {
        heading: "Local Yu-Gi-Oh! without the guesswork",
        paragraphs: [
          "Searching “Yu-Gi-Oh cards Emporia” usually means you want a real person who understands Structure Decks, sleeves, and whether a release is worth chasing. We keep answers honest: products and availability vary, and we will say so.",
          "Structure Decks remain one of the best ways for Emporia beginners to feel competitive quickly while learning timing at a comfortable pace.",
        ],
      },
      {
        heading: "Community play for duelists",
        paragraphs: [
          "Casual dueling and local event interest are part of PixelNation’s roadmap. Until exact dates are published, use our weekly events placeholders and contact channel to stay informed—never invented tournament claims.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where can I get Yu-Gi-Oh! products in Emporia?",
        answer:
          "PixelNation is expanding Yu-Gi-Oh! sealed products and supplies in Emporia. Contact us for current availability.",
        links: [{ label: "Yu-Gi-Oh! page", href: "/trading-cards/yu-gi-oh" }],
      },
      {
        question: "Are Structure Decks good for beginners?",
        answer:
          "Yes. Structure Decks are a strong entry point. Pair one with sleeves and a patient teaching partner.",
        links: [{ label: "Learn to Play", href: "/learn-to-play#yugioh" }],
      },
    ],
    primaryCta: { label: "Contact about Yu-Gi-Oh!", href: "/contact" },
    secondaryCta: { label: "Yu-Gi-Oh! game page", href: "/trading-cards/yu-gi-oh" },
    relatedLinks: [
      { label: "Yu-Gi-Oh! at PixelNation", href: "/trading-cards/yu-gi-oh" },
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Learn to Play", href: "/learn-to-play" },
      { label: "Trading Card Store Emporia", href: "/trading-card-store-emporia-ks" },
    ],
    schemaKind: "hobby",
  },

  "disney-lorcana-emporia-ks": {
    slug: "disney-lorcana-emporia-ks",
    path: "/disney-lorcana-emporia-ks",
    metaTitle: "Disney Lorcana in Emporia KS | Lorcana Cards | PixelNation",
    metaDescription:
      "Disney Lorcana cards in Emporia, Kansas—starter decks, sealed interest, Illumineer’s Troves when available, and family-friendly play plans at PixelNation.",
    keywords: ["Lorcana cards Emporia KS", "Disney Lorcana Emporia"],
    eyebrow: "Emporia, Kansas · Disney Lorcana",
    h1: "Disney Lorcana in Emporia, KS",
    intro:
      "Families and collectors searching for Disney Lorcana in Emporia can find a local shop approach at PixelNation—starter decks for learning, sealed interest as inventory grows, and a family-friendly gaming vision that fits Lorcana’s welcoming style.",
    sections: [
      {
        heading: "Why Lorcana fits Emporia families",
        paragraphs: [
          "Lorcana’s questing gameplay and Disney art make it one of the easiest TCGs to share across ages. Parents looking for a hobby night option in Emporia often want guidance more than a random blister pack—and that is where a local conversation helps.",
          "We emphasize respectful tables and beginner patience so first games feel encouraging, not intimidating.",
        ],
      },
      {
        heading: "Products vs. community pages",
        paragraphs: [
          "Use this landing when you specifically need Lorcana near Emporia. For product categories, gallery examples, and game FAQs, continue to the dedicated Lorcana trading cards page. For family norms, see Family Gaming.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I buy Lorcana cards in Emporia?",
        answer:
          "PixelNation carries Disney Lorcana as part of our trading-card expansion. Availability varies—ask us what is in stock.",
        links: [{ label: "Lorcana page", href: "/trading-cards/lorcana" }],
      },
      {
        question: "Is Lorcana good for kids?",
        answer:
          "Many families find Lorcana approachable. We encourage respectful play and adult guidance for younger players.",
        links: [{ label: "Family Gaming", href: "/family-gaming" }],
      },
    ],
    primaryCta: { label: "Ask about Lorcana", href: "/contact" },
    secondaryCta: { label: "Lorcana game page", href: "/trading-cards/lorcana" },
    relatedLinks: [
      { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
      { label: "Family Gaming", href: "/family-gaming" },
      { label: "Learn to Play", href: "/learn-to-play#lorcana" },
      { label: "What to Expect", href: "/what-to-expect" },
    ],
    schemaKind: "hobby",
  },

  "one-piece-card-game-emporia-ks": {
    slug: "one-piece-card-game-emporia-ks",
    path: "/one-piece-card-game-emporia-ks",
    metaTitle: "One Piece Card Game Emporia KS | PixelNation",
    metaDescription:
      "One Piece Card Game in Emporia, Kansas—Starter Decks, sealed interest, accessories, and community play plans for anime fans and new players.",
    keywords: [
      "One Piece Card Game Emporia KS",
      "One Piece cards Emporia",
    ],
    eyebrow: "Emporia, Kansas · One Piece Card Game",
    h1: "One Piece Card Game in Emporia, KS",
    intro:
      "Fans searching for the One Piece Card Game in Emporia can connect with PixelNation for Starter Deck on-ramps, sealed product interest, accessories, and a community that is happy to explain DON!! and Life cards to newcomers.",
    sections: [
      {
        heading: "Anime energy, local tables",
        paragraphs: [
          "One Piece brings recognizable Leaders and lively matches. Emporia players should not have to leave town just to ask which Starter Deck matches their favorite crew. We keep answers grounded in what we can actually carry and teach.",
          "Casual play nights are planned as the expanded location develops. Until then, contact us and follow weekly event updates.",
        ],
      },
      {
        heading: "Start with a Starter Deck",
        paragraphs: [
          "Most beginners do best with an official Starter Deck, sleeves, and a patient partner. Our Learn to Play guide walks through first steps; the full One Piece game page covers product types and FAQs in more depth.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you sell One Piece cards in Emporia?",
        answer:
          "Yes—PixelNation is expanding One Piece Card Game inventory in Emporia. Contact us for current stock.",
        links: [{ label: "One Piece page", href: "/trading-cards/one-piece" }],
      },
      {
        question: "How do beginners start One Piece?",
        answer:
          "Choose a Starter Deck you recognize, learn Life and DON!! basics, then grow into boosters and accessories.",
        links: [{ label: "Learn to Play", href: "/learn-to-play#one-piece" }],
      },
    ],
    primaryCta: { label: "Ask about One Piece", href: "/contact" },
    secondaryCta: { label: "One Piece game page", href: "/trading-cards/one-piece" },
    relatedLinks: [
      { label: "One Piece Card Game", href: "/trading-cards/one-piece" },
      { label: "Learn to Play", href: "/learn-to-play" },
      { label: "Weekly Events", href: "/weekly-events" },
      { label: "Gaming Community", href: "/gaming-community" },
    ],
    schemaKind: "hobby",
  },

  "trading-card-store-emporia-ks": {
    slug: "trading-card-store-emporia-ks",
    path: "/trading-card-store-emporia-ks",
    metaTitle: "Trading Card Store in Emporia KS | Local Game Store | PixelNation",
    metaDescription:
      "Looking for a trading card store in Emporia, Kansas? PixelNation is building a local game store experience—TCG products, community play, buy/sell/trade interest, and honest service.",
    keywords: [
      "trading card store Emporia KS",
      "local game store Emporia",
      "TCG store Emporia",
    ],
    eyebrow: "Emporia, Kansas · Local game store",
    h1: "Trading Card Store in Emporia, KS",
    intro:
      "PixelNation is becoming Emporia’s destination for trading cards and community gaming—while remaining a trusted electronics repair shop. If you are searching for a trading card store in Emporia, this page explains what that means here: products when available, people who will help you learn, and no invented inventory claims.",
    sections: [
      {
        heading: "What “local game store” means at PixelNation",
        paragraphs: [
          "A trading card store is more than shelves. It is a place to ask questions, find a starter product, trade collections thoughtfully, and eventually sit down for weekly play. PixelNation is intentionally building that culture in Emporia alongside professional repair services.",
          "We support Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and the One Piece Card Game. Availability varies as inventory expands—contact us for what is on hand today.",
        ],
      },
      {
        heading: "Repair + cards under one roof",
        paragraphs: [
          "Few Emporia shops combine console repair expertise with TCG community plans. That combination matters for families who already trust PixelNation with devices and now want a place for cards and play.",
          "Explore What We Carry for category education, Gaming Community for belonging, and Buy/Sell/Trade when you have a collection to review.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is PixelNation a trading card store?",
        answer:
          "PixelNation is expanding into a local game store experience in Emporia—trading cards, accessories, community play plans, and buy/sell/trade interest—while continuing electronics repair.",
        links: [{ label: "Trading Cards", href: "/trading-cards" }],
      },
      {
        question: "Which games do you carry?",
        answer:
          "Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and One Piece Card Game, with product availability that may vary.",
        links: [{ label: "What We Carry", href: "/what-we-carry" }],
      },
    ],
    primaryCta: { label: "Explore Trading Cards", href: "/trading-cards" },
    secondaryCta: { label: "What to expect", href: "/what-to-expect" },
    relatedLinks: [
      { label: "Trading Cards Overview", href: "/trading-cards" },
      { label: "What We Carry", href: "/what-we-carry" },
      { label: "Gaming Community", href: "/gaming-community" },
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Trading Card Philosophy", href: "/trading-card-philosophy" },
    ],
    schemaKind: "hobby",
  },

  "game-console-repair-emporia-ks": {
    slug: "game-console-repair-emporia-ks",
    path: "/game-console-repair-emporia-ks",
    metaTitle: "Game Console Repair in Emporia KS | PixelNation",
    metaDescription:
      "Game console repair in Emporia, Kansas—PS5 HDMI issues, Xbox faults, Switch problems, and honest diagnostics from PixelNation, with ties to the local gaming community.",
    keywords: [
      "game console repair Emporia KS",
      "PS5 repair Emporia",
      "Xbox repair Emporia",
    ],
    eyebrow: "Emporia, Kansas · Console repair",
    h1: "Game Console Repair in Emporia, KS",
    intro:
      "When a PlayStation, Xbox, Nintendo Switch, or other console fails in Emporia, you need clear diagnostics—not a vague promise. PixelNation repairs game consoles locally and understands how much these devices mean to players who also care about cards, events, and community gaming.",
    sections: [
      {
        heading: "Local repair for players who want their systems back",
        paragraphs: [
          "Common Emporia console jobs include HDMI and no-display faults, overheating, power issues, and port damage. We explain findings before work proceeds so you can decide repair versus replacement with real information.",
          "This page is the local SEO home for “game console repair in Emporia.” For full service details, capabilities, and repair FAQs, continue to our primary Console Repair page—we keep that content authoritative instead of duplicating it here.",
        ],
      },
      {
        heading: "Why gaming community context helps",
        paragraphs: [
          "A repaired console often returns to living-room multiplayer, tournaments, or family nights. Because PixelNation is also building trading cards and events, we treat console repair as part of keeping Emporia’s gaming life online—not only a one-off hardware job.",
        ],
      },
      {
        heading: "Trade-ins and next steps",
        paragraphs: [
          "If a console is beyond economical repair, ask about trade-in interest for eligible systems or accessories. Separately, mail-in options may help customers outside Emporia who still want our diagnostics.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you repair PS5 and Xbox consoles in Emporia?",
        answer:
          "Yes. PixelNation repairs PlayStation, Xbox, Nintendo Switch, Steam Deck, and related systems. HDMI and power faults are common requests.",
        links: [{ label: "Console Repair service", href: "/console-repair" }],
      },
      {
        question: "Can I get a same-day console repair?",
        answer:
          "Some issues qualify for faster turnaround; deeper board work may take longer. We estimate timing after diagnostics.",
      },
      {
        question: "Do you accept console trade-ins?",
        answer:
          "Eligible consoles and accessories may be reviewed for trade or purchase. See Console Trade-Ins for what to expect.",
        links: [{ label: "Console Trade-Ins", href: "/console-trade-ins" }],
      },
    ],
    primaryCta: { label: "Start a console repair", href: "/contact" },
    secondaryCta: { label: "Full console repair page", href: "/console-repair" },
    relatedLinks: [
      { label: "Console Repair", href: "/console-repair", description: "Full service details" },
      { label: "Console Trade-Ins", href: "/console-trade-ins" },
      { label: "Board Repair", href: "/board-repair" },
      { label: "Gaming", href: "/gaming" },
      { label: "PS5 HDMI knowledge", href: "/knowledge/why-ps5-hdmi-ports-fail" },
    ],
    schemaKind: "repair",
  },

  "sell-pokemon-cards": {
    slug: "sell-pokemon-cards",
    path: "/sell-pokemon-cards",
    metaTitle: "Sell Pokémon Cards Emporia KS | Collection Review | PixelNation",
    metaDescription:
      "Sell Pokémon cards in Emporia, Kansas. Learn how PixelNation reviews collections for condition, authenticity, demand, and market value—cash or store credit options.",
    keywords: [
      "sell Pokémon cards Emporia",
      "sell Pokémon cards Kansas",
      "Pokémon collection buy Emporia",
    ],
    eyebrow: "Emporia, Kansas · Sell Pokémon",
    h1: "Sell Pokémon Cards in Emporia",
    intro:
      "Ready to sell Pokémon cards in Emporia? PixelNation reviews eligible singles, sealed products, and collections with an honest process—no automatic online quote bots, and no pressure to accept an offer.",
    sections: [
      {
        heading: "What we look at during a Pokémon collection review",
        paragraphs: [
          "Condition, authenticity, completeness, demand, and current market value all matter. Bulk commons, high-value chase cards, and sealed product are evaluated differently. We explain how we arrived at an offer so the process feels transparent.",
          "Identification may be required. Counterfeit, stolen, altered, or suspicious items will not be accepted.",
        ],
      },
      {
        heading: "Cash vs. store credit",
        paragraphs: [
          "Offers may be available as cash or store credit. Store-credit offers may differ from cash offers. Many sellers choose credit when they still want sealed product, sleeves, or another game’s starters.",
        ],
      },
      {
        heading: "How to prepare before you visit",
        paragraphs: [
          "Organize binders if you can, keep sealed product sealed, and note any cards you believe are higher value. You do not need a perfect inventory list—just enough order for a fair review.",
          "This page focuses on selling Pokémon. For the full buy/sell/trade policy across games and consoles, see the Buy, Sell & Trade hub.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does PixelNation buy Pokémon cards?",
        answer:
          "We plan to purchase eligible Pokémon singles, collections, and sealed products based on condition, authenticity, demand, and market value.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Do you give prices over text without seeing cards?",
        answer:
          "Online estimates are not final offers. Final value depends on in-person inspection.",
      },
      {
        question: "Can I sell Pokémon and still shop for Magic or Lorcana?",
        answer:
          "Often yes—store credit can be a flexible option when you want to stay in the hobby.",
      },
    ],
    primaryCta: { label: "Request a collection review", href: "/contact" },
    secondaryCta: { label: "Buy, Sell & Trade hub", href: "/buy-sell-trade" },
    relatedLinks: [
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Pokémon Cards Emporia", href: "/pokemon-cards-emporia-ks" },
      { label: "Pokémon page", href: "/trading-cards/pokemon" },
      { label: "Sell Magic Cards", href: "/sell-magic-cards" },
    ],
    schemaKind: "service",
  },

  "sell-magic-cards": {
    slug: "sell-magic-cards",
    path: "/sell-magic-cards",
    metaTitle: "Sell Magic Cards Emporia KS | MTG Buy List Interest | PixelNation",
    metaDescription:
      "Sell Magic: The Gathering cards in Emporia, Kansas. PixelNation reviews eligible MTG singles, Commander collections, and sealed product with honest offers.",
    keywords: [
      "sell Magic cards Emporia",
      "sell MTG Emporia",
      "MTG collection buy Kansas",
    ],
    eyebrow: "Emporia, Kansas · Sell Magic",
    h1: "Sell Magic Cards in Emporia",
    intro:
      "Selling Magic cards locally should feel straightforward. PixelNation in Emporia reviews eligible MTG singles, Commander collections, and sealed products with the same honesty we bring to repairs—clear criteria, optional cash or store credit, and no pressure.",
    sections: [
      {
        heading: "Commander collections and constructed staples",
        paragraphs: [
          "Emporia sellers often bring precon leftovers, upgraded Commander piles, or older binders. Demand shifts by format and reprint cycles, so we evaluate what is actually moving—not what a random online screenshot claims.",
          "Foils, dual lands, and specialty treatments may carry different premiums than played bulk. We will say when something is better kept for your own decks.",
        ],
      },
      {
        heading: "Fair process for Emporia players",
        paragraphs: [
          "Contact us to start a collection review, bring items in during business hours when scheduled, and review the offer before deciding. Declining is always okay.",
          "For shop-wide trade policies across Pokémon, video games, and consoles, use the Buy, Sell & Trade page. This landing is specifically for people searching to sell Magic cards.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you buy MTG cards in Emporia?",
        answer:
          "Eligible Magic singles, collections, and sealed products may be evaluated for purchase or trade.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Should I alphabetize my collection first?",
        answer:
          "Organization helps, but it is not required. Separating known high-value cards speeds the review.",
      },
    ],
    primaryCta: { label: "Request a Magic collection review", href: "/contact" },
    secondaryCta: {
      label: "Magic in Emporia",
      href: "/magic-the-gathering-emporia-ks",
    },
    relatedLinks: [
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Magic Emporia landing", href: "/magic-the-gathering-emporia-ks" },
      { label: "Magic game page", href: "/trading-cards/magic-the-gathering" },
      { label: "Commander Nights", href: "/commander-nights" },
      { label: "Sell Pokémon Cards", href: "/sell-pokemon-cards" },
    ],
    schemaKind: "service",
  },

  "sell-video-games": {
    slug: "sell-video-games",
    path: "/sell-video-games",
    metaTitle: "Sell Video Games Emporia KS | PixelNation",
    metaDescription:
      "Sell video games in Emporia, Kansas. Learn how PixelNation reviews eligible games for condition, completeness, demand, and trade or cash interest.",
    keywords: [
      "sell video games Emporia",
      "sell games Emporia KS",
      "trade in video games Emporia",
    ],
    eyebrow: "Emporia, Kansas · Sell games",
    h1: "Sell Video Games in Emporia",
    intro:
      "Cleaning out a game shelf? PixelNation may buy or trade eligible video games in Emporia based on condition, completeness, demand, and current market interest—without pretending every title has the same value.",
    sections: [
      {
        heading: "What affects a game’s offer",
        paragraphs: [
          "CIB (complete-in-box) vs. loose discs, scratches, manuals, region, and popularity all change value. Retro titles and modern sports games behave differently in the market.",
          "We may decline titles with little demand, damaged media, or incomplete sets that are hard to resell fairly.",
        ],
      },
      {
        heading: "Games, consoles, and accessories together",
        paragraphs: [
          "Many Emporia customers bring mixed lots—games plus controllers or a spare console. We can discuss games here and point console-specific trade-ins to our Console Trade-Ins page so expectations stay clear.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you buy used video games in Emporia?",
        answer:
          "Eligible video games may be reviewed for purchase or trade. Final offers depend on inspection.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Should games be tested first?",
        answer:
          "Working, clean discs and cartridges help. Tell us about known issues—honesty speeds evaluation.",
      },
    ],
    primaryCta: { label: "Contact about selling games", href: "/contact" },
    secondaryCta: { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
    relatedLinks: [
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Console Trade-Ins", href: "/console-trade-ins" },
      { label: "Sell Pokémon Cards", href: "/sell-pokemon-cards" },
      { label: "Gaming", href: "/gaming" },
    ],
    schemaKind: "service",
  },

  "console-trade-ins": {
    slug: "console-trade-ins",
    path: "/console-trade-ins",
    metaTitle: "Console Trade-Ins Emporia KS | PixelNation",
    metaDescription:
      "Console trade-ins in Emporia, Kansas. Learn how PixelNation evaluates eligible game systems and accessories for trade, store credit, or purchase interest.",
    keywords: [
      "console trade in Emporia",
      "sell game console Emporia KS",
      "PS5 trade in Emporia",
    ],
    eyebrow: "Emporia, Kansas · Console trade-ins",
    h1: "Console Trade-Ins in Emporia",
    intro:
      "Trading in a console in Emporia should feel fair. PixelNation evaluates eligible systems and accessories for condition, functionality, demand, and completeness—then explains cash, credit, or trade options without pressure.",
    sections: [
      {
        heading: "What we check on a trade-in console",
        paragraphs: [
          "Power-on behavior, video output, HDMI and port condition, storage status, controllers included, and cosmetic wear all matter. A working Switch with joy-cons is a different review than a non-display PS5 that may need board work.",
          "If a system needs repair first, we can discuss repair paths separately from trade-in value so you are not surprised.",
        ],
      },
      {
        heading: "Trade-in vs. repair decision",
        paragraphs: [
          "Sometimes repairing keeps the console you love. Sometimes trading makes more sense. Because we offer both console repair and trade interest, Emporia customers can hear both options from one shop.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you take console trade-ins in Emporia?",
        answer:
          "Eligible consoles and accessories may be reviewed. We may decline items that are damaged beyond practical resale or raise authenticity concerns.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Can I trade a broken console?",
        answer:
          "Possibly at a reduced value, or you may prefer a repair quote first. Ask us which path fits your goals.",
        links: [
          {
            label: "Game Console Repair Emporia",
            href: "/game-console-repair-emporia-ks",
          },
        ],
      },
    ],
    primaryCta: { label: "Ask about a console trade-in", href: "/contact" },
    secondaryCta: { label: "Console repair", href: "/console-repair" },
    relatedLinks: [
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      {
        label: "Game Console Repair Emporia",
        href: "/game-console-repair-emporia-ks",
      },
      { label: "Sell Video Games", href: "/sell-video-games" },
      { label: "Console Repair service", href: "/console-repair" },
    ],
    schemaKind: "service",
  },

  "gaming-lounge": {
    slug: "gaming-lounge",
    path: "/gaming-lounge",
    metaTitle: "Gaming Lounge Emporia KS | Planned Play Space | PixelNation",
    metaDescription:
      "PixelNation’s planned gaming lounge vision in Emporia, Kansas—tables, community play, console interest, and a welcoming space as the expanded location develops.",
    keywords: [
      "gaming lounge Emporia",
      "game lounge Emporia KS",
      "community play space Emporia",
    ],
    eyebrow: "Emporia, Kansas · Planned play space",
    h1: "Gaming Lounge Vision in Emporia",
    intro:
      "PixelNation’s larger location is intended to include community play space that feels like a true gaming lounge—tables for trading card games, room for casual gatherings, and console play interest as features come online. We will not invent seating counts or opening dates; this page shares the vision honestly.",
    sections: [
      {
        heading: "What we mean by gaming lounge",
        paragraphs: [
          "A welcoming room where Emporia players can learn, duel, draft, or hang out without needing a private basement table. Clean play surfaces, clear norms, and staff who help newcomers find the right game night.",
          "TCG tables are the heart of the plan. Console free-play or demos may expand later and will be labeled as planned until confirmed.",
        ],
      },
      {
        heading: "How this differs from the Gaming overview",
        paragraphs: [
          "Our Gaming page covers the full play-space roadmap. This lounge landing targets people specifically searching for a gaming lounge in Emporia and sets expectations: community-first, family-aware, and still under expansion.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the PixelNation gaming lounge open now?",
        answer:
          "The full expanded lounge experience is part of our larger location plans. Features will be announced as they become available—ask us what you can do today.",
        links: [{ label: "Gaming overview", href: "/gaming" }],
      },
      {
        question: "Will there be tables for Magic and Pokémon?",
        answer:
          "Yes—trading-card play space is central to the vision, including Commander and family-friendly games.",
        links: [{ label: "Weekly Events", href: "/weekly-events" }],
      },
    ],
    primaryCta: { label: "Explore Gaming", href: "/gaming" },
    secondaryCta: { label: "What to expect", href: "/what-to-expect" },
    relatedLinks: [
      { label: "Gaming Overview", href: "/gaming" },
      { label: "Gaming Community", href: "/gaming-community" },
      { label: "Family Gaming", href: "/family-gaming" },
      { label: "Birthday Parties", href: "/birthday-parties" },
      { label: "Events", href: "/events" },
    ],
    schemaKind: "hobby",
  },

  "birthday-parties": {
    slug: "birthday-parties",
    path: "/birthday-parties",
    metaTitle: "Birthday Parties Emporia KS | Gaming Parties | PixelNation",
    metaDescription:
      "Planning a gaming birthday party in Emporia? Learn PixelNation’s vision for respectful, family-friendly card and game celebrations as party options develop.",
    keywords: [
      "birthday party Emporia gaming",
      "Pokémon birthday party Emporia",
      "card game birthday Emporia KS",
    ],
    eyebrow: "Emporia, Kansas · Parties (planned)",
    h1: "Gaming Birthday Parties in Emporia",
    intro:
      "Parents searching for birthday parties in Emporia often want something more memorable than a generic venue—Pokémon packs, gentle teach games, or a supervised table that feels special. PixelNation is exploring family-friendly party experiences as our play space expands. Details like packages and dates will be published when ready—not invented here.",
    sections: [
      {
        heading: "What a PixelNation-style party could include",
        paragraphs: [
          "Possible elements include beginner-friendly games, supervised play, simple prize support that stays age-appropriate, and help choosing sealed product gifts. Exact offerings depend on space and staffing as the expanded location develops.",
          "We prioritize respectful gaming so birthday guests leave excited—not overwhelmed by hyper-competitive tables.",
        ],
      },
      {
        heading: "How to inquire today",
        paragraphs: [
          "Contact us with the age group, game interest, and preferred timeframe. We will share what is possible now versus what is still planned. Meanwhile, Family Gaming and Learn to Play explain the culture we want parties to reflect.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you host birthday parties now?",
        answer:
          "Party hosting is part of our expanded location vision. Current availability may be limited—contact us for the latest options instead of assuming a fixed package list.",
      },
      {
        question: "Which games work well for kids’ parties?",
        answer:
          "Pokémon and Lorcana are common family-friendly choices. We can help match a game to the age group.",
        links: [{ label: "Family Gaming", href: "/family-gaming" }],
      },
    ],
    primaryCta: { label: "Ask about parties", href: "/contact" },
    secondaryCta: { label: "Family Gaming", href: "/family-gaming" },
    relatedLinks: [
      { label: "Family Gaming", href: "/family-gaming" },
      { label: "Gaming Lounge vision", href: "/gaming-lounge" },
      { label: "Pokémon Cards Emporia", href: "/pokemon-cards-emporia-ks" },
      { label: "Learn to Play", href: "/learn-to-play" },
    ],
    schemaKind: "hobby",
  },

  preorders: {
    slug: "preorders",
    path: "/preorders",
    metaTitle: "TCG Preorders Emporia KS | How Preorders Work | PixelNation",
    metaDescription:
      "How trading-card preorders work at PixelNation in Emporia—allocation, deposits, limits, and how to ask about a release without online checkout.",
    keywords: [
      "TCG preorders Emporia",
      "Pokémon preorder Emporia KS",
      "Magic preorder Emporia",
    ],
    eyebrow: "Emporia, Kansas · Preorders",
    h1: "Trading Card Preorders in Emporia",
    intro:
      "Want to preorder a TCG release in Emporia? PixelNation plans to offer preorders for select products when distributor allocation allows. This page explains how our preorder conversations work—not a shopping cart.",
    sections: [
      {
        heading: "How PixelNation preorders work",
        paragraphs: [
          "Availability depends on allocation. Some releases sell out quickly or arrive in limited quantities. Deposits may be required, quantity limits may apply, and publisher dates can shift.",
          "We will never invent a live inventory feed. Contact us with the product name and we will tell you whether a preorder path exists yet.",
        ],
      },
      {
        heading: "Preorders vs. New Releases vs. the combined hub",
        paragraphs: [
          "Use this page when you specifically care about reserving upcoming product. Use New Releases when you want release-day culture and how we talk about freshly arrived sealed goods. The Preorders & New Releases hub remains the broader informational overview with showcase imagery.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I preorder online and check out?",
        answer:
          "Not through an ecommerce cart on this website. Preorders are handled through contact and in-person processes as programs launch.",
        links: [{ label: "Preorders & New Releases hub", href: "/preorders-new-releases" }],
      },
      {
        question: "Do all games get preorders?",
        answer:
          "It depends on the release and allocation. Ask about Pokémon, Magic, Yu-Gi-Oh!, Lorcana, or One Piece specifically.",
      },
    ],
    primaryCta: { label: "Ask about a preorder", href: "/contact" },
    secondaryCta: {
      label: "Preorders & New Releases hub",
      href: "/preorders-new-releases",
    },
    relatedLinks: [
      { label: "Preorders & New Releases", href: "/preorders-new-releases" },
      { label: "New Releases", href: "/new-releases" },
      { label: "What We Carry", href: "/what-we-carry" },
      { label: "Trading Cards", href: "/trading-cards" },
    ],
    schemaKind: "hobby",
  },

  "new-releases": {
    slug: "new-releases",
    path: "/new-releases",
    metaTitle: "New TCG Releases Emporia KS | PixelNation",
    metaDescription:
      "Follow new trading-card releases in Emporia, Kansas—how PixelNation talks about release days, allocation, and staying informed without fake stock counts.",
    keywords: [
      "new TCG releases Emporia",
      "new Pokémon release Emporia",
      "Magic release day Emporia",
    ],
    eyebrow: "Emporia, Kansas · New releases",
    h1: "New Trading Card Releases in Emporia",
    intro:
      "Release week energy is part of local game store culture. PixelNation helps Emporia players understand how new TCG releases arrive, why quantities vary, and how to stay informed—without publishing fake “in stock” badges.",
    sections: [
      {
        heading: "What happens on a release",
        paragraphs: [
          "Publishers announce dates; distributors allocate; shops receive what they receive. Some Emporia customers want a booster the morning of street date; others want a Commander precon the following week. We communicate what we know and update when shipments change.",
          "Release events may accompany major sets in the future. Until scheduled, treat event ideas as planned community offerings.",
        ],
      },
      {
        heading: "How to follow releases with us",
        paragraphs: [
          "Contact us about a specific set, check the Preorders page if you want to reserve early, and use the combined Preorders & New Releases hub for broader product education. Game pages remain the best place for long-form product category detail.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you guarantee every new set on day one?",
        answer:
          "No. Allocation and timing vary. We share honest updates for Emporia customers instead of guaranteeing universal day-one stock.",
      },
      {
        question: "Where do I see upcoming products?",
        answer:
          "Ask us directly and review the Preorders & New Releases hub for informational release cards when we publish them.",
        links: [
          { label: "Preorders & New Releases", href: "/preorders-new-releases" },
          { label: "Preorders explained", href: "/preorders" },
        ],
      },
    ],
    primaryCta: { label: "Ask about a new release", href: "/contact" },
    secondaryCta: { label: "Preorders explained", href: "/preorders" },
    relatedLinks: [
      { label: "Preorders", href: "/preorders" },
      { label: "Preorders & New Releases hub", href: "/preorders-new-releases" },
      { label: "Weekly Events", href: "/weekly-events" },
      { label: "Trading Card Store Emporia", href: "/trading-card-store-emporia-ks" },
    ],
    schemaKind: "hobby",
  },
};

export const LOCAL_LANDING_SLUGS = Object.keys(LOCAL_LANDING_PAGES);

export function getLocalLanding(slug: string): LocalLandingPage | undefined {
  return LOCAL_LANDING_PAGES[slug];
}

export function isLocalLandingSlug(slug: string): boolean {
  return slug in LOCAL_LANDING_PAGES;
}
