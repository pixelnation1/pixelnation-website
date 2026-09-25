"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

type AccountNavLinkProps = {
  className: (active: boolean) => string;
  pathname: string;
  onNavigate?: () => void;
};

/**
 * Lightweight client auth label for the static-first site header.
 * Does not authorize anything — /account and APIs enforce sessions server-side.
 * Avoids forcing the whole marketing site into dynamic SSR for one nav link.
 */
export function AccountNavLink({
  className,
  pathname,
  onNavigate,
}: AccountNavLinkProps) {
  const [signedIn, setSignedIn] = useState<boolean | null>(() =>
    isSupabaseBrowserConfigured() ? null : false,
  );
  const active = pathname === "/account" || pathname.startsWith("/account/");

  useEffect(() => {
    if (!isSupabaseBrowserConfigured()) {
      return;
    }

    let cancelled = false;
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setSignedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setSignedIn(Boolean(session?.user));
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const href = signedIn ? "/account" : "/login";
  const label =
    signedIn === false ? "Account / Sign In" : "Account";

  return (
    <Link
      href={href}
      className={className(active)}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
