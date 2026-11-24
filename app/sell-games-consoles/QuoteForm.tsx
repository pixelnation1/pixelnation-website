"use client";

import { useActionState, useState } from "react";
import { buttonClass, CONDITIONS, fieldClass, formatOffer, panelClass, type CatalogEntry, type Category } from "@/lib/buyback/model";
import { submitQuote } from "./actions";

type Item = { id?: string; description: string; category: Category; condition: string; estimate: number | null };

export function QuoteForm({ catalog }: { catalog: CatalogEntry[] }) {
  const [message, submit, pending] = useActionState(submitQuote, "");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Game");
  const [condition, setCondition] = useState<string>(CONDITIONS.Game[0]);
  const [items, setItems] = useState<Item[]>([]);
  const term = query.trim().toLowerCase();
  const matches = term ? catalog.filter((entry) =>
    entry.category === category && entry.condition === condition &&
    `${entry.title} ${entry.platform} ${entry.edition} ${entry.upc}`.toLowerCase().includes(term)
  ).slice(0, 12) : [];
  const subtotal = items.reduce((total, item) => total + (item.estimate ?? 0), 0);
  const add = (item: Item) => {
    setItems((current) => current.length < 20 ? [...current, item] : current);
    setQuery("");
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.85fr]">
      <section className={panelClass}>
        <h2 className="text-xl font-semibold">Find what you’re selling</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label>Item type
            <select className={fieldClass} value={category} onChange={(event) => {
              const next = event.target.value as Category;
              setCategory(next);
              setCondition(CONDITIONS[next][0]);
            }}>
              {Object.keys(CONDITIONS).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>Condition
            <select className={fieldClass} value={condition} onChange={(event) => setCondition(event.target.value)}>
              {CONDITIONS[category].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>
        <label className="mt-3 block">Game title, console model, or UPC
          <input className={fieldClass} value={query} maxLength={160} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Mario Kart 8 Deluxe Switch" />
        </label>
        <ul className="mt-3 space-y-2">
          {matches.map((entry) => {
            const description = `${entry.title} · ${entry.platform} · ${entry.edition}`;
            return <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 py-2">
              <span>{description}</span>
              <button type="button" className={buttonClass} disabled={items.length >= 20}
                onClick={() => add({ id: entry.id, description, category, condition, estimate: entry.offer_cents })}>
                Add · {formatOffer(entry.offer_cents)}
              </button>
            </li>;
          })}
        </ul>
        <p className="mt-4 text-sm text-muted">For a manual quote, include the title or model, platform, and edition. For larger collections, describe the rest in the notes.</p>
        <button type="button" className="mt-2 rounded-lg border border-white/20 px-4 py-2 disabled:opacity-50"
          disabled={!term || items.length >= 20}
          onClick={() => add({ description: query.trim(), category, condition, estimate: null })}>
          Add for manual review
        </button>
      </section>

      <form action={submit} className={`${panelClass} space-y-4`}>
        <h2 className="text-xl font-semibold">Your quote</h2>
        {items.length === 0 && <p className="text-sm text-muted">Add games, consoles, or accessories to get started.</p>}
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="rounded-lg border border-white/10 p-3">
              <input type="hidden" name="item" value={JSON.stringify(item)} />
              <div className="flex items-start justify-between gap-3">
                <span>{item.description}</span>
                <button type="button" aria-label={`Remove ${item.description}`} className="text-sm text-accent"
                  onClick={() => setItems(items.filter((_, position) => position !== index))}>Remove</button>
              </div>
              <p className="text-sm text-muted">{item.condition} · {item.estimate === null ? "Manual review" : formatOffer(item.estimate)}</p>
            </li>
          ))}
        </ul>
        {items.some((item) => item.estimate !== null) && <p>Estimated subtotal {formatOffer(subtotal)}</p>}
        <label className="block">Name<input className={fieldClass} name="name" autoComplete="name" maxLength={100} required /></label>
        <label className="block">Email<input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label className="block">Notes <span className="text-muted">(optional)</span><textarea className={fieldClass} name="notes" maxLength={1500} rows={3} /></label>
        <input name="website" hidden tabIndex={-1} autoComplete="off" />
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consent" required /> I understand that PixelNation confirms the final offer after inspection.</label>
        {message && <p role="alert">{message}</p>}
        <button className={buttonClass} disabled={pending || !items.length}>{pending ? "Submitting…" : "Request a cash offer"}</button>
      </form>
    </div>
  );
}
