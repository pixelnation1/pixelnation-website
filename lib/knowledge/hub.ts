import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/categories";
import {
  FEATURED_ARTICLES,
  POPULAR_ARTICLES,
  PREPARED_KNOWLEDGE_ARTICLES,
  RECENT_ARTICLES,
} from "@/lib/knowledge/articles";
import { KNOWLEDGE_HUB_FAQS } from "@/lib/faq/global";

export const KNOWLEDGE_HUB_METADATA = {
  title: "Repair Knowledge Hub | PixelNation",
  description:
    "Expert repair guides on microsoldering, HDMI failure, liquid damage, data recovery, and board-level diagnostics—written by PixelNation technicians in Emporia, KS.",
  path: "/knowledge",
};

/** @deprecated Import KNOWLEDGE_HUB_FAQS from @/lib/faq */
export const KNOWLEDGE_HUB_FAQ = KNOWLEDGE_HUB_FAQS;

export const KNOWLEDGE_HUB_HERO = {
  eyebrow: "Repair Education · Emporia, KS",
  title: "PixelNation Knowledge Hub",
  subtitle:
    "Authoritative repair guides on microsoldering, board damage, HDMI failure, liquid damage, and data recovery—built for search, answer engines, and real-world troubleshooting.",
};

function preparedBySlug(slug: string) {
  return PREPARED_KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);
}

export function getHubFeaturedArticles() {
  const slugs = (
    FEATURED_ARTICLES.length > 0
      ? FEATURED_ARTICLES
      : PREPARED_KNOWLEDGE_ARTICLES.slice(0, 3)
  ).map((a) => a.slug);
  return slugs
    .map((slug) => preparedBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);
}

export function getHubPopularArticles() {
  const slugs = (
    POPULAR_ARTICLES.length > 0
      ? POPULAR_ARTICLES
      : PREPARED_KNOWLEDGE_ARTICLES.slice(0, 4)
  ).map((a) => a.slug);
  return slugs
    .map((slug) => preparedBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);
}

export function getHubRecentArticles(limit = 5) {
  return RECENT_ARTICLES.slice(0, limit);
}

export { KNOWLEDGE_CATEGORIES };
