"use client";

import { useState } from "react";

type ShareEventButtonProps = {
  title: string;
  url: string;
  className?: string;
};

export function ShareEventButton({ title, url, className = "" }: ShareEventButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url, text: title });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-card-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary sm:w-auto ${className}`}
    >
      {copied ? "Link copied" : "Share Event"}
    </button>
  );
}
