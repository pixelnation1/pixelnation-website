import { TCG_LAUNCH } from "@/lib/tcg/launch";
import type { FaqItem } from "@/lib/seo/types";

export const GAMING_METADATA = {
  title: "Gaming Emporia KS | Community Play & Events | PixelNation",
  description:
    "Gaming in Emporia, Kansas—community play space plans, trading-card play, console gaming, learn-to-play sessions, and organized events at PixelNation’s expanding location.",
  path: "/gaming",
} as const;

export const GAMING_FEATURES = [
  {
    title: "Community play space",
    description:
      "A welcoming area for local players to gather, play, and grow the Emporia gaming community as the larger location comes online.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "Console gaming",
    description:
      "Console play and product experiences tied to our gaming focus—details will be shared as stations and offerings launch.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "Trading-card play",
    description:
      "Casual and competitive trading-card play across supported games, with tables and community nights planned alongside inventory growth.",
    status: "expanding" as const,
  },
  {
    title: "Learn-to-play sessions",
    description:
      "Sessions designed to help new players learn rules, build confidence, and join the local scene.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "Product demonstrations",
    description:
      "Hands-on looks at new releases, accessories, and gaming products as inventory expands.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "New game testing",
    description:
      "Opportunities to try new games and formats in a friendly, low-pressure setting.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "Casual play",
    description:
      "Open play for friends, families, and collectors who want a local place to game.",
    status: "expanding" as const,
  },
  {
    title: "Organized events",
    description:
      "Weekly trading-card events, community gaming nights, and special release events are in preparation.",
    status: "coming-with-expansion" as const,
  },
  {
    title: "Private or group gaming",
    description:
      "Possibilities for private or group gaming experiences as space and scheduling allow at the expanded location.",
    status: "coming-with-expansion" as const,
  },
] as const;

export const GAMING_INTRO = {
  headline: "Gaming in Emporia, Kansas",
  body: `PixelNation is preparing a larger physical location that brings electronics repair together with a local game store experience—community play, trading cards, and organized events under one roof. ${TCG_LAUNCH.gamingForwardLooking}`,
} as const;

/** Planned play-space environment — no capacity claims. */
export const PLAY_SPACE_FEATURES = [
  "Tables and seating for card and tabletop play",
  "A clean, organized play area",
  "Space for both casual and organized play",
  "A comfortable environment for longer sessions",
  "An accessible setup for all customers",
  "Family-friendly options",
  "Staff on hand to help",
] as const;

/** Possible console gaming offerings — planned, not launched. */
export const CONSOLE_GAMING_FEATURES = [
  "Current-generation consoles",
  "Retro gaming",
  "Multiplayer games",
  "New game demonstrations",
  "Local tournaments",
  "Casual free-play or paid sessions",
] as const;

/** New players welcome — support available. */
export const NEW_PLAYER_SUPPORT = [
  "Staff help choosing a game or product",
  "Learn-to-play sessions",
  "Beginner-friendly events",
  "Product recommendations for your budget",
  "Rules guidance at the table",
  "Casual practice opportunities",
] as const;

export const GAMING_FAQS: readonly FaqItem[] = [
  {
    question: "Is a gaming lounge open right now?",
    answer:
      "Community play space and expanded gaming features are part of PixelNation’s plans for a larger Emporia location. They will open in phases. Contact us to ask what is available today.",
  },
  {
    question: "What games can I play?",
    answer:
      "Supported trading-card games include Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and One Piece, with console and broader gaming experiences planned as the location expands.",
    links: [{ label: "Trading Cards", href: "/trading-cards" }],
  },
  {
    question: "How do I hear about events?",
    answer:
      "Visit the events page or contact PixelNation for updates. We publish schedules only when real event details are confirmed.",
    links: [{ label: "Events", href: "/events" }],
  },
];

export function gamingStatusLabel(
  status: (typeof GAMING_FEATURES)[number]["status"],
): string {
  if (status === "expanding") return "Expanding";
  return "Coming with expanded location";
}
