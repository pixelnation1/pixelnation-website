import type { EnrichedFaqItem } from "@/lib/faq/types";

export const MAIL_IN_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Do you accept mail-in repairs nationwide?",
    answer:
      "Yes. Customers across the U.S. ship devices to our Emporia, Kansas repair bench with tracking and status updates through diagnostics and return shipping.",
    links: [{ label: "Start mail-in repair", href: "/contact" }],
  },
  {
    question: "How do I pack a device for mail-in repair?",
    answer:
      "Use rigid padding, remove loose accessories, and include your name, phone, and issue description. We provide intake steps when you start a repair online.",
  },
  {
    question: "How long does mail-in repair take?",
    answer:
      "Bench time depends on the fault—many jobs finish within a few business days after arrival. Shipping adds time each way; we confirm repair ETA after diagnostics.",
  },
  {
    question: "Will I get updates during mail-in repair?",
    answer:
      "Yes. We contact you after intake and before major work. You approve quotes before repair proceeds.",
    links: [{ label: "Call PixelNation", href: "tel:+16205910083" }],
  },
  {
    question: "Is mail-in repair insured?",
    answer:
      "Use tracked shipping and declare value with your carrier. Ask us about packing tips and recommended services when you open a repair request.",
  },
];
