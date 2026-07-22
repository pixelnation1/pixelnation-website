export const TRADING_CARDS_DROPDOWN_LINKS = [
  { label: "Trading Cards Overview", href: "/trading-cards" },
  { label: "What We Carry", href: "/what-we-carry" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Preorders & New Releases", href: "/preorders-new-releases" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
] as const;

export const GAMING_EVENTS_DROPDOWN_LINKS = [
  { label: "Gaming Overview", href: "/gaming" },
  { label: "Events", href: "/events" },
  { label: "Weekly Schedule", href: "/events#weekly-schedule" },
] as const;

export const FOOTER_TCG_LINKS = [
  { label: "Trading Cards", href: "/trading-cards" },
  { label: "What We Carry", href: "/what-we-carry" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Gaming", href: "/gaming" },
  { label: "Events", href: "/events" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
  { label: "Preorders & New Releases", href: "/preorders-new-releases" },
] as const;

export const TRADING_CARDS_ACTIVE_PATHS = [
  "/trading-cards",
  "/buy-sell-trade",
  "/what-we-carry",
  "/preorders-new-releases",
] as const;

export const GAMING_EVENTS_ACTIVE_PATHS = ["/gaming", "/events"] as const;

export function isTradingCardsNavActive(pathname: string): boolean {
  if (
    pathname === "/buy-sell-trade" ||
    pathname === "/what-we-carry" ||
    pathname === "/preorders-new-releases"
  ) {
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
