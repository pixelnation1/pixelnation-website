import { createPageMetadata } from "@/lib/seo/metadata";
import { listCatalog } from "@/lib/buyback/store";
import { SITE } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";

export const dynamic = "force-dynamic";
export const metadata = createPageMetadata({
  title: "Sell Video Games & Consoles in Emporia, KS",
  description: "Get a cash offer from PixelNation for used video games, consoles, and accessories. Request an estimate online and bring your items to our Emporia shop.",
  path: "/sell-games-consoles",
});

export default async function SellGamesConsolesPage() {
  const catalog = await listCatalog(true).catch(() => null);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 max-w-2xl">
        <p className="font-medium text-accent">PixelNation Buyback · Emporia, KS</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Sell your games and consoles</h1>
        <p className="mt-4 text-lg text-muted">Build one quote for your games, controllers, and consoles. Bring them in for inspection and get a final cash offer. We also review consoles with HDMI damage.</p>
      </div>
      {catalog ? <QuoteForm catalog={catalog} /> : <p>Online quotes are temporarily unavailable. Call {SITE.phone} for a buyback quote.</p>}
    </div>
  );
}
