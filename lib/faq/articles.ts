import type { EnrichedFaqItem } from "@/lib/faq/types";
import {
  CONSOLE_REPAIR_FAQS,
  COMPUTER_REPAIR_FAQS,
  DATA_RECOVERY_FAQS,
  MICROSOLDERING_FAQS,
} from "@/lib/faq/categories";
import { mergeFaqs } from "@/lib/faq/utils";
import type { FaqItem } from "@/lib/seo/types";

const ARTICLE_SUPPLEMENTS: Record<string, readonly EnrichedFaqItem[]> = {
  "what-is-microsoldering": mergeFaqs(MICROSOLDERING_FAQS, [
    {
      question: "Is microsoldering the same as phone screen repair?",
      answer:
        "No. Screen repair swaps a module. Microsoldering fixes the logic board when power, charge, or signal paths fail underneath.",
      links: [{ label: "Board repair services", href: "/board-repair" }],
    },
  ]),
  "why-ps5-hdmi-ports-fail": mergeFaqs(CONSOLE_REPAIR_FAQS.slice(0, 4), [
    {
      question: "Can I prevent PS5 HDMI port failure?",
      answer:
        "Use a straight-in cable, avoid moving the console while plugged in, and never force the connector. Vertical stands that stress the port can accelerate solder fatigue.",
      links: [{ label: "PS5 HDMI repair", href: "/services/ps5-hdmi-repair" }],
    },
  ]),
  "common-causes-of-laptop-no-display": mergeFaqs(COMPUTER_REPAIR_FAQS.slice(0, 4), [
    {
      question: "Should I connect an external monitor first?",
      answer:
        "Yes—if external video works, the panel, cable, or backlight is likely at fault. If external is also black, suspect RAM, GPU, or board power.",
      links: [{ label: "Computer repair", href: "/computer-repair" }],
    },
  ]),
  "can-data-be-recovered-from-a-dead-phone": mergeFaqs(DATA_RECOVERY_FAQS.slice(0, 4), [
    {
      question: "Does a passcode block data recovery?",
      answer:
        "Modern encryption ties data to working hardware and your credentials. We cannot bypass manufacturer security; paths depend on device state after inspection.",
      links: [{ label: "Data recovery service", href: "/data-recovery" }],
    },
  ]),
};

export function getArticleFaqSupplement(slug: string): readonly EnrichedFaqItem[] {
  return ARTICLE_SUPPLEMENTS[slug] ?? [];
}

export function resolveArticleFaqs(
  slug: string,
  articleFaqs: readonly FaqItem[],
): EnrichedFaqItem[] {
  return mergeFaqs(articleFaqs, getArticleFaqSupplement(slug));
}
