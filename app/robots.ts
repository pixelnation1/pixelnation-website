import type { MetadataRoute } from "next";
import { buildCanonical } from "@/lib/seo/site-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: buildCanonical("/sitemap.xml"),
    host: buildCanonical("/"),
  };
}
