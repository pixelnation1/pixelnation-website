import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_02 } from "./shared";

export const articleSignsPhoneBoardDamage: KnowledgeArticle = {
  slug: "signs-your-phone-has-board-damage",
  title: "7 Signs Your Phone Has Board Damage (Not Just a Bad Battery)",
  description:
    "Board damage causes no power, fake charging, boot loops, and no service. Learn the signs that mean you need board-level repair—not another battery or screen.",
  excerpt:
    "When a new battery or screen does not fix your phone, the logic board may have power rail damage, a failed charging IC, or corrosion from liquid.",
  category: "board-repair",
  datePublished: PUBLISHED_2025_02,
  keywords: [
    "phone board damage",
    "logic board repair",
    "phone won't turn on",
    "charging IC failure",
    "boot loop",
  ],
  conversationalQueries: [
    "how do I know if my phone has board damage",
    "phone won't charge after new port",
    "is my iPhone board dead",
  ],
  featuredAnswer:
    "Signs of phone board damage include: no power after a drop or liquid exposure, charging stuck at a percentage, boot loops after a repair, no backlight with a good screen, and heat near the charging port when plugged in.",
  readTimeMinutes: 6,
  featured: true,
  popular: true,
  relatedServicePaths: ["/phone-repair", "/board-repair", "/data-recovery"],
  relatedArticleSlugs: [
    "what-is-microsoldering",
    "what-causes-charging-port-failure",
    "can-data-be-recovered-from-a-dead-phone",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "Can board damage be fixed without replacing the phone?",
      answer:
        "Often yes. Charging ICs, PMIC paths, and display circuits are commonly repaired with microsoldering. Severe pad damage or multiple failed layers may limit repair—diagnostics determine feasibility.",
    },
    {
      question: "Is board damage always from liquid?",
      answer:
        "No. Drops, cheap chargers, prior bad repairs, and age-related solder fatigue also cause board faults. Liquid accelerates corrosion but is not the only cause.",
    },
    {
      question: "Will Apple or carrier insurance cover board repair?",
      answer:
        "Coverage varies. Out-of-warranty board repair at an independent shop is often still cheaper than carrier replacement programs for older devices.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "Phones are built in layers: screen, battery, charging port assembly, then the logic board where power and data actually route. When symptoms persist after swapping visible parts, the board is the next place to look.",
    },
    {
      type: "highlightedAnswer",
      question: "What are the main signs of phone board damage?",
      answer:
        "Dead phone after drop or liquid, fake charging (percentage rises but device won't boot), boot loop, no image with a tested-good display, rapid battery drain with warmth at the port, and no cellular after a board-related repair.",
    },
    {
      type: "heading",
      level: 2,
      id: "seven-signs",
      text: "Seven Signs to Watch For",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Device completely dead—no vibration, no logo, no recovery mode",
        "Charging icon appears but percentage never increases, or increases while off only",
        "Boot loop: Apple/Android logo then restart repeatedly",
        "Display stays black with a known-good screen assembly",
        "Overheating concentrated at the bottom edge (charging circuit area)",
        "Face ID, touch, or audio fail together after impact (flex or board damage)",
        "Prior shop replaced battery/port but problem returned within days",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "board-vs-battery",
      text: "Board Damage vs Bad Battery",
    },
    {
      type: "paragraph",
      text: "A failing battery usually still boots the phone and may swell. Board damage often kills boot entirely or causes erratic behavior that does not match battery wear patterns. Technicians measure charge current and rail voltages to tell the difference in minutes.",
    },
    {
      type: "heading",
      level: 2,
      id: "next-steps",
      text: "What to Do Next",
    },
    {
      type: "paragraph",
      text: "Stop cycling random part replacements. Book a diagnostic at PixelNation—we trace power rails, document findings, and quote board repair or data recovery if the device cannot be fully restored.",
    },
  ],
};
