import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

export type StaffLedgerRow = {
  points: number;
  source: string;
  createdAt: string;
  displayName: string;
  communityName: string;
};

export type StaffUnmatchedRow = {
  id: string;
  squareOrderId: string;
  squarePaymentId: string | null;
  squareRefundId: string | null;
  occurredAt: string;
  customerEmail: string | null;
  matchStatus: string;
  qualifyingTotals: unknown;
  detail: string | null;
  createdAt: string;
};

export type StaffMappingRow = {
  id: string;
  squareCategoryId: string;
  squareCategoryName: string;
  communityId: string;
  communityName: string;
  active: boolean;
  updatedAt: string;
};

export type StaffCommunityOption = {
  id: string;
  name: string;
  slug: string;
};

export async function fetchStaffRecentLedger(
  limit = 40,
): Promise<StaffLedgerRow[]> {
  if (!isSupabaseBrowserConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("support_point_entries")
    .select(
      "points, source, created_at, profiles(display_name), communities(name)",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row) => {
    const profile = row.profiles as
      | { display_name?: string }
      | { display_name?: string }[]
      | null;
    const community = row.communities as
      | { name?: string }
      | { name?: string }[]
      | null;
    const displayName = Array.isArray(profile)
      ? (profile[0]?.display_name ?? "Unknown")
      : (profile?.display_name ?? "Unknown");
    const communityName = Array.isArray(community)
      ? (community[0]?.name ?? "Unknown")
      : (community?.name ?? "Unknown");
    return {
      points: row.points as number,
      source: row.source as string,
      createdAt: row.created_at as string,
      displayName,
      communityName,
    };
  });
}

export async function fetchStaffUnmatchedPurchases(
  limit = 40,
): Promise<StaffUnmatchedRow[]> {
  if (!isSupabaseBrowserConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("square_unmatched_purchases")
    .select(
      "id, square_order_id, square_payment_id, square_refund_id, occurred_at, customer_email, match_status, qualifying_totals, detail, created_at",
    )
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    squareOrderId: row.square_order_id,
    squarePaymentId: row.square_payment_id,
    squareRefundId: row.square_refund_id,
    occurredAt: row.occurred_at,
    customerEmail: row.customer_email,
    matchStatus: row.match_status,
    qualifyingTotals: row.qualifying_totals,
    detail: row.detail,
    createdAt: row.created_at,
  }));
}

export async function fetchStaffCategoryMappings(): Promise<StaffMappingRow[]> {
  if (!isSupabaseBrowserConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("square_community_mappings")
    .select(
      "id, square_category_id, square_category_name, community_id, active, updated_at, communities(name)",
    )
    .order("square_category_name", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => {
    const community = row.communities as
      | { name?: string }
      | { name?: string }[]
      | null;
    const communityName = Array.isArray(community)
      ? (community[0]?.name ?? "Unknown")
      : (community?.name ?? "Unknown");
    return {
      id: row.id,
      squareCategoryId: row.square_category_id,
      squareCategoryName: row.square_category_name,
      communityId: row.community_id,
      communityName,
      active: row.active === true,
      updatedAt: row.updated_at,
    };
  });
}

export async function fetchStaffCommunityOptions(): Promise<
  StaffCommunityOption[]
> {
  if (!isSupabaseBrowserConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("communities")
    .select("id, name, slug")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
  }));
}

export function sourceLabel(source: string): string {
  switch (source) {
    case "check_in":
      return "Community Check-In";
    case "purchase":
      return "In-Store Purchase";
    case "reversal":
      return "Reversal";
    case "adjustment":
      return "Adjustment";
    case "event":
      return "Event";
    case "community_builder":
      return "Community Builder";
    default:
      return source;
  }
}

export function formatSignedPoints(points: number): string {
  if (points > 0) return `+${points}`;
  return String(points);
}
