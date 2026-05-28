import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/categories";
import { KNOWLEDGE_ARTICLES, PREPARED_KNOWLEDGE_ARTICLES } from "@/lib/knowledge/articles";
import type { InternalLink } from "@/lib/seo/internal-links";
import type { KnowledgeArticle, KnowledgeCategorySlug } from "@/lib/knowledge/types";

const SERVICE_LABELS: Record<string, string> = {
  "/phone-repair": "Phone Repair",
  "/computer-repair": "Computer Repair",
  "/console-repair": "Console Repair",
  "/data-recovery": "Data Recovery",
  "/board-repair": "Board Repair",
  "/appliance-repair": "Appliance Repair",
  "/training": "Repair Training",
  "/training-courses": "Training Courses",
  "/repairs": "All Repairs",
  "/contact": "Contact Us",
};

export function getArticlePath(slug: string): string {
  return `/knowledge/${slug}`;
}

export function getRelatedArticles(
  article: KnowledgeArticle,
  limit = 4,
): KnowledgeArticle[] {
  const scored = PREPARED_KNOWLEDGE_ARTICLES.filter((a) => a.slug !== article.slug).map(
    (candidate) => {
      let score = 0;
      if (candidate.category === article.category) score += 3;
      if (article.relatedArticleSlugs.includes(candidate.slug)) score += 5;
      if (candidate.relatedArticleSlugs.includes(article.slug)) score += 2;
      const sharedKeywords = candidate.keywords.filter((k) =>
        article.keywords.some((ak) => ak.toLowerCase() === k.toLowerCase()),
      );
      score += sharedKeywords.length;
      return { candidate, score };
    },
  );

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate);
}

export function getRelatedServiceLinks(article: KnowledgeArticle): InternalLink[] {
  const paths = [
    ...article.relatedServicePaths,
    ...getCategoryServicePath(article.category),
  ];
  const unique = [...new Set(paths)];

  return unique.map((href) => ({
    href,
    label: SERVICE_LABELS[href] ?? href.replace(/^\//, "").replace(/-/g, " "),
    description: getServiceDescription(href),
  }));
}

function getCategoryServicePath(category: KnowledgeCategorySlug): string[] {
  const cat = KNOWLEDGE_CATEGORIES.find((c) => c.slug === category);
  return cat?.serviceHref ? [cat.serviceHref] : [];
}

function getServiceDescription(href: string): string | undefined {
  const descriptions: Record<string, string> = {
    "/phone-repair": "Professional smartphone repair in Emporia, KS",
    "/computer-repair": "Laptop and desktop repair services",
    "/console-repair": "PS5, Xbox, and Switch repair",
    "/data-recovery": "Recover data from failed devices",
    "/board-repair": "Microsoldering and board-level repair",
    "/training": "Hands-on repair training courses",
    "/contact": "Start a repair or ask a technician",
  };
  return descriptions[href];
}

export function getRelatedCategoryLinks(
  article: KnowledgeArticle,
  limit = 3,
): InternalLink[] {
  const current = KNOWLEDGE_CATEGORIES.find((c) => c.slug === article.category);
  const others = KNOWLEDGE_CATEGORIES.filter((c) => c.slug !== article.category)
    .slice(0, limit)
    .map((c) => ({
      href: `/knowledge/category/${c.slug}`,
      label: c.name,
      description: c.shortDescription,
    }));

  if (current) {
    return [
      {
        href: `/knowledge/category/${current.slug}`,
        label: current.name,
        description: "More articles in this category",
      },
      ...others,
    ].slice(0, limit + 1);
  }
  return others;
}

export function getArticlesByCategory(category: KnowledgeCategorySlug): KnowledgeArticle[] {
  return PREPARED_KNOWLEDGE_ARTICLES.filter((a) => a.category === category);
}

export function searchArticles(query: string): KnowledgeArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return KNOWLEDGE_ARTICLES.filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.excerpt,
      article.featuredAnswer,
      ...article.keywords,
      ...article.conversationalQueries,
      ...article.faq.flatMap((f) => [f.question, f.answer]),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
