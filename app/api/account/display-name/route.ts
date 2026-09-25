import { normalizeDisplayName } from "@/lib/communities/display-name";
import { AuthError, requireUser } from "@/lib/communities/auth";
import { markDisplayNameCompleted } from "@/lib/communities/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let ctx;
  try {
    ctx = await requireUser();
  } catch (error) {
    if (error instanceof AuthError && error.reason === "unauthenticated") {
      return Response.json({ error: "Sign in required." }, { status: 401 });
    }
    return Response.json({ error: "Unable to update display name." }, { status: 500 });
  }

  let body: { displayName?: string };
  try {
    body = (await request.json()) as { displayName?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = normalizeDisplayName(body.displayName);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();

  // Only display_name — never send app_role, account_status, id, or created_at.
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: parsed.value })
    .eq("id", ctx.user.id);

  if (error) {
    return Response.json(
      { error: "Unable to save display name. Please try again." },
      { status: 500 },
    );
  }

  await markDisplayNameCompleted();

  return Response.json({
    ok: true,
    displayName: parsed.value,
  });
}
