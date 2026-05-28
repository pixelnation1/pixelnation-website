import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_03 } from "./shared";

export const articleHowLiquidDamageCorrodes: KnowledgeArticle = {
  slug: "how-liquid-damage-corrodes-electronics",
  title: "How Liquid Damage Corrodes Electronics (And What to Do in the First Hour)",
  description:
    "Liquid bridges circuits and corrosion spreads under ICs. Learn why rice does not work, what immediate steps help, and how professional cleaning saves devices.",
  excerpt:
    "Water and drinks conduct electricity and leave minerals that corrode copper traces—damage continues even after the device dries unless properly cleaned.",
  category: "liquid-damage",
  datePublished: PUBLISHED_2025_03,
  popular: true,
  keywords: [
    "liquid damage",
    "water damaged phone",
    "electronics corrosion",
    "spilled drink on laptop",
  ],
  conversationalQueries: [
    "what does water do to a phone motherboard",
    "how fast does liquid damage spread",
    "does rice fix water damage",
  ],
  featuredAnswer:
    "Liquid damage corrodes electronics because water (and especially sugary or salty drinks) conducts current across pins that should be isolated, then leaves mineral deposits that eat copper traces and vias—corrosion can spread for days under chips even after the outside feels dry.",
  readTimeMinutes: 6,
  relatedServicePaths: ["/phone-repair", "/computer-repair", "/board-repair"],
  relatedArticleSlugs: [
    "signs-your-phone-has-board-damage",
    "what-causes-charging-port-failure",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "Does putting my phone in rice help?",
      answer:
        "Rice does not remove corrosion and may leave dust in ports. Power off, do not charge, and seek professional ultrasonic or board cleaning—speed matters more than desiccants.",
    },
    {
      question: "Can corrosion be reversed?",
      answer:
        "Early cleaning stops spread. Advanced corrosion may require trace repair or IC replacement. Waiting weeks usually worsens outcomes.",
    },
    {
      question: "Is water damage worse than soda or coffee?",
      answer:
        "Sugary and acidic liquids leave more residue and are generally more aggressive than clean water—still treat all spills urgently.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "Spilling liquid on a phone or laptop starts a clock. What happens in the first hour often determines whether the device is a quick clean or a board-level rebuild.",
    },
    {
      type: "highlightedAnswer",
      question: "How does liquid damage corrode electronics?",
      answer:
        "Liquid creates short circuits between powered traces, then as it evaporates it deposits minerals that chemically attack copper. Corrosion creeps under BGAs and charging ICs where you cannot see it without a microscope.",
    },
    {
      type: "heading",
      level: 2,
      id: "first-hour",
      text: "What to Do in the First Hour",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Power off immediately—do not charge",
        "Disconnect battery if safe and you know how",
        "Do not heat with a hair dryer (drives liquid deeper)",
        "Bring the device for cleaning as soon as possible",
      ],
    },
    {
      type: "pullQuote",
      text: "Corrosion does not stop when the screen goes black—it accelerates while current can still flow through wet traces.",
    },
    {
      type: "heading",
      level: 2,
      id: "professional-cleaning",
      text: "Professional Cleaning vs DIY",
    },
    {
      type: "paragraph",
      text: "Shops with board experience disassemble to the board, clean under shields, measure shorts, and replace corroded components. Consumer 'water damage kits' rarely reach failed areas under ICs.",
    },
    {
      type: "youtube",
      videoId: "dQw4w9WgXcQ",
      title: "Understanding liquid damage on logic boards",
    },
  ],
};
