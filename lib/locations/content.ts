import type { FaqItem } from "@/lib/seo/types";
import type { CityData, CitySlug } from "@/lib/locations/cities";
import { CITIES, getCityOrThrow } from "@/lib/locations/cities";
import type { ServiceData, ServiceSlug } from "@/lib/locations/services";
import { getServiceOrThrow, SERVICES } from "@/lib/locations/services";
import {
  buildCityFaqs,
  buildCityServiceFaqs,
  buildServiceFaqs,
} from "@/lib/locations/faqs";
import { SITE } from "@/lib/site";

/** Deterministic index from strings for copy variation */
function variationIndex(seed: string, count: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % count;
}

function pick<T>(seed: string, options: readonly T[]): T {
  return options[variationIndex(seed, options.length)]!;
}

export type LocalizedPageContent = {
  title: string;
  description: string;
  path: string;
  h1: string;
  eyebrow: string;
  intro: string;
  heroBullets: string[];
  faqs: FaqItem[];
  quickAnswers: { question: string; answer: string }[];
  sections: {
    whyTitle: string;
    whyBody: string;
    processTitle: string;
    processSteps: string[];
  };
};

export type CityPageContent = LocalizedPageContent & {
  city: CityData;
  serviceLinks: { label: string; href: string }[];
};

export type ServicePageContent = LocalizedPageContent & {
  service: ServiceData;
  cityLinks: { label: string; href: string }[];
};

export type CityServicePageContent = LocalizedPageContent & {
  city: CityData;
  service: ServiceData;
};

export function buildCityPageContent(citySlug: string): CityPageContent {
  const city = getCityOrThrow(citySlug);
  const path = `/locations/${city.slug}`;
  const seed = `city-${city.slug}`;

  const introVariants = [
    `PixelNation helps ${city.regionLabel} residents with phone, computer, console, and board-level repair—${city.isPrimaryLocation ? "from our Emporia shop" : "through mail-in service to our Kansas bench"}.`,
    `From ${city.geoKeywords[0]} to surrounding communities, PixelNation delivers diagnostics and repair you can track—${city.driveTimeNote}`,
    `Whether you are in ${city.name} or nearby, PixelNation offers structured repair for screens, ports, HDMI, liquid damage, and data recovery.`,
  ];

  const h1Variants = [
    `Tech Repair Serving ${city.name}, ${city.stateAbbr}`,
    `Phone & Electronics Repair for ${city.regionLabel}`,
    `Expert Repair for ${city.name} & Nearby Kansas Communities`,
  ];

  const content: CityPageContent = {
    city,
    path,
    title: `Repair Services in ${city.name}, ${city.stateAbbr} | PixelNation`,
    description: `Professional phone, computer, console, data recovery, and board repair serving ${city.regionLabel}. Mail-in and local options from PixelNation in Kansas.`,
    h1: pick(seed, h1Variants),
    eyebrow: `${city.geoKeywords[0]} · Kansas repair specialists`,
    intro: pick(seed, introVariants),
    heroBullets: [
      "iPhone, Android, and tablet repair",
      "Laptop, desktop, and Mac support",
      "PS5, Xbox, and console HDMI repair",
      "Data recovery and liquid damage",
      "Microsoldering and board-level work",
      city.isPrimaryLocation ? "Walk-in service in Emporia, KS" : "Insured mail-in from your city",
    ],
    faqs: buildCityFaqs(city),
    quickAnswers: [
      {
        question: `Where is PixelNation located for ${city.name} customers?`,
        answer: `Our repair bench is in ${SITE.address.region}. ${city.isPrimaryLocation ? "You can visit in person during business hours." : `${city.name} customers use mail-in repair with tracking and updates.`}`,
      },
      {
        question: `What repair services are available in ${city.name}?`,
        answer: `Phones, computers, consoles, data recovery, charging ports, HDMI, liquid damage, and microsoldering—all available for ${city.regionLabel}.`,
      },
    ],
    sections: {
      whyTitle: `Why ${city.name} customers choose PixelNation`,
      whyBody: pick(seed, [
        `We combine bench-level diagnostics with honest timelines—so ${city.name} customers know what to expect before approving work.`,
        `Our team handles faults many shops pass on: board-level charging, HDMI ports, corrosion, and storage recovery across ${city.geoKeywords[1] ?? "the region"}.`,
        `PixelNation is built for repair depth, not volume turnover—ideal for ${city.regionLabel} when you need accuracy and communication.`,
      ]),
      processTitle: "How repair works",
      processSteps: city.isPrimaryLocation
        ? [
            "Contact us or walk in with your device",
            "We diagnose and quote before work begins",
            "Repair is completed at our Emporia bench",
            "Pickup or local return when ready",
          ]
        : [
            "Start a repair online or call our shop",
            "Ship your device with secure packaging",
            "We diagnose, quote, and repair in Emporia",
            "Device ships back with tracking",
          ],
    },
    serviceLinks: Object.values(SERVICES).map((s) => ({
      label: s.name,
      href: `/locations/${city.slug}/${s.slug}`,
    })),
  };

  return content;
}

export function buildServicePageContent(serviceSlug: string): ServicePageContent {
  const service = getServiceOrThrow(serviceSlug);
  const path = `/services/${service.slug}`;
  const seed = `service-${service.slug}`;

  const introVariants = [
    `${service.name} at PixelNation means structured diagnostics, clear pricing, and board-level capability when parts alone are not enough—serving Kansas and mail-in customers nationwide.`,
    `Need ${service.name.toLowerCase()}? Our Emporia bench handles ${service.keywords.slice(0, 2).join(" and ")} with microscopy, microsoldering, and verified testing.`,
    `PixelNation specializes in ${service.serviceType.toLowerCase()} for phones, consoles, computers, and electronics across Kansas and surrounding states.`,
  ];

  const content: ServicePageContent = {
    service,
    path,
    title: `${service.name} in Kansas | PixelNation`,
    description: `${service.name} in Emporia, KS and mail-in across Kansas—${service.capabilities[0]}, ${service.capabilities[1]}, and expert diagnostics. Call ${SITE.phone}.`,
    h1: `${service.name} in Kansas`,
    eyebrow: `${service.serviceType} · Emporia KS · Mail-in available`,
    intro: pick(seed, introVariants),
    heroBullets: service.capabilities.slice(0, 6),
    faqs: buildServiceFaqs(service),
    quickAnswers: [
      {
        question: `How long does ${service.name} take?`,
        answer: service.turnaround,
      },
      {
        question: `Do you offer mail-in ${service.name.toLowerCase()}?`,
        answer: service.mailInFriendly
          ? "Yes. Secure mail-in repair is available with intake instructions when you start a repair online."
          : "Contact us to confirm mail-in options.",
      },
    ],
    sections: {
      whyTitle: `Why choose PixelNation for ${service.name.toLowerCase()}`,
      whyBody: pick(seed, [
        `We quote after inspection, explain feasibility clearly, and perform ${service.serviceType.toLowerCase()} with bench verification—not guesswork.`,
        `Our technicians handle ${service.shortName} faults at the component and port level when standard replacements fail.`,
        `From ${service.keywords[0]} to complex board work, PixelNation is the Kansas shop customers trust for accurate repair.`,
      ]),
      processTitle: `${service.name} process`,
      processSteps: [
        "Submit a repair request with your device details",
        "Drop off in Emporia or ship with tracking",
        "Diagnostics and quote before work begins",
        "Repair, test, and return with warranty where applicable",
      ],
    },
    cityLinks: (Object.keys(CITIES) as CitySlug[]).map((slug) => ({
      label: `${service.shortName} in ${CITIES[slug].name}`,
      href: `/locations/${slug}/${service.slug}`,
    })),
  };

  return content;
}

export function buildCityServicePageContent(
  citySlug: string,
  serviceSlug: string,
): CityServicePageContent {
  const city = getCityOrThrow(citySlug);
  const service = getServiceOrThrow(serviceSlug);
  const path = `/locations/${city.slug}/${service.slug}`;
  const seed = `${city.slug}-${service.slug}`;

  const introVariants = [
    `Looking for ${service.name.toLowerCase()} in ${city.regionLabel}? PixelNation serves ${city.name} with ${city.isPrimaryLocation ? "in-shop and" : ""} mail-in repair from our Emporia, Kansas bench.`,
    `${service.name} for ${city.geoKeywords[0]}: PixelNation diagnoses ${service.shortName} faults with clear quotes and ${service.mailInFriendly ? "mail-in options from " + city.name : "regional support"}.`,
    `From ${city.name} to nearby ${city.geoKeywords[2] ?? "communities"}, PixelNation delivers ${service.serviceType.toLowerCase()} backed by microsoldering and data recovery expertise.`,
  ];

  const h1Variants = [
    `${service.name} in ${city.name}, ${city.stateAbbr}`,
    `${service.shortName} Repair for ${city.regionLabel}`,
    `${city.name} ${service.name} — PixelNation Kansas`,
  ];

  return {
    city,
    service,
    path,
    title: `${service.name} in ${city.name}, ${city.stateAbbr} | PixelNation`,
    description: `${service.name} serving ${city.regionLabel}. ${service.capabilities[0]}. Mail-in and expert repair from PixelNation in Kansas. ${SITE.phone}.`,
    h1: pick(seed, h1Variants),
    eyebrow: `${service.serviceType} · ${city.geoKeywords[0]}`,
    intro: pick(seed, introVariants),
    heroBullets: service.capabilities.slice(0, 5).concat(
      city.isPrimaryLocation
        ? ["Emporia shop — walk-in welcome"]
        : [`Mail-in repair from ${city.name}`],
    ),
    faqs: buildCityServiceFaqs(city, service),
    quickAnswers: [
      {
        question: `How long does ${service.name} take in ${city.name}?`,
        answer: service.turnaround,
      },
      {
        question: `Do you offer mail-in ${service.name.toLowerCase()} from ${city.name}?`,
        answer: city.isPrimaryLocation
          ? `Yes — visit ${SITE.address.region} or use mail-in with tracking.`
          : `Yes. Ship from ${city.name} to our Emporia bench; we guide you through secure packaging.`,
      },
    ],
    sections: {
      whyTitle: `${service.name} near ${city.name}`,
      whyBody: pick(seed, [
        `${city.name} customers choose PixelNation when ${service.keywords[0]} requires real diagnostics—not a generic flat rate. We explain options before any work starts.`,
        `Serving ${city.regionLabel}, we handle ${service.shortName} issues with the same bench standards as our Emporia shop: test, repair, verify.`,
        `Whether you are near ${city.geoKeywords[1] ?? city.name} or mailing from ${city.stateAbbr}, you get transparent status and skilled ${service.serviceType.toLowerCase()}.`,
      ]),
      processTitle: `Getting ${service.shortName} repair from ${city.name}`,
      processSteps: city.isPrimaryLocation
        ? [
            `Bring your device to ${SITE.address.region}`,
            "We inspect and quote for " + service.shortName.toLowerCase(),
            "Repair and bench testing at PixelNation",
            "Pickup when ready — warranty explained upfront",
          ]
        : [
            `Start online from ${city.name}`,
            "Ship with padding and your contact info",
            `${service.name} at our Emporia bench`,
            "Return shipping with tracking",
          ],
    },
  };
}

/** Static params for all city × service combinations */
export function getAllCityServiceParams(): { city: string; service: string }[] {
  const cities = Object.keys(CITIES);
  const services = Object.keys(SERVICES);
  return cities.flatMap((city) =>
    services.map((service) => ({ city, service })),
  );
}
