import Image from "next/image";
import Link from "next/link";

import { CaseStudyStructuredData } from "@/components/portfolio/CaseStudyStructuredData";
import { PortfolioProjectCard } from "@/components/portfolio/PortfolioProjectCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { getRelatedProjects, getProjectPath } from "@/lib/portfolio";
import type { PortfolioProject } from "@/lib/portfolio/types";
import { portfolioCaseStudyBreadcrumbs } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";

const STATUS_LABELS = {
  live: "Live",
  "in-development": "In development",
  internal: "Concept",
} as const;

type CaseStudyPageProps = {
  project: PortfolioProject;
};

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const crumbs = portfolioCaseStudyBreadcrumbs(project.name, getProjectPath(project.slug));
  const relatedProjects = getRelatedProjects(project.relatedSlugs);
  const { caseStudy } = project;

  return (
    <article>
      <CaseStudyStructuredData project={project} />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-20"
        aria-labelledby="case-study-heading"
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <Breadcrumbs items={crumbs} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {project.categoryLabel} · {project.industry}
              </p>
              <h1
                id="case-study-heading"
                className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {project.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{project.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-card-border bg-card px-3 py-1 text-xs font-medium text-muted">
                  {STATUS_LABELS[project.status]}
                </span>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="cta-group mt-8">
                {project.projectUrl ? (
                  <Button href={project.projectUrl} external>
                    Visit Project
                  </Button>
                ) : null}
                <Button href="/contact" variant={project.projectUrl ? "secondary" : undefined}>
                  Discuss a Similar Build
                </Button>
                <Button href="/portfolio" variant="outline">
                  Back to Portfolio
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-background">
              <Image
                src={project.screenshot}
                alt={project.screenshotAlt}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <Section id="challenge" title="The challenge" subtitle="What the client or product needed to solve.">
        <p className="max-w-3xl leading-relaxed text-muted">{caseStudy.challenge}</p>
      </Section>

      <Section id="solution" title="The solution" subtitle="How PixelNation approached the build." alt>
        <p className="max-w-3xl leading-relaxed text-muted">{caseStudy.solution}</p>
      </Section>

      <Section
        id="features-built"
        title="Features built"
        subtitle="Core capabilities delivered in this project."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {caseStudy.featuresBuilt.map((feature) => (
            <li
              key={feature}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      {caseStudy.screenshots.length > 0 ? (
        <Section
          id="screenshots"
          title="Screenshots"
          subtitle="Visual highlights from the project."
          alt
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudy.screenshots.map((shot) => (
              <figure
                key={shot.src + shot.alt}
                className="overflow-hidden rounded-2xl border border-card-border bg-background"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                {shot.caption ? (
                  <figcaption className="border-t border-card-border px-4 py-3 text-sm text-muted">
                    {shot.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="results" title="Results" subtitle="Outcomes and value delivered.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudy.results.map((result) => (
            <article
              key={result.label}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{result.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{result.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="technologies"
        title="Technologies used"
        subtitle="Stack and tools behind this project."
        alt
      >
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-card-border bg-background px-4 py-2 text-sm text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="lessons-learned"
        title="Lessons learned"
        subtitle="What this project reinforced about building software that works in the real world."
      >
        <ul className="max-w-3xl space-y-3">
          {caseStudy.lessonsLearned.map((lesson) => (
            <li key={lesson} className="flex gap-3 text-muted leading-relaxed">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                aria-hidden
              />
              {lesson}
            </li>
          ))}
        </ul>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section
          id="related-projects"
          title="Related projects"
          subtitle="More work from the PixelNation portfolio."
          alt
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((related) => (
              <PortfolioProjectCard key={related.slug} project={related} compact />
            ))}
          </div>
        </Section>
      ) : null}

      <section className="border-t border-card-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <RelatedLinks currentPath={getProjectPath(project.slug)} title="Explore PixelNation" />
        </div>
      </section>

      <section
        id="case-study-cta"
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="case-study-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="case-study-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need something similar?
          </h2>
          <p className="mt-3 text-muted">
            Let&apos;s talk about your website, SaaS platform, or automation project. We&apos;ll
            help you scope the right build and deliver software that fits how your business
            actually operates.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Let&apos;s Talk</Button>
            <Button href="/software-development" variant="secondary">
              Software Services
            </Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
