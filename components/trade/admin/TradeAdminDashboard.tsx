"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TRADE_CATEGORIES } from "@/lib/trade/types";
import type { TradeItem, TradeSettings } from "@/lib/trade/types";
import { formatCents, parseDollarsToCents } from "@/lib/trade/format";

const fieldClass =
  "min-h-10 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent-secondary focus:outline-none";

const emptyForm = {
  id: "",
  name: "",
  brand: "",
  category: "PlayStation",
  model: "",
  storage: "",
  imageUrl: "",
  cashDollars: "",
  creditDollars: "",
  requiredAccessories: "",
  conditionNote: "Fully functional and in good cosmetic condition",
  acceptsNonworking: true,
  nonworkingNote: "PixelNation may still make an offer after inspection.",
  featured: false,
  active: true,
  sortOrder: "100",
  isSample: false,
  repairHref: "",
  internalNotes: "",
};

type TradeAdminDashboardProps = {
  initialItems: TradeItem[];
  initialSettings: TradeSettings;
};

export function TradeAdminDashboard({
  initialItems,
  initialSettings,
}: TradeAdminDashboardProps) {
  const router = useRouter();
  const [items, setItems] = useState<TradeItem[]>(initialItems);
  const [settings, setSettings] = useState<TradeSettings>(initialSettings);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState(emptyForm);
  const [csvText, setCsvText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.brand, item.category, item.model, item.slug]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  async function refresh() {
    const res = await fetch("/api/trade/admin/items");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = (await res.json()) as {
      items: TradeItem[];
      settings: TradeSettings;
    };
    setItems(data.items);
    setSettings(data.settings);
  }

  function editItem(item: TradeItem) {
    setForm({
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      model: item.model,
      storage: item.storage,
      imageUrl: item.imageUrl,
      cashDollars: (item.cashValueCents / 100).toFixed(2),
      creditDollars:
        item.storeCreditValueCents == null
          ? ""
          : (item.storeCreditValueCents / 100).toFixed(2),
      requiredAccessories: item.requiredAccessories,
      conditionNote: item.conditionNote,
      acceptsNonworking: item.acceptsNonworking,
      nonworkingNote: item.nonworkingNote,
      featured: item.featured,
      active: item.active,
      sortOrder: String(item.sortOrder),
      isSample: item.isSample,
      repairHref: item.repairHref || "",
      internalNotes: item.internalNotes,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveItem(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const res = await fetch("/api/trade/admin/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id || undefined,
        name: form.name,
        brand: form.brand,
        category: form.category,
        model: form.model,
        storage: form.storage,
        imageUrl: form.imageUrl,
        cashValueCents: parseDollarsToCents(form.cashDollars),
        storeCreditValueCents:
          form.creditDollars.trim() === ""
            ? null
            : parseDollarsToCents(form.creditDollars),
        requiredAccessories: form.requiredAccessories,
        conditionNote: form.conditionNote,
        acceptsNonworking: form.acceptsNonworking,
        nonworkingNote: form.nonworkingNote,
        featured: form.featured,
        active: form.active,
        sortOrder: Number.parseInt(form.sortOrder, 10) || 100,
        isSample: form.isSample,
        repairHref: form.repairHref || null,
        internalNotes: form.internalNotes,
      }),
    });
    const data = (await res.json()) as { error?: string; items?: TradeItem[] };
    if (!res.ok) {
      setError(data.error || "Save failed.");
      return;
    }
    setItems(data.items || []);
    setForm(emptyForm);
    setMessage("Product saved. updated_at was refreshed automatically.");
  }

  async function bulk(action: "bulk-archive" | "bulk-activate") {
    const ids = [...selected];
    if (!ids.length) return;
    const res = await fetch("/api/trade/admin/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ids }),
    });
    const data = (await res.json()) as { items?: TradeItem[]; error?: string };
    if (!res.ok) {
      setError(data.error || "Bulk update failed.");
      return;
    }
    setItems(data.items || []);
    setSelected(new Set());
    setMessage(
      action === "bulk-archive"
        ? "Selected items archived."
        : "Selected items activated.",
    );
  }

  async function saveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/trade/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = (await res.json()) as { error?: string; settings?: TradeSettings };
    if (!res.ok) {
      setError(data.error || "Settings save failed.");
      return;
    }
    setSettings(data.settings || settings);
    setMessage("Settings saved.");
  }

  async function importCsv(mode: "merge" | "replace") {
    setError("");
    const res = await fetch("/api/trade/admin/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv: csvText, mode }),
    });
    const data = (await res.json()) as { error?: string; count?: number };
    if (!res.ok) {
      setError(data.error || "Import failed.");
      return;
    }
    setMessage(`Imported ${data.count} row(s) (${mode}).`);
    await refresh();
  }

  async function exportCsv() {
    const res = await fetch("/api/trade/admin/export");
    if (!res.ok) {
      setError("Export failed.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pixelnation-trade-values.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/trade/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          DEVELOPMENT NOTE: Sample values must be reviewed and approved before publishing as
          live PixelNation offers. Internal notes never appear on the public site.
        </p>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-lg border border-card-border px-3 py-2 text-sm font-semibold text-foreground hover:border-accent-secondary"
        >
          Sign out
        </button>
      </div>

      {message ? <p className="text-sm text-accent-secondary">{message}</p> : null}
      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <form onSubmit={saveItem} className="space-y-4 rounded-2xl border border-card-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">
          {form.id ? "Edit product" : "Add product"}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className={fieldClass} placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className={fieldClass} placeholder="Brand *" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
          <select className={fieldClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {TRADE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <input className={fieldClass} placeholder="Storage" value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })} />
          <input className={fieldClass} placeholder="Cash value (dollars)" value={form.cashDollars} onChange={(e) => setForm({ ...form, cashDollars: e.target.value })} required />
          <input className={fieldClass} placeholder="Store credit (dollars, blank = multiplier)" value={form.creditDollars} onChange={(e) => setForm({ ...form, creditDollars: e.target.value })} />
          <input className={fieldClass} placeholder="Repair page href (optional)" value={form.repairHref} onChange={(e) => setForm({ ...form, repairHref: e.target.value })} />
          <input className={fieldClass} placeholder="Sort order" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
        </div>
        <div className="rounded-xl border border-card-border bg-background/40 p-3 md:col-span-2">
          <p className="mb-2 text-xs font-semibold uppercase text-muted">Product image</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-card-border bg-white">
              {form.imageUrl && !form.imageUrl.includes("pixellogo") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.imageUrl}
                  alt={form.name || "Product preview"}
                  className="h-full w-full object-contain p-2"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-2 text-center text-[11px] text-muted">
                  Image coming soon
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <label className="block text-xs text-muted">
                Image URL or local path
                <input
                  className={`${fieldClass} mt-1`}
                  placeholder="/images/trade-values/example.webp or https://..."
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value.trim() })}
                />
              </label>
              <p className="text-xs text-muted">
                Prefer files under <code className="text-accent-secondary">/public/images/trade-values/</code>.
                Supported: .webp, .jpg, .jpeg, .png, .avif
              </p>
              <button
                type="button"
                onClick={() => setForm({ ...form, imageUrl: "" })}
                className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-semibold text-muted hover:text-foreground"
              >
                Remove image
              </button>
            </div>
          </div>
        </div>
        <textarea className={fieldClass} placeholder="Required accessories" value={form.requiredAccessories} onChange={(e) => setForm({ ...form, requiredAccessories: e.target.value })} rows={2} />
        <textarea className={fieldClass} placeholder="Customer-facing condition note" value={form.conditionNote} onChange={(e) => setForm({ ...form, conditionNote: e.target.value })} rows={2} />
        <textarea className={fieldClass} placeholder="Nonworking note" value={form.nonworkingNote} onChange={(e) => setForm({ ...form, nonworkingNote: e.target.value })} rows={2} />
        <textarea className={fieldClass} placeholder="Internal notes (not public)" value={form.internalNotes} onChange={(e) => setForm({ ...form, internalNotes: e.target.value })} rows={2} />
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.acceptsNonworking} onChange={(e) => setForm({ ...form, acceptsNonworking: e.target.checked })} />
            Accepts nonworking
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.isSample} onChange={(e) => setForm({ ...form, isSample: e.target.checked })} />
            Sample data
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-hover">
            Save product
          </button>
          <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-card-border px-4 py-2 text-sm font-semibold">
            Reset form
          </button>
        </div>
      </form>

      <form onSubmit={saveSettings} className="space-y-3 rounded-2xl border border-card-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Admin settings</h2>
        <label className="block text-sm text-muted">
          Store credit multiplier (used when a product has no manual credit value)
          <input
            className={`${fieldClass} mt-1`}
            type="number"
            min="1"
            step="0.01"
            value={settings.storeCreditMultiplier}
            onChange={(e) =>
              setSettings({
                ...settings,
                storeCreditMultiplier: Number.parseFloat(e.target.value) || 1,
              })
            }
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={settings.showSampleDataBanner}
            onChange={(e) =>
              setSettings({ ...settings, showSampleDataBanner: e.target.checked })
            }
          />
          Show sample-data banner on public Trade Values page
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={settings.publishSampleItems}
            onChange={(e) =>
              setSettings({ ...settings, publishSampleItems: e.target.checked })
            }
          />
          Publish sample items publicly
        </label>
        <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background">
          Save settings
        </button>
      </form>

      <div className="space-y-3 rounded-2xl border border-card-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">CSV import / export</h2>
        <p className="text-sm text-muted">
          Export current values, edit offline, then import with merge (upsert by id) or replace
          (overwrite all).
        </p>
        <button
          type="button"
          onClick={() => void exportCsv()}
          className="inline-flex rounded-lg border border-card-border px-4 py-2 text-sm font-semibold hover:border-accent-secondary"
        >
          Export CSV
        </button>
        <textarea
          className={`${fieldClass} min-h-[140px] font-mono text-xs`}
          placeholder="Paste CSV here…"
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => void importCsv("merge")} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background">
            Import merge
          </button>
          <button type="button" onClick={() => void importCsv("replace")} className="rounded-lg border border-card-border px-4 py-2 text-sm font-semibold">
            Import replace all
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <label htmlFor="admin-search" className="mb-1.5 block text-xs font-semibold uppercase">
              Search listings
            </label>
            <input
              id="admin-search"
              className={fieldClass}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, brand, category…"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void bulk("bulk-activate")} className="rounded-lg border border-card-border px-3 py-2 text-sm font-semibold">
              Activate selected
            </button>
            <button type="button" onClick={() => void bulk("bulk-archive")} className="rounded-lg border border-card-border px-3 py-2 text-sm font-semibold">
              Archive selected
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-card-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-card text-xs uppercase text-muted">
              <tr>
                <th className="px-3 py-3">Sel</th>
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">Cash</th>
                <th className="px-3 py-3">Credit</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-card-border">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={(e) => {
                        const next = new Set(selected);
                        if (e.target.checked) next.add(item.id);
                        else next.delete(item.id);
                        setSelected(next);
                      }}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.brand} · {item.category}
                      {item.isSample ? " · SAMPLE" : ""}
                    </p>
                  </td>
                  <td className="px-3 py-3">{formatCents(item.cashValueCents)}</td>
                  <td className="px-3 py-3">
                    {item.storeCreditValueCents == null
                      ? "Multiplier"
                      : formatCents(item.storeCreditValueCents)}
                  </td>
                  <td className="px-3 py-3">{item.active ? "Active" : "Archived"}</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => editItem(item)}
                      className="text-accent-secondary hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
