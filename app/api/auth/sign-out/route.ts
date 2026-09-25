import { NextResponse } from "next/server";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (isSupabaseBrowserConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/", url.origin), { status: 303 });
}
