import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { FaqSection } from "@/components/faq/FaqSection";
import { resolveArticleFaqs, toSchemaFaqs } from "@/lib/faq";
import { ArticleContent } from "@/components/knowledge/ArticleContent";
import { ArticleCTA } from "@/components/knowledge/ArticleCTA";
import { ArticleSidebar } from "@/components/knowledge/ArticleSidebar";
import { AuthorSection } from "@/components/knowledge/AuthorSection";
import { HighlightedAnswer } from "@/components/knowledge/HighlightedAnswer";
import { TableOfContents } from "@/components/knowledge/TableOfContents";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { knowledgeArticleBreadcrumbs } from "@/lib/knowledge/breadcrumbs";
import { getCategoryBySlug } from "@/lib/knowledge/categories";
import { getRelatedArticles, getArticlePath } from "@/lib/knowledge/linking";
import { extractTocFromContent } from "@/lib/knowledge/toc";
import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR } from "@/lib/knowledge/articles/shared";

type ArticlePageProps = {
  article: KnowledgeArticle;
};

export function ArticlePage({ article }: ArticlePageProps) {
  const breadcrumbs = knowledgeArticleBreadcrumbs(article);
  const toc = extractTocFromContent(article.content);
  const category = getCategoryBySlug(article.category);
  const relatedArticles = getRelatedArticles(article, 3);
  const articleFaqs = resolveArticleFaqs(article.slug, article.faq);

  return (
    <article>
      <PageStructuredData
        breadcrumbs={breadcrumbs}
        faq={toSchemaFaqs(articleFaqs)}
        article={{
          headline: article.title,
          description: article.description,
          path: getArticlePath(article.slug),
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          image: article.image,
          authorName: article.authorName ?? KNOWLEDGE_AUTHOR,
        }}
        includeLocalBusiness={false}
      />

      <header className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          {category ? (
            <Link
              href={`/knowledge/category/${category.slug}`}
              className="mt-2 inline-block text-sm font-semibold uppercase tracking-wide text-accent"
            >
              {category.name}
            </Link>
          ) : null}
          <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {article.description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-12 xl:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <AuthorSection
              authorName={article.authorName ?? KNOWLEDGE_AUTHOR}
              datePublished={article.datePublished}
              readTimeMinutes={article.readTimeMinutes}
            />

            <div className="mt-8">
              <HighlightedAnswer
                question={article.conversationalQueries[0] ?? article.title}
                answer={article.featuredAnswer}
              />
            </div>

            {toc.length > 0 ? (
              <div className="mt-8 rounded-2xl border border-card-border bg-card p-5 lg:hidden">
                <TableOfContents items={toc} />
              </div>
            ) : null}

            <div className="mt-10">
              <ArticleContent content={article.content} />
            </div>

            <div className="mt-12">
              <ArticleCTA />
            </div>

            {articleFaqs.length > 0 ? (
              <div className="mt-14">
                <FaqSection
                  items={articleFaqs}
                  id="article-faq"
                  showPeopleAlsoAsk
                  conversationalQueries={article.conversationalQueries}
                  featuredAnswer={article.featuredAnswer}
                  initialVisible={6}
                />
              </div>
            ) : null}

            {relatedArticles.length > 0 ? (
              <section className="mt-14" aria-labelledby="more-articles-heading">
                <h2 id="more-articles-heading" className="text-2xl font-bold sm:text-3xl">
                  Continue reading
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.slug} article={related} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <ArticleSidebar article={article} toc={toc} />
        </div>
      </div>
    </article>
  );
}
