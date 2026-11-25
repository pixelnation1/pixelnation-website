import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonClass, formatOffer, panelClass } from "@/lib/buyback/model";
import { getQuote } from "@/lib/buyback/store";
import { respondToOffer } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your buyback quote",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function QuotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const quote = await getQuote(token);
  if (!quote) notFound();
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold">Your buyback quote</h1>
      <p className="text-muted">Save this private link to check your quote and respond to your offer.</p>
      <section className={`${panelClass} space-y-3`}>
        <p className="font-semibold">Status · {quote.status}</p>
        <ul className="space-y-2">
          {quote.items.map((item, index) => <li key={index}>{item.description} · {item.condition} · {item.estimate === null ? "Manual review" : formatOffer(item.estimate)}</li>)}
        </ul>
        {quote.status === "Submitted" && <p>Bring the quoted items to PixelNation in Emporia for inspection.</p>}
        {quote.final_cents !== null && <p className="font-semibold">Final cash offer {formatOffer(quote.final_cents)}</p>}
        {quote.offer_reason && <p className="whitespace-pre-wrap">{quote.offer_reason}</p>}
        {quote.status === "Offer ready" && (
          <form action={respondToOffer} className="flex flex-wrap gap-3">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="amount" value={quote.final_cents ?? ""} />
            <button className={buttonClass} name="decision" value="Accepted">Accept offer</button>
            <button className="rounded-lg border border-white/20 px-4 py-2" name="decision" value="Declined">Decline offer</button>
          </form>
        )}
      </section>
    </div>
  );
}
