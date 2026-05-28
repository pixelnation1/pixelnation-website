import type { EnrichedFaqItem } from "@/lib/faq/types";

export const BOARD_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "What is board-level repair?",
    answer:
      "Board-level repair fixes faults on the main logic board—charging circuits, HDMI ports, power rails, and shorted components—using diagnostics and microsoldering.",
    links: [{ label: "Microsoldering overview", href: "/microsoldering-emporia-ks" }],
  },
  {
    question: "Can you fix a phone other shops declared dead?",
    answer:
      "Often, yes—when the fault is a power path, charging IC, or connector rather than destroyed storage. We inspect under magnification before quoting.",
    links: [
      {
        label: "Signs of board damage",
        href: "/knowledge/signs-your-phone-has-board-damage",
      },
    ],
  },
  {
    question: "Do you repair HDMI and charging ports at the board?",
    answer:
      "Yes. We replace connectors, repair lifted pads, and verify signal and power after rework.",
    links: [
      { label: "HDMI repair", href: "/services/hdmi-repair" },
      { label: "Charging port repair", href: "/services/charging-port-repair" },
    ],
  },
  {
    question: "How do you diagnose board faults?",
    answer:
      "We reproduce symptoms, measure power rails, and inspect for corrosion or physical damage before recommending IC, trace, or connector work.",
    links: [
      {
        label: "Diagnostic repair process",
        href: "/knowledge/what-happens-during-a-diagnostic-repair",
      },
    ],
  },
  {
    question: "Is there a warranty on board repair?",
    answer:
      "Many board repairs include warranty on workmanship. Coverage depends on prior damage and repair scope—we explain terms before approval.",
  },
];
