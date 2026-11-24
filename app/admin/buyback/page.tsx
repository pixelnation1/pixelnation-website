import Link from "next/link";
import { redirect } from "next/navigation";
import { isTradeAdminAuthenticated } from "@/lib/trade/auth";
import { buybackDb, listCatalog } from "@/lib/buyback/store";
import { formatOffer, panelClass, type Quote, type Resale } from "@/lib/buyback/model";
import { CatalogForm, PriceLookup, PricingCalculator, QuoteUpdateForm, ResaleForm } from "./StaffForms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Buyback queue", robots: { index: false, follow: false } };

export default async function AdminBuybackPage() {
  if (!(await isTradeAdminAuthenticated())) redirect("/admin/login");
  const records = await Promise.all([
    listCatalog(false),
    buybackDb().from("buyback_quotes").select("*").order("created_at", { ascending: false }).limit(100),
  ]).catch(() => null);

  if (!records || records[1].error)
    return <p className="mx-auto max-w-5xl px-4 py-12">The buyback database is unavailable. Check the Supabase configuration and migration.</p>;

  const [catalog, { data }] = records;
  const quotes = data as Quote[];
  const paidTokens = quotes.filter((quote) => quote.status === "Paid").map((quote) => quote.token);
  const resale = paidTokens.length
    ? await buybackDb().from("buyback_resale").select("*").in("quote_token", paidTokens).limit(2000)
    : { data: [], error: null };
  const resaleByItem = new Map((resale.data as Resale[] | null)?.map((item) => [`${item.quote_token}:${item.item_index}`, item]));
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold">Buyback queue</h1>
      <section className={panelClass}>
        <h2 className="text-xl font-semibold">Price guide lookup</h2>
        <PriceLookup />
      </section>
      <section className={panelClass}>
        <h2 className="text-xl font-semibold">Buy price calculator</h2>
        <p className="text-sm text-muted">Use eBay sold comps for the exact edition and condition. Enter the costs for the way you plan to list it.</p>
        <PricingCalculator />
      </section>
      <section className={panelClass}>
        <h2 className="text-xl font-semibold">Buy list</h2>
        <details className="mt-3"><summary className="cursor-pointer">Add a buy price</summary><CatalogForm /></details>
        {catalog.map((entry) => <details className="mt-3 border-t border-white/10 pt-3" key={entry.id}>
          <summary className="cursor-pointer">{entry.title} · {entry.platform} · {entry.edition} · {entry.condition} · {formatOffer(entry.offer_cents)} · {entry.active ? "Published" : "Paused"}</summary>
          <CatalogForm entry={entry} />
        </details>)}
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recent quotes</h2>
        {!quotes.length && <p className="text-muted">No submissions yet.</p>}
        {quotes.map((quote) => <article key={quote.token} className={`${panelClass} space-y-3`}>
          <h3 className="font-semibold">{quote.name} · {quote.status}</h3>
          <p><a href={`mailto:${quote.email}`} className="text-accent">{quote.email}</a> · <Link className="text-accent" href={`/sell-games-consoles/quote/${quote.token}`}>Customer quote link</Link></p>
          <ul className="space-y-1">
            {quote.items.map((item, index) => <li key={index}>{item.description} · {item.condition} · {item.estimate === null ? "Manual review" : formatOffer(item.estimate)}</li>)}
          </ul>
          {quote.notes && <p className="whitespace-pre-wrap text-muted">{quote.notes}</p>}
          {quote.final_cents !== null && <p>Final offer {formatOffer(quote.final_cents)} · {quote.offer_reason}</p>}
          {quote.status === "Paid" && (resale.error ? <p>Resale details are temporarily unavailable.</p> : <div className="space-y-2">
            <h4 className="font-semibold text-accent">eBay resale</h4>
            {quote.items.map((item, index) => <details key={index}>
              <summary className="cursor-pointer">{item.description}</summary>
              <ResaleForm token={quote.token} index={index} record={resaleByItem.get(`${quote.token}:${index}`)} />
            </details>)}
          </div>)}
          <QuoteUpdateForm token={quote.token} current={quote.status} />
        </article>)}
      </section>
    </div>
  );
}
