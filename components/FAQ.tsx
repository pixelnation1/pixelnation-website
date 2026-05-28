"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { FaqItem } from "@/lib/seo/types";
import { FaqAnswer } from "@/components/faq/FaqAnswer";
import { getHomeFaqs } from "@/lib/faq/resolve";

type FAQProps = {
  items?: readonly FaqItem[];
  id?: string;
  heading?: string;
  /** Show visible h2 (false = sr-only heading for landmarks) */
  showHeading?: boolean;
  initialVisible?: number;
};

export function FAQ({
  items = getHomeFaqs(8),
  id = "faq",
  heading = "Frequently asked questions",
  showHeading = false,
  initialVisible = 6,
}: FAQProps) {
  const headingId = `${id}-heading`;
  const listId = useId();
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visibleItems = expanded ? items : items.slice(0, initialVisible);
  const hasMore = items.length > initialVisible;

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = visibleItems.length;
      let next = index;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        next = (index + 1) % count;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        next = (index - 1 + count) % count;
      } else if (event.key === "Home") {
        event.preventDefault();
        next = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        next = count - 1;
      } else {
        return;
      }
      buttonRefs.current[next]?.focus();
      setOpenIndex(next);
    },
    [visibleItems.length],
  );

  return (
    <section id={id} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className={showHeading ? "text-2xl font-bold sm:text-3xl" : "sr-only"}
      >
        {heading}
      </h2>
      <div
        id={listId}
        className="mt-6 space-y-3"
        role="region"
        aria-label={heading}
      >
        {visibleItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${id}-panel-${index}`;
          const buttonId = `${id}-button-${index}`;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-xl border border-card-border bg-card"
            >
              <h3 className="m-0">
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  id={buttonId}
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground transition hover:bg-accent-muted/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                >
                  {item.question}
                  <span
                    className={`shrink-0 text-accent-secondary transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={isOpen ? undefined : "hidden"}
              >
                <FaqAnswer item={item} />
              </div>
            </div>
          );
        })}
      </div>
      {hasMore ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm font-medium text-accent-secondary hover:text-accent-secondary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded
              ? "Show fewer questions"
              : `View more questions (${items.length - initialVisible} more)`}
          </button>
        </div>
      ) : null}
    </section>
  );
}
