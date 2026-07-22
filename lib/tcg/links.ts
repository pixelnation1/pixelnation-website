export const TRADING_CARDS_DROPDOWN_LINKS = [
  { label: "Trading Cards Overview", href: "/trading-cards" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Disney Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
] as const;

export const GAMING_EVENTS_DROPDOWN_LINKS = [
  { label: "Gaming Overview", href: "/gaming" },
  { label: "Events", href: "/events" },
] as const;

export const FOOTER_TCG_LINKS = [
  { label: "Trading Cards", href: "/trading-cards" },
  { label: "Pokémon", href: "/trading-cards/pokemon" },
  { label: "Magic: The Gathering", href: "/trading-cards/magic-the-gathering" },
  { label: "Yu-Gi-Oh!", href: "/trading-cards/yu-gi-oh" },
  { label: "Lorcana", href: "/trading-cards/lorcana" },
  { label: "One Piece", href: "/trading-cards/one-piece" },
  { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
  { label: "Gaming", href: "/gaming" },
  { label: "Events", href: "/events" },
] as const;

export const TRADING_CARDS_ACTIVE_PATHS = [
  "/trading-cards",
  "/buy-sell-trade",
] as const;

export const GAMING_EVENTS_ACTIVE_PATHS = ["/gaming", "/events"] as const;

export function isTradingCardsNavActive(pathname: string): boolean {
  if (pathname === "/buy-sell-trade") return true;
  return (
    pathname === "/trading-cards" || pathname.startsWith("/trading-cards/")
  );
}

export function isGamingEventsNavActive(pathname: string): boolean {
  return GAMING_EVENTS_ACTIVE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
