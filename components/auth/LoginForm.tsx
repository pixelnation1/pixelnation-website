"use client";

import { useState } from "react";

type LoginFormProps = {
  nextPath: string;
  initialError?: string | null;
};

const FRIENDLY_ERRORS: Record<string, string> = {
  missing: "That sign-in link was incomplete. Request a new link below.",
  invalid:
    "That sign-in link is invalid or has expired. Request a new link below.",
  session: "We could not start your session. Request a new sign-in link below.",
};

export function LoginForm({ nextPath, initialError }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState(
    initialError ? FRIENDLY_ERRORS[initialError] ?? "Something went wrong. Please try again." : "",
  );
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next: nextPath }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        setError(data.error || "Unable to send sign-in link. Please try again.");
        setStatus("idle");
        return;
      }

      setSuccessMessage(
        data.message ||
          "Check your email. We sent you a secure PixelNation sign-in link.",
      );
      setStatus("sent");
    } catch {
      setError("Unable to send sign-in link. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-2xl border border-accent-secondary/40 bg-accent-secondary-muted p-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-medium text-foreground">{successMessage}</p>
        <p className="mt-3 text-sm text-muted">
          Open the email on this device and tap the link to finish signing in.
          The link expires after a short time.
        </p>
        <button
          type="button"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-card-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary"
          onClick={() => {
            setStatus("idle");
            setSuccessMessage("");
          }}
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-card-border bg-card p-6"
      noValidate
    >
      <div>
        <label
          htmlFor="login-email"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground"
        >
          Email address
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-secondary focus:outline-none"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "login-error" : undefined}
          disabled={status === "loading"}
        />
      </div>

      {error ? (
        <p id="login-error" className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Sign-In Link"}
      </button>
    </form>
  );
}
