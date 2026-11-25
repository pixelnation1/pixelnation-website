import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CatalogEntry, Quote } from "./model";

export const catalogColumns = "id,category,title,platform,edition,upc,condition,offer_cents,active";
export const quoteTokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function buybackDb() {
  return createSupabaseAdminClient();
}

export async function listCatalog(publicOnly: boolean): Promise<CatalogEntry[]> {
  let query = buybackDb().from("buyback_catalog").select(catalogColumns).order("title").order("id");
  if (publicOnly) query = query.eq("active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data as CatalogEntry[];
}

export async function getQuote(token: string): Promise<Quote | null> {
  if (!quoteTokenPattern.test(token)) return null;
  const { data, error } = await buybackDb().from("buyback_quotes").select("*").eq("token", token).maybeSingle();
  if (error) throw error;
  return data as Quote | null;
}
