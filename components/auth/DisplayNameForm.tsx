"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DISPLAY_NAME_MAX_LENGTH,
  DISPLAY_NAME_MIN_LENGTH,
  DISPLAY_NAME_PUBLIC_NOTICE,
} from "@/lib/communities/constants";

type DisplayNameFormProps = {
  initialName: string;
  /** After save, navigate here (e.g. /account or a safe next path). */
  redirectTo?: string;
  submitLabel?: string;
};

export function DisplayNameForm({
  initialName,
  redirectTo = "/account",
  submitLabel = "Save display name",
}: DisplayNameFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialName);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/account/display-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName }),
      });
      const data = (await res.json()) as {
        error?: string;
        displayName?: string;
      };

      if (!res.ok) {
        setError(data.error || "Unable to save display name.");
        setLoading(false);
        return;
      }

      if (data.displayName) setDisplayName(data.displayName);
      setSuccess("Display name saved.");
      setLoading(false);
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Unable to save display name.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-card-border bg-card p-6"
    >
      <div>
        <label
          htmlFor="display-name"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground"
        >
          Display name
        </label>
        <input
          id="display-name"
          name="displayName"
          type="text"
          autoComplete="nickname"
          required
          minLength={DISPLAY_NAME_MIN_LENGTH}
          maxLength={DISPLAY_NAME_MAX_LENGTH}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent-secondary focus:outline-none"
          aria-describedby="display-name-help display-name-notice"
          aria-invalid={error ? true : undefined}
          disabled={loading}
        />
        <p id="display-name-help" className="mt-2 text-xs text-muted">
          {DISPLAY_NAME_MIN_LENGTH}–{DISPLAY_NAME_MAX_LENGTH} characters. Shown
          as plain text.
        </p>
        <p
          id="display-name-notice"
          className="mt-2 text-sm text-accent-secondary"
        >
          {DISPLAY_NAME_PUBLIC_NOTICE}
        </p>
      </div>

      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-sm text-accent-secondary" role="status" aria-live="polite">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
