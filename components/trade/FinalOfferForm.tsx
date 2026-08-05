"use client";

import { useMemo, useState } from "react";
import {
  COSMETIC_CONDITION_OPTIONS,
  PREFERRED_PAYMENT_OPTIONS,
  TRADE_CATEGORIES,
  WORKING_STATUS_OPTIONS,
} from "@/lib/trade/types";
import { FINAL_OFFER_CONSENT } from "@/lib/trade/content";
import type { PublicTradeItem } from "@/lib/trade/types";
import { formatCents } from "@/lib/trade/format";

const fieldClass =
  "min-h-11 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent-secondary focus:outline-none focus:ring-1 focus:ring-accent-secondary/40 sm:text-sm";

type FinalOfferFormProps = {
  prefill?: PublicTradeItem | null;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  brand: string;
  model: string;
  storage: string;
  workingStatus: string;
  cosmeticCondition: string;
  includedAccessories: string;
  issueDescription: string;
  preferredPayment: string;
  consent: boolean;
  website: string;
};

export function FinalOfferForm({ prefill = null }: FinalOfferFormProps) {
  const initial = useMemo<FormState>(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      category: prefill?.category || "",
      brand: prefill?.brand || "",
      model: prefill?.model || prefill?.name || "",
      storage: prefill?.storage || "",
      workingStatus: "",
      cosmeticCondition: "",
      includedAccessories: prefill?.requiredAccessories || "",
      issueDescription: "",
      preferredPayment: "",
      consent: false,
      website: "",
    }),
    [prefill],
  );

  const [form, setForm] = useState<FormState>(initial);
  const [photos, setPhotos] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedKey, setSubmittedKey] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onPhotosSelected(files: FileList | null) {
    if (!files?.length) return;
    const selected = Array.from(files).slice(0, 3);
    const urls: string[] = [];
    for (const file of selected) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 1_200_000) {
        setErrorMessage("Each photo must be under about 1.2MB. Please compress and retry.");
        return;
      }
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("read failed"));
        reader.readAsDataURL(file);
      });
      urls.push(dataUrl);
    }
    setPhotos(urls);
    setErrorMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!form.consent) {
      setStatus("error");
      setErrorMessage("Please confirm that you understand online values are estimates.");
      return;
    }

    const dedupeKey = [
      form.email.trim().toLowerCase(),
      form.model.trim().toLowerCase(),
      form.phone.trim(),
    ].join("|");
    if (submittedKey === dedupeKey) {
      setStatus("error");
      setErrorMessage("This request looks like a duplicate. We already received your submission.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/trade/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productSlug: prefill?.slug,
          productName: prefill?.name,
          estimateCashCents: prefill?.displayCashCents ?? null,
          estimateCreditCents: prefill?.displayStoreCreditCents ?? null,
          photoDataUrls: photos,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Unable to submit right now. Please try again or call us.");
        return;
      }
      setSubmittedKey(dedupeKey);
      setStatus("success");
      setForm(initial);
      setPhotos([]);
    } catch {
      setStatus("error");
      setErrorMessage("Unable to submit right now. Please try again or call PixelNation.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-accent-secondary/40 bg-accent-secondary-muted p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-foreground">Request received</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thanks for contacting PixelNation. We received your final-offer request and will
          follow up during business hours. Remember: any online value is only an estimate until
          we inspect your item in store.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {prefill ? (
        <div className="rounded-xl border border-card-border bg-card p-4 text-sm text-muted">
          <p className="font-semibold text-foreground">{prefill.name}</p>
          <p className="mt-1">
            Listed estimate: cash {formatCents(prefill.displayCashCents)} · store credit{" "}
            {formatCents(prefill.displayStoreCreditCents)}
          </p>
          <p className="mt-1 text-xs">Estimates only — final offer requires inspection.</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-first" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            First name <span className="text-accent">*</span>
          </label>
          <input
            id="offer-first"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="offer-last" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Last name <span className="text-accent">*</span>
          </label>
          <input
            id="offer-last"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-email" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="offer-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="offer-phone" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Phone number <span className="text-accent">*</span>
          </label>
          <input
            id="offer-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-category" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Product category <span className="text-accent">*</span>
          </label>
          <select
            id="offer-category"
            required
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select category</option>
            {TRADE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="offer-brand" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Brand <span className="text-accent">*</span>
          </label>
          <input
            id="offer-brand"
            required
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-model" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Exact model <span className="text-accent">*</span>
          </label>
          <input
            id="offer-model"
            required
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="offer-storage" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Storage capacity
          </label>
          <input
            id="offer-storage"
            value={form.storage}
            onChange={(e) => update("storage", e.target.value)}
            placeholder="e.g. 512GB"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-working" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Working status <span className="text-accent">*</span>
          </label>
          <select
            id="offer-working"
            required
            value={form.workingStatus}
            onChange={(e) => update("workingStatus", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select status</option>
            {WORKING_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="offer-cosmetic" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Cosmetic condition <span className="text-accent">*</span>
          </label>
          <select
            id="offer-cosmetic"
            required
            value={form.cosmeticCondition}
            onChange={(e) => update("cosmeticCondition", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select condition</option>
            {COSMETIC_CONDITION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="offer-accessories" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Included accessories <span className="text-accent">*</span>
        </label>
        <textarea
          id="offer-accessories"
          required
          rows={3}
          value={form.includedAccessories}
          onChange={(e) => update("includedAccessories", e.target.value)}
          className={`${fieldClass} min-h-[96px] resize-y`}
        />
      </div>

      <div>
        <label htmlFor="offer-issues" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Description of damage or problems
        </label>
        <textarea
          id="offer-issues"
          rows={4}
          value={form.issueDescription}
          onChange={(e) => update("issueDescription", e.target.value)}
          className={`${fieldClass} min-h-[120px] resize-y`}
        />
      </div>

      <div>
        <label htmlFor="offer-payment" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Preferred option <span className="text-accent">*</span>
        </label>
        <select
          id="offer-payment"
          required
          value={form.preferredPayment}
          onChange={(e) => update("preferredPayment", e.target.value)}
          className={fieldClass}
        >
          <option value="">Select preference</option>
          {PREFERRED_PAYMENT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="offer-photos" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Optional photos (up to 3)
        </label>
        <input
          id="offer-photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => void onPhotosSelected(e.target.files)}
          className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"
        />
        {photos.length > 0 ? (
          <p className="mt-2 text-xs text-muted">{photos.length} photo(s) attached for staff review.</p>
        ) : null}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="offer-website">Website</label>
        <input
          id="offer-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="flex gap-3 rounded-xl border border-card-border p-4">
        <input
          id="offer-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-accent-secondary"
        />
        <label htmlFor="offer-consent" className="cursor-pointer text-sm leading-relaxed text-muted">
          {FINAL_OFFER_CONSENT}
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-accent" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request Final Offer"}
      </button>
    </form>
  );
}
