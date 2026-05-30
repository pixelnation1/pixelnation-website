import Link from "next/link";

import { Section } from "@/components/Section";
import { SOFTWARE_DEV_DROPDOWN_LINKS } from "@/lib/software/links";

type SoftwareServiceLinksProps = {
  title?: string;
  subtitle?: string;
  excludeHref?: string;
  alt?: boolean;
};

/** Cross-links between software service landing pages. */
export function SoftwareServiceLinks({
  title = "Software development services",
  subtitle = "Explore PixelNation's website, SaaS, and automation offerings.",
  excludeHref,
  alt = false,
}: SoftwareServiceLinksProps) {
  const links = SOFTWARE_DEV_DROPDOWN_LINKS.filter(
    (link) => link.href !== excludeHref,
  );

  return (
    <Section title={title} subtitle={subtitle} alt={alt}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
          >
            <h3 className="font-semibold text-foreground group-hover:text-accent">
              {link.label}
            </h3>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
