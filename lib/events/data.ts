import { TCG_IMAGES } from "@/lib/tcg/images";
import type { EventFilter, StoreEvent } from "@/lib/events/types";

/**
 * PixelNation store events.
 *
 * Recurring weekly nights power detail pages and the events hub.
 * The visible week grid is configured in lib/events/weekly-schedule.ts.
 *
 * To set this week's Tuesday game, a Saturday tournament, or a specific
 * Friday Night Magic format, add a StoreEvent with:
 * - weeklySlotId matching the slot (e.g. "tuesday-rotating")
 * - startDate as YYYY-MM-DD
 * - recurring: false
 */
export const STORE_EVENTS: readonly StoreEvent[] = [
  {
    id: "retro-gaming-night",
    slug: "retro-gaming-night",
    title: "Retro Gaming Night",
    subtitle: "Classic consoles, high scores, and weekly challenges",
    shortDescription:
      "Retro console tournaments, high-score competitions, and rotating classics every Monday at PixelNation.",
    description:
      "Monday is retro night in downtown Emporia. Bring your A-game for console tournaments, high-score competitions, and rotating challenges on classic hardware.\n\nFeatured games change weekly and may include Mario Kart 64, Street Fighter II, Mortal Kombat, GoldenEye, Tetris, and other retro titles. Check the events page when a specific tournament is posted.\n\nAll skill levels are welcome—come play, spectate, or learn a classic you have not touched in years.",
    game: "video-games",
    eventType: "weekly",
    image: TCG_IMAGES.shopBanner,
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    recurring: true,
    recurringDay: "monday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Retro tournaments and high-score challenges",
    playerInfo: "All ages and skill levels are welcome. Featured games rotate weekly.",
    whatToBring: ["Yourself—controllers and games are provided when needed"],
    registrationInfo: "No registration required. Walk in for Retro Gaming Night.",
    weeklySlotId: "monday-retro",
  },
  {
    id: "rotating-game-night",
    slug: "rotating-game-night",
    title: "Rotating Game Night",
    subtitle: "A different game each Tuesday",
    shortDescription:
      "Tuesday nights rotate through tabletop, trading-card, and community games. Check the events page for this week's lineup.",
    description:
      "Tuesday is Rotating Game Night at PixelNation. We feature a different game each week rather than the same title every Tuesday.\n\nLineups may include the One Piece Card Game, Disney Lorcana, Riftbound, and other tabletop, card, or community games. When this week's title is posted, it appears on the events calendar and on the Tuesday schedule card.\n\nNew players are welcome—ask staff what is on the tables tonight.",
    game: "multi",
    eventType: "weekly",
    image: TCG_IMAGES.shopBanner,
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    recurring: true,
    recurringDay: "tuesday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Rotating weekly lineup",
    playerInfo:
      "This is not the same game every Tuesday. Check the events page for the current week's title.",
    whatToBring: ["A deck or game if you already play this week's title", "Curiosity if you are new"],
    registrationInfo: "No registration required unless a special Tuesday event says otherwise.",
    weeklySlotId: "tuesday-rotating",
  },
  {
    id: "pokemon-night",
    slug: "pokemon-night",
    title: "Pokémon Night",
    subtitle: "Play, trade, learn, and battle",
    shortDescription:
      "Weekly Pokémon play in downtown Emporia—casual battles, trades, and a welcome table for new trainers.",
    description:
      "Wednesday is Pokémon Night at PixelNation. Play, trade, learn, and battle in a welcoming local shop setting.\n\nAll ages and skill levels are welcome. Bring a deck, trade a binder, or ask staff how to get started with a beginner product.\n\nLeagues, tournaments, and special Pokémon events are posted on the events calendar when they are scheduled.",
    game: "pokemon",
    eventType: "weekly",
    image: TCG_IMAGES.pokemonPrismaticEtb,
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    recurring: true,
    recurringDay: "wednesday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Casual play, trades, and learn-to-play",
    playerInfo: "All ages and skill levels are welcome. Preconstructed decks are fine.",
    whatToBring: [
      "A Pokémon deck if you have one",
      "Binders or cards you want to trade",
      "Sleeves and dice if you use them",
    ],
    registrationInfo: "No registration required for weekly Pokémon Night.",
    weeklySlotId: "wednesday-pokemon",
  },
  {
    id: "commander-night",
    slug: "commander-night",
    title: "Commander Night",
    subtitle: "Casual Magic: The Gathering Commander",
    shortDescription:
      "Casual Magic: The Gathering Commander play all night. Bring your deck and join the Emporia community.",
    description:
      "Thursday is Commander Night at PixelNation. Sit down for casual Magic: The Gathering Commander from 6:00 PM to 10:00 PM.\n\nBring a precon or a tuned deck—just tell your table the power level you want. New players can ask staff for a starting point.\n\nCommander is Magic's most social format, and Thursday is built for long, friendly pods.",
    game: "magic",
    eventType: "weekly",
    image: TCG_IMAGES.mtgBloomburrowCommanders,
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "thursday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Commander",
    playerInfo:
      "Casual Commander pods all night. Communicate power level before you shuffle up.",
    whatToBring: [
      "A Commander deck or precon",
      "Sleeves, tokens, and a playmat if you have them",
    ],
    registrationInfo: "No registration required. Walk in for Commander Night.",
    weeklySlotId: "thursday-commander",
  },
  {
    id: "friday-night-magic",
    slug: "friday-night-magic",
    title: "Friday Night Magic",
    subtitle: "Magic: The Gathering at PixelNation",
    shortDescription:
      "Friday Night Magic with rotating formats, prizes, and community play every Friday in downtown Emporia.",
    description:
      "Friday Night Magic is weekly Magic: The Gathering at PixelNation.\n\nFormats rotate. When a specific format is scheduled, it appears on the events calendar. Otherwise expect community play—constructed, Commander, and pickup games sharing the room.\n\nPrizes may be offered depending on the week's format. Ask staff what is running tonight.",
    game: "magic",
    eventType: "weekly",
    image: TCG_IMAGES.mtgBloomburrowCommanders,
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "friday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    playerInfo:
      "Players of all skill levels are welcome. This week's format is posted when it is locked in.",
    whatToBring: [
      "A Magic deck appropriate for the week's format",
      "Sleeves, tokens, and a playmat if you have them",
    ],
    registrationInfo:
      "No registration required unless a special Friday event says otherwise.",
    weeklySlotId: "friday-fnm",
  },
  {
    id: "friday-video-game-tournament",
    slug: "friday-video-game-tournament",
    title: "Friday Video Game Tournament",
    subtitle: "Modern consoles on the large-screen setup",
    shortDescription:
      "Modern console tournaments every Friday on PixelNation's large-screen gaming setup.",
    description:
      "Friday Video Game Tournament nights use the large-screen gaming setup at PixelNation.\n\nFeatured titles change. When a specific game is posted, it appears on the events calendar and on the Friday schedule card. Show up to compete or spectate.\n\nThis runs alongside Friday Night Magic, so the shop stays busy with cards and consoles in the same evening.",
    game: "video-games",
    eventType: "video-game",
    image: TCG_IMAGES.shopBanner,
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "friday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Modern console tournament",
    playerInfo: "Featured tournament games are posted on the events calendar.",
    whatToBring: ["Yourself—ask staff what is running tonight"],
    registrationInfo: "No registration required unless a special tournament says otherwise.",
    weeklySlotId: "friday-video",
  },
  {
    id: "trade-play-sunday",
    slug: "trade-play-sunday",
    title: "Trade & Play Sunday",
    subtitle: "Casual games, binders, and community hangout",
    shortDescription:
      "Sunday afternoon and evening for trades, casual games, board games, retro or modern play, and hanging out with the PixelNation community.",
    description:
      "Sunday is Trade & Play at PixelNation. Bring binders, play casual games, sit down for board games, jump on retro or modern setups, and hang out with the local community.\n\nThis is a family-friendly window. Stay for a trade, a game, or the whole afternoon.\n\nTables are first come, first served unless a special event is using the space.",
    game: "multi",
    eventType: "trade-night",
    image: TCG_IMAGES.shopBanner,
    startTime: "3:00 PM",
    endTime: "8:00 PM",
    recurring: true,
    recurringDay: "sunday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Open play and trade night",
    playerInfo: "Family friendly. All ages and experience levels are welcome.",
    whatToBring: [
      "Binders and cards you want to trade",
      "Decks or games you want to play",
      "A trade list or wishlist if you have one",
    ],
    registrationInfo: "No registration required. Walk in for Trade & Play Sunday.",
    weeklySlotId: "sunday-trade",
  },
  {
    id: "pixelnation-friday-nights",
    slug: "pixelnation-friday-nights",
    title: "Friday at PixelNation",
    subtitle: "Friday Night Magic and video game tournaments",
    shortDescription:
      "Friday evenings at PixelNation include Friday Night Magic from 6:00 PM and a video game tournament from 7:00 PM.",
    description:
      "Friday is a full gaming evening at PixelNation in downtown Emporia.\n\nFriday Night Magic runs 6:00 PM–10:00 PM with rotating formats, prizes, and community play. The Friday Video Game Tournament runs 7:00 PM–10:00 PM on the large-screen setup.\n\nSee each event page for details, or check the weekly schedule on the events hub.",
    game: "multi",
    eventType: "weekly",
    image: TCG_IMAGES.shopBanner,
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "friday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    playerInfo: "See Friday Night Magic and Friday Video Game Tournament for the evening's details.",
    registrationInfo: "No registration required unless a special Friday event says otherwise.",
  },
];

export const EVENT_FILTERS: readonly EventFilter[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "weekly", label: "Weekly Events" },
  { id: "pokemon", label: "Pokémon" },
  { id: "magic", label: "Magic: The Gathering" },
  { id: "lorcana", label: "Lorcana" },
  { id: "one-piece", label: "One Piece" },
  { id: "yugioh", label: "Yu-Gi-Oh!" },
  { id: "video-games", label: "Video Games" },
  { id: "special", label: "Special Events" },
];

export const EVENTS_HUB_METADATA = {
  title: "Gaming Events & TCG Tournaments in Emporia KS | PixelNation",
  description:
    "See PixelNation's weekly gaming schedule, Pokémon nights, Commander, Friday Night Magic, retro gaming, video game tournaments, trade nights and special events in Emporia, Kansas.",
  path: "/events",
} as const;
