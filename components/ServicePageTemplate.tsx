import Image from "next/image";
import { FaqSection } from "@/components/faq/FaqSection";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { resolveRepairPageFaqs, toSchemaFaqs } from "@/lib/faq";
import type { RepairPageId } from "@/lib/faq/repair-pages";
import { SITE, type ServicePageData } from "@/lib/site";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const SHORT_PATH_TO_REPAIR_PAGE: Record<string, RepairPageId> = {
  "/phone-repair": "phone-repair",
  "/computer-repair": "computer-repair",
  "/console-repair": "console-repair",
  "/data-recovery": "data-recovery",
  "/board-repair": "board-repair",
  "/microsoldering-emporia-ks": "microsoldering",
  "/appliance-repair-emporia-ks": "appliance-repair",
};

type Props = {
  service: ServicePageData;
};

export function ServicePageTemplate({ service }: Props) {
  const crumbs = repairBreadcrumbs(service.title, service.shortPath);
  const repairPage = SHORT_PATH_TO_REPAIR_PAGE[service.shortPath] ?? "repairs";
  const faqItems = resolveRepairPageFaqs(repairPage, 8);

  return (
    <article>
      <PageStructuredData
        breadcrumbs={crumbs}
        faq={toSchemaFaqs(faqItems)}
        service={{
          name: service.title,
          serviceType: service.title,
          description: service.intro,
          path: service.shortPath,
          offers: service.capabilities.map((cap) => ({
            name: cap,
            description: cap,
          })),
        }}
      />

      <section className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0 order-1">
            <Breadcrumbs items={crumbs} />
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              {service.title} · Emporia, KS
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{service.intro}</p>
            <div className="cta-group mt-8">
              <Button href="/contact">Start a Repair</Button>
              <Button href="/contact" variant="secondary">
                Call {SITE.phone}
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <h2 id="capabilities-heading" className="text-2xl font-bold sm:text-3xl">
            What we handle
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.capabilities.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                <span className="mt-0.5 text-accent-secondary" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <RelatedLinks currentPath={service.shortPath} />
          </div>

          <div className="mt-12">
            <FaqSection
              items={faqItems}
              id="service-faq"
              showPeopleAlsoAsk
              initialVisible={6}
            />
          </div>

          <div className="mt-12 rounded-2xl border border-card-border bg-card p-8 text-center">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Contact PixelNation in Emporia for an evaluation and clear repair
              options—no pressure, just straight answers from experienced techs.
            </p>
            <div className="cta-group mt-6 justify-center">
              <Button href="/contact">Contact Us</Button>
              <Button href="/repairs" variant="secondary">
                All Repairs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
