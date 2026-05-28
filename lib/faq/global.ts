import type { EnrichedFaqItem } from "@/lib/faq/types";
import {
  BOARD_REPAIR_FAQS,
  CONSOLE_REPAIR_FAQS,
  DATA_RECOVERY_FAQS,
  MAIL_IN_REPAIR_FAQS,
  PHONE_REPAIR_FAQS,
  TRAINING_FAQS,
} from "@/lib/faq/categories";
import { mergeFaqs } from "@/lib/faq/utils";

/** Homepage FAQ — cross-category highlights */
export const HOME_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "How long do repairs take?",
    answer:
      "Many common repairs finish within a business day when parts are available. Board-level work, data recovery, and mail-in jobs may need more time—we outline timing before you approve.",
    links: [{ label: "All repair services", href: "/repairs" }],
  },
  {
    question: "Do you repair boards and HDMI ports?",
    answer:
      "Yes. PixelNation performs microsoldering, HDMI rework, charging IC repair, and power rail diagnostics on phones, consoles, and computers.",
    links: [{ label: "Board repair", href: "/board-repair" }],
  },
  {
    question: "Can you recover data from dead devices?",
    answer:
      "Often, yes. We assess storage and board condition, then recommend the safest path for phones, SSDs, and other media.",
    links: [{ label: "Data recovery", href: "/data-recovery" }],
  },
  {
    question: "Do you accept mail-in repairs?",
    answer:
      "Yes. Mail-in repair is available nationwide—start online, ship your device, and receive updates through diagnostics and return shipping.",
    links: [{ label: "Start mail-in repair", href: "/contact" }],
  },
  {
    question: "Do you offer repair training?",
    answer:
      "Yes. Hands-on courses cover practical diagnostics and board-level skills in Emporia, Kansas.",
    links: [{ label: "Training", href: "/training" }],
  },
  {
    question: "Do you repair appliances?",
    answer:
      "Yes. We troubleshoot power, control, and mechanical issues on eligible appliance units.",
    links: [{ label: "Appliance repair", href: "/appliance-repair" }],
  },
];

/** Knowledge Hub — education + service bridges */
export const KNOWLEDGE_HUB_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "What is the PixelNation Knowledge Hub?",
    answer:
      "It is our repair education library—guides on microsoldering, HDMI failure, liquid damage, and data recovery written by working technicians.",
    links: [{ label: "Browse categories", href: "/knowledge" }],
  },
  {
    question: "Are Knowledge Hub guides a substitute for professional repair?",
    answer:
      "No. Articles explain symptoms and options. Board-level, data recovery, and safety-critical work should be done after proper diagnostics.",
    links: [{ label: "Book a diagnostic", href: "/contact" }],
  },
  {
    question: "Do you cover microsoldering and HDMI topics?",
    answer:
      "Yes. Categories include microsoldering, board repair, HDMI repair, liquid damage, and training—aligned with services we offer in Emporia, KS.",
    links: [{ label: "Microsoldering guide", href: "/knowledge/what-is-microsoldering" }],
  },
  {
    question: "Can I request a topic for a future guide?",
    answer:
      "Yes. Contact us with your device issue—we add guides as customer questions and repair trends evolve.",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

/** Locations / services directory hubs */
export const LOCATIONS_HUB_FAQS: readonly EnrichedFaqItem[] = mergeFaqs(
  MAIL_IN_REPAIR_FAQS.slice(0, 3),
  PHONE_REPAIR_FAQS.slice(0, 2),
  CONSOLE_REPAIR_FAQS.slice(0, 2),
);

export const SERVICES_HUB_FAQS: readonly EnrichedFaqItem[] = mergeFaqs(
  PHONE_REPAIR_FAQS.slice(0, 2),
  CONSOLE_REPAIR_FAQS.slice(0, 2),
  DATA_RECOVERY_FAQS.slice(0, 2),
  BOARD_REPAIR_FAQS.slice(0, 2),
);
