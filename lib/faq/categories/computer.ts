import type { EnrichedFaqItem } from "@/lib/faq/types";

export const COMPUTER_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Why does my laptop turn on but show a black screen?",
    answer:
      "Fans spinning with no picture often point to RAM, a damaged display cable at the hinge, a failed panel, or motherboard power to the GPU. External monitor testing helps narrow it down.",
    links: [
      {
        label: "Laptop no display causes",
        href: "/knowledge/common-causes-of-laptop-no-display",
      },
    ],
  },
  {
    question: "How long does laptop repair take?",
    answer:
      "RAM reseats and simple hardware fixes may finish same-day. Display cable, storage, and board-level work depend on parts and fault—we set expectations after diagnostics.",
    links: [{ label: "Computer repair", href: "/computer-repair" }],
  },
  {
    question: "Do you repair MacBooks and Windows laptops?",
    answer:
      "Yes. We work on MacBooks, Windows laptops, and desktops—hardware, storage upgrades, no-boot diagnostics, and board repair when needed.",
  },
  {
    question: "Can you upgrade my laptop SSD?",
    answer:
      "Yes, when the model supports it. We clone or migrate data when possible and verify boot before return.",
    links: [{ label: "Data recovery", href: "/data-recovery" }],
  },
  {
    question: "Do you fix liquid spills on laptops?",
    answer:
      "Yes. Power off immediately and do not charge. We assess corrosion, clean affected areas, and repair power and display paths when recoverable.",
    links: [{ label: "Liquid damage repair", href: "/services/liquid-damage-repair" }],
  },
  {
    question: "Is mail-in laptop repair available?",
    answer:
      "Yes. Mail-in computer repair ships to our Emporia, KS bench with tracking and status updates through diagnostics and repair.",
    links: [{ label: "Start mail-in repair", href: "/contact" }],
  },
];
