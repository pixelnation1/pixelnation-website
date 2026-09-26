/**
 * Display-only planned rank prizes (PixelNation store credit).
 * No payout / reward_winners logic — amounts are for public UI copy only.
 */
export type CommunityPrizeStructure = {
  communitySlug: string;
  communityName: string;
  poolTotal: number;
  ranks: { rank: number; amount: number }[];
};

export const TOTAL_MONTHLY_PRIZE_POOL = 850;

export const TOP_SUPPORTERS_PRIZE_STRUCTURES: CommunityPrizeStructure[] = [
  {
    communitySlug: "one-piece",
    communityName: "One Piece",
    poolTotal: 400,
    ranks: [
      { rank: 1, amount: 200 },
      { rank: 2, amount: 100 },
      { rank: 3, amount: 50 },
      { rank: 4, amount: 30 },
      { rank: 5, amount: 20 },
    ],
  },
  {
    communitySlug: "magic-the-gathering",
    communityName: "Magic: The Gathering",
    poolTotal: 250,
    ranks: [
      { rank: 1, amount: 125 },
      { rank: 2, amount: 60 },
      { rank: 3, amount: 30 },
      { rank: 4, amount: 20 },
      { rank: 5, amount: 15 },
    ],
  },
  {
    communitySlug: "pokemon",
    communityName: "Pokémon",
    poolTotal: 200,
    ranks: [
      { rank: 1, amount: 100 },
      { rank: 2, amount: 50 },
      { rank: 3, amount: 25 },
      { rank: 4, amount: 15 },
      { rank: 5, amount: 10 },
    ],
  },
];

export function getPrizeStructureForSlug(
  slug: string,
): CommunityPrizeStructure | null {
  return (
    TOP_SUPPORTERS_PRIZE_STRUCTURES.find((p) => p.communitySlug === slug) ??
    null
  );
}

export function formatStoreCredit(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
