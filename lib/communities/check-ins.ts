import "server-only";
import { getChicagoBusinessDate } from "@/lib/communities/business-date";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type TodayCheckIn = {
  communitySlug: string;
  communityName: string;
  businessDate: string;
  locationId: string;
};

type CommunityEmbed = {
  slug: string;
  name: string;
};

type TodayCheckInRow = {
  business_date: string;
  location_id: string;
  communities: CommunityEmbed | CommunityEmbed[] | null;
};

function unwrapCommunity(
  value: CommunityEmbed | CommunityEmbed[] | null,
): CommunityEmbed | null {
  if (!value) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

/**
 * Own check-ins for the current Chicago business day.
 * Uses the signed-in session client (RLS: check_ins_select_own).
 */
export async function fetchOwnCheckInsForToday(
  profileId: string,
): Promise<TodayCheckIn[]> {
  if (!isSupabaseBrowserConfigured()) return [];

  const businessDate = getChicagoBusinessDate();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("check_ins")
    .select("business_date, location_id, communities(slug, name)")
    .eq("profile_id", profileId)
    .eq("business_date", businessDate)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as unknown as TodayCheckInRow[])
    .map((row) => {
      const community = unwrapCommunity(row.communities);
      if (!community?.slug || !community.name) return null;
      return {
        communitySlug: community.slug,
        communityName: community.name,
        businessDate: row.business_date,
        locationId: row.location_id,
      };
    })
    .filter((row): row is TodayCheckIn => row !== null);
}
