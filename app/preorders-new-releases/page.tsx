import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { ProductImageGrid } from "@/components/tcg/ProductImageGrid";
import { ReleaseCard } from "@/components/tcg/ReleaseCard";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { PREORDER_SHOWCASE_IMAGES } from "@/lib/tcg/images";
import { PREORDER_GAME_SECTIONS, PREORDERS_METADATA } from "@/lib/tcg/preorders-page";
import {
  getReleasesByGame,
  hasReleaseAnnouncements,
  PREORDER_POLICIES,
} from "@/lib/tcg/releases";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: PREORDERS_METADATA.title,
  description: PREORDERS_METADATA.description,
  path: PREORDERS_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "trading card preorders Emporia",
    "new TCG releases Emporia KS",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Trading Cards", path: "/trading-cards" },
  { name: "Preorders & New Releases", path: "/preorders-new-releases" },
];

export default function PreordersNewReleasesPage() {
  const anyReleases = hasReleaseAnnouncements();

  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        pagePath="/preorders-new-releases"
        pageName="Preorders & New Releases"
        pageDescription={PREORDERS_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="preorders-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="preorders-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Preorders &amp; New Releases
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            PixelNation plans to offer preorders for select trading-card releases as
            our Emporia location expands. This page explains how preorders will
            work—it is not an online ordering system.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Ask about a release</Button>
            <Button href="/what-we-carry" variant="secondary">
              What We Carry
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="how-preorders-work"
        title="How preorders work"
        subtitle="Honest expectations before you reserve a product."
      >
        <ul className="max-w-3xl space-y-3">
          {PREORDER_POLICIES.map((policy) => (
            <li key={policy} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {policy}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="recent-releases"
        title="Recent & upcoming sealed products"
        subtitle="Examples of the kinds of releases preorders may cover—availability depends on distributor allocation and release timing."
        alt
      >
        <ProductImageGrid images={PREORDER_SHOWCASE_IMAGES} />
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Shown for reference only. Contact PixelNation to ask about a specific
          release or preorder availability.
        </p>
      </Section>

      <Section
        id="by-game"
        title="Releases by game"
        subtitle={
          anyReleases
            ? "Current release announcements and preorder interest by game."
            : "Release announcements will appear here when confirmed. In the meantime, contact us about any upcoming set."
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PREORDER_GAME_SECTIONS.map((section) => {
            const releases = getReleasesByGame(section.game);
            return (
              <div
                key={section.game}
                className="flex flex-col rounded-2xl border border-card-border bg-card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {section.game}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {section.note}
                </p>
                {releases.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {releases.map((release) => (
                      <li key={release.id}>
                        <ReleaseCard release={release} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted">
                    No confirmed announcements listed yet—contact us for current
                    preorder availability.
                  </p>
                )}
                <div className="mt-5">
                  <Link
                    href={section.href}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {section.game} page →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="preorders-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="preorders-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Want a release reserved?
          </h2>
          <p className="mt-3 text-muted">
            Contact PixelNation about upcoming sets and preorder availability in{" "}
            {SITE.address.region}.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact PixelNation</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
