import type { EventCategory } from "@/lib/tcg/types";

/**
 * Informational event categories — kinds of play PixelNation supports.
 * Specific dates live on /events.
 */
export const EVENT_CATEGORIES: readonly EventCategory[] = [
  {
    title: "Commander nights",
    game: "Magic: The Gathering",
    description:
      "Multiplayer Commander pods with a relaxed, social pace—bring a deck or ask about precons. Join Friday Night Magic.",
    skillLevel: "All levels",
    status: "available",
  },
  {
    title: "Pokémon play",
    game: "Pokémon",
    description:
      "Casual Pokémon TCG play for trainers of all ages, from first decks to seasoned collectors.",
    skillLevel: "Beginner-friendly",
    status: "available",
  },
  {
    title: "Yu-Gi-Oh! events",
    game: "Yu-Gi-Oh!",
    description:
      "Casual dueling and community play for new and returning duelists.",
    skillLevel: "All levels",
    status: "available",
  },
  {
    title: "Lorcana play",
    game: "Disney Lorcana",
    description:
      "Family-friendly Lorcana sessions—an easy game to learn and a welcoming table to join.",
    skillLevel: "Beginner-friendly",
    status: "available",
  },
  {
    title: "One Piece events",
    game: "One Piece Card Game",
    description:
      "Casual play and community tables for the One Piece Card Game.",
    skillLevel: "All levels",
    status: "available",
  },
  {
    title: "Learn-to-play nights",
    description:
      "Guided introductions to a featured game—ask staff about a teach table. No experience required.",
    skillLevel: "New players",
    status: "available",
  },
  {
    title: "Casual gaming nights",
    description:
      "Open tables for trading cards and hangouts in a low-pressure setting during PixelNation Friday Nights.",
    skillLevel: "All levels",
    status: "available",
  },
  {
    title: "Release events",
    description:
      "Celebrations around major set releases, with product availability while supplies last. Check the events page when a release night is posted.",
    skillLevel: "All levels",
    status: "check-events",
  },
  {
    title: "Prerelease events",
    game: "Magic: The Gathering",
    description:
      "Sealed-format play around new Magic sets. Details appear on the events page when a prerelease is scheduled.",
    skillLevel: "All levels",
    status: "check-events",
  },
  {
    title: "Draft nights",
    game: "Magic: The Gathering",
    description:
      "Booster draft sessions—build a deck on the spot from packs opened at the table. Posted on the events page when scheduled.",
    skillLevel: "All levels",
    status: "check-events",
  },
  {
    title: "Trade nights",
    description:
      "Bring binders and trade with other local collectors. Weekly Trade Night is part of PixelNation Friday Nights.",
    skillLevel: "All levels",
    status: "available",
  },
  {
    title: "Collection days",
    description:
      "Bring cards, games, or consoles for evaluation. Contact PixelNation or visit for a collection review.",
    skillLevel: "Everyone",
    status: "available",
  },
  {
    title: "Community tournaments",
    description:
      "Organized competitive play with clear rules. Tournament dates are posted on the events page when scheduled.",
    skillLevel: "Intermediate+",
    status: "check-events",
  },
  {
    title: "Family gaming events",
    description:
      "All-ages sessions designed for parents, kids, and first-time players.",
    skillLevel: "Beginner-friendly",
    status: "available",
  },
  {
    title: "Video game nights",
    description:
      "Console gaming sessions—casual multiplayer and community play at PixelNation Friday Nights.",
    skillLevel: "All levels",
    status: "available",
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
