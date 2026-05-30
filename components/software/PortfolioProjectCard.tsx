import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { PortfolioProject } from "@/lib/software-development-page";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  priorityImage?: boolean;
};

const STATUS_LABELS: Record<PortfolioProject["status"], string> = {
  live: "Live project",
  "coming-soon": "Coming soon",
  internal: "Custom build",
};

export function PortfolioProjectCard({
  project,
  priorityImage = false,
}: PortfolioProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card">
      <div className="relative h-48 w-full overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-contain object-center p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priorityImage}
          loading={priorityImage ? undefined : "lazy"}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
          <span className="shrink-0 rounded-full border border-card-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
            {STATUS_LABELS[project.status]}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Features
          </h4>
          <ul className="mt-2 space-y-1">
            {project.features.map((feature) => (
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
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-card-border bg-background px-3 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          {project.href ? (
            <Button href={project.href} variant="secondary">
              View Project
            </Button>
          ) : (
            <Button href="/contact" variant="outline">
              Discuss a Similar Build
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
