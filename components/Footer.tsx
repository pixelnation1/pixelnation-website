import Image from "next/image";
import Link from "next/link";
import { FOOTER_COMPANY_LINKS, FOOTER_SERVICE_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/pixellogo.png"
              alt={`${SITE.name} logo`}
              width={160}
              height={48}
              className="mb-4 h-10 w-auto"
            />
            <p className="text-sm leading-relaxed text-muted">
              Professional repair in {SITE.address.region}—phones, computers,
              consoles, appliances, data recovery, and board-level work.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Services
            </h2>
            <ul className="space-y-2 text-sm text-muted">
              {FOOTER_SERVICE_LINKS.map(
                (link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-accent-secondary">
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Company
            </h2>
            <ul className="mb-6 space-y-2 text-sm text-muted">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Visit
            </h2>
            <ul className="space-y-2 text-sm text-muted">
              <li>{SITE.address.region}</li>
              <li>
                <a href={SITE.phoneHref} className="hover:text-accent-secondary">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="hover:text-accent-secondary">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Get started
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-background hover:bg-accent-hover"
              >
                Start a Repair
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-card-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
