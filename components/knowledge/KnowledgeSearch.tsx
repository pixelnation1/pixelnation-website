"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getArticlePath } from "@/lib/knowledge/linking";
import type { KnowledgeArticle } from "@/lib/knowledge/types";

type KnowledgeSearchProps = {
  articles: KnowledgeArticle[];
  placeholder?: string;
};

export function KnowledgeSearch({
  articles,
  placeholder = "Search repair guides…",
}: KnowledgeSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles
      .filter((article) => {
        const haystack = [
          article.title,
          article.description,
          article.excerpt,
          ...article.keywords,
          ...article.conversationalQueries,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, articles]);

  return (
    <div className="relative w-full">
      <label htmlFor="knowledge-search" className="sr-only">
        Search knowledge hub
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="knowledge-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-card-border bg-card py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted/70 focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/30"
          autoComplete="off"
        />
      </div>
      {query.trim() && (
        <div
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-card-border bg-card shadow-xl"
          role="listbox"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No guides found. Try another term.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={getArticlePath(article.slug)}
                    className="block px-4 py-3 text-sm transition hover:bg-accent-muted"
                    role="option"
                    onClick={() => setQuery("")}
                  >
                    <span className="font-medium text-foreground">{article.title}</span>
                    <span className="mt-0.5 block text-xs text-muted line-clamp-1">
                      {article.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
