import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Why choose PixelNation?",
  description: "Know what failed and what it costs to fix",
  path: "/why-choose-pixelnation",
});

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">Emporia, Kansas</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Why choose PixelNation?</h1>
      <h2 className="mt-8 text-2xl font-semibold">Know what failed and what it costs to fix</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">We check the symptoms, explain what we find and quote the work before you decide. A damaged port or a failed component can often be repaired at the board level. If replacement makes more sense, we’ll explain why.</p>
      <div className="cta-group mt-8"><Button href="/contact">Start a repair</Button></div>
    </article>
  );
}
