import { Section } from "@/components/Section";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  FAMILY_GAMING,
  FAMILY_GAMING_METADATA,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: FAMILY_GAMING_METADATA.title,
  description: FAMILY_GAMING_METADATA.description,
  path: FAMILY_GAMING_METADATA.path,
  keywords: [
    "family gaming Emporia KS",
    "family friendly TCG Emporia",
    "kids trading cards Emporia",
  ],
});

export default function FamilyGamingPage() {
  return (
    <CommunityPageShell
      title="Family Gaming"
      description={FAMILY_GAMING_METADATA.description}
      path={FAMILY_GAMING_METADATA.path}
      heroTitle={FAMILY_GAMING.heroTitle}
      heroSupport={FAMILY_GAMING.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Gaming", path: "/gaming" },
        { name: "Family Gaming", path: "/family-gaming" },
      ]}
      primaryCta={{ href: "/learn-to-play", label: "Learn to Play" }}
      secondaryCta={{ href: "/what-to-expect", label: "What to expect" }}
    >
      <Section
        id="why-family"
        title="Why family-friendly gaming matters"
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {FAMILY_GAMING.why.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        id="commitments"
        title="What families can count on"
        subtitle="Comfort, respect, and clear expectations."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {FAMILY_GAMING.commitments.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </CommunityPageShell>
  );
}
