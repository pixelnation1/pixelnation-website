import type { EnrichedFaqItem } from "@/lib/faq/types";

export const HDMI_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Can a broken HDMI port be repaired?",
    answer:
      "Yes, in most cases. We remove the damaged connector, repair lifted pads if needed, install a new port, and verify 4K output when the board supports it.",
    links: [{ label: "PS5 HDMI repair", href: "/services/ps5-hdmi-repair" }],
  },
  {
    question: "How do I know if I need a port or encoder repair?",
    answer:
      "Bent pins or a loose port housing point to the connector. A solid port with persistent no signal may indicate encoder or power rail faults—confirmed on the bench.",
    links: [
      {
        label: "Port vs encoder guide",
        href: "/knowledge/hdmi-port-vs-hdmi-encoder-failure",
      },
    ],
  },
  {
    question: "Do you repair HDMI on laptops and consoles?",
    answer:
      "Yes. We handle PlayStation, Xbox, and devices with surface-mount HDMI connectors, plus related board-level video paths.",
    links: [{ label: "Console repair", href: "/console-repair" }],
  },
  {
    question: "How long does HDMI port repair take?",
    answer:
      "Console HDMI jobs often take 3–7 business days after intake. Timing depends on pad condition and whether encoder work is required.",
  },
  {
    question: "Will HDMI repair fix intermittent 4K dropouts?",
    answer:
      "Often, yes—when the fault is a cracked solder joint or worn port. If the encoder or cable path is failing, we diagnose both before quoting.",
  },
];
