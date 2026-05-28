import type { EnrichedFaqItem } from "@/lib/faq/types";

export const MICROSOLDERING_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "What is microsoldering?",
    answer:
      "Microsoldering is precision repair of tiny components on a logic board—ICs, connectors, and copper traces—using microscopes, hot air, and fine-tip soldering when screens and batteries are not enough.",
    links: [{ label: "Full microsoldering guide", href: "/knowledge/what-is-microsoldering" }],
  },
  {
    question: "When do I need microsoldering instead of a screen swap?",
    answer:
      "Choose microsoldering when the device has no power, no charge, no video, or intermittent faults after liquid damage—symptoms that point to the board, not a visible part.",
    links: [{ label: "Board repair services", href: "/board-repair" }],
  },
  {
    question: "Do you microsolder phones and consoles?",
    answer:
      "Yes. Common jobs include charging ICs, HDMI ports, PMIC paths, and trace repair on phones, laptops, and game consoles.",
  },
  {
    question: "How long does microsoldering repair take?",
    answer:
      "Simple connector work may finish in a few business days. Multi-IC or corrosion jobs need more bench time—we confirm after under-microscope inspection.",
  },
  {
    question: "Is microsoldering worth it versus replacing the device?",
    answer:
      "We compare repair cost, data value, and device condition after diagnostics. For many flagship phones and consoles, board repair is far less than replacement.",
  },
];
