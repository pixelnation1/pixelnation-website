"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { formatChicagoBusinessDateDisplay } from "@/lib/communities/business-date";
import type { PublicCommunityOption } from "@/lib/communities/communities";

type TodayCheckInSummary = {
  communitySlug: string;
  communityName: string;
};

type CheckInFormProps = {
  locationCode: string;
  locationLabel: string;
  communities: PublicCommunityOption[];
  initialTodayCheckIns: TodayCheckInSummary[];
};

type SuccessState = {
  communityName: string;
  communitySlug: string;
  businessDate: string;
  locationLabel: string;
};

export function CheckInForm({
  locationCode,
  locationLabel,
  communities,
  initialTodayCheckIns,
}: CheckInFormProps) {
  const router = useRouter();
  const groupId = useId();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [todayCheckIns, setTodayCheckIns] =
    useState<TodayCheckInSummary[]>(initialTodayCheckIns);

  async function handleCheckIn() {
    if (!selectedSlug) {
      setError("Choose what you are playing today.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/communities/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communitySlug: selectedSlug,
          locationCode,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        code?: string;
        communityName?: string;
        communitySlug?: string;
        businessDate?: string;
        locationLabel?: string;
      };

      if (res.status === 409 && data.code === "already_checked_in") {
        setError(
          data.message ||
            data.error ||
            "YOU'RE ALREADY CHECKED IN for that community today.",
        );
        setStatus("idle");
        return;
      }

      if (!res.ok || !data.ok) {
        setError(data.error || "Unable to complete check-in. Please try again.");
        setStatus("idle");
        return;
      }

      const communityName = data.communityName ?? "your community";
      const communitySlug = data.communitySlug ?? selectedSlug;
      const businessDate = data.businessDate ?? "";

      setSuccess({
        communityName,
        communitySlug,
        businessDate,
        locationLabel: data.locationLabel ?? locationLabel,
      });

      setTodayCheckIns((prev) => {
        if (prev.some((row) => row.communitySlug === communitySlug)) {
          return prev;
        }
        return [...prev, { communitySlug, communityName }];
      });

      setSelectedSlug(null);
      setStatus("success");
      router.refresh();
    } catch {
      setError("Unable to complete check-in. Please try again.");
      setStatus("idle");
    }
  }

  function handleAnotherGame() {
    setSuccess(null);
    setStatus("idle");
    setError("");
    setSelectedSlug(null);
  }

  if (status === "success" && success) {
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="rounded-2xl border border-accent-secondary/50 bg-accent-secondary-muted p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            PixelNation
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            YOU&apos;RE CHECKED IN
          </h2>
          <p className="mt-3 text-base text-foreground">
            <span className="font-semibold">{success.communityName}</span>
            {success.businessDate ? (
              <>
                {" "}
                · {formatChicagoBusinessDateDisplay(success.businessDate)}
              </>
            ) : null}
          </p>
          <p className="mt-2 text-sm text-muted">{success.locationLabel}</p>
        </div>

        <button
          type="button"
          onClick={handleAnotherGame}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover sm:w-auto"
        >
          CHECK IN FOR ANOTHER GAME
        </button>

        <TodayCheckInsList items={todayCheckIns} />
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div
        className="rounded-2xl border border-card-border bg-card p-6"
        role="status"
      >
        <p className="text-base text-foreground">
          Community check-in is not available right now. Please ask PixelNation
          staff for help.
        </p>
        <Link
          href="/communities"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent-secondary hover:underline"
        >
          Back to Communities
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <fieldset className="space-y-3">
        <legend
          id={`${groupId}-legend`}
          className="text-lg font-semibold text-foreground"
        >
          What are you playing today?
        </legend>
        <p className="text-sm text-muted" id={`${groupId}-hint`}>
          Tap one community, then check in. You can check into another game
          later today.
        </p>

        <div
          role="radiogroup"
          aria-labelledby={`${groupId}-legend`}
          aria-describedby={`${groupId}-hint`}
          className="grid gap-3"
        >
          {communities.map((community) => {
            const selected = selectedSlug === community.slug;
            return (
              <button
                key={community.slug}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setSelectedSlug(community.slug);
                  setError("");
                }}
                className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-4 text-left text-base font-semibold transition-colors ${
                  selected
                    ? "border-accent bg-accent/15 text-foreground ring-2 ring-accent"
                    : "border-card-border bg-card text-foreground hover:border-accent-secondary/60"
                }`}
              >
                <span>{community.name}</span>
                {selected ? (
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-accent">
                    Selected
                  </span>
                ) : (
                  <span className="sr-only">Not selected</span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p
          className="rounded-xl border border-accent/40 bg-accent-muted px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleCheckIn}
        disabled={status === "loading" || !selectedSlug}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Checking in…" : "CHECK IN"}
      </button>

      <TodayCheckInsList items={todayCheckIns} />
    </div>
  );
}

function TodayCheckInsList({ items }: { items: TodayCheckInSummary[] }) {
  if (items.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-card-border bg-card/70 p-5"
      aria-labelledby="today-check-ins-heading"
    >
      <h2
        id="today-check-ins-heading"
        className="text-sm font-semibold uppercase tracking-wide text-muted"
      >
        Your check-ins today
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.communitySlug}
            className="flex min-h-11 items-center gap-2 text-base text-foreground"
          >
            <span className="text-accent" aria-hidden>
              ✓
            </span>
            <span>{item.communityName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
