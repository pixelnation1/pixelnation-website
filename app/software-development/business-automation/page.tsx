import { createPageMetadata } from "@/lib/seo/metadata";
import {
  SoftwareServiceCta,
  SoftwareServiceFaq,
  SoftwareServiceFooter,
  SoftwareServiceHero,
  SoftwareServiceStructuredData,
  FeatureCard,
  BenefitGrid,
} from "@/components/software/SoftwareServiceSections";
import { SoftwareServiceLinks } from "@/components/software/SoftwareServiceLinks";
import { Section } from "@/components/Section";
import {
  AUTOMATION_SERVICES,
  BUSINESS_AUTOMATION_FAQ,
  BUSINESS_AUTOMATION_KEYWORDS,
  BUSINESS_AUTOMATION_METADATA,
  CONVERSATIONAL_QUERIES,
  GEO_COPY,
  HERO,
  PROBLEMS_WE_SOLVE,
  WHY_AUTOMATION_PROFITABILITY,
} from "@/lib/software/business-automation-page";

export const metadata = createPageMetadata({
  title: BUSINESS_AUTOMATION_METADATA.title,
  description: BUSINESS_AUTOMATION_METADATA.description,
  path: BUSINESS_AUTOMATION_METADATA.path,
  titleAbsolute: true,
  keywords: [...BUSINESS_AUTOMATION_KEYWORDS],
});

const PAGE_NAME = "Business Automation";

export default function BusinessAutomationPage() {
  return (
    <article>
      <SoftwareServiceStructuredData
        pageName={PAGE_NAME}
        path={BUSINESS_AUTOMATION_METADATA.path}
        faq={BUSINESS_AUTOMATION_FAQ}
        service={{
          name: "Business Automation Systems & Workflow Software",
          serviceType: "Business Automation",
          description: BUSINESS_AUTOMATION_METADATA.description,
          path: BUSINESS_AUTOMATION_METADATA.path,
          offers: AUTOMATION_SERVICES.map((service) => ({
            name: service.title,
            description: service.description,
          })),
        }}
      />

      <SoftwareServiceHero
        pageName={PAGE_NAME}
        path={BUSINESS_AUTOMATION_METADATA.path}
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        subheadline={HERO.subheadline}
        bullets={HERO.bullets}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
      />

      <Section
        id="problems"
        title="Problems we solve"
        subtitle="If your team is drowning in manual work, disconnected tools, or stale reports—we build systems that fix the root cause."
      >
        <BenefitGrid items={PROBLEMS_WE_SOLVE} />
      </Section>

      <Section
        id="automation-services"
        title="Automation services"
        subtitle="CRM workflows, dashboards, reporting, inventory, and employee tools—built for how your operation actually runs."
        alt
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_SERVICES.map((service) => (
            <FeatureCard
              key={service.title}
              title={service.title}
              description={service.description}
              items={service.items}
            />
          ))}
        </div>
      </Section>

      <Section
        id="profitability"
        title="Why automation improves profitability"
        subtitle="Less busywork, fewer errors, faster decisions—and operations that scale without proportional headcount."
      >
        <BenefitGrid items={WHY_AUTOMATION_PROFITABILITY} />
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">{GEO_COPY}</p>
      </Section>

      <SoftwareServiceLinks excludeHref={BUSINESS_AUTOMATION_METADATA.path} alt />

      <Section
        id="faq"
        title="Business automation FAQ"
        subtitle="Process automation, CRM builds, integrations, timelines, and nationwide service."
        alt
      >
        <SoftwareServiceFaq
          items={BUSINESS_AUTOMATION_FAQ}
          conversationalQueries={CONVERSATIONAL_QUERIES}
          featuredAnswer={GEO_COPY}
        />
      </Section>

      <SoftwareServiceFooter relatedPath={BUSINESS_AUTOMATION_METADATA.path} />

      <SoftwareServiceCta
        description="Describe the workflows slowing your team down. We will identify automation opportunities and build systems that save time, reduce errors, and improve visibility."
      />
    </article>
  );
}
