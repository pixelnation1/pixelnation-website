import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About PixelNation",
  description: "An independent repair shop in downtown Emporia",
  path: "/about",
});

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">Emporia, Kansas</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About PixelNation</h1>
      <h2 className="mt-8 text-2xl font-semibold">An independent repair shop in downtown Emporia</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">PixelNation grew out of hands-on repair work dating back to 2007. Today our bench handles everything from broken charging ports to motherboard faults. If a device holds photos or files you need, tell us up front so we can put recovery first.</p>
      <div className="cta-group mt-8"><Button href="/repairs">Explore repairs</Button></div>
    </article>
  );
}
