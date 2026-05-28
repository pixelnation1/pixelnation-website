import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { FaqSection } from "@/components/faq/FaqSection";
import { resolveCategoryFaqs, toSchemaFaqs } from "@/lib/faq";
import type { FaqCategoryId } from "@/lib/faq/types";
import { pageHeroSection } from "@/components/layout/responsive";
import {
  KNOWLEDGE_CATEGORIES,
  getCategoryBySlug,
} from "@/lib/knowledge/categories";
import { knowledgeCategoryBreadcrumbs } from "@/lib/knowledge/breadcrumbs";
import { getArticlesByCategory } from "@/lib/knowledge/linking";
import type { KnowledgeCategorySlug } from "@/lib/knowledge/types";
import { createPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return KNOWLEDGE_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug as KnowledgeCategorySlug);
  if (!category) return {};

  return createPageMetadata({
    title: `${category.name} Guides | PixelNation Knowledge Hub`,
    description: category.description,
    path: `/knowledge/category/${category.slug}`,
    titleAbsolute: true,
    keywords: category.relatedTopics,
  });
}

export default async function KnowledgeCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug as KnowledgeCategorySlug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);
  const breadcrumbs = knowledgeCategoryBreadcrumbs(category.slug);
  const faqCategory = (
    category.slug === "training-education" ? "training" : category.slug
  ) as FaqCategoryId;
  const categoryFaqs = resolveCategoryFaqs(faqCategory, 8);

  return (
    <article>
      <PageStructuredData breadcrumbs={breadcrumbs} faq={toSchemaFaqs(categoryFaqs)} />

      <section className={pageHeroSection} aria-labelledby="category-heading">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <span className="text-3xl" aria-hidden>
            {category.icon}
          </span>
          <h1
            id="category-heading"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {category.description}
          </p>
          {category.serviceHref ? (
            <div className="cta-group mt-8">
              <Button href={category.serviceHref}>Book {category.name}</Button>
              <Button href="/knowledge" variant="outline">
                All categories
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <Section title={`${category.name} articles`}>
        {articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} showCategory={false} />
            ))}
          </div>
        ) : (
          <p className="text-muted">
            Articles coming soon.{" "}
            <Link href="/knowledge" className="text-accent-secondary hover:underline">
              Browse the full Knowledge Hub
            </Link>
            .
          </p>
        )}
      </Section>

      {categoryFaqs.length > 0 ? (
        <Section id="faq" title={`${category.name} FAQ`} alt>
          <FaqSection items={categoryFaqs} initialVisible={6} showPeopleAlsoAsk />
        </Section>
      ) : null}

      {category.relatedTopics.length > 0 ? (
        <Section title="Related topics" alt>
          <div className="flex flex-wrap gap-2">
            {category.relatedTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-muted"
              >
                {topic}
              </span>
            ))}
          </div>
        </Section>
      ) : null}
    </article>
  );
}
