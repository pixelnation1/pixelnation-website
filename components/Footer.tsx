import Image from "next/image";
import Link from "next/link";
import { FOOTER_LEGAL_LINKS, SITE } from "@/lib/site";
import { GOOGLE_MAPS_LINK } from "@/lib/contact-page";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Repairs", href: "/repairs" },
      { label: "Trading Cards", href: "/trading-cards" },
      { label: "Gaming & Events", href: "/events" },
      { label: "Buy, Sell & Trade", href: "/buy-sell-trade" },
      { label: "Birthday Parties", href: "/birthday-parties" },
    ],
  },
  {
    title: "PixelNation",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Meet the Team", href: "/team" },
      { label: "Training", href: "/training" },
      { label: "Software & Websites", href: "/software-development" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-card print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1fr_0.8fr_0.8fr_1.4fr] lg:gap-8">
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Image
              src="/images/pixellogo.png"
              alt={`${SITE.name} logo`}
              width={160}
              height={48}
              className="mb-4 h-10 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Electronics repair, trading cards, and community gaming in downtown Emporia.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover"
            >
              Contact Us
            </Link>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`Footer ${group.title}`} className="min-w-0">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                {group.title}
              </h2>
              <ul className="text-sm text-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center py-2 hover:text-accent-secondary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 min-w-0 lg:col-span-1">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Visit Us</h2>
            <address className="text-sm not-italic leading-relaxed text-muted">
              {SITE.address.streetLine1}<br />{SITE.address.cityStateZip}
              <div className="mt-2">
                <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center hover:text-accent-secondary">{SITE.phone}</a>
                <br />
                <a href={SITE.emailHref} className="inline-flex min-h-11 items-center break-all hover:text-accent-secondary">{SITE.email}</a>
              </div>
            </address>
            <dl className="mt-3 space-y-2 text-sm text-muted">
              {SITE.businessHours.map(({ days, display }) => (
                <div key={days} className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                  <dt>{days}</dt><dd>{display}</dd>
                </div>
              ))}
            </dl>
            <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent-secondary hover:underline">
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-card-border pt-5 text-center text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4">
            {FOOTER_LEGAL_LINKS.filter((link) => link.href !== "/contact").map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center hover:text-accent-secondary">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
