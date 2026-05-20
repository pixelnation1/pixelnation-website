import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const pageUrl = `${SITE.domain}/phone-repair`;

export const metadata: Metadata = {
  title: {
    absolute:
      "Phone Repair in Emporia, KS | iPhone, Samsung & Charging Port Repair | PixelNation",
  },
  description:
    "Professional phone repair in Emporia, KS for iPhone, Samsung, and other smartphones. Screen replacement, battery replacement, charging port repair, water damage, and board-level diagnostics.",
  alternates: {
    canonical: "/phone-repair",
  },
  openGraph: {
    title:
      "Phone Repair in Emporia, KS | iPhone, Samsung & Charging Port Repair | PixelNation",
    description:
      "Professional phone repair in Emporia, KS for iPhone, Samsung, and other smartphones. Screen replacement, battery replacement, charging port repair, water damage, and board-level diagnostics.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "/images/phonerepairlogo.png",
        alt: "Professional phone repair in Emporia, KS at PixelNation",
      },
    ],
  },
};

const heroBullets = [
  "Screen replacement",
  "Battery replacement",
  "Charging port repair",
  "Camera repair",
  "Speaker and microphone repair",
  "Water damage recovery",
  "No power diagnostics",
  "Data recovery",
  "Board-level microsoldering",
];

const commonProblems = [
  "Cracked or shattered screens",
  "Battery draining quickly",
  "Phone not charging",
  "Loose charging ports",
  "No power",
  "Boot loops",
  "Face ID or fingerprint issues",
  "Camera problems",
  "Speaker and microphone issues",
  "Water damage",
  "Data recovery needs",
];

const services = [
  {
    title: "Screen Replacement",
    body: "Cracked glass, damaged OLED or LCD panels, touch issues, and display lines on iPhone, Samsung Galaxy, Google Pixel, and other smartphones.",
  },
  {
    title: "Battery Replacement",
    body: "Weak batteries, sudden shutdowns, swelling concerns, slow charging, and phones that no longer last through the day.",
  },
  {
    title: "Charging Port Repair",
    body: "Loose ports, intermittent charging, damaged connectors, debris-related failures, and deeper charging-circuit faults.",
  },
  {
    title: "Camera Repair",
    body: "Rear camera, selfie camera, focus, shaking, black-screen camera, and lens-related problems after drops or impact.",
  },
  {
    title: "Speaker & Microphone Repair",
    body: "Low call volume, distorted audio, muffled microphones, speakerphone problems, and audio issues after dust or liquid exposure.",
  },
  {
    title: "Back Glass Repair",
    body: "Broken rear glass and housing damage that can expose internal parts to dust, moisture, and further impact damage.",
  },
  {
    title: "Water Damage Recovery",
    body: "Careful liquid-damage assessment, corrosion treatment, power-path testing, and recovery-focused repair options.",
  },
  {
    title: "Data Recovery",
    body: "Recovery paths for important photos, videos, contacts, and documents when a phone will not power on or boot normally.",
  },
  {
    title: "Board-Level Repair",
    body: "Microsoldering phone repair for damaged circuits, failed charging ICs, connector faults, shorts, traces, and pads.",
  },
];

const boardRepairExamples = [
  "Tristar and charging IC failures",
  "Short circuit diagnosis",
  "Connector replacement",
  "Trace and pad repair",
  "Power rail troubleshooting",
  "CPU and NAND related diagnostics",
];

const devices = [
  "iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "Motorola",
  "OnePlus",
];

const faqItems = [
  {
    question: "How long does phone repair take?",
    answer:
      "Many common phone repairs can be completed the same business day when parts are available. Advanced board-level phone repair, water damage recovery, and data recovery may take longer because the device needs careful testing before and after repair.",
  },
  {
    question: "Do you repair charging ports?",
    answer:
      "Yes. PixelNation handles charging port repair in Emporia, KS for iPhone, Samsung Galaxy, Google Pixel, Motorola, OnePlus, and other smartphones. If the issue is not the port itself, we can test the battery, cable path, charging circuit, and board-level components.",
  },
  {
    question: "Can you fix water-damaged phones?",
    answer:
      "PixelNation works on water-damaged phones and liquid-exposed devices. Results depend on corrosion, power damage, and how long the phone has been exposed, but proper diagnostics can often identify a repair or data recovery path.",
  },
  {
    question: "Do you perform board-level repair?",
    answer:
      "Yes. PixelNation performs board-level phone repair and microsoldering for shorted lines, failed charging ICs, damaged connectors, torn pads, broken traces, and no-power faults.",
  },
  {
    question: "Can you recover photos from a dead phone?",
    answer:
      "Often, yes. If the storage is intact, PixelNation may be able to recover photos, videos, contacts, and documents by repairing the phone enough to access data or by using a recovery-focused repair approach.",
  },
  {
    question: "Do you repair iPhones and Samsung devices?",
    answer:
      "Yes. PixelNation repairs iPhone and Samsung devices, along with Google Pixel, Motorola, OnePlus, iPad, tablets, and other smartphones.",
  },
];

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-lg border border-card-border bg-card px-4 py-3 text-sm leading-relaxed text-muted"
        >
          <span className="mt-0.5 font-semibold text-accent-secondary" aria-hidden>
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  subtitle,
  children,
  alt = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${alt ? "bg-card/45" : ""}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 leading-relaxed text-muted">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function phoneRepairSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.domain}/#localbusiness`,
    name: SITE.name,
    url: SITE.domain,
    image: `${SITE.domain}/images/pixellogo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    description:
      "Professional phone repair, board-level repair, microsoldering, charging port repair, and data recovery in Emporia, Kansas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Emporia",
      addressRegion: "KS",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    priceRange: "$$",
    knowsAbout: [
      "Phone Repair Emporia KS",
      "iPhone Repair Emporia KS",
      "Samsung Repair Emporia KS",
      "Screen Repair Emporia KS",
      "Battery Replacement Emporia KS",
      "Charging Port Repair Emporia KS",
      "Water Damage Repair Emporia KS",
      "Board-Level Phone Repair",
      "Microsoldering Phone Repair",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Phone Repair",
    serviceType: "Phone Repair",
    description:
      "Phone repair in Emporia, Kansas for iPhone, Samsung, and other smartphones, including screen replacement, battery replacement, charging port repair, water damage recovery, data recovery, and board-level diagnostics.",
    provider: {
      "@id": `${SITE.domain}/#localbusiness`,
    },
    areaServed: {
      "@type": "City",
      name: "Emporia",
      addressRegion: "KS",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Phone Repair Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.body,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Repairs",
        item: `${SITE.domain}/repairs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Phone Repair",
        item: pageUrl,
      },
    ],
  };

  return [localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema];
}

export default function PhoneRepairPage() {
  return (
    <>
      {phoneRepairSchema().map((schema) => (
        <JsonLdScript key={schema["@type"]} data={schema} />
      ))}

      <article>
        <section className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="min-w-0 order-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Phone Repair Emporia KS
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Professional Phone Repair in Emporia, KS
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                From cracked screens and weak batteries to charging port failures
                and board-level faults, PixelNation repairs smartphones with
                precision and real diagnostic experience.
              </p>
              <div className="mt-7">
                <CheckList items={heroBullets} />
              </div>
              <div className="cta-group mt-8">
                <Button href="/contact">Start a Repair</Button>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center rounded-lg border border-card-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary"
                >
                  Call {SITE.phone}
                </a>
              </div>
            </div>
            <div className="order-2 flex w-full min-w-0 justify-center lg:justify-end">
              <div className="relative flex aspect-[4/3] w-full max-w-[380px] min-h-[240px] items-center justify-center overflow-hidden rounded-lg border border-card-border bg-background p-2 sm:max-w-[420px] sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]">
              <Image
                src="/images/phonerepairlogo.png"
                alt="PixelNation phone repair in Emporia KS for screens batteries charging ports and board-level diagnostics"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
              </div>
            </div>
          </div>
        </section>

        <Section
          title="Common Phone Problems We Fix"
          subtitle="If your phone is cracked, unreliable, not charging, or showing signs of liquid damage, PixelNation can trace the issue and explain the best repair path."
        >
          <CheckList items={commonProblems} />
        </Section>

        <Section
          title="Phone Repair Services"
          subtitle="PixelNation provides practical smartphone repair in Emporia, KS for the problems customers deal with every day, plus advanced repairs for faults hidden below the surface."
          alt
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-card-border bg-background/70 p-5"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="When a Simple Part Replacement Isn't Enough"
          subtitle="Some phone issues are caused by damaged circuits, failed components, shorted power rails, or torn pads and traces. PixelNation performs advanced microsoldering and board-level repair to diagnose and repair problems that many shops cannot handle."
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-card-border bg-card">
              <Image
                src="/images/microsoldering.png"
                alt="Microsoldering phone repair and board-level diagnostics for damaged smartphone circuits"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 46vw"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Board-Level Phone Repair
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                Microsoldering for charging, power, and logic board faults
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                A new screen, battery, or charging port is not always enough. If
                a phone has no power, boot loops, liquid damage, damaged
                connectors, or a charging circuit failure, board-level testing
                helps identify the real cause before parts are replaced.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {boardRepairExamples.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/board-repair" variant="secondary">
                  Board Repair
                </Button>
                <Button href="/contact" variant="outline">
                  Ask About Microsoldering
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Apple & Android Devices We Repair"
          subtitle="PixelNation works on common Apple and Android phones, including popular devices used by customers throughout Emporia and the surrounding area."
          alt
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <div
                key={device}
                className="rounded-lg border border-card-border bg-background/70 px-5 py-4 font-semibold"
              >
                {device}
              </div>
            ))}
            <Link
              href="/data-recovery"
              className="rounded-lg border border-card-border bg-background/70 px-5 py-4 font-semibold transition hover:border-accent-secondary hover:text-accent-secondary"
            >
              iPad and tablets
            </Link>
          </div>
        </Section>

        <Section title="Not Every Charging Problem Requires a New Phone">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-card-border bg-card p-6">
              <h3 className="text-xl font-semibold">
                Repair can be the smarter first step
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                Many charging, battery, power, and water damage issues can be
                repaired for far less than replacing the device. Proper
                diagnostics help determine whether the failure is a worn battery,
                damaged port, liquid exposure, circuit fault, or software-related
                behavior.
              </p>
            </div>
            <div className="rounded-lg border border-card-border bg-card p-6">
              <h3 className="text-xl font-semibold">
                Better answers before bigger decisions
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                PixelNation focuses on finding the true cause of the problem, so
                you can make a clear decision about repair, recovery, replacement,
                or preserving data before the phone gets worse.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Data Recovery From Phones"
          subtitle="If your phone will not power on or has suffered liquid damage, PixelNation may be able to recover important photos, videos, contacts, and documents."
          alt
        >
          <div className="rounded-lg border border-card-border bg-background/70 p-6 md:p-8">
            <p className="max-w-3xl leading-relaxed text-muted">
              Dead phones are not always lost causes. In some cases, the best
              path is to repair the phone enough to access the data safely. That
              may involve battery testing, charging-path repair, liquid damage
              cleanup, board-level diagnostics, or a recovery-focused repair
              designed around protecting the storage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/data-recovery">Data Recovery</Button>
              <Button href="/contact" variant="outline">
                Start a Recovery Case
              </Button>
            </div>
          </div>
        </Section>

        <Section
          title="Phone Repair FAQ"
          subtitle="Straight answers to common questions about iPhone repair, Samsung repair, charging port repair, water damage, data recovery, and board-level repair in Emporia, KS."
        >
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-card-border bg-card"
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-accent-secondary transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-card-border px-5 py-4 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <section className="border-t border-card-border py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Need Your Phone Repaired?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted">
              Get expert diagnostics and repair from PixelNation in Emporia,
              Kansas.
            </p>
            <div className="cta-group mt-8 justify-center">
              <Button href="/contact">Start a Repair</Button>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center rounded-lg border border-card-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary"
              >
                Call {SITE.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted">
              <Link href="/repairs" className="hover:text-accent-secondary">
                Repairs Overview
              </Link>
              <Link href="/board-repair" className="hover:text-accent-secondary">
                Board Repair
              </Link>
              <Link href="/data-recovery" className="hover:text-accent-secondary">
                Data Recovery
              </Link>
              <Link href="/contact" className="hover:text-accent-secondary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
