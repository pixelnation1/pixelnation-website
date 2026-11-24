"use server";

import { revalidatePath } from "next/cache";
import { isTradeAdminAuthenticated } from "@/lib/trade/auth";
import { CONDITIONS, type Category } from "@/lib/buyback/model";
import { buybackDb, quoteTokenPattern } from "@/lib/buyback/store";

function readText(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function readCents(form: FormData, key: string) {
  const value = readText(form, key);
  return /^\d{1,6}(?:\.\d{1,2})?$/.test(value) ? Math.round(Number(value) * 100) : null;
}

export async function saveCatalogEntry(_: string, form: FormData) {
  if (!(await isTradeAdminAuthenticated())) return "Sign in again to make changes.";
  const id = readText(form, "id");
  const category = readText(form, "category") as Category;
  const title = readText(form, "title");
  const platform = readText(form, "platform");
  const edition = readText(form, "edition");
  const condition = readText(form, "condition");
  const upc = readText(form, "upc");
  const offer = readCents(form, "offer");
  if ((id && !quoteTokenPattern.test(id)) || !Object.hasOwn(CONDITIONS, category) ||
    !(CONDITIONS[category] as readonly string[]).includes(condition) ||
    [title, platform, edition].some((value) => !value || value.length > 120) ||
    (upc && !/^\d{8,14}$/.test(upc)) || offer === null)
    return "Check the item details, condition, UPC, and cash offer.";
  try {
    const table = buybackDb().from("buyback_catalog");
    const row = { category, title, platform, edition, condition, upc, offer_cents: offer, active: form.get("active") === "on", reviewed_at: new Date().toISOString() };
    const { error } = id ? await table.update(row).eq("id", id).select("id").single() : await table.insert(row);
    if (error) return error.code === "23505" ? "This edition and condition already exist. Edit the existing entry." : "Could not save the buy price.";
  } catch {
    return "Could not save the buy price.";
  }
  revalidatePath("/admin/buyback");
  revalidatePath("/sell-games-consoles");
  return "Buy price saved.";
}

export async function updateQuote(_: string, form: FormData) {
  if (!(await isTradeAdminAuthenticated())) return "Sign in again to make changes.";
  const token = readText(form, "token");
  const current = readText(form, "current");
  const next = readText(form, "next");
  const allowed = (current === "Submitted" && next === "Received") ||
    (current === "Received" && next === "Offer ready") || (current === "Accepted" && next === "Paid");
  if (!quoteTokenPattern.test(token) || !allowed) return "This status change is unavailable.";
  const final = readCents(form, "final");
  const reason = readText(form, "reason");
  if (next === "Offer ready" && (final === null || !reason || reason.length > 1000))
    return "Enter the final offer and explain the inspection result.";
  try {
    const { data, error } = await buybackDb().from("buyback_quotes")
      .update(next === "Offer ready" ? { status: next, final_cents: final, offer_reason: reason } : { status: next })
      .eq("token", token).eq("status", current).select("token").maybeSingle();
    if (error || !data) return "Could not update this quote. Refresh and check its current status.";
  } catch {
    return "Could not update this quote.";
  }
  revalidatePath("/admin/buyback");
  revalidatePath(`/sell-games-consoles/quote/${token}`);
  return "Quote updated.";
}

export async function saveResale(_: string, form: FormData) {
  if (!(await isTradeAdminAuthenticated())) return "Sign in again to make changes.";
  const token = readText(form, "token");
  const index = readText(form, "index");
  const buy = readCents(form, "buy");
  const prep = readCents(form, "prep");
  const listing = readText(form, "listing");
  const soldOn = readText(form, "soldOn");
  const net = readCents(form, "net");
  if (!quoteTokenPattern.test(token) || !/^(?:[0-9]|1[0-9])$/.test(index) || buy === null || prep === null ||
    (listing && !/^\d{9,16}$/.test(listing)) || (Boolean(soldOn) !== Boolean(readText(form, "net"))) ||
    (soldOn && (!/^\d{4}-\d{2}-\d{2}$/.test(soldOn) || net === null)))
    return "Check the costs, eBay item number, sale date, and net proceeds.";
  try {
    const db = buybackDb();
    const { data: quote, error: quoteError } = await db.from("buyback_quotes")
      .select("items").eq("token", token).eq("status", "Paid").maybeSingle();
    if (quoteError || !quote || !Array.isArray(quote.items) || Number(index) >= quote.items.length)
      return "Record payment for the quote before tracking resale.";
    const { error } = await db.from("buyback_resale").upsert({
      quote_token: token, item_index: Number(index), buy_cents: buy, prep_cents: prep,
      ebay_item_id: listing || null, net_cents: net, sold_on: soldOn || null,
    });
    if (error) return "Could not save resale details.";
  } catch {
    return "Could not save resale details.";
  }
  revalidatePath("/admin/buyback");
  return "Resale details saved.";
}
