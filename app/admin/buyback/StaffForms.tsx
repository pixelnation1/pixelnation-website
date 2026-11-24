"use client";

import { useActionState, useState } from "react";
import { buttonClass, CONDITIONS, fieldClass, formatOffer, type CatalogEntry, type Category, type Resale } from "@/lib/buyback/model";
import { lookUpPrice, saveCatalogEntry, saveResale, updateQuote } from "./actions";

export function CatalogForm({ entry }: { entry?: CatalogEntry }) {
  const [category, setCategory] = useState<Category>(entry?.category ?? "Game");
  const [message, action, pending] = useActionState(saveCatalogEntry, "");
  const [revision, setRevision] = useState(0);
  return (
    <form action={action} className="mt-3 grid gap-3 sm:grid-cols-2">
      {entry && <input type="hidden" name="id" value={entry.id} />}
      <label>Category
        <select className={fieldClass} name="category" value={category} onChange={(event) => {
          setCategory(event.target.value as Category);
          setRevision((value) => value + 1);
        }}>
          {Object.keys(CONDITIONS).map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label>Condition
        <select key={revision} className={fieldClass} name="condition" defaultValue={revision === 0 ? entry?.condition : undefined}>
          {CONDITIONS[category].map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label>Title or model<input className={fieldClass} name="title" maxLength={120} defaultValue={entry?.title} required /></label>
      <label>Platform<input className={fieldClass} name="platform" maxLength={120} defaultValue={entry?.platform} required /></label>
      <label>Edition or variant<input className={fieldClass} name="edition" maxLength={120} defaultValue={entry?.edition} required /></label>
      <label>UPC<input className={fieldClass} name="upc" inputMode="numeric" pattern="[0-9]{8,14}" defaultValue={entry?.upc} /></label>
      <label>Cash offer in dollars<input className={fieldClass} name="offer" type="number" min="0" max="999999" step="0.01" defaultValue={entry && entry.offer_cents / 100} required /></label>
      <label className="flex items-center gap-2"><input name="active" type="checkbox" defaultChecked={entry?.active ?? false} /> Publish this offer</label>
      <button className={buttonClass} disabled={pending}>Save buy price</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function PricingCalculator() {
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const fields = ["Expected delivered sale price", "eBay fees", "Postage and packaging", "Labor and parts", "Return allowance", "Target profit"];
  const ceiling = fields.reduce((total, field, index) => total + (index === 0 ? 1 : -1) * (amounts[field] ?? 0), 0);
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {fields.map((field) => <label key={field}>{field}
        <input className={fieldClass} type="number" min="0" step="0.01" onChange={(event) => {
          setAmounts({ ...amounts, [field]: Math.max(0, Math.round((Number(event.target.value) || 0) * 100)) });
        }} />
      </label>)}
      <p className="font-semibold">Maximum buy price {formatOffer(Math.max(0, ceiling))}</p>
    </div>
  );
}

export function QuoteUpdateForm({ token, current }: { token: string; current: string }) {
  const [message, action, pending] = useActionState(updateQuote, "");
  const next = { Submitted: "Received", Received: "Offer ready", Accepted: "Paid" }[current];
  if (!next) return null;
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="current" value={current} />
      <input type="hidden" name="next" value={next} />
      {next === "Offer ready" && <>
        <label className="block">Final cash offer in dollars<input className={fieldClass} name="final" type="number" min="0" max="999999" step="0.01" required /></label>
        <label className="block">Inspection result and reason for any price change<textarea className={fieldClass} name="reason" maxLength={1000} required /></label>
      </>}
      <button className={buttonClass} disabled={pending}>{next === "Offer ready" ? "Publish final offer" : `Mark as ${next.toLowerCase()}`}</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function ResaleForm({ token, index, record }: { token: string; index: number; record?: Resale }) {
  const [message, action, pending] = useActionState(saveResale, "");
  return (
    <form action={action} className="my-2 grid gap-2 sm:grid-cols-2">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="index" value={index} />
      <label>Allocated buy cost<input className={fieldClass} name="buy" type="number" min="0" step="0.01" defaultValue={record && record.buy_cents / 100} required /></label>
      <label>Prep and repair cost<input className={fieldClass} name="prep" type="number" min="0" step="0.01" defaultValue={(record?.prep_cents ?? 0) / 100} required /></label>
      <label>eBay item number<input className={fieldClass} name="listing" inputMode="numeric" pattern="[0-9]{9,16}" defaultValue={record?.ebay_item_id ?? ""} /></label>
      <label>Date sold<input className={fieldClass} name="soldOn" type="date" defaultValue={record?.sold_on ?? ""} /></label>
      <label>Net proceeds after fees and shipping<input className={fieldClass} name="net" type="number" min="0" step="0.01" defaultValue={record?.net_cents == null ? "" : record.net_cents / 100} /></label>
      {record?.net_cents != null && <p className="self-end">Profit {formatOffer(record.net_cents - record.buy_cents - record.prep_cents)}</p>}
      <button className={buttonClass} disabled={pending}>Save resale details</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function PriceLookup() {
  const [result, action, pending] = useActionState(lookUpPrice, null);
  return (
    <div className="mt-3 space-y-3">
      <form action={action} className="grid items-end gap-3 sm:grid-cols-[auto_1fr_auto]">
        <label>Lookup by
          <select className={fieldClass} name="kind">
            <option value="upc">UPC</option>
            <option value="id">PriceCharting product ID</option>
          </select>
        </label>
        <label>UPC or product ID
          <input className={fieldClass} name="identifier" inputMode="numeric" pattern="[0-9]{1,14}" maxLength={14} required />
        </label>
        <button className={buttonClass} disabled={pending}>{pending ? "Looking up…" : "Look up prices"}</button>
      </form>
      {result?.error && <p role="status">{result.error}</p>}
      {result?.prices && (
        <div className="overflow-x-auto" aria-live="polite">
          <p className="mb-2 font-semibold">{result.title} · {result.platform}</p>
          <table className="w-full text-left text-sm">
            <thead><tr><th scope="col">Condition</th><th scope="col">Guide value</th><th scope="col">Suggested retailer buy</th></tr></thead>
            <tbody>
              {result.prices.map(({ condition, market, buy }) => (
                <tr key={condition} className="border-t border-white/10">
                  <th scope="row" className="py-2 font-medium">{condition}</th>
                  <td>{market === null ? "Unavailable" : formatOffer(market)}</td>
                  <td>{buy === null ? "Unavailable" : formatOffer(buy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-muted">Confirm the exact edition and condition. Use the calculator below before saving a PixelNation offer.</p>
        </div>
      )}
      <a href="https://myquickflips.com/sell" target="_blank" rel="noreferrer" className="inline-block text-sm text-accent">Compare with QuickFlips’ public cash offers</a>
    </div>
  );
}
