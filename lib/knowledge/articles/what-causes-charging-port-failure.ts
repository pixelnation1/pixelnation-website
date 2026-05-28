import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_04 } from "./shared";

export const articleWhatCausesChargingPortFailure: KnowledgeArticle = {
  slug: "what-causes-charging-port-failure",
  title: "What Causes Charging Port Failure? (Port, Cable, or Board IC)",
  description:
    "Charging port failure comes from worn connectors, debris, bad cables, or failed charging ICs. Learn how to tell port vs board issues before replacing parts.",
  excerpt:
    "A loose or dead charging port is not always the port itself—failed Tristar/PMIC circuits and liquid damage mimic port symptoms on phones and laptops.",
  category: "phone-repair",
  datePublished: PUBLISHED_2025_04,
  keywords: [
    "charging port failure",
    "phone won't charge",
    "USB-C port repair",
    "charging IC",
  ],
  conversationalQueries: [
    "why is my charging port not working",
    "phone charging port loose",
    "replaced charging port still won't charge",
  ],
  featuredAnswer:
    "Charging port failure is caused by physical wear and bent pins in the connector, lint or corrosion blocking contacts, damaged charging cables, or board-level charging IC faults that persist even after the port assembly is replaced.",
  readTimeMinutes: 6,
  relatedServicePaths: ["/phone-repair", "/board-repair"],
  relatedArticleSlugs: [
    "signs-your-phone-has-board-damage",
    "how-liquid-damage-corrodes-electronics",
    "what-is-microsoldering",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "How much does charging port repair cost?",
      answer:
        "Port-only repairs cost less than charging IC work. PixelNation quotes after confirming whether the flex/port or the board IC is at fault.",
    },
    {
      question: "Can wireless charging work if the port is broken?",
      answer:
        "Sometimes—if the wireless coil path is intact. Many phones still need a working board charge circuit; wireless is not a guaranteed workaround.",
    },
    {
      question: "Are off-brand chargers safe?",
      answer:
        "Poor-quality chargers can stress charging ICs and cause heat damage. Use certified cables and bricks when possible.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "Charging problems are among the top reasons phones and tablets come into repair. The fix is not always a new port—sometimes the port looks fine while the board refuses to draw current.",
    },
    {
      type: "highlightedAnswer",
      question: "What causes charging port failure?",
      answer:
        "Mechanical wear from daily plugging, debris in the socket, liquid corrosion, and failed charging ICs on the logic board—all produce similar symptoms with different repairs.",
    },
    {
      type: "heading",
      level: 2,
      id: "port-vs-board",
      text: "Port Failure vs Board IC Failure",
    },
    {
      type: "list",
      items: [
        "Port: loose connector, pins pushed back, only works at an angle",
        "Board: new port installed but still no charge, fake percentage, heat at port",
        "Cable: works on one device only—test with a known-good cable first",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "prevention",
      text: "Prevention Tips",
    },
    {
      type: "paragraph",
      text: "Avoid rocking the plug while inserted, keep pockets lint-free, and dry the device if exposed to moisture before charging. If charge stops after a drop, mention impact history during intake.",
    },
  ],
};
