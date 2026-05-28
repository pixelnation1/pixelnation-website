import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/categories";
import {
  FEATURED_ARTICLES,
  POPULAR_ARTICLES,
  PREPARED_KNOWLEDGE_ARTICLES,
  RECENT_ARTICLES,
} from "@/lib/knowledge/articles";
import type { FaqItem } from "@/lib/seo/types";

export const KNOWLEDGE_HUB_METADATA = {
  title: "Repair Knowledge Hub | PixelNation",
  description:
    "Expert repair guides on microsoldering, HDMI failure, liquid damage, data recovery, and board-level diagnostics—written by PixelNation technicians in Emporia, KS.",
  path: "/knowledge",
};

export const KNOWLEDGE_HUB_FAQ: FaqItem[] = [
  {
    question: "What is the PixelNation Knowledge Hub?",
    answer:
      "The Knowledge Hub is PixelNation's repair education library—articles written by technicians covering phones, computers, consoles, data recovery, and board-level repair for customers and aspiring techs.",
  },
  {
    question: "Are these guides a substitute for professional repair?",
    answer:
      "No. Articles help you understand symptoms and options. Board-level, data recovery, and safety-critical work should be performed by qualified technicians after proper diagnostics.",
  },
  {
    question: "Do you cover microsoldering and HDMI repair?",
    answer:
      "Yes. Categories include microsoldering, board repair, HDMI repair, liquid damage, and training—matching the services we offer in our Emporia, Kansas repair shop.",
  },
  {
    question: "How often is new content published?",
    answer:
      "We add guides as repair trends and customer questions evolve. Bookmark the hub or contact us if you want a specific topic covered.",
  },
];

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
