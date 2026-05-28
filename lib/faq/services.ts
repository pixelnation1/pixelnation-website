import type { ServiceSlug } from "@/lib/locations/services";
import type { EnrichedFaqItem } from "@/lib/faq/types";
import {
  BOARD_REPAIR_FAQS,
  COMPUTER_REPAIR_FAQS,
  CONSOLE_REPAIR_FAQS,
  DATA_RECOVERY_FAQS,
  HDMI_REPAIR_FAQS,
  LIQUID_DAMAGE_FAQS,
  MICROSOLDERING_FAQS,
  PHONE_REPAIR_FAQS,
} from "@/lib/faq/categories";
import { mergeFaqs } from "@/lib/faq/utils";

const IPHONE_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Do you use quality parts for iPhone screen replacement?",
    answer:
      "Yes. We match parts to your model and quality goals, then calibrate and test touch, True Tone where applicable, and front sensors before return.",
    links: [{ label: "Phone repair in Emporia", href: "/phone-repair" }],
  },
  {
    question: "Can you fix iPhone Face ID or camera issues?",
    answer:
      "Many camera and speaker faults are modular. Face ID depends on hardware pairing—feasibility is confirmed during diagnostics.",
  },
];

const PS5_HDMI_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "How much does PS5 HDMI repair cost?",
    answer:
      "Price depends on port condition, lifted pads, and whether the HDMI encoder needs work. We quote after inspection—port-only repairs are usually less than encoder-level jobs.",
    links: [
      {
        label: "Why PS5 HDMI ports fail",
        href: "/knowledge/why-ps5-hdmi-ports-fail",
      },
    ],
  },
  {
    question: "Will Sony warranty cover a broken PS5 HDMI port?",
    answer:
      "Physical damage and cable stress are usually not covered. Manufacturer warranty may apply only for defects without impact evidence—check your terms.",
  },
];

const CHARGING_PORT_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Why do phone charging ports stop working?",
    answer:
      "Lint, worn pins, and board-level charging IC faults are common. We test the port, flex, and power path before quoting a port or microsoldering repair.",
    links: [
      {
        label: "Charging port failure guide",
        href: "/knowledge/what-causes-charging-port-failure",
      },
    ],
  },
];

const SERVICE_FAQ_MAP: Record<ServiceSlug, readonly EnrichedFaqItem[]> = {
  "iphone-repair": mergeFaqs(PHONE_REPAIR_FAQS, IPHONE_FAQS),
  "ps5-hdmi-repair": mergeFaqs(CONSOLE_REPAIR_FAQS, HDMI_REPAIR_FAQS, PS5_HDMI_FAQS),
  "xbox-repair": mergeFaqs(CONSOLE_REPAIR_FAQS, HDMI_REPAIR_FAQS),
  "computer-repair": COMPUTER_REPAIR_FAQS,
  "data-recovery": DATA_RECOVERY_FAQS,
  microsoldering: mergeFaqs(MICROSOLDERING_FAQS, BOARD_REPAIR_FAQS),
  "board-repair": BOARD_REPAIR_FAQS,
  "liquid-damage-repair": LIQUID_DAMAGE_FAQS,
  "charging-port-repair": mergeFaqs(PHONE_REPAIR_FAQS, CHARGING_PORT_FAQS),
  "hdmi-repair": mergeFaqs(HDMI_REPAIR_FAQS, CONSOLE_REPAIR_FAQS),
};

export function getServiceFaqs(slug: ServiceSlug) {
  return SERVICE_FAQ_MAP[slug];
}
