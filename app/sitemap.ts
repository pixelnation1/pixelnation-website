import type { MetadataRoute } from "next";
import { getAllSitemapEntries } from "@/lib/seo/routes";
import { buildCanonical } from "@/lib/seo/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllSitemapEntries().map((entry) => ({
    url: buildCanonical(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
