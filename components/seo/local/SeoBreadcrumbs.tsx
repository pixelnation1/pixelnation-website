import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/types";

type SeoBreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
};

export function SeoBreadcrumbs({ items }: SeoBreadcrumbsProps) {
  return (
    <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.name}-${index}`}>
            {index > 0 ? <span className="mx-2">/</span> : null}
            {item.path && !isLast ? (
              <Link href={item.path} className="hover:text-accent">
                {item.name}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : undefined}>{item.name}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
