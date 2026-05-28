import Link from "next/link";
import type { FaqItem } from "@/lib/seo/types";

type FaqAnswerProps = {
  item: FaqItem;
  variant?: "accordion" | "inline";
};

export function FaqAnswer({ item, variant = "accordion" }: FaqAnswerProps) {
  return (
    <div
      className={
        variant === "accordion"
          ? "border-t border-card-border px-5 py-4 text-sm leading-relaxed text-muted"
          : "text-sm leading-relaxed text-muted"
      }
    >
      <p>{item.answer}</p>
      {item.links && item.links.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {item.links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                className="font-medium text-accent-secondary hover:text-accent-secondary-hover"
              >
                {link.label}
                <span aria-hidden> →</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
