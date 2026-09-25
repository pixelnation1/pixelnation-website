import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import {
  getAuthContext,
  resolvePostAuthPath,
} from "@/lib/communities/auth";
import { getSafeInternalPath } from "@/lib/communities/redirect";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Sign In | PixelNation Account",
  description:
    "Sign in to your PixelNation account with a secure email link. No password required.",
  path: "/login",
  noIndex: true,
  titleAbsolute: true,
});

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = getSafeInternalPath(params.next, "/account");

  const ctx = await getAuthContext();
  if (ctx) {
    redirect(resolvePostAuthPath(ctx, nextPath));
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(244,197,66,0.1),_transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-lg px-4 py-12 sm:py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation Account
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          PIXELNATION ACCOUNT
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          One account for your PixelNation community experience. Sign in with
          your email — no password to remember.
        </p>

        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden>
              •
            </span>
            <span>
              Check in when you play{" "}
              <span className="text-foreground/70">(coming soon)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden>
              •
            </span>
            <span>
              Support your favorite game communities{" "}
              <span className="text-foreground/70">(coming soon)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden>
              •
            </span>
            <span>
              Track Community activity, Support Points, and Top Supporters{" "}
              <span className="text-foreground/70">(coming soon)</span>
            </span>
          </li>
        </ul>

        <div className="mt-8">
          <LoginForm nextPath={nextPath} initialError={params.error ?? null} />
        </div>
      </div>
    </div>
  );
}
