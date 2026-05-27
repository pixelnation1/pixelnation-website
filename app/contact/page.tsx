import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ } from "@/components/FAQ";
import { ContactStructuredData } from "@/components/services/ContactStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  CONTACT_FAQ,
  CONTACT_METADATA,
  CONTACT_SERVICES,
  GOOGLE_MAPS_LINK,
  MAP_EMBED_URL,
} from "@/lib/contact-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: CONTACT_METADATA.title,
  description: CONTACT_METADATA.description,
  alternates: { canonical: CONTACT_METADATA.canonical },
  openGraph: {
    title: CONTACT_METADATA.title,
    description: CONTACT_METADATA.description,
    type: "website",
    url: CONTACT_METADATA.canonical,
  },
};

export default function ContactPage() {
  return (
    <article>
      <ContactStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0 order-1">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Contact</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              Contact PixelNation · Repair Shop Emporia KS
            </p>
            <h1
              id="contact-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Contact PixelNation in Emporia, KS
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Need help with a phone, computer, appliance, game console, data recovery,
              or board-level repair? Contact PixelNation and get expert support.
            </p>
            <div className="cta-group mt-8">
              <Button href={SITE.phoneHref} external>
                Call {SITE.phone}
              </Button>
              <Button href="#contact-form" variant="secondary">
                Start a Repair
              </Button>
            </div>
          </div>
          <div className="relative order-2 mx-auto flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-background p-4 lg:mx-0 lg:h-48 lg:w-48">
            <Image
              src="/images/pixellogo.png"
              alt="PixelNation repair shop in Emporia Kansas"
              fill
              className="object-contain object-center"
              sizes="192px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <Section
        id="contact-details"
        title="Contact information"
        subtitle="Reach PixelNation by phone, email, or the form below."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground">{SITE.name}</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase text-accent-secondary">
                  Location
                </dt>
                <dd className="mt-1 text-muted">{SITE.address.region}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-accent-secondary">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={SITE.phoneHref}
                    className="font-medium text-accent hover:underline"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-accent-secondary">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={SITE.emailHref}
                    className="font-medium text-accent-secondary hover:underline"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-accent-secondary">
                  Business hours
                </dt>
                <dd className="mt-1 text-muted">{SITE.hours}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase text-accent-secondary">
                Services
              </p>
              <ul className="mt-3 space-y-2">
                {CONTACT_SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-muted transition hover:text-accent"
                    >
                      {service.label}
                      <span className="sr-only"> — {service.keyword}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <nav
              className="cta-group mt-8 border-t border-card-border pt-6 text-sm"
              aria-label="Related pages"
            >
              <Link href="/repairs" className="text-accent-secondary hover:underline">
                Repairs overview
              </Link>
              <Link href="/track-repair" className="text-accent-secondary hover:underline">
                Track repair
              </Link>
            </nav>
          </div>

          <div
            id="contact-form"
            className="rounded-2xl border border-card-border bg-card p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-foreground">Send a message</h3>
            <p className="mt-2 text-sm text-muted">
              Tell us about your device and issue. We respond during business hours.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Why contact */}
      <Section
        id="why-contact"
        title="Get help from a local repair specialist"
        subtitle="Structured diagnostics and practical repair solutions in Emporia."
        alt
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          Whether you need a cracked screen replaced, a laptop repaired, an appliance
          diagnosed, a game console fixed, important data recovered, or advanced board-level
          repair, PixelNation provides structured diagnostics and practical repair
          solutions. We explain options and timing before work begins—so you can decide
          with confidence.
        </p>
        <div className="cta-group mt-8">
          <Button href="/repairs">View all repair services</Button>
          <Button href="/training" variant="secondary">
            Training courses
          </Button>
        </div>
      </Section>

      {/* Service areas */}
      <Section
        id="service-area"
        title="Serving Emporia and beyond"
        subtitle="Local drop-off and mail-in repair for customers nationwide."
      >
        <p className="-mt-6 max-w-3xl text-muted leading-relaxed">
          PixelNation serves customers in Emporia, Kansas and surrounding communities.
          Mail-in repair and data recovery services are also available for customers
          outside the local area—contact us first so we can confirm your device fits our
          services and share safe packing guidance.
        </p>
      </Section>

      {/* Map */}
      <Section
        id="map"
        title="Find us in Emporia, Kansas"
        subtitle="Local repair shop serving Emporia and the surrounding area."
        alt
      >
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
          <iframe
            title="PixelNation repair shop location in Emporia Kansas"
            src={MAP_EMBED_URL}
            className="aspect-[16/9] w-full min-h-[280px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p className="border-t border-card-border px-4 py-3 text-center text-sm text-muted">
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-secondary hover:underline"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </Section>

      {/* Quick answers */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="How to reach PixelNation and what we offer."
      >
        <div className="space-y-6">
          {AEO_ANSWERS.map((item) => (
            <article
              key={item.question}
              className="rounded-xl border border-card-border bg-card p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="font-semibold text-foreground" itemProp="name">
                {item.question}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-muted"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{item.answer}</span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        title="Common questions"
        subtitle="Starting a repair, mail-in service, response times, and tracking."
      >
        <FAQ items={CONTACT_FAQ} />
      </Section>

      {/* Final CTA */}
      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="contact-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="contact-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to get your device fixed?
          </h2>
          <p className="mt-3 text-muted">
            Contact PixelNation today to start your repair or ask a question.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href={SITE.phoneHref} external>
              Call {SITE.phone}
            </Button>
            <Button href="#contact-form" variant="secondary">
              Start a Repair
            </Button>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Service pages"
          >
            <Link href="/repairs" className="hover:text-accent">
              Repairs
            </Link>
            <Link href="/phone-repair" className="hover:text-accent">
              Phone Repair
            </Link>
            <Link href="/computer-repair" className="hover:text-accent">
              Computer Repair
            </Link>
            <Link href="/appliance-repair" className="hover:text-accent">
              Appliance Repair
            </Link>
            <Link href="/console-repair" className="hover:text-accent">
              Console Repair
            </Link>
            <Link href="/data-recovery" className="hover:text-accent">
              Data Recovery
            </Link>
            <Link href="/board-repair" className="hover:text-accent">
              Board Repair
            </Link>
            <Link href="/training" className="hover:text-accent">
              Training
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
