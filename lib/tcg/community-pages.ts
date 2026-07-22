import type { PixelNationEvent } from "@/lib/tcg/types";

/** Community & LGS-feeling pages — informational only, no ecommerce. */

export const GAMING_COMMUNITY_METADATA = {
  title: "Gaming Community Emporia KS | PixelNation",
  description:
    "PixelNation is building a welcoming gaming community in Emporia, Kansas for casual players, competitive players, families, kids, collectors, and newcomers.",
  path: "/gaming-community",
} as const;

export const COMMANDER_NIGHTS_METADATA = {
  title: "Commander Nights Emporia KS | MTG Commander | PixelNation",
  description:
    "Learn about Magic: The Gathering Commander nights in Emporia, Kansas—what Commander is, why people love it, and how new players can join casual or competitive pods.",
  path: "/commander-nights",
} as const;

export const LEARN_TO_PLAY_METADATA = {
  title: "Learn to Play TCG Emporia KS | PixelNation",
  description:
    "Beginner guides for Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and One Piece Card Game in Emporia. Experienced players are welcome to help teach newcomers.",
  path: "/learn-to-play",
} as const;

export const WEEKLY_EVENTS_METADATA = {
  title: "Weekly Gaming Events Emporia KS | PixelNation",
  description:
    "Future weekly events at PixelNation in Emporia—Friday Night Magic, Commander, Pokémon League, Open Play, One Piece, Lorcana, and board games. Schedules announced when confirmed.",
  path: "/weekly-events",
} as const;

export const FAMILY_GAMING_METADATA = {
  title: "Family Gaming Emporia KS | PixelNation",
  description:
    "PixelNation aims to be a family-friendly gaming environment in Emporia, Kansas—respectful play, welcoming staff, and a place parents can feel comfortable bringing children.",
  path: "/family-gaming",
} as const;

export const WHAT_TO_EXPECT_METADATA = {
  title: "What to Expect | First Visit to PixelNation Gaming",
  description:
    "First time visiting PixelNation for trading cards or gaming? Expect a friendly atmosphere, helpful staff, no experience required, clean play space, community events, and learning opportunities.",
  path: "/what-to-expect",
} as const;

export const TCG_PHILOSOPHY_METADATA = {
  title: "Trading Card Philosophy | Why TCGs Matter | PixelNation",
  description:
    "Why trading card games matter at PixelNation—friendships, creativity, competition, collecting, strategy, and community in Emporia, Kansas.",
  path: "/trading-card-philosophy",
} as const;

export const GAMING_COMMUNITY = {
  heroTitle: "A welcoming gaming community in Emporia",
  heroSupport:
    "PixelNation is building more than a counter full of cards. We are building a local game store community where people feel comfortable showing up—whether they bring a polished deck or a question about how the game even works.",
  vision: [
    `Local game stores thrive when everyone belongs. Casual players who want a fun night. Competitive players who love a sharp match. Families looking for something they can share. Kids discovering their first favorite cards. Collectors chasing art and nostalgia. New players who have never shuffled a deck.`,
    `Our vision for Emporia is simple: a place where technology repair and gaming culture live side by side, and where community is the product as much as any sealed box on the shelf.`,
  ],
  audiences: [
    {
      title: "Casual players",
      text: "Come for the vibe, stay for the games. Casual play means laughing over misplays, trying new decks, and not worrying about perfect optimization.",
    },
    {
      title: "Competitive players",
      text: "When you want sharper play, we want space for that too—clear expectations, respectful tables, and room to improve.",
    },
    {
      title: "Families",
      text: "Parents should feel welcome. Family-friendly events and respectful norms help gaming feel like something you can share across ages.",
    },
    {
      title: "Kids",
      text: "First packs, first wins, first friendships. Kids deserve patient guidance and a safe, encouraging environment.",
    },
    {
      title: "Collectors",
      text: "Art, rarity, and the joy of completing a set. Collectors are part of the community—not separate from it.",
    },
    {
      title: "New players",
      text: "No experience required. Learn-to-play support, starter recommendations, and friendly tables help newcomers feel at home fast.",
    },
  ],
  closing:
    "Everyone should feel welcome at PixelNation. If you are curious, bring a question. If you are experienced, bring patience for the next player learning beside you.",
} as const;

export const COMMANDER_NIGHTS = {
  heroTitle: "Commander nights in Emporia",
  heroSupport:
    "Commander is Magic: The Gathering’s most social format—and one of the best ways to meet people at a local game store. PixelNation is preparing Commander nights as part of our expanded gaming community.",
  whatIs: [
    `Commander (also called Elder Dragon Highlander) is a multiplayer Magic format where each player builds a 100-card deck led by a legendary creature—their Commander. Decks are singleton: almost every card appears only once, which keeps games surprising and personal.`,
    `Most Commander games are designed for four players around a table. Turns take time. Politics happen. Huge plays happen. Someone’s board state becomes a story the whole table remembers.`,
  ],
  whyLove: [
    `People love Commander because it is social by design. You talk, negotiate, laugh, and share dramatic turns. Decks express personality—tribal themes, wild combos, cozy value engines, or splashy mythic moments.`,
    `It also scales. One night you can play a chill preconstructed deck. Another night you can bring something sharper. The format has room for both when tables communicate expectations.`,
  ],
  nightLooksLike: [
    `A Commander night typically means pods of players finding tables, shuffling up, and playing multiplayer games. Some nights lean casual; some tables prefer higher power. Staff and community norms help keep the room welcoming.`,
    `Expect conversation between games, help finding a pod, and space for spectators who want to watch a big turn unfold. Exact schedules and entry details will be announced when confirmed—until then, treat Commander nights as a planned community offering.`,
  ],
  howToJoin: [
    `New players can start with a precon (preconstructed Commander deck), ask staff for a beginner-friendly recommendation, or join a learn-to-play conversation before sitting down.`,
    `Bring a deck if you have one. If you do not, ask us what starter options are available. Tell your table whether you want casual or more competitive play—honest communication makes every pod better.`,
  ],
  casualVsCompetitive: [
    {
      title: "Casual pods",
      text: "Friendly games, thematic decks, and a focus on fun interactions. Perfect for learning, social nights, and precon play.",
    },
    {
      title: "Higher-power pods",
      text: "Faster games and sharper strategies. Still respectful—just clearer about wanting a more competitive table.",
    },
  ],
} as const;

export const LEARN_TO_PLAY_GUIDES = [
  {
    slug: "pokemon",
    name: "Pokémon",
    href: "/trading-cards/pokemon",
    summary:
      "Pokémon is colorful, approachable, and one of the easiest TCGs for families and kids to grow into.",
    steps: [
      "Start with a battle deck, League Battle Deck, or two players sharing a teachable starter product.",
      "Learn the basics: Active Pokémon, Bench, Energy attachment, and taking Prize cards.",
      "Ask for a learn-to-play table or a patient partner—experienced trainers love helping new ones.",
      "Grow into booster packs, Elite Trainer Boxes, and sleeves once you know what you enjoy.",
    ],
  },
  {
    slug: "magic",
    name: "Magic: The Gathering",
    href: "/trading-cards/magic-the-gathering",
    summary:
      "Magic is deep and expressive. Commander is often the friendliest doorway for social play.",
    steps: [
      "Begin with a starter kit or a Commander precon if you want multiplayer fun right away.",
      "Learn lands, casting spells, combat, and how your deck’s goal works.",
      "Ask for a teach game—many Magic players happily explain while playing.",
      "Explore Play Boosters, singles, and accessories as your style becomes clear.",
    ],
  },
  {
    slug: "yugioh",
    name: "Yu-Gi-Oh!",
    href: "/trading-cards/yu-gi-oh",
    summary:
      "Yu-Gi-Oh! is fast, dramatic, and full of memorable monster moments duelists never forget.",
    steps: [
      "Start with a Structure Deck or beginner-friendly product staff recommend for learning.",
      "Learn Normal Summons, Special Summons, Spell/Trap timing at a gentle pace.",
      "Play teaching games before jumping into complex competitive lists.",
      "Add sleeves, a deck box, and sealed product as you find a strategy you love.",
    ],
  },
  {
    slug: "lorcana",
    name: "Disney Lorcana",
    href: "/trading-cards/lorcana",
    summary:
      "Lorcana blends Disney storytelling with approachable questing—great for families and new collectors.",
    steps: [
      "Grab a starter deck or Illumineer’s pathway that lets two people learn together.",
      "Learn inking, questing, challenging, and how lore wins the game.",
      "Ask for a family-friendly teach session—Lorcana shines when shared.",
      "Expand with boosters, Troves, sleeves, and binders as your collection grows.",
    ],
  },
  {
    slug: "one-piece",
    name: "One Piece Card Game",
    href: "/trading-cards/one-piece",
    summary:
      "The One Piece Card Game brings anime energy, leaders, and DON!! resource play into lively matches.",
    steps: [
      "Begin with a Starter Deck featuring a Leader you recognize and enjoy.",
      "Learn Life cards, DON!!, attacking, and blocking with a patient partner.",
      "Join open play once the basics feel comfortable—community tables help a lot.",
      "Add boosters, special collections, and accessories as you build your crew.",
    ],
  },
] as const;

export const LEARN_TO_PLAY_PAGE = {
  heroTitle: "Learn to play trading card games",
  heroSupport:
    "New to TCGs? Perfect. PixelNation wants beginners to feel supported—and experienced players are always welcome to help teach newcomers.",
  mentorship:
    "Some of the best local game store moments happen when a veteran sits down, shuffles up, and teaches. If you already know a game, consider being that person for someone else. If you are brand new, ask—someone nearby likely remembers their first game too.",
} as const;

/** Placeholder weekly event cards — not real scheduled events. */
export const WEEKLY_EVENT_PLACEHOLDERS: readonly PixelNationEvent[] = [
  {
    id: "placeholder-fnm",
    title: "Friday Night Magic",
    game: "Magic: The Gathering",
    day: "Fridays (planned)",
    description:
      "A classic weekly Magic night for constructed or limited play. Exact format and times will be announced when the schedule is confirmed.",
    skillLevel: "All welcome",
    status: "coming-soon",
    registrationNote: "Placeholder event—dates and registration details TBD.",
  },
  {
    id: "placeholder-commander",
    title: "Commander Night",
    game: "Magic: The Gathering",
    day: "Weekly (planned)",
    description:
      "Multiplayer Commander pods with a social focus. Casual and higher-power tables can coexist when players communicate expectations.",
    skillLevel: "Casual to competitive",
    format: "Commander",
    status: "coming-soon",
    registrationNote: "Placeholder event—see Commander Nights for format details.",
  },
  {
    id: "placeholder-pokemon-league",
    title: "Pokémon League",
    game: "Pokémon",
    day: "Weekly (planned)",
    description:
      "A welcoming Pokémon play space for trainers of many ages—learn, battle casually, and grow into organized formats over time.",
    skillLevel: "Beginner friendly",
    status: "coming-soon",
    registrationNote: "Placeholder event—league details announced when confirmed.",
  },
  {
    id: "placeholder-open-play",
    title: "Open Play",
    game: "Multiple games",
    day: "Recurring (planned)",
    description:
      "Bring a deck, find a table, and play. Open play is for spontaneous games across supported trading card titles.",
    skillLevel: "All welcome",
    status: "coming-soon",
    registrationNote: "Placeholder event—no signup invented yet.",
  },
  {
    id: "placeholder-one-piece",
    title: "One Piece Play Night",
    game: "One Piece Card Game",
    day: "Weekly (planned)",
    description:
      "Casual and structured One Piece play as community interest grows—Starter Decks welcome.",
    skillLevel: "All welcome",
    status: "coming-soon",
    registrationNote: "Placeholder event—schedule TBD.",
  },
  {
    id: "placeholder-lorcana",
    title: "Lorcana Play Night",
    game: "Disney Lorcana",
    day: "Weekly (planned)",
    description:
      "Family-friendly Lorcana tables for new Illumineers and returning players alike.",
    skillLevel: "Beginner friendly",
    status: "coming-soon",
    registrationNote: "Placeholder event—schedule TBD.",
  },
  {
    id: "placeholder-board-games",
    title: "Board Game Night",
    game: "Board games",
    day: "Occasional (planned)",
    description:
      "Tabletop nights beyond TCGs—community games, teachable titles, and social play as space allows.",
    skillLevel: "All welcome",
    status: "coming-soon",
    registrationNote: "Placeholder event—titles and dates TBD.",
  },
] as const;

export const WEEKLY_EVENTS_PAGE = {
  heroTitle: "Weekly events (coming soon)",
  heroSupport:
    "These cards represent the kinds of weekly experiences PixelNation plans to host. They are placeholders—not live schedules. Real dates, times, and registration details will replace them when confirmed.",
  note: "PixelNation’s regular event schedule will be announced as the expanded location gets closer to opening. Contact us to follow updates.",
} as const;

export const FAMILY_GAMING = {
  heroTitle: "Family-friendly gaming",
  heroSupport:
    "Parents should feel comfortable bringing children to PixelNation. We want gaming to feel safe, respectful, and joyful for families discovering cards and tables together.",
  why: [
    `Trading card games can be one of the best shared hobbies a family finds—collecting together, learning rules together, and celebrating small wins together.`,
    `A family-friendly environment means clear expectations: respectful language, patience with learners, and staff who help kids and parents feel oriented instead of overwhelmed.`,
  ],
  commitments: [
    {
      title: "Comfort for parents",
      text: "Ask questions, watch a game, or sit nearby while a child learns. You should never feel out of place for looking out for your family.",
    },
    {
      title: "Respectful gaming",
      text: "We encourage sportsmanship, kindness after tough games, and tables that make room for different ages and experience levels.",
    },
    {
      title: "Age-aware events",
      text: "Some events will lean all-ages or family-focused. Others may be better for older players. We will label expectations clearly when schedules go live.",
    },
    {
      title: "Learning together",
      text: "Starter products, teach games, and patient community members help families start without pressure.",
    },
  ],
} as const;

export const WHAT_TO_EXPECT = {
  heroTitle: "What to expect on your first visit",
  heroSupport:
    "Walking into a game store for the first time can feel intimidating. It should not. Here is what first-time visitors can expect at PixelNation.",
  items: [
    {
      title: "Friendly atmosphere",
      text: "Say hello. Ask what is going on. Curiosity is welcome here.",
    },
    {
      title: "Helpful staff",
      text: "Whether you need a repair update or a starter deck suggestion, we aim to explain options clearly.",
    },
    {
      title: "No experience required",
      text: "You do not need to know every rule. Beginners belong at the table.",
    },
    {
      title: "Clean play space",
      text: "As our expanded location comes together, organized tables and a tidy play area are part of the plan.",
    },
    {
      title: "Community events",
      text: "Weekly play, learn-to-play nights, and special releases are coming—follow events pages for real schedules when posted.",
    },
    {
      title: "Learning opportunities",
      text: "Teaching games, beginner guidance, and patient players help newcomers grow into the hobby.",
    },
  ],
  tip: "First visit tip: tell us what you are looking for—repair, cards, a teach game, or just browsing. We will point you in the right direction.",
} as const;

export const TCG_PHILOSOPHY = {
  heroTitle: "Why trading card games matter",
  heroSupport:
    "Cards are cardboard, but what they create is human. PixelNation carries trading card games because they build friendships, creativity, competition, collecting joy, strategy, and community.",
  pillars: [
    {
      title: "Friendships",
      text: "Rivalries that become friendships. Tables that become weekly traditions. Names you learn because someone taught you a ruling with a smile.",
    },
    {
      title: "Creativity",
      text: "Deckbuilding is storytelling. Themes, colors, leaders, and pet cards turn a pile of cards into something uniquely yours.",
    },
    {
      title: "Competition",
      text: "Wanting to improve is healthy. Good competition sharpens focus while still leaving room for respect after the match.",
    },
    {
      title: "Collecting",
      text: "Art, nostalgia, chase cards, and the quiet thrill of completing a set—collecting is a valid way to love the hobby.",
    },
    {
      title: "Strategy",
      text: "Resource management, sequencing, reading opponents—TCGs reward thinking without requiring anyone to be an expert on day one.",
    },
    {
      title: "Community",
      text: "A local game store is a third place: not home, not work—somewhere people gather because they share a passion.",
    },
  ],
  closing:
    "That is why PixelNation invests in trading cards alongside repair and technology education. The cards matter. The people matter more.",
} as const;

export const COMMUNITY_HUB_LINKS = [
  { label: "Gaming Community", href: "/gaming-community" },
  { label: "Commander Nights", href: "/commander-nights" },
  { label: "Learn to Play", href: "/learn-to-play" },
  { label: "Weekly Events", href: "/weekly-events" },
  { label: "Family Gaming", href: "/family-gaming" },
  { label: "What to Expect", href: "/what-to-expect" },
  { label: "Trading Card Philosophy", href: "/trading-card-philosophy" },
] as const;
