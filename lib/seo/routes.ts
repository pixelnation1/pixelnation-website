import { BLOG_POSTS } from "@/lib/seo/blog";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/categories";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge/articles";
import { PORTFOLIO_SLUGS } from "@/lib/portfolio";
import { CITY_SLUGS } from "@/lib/locations/cities";
import { SERVICE_SLUGS } from "@/lib/locations/services";
import { getAllCityServiceParams } from "@/lib/locations/content";
import { buildCanonical } from "@/lib/seo/site-seo";

export type SitemapEntry = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

/** Canonical public routes for sitemap and SEO audits. */
export const PUBLIC_ROUTES: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/repairs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/phone-repair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/computer-repair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/appliance-repair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/console-repair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/data-recovery", changeFrequency: "monthly", priority: 0.9 },
  { path: "/board-repair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/training", changeFrequency: "monthly", priority: 0.85 },
  { path: "/training-courses", changeFrequency: "monthly", priority: 0.85 },
  { path: "/software-development", changeFrequency: "monthly", priority: 0.88 },
  { path: "/software-development/website-development", changeFrequency: "monthly", priority: 0.86 },
  { path: "/software-development/custom-saas-development", changeFrequency: "monthly", priority: 0.86 },
  { path: "/software-development/business-automation", changeFrequency: "monthly", priority: 0.86 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.87 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/knowledge", changeFrequency: "weekly", priority: 0.88 },
  { path: "/locations", changeFrequency: "weekly", priority: 0.85 },
  { path: "/services", changeFrequency: "weekly", priority: 0.85 },
];

function locationSitemapEntries(): SitemapEntry[] {
  const cityPages: SitemapEntry[] = CITY_SLUGS.map((city) => ({
    path: `/locations/${city}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages: SitemapEntry[] = SERVICE_SLUGS.map((service) => ({
    path: `/services/${service}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityServicePages: SitemapEntry[] = getAllCityServiceParams().map(
    ({ city, service }) => ({
      path: `/locations/${city}/${service}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }),
  );

  return [...cityPages, ...servicePages, ...cityServicePages];
}

function knowledgeSitemapEntries(): SitemapEntry[] {
  const categoryEntries: SitemapEntry[] = KNOWLEDGE_CATEGORIES.map((category) => ({
    path: `/knowledge/category/${category.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const articleEntries: SitemapEntry[] = KNOWLEDGE_ARTICLES.map((article) => ({
    path: `/knowledge/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return categoryEntries.concat(articleEntries);
}

function portfolioSitemapEntries(): SitemapEntry[] {
  return PORTFOLIO_SLUGS.map((slug) => ({
    path: `/portfolio/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));
}

export function getAllSitemapEntries(): SitemapEntry[] {
  const blogEntries: SitemapEntry[] = BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...PUBLIC_ROUTES,
    ...locationSitemapEntries(),
    ...knowledgeSitemapEntries(),
    ...portfolioSitemapEntries(),
    ...blogEntries,
  ];
}

export function getSitemapUrls(): string[] {
  return getAllSitemapEntries().map((entry) => buildCanonical(entry.path));
}
