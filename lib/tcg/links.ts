export const TRADING_CARDS_DROPDOWN_LINKS = [
  { label: "Trading Cards Overview", href: "/trading-cards" },
  { label: "What We Carry", href: "/what-we-carry" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Learn to Play", href: "/learn-to-play" },
  { label: "Commander Nights", href: "/commander-nights" },
  { label: "Trading Card Philosophy", href: "/trading-card-philosophy" },
  { label: "Preorders & New Releases", href: "/preorders-new-releases" },
  { label: "Preorders", href: "/preorders" },
  { label: "New Releases", href: "/new-releases" },
  { label: "Trading Card Store Emporia", href: "/trading-card-store-emporia-ks" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
] as const;

export const GAMING_EVENTS_DROPDOWN_LINKS = [
  { label: "Gaming Overview", href: "/gaming" },
  { label: "Gaming Community", href: "/gaming-community" },
  { label: "Events", href: "/events" },
  { label: "Weekly Events", href: "/weekly-events" },
  { label: "Weekly Schedule", href: "/events#weekly-schedule" },
  { label: "Family Gaming", href: "/family-gaming" },
  { label: "What to Expect", href: "/what-to-expect" },
  { label: "Gaming Lounge", href: "/gaming-lounge" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Learn to Play", href: "/learn-to-play" },
] as const;

export const FOOTER_TCG_LINKS = [
  { label: "Trading Cards", href: "/trading-cards" },
  { label: "What We Carry", href: "/what-we-carry" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Gaming Community", href: "/gaming-community" },
  { label: "Learn to Play", href: "/learn-to-play" },
  { label: "Commander Nights", href: "/commander-nights" },
  { label: "Weekly Events", href: "/weekly-events" },
  { label: "Family Gaming", href: "/family-gaming" },
  { label: "What to Expect", href: "/what-to-expect" },
  { label: "Trading Card Philosophy", href: "/trading-card-philosophy" },
  { label: "Gaming", href: "/gaming" },
  { label: "Events", href: "/events" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
  { label: "Preorders & New Releases", href: "/preorders-new-releases" },
  { label: "Preorders", href: "/preorders" },
  { label: "New Releases", href: "/new-releases" },
  { label: "Trading Card Store Emporia", href: "/trading-card-store-emporia-ks" },
  { label: "Sell Pokémon Cards", href: "/sell-pokemon-cards" },
  { label: "Sell Magic Cards", href: "/sell-magic-cards" },
  { label: "Sell Video Games", href: "/sell-video-games" },
  { label: "Console Trade-Ins", href: "/console-trade-ins" },
  { label: "Gaming Lounge", href: "/gaming-lounge" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Game Console Repair Emporia", href: "/game-console-repair-emporia-ks" },
] as const;

export const TRADING_CARDS_ACTIVE_PATHS = [
  "/trading-cards",
  "/buy-sell-trade",
  "/what-we-carry",
  "/preorders-new-releases",
  "/preorders",
  "/new-releases",
  "/learn-to-play",
  "/commander-nights",
  "/trading-card-philosophy",
  "/trading-card-store-emporia-ks",
  "/pokemon-cards-emporia-ks",
  "/magic-the-gathering-emporia-ks",
  "/yu-gi-oh-cards-emporia-ks",
  "/disney-lorcana-emporia-ks",
  "/one-piece-card-game-emporia-ks",
  "/sell-pokemon-cards",
  "/sell-magic-cards",
] as const;

export const GAMING_EVENTS_ACTIVE_PATHS = [
  "/gaming",
  "/events",
  "/gaming-community",
  "/weekly-events",
  "/family-gaming",
  "/what-to-expect",
  "/gaming-lounge",
  "/birthday-parties",
] as const;

export function isTradingCardsNavActive(pathname: string): boolean {
  if (TRADING_CARDS_ACTIVE_PATHS.some((path) => pathname === path)) {
    return true;
  }
  return (
    pathname === "/trading-cards" || pathname.startsWith("/trading-cards/")
  );
}

export function isGamingEventsNavActive(pathname: string): boolean {
  return GAMING_EVENTS_ACTIVE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
