import type { CityData } from "@/lib/locations/cities";
import type { ServiceData } from "@/lib/locations/services";
import {
  resolveCityFaqs,
  resolveCityServiceFaqs,
  resolveServicePageFaqs,
} from "@/lib/faq/resolve";

/** @deprecated Use resolveCityFaqs from @/lib/faq */
export function buildCityFaqs(city: CityData) {
  return resolveCityFaqs(city, 8);
}

/** @deprecated Use resolveServicePageFaqs from @/lib/faq */
export function buildServiceFaqs(service: ServiceData) {
  return resolveServicePageFaqs(service, 8);
}

/** @deprecated Use resolveCityServiceFaqs from @/lib/faq */
export function buildCityServiceFaqs(city: CityData, service: ServiceData) {
  return resolveCityServiceFaqs(city, service, 8);
}
