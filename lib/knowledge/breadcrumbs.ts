import type { BreadcrumbItem } from "@/lib/seo/types";
import type { KnowledgeArticle, KnowledgeCategorySlug } from "@/lib/knowledge/types";
import { getCategoryBySlug } from "@/lib/knowledge/categories";
import { getArticlePath } from "@/lib/knowledge/linking";

export function knowledgeHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Knowledge Hub", path: "/knowledge" },
  ];
}

export function knowledgeCategoryBreadcrumbs(
  categorySlug: KnowledgeCategorySlug,
): BreadcrumbItem[] {
  const category = getCategoryBySlug(categorySlug);
  return [
    ...knowledgeHubBreadcrumbs(),
    {
      name: category?.name ?? categorySlug,
      path: `/knowledge/category/${categorySlug}`,
    },
  ];
}

export function knowledgeArticleBreadcrumbs(article: KnowledgeArticle): BreadcrumbItem[] {
  const category = getCategoryBySlug(article.category);
  return [
    ...knowledgeHubBreadcrumbs(),
    ...(category
      ? [{ name: category.name, path: `/knowledge/category/${category.slug}` }]
      : []),
    { name: article.title, path: getArticlePath(article.slug) },
  ];
}
