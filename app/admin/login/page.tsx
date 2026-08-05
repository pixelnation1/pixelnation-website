import { redirect } from "next/navigation";
import { TradeAdminLoginForm } from "@/components/trade/admin/TradeAdminLoginForm";
import { isTradeAdminAuthenticated, isTradeAdminConfigured } from "@/lib/trade/auth";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Trade Admin Login | PixelNation",
  description: "Secure login for PixelNation trade values administration.",
  path: "/admin/login",
  noIndex: true,
  titleAbsolute: true,
});

export default async function TradeAdminLoginPage() {
  if (await isTradeAdminAuthenticated()) {
    redirect("/admin/trade-values");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-center text-3xl font-bold tracking-tight">Trade Values Admin</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
        Authorized staff only. Configure <code className="text-accent-secondary">TRADE_ADMIN_PASSWORD</code>{" "}
        before signing in.
      </p>
      {!isTradeAdminConfigured() ? (
        <p className="mx-auto mt-6 max-w-xl rounded-xl border border-accent/40 bg-accent-muted p-4 text-center text-sm">
          Admin login is disabled until TRADE_ADMIN_PASSWORD is set in the environment.
        </p>
      ) : (
        <div className="mt-8">
          <TradeAdminLoginForm />
        </div>
      )}
    </div>
  );
}
