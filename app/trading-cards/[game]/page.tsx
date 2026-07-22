import { notFound } from "next/navigation";
import { GamePageTemplate } from "@/components/tcg/GamePageTemplate";
import {
  getTcgGame,
  isTcgGameSlug,
  TCG_GAME_SLUGS,
} from "@/lib/tcg/games";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ game: string }>;
};

export function generateStaticParams() {
  return TCG_GAME_SLUGS.map((game) => ({ game }));
}

export async function generateMetadata({ params }: Props) {
  const { game: slug } = await params;
  const game = getTcgGame(slug);
  if (!game) return {};
  return createPageMetadata({
    title: game.metaTitle,
    description: game.metaDescription,
    path: game.href,
    titleAbsolute: true,
    keywords: [...game.keywords],
  });
}

export default async function TradingCardGamePage({ params }: Props) {
  const { game: slug } = await params;
  if (!isTcgGameSlug(slug)) notFound();
  const game = getTcgGame(slug);
  if (!game) notFound();
  return <GamePageTemplate game={game} />;
}
