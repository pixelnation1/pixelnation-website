import { TCG_LAUNCH } from "@/lib/tcg/launch";
import type { FaqItem } from "@/lib/seo/types";

export const BUY_SELL_TRADE_METADATA = {
  title: "Buy, Sell & Trade Cards Emporia KS | PixelNation",
  description:
    "Sell or trade trading cards, collections, sealed products, video games, consoles, and gaming accessories in Emporia, Kansas. Request a collection review at PixelNation.",
  path: "/buy-sell-trade",
} as const;

export const BUY_SELL_ELIGIBLE_ITEMS = [
  "Trading-card singles",
  "Collections",
  "Sealed trading-card products",
  "Video games",
  "Game consoles",
  "Gaming accessories",
] as const;

export const BUY_SELL_POLICIES = [
  "Items are evaluated based on condition, authenticity, demand, and current market value.",
  "Offers may be available as cash or store credit.",
  "Store-credit offers may differ from cash offers.",
  "Identification may be required.",
  "PixelNation may decline any item or collection.",
  TCG_LAUNCH.buySellTradeDisclaimer,
] as const;

export const BUY_SELL_FAQS: readonly FaqItem[] = [
  {
    question: "How do I get an offer on my collection?",
    answer:
      "Request a collection review through our contact form or by phone. We evaluate eligible items and discuss options—we do not provide automatic online price quotes.",
    links: [{ label: "Contact PixelNation", href: "/contact" }],
  },
  {
    question: "Do you give cash or store credit?",
    answer:
      "Offers may be available as cash or store credit. Store-credit offers may differ from cash offers.",
  },
  {
    question: "What if you cannot take my items?",
    answer:
      "PixelNation may decline any item or collection based on condition, authenticity, demand, or other factors. We will communicate clearly after review.",
  },
];
