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
  "Full collections",
  "Sealed trading-card products",
  "Video games",
  "Consoles",
  "Controllers",
  "Gaming accessories",
  "Retro gaming products",
] as const;

/** Step-by-step review process shown on /buy-sell-trade. */
export const BUY_SELL_PROCESS = [
  {
    title: "Contact or visit",
    text: "Reach out through our contact form, call, or visit PixelNation with your items.",
  },
  {
    title: "Staff review",
    text: "Our staff looks over the items you bring in or describe.",
  },
  {
    title: "Condition & authenticity check",
    text: "Condition, completeness, and authenticity are verified in person.",
  },
  {
    title: "Market evaluation",
    text: "Current demand and market value are considered for each item or collection.",
  },
  {
    title: "Offer",
    text: "PixelNation provides an offer—as cash, store credit, or trade value.",
  },
  {
    title: "Your decision",
    text: "You may accept or decline. There is no obligation either way.",
  },
] as const;

export const BUY_SELL_OFFER_TYPES = [
  {
    title: "Cash",
    text: "A direct cash offer for eligible items after in-person review.",
  },
  {
    title: "Store credit",
    text: "Credit toward products at PixelNation. Store-credit offers may differ from cash offers.",
  },
  {
    title: "Trade value",
    text: "Apply your items' value toward a trade for other products in stock.",
  },
] as const;

export const BUY_SELL_POLICIES = [
  "Online estimates are not final offers.",
  "Final value depends on condition, authenticity, demand, completeness, and in-person inspection.",
  "Items are evaluated based on condition, authenticity, demand, and current market value.",
  "Offers may be available as cash, store credit, or trade value.",
  "Store-credit offers may differ from cash offers.",
  "Identification may be required.",
  "PixelNation may decline any item or collection.",
  "Counterfeit, stolen, altered, or suspicious items will not be accepted.",
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
