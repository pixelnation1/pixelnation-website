"use server";

import { revalidatePath } from "next/cache";
import { requireStaff, AuthError } from "@/lib/communities/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MappingActionResult = { ok: true } | { ok: false; error: string };

export async function upsertSquareCategoryMapping(input: {
  squareCategoryId: string;
  squareCategoryName: string;
  communityId: string;
  active: boolean;
}): Promise<MappingActionResult> {
  try {
    await requireStaff();
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Staff access required." };
    }
    return { ok: false, error: "Unable to save mapping." };
  }

  const categoryId = input.squareCategoryId.trim();
  const communityId = input.communityId.trim();
  if (!categoryId || !communityId) {
    return { ok: false, error: "Category ID and community are required." };
  }

  const supabase = await createSupabaseServerClient();
  const { data: existing } = await supabase
    .from("square_community_mappings")
    .select("id")
    .eq("square_category_id", categoryId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("square_community_mappings")
      .update({
        square_category_name: input.squareCategoryName.trim(),
        community_id: communityId,
        active: input.active,
      })
      .eq("id", existing.id);
    if (error) return { ok: false, error: "Unable to update mapping." };
  } else {
    const { error } = await supabase.from("square_community_mappings").insert({
      square_category_id: categoryId,
      square_category_name: input.squareCategoryName.trim(),
      community_id: communityId,
      active: input.active,
    });
    if (error) return { ok: false, error: "Unable to create mapping." };
  }

  revalidatePath("/admin/communities");
  return { ok: true };
}

export async function setSquareCategoryMappingActive(input: {
  mappingId: string;
  active: boolean;
}): Promise<MappingActionResult> {
  try {
    await requireStaff();
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Staff access required." };
    }
    return { ok: false, error: "Unable to update mapping." };
  }

  const mappingId = input.mappingId.trim();
  if (!mappingId) return { ok: false, error: "Mapping id required." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("square_community_mappings")
    .update({ active: input.active })
    .eq("id", mappingId);

  if (error) return { ok: false, error: "Unable to update mapping." };

  revalidatePath("/admin/communities");
  return { ok: true };
}

export async function createMappingFormAction(
  formData: FormData,
): Promise<void> {
  await upsertSquareCategoryMapping({
    squareCategoryId: String(formData.get("squareCategoryId") ?? ""),
    squareCategoryName: String(formData.get("squareCategoryName") ?? ""),
    communityId: String(formData.get("communityId") ?? ""),
    active: formData.get("active") === "on",
  });
}

export async function toggleMappingFormAction(
  mappingId: string,
  active: boolean,
): Promise<void> {
  await setSquareCategoryMappingActive({ mappingId, active });
}
