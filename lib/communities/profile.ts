import "server-only";
import type { User } from "@supabase/supabase-js";
import type { AccountStatus, AppRole, Profile } from "@/lib/communities/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProfileRow = {
  id: string;
  display_name: string;
  account_status: AccountStatus;
  app_role: AppRole;
  created_at: string;
  updated_at: string;
};

export function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    accountStatus: row.account_status,
    appRole: row.app_role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** True until the customer confirms a display name in our UI. */
export function needsDisplayNameSetup(_profile: Profile, user: User): boolean {
  return user.user_metadata?.display_name_completed !== true;
}

export async function fetchOwnProfile(userId: string): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, account_status, app_role, created_at, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapProfile(data as ProfileRow);
}

/**
 * Mark display-name setup complete in auth metadata (not a privilege field).
 * Profile privileges remain enforced by protect_profile_privileges().
 */
export async function markDisplayNameCompleted(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.updateUser({
    data: { display_name_completed: true },
  });
}
