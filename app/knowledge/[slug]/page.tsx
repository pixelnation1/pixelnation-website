import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/knowledge/ArticlePage";
import { getArticleBySlug, KNOWLEDGE_ARTICLES } from "@/lib/knowledge/articles";
import { createArticleMetadata } from "@/lib/knowledge/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createArticleMetadata(article);
}

export default async function KnowledgeArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
