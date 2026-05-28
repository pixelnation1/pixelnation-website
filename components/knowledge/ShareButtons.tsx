"use client";

import { useCallback, useState } from "react";
import { buildCanonical } from "@/lib/seo/site-seo";

type ShareButtonsProps = {
  title: string;
  path: string;
};

export function ShareButtons({ title, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = buildCanonical(path);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [url]);

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share article">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent-secondary hover:text-accent-secondary"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent-secondary hover:text-accent-secondary"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent-secondary hover:text-accent-secondary"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
