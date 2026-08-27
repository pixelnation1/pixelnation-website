import type { RecurringDay } from "@/lib/events/types";

/**
 * Permanent weekly gaming schedule.
 * Edit times, titles, and copy here. One-off lineups (this week's Tuesday
 * game, a Saturday tournament, this week's FNM format) belong in
 * lib/events/data.ts as StoreEvent entries with a matching weeklySlotId.
 */
export type WeeklyScheduleCategory =
  | "retro"
  | "rotating"
  | "pokemon"
  | "magic"
  | "video-games"
  | "tournament"
  | "community";

export type WeeklyScheduleIcon =
  | "gamepad"
  | "cards"
  | "lightning"
  | "trophy"
  | "handshake"
  | "dice"
  | "controller";

export type WeeklyScheduleSlot = {
  id: string;
  title: string;
  startTime?: string;
  endTime?: string;
  timesVary?: boolean;
  category: WeeklyScheduleCategory;
  categoryLabel: string;
  description: string;
  icon: WeeklyScheduleIcon;
  /** Recurring event in STORE_EVENTS for the details page. */
  eventSlug?: string;
  cta?: { label: string; href: string };
};

export type WeeklyScheduleDay = {
  day: RecurringDay;
  /** CSS color used as a left-border / badge accent — not a full-card fill. */
  accent: string;
  slots: readonly WeeklyScheduleSlot[];
};

export const WEEKLY_SCHEDULE: readonly WeeklyScheduleDay[] = [
  {
    day: "monday",
    accent: "#a78bfa",
    slots: [
      {
        id: "monday-retro",
        title: "Retro Gaming Night",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        category: "retro",
        categoryLabel: "Retro Gaming",
        icon: "gamepad",
        description:
          "Retro console tournaments, high-score competitions, and rotating classics. Featured games change weekly and may include Mario Kart 64, Street Fighter II, Mortal Kombat, GoldenEye, Tetris, and more.",
        eventSlug: "retro-gaming-night",
        cta: { label: "View retro events", href: "/events/retro-gaming-night" },
      },
    ],
  },
  {
    day: "tuesday",
    accent: "#fb923c",
    slots: [
      {
        id: "tuesday-rotating",
        title: "Rotating Game Night",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        category: "rotating",
        categoryLabel: "Rotating Gaming",
        icon: "dice",
        description:
          "A different game each week—tabletop, trading cards, and community games. Lineups may include One Piece, Disney Lorcana, Riftbound, and other titles. Check the events page for this week's game.",
        eventSlug: "rotating-game-night",
        cta: { label: "View details", href: "/events/rotating-game-night" },
      },
    ],
  },
  {
    day: "wednesday",
    accent: "#f4c542",
    slots: [
      {
        id: "wednesday-pokemon",
        title: "Pokémon Night",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        category: "pokemon",
        categoryLabel: "Pokémon",
        icon: "lightning",
        description:
          "Play, trade, learn, and battle. All ages and skill levels are welcome.",
        eventSlug: "pokemon-night",
        cta: { label: "View Pokémon events", href: "/events/pokemon-night" },
      },
    ],
  },
  {
    day: "thursday",
    accent: "#38ddf8",
    slots: [
      {
        id: "thursday-commander",
        title: "Commander Night",
        startTime: "6:00 PM",
        endTime: "10:00 PM",
        category: "magic",
        categoryLabel: "Magic: The Gathering",
        icon: "cards",
        description:
          "Casual Magic: The Gathering Commander play all night. Bring your deck and join the community.",
        eventSlug: "commander-night",
        cta: { label: "View Magic events", href: "/events/commander-night" },
      },
    ],
  },
  {
    day: "friday",
    accent: "#f87171",
    slots: [
      {
        id: "friday-fnm",
        title: "Friday Night Magic",
        startTime: "6:00 PM",
        endTime: "10:00 PM",
        category: "magic",
        categoryLabel: "Magic: The Gathering",
        icon: "cards",
        description:
          "Friday Night Magic with rotating formats, prizes, and community play.",
        eventSlug: "friday-night-magic",
        cta: { label: "View Magic events", href: "/events/friday-night-magic" },
      },
      {
        id: "friday-video",
        title: "Friday Video Game Tournament",
        startTime: "7:00 PM",
        endTime: "10:00 PM",
        category: "video-games",
        categoryLabel: "Video Games",
        icon: "controller",
        description:
          "Modern console tournaments on the large-screen gaming setup. Featured games are posted on the events calendar.",
        eventSlug: "friday-video-game-tournament",
        cta: {
          label: "View details",
          href: "/events/friday-video-game-tournament",
        },
      },
    ],
  },
  {
    day: "saturday",
    accent: "#f4c542",
    slots: [
      {
        id: "saturday-tournament",
        title: "Tournament Saturday",
        timesVary: true,
        category: "tournament",
        categoryLabel: "Special Events / Tournaments",
        icon: "trophy",
        description:
          "Saturdays are reserved for larger events—TCG tournaments, prereleases, release nights, retro or video game tournaments, and other organized play. Times vary by event.",
        cta: { label: "View upcoming tournaments", href: "/events#special-events" },
      },
    ],
  },
  {
    day: "sunday",
    accent: "#c4b5fd",
    slots: [
      {
        id: "sunday-trade",
        title: "Trade & Play Sunday",
        startTime: "3:00 PM",
        endTime: "8:00 PM",
        category: "community",
        categoryLabel: "Community / Trade Night",
        icon: "handshake",
        description:
          "Trade, play casual games, bring binders, play board games, enjoy retro or modern gaming, and hang out with the PixelNation community. Family friendly.",
        eventSlug: "trade-play-sunday",
        cta: { label: "View details", href: "/events/trade-play-sunday" },
      },
    ],
  },
];

export const OPEN_PLAY = {
  title: "Free open play",
  body: "Don't feel like waiting for an event night? PixelNation's gaming space is available for free open play during normal store hours unless the space is being used for a scheduled event or tournament.",
  categories: [
    { label: "Trading card tables", icon: "cards" as const },
    { label: "Modern gaming", icon: "controller" as const },
    { label: "Retro gaming", icon: "gamepad" as const },
    { label: "Board games", icon: "dice" as const },
  ],
} as const;

export function getWeeklyDay(day: RecurringDay): WeeklyScheduleDay | undefined {
  return WEEKLY_SCHEDULE.find((item) => item.day === day);
}

export function getWeeklySlot(slotId: string): WeeklyScheduleSlot | undefined {
  for (const day of WEEKLY_SCHEDULE) {
    const slot = day.slots.find((item) => item.id === slotId);
    if (slot) return slot;
  }
  return undefined;
}

export function weeklyTemplateSlugs(): Set<string> {
  return new Set(
    WEEKLY_SCHEDULE.flatMap((day) =>
      day.slots.map((slot) => slot.eventSlug).filter((slug): slug is string => Boolean(slug)),
    ),
  );
}
