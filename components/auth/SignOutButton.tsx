"use client";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className = "" }: SignOutButtonProps) {
  return (
    <form action="/api/auth/sign-out" method="post">
      <button
        type="submit"
        className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-card-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent ${className}`}
      >
        Sign Out
      </button>
    </form>
  );
}
