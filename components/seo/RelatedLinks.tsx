import Link from "next/link";
import { getRelatedRepairLinks } from "@/lib/seo/internal-links";

type RelatedLinksProps = {
  currentPath: string;
  title?: string;
  className?: string;
};

/** Internal linking block for topical authority and crawl paths. */
export function RelatedLinks({
  currentPath,
  title = "Related services",
  className = "",
}: RelatedLinksProps) {
  const links = getRelatedRepairLinks(currentPath).filter((l) => l.href !== currentPath);
  if (links.length === 0) return null;

  return (
    <aside
      className={`rounded-2xl border border-card-border bg-card p-6 ${className}`}
      aria-labelledby="related-links-heading"
    >
      <h2 id="related-links-heading" className="text-lg font-semibold text-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg border border-card-border bg-background/50 px-4 py-3 transition hover:border-accent-secondary/50 hover:text-accent"
            >
              <span className="font-medium text-foreground">{link.label}</span>
              {link.description ? (
                <span className="mt-1 block text-sm text-muted">{link.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
