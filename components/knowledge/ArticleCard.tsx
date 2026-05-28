import Link from "next/link";
import { KnowledgeArticleImage } from "@/components/knowledge/KnowledgeArticleImage";
import { getCategoryBySlug } from "@/lib/knowledge/categories";
import { getArticlePath } from "@/lib/knowledge/linking";
import type { KnowledgeArticle } from "@/lib/knowledge/types";

type ArticleCardProps = {
  article: KnowledgeArticle;
  showCategory?: boolean;
};

export function ArticleCard({ article, showCategory = true }: ArticleCardProps) {
  const category = getCategoryBySlug(article.category);

  const cardImageAlt = article.imageAlt ?? article.title;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/40 hover:shadow-lg hover:shadow-accent-secondary/5">
      {article.image ? (
        <KnowledgeArticleImage
          src={article.image}
          alt={cardImageAlt}
          variant="card"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        {showCategory && category ? (
          <Link
            href={`/knowledge/category/${category.slug}`}
            className="rounded-full bg-accent-muted px-2.5 py-0.5 font-medium text-accent hover:text-accent-hover"
          >
            {category.name}
          </Link>
        ) : null}
        <span>{article.readTimeMinutes} min read</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground group-hover:text-accent-secondary">
        <Link href={getArticlePath(article.slug)} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      <p className="mt-4 text-sm font-medium text-accent">
        Read guide <span aria-hidden>→</span>
      </p>
      </div>
    </article>
  );
}
