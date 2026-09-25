import "server-only";
import type { Community } from "@/lib/communities/types";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CommunityRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  top_supporters_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapCommunity(row: CommunityRow): Community {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    active: row.active,
    topSupportersEnabled: row.top_supporters_enabled,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Public list for UI — active communities only (RLS). Never hardcode as the source of truth. */
export async function fetchActiveCommunities(): Promise<Community[]> {
  if (!isSupabaseBrowserConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("communities")
    .select(
      "id, name, slug, description, active, top_supporters_enabled, sort_order, created_at, updated_at",
    )
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as CommunityRow[]).map(mapCommunity);
}

/** Safe public shape for client components (no internal UUIDs exposed). */
export type PublicCommunityOption = {
  slug: string;
  name: string;
};

export function toPublicCommunityOptions(
  communities: Community[],
): PublicCommunityOption[] {
  return communities.map(({ slug, name }) => ({ slug, name }));
}
