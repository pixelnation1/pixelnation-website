"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkRateLimit } from "@/lib/trade/rate-limit";
import { CONDITIONS, type CatalogEntry, type Category, type QuoteItem } from "@/lib/buyback/model";
import { buybackDb, catalogColumns, quoteTokenPattern } from "@/lib/buyback/store";

export async function submitQuote(_: string, form: FormData): Promise<string> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();
  if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || notes.length > 1500)
    return "Enter your name and a valid email, and keep notes under 1,500 characters.";
  if (form.get("website")) return "Unable to submit the request.";
  if (form.get("consent") !== "on") return "Confirm that final offers depend on inspection.";

  const rows = form.getAll("item");
  if (rows.length < 1 || rows.length > 20) return "Add between 1 and 20 items.";
  const selections = [];
  for (const row of rows) {
    let item;
    try { item = JSON.parse(String(row)); } catch { return "Check the items in your quote."; }
    if (!item || !Object.hasOwn(CONDITIONS, item.category) || typeof item.description !== "string" ||
      !item.description.trim() || item.description.length > 160 || typeof item.condition !== "string" ||
      !(CONDITIONS[item.category as Category] as readonly string[]).includes(item.condition) ||
      (item.id && (typeof item.id !== "string" || !quoteTokenPattern.test(item.id)))) {
      return "Enter a title or model and a valid condition for every item.";
    }
    selections.push({ ...item, description: item.description.trim() });
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(`buyback:${ip}`, 8, 60 * 60 * 1000).ok) return "Please try again later.";

  let token: string;
  try {
    const db = buybackDb();
    const ids = [...new Set(selections.flatMap((item) => item.id ? [item.id] : []))];
    const catalog = ids.length
      ? await db.from("buyback_catalog").select(catalogColumns).in("id", ids).eq("active", true)
      : { data: [], error: null };
    if (catalog.error) throw catalog.error;
    const items: QuoteItem[] = selections.map((item) => {
      const entry = (catalog.data as CatalogEntry[]).find((candidate) =>
        candidate.id === item.id && candidate.category === item.category && candidate.condition === item.condition);
      return {
        category: item.category,
        description: entry ? `${entry.title} · ${entry.platform} · ${entry.edition}` : item.description,
        condition: item.condition,
        estimate: entry?.offer_cents ?? null,
      };
    });
    const result = await db.from("buyback_quotes").insert({ name, email, notes, items }).select("token").single();
    if (result.error) throw result.error;
    token = result.data.token;
  } catch {
    return "We couldn't save your quote. Please try again or contact PixelNation.";
  }
  redirect(`/sell-games-consoles/quote/${token}`);
}

export async function respondToOffer(form: FormData) {
  const token = String(form.get("token") ?? "");
  const status = form.get("decision");
  const amount = form.get("amount");
  if (!quoteTokenPattern.test(token) || (status !== "Accepted" && status !== "Declined") ||
    typeof amount !== "string" || !/^\d+$/.test(amount)) return;
  const { error } = await buybackDb().from("buyback_quotes").update({ status })
    .eq("token", token).eq("status", "Offer ready").eq("final_cents", Number(amount));
  if (error) throw error;
  redirect(`/sell-games-consoles/quote/${token}`);
}
