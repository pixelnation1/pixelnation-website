import type { EnrichedFaqItem } from "@/lib/faq/types";

export const CONSOLE_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Why does my PS5 have no HDMI signal?",
    answer:
      "No video usually means a damaged HDMI port, a failed HDMI encoder chip, or a power fault on the video path. Cable stress and angled connectors are the most common physical causes.",
    links: [
      { label: "PS5 HDMI repair", href: "/services/ps5-hdmi-repair" },
      {
        label: "Why PS5 HDMI ports fail",
        href: "/knowledge/why-ps5-hdmi-ports-fail",
      },
    ],
  },
  {
    question: "How long does PS5 HDMI repair take?",
    answer:
      "Most PS5 HDMI port repairs take 3–7 business days after we confirm port and board condition. Encoder-level faults can take longer—we quote after diagnostics.",
    links: [{ label: "Book console repair", href: "/contact" }],
  },
  {
    question: "Can Xbox HDMI ports be repaired?",
    answer:
      "Yes. We replace damaged HDMI connectors and test video output on Xbox consoles. If the fault is on the board, we diagnose power and encoder paths before quoting.",
    links: [{ label: "Xbox repair", href: "/services/xbox-repair" }],
  },
  {
    question: "Do you fix console overheating?",
    answer:
      "Yes. We clean dust buildup, replace thermal paste where appropriate, and check fans and power circuits. Overheating left unchecked can damage HDMI and GPU-related components.",
    links: [
      {
        label: "Console overheating guide",
        href: "/knowledge/how-console-overheating-damages-components",
      },
    ],
  },
  {
    question: "Is mail-in console repair available?",
    answer:
      "Yes. Ship your PS5, Xbox, or other console with secure padding and your repair reference. We update you after intake and diagnostics at our Kansas bench.",
    links: [{ label: "Console repair overview", href: "/console-repair" }],
  },
  {
    question: "HDMI port vs encoder failure—how do you tell?",
    answer:
      "A damaged port often shows bent pins or a loose socket; encoder faults may persist with a good port and clean cable. We test the signal path before recommending port-only or board work.",
    links: [
      {
        label: "HDMI port vs encoder",
        href: "/knowledge/hdmi-port-vs-hdmi-encoder-failure",
      },
    ],
  },
];
