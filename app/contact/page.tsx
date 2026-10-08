import Link from "next/link";
import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/faq/FaqSection";
import { ContactStructuredData } from "@/components/services/ContactStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { CONTACT_METADATA, GOOGLE_MAPS_LINK, MAP_EMBED_URL } from "@/lib/contact-page";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadataFromLegacy(CONTACT_METADATA);
const { items: contactFaqs } = getRepairPageFaqBundle("contact");

export default function ContactPage() {
  return (
    <article>
      <ContactStructuredData />
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-10 sm:py-12"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Contact</span>
          </nav>
          <h1 id="contact-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Contact PixelNation
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Have a repair question? Looking for cards, an event, or a birthday party?
            Call, send us a message, or visit our downtown Emporia shop.
          </p>
          <div className="cta-group mt-6">
            <Button href={SITE.phoneHref} external>Call {SITE.phone}</Button>
            <Button href="#contact-form" variant="secondary">Send a Message</Button>
            <Button href={GOOGLE_MAPS_LINK} variant="secondary" external>Get Directions</Button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12" aria-label="Contact form and store information">
        <div className="mx-auto grid max-w-6xl min-w-0 items-start gap-6 px-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
          <div id="contact-form" className="min-w-0 scroll-mt-24 rounded-2xl border border-card-border bg-card p-5 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Choose your inquiry type and tell us how we can help. For urgent questions,
              call <a href={SITE.phoneHref} className="font-medium text-accent-secondary hover:underline">{SITE.phone}</a> during business hours.
            </p>
            <div className="mt-6"><ContactForm /></div>
            <details className="mt-6 border-t border-card-border pt-4">
              <summary className="cursor-pointer text-sm font-medium text-accent-secondary">About optional text-message updates</summary>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Complete the form below to contact PixelNation about a repair, appointment,
              order, product, or customer-support request. To receive text-message updates,
              enter your mobile phone number and manually check the optional SMS consent box
              in the form below. By checking the box, you agree to receive transactional and
              customer-care text messages from PixelNation regarding repair updates,
              diagnostic results, appointments, order status, delivery notifications, pickup
              notices, and customer support. Message frequency varies. Message and data rates
              may apply. Reply STOP to opt out at any time. Reply HELP for assistance, call
              or text 620-779-7158, or email support@pixelnation.co. Consent is not a
              condition of purchase. Please review our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-accent-secondary hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-of-service"
                className="font-medium text-accent-secondary hover:underline"
              >
                Terms of Service
              </Link>
              .
            </p>
            </details>
          </div>
          <aside className="min-w-0 rounded-2xl border border-card-border bg-card p-5 sm:p-8" aria-labelledby="store-details-heading">
            <h2 id="store-details-heading" className="text-2xl font-semibold tracking-tight">Call or visit</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase text-accent-secondary">
                  Location
                </dt>
                <dd className="mt-1 text-muted">
                  {SITE.address.streetLine1}
                  <br />
                  {SITE.address.cityStateZip}
                </dd>
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
                <dd className="mt-1 space-y-1 text-muted">
                  {SITE.businessHours.map(({ days, display }) => (
                    <div key={days}>{days}: {display}</div>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="cta-group mt-6">
              <Button href={GOOGLE_MAPS_LINK} variant="secondary" external>Get Directions</Button>
            </div>
            <p className="mt-6 border-t border-card-border pt-5 text-sm leading-relaxed text-muted">
              Need mail-in repair? Contact us before shipping so we can confirm your device
              fits our services and share packing instructions.
            </p>
          </aside>
        </div>
      </section>

      <Section id="map" title="Find us in downtown Emporia" subtitle={`${SITE.address.streetLine1}, ${SITE.address.cityStateZip}`} alt>
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
          <iframe
            title={`PixelNation at ${SITE.address.streetLine1} in Emporia, Kansas`}
            src={MAP_EMBED_URL}
            className="h-72 w-full border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <FaqSection items={contactFaqs} id="contact-faq" title="Contact & mail-in FAQ" />
      </div>
    </article>
  );
}
