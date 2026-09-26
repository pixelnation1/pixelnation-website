import { redirect } from "next/navigation";
import {
  AuthError,
  requireStaff,
} from "@/lib/communities/auth";
import {
  fetchStaffCategoryMappings,
  fetchStaffCommunityOptions,
  fetchStaffRecentLedger,
  fetchStaffUnmatchedPurchases,
  formatSignedPoints,
  sourceLabel,
} from "@/lib/communities/square-staff";
import {
  createMappingFormAction,
  toggleMappingFormAction,
} from "@/lib/communities/square-staff-actions";
import { isSquareSupportPointsEnabled } from "@/lib/square/env";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Communities Staff | PixelNation",
  description: "Staff tools for PixelNation Communities Support Points.",
  path: "/admin/communities",
  noIndex: true,
  titleAbsolute: true,
});

function formatWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminCommunitiesPage() {
  try {
    await requireStaff();
  } catch (error) {
    if (error instanceof AuthError && error.reason === "unauthenticated") {
      redirect("/login?next=/admin/communities");
    }
    redirect("/");
  }

  const [ledger, unmatched, mappings, communities] = await Promise.all([
    fetchStaffRecentLedger(50),
    fetchStaffUnmatchedPurchases(40),
    fetchStaffCategoryMappings(),
    fetchStaffCommunityOptions(),
  ]);

  const purchaseAwardsEnabled = isSquareSupportPointsEnabled();

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
        Staff only
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
        Communities Support Points
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Ledger activity, unmatched Square purchases, and category mappings.
        Append-only ledger — no deletes. Separate from trade admin.
      </p>
      <p className="mt-2 text-sm text-muted">
        Purchase awards:{" "}
        <span className="font-semibold text-foreground">
          {purchaseAwardsEnabled ? "ENABLED" : "DISABLED (default)"}
        </span>
      </p>

      <section className="mt-10" aria-labelledby="ledger-heading">
        <h2 id="ledger-heading" className="text-lg font-semibold text-foreground">
          Recent ledger activity
        </h2>
        {ledger.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No ledger rows yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-card-border/60 rounded-xl border border-card-border bg-card/40">
            {ledger.map((row, index) => (
              <li
                key={`${row.createdAt}-${row.displayName}-${index}`}
                className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {row.displayName} · {row.communityName}
                  </p>
                  <p className="text-muted">
                    {sourceLabel(row.source)} · {formatWhen(row.createdAt)}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-foreground">
                  {formatSignedPoints(row.points)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12" aria-labelledby="unmatched-heading">
        <h2
          id="unmatched-heading"
          className="text-lg font-semibold text-foreground"
        >
          Unmatched / review Square purchases
        </h2>
        <p className="mt-2 text-sm text-muted">
          Email is staff-only. No payment instrument data is stored.
        </p>
        {unmatched.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No unmatched rows.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {unmatched.map((row) => (
              <li
                key={row.id}
                className="rounded-xl border border-card-border bg-card/40 px-4 py-3 text-sm"
              >
                <p className="font-medium text-foreground">
                  {row.matchStatus} · Order {row.squareOrderId}
                </p>
                <p className="mt-1 text-muted">
                  {formatWhen(row.occurredAt)}
                  {row.squareRefundId ? ` · Refund ${row.squareRefundId}` : ""}
                </p>
                {row.customerEmail ? (
                  <p className="mt-1 break-all text-muted">
                    Email: {row.customerEmail}
                  </p>
                ) : null}
                {row.detail ? (
                  <p className="mt-1 text-muted">{row.detail}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12" aria-labelledby="mappings-heading">
        <h2
          id="mappings-heading"
          className="text-lg font-semibold text-foreground"
        >
          Square category mappings
        </h2>
        <p className="mt-2 text-sm text-muted">
          Map Square catalog category IDs to communities. Only active mappings
          earn purchase points.
        </p>

        <form
          action={createMappingFormAction}
          className="mt-4 space-y-3 rounded-xl border border-card-border bg-card/40 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-muted">Square category ID</span>
              <input
                name="squareCategoryId"
                required
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Category name (label)</span>
              <input
                name="squareCategoryName"
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-muted">Community</span>
            <select
              name="communityId"
              required
              className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground"
              defaultValue=""
            >
              <option value="" disabled>
                Select community
              </option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input name="active" type="checkbox" defaultChecked />
            Active
          </label>
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background"
          >
            Save mapping
          </button>
        </form>

        {mappings.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No mappings yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {mappings.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-2 rounded-xl border border-card-border bg-card/40 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {row.squareCategoryName || row.squareCategoryId} →{" "}
                    {row.communityName}
                  </p>
                  <p className="text-muted">
                    {row.squareCategoryId} ·{" "}
                    {row.active ? "Active" : "Disabled"}
                  </p>
                </div>
                <form
                  action={toggleMappingFormAction.bind(
                    null,
                    row.id,
                    !row.active,
                  )}
                >
                  <button
                    type="submit"
                    className="rounded-lg border border-card-border px-3 py-1.5 text-sm text-foreground"
                  >
                    {row.active ? "Disable" : "Enable"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
