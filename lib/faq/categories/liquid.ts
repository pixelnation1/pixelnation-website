import type { EnrichedFaqItem } from "@/lib/faq/types";

export const LIQUID_DAMAGE_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "What should I do right after liquid gets on my device?",
    answer:
      "Power it off immediately and do not charge it. Dry the outside only—do not heat it in rice. Contact us quickly; corrosion spreads under chips over hours and days.",
    links: [{ label: "How liquid damages boards", href: "/knowledge/how-liquid-damage-corrodes-electronics" }],
  },
  {
    question: "Does rice fix water damage?",
    answer:
      "No. Rice does not remove corrosion and can leave debris in ports. Professional cleaning and board inspection are what stop ongoing damage.",
  },
  {
    question: "Can a water-damaged phone be saved?",
    answer:
      "Sometimes. Success depends on liquid type, time powered on, and corrosion depth. Early intake and proper cleaning improve outcomes.",
    links: [{ label: "Phone repair", href: "/phone-repair" }],
  },
  {
    question: "Do you clean corrosion under the microscope?",
    answer:
      "Yes. We remove shields when needed, clean affected areas, and repair power and data paths before reassembly.",
    links: [{ label: "Board repair", href: "/board-repair" }],
  },
  {
    question: "Can you recover data after liquid damage?",
    answer:
      "Often, if storage was not shorted for long. We prioritize safe power-up or extraction paths after corrosion control.",
    links: [{ label: "Data recovery", href: "/data-recovery" }],
  },
];
