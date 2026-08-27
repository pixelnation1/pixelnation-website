"use client";

import { useState } from "react";
import { isValidUsPhone } from "@/lib/legal/sms";

const fieldClass =
  "min-h-11 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent-secondary focus:outline-none focus:ring-1 focus:ring-accent-secondary/40 sm:text-sm";

type EventRegistrationFormProps = {
  eventSlug: string;
  eventTitle: string;
  remainingSeats?: number | null;
};

export function EventRegistrationForm({
  eventSlug,
  eventTitle,
  remainingSeats,
}: EventRegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [playerCount, setPlayerCount] = useState("1");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const maxPlayers =
    typeof remainingSeats === "number" && remainingSeats > 0
      ? Math.min(remainingSeats, 12)
      : 12;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    if (phone.trim() && !isValidUsPhone(phone)) {
      setStatus("error");
      setMessage("Please enter a valid U.S. phone number, or leave it blank.");
      return;
    }

    const players = Number(playerCount);
    if (!Number.isInteger(players) || players < 1 || players > maxPlayers) {
      setStatus("error");
      setMessage(`Please choose between 1 and ${maxPlayers} players.`);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          playerCount: players,
        }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unable to submit registration. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(
        data.message ??
          `You're registered for ${eventTitle}. We'll follow up if anything changes.`,
      );
      setName("");
      setEmail("");
      setPhone("");
      setPlayerCount("1");
    } catch {
      setStatus("error");
      setMessage("Unable to submit registration right now. Please call PixelNation.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent-muted p-6">
        <h3 className="text-lg font-semibold text-foreground">Registration received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
      </div>
    );
  }

  return (
    <form id="register" onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="event-reg-name" className="mb-1.5 block text-sm font-medium">
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="event-reg-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="event-reg-email" className="mb-1.5 block text-sm font-medium">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="event-reg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="event-reg-phone" className="mb-1.5 block text-sm font-medium">
          Phone <span className="text-muted">(optional)</span>
        </label>
        <input
          id="event-reg-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="event-reg-players" className="mb-1.5 block text-sm font-medium">
          Number of players <span className="text-accent">*</span>
        </label>
        <input
          id="event-reg-players"
          name="playerCount"
          type="number"
          min={1}
          max={maxPlayers}
          required
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
          className={fieldClass}
        />
      </div>
      {message && status === "error" ? (
        <p className="text-sm text-accent" role="alert">
          {message}
        </p>
      ) : null}
      <p className="text-xs leading-relaxed text-muted">
        Registration holds your spot. Paid checkout can be added later for ticketed
        events—this form does not process payments.
      </p>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/25 transition-colors hover:bg-accent-hover disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Register Now"}
      </button>
    </form>
  );
}
