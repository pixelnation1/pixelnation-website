import { redirect } from "next/navigation";
import { TradeAdminDashboard } from "@/components/trade/admin/TradeAdminDashboard";
import { isTradeAdminAuthenticated } from "@/lib/trade/auth";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getTradeSnapshot } from "@/lib/trade/store";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Manage Trade Values | PixelNation Admin",
  description: "Manage PixelNation trade value listings.",
  path: "/admin/trade-values",
  noIndex: true,
  titleAbsolute: true,
});

export default async function TradeAdminPage() {
  if (!(await isTradeAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const snapshot = await getTradeSnapshot();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Manage Trade Values</h1>
      <p className="mt-2 text-sm text-muted">
        Add, edit, archive, import, and export trade listings without changing source code.
      </p>
      <div className="mt-8">
        <TradeAdminDashboard
          initialItems={snapshot.items}
          initialSettings={snapshot.settings}
        />
      </div>
    </div>
  );
}
