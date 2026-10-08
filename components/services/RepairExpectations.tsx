import Link from "next/link";
import { SITE } from "@/lib/site";

const steps = [
  { title: "Assessment & estimate", body: "We inspect the device and explain the repair options and pricing. Ask about any diagnostic or assessment charge before leaving or shipping your device." },
  { title: "Your approval", body: "Review the proposed work and quote before the repair proceeds. If the scope changes, we explain the next steps before additional work." },
  { title: "Timing & updates", body: "Timing depends on the fault, parts availability, and repair queue. We confirm an estimated turnaround after diagnostics; shipping adds time for mail-in repairs." },
  { title: "Warranty details", body: "Warranty coverage depends on the repair and device condition. Ask us to explain the applicable coverage and exclusions before approving work." },
];

export function RepairExpectations() {
  return (
    <section className="border-b border-card-border px-4 py-10 sm:py-12" aria-labelledby="repair-expectations-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="repair-expectations-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Before your repair</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="rounded-xl border border-card-border bg-card p-5">
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Visit us at {SITE.address.streetLine1}, {SITE.address.cityStateZip}. For mail-in service,
          appliances, or larger equipment, <a href={SITE.phoneHref} className="font-medium text-accent-secondary hover:underline">call {SITE.phone}</a> first
          to confirm we can accept your item and get intake or packing instructions.
          See <Link href="/contact" className="font-medium text-accent-secondary hover:underline">store hours and directions</Link>.
        </p>
      </div>
    </section>
  );
}
