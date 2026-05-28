import type { CityData } from "@/lib/locations/cities";
import type { ServiceData, ServiceSlug } from "@/lib/locations/services";
import type { FaqItem } from "@/lib/seo/types";
import { getArticleFaqSupplement, resolveArticleFaqs } from "@/lib/faq/articles";
import { getCategoryFaqs } from "@/lib/faq/categories";
import type { FaqCategoryId } from "@/lib/faq/types";
import { getRepairPageFaqs, type RepairPageId } from "@/lib/faq/repair-pages";
import { getServiceFaqs } from "@/lib/faq/services";
import { mergeFaqs, takeFaqs, toSchemaFaqs } from "@/lib/faq/utils";
import { HOME_FAQS, KNOWLEDGE_HUB_FAQS, LOCATIONS_HUB_FAQS, SERVICES_HUB_FAQS } from "@/lib/faq/global";
import { TRAINING_FAQS } from "@/lib/faq/categories/training";
import { MAIL_IN_REPAIR_FAQS } from "@/lib/faq/categories/mail-in";
import { SITE } from "@/lib/site";

export {
  HOME_FAQS,
  KNOWLEDGE_HUB_FAQS,
  LOCATIONS_HUB_FAQS,
  SERVICES_HUB_FAQS,
  getArticleFaqSupplement,
  resolveArticleFaqs,
  getCategoryFaqs,
  getRepairPageFaqs,
  getServiceFaqs,
  mergeFaqs,
  takeFaqs,
  toSchemaFaqs,
};

export function getHomeFaqs(limit = 8) {
  return takeFaqs(HOME_FAQS, limit);
}

export function getKnowledgeHubFaqs(limit = 8) {
  return takeFaqs(KNOWLEDGE_HUB_FAQS, limit);
}

export function getTrainingFaqs(limit = 8) {
  return takeFaqs(TRAINING_FAQS, limit);
}

/** Localized city hub FAQs */
export function resolveCityFaqs(city: CityData, limit = 8): FaqItem[] {
  const label = `${city.name}, ${city.stateAbbr}`;
  const mailIn = city.isPrimaryLocation
    ? `Yes. Our shop is in ${SITE.address.region}. Walk in during business hours or start a repair online.`
    : `Yes. Customers in ${label} ship devices to our Emporia, KS bench with tracking and clear intake notes.`;

  const localized: FaqItem[] = [
    {
      question: `Does PixelNation serve ${label}?`,
      answer: `Yes. PixelNation supports ${label} with phone, computer, console, data recovery, and board-level repair—${city.isPrimaryLocation ? "at our local shop" : "via mail-in to Kansas"}.`,
      links: [{ label: `${city.name} repair services`, href: `/locations/${city.slug}` }],
    },
    {
      question: `Do you offer mail-in repair from ${city.name}?`,
      answer: mailIn,
      links: [{ label: "Mail-in intake", href: "/contact" }],
    },
    {
      question: `How long do repairs take for ${city.name} customers?`,
      answer: `Turnaround depends on the device and fault. Many common repairs finish within a business day at our bench; board-level and data recovery may need longer—we confirm after diagnostics.`,
    },
    {
      question: `Can I get board-level repair near ${city.name}?`,
      answer: `Yes. PixelNation handles charging ports, HDMI, liquid damage, and logic board faults that require microsoldering—not only part swaps.`,
      links: [{ label: "Board repair", href: "/board-repair" }],
    },
  ];

  return takeFaqs(
    mergeFaqs(localized, MAIL_IN_REPAIR_FAQS.slice(0, 2), getCategoryFaqs("phone-repair").slice(0, 2)),
    limit,
  );
}

/** Service SEO page (/services/[slug]) */
export function resolveServicePageFaqs(service: ServiceData, limit = 8): FaqItem[] {
  const base = getServiceFaqs(service.slug);
  const contextual: FaqItem[] = [
    {
      question: `What does ${service.name} include at PixelNation?`,
      answer: `${service.name} covers ${service.capabilities.slice(0, 3).join(", ")}, and related diagnostics. Each device is evaluated individually before quoting.`,
      links: service.canonicalPath
        ? [{ label: `${service.shortName} repair overview`, href: service.canonicalPath }]
        : undefined,
    },
    {
      question: `How long does ${service.name} take?`,
      answer: service.turnaround,
    },
    {
      question: `Do you offer mail-in ${service.name.toLowerCase()}?`,
      answer: service.mailInFriendly
        ? `Yes. Mail-in ${service.name.toLowerCase()} is available across Kansas and surrounding states with secure packing and online intake.`
        : `Contact us to confirm mail-in options for this service.`,
      links: [{ label: "Start mail-in repair", href: "/contact" }],
    },
  ];

  return takeFaqs(mergeFaqs(contextual, base), limit);
}

/** City + service landing pages */
export function resolveCityServiceFaqs(
  city: CityData,
  service: ServiceData,
  limit = 8,
): FaqItem[] {
  const label = `${city.name}, ${city.stateAbbr}`;
  const serviceLower = service.name.toLowerCase();

  const localized: FaqItem[] = [
    {
      question: `How long does ${service.name} take in ${city.name}?`,
      answer: `For ${label} customers, ${service.turnaround} Mail-in devices are processed at our Emporia bench after intake.`,
    },
    {
      question: `Do you offer mail-in ${serviceLower} from ${city.name}?`,
      answer: city.isPrimaryLocation
        ? `Yes. Visit our ${SITE.address.region} shop or start mail-in ${serviceLower} with secure packing.`
        : `Yes. ${city.name} customers can mail devices for ${serviceLower} with intake instructions and status updates.`,
      links: [{ label: "Contact", href: "/contact" }],
    },
    {
      question: `Why choose PixelNation for ${serviceLower} near ${city.name}?`,
      answer: `We combine structured diagnostics, board-level repair, and clear communication for ${city.geoKeywords[0]} customers.`,
    },
  ];

  return takeFaqs(mergeFaqs(localized, getServiceFaqs(service.slug)), limit);
}

export function resolveRepairPageFaqs(page: RepairPageId, limit = 8) {
  return takeFaqs(getRepairPageFaqs(page), limit);
}

export function resolveCategoryFaqs(category: FaqCategoryId, limit = 8) {
  return takeFaqs(getCategoryFaqs(category), limit);
}

export function getFullServiceFaqsForSchema(slug: ServiceSlug) {
  return toSchemaFaqs(getServiceFaqs(slug));
}
