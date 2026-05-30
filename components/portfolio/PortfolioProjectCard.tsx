import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { getProjectPath } from "@/lib/portfolio";
import type { PortfolioProject, ProjectStatus } from "@/lib/portfolio/types";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  priorityImage?: boolean;
  compact?: boolean;
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  internal: "Concept",
};

export function PortfolioProjectCard({
  project,
  priorityImage = false,
  compact = false,
}: PortfolioProjectCardProps) {
  const caseStudyPath = getProjectPath(project.slug);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/50">
      <Link href={caseStudyPath} className="relative block h-48 w-full overflow-hidden bg-background">
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt}
          fill
          className="object-contain object-center p-4 transition group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priorityImage}
          loading={priorityImage ? undefined : "lazy"}
        />
        {project.logo ? (
          <div className="absolute bottom-3 left-3 rounded-lg border border-card-border bg-background/95 p-1.5 shadow-sm">
            <Image
              src={project.logo}
              alt={project.logoAlt ?? `${project.name} logo`}
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
              {project.categoryLabel}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              <Link href={caseStudyPath} className="hover:text-accent">
                {project.name}
              </Link>
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-card-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <p className="mt-1 text-xs font-medium text-muted">{project.industry}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {compact ? project.tagline : project.description}
        </p>

        {!compact ? (
          <>
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Features
              </h4>
              <ul className="mt-2 space-y-1">
                {project.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-muted">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Technologies
              </h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-card-border bg-background px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button href={caseStudyPath} variant="secondary">
            View Case Study
          </Button>
          {project.projectUrl ? (
            <Button href={project.projectUrl} variant="outline" external>
              Visit Site
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
