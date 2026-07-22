import type { FaqItem } from "@/lib/seo/types";

/**
 * Shared Trading Cards & Gaming FAQ — only factually supportable answers.
 * Uses "planned", "coming soon", or "contact us" where details are not final.
 */
export const TCG_GENERAL_FAQS: readonly FaqItem[] = [
  {
    question: "What trading-card games does PixelNation carry?",
    answer:
      "PixelNation supports Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, and the One Piece Card Game with sealed products, singles interest, and accessories. Availability varies as inventory expands.",
    links: [{ label: "What We Carry", href: "/what-we-carry" }],
  },
  {
    question: "Do you sell individual cards?",
    answer:
      "Singles are part of our expanding inventory. Selection varies by game—contact us or visit to ask about specific cards.",
  },
  {
    question: "Do you buy card collections?",
    answer:
      "Yes—we plan to purchase eligible collections, singles, and sealed products. Items are evaluated in person for condition, authenticity, demand, and market value.",
    links: [{ label: "Buy, Sell & Trade", href: "/buy-sell-trade" }],
  },
  {
    question: "Do you offer store credit?",
    answer:
      "Offers may be available as cash, store credit, or trade value. Store-credit offers may differ from cash offers.",
  },
  {
    question: "Will PixelNation host tournaments?",
    answer:
      "Community tournaments and organized play are planned for the expanded location. Schedules will be published when real dates are confirmed.",
    links: [{ label: "Events", href: "/events" }],
  },
  {
    question: "Are beginners welcome?",
    answer:
      "Absolutely. Learn-to-play sessions, beginner-friendly events, and staff guidance are central to our community plans—no experience required.",
  },
  {
    question: "Do I need to bring my own cards?",
    answer:
      "For casual play, bringing your own deck is typical, but learn-to-play sessions are planned so newcomers can try games without owning cards. Starter products are also available to purchase.",
  },
  {
    question: "Will you offer preorders?",
    answer:
      "PixelNation plans to offer preorders for select releases. Availability depends on distributor allocation, and some releases may have quantity limits or require deposits.",
    links: [{ label: "Preorders & New Releases", href: "/preorders-new-releases" }],
  },
  {
    question: "Can I request a specific product?",
    answer:
      "Yes—contact PixelNation with what you are looking for and we will check availability or ordering options.",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    question: "Will there be gaming tables?",
    answer:
      "Yes—dedicated play space with tables and seating is planned for the larger location. Capacity details will be shared when confirmed.",
    links: [{ label: "Gaming", href: "/gaming" }],
  },
  {
    question: "Will there be console gaming?",
    answer:
      "Console gaming is a planned feature of the expanded location, including casual multiplayer and community video game nights. Details are coming soon.",
  },
  {
    question: "Can children attend events?",
    answer:
      "Family-friendly and age-appropriate events are part of our plans, with space for spectators and families. Specific age guidance will be listed per event.",
  },
  {
    question: "How do I learn about upcoming events?",
    answer:
      "Check the events page or contact PixelNation. Schedules are published only when real dates are confirmed.",
    links: [{ label: "Events", href: "/events" }],
  },
  {
    question: "Do you grade cards?",
    answer:
      "PixelNation does not grade cards in-house. Contact us if you have questions about a card's condition or value.",
  },
  {
    question: "Do you submit cards for grading?",
    answer:
      "Grading submission services are not currently offered. If that changes with the expanded location, it will be announced.",
  },
  {
    question: "Do you sell card-protection supplies?",
    answer:
      "Yes—sleeves, top loaders, deck boxes, binders, playmats, and storage products are part of our accessory selection as inventory expands.",
  },
];
