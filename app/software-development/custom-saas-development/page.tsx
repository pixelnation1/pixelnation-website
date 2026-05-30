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
  CUSTOM_SAAS_FAQ,
  CUSTOM_SAAS_KEYWORDS,
  CUSTOM_SAAS_METADATA,
  FEATURED_SAAS_PROJECTS,
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
  ogImage: HERO.image,
  ogImageAlt: HERO.imageAlt,
});

const PAGE_NAME = "Custom SaaS Development";

export default function CustomSaasDevelopmentPage() {
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
        image={HERO.image}
        imageAlt={HERO.imageAlt}
        secondaryCta={{ label: "View Software Services", href: "/software-development" }}
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
          {FEATURED_SAAS_PROJECTS.map((project) => (
            <article
              key={project.name}
              className="rounded-2xl border border-card-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                <span className="shrink-0 rounded-full border border-card-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground">
                Features
              </h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-card-border bg-background px-3 py-1 text-xs text-muted"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground">
                Technologies
              </h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-card-border bg-background px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">{GEO_COPY}</p>
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
