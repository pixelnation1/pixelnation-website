import type { FaqItem } from "@/lib/seo/types";
import type { CityData } from "@/lib/locations/cities";
import type { ServiceData } from "@/lib/locations/services";
import { SITE } from "@/lib/site";

function cityLabel(city: CityData) {
  return `${city.name}, ${city.stateAbbr}`;
}

/** City hub FAQs */
export function buildCityFaqs(city: CityData): FaqItem[] {
  const label = cityLabel(city);
  const mailIn = city.isPrimaryLocation
    ? `Yes. Our shop is in ${SITE.address.region}. Walk in during business hours or start a repair online.`
    : `Yes. Customers in ${label} ship devices to our Emporia, KS repair bench with tracking and clear intake notes.`;

  return [
    {
      question: `Does PixelNation serve ${label}?`,
      answer: `Yes. PixelNation supports ${label} and surrounding communities with professional phone, computer, console, data recovery, and board-level repair—${city.isPrimaryLocation ? "at our local shop" : "via mail-in and regional coordination"}.`,
    },
    {
      question: `Do you offer mail-in repair from ${city.name}?`,
      answer: mailIn,
    },
    {
      question: `How long do repairs take for ${city.name} customers?`,
      answer: `Turnaround depends on the device and fault. Many common repairs finish within a business day at our bench; board-level, HDMI, and data recovery work may need additional time. We confirm timelines after diagnostics.`,
    },
    {
      question: `What types of devices do you repair for ${label}?`,
      answer: `We repair iPhones and Android phones, laptops and desktops, PlayStation and Xbox consoles, appliances, and electronics that need microsoldering or data recovery—serving ${city.geoKeywords[0]} and the wider Kansas region.`,
    },
    {
      question: `Is there a warranty on repairs for ${city.name}?`,
      answer: `Many repairs include warranty coverage on parts and workmanship. Coverage depends on device condition and repair type—we explain terms before you approve work.`,
    },
    {
      question: `Can I get board-level repair if other shops in ${city.name} declined my device?`,
      answer: `Often, yes. PixelNation specializes in charging ports, HDMI ports, liquid damage, shorts, and logic board faults that require microscopy and microsoldering—not just part swaps.`,
    },
  ];
}

/** Service hub FAQs (national/Kansas scope) */
export function buildServiceFaqs(service: ServiceData): FaqItem[] {
  return [
    {
      question: `What does ${service.name} include at PixelNation?`,
      answer: `${service.name} covers ${service.capabilities.slice(0, 3).join(", ")}, and related diagnostics. We evaluate each device individually before quoting.`,
    },
    {
      question: `How long does ${service.name} take?`,
      answer: service.turnaround,
    },
    {
      question: `Do you offer mail-in ${service.name}?`,
      answer: service.mailInFriendly
        ? `Yes. Mail-in ${service.name.toLowerCase()} is available across Kansas and surrounding states. Pack the device securely, include your contact details, and start a repair request online.`
        : `Contact us to confirm mail-in options for this service.`,
    },
    {
      question: `How much does ${service.name} cost?`,
      answer: `Pricing depends on the model, damage, and whether board-level work is required. We provide a clear quote after inspection—no surprise charges.`,
    },
    {
      question: `Can you fix ${service.shortName} issues other shops could not?`,
      answer: `We focus on accurate diagnostics and board-level capability when swaps alone are not enough. If repair is not realistic, we tell you upfront.`,
    },
  ];
}

/** City + service combination FAQs — localized for snippets and AEO */
export function buildCityServiceFaqs(city: CityData, service: ServiceData): FaqItem[] {
  const label = cityLabel(city);
  const serviceLower = service.name.toLowerCase();

  const faqs: FaqItem[] = [
    {
      question: `How long does ${service.name} take in ${city.name}?`,
      answer: `For ${label} customers, ${service.turnaround} Mail-in devices are processed at our Emporia bench as soon as intake is complete.`,
    },
    {
      question: `Do you offer mail-in ${serviceLower} from ${city.name}?`,
      answer: city.isPrimaryLocation
        ? `Yes. Visit our ${SITE.address.region} shop or start mail-in ${serviceLower} with secure packing and tracking.`
        : `Yes. ${city.name} customers can mail devices for ${serviceLower}. We provide intake instructions and status updates through repair.`,
    },
  ];

  if (service.slug === "ps5-hdmi-repair") {
    faqs.push({
      question: `How long does PS5 HDMI repair take in ${city.name}?`,
      answer: `PS5 HDMI repair for ${label} typically takes 3–7 business days at our bench after we confirm port and board condition. Mail-in from ${city.name} adds shipping time each way.`,
    });
  }

  if (service.slug === "liquid-damage-repair" || service.slug === "data-recovery") {
    faqs.push({
      question: `Can you recover data from water damaged phones in ${label}?`,
      answer: `Often, yes—if storage is reachable. We assess corrosion, power rails, and media health, then recommend the safest path for ${serviceLower} in ${city.name} and nearby areas.`,
    });
  }

  if (service.slug === "iphone-repair") {
    faqs.push({
      question: `Do you repair all iPhone models for ${city.name} customers?`,
      answer: `We service many iPhone generations—screens, batteries, charging, cameras, and board faults. Contact us with your model for parts availability and pricing.`,
    });
  }

  faqs.push(
    {
      question: `Why choose PixelNation for ${serviceLower} near ${city.name}?`,
      answer: `PixelNation combines structured diagnostics, board-level repair, and clear communication—trusted by ${city.geoKeywords[0]} customers who need more than a quick part swap.`,
    },
    {
      question: `What should I do before sending my device for ${serviceLower} from ${city.name}?`,
      answer: `Back up data if the device still powers on, note symptoms, and avoid repeated charge attempts on liquid-damaged units. Start a repair request online or call ${SITE.phone} for intake steps.`,
    },
    {
      question: `Is ${service.name} worth it versus replacing the device?`,
      answer: `We compare repair cost, data value, and device condition after inspection. For ${label}, we help you decide based on facts—not pressure.`,
    },
  );

  return faqs;
}
