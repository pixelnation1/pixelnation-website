import Link from "next/link";
import { TableOfContents } from "@/components/knowledge/TableOfContents";
import { ShareButtons } from "@/components/knowledge/ShareButtons";
import {
  getRelatedArticles,
  getRelatedCategoryLinks,
  getRelatedServiceLinks,
  getArticlePath,
} from "@/lib/knowledge/linking";
import type { KnowledgeArticle, TocItem } from "@/lib/knowledge/types";

type ArticleSidebarProps = {
  article: KnowledgeArticle;
  toc: readonly TocItem[];
};

export function ArticleSidebar({ article, toc }: ArticleSidebarProps) {
  const relatedArticles = getRelatedArticles(article, 3);
  const services = getRelatedServiceLinks(article);
  const categories = getRelatedCategoryLinks(article, 2);

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
      <div className="hidden rounded-2xl border border-card-border bg-card p-5 lg:block">
        <TableOfContents items={toc} />
      </div>

      <div className="rounded-2xl border border-card-border bg-card p-5">
        <ShareButtons title={article.title} path={getArticlePath(article.slug)} />
      </div>

      {services.length > 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Related services
          </h2>
          <ul className="mt-3 space-y-2">
            {services.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-accent-secondary hover:text-accent-secondary-hover"
                >
                  {link.label}
                </Link>
                {link.description ? (
                  <p className="text-xs text-muted">{link.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedArticles.length > 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Related articles
          </h2>
          <ul className="mt-3 space-y-3">
            {relatedArticles.map((related) => (
              <li key={related.slug}>
                <Link
                  href={getArticlePath(related.slug)}
                  className="text-sm font-medium leading-snug text-foreground hover:text-accent-secondary"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {categories.length > 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Browse topics
          </h2>
          <ul className="mt-3 space-y-2">
            {categories.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
