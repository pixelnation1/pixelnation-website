"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

let scrollLocks = 0;

function lockScroll() {
  scrollLocks += 1;
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.style.overflow = "";
}

function subscribe() {
  return () => {};
}

function clientSnapshot() {
  return true;
}

function serverSnapshot() {
  return false;
}

type ModalProps = {
  open: boolean;
  titleId: string;
  onClose: () => void;
  children: React.ReactNode;
  fullScreenOnMobile?: boolean;
};

export function Modal({
  open,
  titleId,
  onClose,
  children,
  fullScreenOnMobile = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  useEffect(() => {
    if (!open || !mounted) return;

    const dialog = dialogRef.current;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();

    const focusFirst = () => {
      if (!dialog) return;
      const targets = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      (targets[0] ?? dialog).focus();
    };
    focusFirst();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const targets = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );
      if (targets.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      previous?.focus();
    };
  }, [open, mounted, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId || labelId}
        tabIndex={-1}
        className={`relative z-10 flex max-h-[100dvh] w-full flex-col overflow-hidden border border-card-border bg-background text-foreground shadow-2xl outline-none ${
          fullScreenOnMobile
            ? "h-[100dvh] sm:h-auto sm:max-h-[min(92dvh,880px)] sm:max-w-2xl sm:rounded-2xl"
            : "max-h-[min(92dvh,880px)] max-w-lg rounded-t-2xl sm:rounded-2xl"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export const modalPrimaryClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/25 transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

export const modalSecondaryClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-accent-secondary/40 bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary sm:w-auto";
