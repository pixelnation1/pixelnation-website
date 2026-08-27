import { TCG_IMAGES } from "@/lib/tcg/images";
import type { EventFilter, StoreEvent } from "@/lib/events/types";

/**
 * PixelNation store events.
 * Add a new object to STORE_EVENTS to publish another event.
 * Recurring weekly events automatically appear on the weekly schedule.
 */
export const STORE_EVENTS: readonly StoreEvent[] = [
  {
    id: "pixelnation-friday-nights",
    slug: "pixelnation-friday-nights",
    title: "PixelNation Friday Nights",
    subtitle: "Weekly Trade Night",
    shortDescription:
      "Bring binders, cards, games, and trade lists. Open tables for Pokémon, Magic, Lorcana, One Piece, Yu-Gi-Oh!, and video games.",
    description:
      "PixelNation Friday Nights is our weekly hangout in downtown Emporia. Come play, trade, compete, or just spend the evening with the local gaming community.\n\nWeekly Trade Night covers Pokémon, Magic: The Gathering, Disney Lorcana, One Piece, Yu-Gi-Oh!, and video games. Bring binders, cards, games, and items you are looking to trade. Tables stay open for casual play, trades, and catching up with other players.\n\nFriday Night Magic runs during the same window—so Magic players can sit down for constructed, Commander, or pickup games while trade night continues around the shop.",
    game: "multi",
    eventType: "trade-night",
    image: TCG_IMAGES.shopBanner,
    startTime: "5:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "friday",
    entryFee: "Free",
    registrationRequired: false,
    featured: true,
    status: "scheduled",
    format: "Open play and weekly trade night",
    playerInfo:
      "All ages and experience levels are welcome. Stay for a quick trade or the full evening. Tables are first come, first served.",
    whatToBring: [
      "Binders and cards you want to trade",
      "Decks or games you want to play",
      "A trade list or wishlist if you have one",
      "Sleeves, dice, and playmat if you use them",
    ],
    registrationInfo: "No registration required. Walk in during PixelNation Friday Nights.",
  },
  {
    id: "friday-night-magic",
    slug: "friday-night-magic",
    title: "Friday Night Magic",
    subtitle: "Magic: The Gathering during PixelNation Friday Nights",
    shortDescription:
      "Magic: The Gathering play every Friday during PixelNation Friday Nights—casual constructed, Commander, and pickup games.",
    description:
      "Friday Night Magic is weekly Magic: The Gathering play at PixelNation, held during PixelNation Friday Nights.\n\nBring a constructed deck, a Commander deck, or sit down for pickup games with the local Magic community. Formats stay flexible so casual tables and more competitive pods can coexist—just communicate expectations before you shuffle up.\n\nTrade night continues in the same space, so you can play Magic, browse binders, and hang out without committing to a separate event.",
    game: "magic",
    eventType: "weekly",
    image: TCG_IMAGES.mtgBloomburrowCommanders,
    startTime: "5:00 PM",
    endTime: "10:00 PM",
    recurring: true,
    recurringDay: "friday",
    entryFee: "Free",
    registrationRequired: false,
    featured: false,
    status: "scheduled",
    format: "Casual constructed, Commander, and pickup Magic",
    playerInfo:
      "Players of all skill levels are welcome. Precons are fine. Tell your table whether you want a casual or higher-power game.",
    whatToBring: [
      "A Magic deck (constructed or Commander)",
      "Sleeves, tokens, and a playmat if you have them",
      "A backup deck if you like switching formats",
    ],
    registrationInfo:
      "No registration required. Walk in during PixelNation Friday Nights and ask for a Magic table.",
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
  title: "Gaming Events in Emporia KS | PixelNation",
  description:
    "Discover upcoming trading card events, Pokémon trade nights, Magic: The Gathering events, tournaments, video game nights and community gaming at PixelNation in Emporia, Kansas.",
  path: "/events",
} as const;
