import Image from "next/image";
import Link from "next/link";
import type { TcgGame } from "@/lib/tcg/types";

type GameVisualProps = {
  name: string;
  accent: string;
  className?: string;
};

/** Brand-safe placeholder visual — no copyrighted character art or unofficial logos. */
export function GameVisual({ name, accent, className = "" }: GameVisualProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-card-border ${className}`}
      style={{
        background: `linear-gradient(145deg, color-mix(in srgb, ${accent} 28%, #041427), #0a2342 55%, #041427)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${accent}33, transparent 45%), radial-gradient(circle at 80% 70%, #38ddf833, transparent 40%)`,
        }}
      />
      <span
        className="relative text-3xl font-bold tracking-tight text-foreground/90 sm:text-4xl"
        style={{ textShadow: `0 0 24px ${accent}66` }}
      >
        {initials || "PN"}
      </span>
    </div>
  );
}

type GameCardProps = {
  game: Pick<TcgGame, "name" | "href" | "tagline" | "accent" | "shortName" | "image">;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/50">
      <Link href={game.href} className="flex flex-1 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        {game.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-card-border bg-white">
            <Image
              src={game.image.src}
              alt={game.image.alt}
              fill
              className="object-contain p-3"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          </div>
        ) : (
          <GameVisual name={game.shortName} accent={game.accent} className="rounded-none rounded-t-2xl border-0 border-b" />
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-semibold text-foreground group-hover:text-accent">
            {game.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {game.tagline}
          </p>
          <span className="mt-4 text-sm font-semibold text-accent">
            Explore {game.shortName} →
          </span>
        </div>
      </Link>
    </article>
  );
}
