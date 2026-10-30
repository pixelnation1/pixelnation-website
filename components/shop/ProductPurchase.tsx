'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { BuyingOption } from '@/lib/shop/checkout';
export function ProductPurchase({ options }: { options: BuyingOption[] }) {
  const [selected, setSelected] = useState(0);
  const option = options[selected];
  if (!option) return <div className="rounded-2xl border border-white/15 bg-white/5 p-6"><p className="font-semibold">Online ordering is coming soon</p><p className="mt-2 text-sm text-muted">Contact us for current availability or a custom request.</p><Link href="/contact" className="mt-5 inline-flex rounded-xl bg-accent px-6 py-3 font-bold text-background">Ask about this design</Link></div>;
  return <div className="space-y-4"><label className="block font-semibold" htmlFor="buying-option">Choose how to order</label><select id="buying-option" value={selected} onChange={e=>setSelected(Number(e.target.value))} className="w-full rounded-xl border border-white/20 bg-card p-4 text-white">{options.map((o,i)=><option value={i} key={o.label}>{o.label}</option>)}</select><p className="text-sm text-muted">{option.detail}</p><a href={option.url} className="block rounded-xl bg-accent px-6 py-4 text-center font-bold text-background">Continue to Square checkout</a><p className="text-xs text-muted">Review your item, fulfillment choice, shipping and taxes before paying.</p></div>;
}
