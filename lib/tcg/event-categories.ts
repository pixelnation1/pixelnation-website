import type { EventCategory } from "@/lib/tcg/types";

/**
 * Informational event categories — the kinds of events PixelNation plans
 * to host. No dates, fees, or active schedules are implied.
 */
export const EVENT_CATEGORIES: readonly EventCategory[] = [
  {
    title: "Commander nights",
    game: "Magic: The Gathering",
    description:
      "Multiplayer Commander pods with a relaxed, social pace—bring a deck or ask about precons.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Pokémon play",
    game: "Pokémon",
    description:
      "Casual Pokémon TCG play for trainers of all ages, from first decks to seasoned collectors.",
    skillLevel: "Beginner-friendly",
    status: "planned",
  },
  {
    title: "Yu-Gi-Oh! events",
    game: "Yu-Gi-Oh!",
    description:
      "Casual dueling and community events for new and returning duelists.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Lorcana play",
    game: "Disney Lorcana",
    description:
      "Family-friendly Lorcana sessions—an easy game to learn and a welcoming table to join.",
    skillLevel: "Beginner-friendly",
    status: "planned",
  },
  {
    title: "One Piece events",
    game: "One Piece Card Game",
    description:
      "Casual play and community events for the One Piece Card Game.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Learn-to-play nights",
    description:
      "Guided introductions to a featured game—no experience or cards required to attend.",
    skillLevel: "New players",
    status: "planned",
  },
  {
    title: "Casual gaming nights",
    description:
      "Open tables for trading cards and tabletop games in a low-pressure setting.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Release events",
    description:
      "Celebrations around major set releases, with product availability while supplies last.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Prerelease events",
    game: "Magic: The Gathering",
    description:
      "Sealed-format play around new Magic sets. Details will be announced when confirmed.",
    skillLevel: "All levels",
    status: "coming-soon",
  },
  {
    title: "Draft nights",
    game: "Magic: The Gathering",
    description:
      "Booster draft sessions—build a deck on the spot from packs opened at the table.",
    skillLevel: "All levels",
    status: "coming-soon",
  },
  {
    title: "Trade nights",
    description:
      "Bring binders and trade with other local collectors in a supervised, friendly space.",
    skillLevel: "All levels",
    status: "planned",
  },
  {
    title: "Collection days",
    description:
      "Dedicated days for collection reviews—bring cards, games, or consoles for evaluation.",
    skillLevel: "Everyone",
    status: "planned",
  },
  {
    title: "Community tournaments",
    description:
      "Organized competitive play with clear rules and structures, announced when schedules are set.",
    skillLevel: "Intermediate+",
    status: "coming-soon",
  },
  {
    title: "Family gaming events",
    description:
      "All-ages sessions designed for parents, kids, and first-time players.",
    skillLevel: "Beginner-friendly",
    status: "planned",
  },
  {
    title: "Video game nights",
    description:
      "Console gaming sessions—casual multiplayer and community play at the expanded location.",
    skillLevel: "All levels",
    status: "coming-soon",
  },
];

/** What customers can expect from PixelNation events. */
export const EVENT_EXPECTATIONS = [
  "A welcoming environment for new and experienced players",
  "Beginner-friendly guidance from staff",
  "Casual and organized play options",
  "Clear event rules communicated up front",
  "Age-appropriate events where applicable",
  "Space for spectators and families",
  "Product availability during events, while supplies last",
] as const;
