import Link from "next/link";
import { SITE } from "@/lib/site";

const destinations = [
  { href: "/", label: "Home" },
  { href: "/repairs", label: "Repair Services" },
  { href: "/events", label: "Gaming & Events" },
  { href: "/trade-values", label: "Trade-In Information" },
];

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24" aria-labelledby="not-found-heading">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-secondary">Page not found · 404</p>
      <h1 id="not-found-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Let’s get you to the right place.</h1>
      <p className="mt-4 text-muted leading-relaxed">This link may be outdated, or the page may have moved. Choose where you’d like to go:</p>
      <nav aria-label="Find a page" className="mt-6 grid gap-3 sm:grid-cols-2">
        {destinations.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-xl border border-card-border bg-card px-5 py-4 font-medium hover:border-accent-secondary hover:text-accent-secondary">{item.label}</Link>
        ))}
      </nav>
      <p className="mt-8 text-sm text-muted">Need a hand? <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center font-medium text-accent-secondary hover:underline">Call {SITE.phone}</a> or <Link href="/contact" className="inline-flex min-h-11 items-center font-medium text-accent-secondary hover:underline">contact PixelNation</Link>.</p>
    </section>
  );
}
