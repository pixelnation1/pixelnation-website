import { createPageMetadata } from "@/lib/seo/metadata";
import {
  SoftwareServiceCta,
  SoftwareServiceFaq,
  SoftwareServiceFooter,
  SoftwareServiceHero,
  SoftwareServiceStructuredData,
  FeatureCard,
  ProcessSteps,
  BenefitGrid,
} from "@/components/software/SoftwareServiceSections";
import { SoftwareServiceLinks } from "@/components/software/SoftwareServiceLinks";
import { Section } from "@/components/Section";
import {
  CONVERSATIONAL_QUERIES,
  DEVELOPMENT_PROCESS,
  GEO_COPY,
  HERO,
  SEO_GEO_AEO,
  WEBSITE_DEV_FAQ,
  WEBSITE_DEV_KEYWORDS,
  WEBSITE_DEV_METADATA,
  WEBSITE_TYPES,
  WHO_THIS_IS_FOR,
  WHY_CUSTOM_BEATS_TEMPLATES,
} from "@/lib/software/website-development-page";

export const metadata = createPageMetadata({
  title: WEBSITE_DEV_METADATA.title,
  description: WEBSITE_DEV_METADATA.description,
  path: WEBSITE_DEV_METADATA.path,
  titleAbsolute: true,
  keywords: [...WEBSITE_DEV_KEYWORDS],
});

const PAGE_NAME = "Website Development";

export default function WebsiteDevelopmentPage() {
  return (
    <article>
      <SoftwareServiceStructuredData
        pageName={PAGE_NAME}
        path={WEBSITE_DEV_METADATA.path}
        faq={WEBSITE_DEV_FAQ}
        service={{
          name: "Website Development Services",
          serviceType: "Website Development",
          description: WEBSITE_DEV_METADATA.description,
          path: WEBSITE_DEV_METADATA.path,
          offers: WEBSITE_TYPES.map((type) => ({
            name: type.title,
            description: type.description,
          })),
        }}
      />

      <SoftwareServiceHero
        pageName={PAGE_NAME}
        path={WEBSITE_DEV_METADATA.path}
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        subheadline={HERO.subheadline}
        bullets={HERO.bullets}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
      />

      <Section
        id="who-this-is-for"
        title="Who this is for"
        subtitle="Businesses that need a professional web presence—not a generic template that looks like everyone else."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {WHO_THIS_IS_FOR.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="website-types"
        title="Website types we build"
        subtitle="From local service companies to nonprofits and campaign landing pages—each built for your goals."
        alt
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {WEBSITE_TYPES.map((type) => (
            <FeatureCard
              key={type.title}
              title={type.title}
              description={type.description}
              items={type.items}
            />
          ))}
        </div>
      </Section>

      <Section
        id="why-custom"
        title="Why custom websites beat generic templates"
        subtitle="Templates are fast to start—but expensive to outgrow. Custom development pays off in credibility, performance, and flexibility."
      >
        <BenefitGrid items={WHY_CUSTOM_BEATS_TEMPLATES} />
      </Section>

      <Section
        id="process"
        title="Website development process"
        subtitle="A structured path from discovery to launch—with SEO and conversion built in at every stage."
        alt
      >
        <ProcessSteps steps={DEVELOPMENT_PROCESS} />
      </Section>

      <Section
        id="seo-geo-aeo"
        title="SEO, GEO, and AEO built in"
        subtitle="Search visibility is not an add-on—it is part of how we architect every page."
      >
        <BenefitGrid items={SEO_GEO_AEO} />
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">{GEO_COPY}</p>
      </Section>

      <SoftwareServiceLinks excludeHref={WEBSITE_DEV_METADATA.path} alt />

      <Section
        id="faq"
        title="Website development FAQ"
        subtitle="Pricing, timelines, mobile design, SEO, and working with PixelNation."
        alt
      >
        <SoftwareServiceFaq
          items={WEBSITE_DEV_FAQ}
          conversationalQueries={CONVERSATIONAL_QUERIES}
          featuredAnswer={GEO_COPY}
        />
      </Section>

      <SoftwareServiceFooter relatedPath={WEBSITE_DEV_METADATA.path} />

      <SoftwareServiceCta
        description="Tell us about your business, audience, and goals. We will recommend the right website scope—and build something that earns trust and generates leads."
      />
    </article>
  );
}
