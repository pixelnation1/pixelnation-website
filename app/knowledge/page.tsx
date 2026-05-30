import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { FaqPreview } from "@/components/faq/FaqPreview";
import { FaqSection } from "@/components/faq/FaqSection";
import { KNOWLEDGE_HUB_FAQS } from "@/lib/faq/global";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/knowledge/ArticleCard";
import { CategoryCard } from "@/components/knowledge/CategoryCard";
import { KnowledgeSearch } from "@/components/knowledge/KnowledgeSearch";
import { pageHeroSection } from "@/components/layout/responsive";
import { knowledgeHubBreadcrumbs } from "@/lib/knowledge/breadcrumbs";
import {
  KNOWLEDGE_HUB_HERO,
  KNOWLEDGE_HUB_METADATA,
  getHubFeaturedArticles,
  getHubPopularArticles,
  getHubRecentArticles,
  KNOWLEDGE_CATEGORIES,
} from "@/lib/knowledge/hub";
import { PREPARED_KNOWLEDGE_ARTICLES } from "@/lib/knowledge/articles";
import { POPULAR_SERVICES } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: KNOWLEDGE_HUB_METADATA.title,
  description: KNOWLEDGE_HUB_METADATA.description,
  path: KNOWLEDGE_HUB_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "repair guides",
    "microsoldering guide",
    "phone repair education",
    "console HDMI repair",
    "data recovery help",
  ],
});

export default function KnowledgeHubPage() {
  const breadcrumbs = knowledgeHubBreadcrumbs();
  const featured = getHubFeaturedArticles();
  const popular = getHubPopularArticles();
  const recent = getHubRecentArticles(5);

  return (
    <article>
      <PageStructuredData breadcrumbs={breadcrumbs} faq={toSchemaFaqs(KNOWLEDGE_HUB_FAQS)} />

      <section className={pageHeroSection} aria-labelledby="knowledge-hub-heading">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {KNOWLEDGE_HUB_HERO.eyebrow}
          </p>
          <h1
            id="knowledge-hub-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {KNOWLEDGE_HUB_HERO.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {KNOWLEDGE_HUB_HERO.subtitle}
          </p>
          <div className="mt-8 max-w-xl">
            <KnowledgeSearch articles={PREPARED_KNOWLEDGE_ARTICLES} />
          </div>
        </div>
      </section>

      <Section title="Featured repair guides" alt>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <Section title="Browse by category">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KNOWLEDGE_CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section title="Popular repairs" alt>
        <p className="-mt-4 mb-6 max-w-2xl text-muted">
          Start a repair with PixelNation—these are our most requested services, linked
          to in-depth guides in the Knowledge Hub. Need board-level work or training?{" "}
          <Link href="/board-repair" className="text-accent-secondary hover:underline">
            Explore board repair
          </Link>{" "}
          or{" "}
          <Link href="/training" className="text-accent-secondary hover:underline">
            view training courses
          </Link>
          .
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_SERVICES.slice(0, 6).map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="rounded-2xl border border-card-border bg-card p-5 transition hover:border-accent/40"
            >
              <h3 className="font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Popular articles">
        <div className="grid gap-5 sm:grid-cols-2">
          {popular.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <Section title="Recent articles" alt>
        <ul className="divide-y divide-card-border rounded-2xl border border-card-border bg-card">
          {recent.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/knowledge/${article.slug}`}
                className="flex flex-col gap-1 px-5 py-4 transition hover:bg-accent-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-foreground">{article.title}</span>
                <span className="text-sm text-muted">
                  {article.readTimeMinutes} min ·{" "}
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Related repair topics">
        <div className="flex flex-wrap gap-2">
          {[
            "microsoldering",
            "HDMI port repair",
            "liquid damage",
            "board damage",
            "data recovery",
            "charging port",
            "no display",
            "console overheating",
            "diagnostic repair",
          ].map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-muted"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          <Link href="/knowledge" className="text-accent-secondary hover:underline">
            Browse all categories
          </Link>{" "}
          or use search above to find a specific guide.
        </p>
      </Section>

      <Section title="FAQ highlights" alt>
        <FaqPreview items={KNOWLEDGE_HUB_FAQS.slice(0, 4)} viewAllHref="#hub-faq" />
      </Section>

      <Section id="hub-faq" title="Frequently asked questions" alt>
        <FaqSection items={KNOWLEDGE_HUB_FAQS} initialVisible={6} showPeopleAlsoAsk />
      </Section>

      <section className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready for professional repair?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Our guides explain the why—our technicians handle the how. Book a diagnostic
            in Emporia, KS.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/repairs" variant="secondary">
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
