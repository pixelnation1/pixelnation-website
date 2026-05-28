import type { HubLink } from "@/components/seo/local/InternalLinksHub";
import { CITIES, type CitySlug } from "@/lib/locations/cities";
import { SERVICES, type ServiceSlug } from "@/lib/locations/services";

/** Knowledge hub and article-style internal links */
export function getKnowledgeHubLinks(): HubLink[] {
  return [
    {
      label: "Knowledge hub",
      href: "/knowledge",
      description: "Repair guides, diagnostics tips, and how-tos",
    },
    {
      label: "Repairs overview",
      href: "/repairs",
      description: "All repair services and device categories",
    },
    {
      label: "Board repair guide",
      href: "/board-repair",
      description: "Microsoldering, HDMI, and charging port depth",
    },
    {
      label: "Data recovery",
      href: "/data-recovery",
      description: "Phones, drives, and no-power recovery paths",
    },
    {
      label: "Training & courses",
      href: "/training",
      description: "Microsoldering education for technicians",
    },
    {
      label: "Contact & intake",
      href: "/contact",
      description: "Start a repair or ask a question",
    },
  ];
}

export function getCityServiceLinks(citySlug: CitySlug): HubLink[] {
  return Object.values(SERVICES).map((s) => ({
    label: s.name,
    href: `/locations/${citySlug}/${s.slug}`,
    description: `${s.shortName} in ${CITIES[citySlug].name}`,
  }));
}

export function getCityLinksForService(serviceSlug: ServiceSlug): HubLink[] {
  return Object.values(CITIES).map((c) => ({
    label: `${SERVICES[serviceSlug].shortName} in ${c.name}`,
    href: `/locations/${c.slug}/${serviceSlug}`,
  }));
}

export function getNearbyCityLinks(citySlug: CitySlug): HubLink[] {
  const city = CITIES[citySlug];
  return city.nearbySlugs.map((slug) => ({
    label: CITIES[slug].regionLabel,
    href: `/locations/${slug}`,
    description: "Local repair services",
  }));
}

export function getRelatedServiceLinks(
  serviceSlug: ServiceSlug,
  citySlug?: CitySlug,
): HubLink[] {
  const service = SERVICES[serviceSlug];
  return service.relatedServiceSlugs.map((slug) => ({
    label: SERVICES[slug].name,
    href: citySlug
      ? `/locations/${citySlug}/${slug}`
      : `/services/${slug}`,
    description: SERVICES[slug].capabilities[0],
  }));
}

export function getCanonicalRepairLinks(serviceSlug: ServiceSlug): HubLink[] {
  const service = SERVICES[serviceSlug];
  return service.relatedRepairPaths.map((href) => ({
    label: href.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href,
    description: "Full service page",
  }));
}
