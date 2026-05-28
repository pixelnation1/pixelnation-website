import type { EnrichedFaqItem } from "@/lib/faq/types";

export const PHONE_REPAIR_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "How long does phone repair take?",
    answer:
      "Most screen and battery repairs finish the same business day when parts are in stock. Board-level charging faults, liquid damage, and data recovery need extra test time—we confirm timing after diagnostics.",
    links: [{ label: "Start a phone repair", href: "/contact" }],
  },
  {
    question: "Do you repair iPhone and Samsung phones?",
    answer:
      "Yes. We service iPhone, Samsung Galaxy, Google Pixel, Motorola, OnePlus, and many other models. Tell us your model for parts availability and pricing.",
    links: [{ label: "iPhone repair service", href: "/services/iphone-repair" }],
  },
  {
    question: "Can you fix a phone that will not charge?",
    answer:
      "Usually, yes. We test the port, cable path, battery, and charging IC on the board. Many no-charge faults are a port or board-level fix—not a full replacement phone.",
    links: [
      { label: "Charging port repair", href: "/services/charging-port-repair" },
      { label: "Board repair", href: "/board-repair" },
    ],
  },
  {
    question: "Do you repair water-damaged phones?",
    answer:
      "Yes. Speed matters—power off the device and avoid charging. We inspect corrosion, clean under magnification, and repair power paths when the board is recoverable.",
    links: [{ label: "Liquid damage repair", href: "/services/liquid-damage-repair" }],
  },
  {
    question: "Can you recover photos from a dead phone?",
    answer:
      "Often, yes—if storage is intact. We may restore boot through board repair or use a recovery-focused workflow. Encryption and severe board damage can limit options; we explain after inspection.",
    links: [
      { label: "Data recovery", href: "/data-recovery" },
      {
        label: "Can data be recovered from a dead phone?",
        href: "/knowledge/can-data-be-recovered-from-a-dead-phone",
      },
    ],
  },
  {
    question: "Do you offer mail-in phone repair?",
    answer:
      "Yes. Mail-in repair is available nationwide. Pack securely, include your contact details, and start a repair request online for intake instructions.",
    links: [{ label: "Contact / mail-in intake", href: "/contact" }],
  },
  {
    question: "Is board-level phone repair available in Emporia?",
    answer:
      "Yes. PixelNation performs microsoldering for charging ICs, torn pads, no-power faults, and connector damage when part swaps alone are not enough.",
    links: [
      { label: "Microsoldering", href: "/microsoldering-emporia-ks" },
      { label: "What is microsoldering?", href: "/knowledge/what-is-microsoldering" },
    ],
  },
  {
    question: "Do you warranty phone repairs?",
    answer:
      "Many repairs include warranty on parts and workmanship. Coverage depends on device condition and repair type—we explain terms before you approve work.",
  },
];
