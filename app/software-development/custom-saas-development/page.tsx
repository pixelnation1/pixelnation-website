import { createPageMetadata } from "@/lib/seo/metadata";
import { PortfolioProjectCard } from "@/components/portfolio/PortfolioProjectCard";
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
import { Button } from "@/components/ui/Button";
import { getPortfolioProject } from "@/lib/portfolio";
import {
  CONVERSATIONAL_QUERIES,
  CUSTOM_SAAS_FAQ,
  CUSTOM_SAAS_KEYWORDS,
  CUSTOM_SAAS_METADATA,
  GEO_COPY,
  HERO,
  SAAS_PROCESS,
  SAAS_PRODUCTS,
  WHY_CUSTOM_SAAS,
} from "@/lib/software/custom-saas-development-page";

export const metadata = createPageMetadata({
  title: CUSTOM_SAAS_METADATA.title,
  description: CUSTOM_SAAS_METADATA.description,
  path: CUSTOM_SAAS_METADATA.path,
  titleAbsolute: true,
  keywords: [...CUSTOM_SAAS_KEYWORDS],
});

const PAGE_NAME = "Custom SaaS Development";

const FEATURED_SAAS_SLUGS = ["repairforge", "reconforge"] as const;

export default function CustomSaasDevelopmentPage() {
  const featuredProjects = FEATURED_SAAS_SLUGS.map((slug) => getPortfolioProject(slug)).filter(
    (project) => project !== undefined,
  );
  return (
    <article>
      <SoftwareServiceStructuredData
        pageName={PAGE_NAME}
        path={CUSTOM_SAAS_METADATA.path}
        faq={CUSTOM_SAAS_FAQ}
        service={{
          name: "Custom SaaS Development & Web Applications",
          serviceType: "SaaS Development",
          description: CUSTOM_SAAS_METADATA.description,
          path: CUSTOM_SAAS_METADATA.path,
          offers: SAAS_PRODUCTS.map((product) => ({
            name: product.title,
            description: product.description,
          })),
        }}
      />

      <SoftwareServiceHero
        pageName={PAGE_NAME}
        path={CUSTOM_SAAS_METADATA.path}
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        subheadline={HERO.subheadline}
        bullets={HERO.bullets}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
      />

      <Section
        id="saas-products"
        title="SaaS products we build"
        subtitle="From client portals to subscription platforms—software your users log into and rely on daily."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAAS_PRODUCTS.map((product) => (
            <FeatureCard
              key={product.title}
              title={product.title}
              description={product.description}
              items={product.items}
            />
          ))}
        </div>
      </Section>

      <Section
        id="why-saas"
        title="Why custom SaaS can create leverage"
        subtitle="Off-the-shelf tools cap your differentiation. Custom platforms become assets that scale with your business."
        alt
      >
        <BenefitGrid items={WHY_CUSTOM_SAAS} />
      </Section>

      <Section
        id="saas-process"
        title="SaaS development process"
        subtitle="Structured discovery, phased delivery, and architecture that supports growth after launch."
      >
        <ProcessSteps steps={SAAS_PROCESS} />
      </Section>

      <Section
        id="featured-projects"
        title="Featured SaaS projects"
        subtitle="Industry-specific platforms in development—RepairForge for repair shops and ReconForge for auto dealership recon workflows."
        alt
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <PortfolioProjectCard key={project.slug} project={project} compact />
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">{GEO_COPY}</p>
        <div className="mt-6">
          <Button href="/portfolio" variant="secondary">
            View full portfolio
          </Button>
        </div>
      </Section>

      <SoftwareServiceLinks excludeHref={CUSTOM_SAAS_METADATA.path} />

      <Section
        id="faq"
        title="Custom SaaS FAQ"
        subtitle="SaaS development, MVPs, technology choices, and working with PixelNation nationwide."
        alt
      >
        <SoftwareServiceFaq
          items={CUSTOM_SAAS_FAQ}
          conversationalQueries={CONVERSATIONAL_QUERIES}
          featuredAnswer={GEO_COPY}
        />
      </Section>

      <SoftwareServiceFooter relatedPath={CUSTOM_SAAS_METADATA.path} />

      <SoftwareServiceCta
        description="Whether you are validating an MVP or scaling an industry platform, we will help you scope the right SaaS build—and deliver software that solves real operational problems."
      />
    </article>
  );
}
