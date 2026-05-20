"use client";

import { useState } from "react";
import {
  FORM_SERVICE_OPTIONS,
  PREFERRED_CONTACT_OPTIONS,
} from "@/lib/contact-page";

const fieldClass =
  "min-h-11 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted/50 focus:border-accent-secondary focus:outline-none focus:ring-1 focus:ring-accent-secondary/40 sm:text-sm";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  deviceType: string;
  description: string;
  preferredContact: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  deviceType: "",
  description: "",
  preferredContact: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again or call us.");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to send your message. Please call 620-591-0083 or email support@pixelnation.co.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-accent-secondary/40 bg-accent-secondary-muted p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-foreground">Message sent</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thank you for contacting PixelNation. We received your message and will respond
          during business hours (Monday–Friday, 9:00 AM–3:00 PM). For urgent help, call{" "}
          <a href="tel:+16205910083" className="font-medium text-accent-secondary">
            620-591-0083
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Email address <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Phone number <span className="text-accent">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
            Service needed <span className="text-accent">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={form.service}
            onChange={(e) => updateField("service", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a service</option>
            {FORM_SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-device" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Device type <span className="text-accent">*</span>
        </label>
        <input
          id="contact-device"
          name="deviceType"
          type="text"
          required
          placeholder="e.g. iPhone 14, PS5, Dell laptop, Samsung dryer"
          value={form.deviceType}
          onChange={(e) => updateField("deviceType", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-description" className="mb-1.5 block text-xs font-semibold uppercase text-foreground">
          Description of the problem <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-description"
          name="description"
          required
          rows={5}
          placeholder="Describe symptoms, damage, and what you need recovered or repaired."
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className={`${fieldClass} resize-y min-h-[120px]`}
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase text-foreground">
          Preferred contact method <span className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {PREFERRED_CONTACT_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted"
            >
              <input
                type="radio"
                name="preferredContact"
                value={option}
                required
                checked={form.preferredContact === option}
                onChange={() => updateField("preferredContact", option)}
                className="accent-accent-secondary"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

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
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-muted">
        For the fastest response during business hours, call{" "}
        <a href="tel:+16205910083" className="text-accent-secondary hover:underline">
          620-591-0083
        </a>
        .
      </p>
    </form>
  );
}
