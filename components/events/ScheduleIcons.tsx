import type { WeeklyScheduleIcon } from "@/lib/events/weekly-schedule";

type IconProps = {
  name: WeeklyScheduleIcon;
  className?: string;
};

export function ScheduleIcon({ name, className = "h-5 w-5" }: IconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "gamepad":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="10" rx="3" />
          <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
          <path d="M8 8V6M16 8V6" />
        </svg>
      );
    case "controller":
      return (
        <svg {...common}>
          <path d="M6.5 8.5h11a4 4 0 0 1 3.4 6.1l-1.2 1.8A3 3 0 0 1 17.2 18H6.8a3 3 0 0 1-2.5-1.6L3.1 14.6A4 4 0 0 1 6.5 8.5Z" />
          <path d="M8 12h3M9.5 10.5v3" />
          <circle cx="15.5" cy="12" r=".8" fill="currentColor" stroke="none" />
          <circle cx="17.2" cy="13.5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cards":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="10" height="14" rx="1.5" />
          <path d="M8 4V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2" />
        </svg>
      );
    case "lightning":
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
          <path d="M8 6H5a3 3 0 0 0 3 5M16 6h3a3 3 0 0 1-3 5" />
          <path d="M12 13v3M9 20h6M10 20v-2a2 2 0 0 1 4 0v2" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M8 11 4.5 7.5 8 4l3 3 2-2 4.5 4.5L14 13" />
          <path d="m11 8 5 5c1 1 1 3 0 4l-1 1c-1 1-3 1-4 0l-5-5" />
          <path d="m14 13-2.5 2.5" />
        </svg>
      );
    case "dice":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
