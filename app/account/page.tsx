import { DisplayNameForm } from "@/components/auth/DisplayNameForm";
import { SignOutButton } from "@/components/auth/SignOutButton";
import {
  isCommunityParticipationAllowed,
  requireUserForPage,
} from "@/lib/communities/auth";
import { formatChicagoBusinessDateDisplay } from "@/lib/communities/business-date";
import { fetchOwnCheckInHistory } from "@/lib/communities/check-ins";
import { DEFAULT_DISPLAY_NAME } from "@/lib/communities/constants";
import { needsDisplayNameSetup } from "@/lib/communities/profile";
import { fetchOwnSupportPointSummary } from "@/lib/communities/support-points";
import { createPageMetadata } from "@/lib/seo/metadata";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Your Account | PixelNation",
  description: "Manage your PixelNation community account and display name.",
  path: "/account",
  noIndex: true,
  titleAbsolute: true,
});

function accountStatusLabel(status: "active" | "suspended"): string {
  if (status === "active") return "Active";
  return "Unavailable for Community participation";
}

export default async function AccountPage() {
  const { user, profile } = await requireUserForPage("/account");

  if (needsDisplayNameSetup(profile, user)) {
    redirect("/account/setup");
  }

  const suspended = !isCommunityParticipationAllowed(profile);
  const email = user.email ?? "";
  const [checkInHistory, supportPoints] = await Promise.all([
    fetchOwnCheckInHistory(profile.id, 10),
    fetchOwnSupportPointSummary(profile.id),
  ]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.1),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(244,197,66,0.08),_transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation Account
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          PIXELNATION ACCOUNT
        </h1>
        <p className="mt-3 text-base text-muted">
          Your PixelNation community profile.
        </p>

        {suspended ? (
          <div
            className="mt-6 rounded-xl border border-accent/40 bg-accent-muted p-4"
            role="status"
          >
            <p className="text-sm text-foreground">
              This account is currently unavailable for Community participation.
              You can still view your profile details below. Contact PixelNation
              if you need help.
            </p>
          </div>
        ) : null}

        <dl className="mt-8 space-y-4 rounded-2xl border border-card-border bg-card p-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Display name
            </dt>
            <dd className="mt-1 text-lg font-medium text-foreground">
              {profile.displayName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Email
            </dt>
            <dd className="mt-1 break-all text-base text-foreground">{email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Account status
            </dt>
            <dd className="mt-1 text-base text-foreground">
              {accountStatusLabel(profile.accountStatus)}
            </dd>
          </div>
        </dl>

        <section className="mt-8" aria-labelledby="support-points-heading">
          <h2
            id="support-points-heading"
            className="text-lg font-semibold text-foreground"
          >
            Support Points
          </h2>
          <p className="mt-2 text-sm text-muted">
            Total Support Points:{" "}
            <span className="font-semibold text-foreground">
              {supportPoints.totalPoints}
            </span>
          </p>

          {supportPoints.byCommunity.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {supportPoints.byCommunity.map((row) => (
                <li
                  key={row.communityName}
                  className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-foreground">
                    {row.communityName}
                  </span>
                  <span className="shrink-0 font-semibold text-foreground">
                    {row.points}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No Support Points yet. Check in at PixelNation to start earning.
            </p>
          )}
        </section>

        <section className="mt-8" aria-labelledby="check-ins-heading">
          <h2
            id="check-ins-heading"
            className="text-lg font-semibold text-foreground"
          >
            Community Check-Ins
          </h2>
          <p className="mt-2 text-sm text-muted">
            Total check-ins:{" "}
            <span className="font-semibold text-foreground">
              {checkInHistory.totalCount}
            </span>
          </p>

          {checkInHistory.recent.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {checkInHistory.recent.map((row, index) => (
                <li
                  key={`${row.communityName}-${row.businessDate}-${index}`}
                  className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-foreground">
                    {row.communityName}
                  </span>
                  <span className="shrink-0 text-muted">
                    {formatChicagoBusinessDateDisplay(row.businessDate)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No check-ins yet. When you play at PixelNation, check in from the
              store QR code.
            </p>
          )}
        </section>

        <section className="mt-8" aria-labelledby="coming-soon-heading">
          <h2
            id="coming-soon-heading"
            className="text-lg font-semibold text-foreground"
          >
            Coming soon
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3 text-sm">
              <span className="text-foreground">Top Supporters</span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                Coming Soon
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="edit-name-heading">
          <h2
            id="edit-name-heading"
            className="mb-4 text-lg font-semibold text-foreground"
          >
            Edit display name
          </h2>
          <DisplayNameForm
            initialName={
              profile.displayName === DEFAULT_DISPLAY_NAME
                ? ""
                : profile.displayName
            }
            redirectTo="/account"
            submitLabel="Update display name"
          />
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
