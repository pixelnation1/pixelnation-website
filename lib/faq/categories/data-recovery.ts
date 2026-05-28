import type { EnrichedFaqItem } from "@/lib/faq/types";

export const DATA_RECOVERY_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Can you recover data from a phone that will not turn on?",
    answer:
      "Often, yes—if storage is healthy. We may repair power paths to boot the phone or use board-level methods when appropriate. Severe damage or encryption limits can block access.",
    links: [
      {
        label: "Dead phone data recovery guide",
        href: "/knowledge/can-data-be-recovered-from-a-dead-phone",
      },
    ],
  },
  {
    question: "How much does data recovery cost?",
    answer:
      "Cost depends on device type, damage, and whether board repair is required first. We quote after inspection—no work proceeds without your approval.",
    links: [{ label: "Request data recovery", href: "/contact" }],
  },
  {
    question: "Do you recover files from SSDs and hard drives?",
    answer:
      "Yes. We assess drive health, connection, and failure mode, then recommend logical recovery, repair, or specialist handoff when needed.",
  },
  {
    question: "Will data recovery fix my device too?",
    answer:
      "Sometimes. Recovery-focused board repair may restore boot so we can extract files normally. Other jobs prioritize data only—we explain options upfront.",
    links: [{ label: "Board repair", href: "/board-repair" }],
  },
  {
    question: "How long does data recovery take?",
    answer:
      "Simple cases may finish within a few business days. Corrosion, encryption, or repeated power attempts can extend timelines—we update you after the first evaluation.",
  },
  {
    question: "Can water-damaged phones still yield photos?",
    answer:
      "Often, if storage was not shorted for long. Quick power-off helps. We clean corrosion and repair rails before attempting extraction.",
    links: [{ label: "Liquid damage repair", href: "/services/liquid-damage-repair" }],
  },
];
