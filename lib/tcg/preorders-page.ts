export const PREORDERS_METADATA = {
  title: "Preorders & New Releases | Trading Cards Emporia KS | PixelNation",
  description:
    "Preorders and new trading-card releases in Emporia, Kansas. PixelNation plans preorders for select Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana, and One Piece releases—contact us for availability.",
  path: "/preorders-new-releases",
} as const;

export const PREORDER_GAME_SECTIONS = [
  {
    game: "Pokémon",
    href: "/trading-cards/pokemon",
    note: "Pokémon set releases are frequent—elite trainer boxes and booster products are common preorder requests.",
  },
  {
    game: "Magic: The Gathering",
    href: "/trading-cards/magic-the-gathering",
    note: "Magic releases include play boosters, collector boosters, commander decks, and bundles across each set.",
  },
  {
    game: "Yu-Gi-Oh!",
    href: "/trading-cards/yu-gi-oh",
    note: "Yu-Gi-Oh! core sets, structure decks, and tins release throughout the year.",
  },
  {
    game: "Disney Lorcana",
    href: "/trading-cards/lorcana",
    note: "Lorcana sets bring booster products, starter decks, gift sets, and troves.",
  },
  {
    game: "One Piece Card Game",
    href: "/trading-cards/one-piece",
    note: "One Piece boosters, starter decks, and special collections release regularly.",
  },
] as const;
