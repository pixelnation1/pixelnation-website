import { DisplayNameForm } from "@/components/auth/DisplayNameForm";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { requireUserForPage } from "@/lib/communities/auth";
import { DEFAULT_DISPLAY_NAME } from "@/lib/communities/constants";
import { needsDisplayNameSetup } from "@/lib/communities/profile";
import { getSafeInternalPath } from "@/lib/communities/redirect";
import { createPageMetadata } from "@/lib/seo/metadata";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Choose Display Name | PixelNation",
  description: "Choose the public display name for your PixelNation account.",
  path: "/account/setup",
  noIndex: true,
  titleAbsolute: true,
});

type SetupPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AccountSetupPage({ searchParams }: SetupPageProps) {
  const params = await searchParams;
  const nextPath = getSafeInternalPath(params.next, "/account");
  const { user, profile } = await requireUserForPage(
    `/account/setup?next=${encodeURIComponent(nextPath)}`,
  );

  if (!needsDisplayNameSetup(profile, user)) {
    redirect(nextPath);
  }

  const initialName =
    profile.displayName === DEFAULT_DISPLAY_NAME ? "" : profile.displayName;

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-lg px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation Account
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Choose your display name
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Pick a name for your PixelNation community profile. You can change it
          later from your account page.
        </p>

        <div className="mt-8">
          <DisplayNameForm
            initialName={initialName}
            redirectTo={nextPath}
            submitLabel="Continue"
          />
        </div>

        <div className="mt-8">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
