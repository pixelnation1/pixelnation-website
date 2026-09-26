import Link from "next/link";
import { CheckInForm } from "@/components/communities/CheckInForm";
import { Button } from "@/components/ui/Button";
import {
  getAuthContext,
  isCommunityParticipationAllowed,
} from "@/lib/communities/auth";
import {
  fetchActiveCommunities,
  toPublicCommunityOptions,
} from "@/lib/communities/communities";
import { fetchOwnCheckInsForToday } from "@/lib/communities/check-ins";
import { needsDisplayNameSetup } from "@/lib/communities/profile";
import { getSafeInternalPath } from "@/lib/communities/redirect";
import {
  getDefaultCheckInLocationCode,
  resolveCheckInLocation,
} from "@/lib/communities/locations";
import { createPageMetadata } from "@/lib/seo/metadata";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Community Check-In | PixelNation",
  description:
    "Check in at PixelNation Emporia to record what you are playing today.",
  path: "/communities/check-in",
  noIndex: true,
  titleAbsolute: true,
});

type CheckInPageProps = {
  searchParams: Promise<{ location?: string }>;
};

function buildCheckInPath(locationCode: string): string {
  return `/communities/check-in?location=${encodeURIComponent(locationCode)}`;
}

export default async function CommunityCheckInPage({
  searchParams,
}: CheckInPageProps) {
  const params = await searchParams;
  const hasLocationParam =
    typeof params.location === "string" && params.location.trim().length > 0;
  const rawLocation = hasLocationParam ? params.location!.trim() : "";
  const location = resolveCheckInLocation(rawLocation || null);
  const returnPath = getSafeInternalPath(
    location
      ? buildCheckInPath(location.code)
      : buildCheckInPath(getDefaultCheckInLocationCode()),
    buildCheckInPath(getDefaultCheckInLocationCode()),
  );

  if (!location) {
    return (
      <CheckInShell>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          CHECK IN AT PIXELNATION
        </h1>
        <div
          className="mt-6 rounded-2xl border border-accent/40 bg-accent-muted p-5"
          role="status"
        >
          <p className="text-base text-foreground">
            {hasLocationParam
              ? "This check-in location is not recognized. Ask a team member for the store QR code, or start check-in for PixelNation Emporia."
              : "A check-in location is required. Scan the store QR code, or start check-in for PixelNation Emporia."}
          </p>
        </div>
        <div className="mt-6">
          <Button href={buildCheckInPath(getDefaultCheckInLocationCode())}>
            Check in at PixelNation Emporia
          </Button>
        </div>
      </CheckInShell>
    );
  }

  // Without Supabase env, getAuthContext() is null → signed-out UI still works
  // for routing/auth-redirect verification. Live check-in needs credentials.
  const ctx = await getAuthContext();

  if (!ctx) {
    const loginHref = `/login?next=${encodeURIComponent(returnPath)}`;
    return (
      <CheckInShell>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          CHECK IN AT PIXELNATION
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Sign in to record today&apos;s game activity at{" "}
          <span className="text-foreground">{location.label}</span>.
        </p>
        <div className="mt-8 space-y-3">
          <Button href={loginHref}>Sign in to check in</Button>
          <p className="text-sm text-muted">
            Use your email — we&apos;ll send a secure sign-in link and bring you
            right back here.
          </p>
        </div>
      </CheckInShell>
    );
  }

  if (needsDisplayNameSetup(ctx.profile, ctx.user)) {
    redirect(
      `/account/setup?next=${encodeURIComponent(returnPath)}`,
    );
  }

  if (!isCommunityParticipationAllowed(ctx.profile)) {
    return (
      <CheckInShell>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          CHECK IN AT PIXELNATION
        </h1>
        <div
          className="mt-6 rounded-2xl border border-card-border bg-card p-5"
          role="status"
        >
          <p className="text-base text-foreground">
            Check-in is not available for this account right now. Please speak
            with PixelNation staff for help.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/account"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-accent-secondary hover:underline"
          >
            Go to your account
          </Link>
        </div>
      </CheckInShell>
    );
  }

  const [communities, todayCheckIns] = await Promise.all([
    fetchActiveCommunities(),
    fetchOwnCheckInsForToday(ctx.profile.id),
  ]);

  return (
    <CheckInShell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
        PixelNation · {location.label}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        CHECK IN AT PIXELNATION
      </h1>
      <p className="mt-3 text-base text-muted">
        Hi {ctx.profile.displayName} — pick what you&apos;re playing and check
        in.
      </p>

      <div className="mt-8">
        <CheckInForm
          locationCode={location.code}
          locationLabel={location.label}
          communities={toPublicCommunityOptions(communities)}
          initialTodayCheckIns={todayCheckIns.map((row) => ({
            communitySlug: row.communitySlug,
            communityName: row.communityName,
            supportPointsAwarded: row.supportPointsAwarded,
          }))}
        />
      </div>
    </CheckInShell>
  );
}

function CheckInShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(244,197,66,0.1),_transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-lg px-4 py-10 sm:py-14 md:py-16">
        {children}
      </div>
    </div>
  );
}
