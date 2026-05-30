import Image from "next/image";
import Link from "next/link";

import { FaqSection } from "@/components/faq/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { SoftwareDevelopmentStructuredData } from "@/components/services/SoftwareDevelopmentStructuredData";
import { SoftwareServiceLinks } from "@/components/software/SoftwareServiceLinks";
import { PortfolioProjectCard } from "@/components/software/PortfolioProjectCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import {
  AEO_ANSWERS,
  CONVERSATIONAL_QUERIES,
  GEO_COPY,
  HERO_BULLETS,
  INDUSTRIES,
  PORTFOLIO_PROJECTS,
  SERVICE_OFFERINGS,
  SOFTWARE_DEV_FAQ,
  SOFTWARE_DEV_KEYWORDS,
  SOFTWARE_DEV_METADATA,
  WHY_WORK_WITH_US,
} from "@/lib/software-development-page";

export const metadata = createPageMetadata({
  title: SOFTWARE_DEV_METADATA.title,
  description: SOFTWARE_DEV_METADATA.description,
  path: SOFTWARE_DEV_METADATA.path,
  titleAbsolute: true,
  keywords: [...SOFTWARE_DEV_KEYWORDS],
  ogImage: "/images/computerrepair.png",
  ogImageAlt: "Custom software development and website design by PixelNation",
});

export default function SoftwareDevelopmentPage() {
  const faqItems = SOFTWARE_DEV_FAQ.map((item) => ({ ...item }));

  return (
    <article>
      <SoftwareDevelopmentStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="software-dev-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Software Development</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Custom Software · SaaS · Web Applications · Nationwide
            </p>
            <h1
              id="software-dev-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Custom Software Development &amp; Modern Websites
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We help businesses grow with custom software, SaaS platforms, automation
              tools, client portals, dashboards, and high-performance websites built
              specifically for their needs.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="cta-group mt-8">
              <Button href="/contact">Request a Consultation</Button>
              <Button href="#portfolio" variant="secondary">
                View Our Portfolio
              </Button>
            </div>
          </div>
          <div className="relative order-2 mx-auto aspect-square w-full max-w-md min-w-0 lg:max-w-none">
            <Image
              src="/images/computerrepair.png"
              alt="Custom software development, SaaS platforms, and website design by PixelNation"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <Section
        id="services"
        title="Services we offer"
        subtitle="From marketing websites to full SaaS platforms—built for performance, scalability, and real business outcomes."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_OFFERINGS.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col rounded-2xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-4 text-sm font-semibold text-accent">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section
        id="industries"
        title="Industries we serve"
        subtitle="We build technology solutions for operators who need software that matches how their business actually runs."
        alt
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry}
              className="rounded-xl border border-card-border bg-background px-4 py-4 text-center text-sm font-medium text-foreground"
            >
              {industry}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">{GEO_COPY}</p>
      </Section>

      <SoftwareServiceLinks
        title="Dedicated service pages"
        subtitle="Explore website development, custom SaaS, and business automation in depth."
      />

      {/* Portfolio */}
      <Section
        id="portfolio"
        title="Featured projects"
        subtitle="A growing portfolio of SaaS platforms, business tools, and custom web applications—more case studies coming soon."
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <PortfolioProjectCard
              key={project.name}
              project={project}
              priorityImage={index < 2}
            />
          ))}
        </div>
      </Section>

      {/* Why PixelNation */}
      <Section
        id="why-pixelnation"
        title="Why work with PixelNation"
        subtitle="Technical depth from a company that builds real systems—not just pages."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_WORK_WITH_US.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-background p-5"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* AEO */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Common questions about our software development services."
      >
        <div className="space-y-4">
          {AEO_ANSWERS.map((item) => (
            <article
              key={item.question}
              className="rounded-xl border border-card-border bg-card p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="text-base font-semibold text-foreground" itemProp="name">
                {item.question}
              </h3>
              <div
                className="mt-2 text-sm leading-relaxed text-muted"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p itemProp="text">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="software-dev-faq"
        title="Software development FAQ"
        subtitle="Pricing, SaaS, automation, support, and working with PixelNation from anywhere in the United States."
        alt
      >
        <FaqSection
          items={faqItems}
          id="software-dev-faq-accordion"
          title="Frequently asked questions"
          conversationalQueries={[...CONVERSATIONAL_QUERIES]}
          featuredAnswer={GEO_COPY}
          showPeopleAlsoAsk
        />
      </Section>

      {/* Related links */}
      <section className="border-t border-card-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <RelatedLinks
            currentPath="/software-development"
            title="Explore PixelNation"
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="consultation"
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="software-dev-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="software-dev-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Let&apos;s Build Something Powerful
          </h2>
          <p className="mt-3 text-muted">
            Tell us about your website, SaaS idea, or automation challenge. We&apos;ll
            recommend a practical path forward—whether you need a focused MVP or a
            full-scale platform.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Schedule a Consultation</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
            <Button href="/about" variant="outline">
              About PixelNation
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
