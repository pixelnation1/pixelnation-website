import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Meet the repair team",
  description: "Nathan Jobe, founder and repair technician",
  path: "/team",
});

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">Emporia, Kansas</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Meet the repair team</h1>
      <h2 className="mt-8 text-2xl font-semibold">Nathan Jobe, founder and repair technician</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">Nate brings over 20 years of hands-on repair experience to PixelNation. His work spans appliance diagnostics, console HDMI replacement, microsoldering and data recovery. Describe what happened to your device and the team will help you figure out the next step.</p>
      <div className="cta-group mt-8"><Button href="/contact">Contact the shop</Button></div>
    </article>
  );
}
