import Link from "next/link";
import type { FaqItem } from "@/lib/seo/types";

type FaqPreviewProps = {
  items: readonly FaqItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

/** Compact FAQ highlights for hub/home sections — not a duplicate accordion. */
export function FaqPreview({
  items,
  viewAllHref = "#faq",
  viewAllLabel = "View all questions",
}: FaqPreviewProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.question}
          className="rounded-xl border border-card-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold text-foreground">{item.question}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
            {item.answer}
          </p>
        </div>
      ))}
      {viewAllHref ? (
        <p>
          <Link href={viewAllHref} className="text-sm font-medium text-accent hover:underline">
            {viewAllLabel}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
