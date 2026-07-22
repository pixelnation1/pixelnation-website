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
import {
  GAMING_EVENTS_DROPDOWN_LINKS,
  isGamingEventsNavActive,
  isTradingCardsNavActive,
  TRADING_CARDS_DROPDOWN_LINKS,
} from "@/lib/tcg/links";

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
    ? "rounded-md px-2 py-2 text-xs font-medium transition-colors duration-200 xl:px-2.5 xl:text-sm"
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

type DesktopDropdownProps = {
  label: string;
  href: string;
  active: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
  ariaLabel: string;
  links: readonly { label: string; href: string }[];
  pathname: string;
  currentPageOnly?: boolean;
};

function DesktopDropdown({
  label,
  href,
  active,
  open,
  setOpen,
  menuId,
  ariaLabel,
  links,
  pathname,
  currentPageOnly,
}: DesktopDropdownProps) {
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={navRef}
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={href}
          className={`${navLinkClass(active)} rounded-r-none pr-1`}
          aria-current={
            currentPageOnly
              ? pathname === href
                ? "page"
                : undefined
              : active
                ? "page"
                : undefined
          }
        >
          {label}
        </Link>
        <button
          type="button"
          className={`${navLinkClass(active)} flex items-center rounded-l-none pl-0.5 pr-1.5`}
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="true"
          aria-label={ariaLabel}
          onClick={() => setOpen(!open)}
          onFocus={() => setOpen(true)}
        >
          <ChevronIcon open={open} />
        </button>
      </div>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          open
            ? "visible translate-y-0 opacity-100 pointer-events-auto"
            : "invisible translate-y-1 opacity-0 pointer-events-none"
        }`}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!navRef.current?.contains(e.relatedTarget as Node)) {
            setOpen(false);
          }
        }}
      >
        <ul className="min-w-[220px] overflow-hidden rounded-xl border border-card-border bg-card py-1.5 shadow-lg shadow-black/30">
          {links.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                role="menuitem"
                className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type MobileAccordionProps = {
  label: string;
  active: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
  links: readonly { label: string; href: string }[];
  pathname: string;
  onNavigate: () => void;
};

function MobileAccordion({
  label,
  active,
  open,
  setOpen,
  menuId,
  links,
  pathname,
  onNavigate,
}: MobileAccordionProps) {
  return (
    <li>
      <button
        type="button"
        className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors duration-200 ${
          active ? "text-accent" : "text-muted hover:bg-card hover:text-accent"
        }`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <ul
          id={menuId}
          className="mt-1 space-y-0.5 rounded-lg border border-card-border bg-card py-1.5 pl-2"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={dropdownLinkClass(isNavLinkActive(pathname, link.href))}
                onClick={onNavigate}
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
  );
}

export function Header() {
  const pathname = usePathname();
  const repairsMenuId = useId();
  const tradingMenuId = useId();
  const gamingMenuId = useId();
  const trainingMenuId = useId();
  const softwareMenuId = useId();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRepairsOpen, setMobileRepairsOpen] = useState(false);
  const [mobileTradingOpen, setMobileTradingOpen] = useState(false);
  const [mobileGamingOpen, setMobileGamingOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);
  const [desktopRepairsOpen, setDesktopRepairsOpen] = useState(false);
  const [desktopTradingOpen, setDesktopTradingOpen] = useState(false);
  const [desktopGamingOpen, setDesktopGamingOpen] = useState(false);
  const [desktopTrainingOpen, setDesktopTrainingOpen] = useState(false);
  const [desktopSoftwareOpen, setDesktopSoftwareOpen] = useState(false);

  const repairsActive = isRepairsNavActive(pathname);
  const tradingActive = isTradingCardsNavActive(pathname);
  const gamingActive = isGamingEventsNavActive(pathname);
  const trainingActive = isTrainingNavActive(pathname);
  const softwareActive = isSoftwareNavActive(pathname);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileRepairsOpen(false);
    setMobileTradingOpen(false);
    setMobileGamingOpen(false);
    setMobileTrainingOpen(false);
    setMobileSoftwareOpen(false);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      closeMobile();
      setDesktopRepairsOpen(false);
      setDesktopTradingOpen(false);
      setDesktopGamingOpen(false);
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

  const contactLinks = PRIMARY_NAV_LINKS.filter((l) => l.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 lg:gap-4">
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

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0 xl:gap-0.5 lg:flex"
          aria-label="Main"
        >
          <Link
            href="/"
            className={navLinkClass(isNavLinkActive(pathname, "/"))}
          >
            Home
          </Link>

          <DesktopDropdown
            label="Repairs"
            href="/repairs"
            active={repairsActive}
            open={desktopRepairsOpen}
            setOpen={setDesktopRepairsOpen}
            menuId={repairsMenuId}
            ariaLabel="Show repair services menu"
            links={REPAIRS_DROPDOWN_LINKS}
            pathname={pathname}
          />

          <DesktopDropdown
            label="Trading Cards"
            href="/trading-cards"
            active={tradingActive}
            open={desktopTradingOpen}
            setOpen={setDesktopTradingOpen}
            menuId={tradingMenuId}
            ariaLabel="Show trading cards menu"
            links={TRADING_CARDS_DROPDOWN_LINKS}
            pathname={pathname}
          />

          <DesktopDropdown
            label="Gaming & Events"
            href="/gaming"
            active={gamingActive}
            open={desktopGamingOpen}
            setOpen={setDesktopGamingOpen}
            menuId={gamingMenuId}
            ariaLabel="Show gaming and events menu"
            links={GAMING_EVENTS_DROPDOWN_LINKS}
            pathname={pathname}
          />

          <DesktopDropdown
            label="Training"
            href="/training"
            active={trainingActive}
            open={desktopTrainingOpen}
            setOpen={setDesktopTrainingOpen}
            menuId={trainingMenuId}
            ariaLabel="Show training menu"
            links={TRAINING_DROPDOWN_LINKS}
            pathname={pathname}
            currentPageOnly
          />

          <DesktopDropdown
            label="Software"
            href="/software-development"
            active={softwareActive}
            open={desktopSoftwareOpen}
            setOpen={setDesktopSoftwareOpen}
            menuId={softwareMenuId}
            ariaLabel="Show software menu"
            links={SOFTWARE_DEV_DROPDOWN_LINKS}
            pathname={pathname}
            currentPageOnly
          />

          {contactLinks.map((link) => (
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

      {mobileOpen ? (
        <nav
          id="mobile-nav-menu"
          className="max-h-[min(80vh,640px)] overflow-y-auto border-t border-card-border px-4 py-4 lg:hidden"
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

            <MobileAccordion
              label="Repairs"
              active={repairsActive}
              open={mobileRepairsOpen}
              setOpen={setMobileRepairsOpen}
              menuId={`${repairsMenuId}-mobile`}
              links={REPAIRS_DROPDOWN_LINKS}
              pathname={pathname}
              onNavigate={closeMobile}
            />

            <MobileAccordion
              label="Trading Cards"
              active={tradingActive}
              open={mobileTradingOpen}
              setOpen={setMobileTradingOpen}
              menuId={`${tradingMenuId}-mobile`}
              links={TRADING_CARDS_DROPDOWN_LINKS}
              pathname={pathname}
              onNavigate={closeMobile}
            />

            <MobileAccordion
              label="Gaming & Events"
              active={gamingActive}
              open={mobileGamingOpen}
              setOpen={setMobileGamingOpen}
              menuId={`${gamingMenuId}-mobile`}
              links={GAMING_EVENTS_DROPDOWN_LINKS}
              pathname={pathname}
              onNavigate={closeMobile}
            />

            <MobileAccordion
              label="Training"
              active={trainingActive}
              open={mobileTrainingOpen}
              setOpen={setMobileTrainingOpen}
              menuId={`${trainingMenuId}-mobile`}
              links={TRAINING_DROPDOWN_LINKS}
              pathname={pathname}
              onNavigate={closeMobile}
            />

            <MobileAccordion
              label="Software"
              active={softwareActive}
              open={mobileSoftwareOpen}
              setOpen={setMobileSoftwareOpen}
              menuId={`${softwareMenuId}-mobile`}
              links={SOFTWARE_DEV_DROPDOWN_LINKS}
              pathname={pathname}
              onNavigate={closeMobile}
            />

            {contactLinks.map((link) => (
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
