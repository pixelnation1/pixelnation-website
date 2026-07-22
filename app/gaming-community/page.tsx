import { Section } from "@/components/Section";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  GAMING_COMMUNITY,
  GAMING_COMMUNITY_METADATA,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: GAMING_COMMUNITY_METADATA.title,
  description: GAMING_COMMUNITY_METADATA.description,
  path: GAMING_COMMUNITY_METADATA.path,
  keywords: [
    "gaming community Emporia KS",
    "local game store Emporia",
    "TCG community Emporia",
  ],
});

export default function GamingCommunityPage() {
  return (
    <CommunityPageShell
      title="Gaming Community"
      description={GAMING_COMMUNITY_METADATA.description}
      path={GAMING_COMMUNITY_METADATA.path}
      heroTitle={GAMING_COMMUNITY.heroTitle}
      heroSupport={GAMING_COMMUNITY.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Gaming", path: "/gaming" },
        { name: "Gaming Community", path: "/gaming-community" },
      ]}
      primaryCta={{ href: "/what-to-expect", label: "What to expect" }}
      secondaryCta={{ href: "/learn-to-play", label: "Learn to Play" }}
    >
      <Section
        id="vision"
        title="Our community vision"
        subtitle="A local game store culture built around belonging."
      >
        <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
          {GAMING_COMMUNITY.vision.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        id="everyone-welcome"
        title="Everyone should feel welcome"
        subtitle="Casual players, competitive players, families, kids, collectors, and newcomers."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMING_COMMUNITY.audiences.map((audience) => (
            <article
              key={audience.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {audience.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
          {GAMING_COMMUNITY.closing}
        </p>
      </Section>
    </CommunityPageShell>
  );
}
