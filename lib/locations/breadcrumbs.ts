import type { BreadcrumbItem } from "@/lib/seo/types";
import type { CityData } from "@/lib/locations/cities";
import type { ServiceData } from "@/lib/locations/services";

export function locationsHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
  ];
}

export function cityBreadcrumbs(city: CityData): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: city.name, path: `/locations/${city.slug}` },
  ];
}

export function servicesHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];
}

export function serviceBreadcrumbs(service: ServiceData): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
}

export function cityServiceBreadcrumbs(
  city: CityData,
  service: ServiceData,
): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: city.name, path: `/locations/${city.slug}` },
    {
      name: service.name,
      path: `/locations/${city.slug}/${service.slug}`,
    },
  ];
}
