"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  isNavLinkActive,
  isRepairsNavActive,
  isSoftwareNavActive,
  isTrainingNavActive,
  PRIMARY_NAV_LINKS,
  REPAIRS_DROPDOWN_LINKS,
  SOFTWARE_DEV_DROPDOWN_LINKS,
  TRAINING_DROPDOWN_LINKS,
  SITE,
} from "@/lib/site";

function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function navLinkClass(active: boolean, desktop = true) {
  const base = desktop
    ? "rounded-md px-2.5 py-2 text-xs font-medium transition-colors duration-200 xl:text-sm"
    : "flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200";
  return active
    ? `${base} text-accent`
    : `${base} text-muted hover:text-accent`;
}

function dropdownLinkClass(active: boolean) {
  return `flex min-h-11 items-center rounded-md px-4 py-3 text-sm transition-colors duration-200 ${
    active
      ? "bg-accent/15 text-accent"
      : "text-muted hover:bg-accent/10 hover:text-accent"
  }`;
}

export function Header() {
  const pathname = usePathname();
  const repairsMenuId = useId();
  const trainingMenuId = useId();
  const softwareMenuId = useId();
  const repairsNavRef = useRef<HTMLDivElement>(null);
  const trainingNavRef = useRef<HTMLDivElement>(null);
  const softwareNavRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRepairsOpen, setMobileRepairsOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);
  const [desktopRepairsOpen, setDesktopRepairsOpen] = useState(false);
  const [desktopTrainingOpen, setDesktopTrainingOpen] = useState(false);
  const [desktopSoftwareOpen, setDesktopSoftwareOpen] = useState(false);

  const repairsActive = isRepairsNavActive(pathname);
  const trainingActive = isTrainingNavActive(pathname);
  const softwareActive = isSoftwareNavActive(pathname);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileRepairsOpen(false);
    setMobileTrainingOpen(false);
    setMobileSoftwareOpen(false);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      closeMobile();
      setDesktopRepairsOpen(false);
      setDesktopTrainingOpen(false);
      setDesktopSoftwareOpen(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  const primaryLinksAfterRepairs = PRIMARY_NAV_LINKS.filter((l) => l.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 lg:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={closeMobile}
        >
          <Image
            src="/images/pixellogo.png"
            alt={`${SITE.name} logo`}
            width={182}
            height={52}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          <Link
            href="/"
            className={navLinkClass(isNavLinkActive(pathname, "/"))}
          >
            Home
          </Link>

          {/* Repairs dropdown — hover + keyboard focus-within */}
          <div
            ref={repairsNavRef}
            className="group relative"
            onMouseEnter={() => setDesktopRepairsOpen(true)}
            onMouseLeave={() => setDesktopRepairsOpen(false)}
          >
            <div className="flex items-center">
              <Link
                href="/repairs"
                className={`${navLinkClass(repairsActive)} rounded-r-none pr-1`}
                aria-current={repairsActive ? "page" : undefined}
              >
                Repairs
              </Link>
              <button
                type="button"
                className={`${navLinkClass(repairsActive)} flex items-center rounded-l-none pl-0.5 pr-1.5`}
                aria-expanded={desktopRepairsOpen}
                aria-controls={repairsMenuId}
                aria-haspopup="true"
                aria-label="Show repair services menu"
                onClick={() => setDesktopRepairsOpen((v) => !v)}
                onFocus={() => setDesktopRepairsOpen(true)}
              >
                <ChevronIcon open={desktopRepairsOpen} />
              </button>
            </div>

            <div
              id={repairsMenuId}
              role="menu"
              className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                desktopRepairsOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible translate-y-1 opacity-0 pointer-events-none"
              }`}
              onFocus={() => setDesktopRepairsOpen(true)}
              onBlur={(e) => {
                if (!repairsNavRef.current?.contains(e.relatedTarget as Node)) {
                  setDesktopRepairsOpen(false);
                }
              }}
            >
              <ul className="min-w-[220px] overflow-hidden rounded-xl border border-card-border bg-card py-1.5 shadow-lg shadow-black/30">
                {REPAIRS_DROPDOWN_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                      onClick={() => setDesktopRepairsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Training dropdown */}
          <div
            ref={trainingNavRef}
            className="group relative"
            onMouseEnter={() => setDesktopTrainingOpen(true)}
            onMouseLeave={() => setDesktopTrainingOpen(false)}
          >
            <div className="flex items-center">
              <Link
                href="/training"
                className={`${navLinkClass(trainingActive)} rounded-r-none pr-1`}
                aria-current={pathname === "/training" ? "page" : undefined}
              >
                Training
              </Link>
              <button
                type="button"
                className={`${navLinkClass(trainingActive)} flex items-center rounded-l-none pl-0.5 pr-1.5`}
                aria-expanded={desktopTrainingOpen}
                aria-controls={trainingMenuId}
                aria-haspopup="true"
                aria-label="Show training menu"
                onClick={() => setDesktopTrainingOpen((v) => !v)}
                onFocus={() => setDesktopTrainingOpen(true)}
              >
                <ChevronIcon open={desktopTrainingOpen} />
              </button>
            </div>

            <div
              id={trainingMenuId}
              role="menu"
              className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                desktopTrainingOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible translate-y-1 opacity-0 pointer-events-none"
              }`}
              onFocus={() => setDesktopTrainingOpen(true)}
              onBlur={(e) => {
                if (!trainingNavRef.current?.contains(e.relatedTarget as Node)) {
                  setDesktopTrainingOpen(false);
                }
              }}
            >
              <ul className="min-w-[220px] overflow-hidden rounded-xl border border-card-border bg-card py-1.5 shadow-lg shadow-black/30">
                {TRAINING_DROPDOWN_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                      onClick={() => setDesktopTrainingOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Software Development dropdown */}
          <div
            ref={softwareNavRef}
            className="group relative"
            onMouseEnter={() => setDesktopSoftwareOpen(true)}
            onMouseLeave={() => setDesktopSoftwareOpen(false)}
          >
            <div className="flex items-center">
              <Link
                href="/software-development"
                className={`${navLinkClass(softwareActive)} rounded-r-none pr-1`}
                aria-current={pathname === "/software-development" ? "page" : undefined}
              >
                Software Development
              </Link>
              <button
                type="button"
                className={`${navLinkClass(softwareActive)} flex items-center rounded-l-none pl-0.5 pr-1.5`}
                aria-expanded={desktopSoftwareOpen}
                aria-controls={softwareMenuId}
                aria-haspopup="true"
                aria-label="Show software development menu"
                onClick={() => setDesktopSoftwareOpen((v) => !v)}
                onFocus={() => setDesktopSoftwareOpen(true)}
              >
                <ChevronIcon open={desktopSoftwareOpen} />
              </button>
            </div>

            <div
              id={softwareMenuId}
              role="menu"
              className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                desktopSoftwareOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible translate-y-1 opacity-0 pointer-events-none"
              }`}
              onFocus={() => setDesktopSoftwareOpen(true)}
              onBlur={(e) => {
                if (!softwareNavRef.current?.contains(e.relatedTarget as Node)) {
                  setDesktopSoftwareOpen(false);
                }
              }}
            >
              <ul className="min-w-[240px] overflow-hidden rounded-xl border border-card-border bg-card py-1.5 shadow-lg shadow-black/30">
                {SOFTWARE_DEV_DROPDOWN_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                      onClick={() => setDesktopSoftwareOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {primaryLinksAfterRepairs.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClass(isNavLinkActive(pathname, link.href))}
              aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-lg bg-accent px-3 py-2.5 text-xs font-semibold text-background transition-colors duration-200 hover:bg-accent-hover sm:px-4 sm:text-sm"
            aria-label="Contact PixelNation"
            onClick={closeMobile}
          >
            Call Now
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-card-border p-2.5 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-foreground transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen ? (
        <nav
          id="mobile-nav-menu"
          className="border-t border-card-border px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className={navLinkClass(isNavLinkActive(pathname, "/"), false)}
                onClick={closeMobile}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            <li>
              <button
                type="button"
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  repairsActive
                    ? "text-accent"
                    : "text-muted hover:bg-card hover:text-accent"
                }`}
                aria-expanded={mobileRepairsOpen}
                aria-controls={`${repairsMenuId}-mobile`}
                onClick={() => setMobileRepairsOpen((v) => !v)}
              >
                Repairs
                <ChevronIcon open={mobileRepairsOpen} />
              </button>
              {mobileRepairsOpen ? (
                <ul
                  id={`${repairsMenuId}-mobile`}
                  className="mt-1 space-y-0.5 rounded-lg border border-card-border bg-card py-1.5 pl-2"
                >
                  {REPAIRS_DROPDOWN_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                        onClick={closeMobile}
                        aria-current={
                          isNavLinkActive(pathname, link.href) ? "page" : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>

            <li>
              <button
                type="button"
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  trainingActive
                    ? "text-accent"
                    : "text-muted hover:bg-card hover:text-accent"
                }`}
                aria-expanded={mobileTrainingOpen}
                aria-controls={`${trainingMenuId}-mobile`}
                onClick={() => setMobileTrainingOpen((v) => !v)}
              >
                Training
                <ChevronIcon open={mobileTrainingOpen} />
              </button>
              {mobileTrainingOpen ? (
                <ul
                  id={`${trainingMenuId}-mobile`}
                  className="mt-1 space-y-0.5 rounded-lg border border-card-border bg-card py-1.5 pl-2"
                >
                  {TRAINING_DROPDOWN_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                        onClick={closeMobile}
                        aria-current={
                          isNavLinkActive(pathname, link.href) ? "page" : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>

            <li>
              <button
                type="button"
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  softwareActive
                    ? "text-accent"
                    : "text-muted hover:bg-card hover:text-accent"
                }`}
                aria-expanded={mobileSoftwareOpen}
                aria-controls={`${softwareMenuId}-mobile`}
                onClick={() => setMobileSoftwareOpen((v) => !v)}
              >
                Software Development
                <ChevronIcon open={mobileSoftwareOpen} />
              </button>
              {mobileSoftwareOpen ? (
                <ul
                  id={`${softwareMenuId}-mobile`}
                  className="mt-1 space-y-0.5 rounded-lg border border-card-border bg-card py-1.5 pl-2"
                >
                  {SOFTWARE_DEV_DROPDOWN_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                        onClick={closeMobile}
                        aria-current={
                          isNavLinkActive(pathname, link.href) ? "page" : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>

            {primaryLinksAfterRepairs.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={navLinkClass(isNavLinkActive(pathname, link.href), false)}
                  onClick={closeMobile}
                  aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <Link
                href="/contact"
                className="flex min-h-11 items-center justify-center rounded-lg bg-accent px-3 py-3 text-center text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent-hover"
                onClick={closeMobile}
              >
                Call Now
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
