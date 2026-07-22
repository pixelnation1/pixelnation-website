import { Section } from "@/components/Section";
import { CommunityPageShell } from "@/components/tcg/CommunityPageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  WHAT_TO_EXPECT,
  WHAT_TO_EXPECT_METADATA,
} from "@/lib/tcg/community-pages";

export const metadata = createPageMetadata({
  title: WHAT_TO_EXPECT_METADATA.title,
  description: WHAT_TO_EXPECT_METADATA.description,
  path: WHAT_TO_EXPECT_METADATA.path,
  keywords: [
    "first visit game store Emporia",
    "PixelNation gaming what to expect",
  ],
});

export default function WhatToExpectPage() {
  return (
    <CommunityPageShell
      title="What to Expect"
      description={WHAT_TO_EXPECT_METADATA.description}
      path={WHAT_TO_EXPECT_METADATA.path}
      heroTitle={WHAT_TO_EXPECT.heroTitle}
      heroSupport={WHAT_TO_EXPECT.heroSupport}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Gaming Community", path: "/gaming-community" },
        { name: "What to Expect", path: "/what-to-expect" },
      ]}
      primaryCta={{ href: "/contact", label: "Contact us" }}
      secondaryCta={{ href: "/trading-cards", label: "Trading Cards" }}
    >
      <Section
        id="expectations"
        title="Your first visit"
        subtitle="Friendly atmosphere. Helpful staff. No experience required."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_TO_EXPECT.items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl rounded-xl border border-card-border bg-card p-5 text-muted leading-relaxed">
          {WHAT_TO_EXPECT.tip}
        </p>
      </Section>
    </CommunityPageShell>
  );
}
