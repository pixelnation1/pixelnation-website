import type { FaqItem } from "@/lib/seo/types";

export const GAMING_METADATA = {
  title: "Gaming Emporia KS | Community Play & Events | PixelNation",
  description:
    "Gaming in Emporia, Kansas—trading cards, video games, community play, tournaments, and weekly events at PixelNation in downtown Emporia.",
  path: "/gaming",
} as const;

export const GAMING_FEATURES = [
  {
    title: "Community play space",
    description:
      "Tables and a welcoming area for local players to gather, play, and hang out in downtown Emporia.",
  },
  {
    title: "Trading-card gaming",
    description:
      "Casual and organized play for Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and One Piece.",
  },
  {
    title: "Console & video games",
    description:
      "Video games, consoles, retro products, and accessories may be available in-store. Selection changes frequently.",
  },
  {
    title: "Retro gaming",
    description:
      "Ask about retro games, consoles, and related products when you visit. Eligible items may also be bought or traded.",
  },
  {
    title: "Casual play",
    description:
      "Open tables for friends, families, and collectors who want a local place to game without a high-pressure format.",
  },
  {
    title: "Weekly events",
    description:
      "Pokémon Night, Commander, Friday Night Magic, retro gaming, and Sunday trade & play—see the events page for the full weekly schedule.",
  },
  {
    title: "Tournaments & special events",
    description:
      "Community tournaments and special releases are posted on the events page when they are scheduled.",
  },
  {
    title: "Trade nights",
    description:
      "Bring binders, cards, games, and wishlists to Trade & Play Sunday, or trade during other weekly nights.",
  },
  {
    title: "Learn-to-play",
    description:
      "New players are welcome. Staff and community members can help you learn a game and find a starter product.",
  },
] as const;

export const GAMING_INTRO = {
  headline: "Gaming in Emporia, Kansas",
  body: "PixelNation brings trading cards, video games, community play, tournaments, and gaming events together in downtown Emporia.",
} as const;

export const PLAY_SPACE_FEATURES = [
  "Tables and seating for card and tabletop play",
  "A clean, organized play area",
  "Space for both casual and organized play",
  "A comfortable environment for longer sessions",
  "Family-friendly options",
  "Staff on hand to help",
] as const;

export const CONSOLE_GAMING_FEATURES = [
  "Video games and consoles when available",
  "Retro gaming products",
  "Controllers and accessories",
  "Eligible buy, sell, and trade of games and consoles",
  "Video game nights on the events calendar",
  "Console repair expertise in the same shop",
] as const;

export const NEW_PLAYER_SUPPORT = [
  "Staff help choosing a game or product",
  "Learn-to-play guidance",
  "Beginner-friendly tables",
  "Product recommendations for your budget",
  "Rules help at the table",
  "Casual practice opportunities",
] as const;

export const GAMING_FAQS: readonly FaqItem[] = [
  {
    question: "Can I play games at PixelNation?",
    answer:
      "Yes. PixelNation has community play space for trading cards and local gaming in downtown Emporia. Check the events page for weekly nights and special events.",
    links: [{ label: "Events", href: "/events" }],
  },
  {
    question: "What games can I play?",
    answer:
      "Supported trading-card games include Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and One Piece. Video games and consoles may also be available in-store—selection changes frequently.",
    links: [{ label: "Trading Cards", href: "/trading-cards" }],
  },
  {
    question: "How do I hear about events?",
    answer:
      "Visit the PixelNation Events page for weekly nights, special events, and the current calendar.",
    links: [{ label: "Events", href: "/events" }],
  },
];
