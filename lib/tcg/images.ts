import type { TcgImage } from "@/lib/tcg/types";

/**
 * Central catalog of product and marketing images in /public/images.
 * Only verified, identifiable product photography is listed here—alt text
 * describes the product shown and never implies live stock.
 */
export const TCG_IMAGES = {
  // ---- PixelNation brand ----
  shopBanner: {
    src: "/images/shopcoverphoto.png",
    alt: "PixelNation trading cards and gaming banner with Magic: The Gathering and Pokémon card artwork",
  },

  // ---- Yu-Gi-Oh! (official Konami asset — see /public/images/tcg/image-sources.md) ----
  yugiohSealedProducts: {
    src: "/images/tcg/yugioh/yugioh-sealed-products.webp",
    alt: "Yu-Gi-Oh! Trading Card Game sealed products",
  },

  // ---- Disney Lorcana (official Ravensburger asset — see /public/images/tcg/image-sources.md) ----
  lorcanaSealedProducts: {
    src: "/images/tcg/lorcana/disney-lorcana-sealed-products.webp",
    alt: "Disney Lorcana sealed trading card products",
  },

  // ---- One Piece Card Game (official Bandai asset — see /public/images/tcg/image-sources.md) ----
  onePieceSealedProducts: {
    src: "/images/tcg/one-piece/one-piece-card-game-sealed-products.webp",
    alt: "One Piece Card Game sealed products",
  },

  // ---- Pokémon ----
  pokemon151Etb: {
    src: "/images/151etb.jpg",
    alt: "Pokémon TCG Scarlet & Violet 151 Elite Trainer Box featuring Snorlax",
  },
  pokemonPrismaticEtb: {
    src: "/images/prismaticetb.jpg",
    alt: "Pokémon TCG Prismatic Evolutions Elite Trainer Box featuring Eevee",
  },
  pokemon151UltraPremium: {
    src: "/images/502005_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet 151 Ultra-Premium Collection box featuring Mew",
  },
  pokemon151BoosterBundle: {
    src: "/images/513405_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet 151 Booster Bundle display featuring Mew",
  },
  pokemonSurgingSparksEtb: {
    src: "/images/565632_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet Surging Sparks Elite Trainer Box featuring Pikachu",
  },
  pokemonPrismaticSuperPremium: {
    src: "/images/622770_in_1000x1000.jpg",
    alt: "Pokémon TCG Prismatic Evolutions Super-Premium Collection featuring Eevee",
  },
  pokemonDestinedRivalsEtb: {
    src: "/images/624675_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet Destined Rivals Elite Trainer Box featuring Team Rocket and Mewtwo",
  },
  pokemonDestinedRivalsBoosterBox: {
    src: "/images/624679_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet Destined Rivals booster pack display box",
  },
  pokemonBlackBoltEtb: {
    src: "/images/630687_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet Black Bolt Elite Trainer Box featuring Zekrom",
  },
  pokemonWhiteFlareEtb: {
    src: "/images/630688_in_1000x1000.jpg",
    alt: "Pokémon TCG Scarlet & Violet White Flare Elite Trainer Box featuring Reshiram",
  },
  pokemonScarletVioletBoosterBox: {
    src: "/images/s-l400 (1).png",
    alt: "Pokémon TCG Scarlet & Violet base set booster box with booster packs",
  },
  pokemonPerfectOrderBoosterBox: {
    src: "/images/pku10380.jpg",
    alt: "Pokémon TCG Mega Evolution Perfect Order booster pack display box",
  },
  pokemonPerfectOrderEtbPromo: {
    src: "/images/7a9e202f-4001-4320-b9cf-0ecfdd13e887.png",
    alt: "Pokémon TCG Mega Evolution Perfect Order Elite Trainer Box promotional graphic",
  },
  pokemonAscendedHeroesEtbPromo: {
    src: "/images/a72f8a9c-3a4b-4128-b0b9-2d00aa9a1914.png",
    alt: "Pokémon TCG Mega Evolution Ascended Heroes Elite Trainer Box promotional graphic",
  },
  pokemonPerfectOrderBundlePromo: {
    src: "/images/perfectorder.png",
    alt: "Pokémon TCG Mega Evolution Perfect Order booster bundle promotional graphic",
  },

  // ---- Magic: The Gathering ----
  mtgAetherdriftBoosterBox: {
    src: "/images/wocd41310-box.jpg",
    alt: "Magic: The Gathering Aetherdrift Play Booster display box",
  },
  mtgAetherdriftPromo: {
    src: "/images/1d0bbe02-3f4d-4368-be74-7b11f95f60e0.png",
    alt: "Magic: The Gathering Aetherdrift Play Booster box promotional graphic",
  },
  mtgBloomburrowCommanders: {
    src: "/images/BLBCommanderSetof4_3600x.jpeg",
    alt: "Magic: The Gathering Bloomburrow Commander deck set of four",
  },
  mtgLotrCommanders: {
    src: "/images/488297_in_1000x1000 (1).jpg",
    alt: "Magic: The Gathering The Lord of the Rings: Tales of Middle-earth Commander deck set of four",
  },
  mtgWarhammerCommanders: {
    src: "/images/272321_in_1000x1000.jpg",
    alt: "Magic: The Gathering Universes Beyond Warhammer 40,000 Commander deck set of four",
  },
  mtgWarhammerCollectorsCommanders: {
    src: "/images/272322_in_1000x1000.jpg",
    alt: "Magic: The Gathering Warhammer 40,000 Collector's Edition Commander deck set",
  },
  mtgFalloutCommanders: {
    src: "/images/524616_in_1000x1000.jpg",
    alt: "Magic: The Gathering Universes Beyond Fallout Commander deck set of four",
  },
  mtgTmntPlayBoosters: {
    src: "/images/657849_in_1000x1000.jpg",
    alt: "Magic: The Gathering Teenage Mutant Ninja Turtles Play Booster display box",
  },
  mtgTmntCollectorBoosters: {
    src: "/images/657852_in_1000x1000.jpg",
    alt: "Magic: The Gathering Teenage Mutant Ninja Turtles Collector Booster display box",
  },
  mtgFinalFantasyCollectors: {
    src: "/images/FIN_Collector.jpeg",
    alt: "Magic: The Gathering Final Fantasy Collector Booster display box",
  },
  mtgFinalFantasyStarterKit: {
    src: "/images/b96dee93FIN_Starter.jpeg",
    alt: "Magic: The Gathering Final Fantasy Starter Kit with two ready-to-play decks",
  },
  mtgAvatarPlayBoosters: {
    src: "/images/TLA_Play.jpeg",
    alt: "Magic: The Gathering Avatar: The Last Airbender Play Booster display box",
  },
  mtgAvatarCollectorBoosters: {
    src: "/images/TLA_Collector.jpg",
    alt: "Magic: The Gathering Avatar: The Last Airbender Collector Booster display box",
  },
  mtgEldraineBoosterBox: {
    src: "/images/71nAxZHs4RL._AC_UF894,1000_QL80_.jpg",
    alt: "Magic: The Gathering Throne of Eldraine booster pack display box",
  },
  mtgKhansBoosterBox: {
    src: "/images/91650_in_1000x1000.jpg",
    alt: "Magic: The Gathering Khans of Tarkir booster pack display box",
  },
  mtgStrixhavenPrerelease: {
    src: "/images/675578_in_1000x1000.jpg",
    alt: "Magic: The Gathering Secrets of Strixhaven prerelease pack set of five colleges",
  },
  mtgStrixhavenPlayBoosters: {
    src: "/images/WCMGSOSPB.jpg",
    alt: "Magic: The Gathering Secrets of Strixhaven Play Booster display box",
  },
  mtgSpiderManPlayBoosters: {
    src: "/images/WCMGSPMPB.jpg",
    alt: "Magic: The Gathering Marvel's Spider-Man Play Booster display box",
  },
  mtgMarvelPrerelease: {
    src: "/images/WCMGMSHPR (1).jpg",
    alt: "Magic: The Gathering Marvel Super Heroes prerelease box",
  },
  mtgHobbitCollectorBoosters: {
    src: "/images/f981bf7c-2748-43dd-92ea-5ba92f5b9673.png",
    alt: "Magic: The Gathering The Hobbit Collector Booster display box",
  },
  mtgHobbitPlayBoosters: {
    src: "/images/en_0dIZenqjm9.jpg",
    alt: "Magic: The Gathering The Hobbit Play Booster display box",
  },
  mtgHobbitGiftBundle: {
    src: "/images/92bf2167-04c2-5bb8-b410-37f9985c2c60__47569.jpg",
    alt: "Magic: The Gathering The Hobbit Gift Bundle with collector booster",
  },
  mtgHobbitBundle: {
    src: "/images/fdaaff1b-2c35-5655-97b4-f80f8865fd00__61696.jpg",
    alt: "Magic: The Gathering The Hobbit Bundle with nine play boosters",
  },
  mtgHobbitSceneBoxPlates: {
    src: "/images/f63d80a0-c300-5e8e-ac43-a0e156fc2c3f__74852.jpg",
    alt: "Magic: The Gathering The Hobbit Scene Box: Crack the Plates",
  },
  mtgHobbitSceneBoxSmaug: {
    src: "/images/zd1VuspAR4.jpg",
    alt: "Magic: The Gathering The Hobbit Scene Box: Treasures of Smaug",
  },
  mtgLorwynEclipsed: {
    src: "/images/mtg-lorwyn-boosters-deal-ign-2026-1769678298107.png",
    alt: "Magic: The Gathering Lorwyn Eclipsed Play Booster display box",
  },
  mtgRealityFractureCollectors: {
    src: "/images/realityfracture.jpg",
    alt: "Magic: The Gathering Reality Fracture Collector Booster box",
  },
  mtgStrixhavenCodexBundle: {
    src: "/images/2eb7c907-ebd9-4d46-acc5-c66a86aed2fd.png",
    alt: "Magic: The Gathering Secrets of Strixhaven Codex Bundle with card storage and accessories",
  },
  mtgStrixhavenCommandersPromo: {
    src: "/images/15060796-cceb-4cb7-bd64-4d0bb8065d6b.png",
    alt: "Magic: The Gathering Secrets of Strixhaven Commander decks promotional graphic showing five college decks",
  },
  mtgStrixhavenCollectorsPromo: {
    src: "/images/b17023d0-bc04-4cd9-be0c-65a8578d42a4.png",
    alt: "Magic: The Gathering Secrets of Strixhaven Collector Booster box promotional graphic",
  },
  mtgBloomburrowCommandersPromo: {
    src: "/images/b51c10f4-1b95-4d50-98dd-2381c04e09ac.png",
    alt: "Magic: The Gathering Bloomburrow Commander decks promotional graphic showing four decks",
  },
  mtgBaldursGateSetBoostersPromo: {
    src: "/images/764caf3a-5d5e-49a6-87a1-bbe5c45f8bc1.png",
    alt: "Magic: The Gathering Commander Legends: Battle for Baldur's Gate Set Booster box promotional graphic",
  },
  mtgEldrainePlayPromo: {
    src: "/images/eldraineplay.png",
    alt: "Magic: The Gathering Throne of Eldraine booster box promotional graphic",
  },
  mtgStrixhavenPlayPromo: {
    src: "/images/strixhavenplay.png",
    alt: "Magic: The Gathering Secrets of Strixhaven Play Booster box promotional graphic",
  },
  pokemonBattleStylesBoosterBox: {
    src: "/images/war-games-usa-default-title-pokemon-battle-styles-booster-box-swsh05-battle-styles-swsh05-36643313942753_1024x.jpg",
    alt: "Pokémon TCG Sword & Shield Battle Styles booster pack display box",
  },
} as const satisfies Record<string, TcgImage>;

/** Mixed-game strip for the Trading Cards overview page. */
export const TRADING_CARDS_MIX_IMAGES: readonly TcgImage[] = [
  TCG_IMAGES.pokemonSurgingSparksEtb,
  TCG_IMAGES.mtgBloomburrowCommanders,
  TCG_IMAGES.pokemon151UltraPremium,
  TCG_IMAGES.mtgTmntPlayBoosters,
  TCG_IMAGES.pokemonWhiteFlareEtb,
  TCG_IMAGES.mtgHobbitGiftBundle,
];

/** Recent and upcoming sealed products for the Preorders & New Releases page. */
export const PREORDER_SHOWCASE_IMAGES: readonly TcgImage[] = [
  TCG_IMAGES.mtgLorwynEclipsed,
  TCG_IMAGES.pokemonPerfectOrderBoosterBox,
  TCG_IMAGES.mtgHobbitCollectorBoosters,
  TCG_IMAGES.pokemonPerfectOrderEtbPromo,
  TCG_IMAGES.mtgHobbitPlayBoosters,
  TCG_IMAGES.pokemonAscendedHeroesEtbPromo,
  TCG_IMAGES.mtgAvatarCollectorBoosters,
  TCG_IMAGES.mtgRealityFractureCollectors,
  TCG_IMAGES.mtgSpiderManPlayBoosters,
  TCG_IMAGES.mtgMarvelPrerelease,
  TCG_IMAGES.mtgHobbitSceneBoxSmaug,
  TCG_IMAGES.mtgHobbitSceneBoxPlates,
];

/** Generic collection and premium-product imagery for Buy, Sell & Trade. */
export const BUY_SELL_TRADE_IMAGES: readonly TcgImage[] = [
  TCG_IMAGES.pokemon151UltraPremium,
  TCG_IMAGES.mtgHobbitGiftBundle,
  TCG_IMAGES.pokemonPrismaticSuperPremium,
];
