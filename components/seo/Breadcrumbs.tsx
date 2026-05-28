import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/types";

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/** Visible breadcrumb navigation (pairs with BreadcrumbList schema). */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav
      className={`mb-3 text-xs text-muted ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <span className="text-muted/60" aria-hidden>
                  /
                </span>
              ) : null}
              {item.path && !isLast ? (
                <Link href={item.path} className="hover:text-accent">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : undefined}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
