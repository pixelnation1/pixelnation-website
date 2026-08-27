import { TCG_IMAGES } from "@/lib/tcg/images";
import { TCG_LAUNCH } from "@/lib/tcg/launch";
import type { TcgGame, TcgGameSlug } from "@/lib/tcg/types";

export const TCG_GAMES: Record<TcgGameSlug, TcgGame> = {
  pokemon: {
    slug: "pokemon",
    name: "Pokémon",
    shortName: "Pokémon",
    href: "/trading-cards/pokemon",
    tagline:
      "Booster packs, Elite Trainer Boxes, singles, accessories, and the latest Pokémon TCG releases.",
    intro:
      "Pokémon cards in Emporia, KS mean more than packs on a shelf—they mean trainers learning together, families opening boosters, and a local community that celebrates every win. PixelNation carries Pokémon TCG sealed products, singles, supplies, and welcoming play in downtown Emporia.",
    metaTitle: "Pokémon Cards Emporia KS | Pokémon TCG | PixelNation",
    metaDescription:
      "Buy Pokémon cards in Emporia, Kansas. PixelNation offers Pokémon TCG sealed products, singles, accessories, and community play. Selection varies—contact us for availability.",
    keywords: [
      "Pokémon cards Emporia KS",
      "Pokémon TCG Emporia",
      "Pokémon events Emporia",
      "Buy Pokémon cards Emporia",
      "Sell Pokémon cards Kansas",
    ],
    accent: "#f4c542",
    image: TCG_IMAGES.pokemonPrismaticEtb,
    gallery: [
      TCG_IMAGES.pokemon151Etb,
      TCG_IMAGES.pokemonSurgingSparksEtb,
      TCG_IMAGES.pokemonDestinedRivalsEtb,
      TCG_IMAGES.pokemonDestinedRivalsBoosterBox,
      TCG_IMAGES.pokemon151UltraPremium,
      TCG_IMAGES.pokemon151BoosterBundle,
      TCG_IMAGES.pokemonBlackBoltEtb,
      TCG_IMAGES.pokemonWhiteFlareEtb,
      TCG_IMAGES.pokemonScarletVioletBoosterBox,
      TCG_IMAGES.pokemonPrismaticSuperPremium,
      TCG_IMAGES.pokemonBattleStylesBoosterBox,
      TCG_IMAGES.pokemonPerfectOrderBoosterBox,
    ],
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
      "Singles selection varies. Contact us to ask about specific cards or to sell Pokémon cards in Kansas.",
    accessoriesStatus:
      "Sleeves, binders, and related supplies are available. Selection varies—ask about current stock.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Pokémon collections, sealed products, and singles may be reviewed for purchase or trade. Identification may be required.",
    productsCarried: [
      "Booster packs",
      "Elite Trainer Boxes",
      "Collection boxes",
      "Tins",
      "Booster bundles",
      "Starter products",
      "Singles",
      "Sleeves",
      "Binders",
      "Playmats",
    ],
    learnToPlay:
      "New to the Pokémon TCG? Staff can point new trainers toward starter products and beginner-friendly resources. Casual play during PixelNation Friday Nights is a good way to learn at the table.",
    casualPlay:
      "Pokémon is one of the most family-friendly trading card games. Casual, all-ages play is welcome—bring your deck or start a new one.",
    plannedEventTypes: [
      "Pokémon casual play",
      "Learn-to-play sessions",
      "Family gaming events",
      "Release events",
    ],
    whyPeopleLove:
      "Pokémon is nostalgia, art, and approachable strategy in one hobby. Kids light up over favorite creatures; collectors chase special treatments; competitive players refine prize-trade decisions. Few games make starting feel this exciting.",
    whoItsFor:
      "Families, kids, collectors, casual trainers, and players who want a welcoming path into competitive play. If you love characters, collecting, or friendly battles, Pokémon fits.",
    howBeginnersStart:
      "Begin with a battle deck or teachable starter product, learn Active Pokémon and Prize cards with a patient partner, then grow into boosters, Elite Trainer Boxes, and sleeves. Visit Learn to Play or ask staff for a beginner path.",
    recommendedProducts: [
      "Battle decks / League Battle Decks",
      "Elite Trainer Boxes",
      "Booster packs and bundles",
      "Sleeves and binders",
    ],
    whyWeCarry:
      "Pokémon brings families and first-time TCG players through the door. Carrying Pokémon helps PixelNation be a true local game store for Emporia—not only a repair counter.",
    faqs: [
      {
        question: "Can I buy Pokémon cards at PixelNation in Emporia?",
        answer:
          "Yes. PixelNation carries Pokémon TCG products in Emporia. Selection and availability vary; contact us or visit for current stock.",
      },
      {
        question: "Do you buy or trade Pokémon cards?",
        answer:
          "PixelNation buys and trades eligible Pokémon singles, collections, and sealed products based on condition, authenticity, demand, and market value. Start with a collection review request.",
        links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
      },
      {
        question: "Will there be Pokémon events in Emporia?",
        answer:
          "Yes. Pokémon Night is every Wednesday from 6:00 PM to 8:00 PM. Check the events page for tournaments and special Pokémon events.",
        links: [{ label: "View Events", href: "/events" }],
      },
    ],
  },
  "magic-the-gathering": {
    slug: "magic-the-gathering",
    name: "Magic: The Gathering",
    shortName: "MTG",
    href: "/trading-cards/magic-the-gathering",
    tagline:
      "Commander decks, Play Boosters, Collector products, singles, and accessories for every Magic player.",
    intro:
      "Magic: The Gathering in Emporia, KS is about more than cardboard—it is Commander pods, Friday Night Magic, and the joy of discovering a deck that feels like you. PixelNation supports MTG sealed products, singles, accessories, and community play in downtown Emporia.",
    metaTitle: "Magic the Gathering Emporia KS | MTG Cards | PixelNation",
    metaDescription:
      "MTG cards in Emporia, Kansas. PixelNation supports Magic: The Gathering sealed products, singles, Commander play, and Friday Night Magic. Ask about availability.",
    keywords: [
      "Magic the Gathering Emporia KS",
      "MTG Emporia",
      "MTG cards Emporia",
      "Commander night Emporia",
      "Magic events Emporia",
    ],
    accent: "#38ddf8",
    image: TCG_IMAGES.mtgBloomburrowCommanders,
    gallery: [
      TCG_IMAGES.mtgAetherdriftBoosterBox,
      TCG_IMAGES.mtgLotrCommanders,
      TCG_IMAGES.mtgFinalFantasyCollectors,
      TCG_IMAGES.mtgFinalFantasyStarterKit,
      TCG_IMAGES.mtgTmntPlayBoosters,
      TCG_IMAGES.mtgTmntCollectorBoosters,
      TCG_IMAGES.mtgAvatarPlayBoosters,
      TCG_IMAGES.mtgWarhammerCommanders,
      TCG_IMAGES.mtgFalloutCommanders,
      TCG_IMAGES.mtgEldraineBoosterBox,
      TCG_IMAGES.mtgKhansBoosterBox,
      TCG_IMAGES.mtgStrixhavenPrerelease,
    ],
    productCategories: [
      {
        title: "Sealed products",
        description:
          "Set boosters, commander products, and specialty releases when available.",
      },
      {
        title: "Singles",
        description:
          "Cards for Constructed, Commander, and casual play—ask about current singles.",
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
      "MTG singles selection varies. Contact us for specific cards or Commander staples.",
    accessoriesStatus:
      "Deck protection and accessories are available. Selection varies—ask about current stock.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus:
      "Friday Night Magic runs every Friday from 6:00 PM to 10:00 PM. Commander Night is Thursday. Check the events page for the current Magic calendar.",
    buySellTradeStatus:
      "Eligible MTG singles, collections, and sealed products may be evaluated for cash or store credit.",
    productsCarried: [
      "Play boosters",
      "Collector boosters",
      "Commander decks",
      "Bundles",
      "Booster boxes",
      "Starter kits",
      "Singles",
      "Sleeves",
      "Deck boxes",
      "Playmats",
    ],
    learnToPlay:
      "Never played Magic? Ask staff where to begin—starter kits and Commander precons are a common first step, and Friday Night Magic is a welcoming table for new players.",
    casualPlay:
      "Commander nights, casual constructed play, and draft tables are part of Magic play at PixelNation. Join Friday Night Magic or ask about a pickup game.",
    plannedEventTypes: [
      "Commander nights",
      "Draft nights",
      "Prerelease events",
      "Learn-to-play sessions",
      "Casual play",
    ],
    whyPeopleLove:
      "Magic rewards creativity and conversation. Commander tables become stories. Drafts create shared chaos. Constructed formats push skill. Players stay because every deck—and every table—feels personal.",
    whoItsFor:
      "Social multiplayer fans, collectors of Universes Beyond and premium treatments, competitive minds, and beginners willing to learn one excellent format at a time—often Commander.",
    howBeginnersStart:
      "Start with a Commander precon or starter kit, ask for a teach game, and tell your table you are new. Then explore Play Boosters, sleeves, and singles as your style emerges. See Commander Nights and Learn to Play for more.",
    recommendedProducts: [
      "Commander precons",
      "Starter kits",
      "Play Boosters",
      "Sleeves, deck boxes, and playmats",
    ],
    whyWeCarry:
      "Magic is the backbone of many local game stores. Supporting MTG—and especially Commander—gives PixelNation a weekly community table in Emporia.",
    faqs: [
      {
        question: "Where can I find MTG cards in Emporia?",
        answer:
          "PixelNation carries Magic: The Gathering products in Emporia, Kansas. Availability changes with releases—reach out or visit for current stock.",
      },
      {
        question: "Do you support Commander in Emporia?",
        answer:
          "Yes. Commander Night is every Thursday from 6:00 PM to 10:00 PM. Commander tables are also welcome during Friday Night Magic. Bring a precon or your own deck and tell your table the power level you want.",
      },
      {
        question: "Will there be Magic events in Emporia?",
        answer:
          "Yes. Friday Night Magic runs every Friday from 6:00 PM to 10:00 PM. Commander Night is Thursday from 6:00 PM to 10:00 PM. See the events page for the current Magic calendar.",
        links: [{ label: "Events", href: "/events" }],
      },
    ],
  },
  "yu-gi-oh": {
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    shortName: "Yu-Gi-Oh!",
    href: "/trading-cards/yu-gi-oh",
    tagline:
      "Structure Decks, booster products, singles, accessories, and popular releases for duelists of every experience level.",
    intro:
      "Yu-Gi-Oh! in Emporia, KS is for duelists who love big summons, clever combos, and the energy of a good match. PixelNation carries sealed products, singles, and accessories—and welcomes duelists during PixelNation Friday Nights.",
    metaTitle: "Yu-Gi-Oh Cards Emporia KS | Yu-Gi-Oh Products | PixelNation",
    metaDescription:
      "Yu-Gi-Oh cards and products in Emporia, Kansas. PixelNation offers sealed Yu-Gi-Oh! products, singles, accessories, and community play. Contact for availability.",
    keywords: [
      "Yu-Gi-Oh cards Emporia KS",
      "Yu-Gi-Oh products Emporia",
    ],
    accent: "#7eb8ff",
    image: TCG_IMAGES.yugiohSealedProducts,
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
      "Yu-Gi-Oh! singles selection varies. Contact us with card requests or collections to sell.",
    accessoriesStatus:
      "Dueling supplies are available. Selection varies—ask about current stock.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Yu-Gi-Oh! singles, collections, and sealed products may be reviewed for purchase or trade.",
    productsCarried: [
      "Booster packs",
      "Booster boxes",
      "Structure decks",
      "Tins",
      "Special collections",
      "Singles",
      "Card sleeves",
      "Deck boxes",
    ],
    learnToPlay:
      "Structure decks are a great entry point for new duelists. Ask staff where to start, then sit down for beginner-friendly play during PixelNation Friday Nights.",
    casualPlay:
      "Casual dueling and Yu-Gi-Oh! play are welcome at PixelNation Friday Nights. Bring your deck or build a new one from structure decks and singles.",
    plannedEventTypes: [
      "Yu-Gi-Oh! casual play",
      "Learn-to-play sessions",
      "Local events",
      "Trade nights",
    ],
    whyPeopleLove:
      "Yu-Gi-Oh! is dramatic and expressive. Turns swing hard, monsters hit the field with flair, and Structure Decks make it easy to feel powerful quickly. Fans love the pace and the nostalgia.",
    whoItsFor:
      "Anime fans, duelists who enjoy combo lines, collectors of iconic cards, and beginners who want a Structure Deck path into the game.",
    howBeginnersStart:
      "Pick up a Structure Deck, learn summons and Spell/Trap basics with a patient partner, then expand with boosters and sleeves. Ask about learn-to-play guidance—experienced duelists are encouraged to teach.",
    recommendedProducts: [
      "Structure Decks",
      "Booster packs and boxes",
      "Sleeves and deck boxes",
      "Special collections and tins",
    ],
    whyWeCarry:
      "Yu-Gi-Oh! keeps competitive energy and classic TCG culture alive. Supporting duelists helps PixelNation serve the full spectrum of Emporia’s card community.",
    faqs: [
      {
        question: "Do you sell Yu-Gi-Oh! products in Emporia?",
        answer:
          "Yes. PixelNation carries Yu-Gi-Oh! products in Emporia, Kansas. Selection and availability vary—contact us for current stock.",
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
    tagline:
      "Booster products, Illumineer’s Troves, starter decks, singles, and accessories for Lorcana players and collectors.",
    intro:
      "Disney Lorcana in Emporia, KS invites families and storytellers to the table. Quest for lore, collect beloved characters, and learn a game designed to feel welcoming. PixelNation offers sealed products, singles, accessories, and family-friendly play.",
    metaTitle: "Lorcana Cards Emporia KS | Disney Lorcana | PixelNation",
    metaDescription:
      "Disney Lorcana cards in Emporia, Kansas. PixelNation offers Lorcana sealed products, singles, accessories, and community play. Ask about availability.",
    keywords: [
      "Lorcana cards Emporia KS",
      "Disney Lorcana Emporia",
    ],
    accent: "#c9a227",
    image: TCG_IMAGES.lorcanaSealedProducts,
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
      "Lorcana singles selection varies. Contact us for specific cards.",
    accessoriesStatus:
      "Accessories are available. Selection varies—ask about current stock.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible Lorcana products and collections may be considered for buy or trade.",
    productsCarried: [
      "Booster packs",
      "Booster boxes",
      "Starter decks",
      "Gift sets",
      "Troves",
      "Singles",
      "Sleeves",
      "Binders",
    ],
    learnToPlay:
      "Lorcana is welcoming for new players and families. Starter decks make it easy to begin, and staff can help you learn the ink system at the table.",
    casualPlay:
      "Family-friendly Lorcana play is welcome during PixelNation Friday Nights. Casual games are a great way to learn the ink system and meet local players.",
    plannedEventTypes: [
      "Lorcana casual play",
      "Learn-to-play sessions",
      "Family-friendly events",
      "Release events",
    ],
    whyPeopleLove:
      "Lorcana wraps strategy in Disney storytelling. Beautiful cards, approachable questing, and shared table moments make it a favorite for families and new collectors alike.",
    whoItsFor:
      "Families, Disney fans, newer TCG players, collectors who love art, and anyone who wants a friendlier first multiplayer hobby night.",
    howBeginnersStart:
      "Start with a starter deck or teachable product, learn inking and questing together, then grow into boosters, Illumineer’s Troves, and binders. Family Gaming and Learn to Play pages share more tips.",
    recommendedProducts: [
      "Starter decks",
      "Illumineer’s Troves",
      "Booster packs and boxes",
      "Sleeves and binders",
    ],
    whyWeCarry:
      "Lorcana helps PixelNation welcome families and brand-new players. It is a natural bridge between collecting joy and community play in Emporia.",
    faqs: [
      {
        question: "Where can I get Lorcana cards in Emporia?",
        answer:
          "PixelNation carries Disney Lorcana in Emporia, Kansas. Availability varies—contact us for current products.",
      },
      {
        question: "Will there be Lorcana play events?",
        answer:
          "Yes. Lorcana play is welcome during PixelNation Friday Nights every Friday from 5:00 PM to 10:00 PM. Check the events page for special Lorcana nights.",
        links: [{ label: "Events", href: "/events" }],
      },
    ],
  },
  "one-piece": {
    slug: "one-piece",
    name: "One Piece Card Game",
    shortName: "One Piece",
    href: "/trading-cards/one-piece",
    tagline:
      "Booster products, Starter Decks, special collections, singles, and accessories for One Piece players and collectors.",
    intro:
      "One Piece Card Game fans in Emporia, KS—set sail with Starter Decks, sealed products, and a community ready to teach DON!! and Life cards. PixelNation supports One Piece so players and collectors have a local home for the adventure.",
    metaTitle: "One Piece Card Game Emporia KS | One Piece Cards | PixelNation",
    metaDescription:
      "One Piece Card Game products in Emporia, Kansas. PixelNation offers sealed One Piece cards, singles, accessories, and community play. Contact for availability.",
    keywords: [
      "One Piece Card Game Emporia KS",
      "One Piece cards Emporia",
    ],
    accent: "#ff6b4a",
    image: TCG_IMAGES.onePieceSealedProducts,
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
      "One Piece singles selection varies. Contact us with requests or collections to sell.",
    accessoriesStatus: "Accessories are available alongside sealed and singles products.",
    preorderStatus: TCG_LAUNCH.preorderStatus,
    organizedPlayStatus: TCG_LAUNCH.organizedPlayStatus,
    buySellTradeStatus:
      "Eligible One Piece sealed products, singles, and collections may be reviewed for purchase or trade.",
    productsCarried: [
      "Booster packs",
      "Booster boxes",
      "Starter decks",
      "Double packs",
      "Special collections",
      "Singles",
      "Card sleeves",
      "Deck boxes",
    ],
    learnToPlay:
      "Starter decks are the easiest way into the One Piece Card Game. Ask staff where to begin, then sit down during PixelNation Friday Nights to learn DON!! and Life cards at the table.",
    casualPlay:
      "Casual One Piece play is welcome at PixelNation Friday Nights. Meet other players and test decks in a relaxed setting.",
    plannedEventTypes: [
      "One Piece casual play",
      "Learn-to-play sessions",
      "Local events",
      "Release events",
    ],
    whyPeopleLove:
      "One Piece brings anime energy to the table—Leaders you know, dramatic attacks, and resource play that feels unique. Fans love representing their favorite crews while learning a crisp competitive game.",
    whoItsFor:
      "Anime fans, collectors of special sets, casual players who want lively matches, and newcomers who recognize characters and want a Starter Deck on-ramp.",
    howBeginnersStart:
      "Choose a Starter Deck with a Leader you love, learn Life and DON!! with a patient partner, then explore boosters and accessories. Ask about open play and learn-to-play help.",
    recommendedProducts: [
      "Starter Decks",
      "Booster packs and boxes",
      "Special collections",
      "Sleeves and deck boxes",
    ],
    whyWeCarry:
      "One Piece expands PixelNation’s community beyond classic TCGs and invites fans who may never have visited a local game store before—exactly the kind of energy Emporia needs.",
    faqs: [
      {
        question: "Do you sell One Piece cards in Emporia?",
        answer:
          "Yes. PixelNation carries One Piece Card Game products in Emporia, Kansas. Selection and availability vary—contact us for current stock.",
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
