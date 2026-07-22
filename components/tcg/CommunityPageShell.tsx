import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { COMMUNITY_HUB_LINKS } from "@/lib/tcg/community-pages";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

type CommunityPageShellProps = {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  heroTitle: string;
  heroSupport: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function CommunityPageShell({
  title,
  description,
  path,
  eyebrow = SITE.address.region,
  heroTitle,
  heroSupport,
  breadcrumbs,
  children,
  primaryCta = { href: "/contact", label: "Contact us" },
  secondaryCta = { href: "/trading-cards", label: "Trading Cards" },
}: CommunityPageShellProps) {
  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        pagePath={path}
        pageName={title}
        pageDescription={description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="community-page-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </p>
          <h1
            id="community-page-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {heroSupport}
          </p>
          <div className="cta-group mt-8">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {children}

      <Section
        id="community-hub"
        title="Explore the PixelNation gaming community"
        subtitle="More ways to learn, play, and feel at home at a local game store in Emporia."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_HUB_LINKS.filter((link) => link.href !== path).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent-secondary/50 hover:text-accent"
              >
                {link.label} →
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}
