"use client";

import { useMemo, useState } from "react";

import { PortfolioProjectCard } from "@/components/portfolio/PortfolioProjectCard";
import { PORTFOLIO_FILTERS } from "@/lib/portfolio/categories";
import { filterProjects } from "@/lib/portfolio";
import type { PortfolioFilterId, PortfolioProject } from "@/lib/portfolio/types";

type PortfolioGridProps = {
  projects: readonly PortfolioProject[];
};

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>("all");

  const filteredProjects = useMemo(
    () => (activeFilter === "all" ? projects : filterProjects(activeFilter)),
    [activeFilter, projects],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter portfolio projects"
      >
        {PORTFOLIO_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-card-border bg-card text-muted hover:border-accent/40 hover:text-accent"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
        {activeFilter !== "all"
          ? ` in ${PORTFOLIO_FILTERS.find((f) => f.id === activeFilter)?.label ?? activeFilter}`
          : ""}
        .
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <PortfolioProjectCard
            key={project.slug}
            project={project}
            priorityImage={index < 3}
          />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="mt-8 rounded-xl border border-card-border bg-card p-6 text-center text-muted">
          No projects match this filter yet.{" "}
          <button
            type="button"
            className="font-semibold text-accent hover:underline"
            onClick={() => setActiveFilter("all")}
          >
            View all projects
          </button>
        </p>
      ) : null}
    </div>
  );
}
