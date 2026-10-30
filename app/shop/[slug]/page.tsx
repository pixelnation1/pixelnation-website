import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, formatPrice } from '@/lib/shop/products';
import { getBuyingOptions } from '@/lib/shop/checkout';
import { ProductPurchase } from '@/components/shop/ProductPurchase';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const p=products.find(p=>p.slug===slug);
  return p ? {title:p.name, description:p.description, alternates:{canonical:`/shop/${slug}`}, openGraph:{images:[p.images[0]]}} : {title:'Design not found'};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const p=products.find(p=>p.slug===slug); if(!p) notFound();
  return <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16"><Link href="/shop" className="text-sm text-accent">← All deck boxes</Link><div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16"><div className="space-y-5">{p.images.map((src,i)=><div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-[#262626]"><Image src={src} alt={`${p.name}${i?' — alternate angle':''}`} fill priority={i===0} sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain"/></div>)}</div><div><p className="text-sm font-bold uppercase tracking-widest text-accent">PixelNation · 3D-printed collection</p><h1 className="mt-4 text-4xl font-bold sm:text-5xl">{p.name}</h1><p className="mt-5 text-3xl font-bold text-accent">{formatPrice(p.price)}</p><p className="mt-6 text-lg leading-relaxed text-muted">{p.description}</p><div className="my-8"><ProductPurchase options={getBuyingOptions(slug)}/></div><dl className="space-y-5 border-t border-white/15 pt-7"><div><dt className="font-bold">Made to order</dt><dd className="mt-1 text-muted">Allow 3–5 days for production before shipping or pickup. Shipping transit time is additional.</dd></div><div><dt className="font-bold">Ready-made availability</dt><dd className="mt-1 text-muted">Ready-to-ship and pickup options appear when available. Contact us to check current store stock.</dd></div><div><dt className="font-bold">Before you order</dt><dd className="mt-1 text-muted">Visible layer lines are part of the 3D-printed finish. Cards pictured are not included. Contact us to confirm fit for your deck and sleeves or request different colors.</dd></div></dl></div></div></div>;
}
