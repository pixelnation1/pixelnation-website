import type { MetadataRoute } from "next";
import { SITE, SERVICE_PAGES } from "@/lib/site";

const staticRoutes = [
  "",
  "/repairs",
  "/phone-repair",
  "/computer-repair",
  "/appliance-repair",
  "/console-repair",
  "/data-recovery",
  "/board-repair",
  "/training",
  "/training-courses",
  "/shop",
  "/contact",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const legacySlugRedirects = new Set([
    "phone-repair-emporia-ks",
    "computer-repair-emporia-ks",
    "appliance-repair-emporia-ks",
    "console-repair-emporia-ks",
    "data-recovery-emporia-ks",
    "board-repair-emporia-ks",
    "microsoldering-emporia-ks",
  ]);
  const serviceEntries = Object.keys(SERVICE_PAGES)
    .filter((slug) => !legacySlugRedirects.has(slug))
    .map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  return [...staticEntries, ...serviceEntries];
}
