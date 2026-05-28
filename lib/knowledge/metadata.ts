import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { getArticlePath } from "@/lib/knowledge/linking";

export function createArticleMetadata(article: KnowledgeArticle): Metadata {
  const base = createPageMetadata({
    title: article.title,
    description: article.description,
    path: getArticlePath(article.slug),
    titleAbsolute: true,
    keywords: article.keywords,
    ogImage: article.image,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
      authors: [article.authorName ?? "PixelNation"],
      tags: article.keywords,
    },
  };
}
