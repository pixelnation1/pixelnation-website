import Link from "next/link";
import { Section } from "@/components/Section";

export type HubLink = {
  label: string;
  href: string;
  description?: string;
};

type InternalLinksHubProps = {
  title: string;
  subtitle?: string;
  links: readonly HubLink[];
  id?: string;
};

export function InternalLinksHub({
  title,
  subtitle,
  links,
  id = "related-links",
}: InternalLinksHubProps) {
  if (links.length === 0) return null;

  return (
    <Section id={id} title={title} subtitle={subtitle} alt>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-11 flex-col rounded-xl border border-card-border bg-background/50 px-4 py-3 transition hover:border-accent-secondary/50 hover:text-accent"
            >
              <span className="font-medium text-foreground">{link.label}</span>
              {link.description ? (
                <span className="mt-1 text-sm text-muted">{link.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
