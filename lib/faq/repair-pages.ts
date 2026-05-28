import type { EnrichedFaqItem } from "@/lib/faq/types";
import {
  BOARD_REPAIR_FAQS,
  COMPUTER_REPAIR_FAQS,
  CONSOLE_REPAIR_FAQS,
  DATA_RECOVERY_FAQS,
  MICROSOLDERING_FAQS,
  PHONE_REPAIR_FAQS,
} from "@/lib/faq/categories";
import { mergeFaqs } from "@/lib/faq/utils";
import { MAIL_IN_REPAIR_FAQS } from "@/lib/faq/categories/mail-in";

export type RepairPageId =
  | "phone-repair"
  | "computer-repair"
  | "console-repair"
  | "data-recovery"
  | "board-repair"
  | "microsoldering"
  | "appliance-repair"
  | "repairs"
  | "contact"
  | "about";

const REPAIR_PAGE_MAP: Record<RepairPageId, readonly EnrichedFaqItem[]> = {
  "phone-repair": mergeFaqs(PHONE_REPAIR_FAQS, MAIL_IN_REPAIR_FAQS.slice(0, 2)),
  "computer-repair": mergeFaqs(COMPUTER_REPAIR_FAQS, MAIL_IN_REPAIR_FAQS.slice(0, 2)),
  "console-repair": mergeFaqs(CONSOLE_REPAIR_FAQS, MAIL_IN_REPAIR_FAQS.slice(0, 2)),
  "data-recovery": mergeFaqs(DATA_RECOVERY_FAQS, MAIL_IN_REPAIR_FAQS.slice(0, 2)),
  "board-repair": mergeFaqs(BOARD_REPAIR_FAQS, MICROSOLDERING_FAQS.slice(0, 3)),
  microsoldering: mergeFaqs(MICROSOLDERING_FAQS, BOARD_REPAIR_FAQS.slice(0, 3)),
  "appliance-repair": [
    {
      question: "What appliances do you repair?",
      answer:
        "We diagnose and repair eligible refrigerators, washers, dryers, ovens, and related units—power, control, and mechanical faults depending on model.",
    },
    {
      question: "How long does appliance repair take?",
      answer:
        "Timing depends on parts and fault complexity. We outline ETA after on-site or shop evaluation.",
      links: [{ label: "Contact us", href: "/contact" }],
    },
  ],
  repairs: mergeFaqs(
    PHONE_REPAIR_FAQS.slice(0, 2),
    CONSOLE_REPAIR_FAQS.slice(0, 2),
    DATA_RECOVERY_FAQS.slice(0, 2),
    MAIL_IN_REPAIR_FAQS.slice(0, 2),
  ),
  contact: MAIL_IN_REPAIR_FAQS,
  about: [],
};

export function getRepairPageFaqs(page: RepairPageId) {
  return REPAIR_PAGE_MAP[page] ?? [];
}
