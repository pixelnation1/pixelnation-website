import Link from "next/link";
import { getArticlesByCategory } from "@/lib/knowledge/linking";
import type { KnowledgeCategory } from "@/lib/knowledge/types";

type CategoryCardProps = {
  category: KnowledgeCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const count = getArticlesByCategory(category.slug).length;

  return (
    <Link
      href={`/knowledge/category/${category.slug}`}
      className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-5 transition hover:border-accent/40 hover:bg-accent-muted/30"
    >
      <span className="text-2xl" aria-hidden>
        {category.icon}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{category.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {category.shortDescription}
      </p>
      <p className="mt-3 text-xs text-accent-secondary">
        {count} {count === 1 ? "article" : "articles"}
      </p>
    </Link>
  );
}
