export const APP_ROLES = ["customer", "staff", "admin"] as const;
export type AppRole = (typeof APP_ROLES)[number];

export const ACCOUNT_STATUSES = ["active", "suspended"] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const SUPPORT_POINT_SOURCES = [
  "purchase",
  "check_in",
  "event",
  "community_builder",
  "adjustment",
  "reversal",
] as const;
export type SupportPointSource = (typeof SUPPORT_POINT_SOURCES)[number];

export const REWARD_PERIOD_STATUSES = ["scheduled", "active", "closed"] as const;
export type RewardPeriodStatus = (typeof REWARD_PERIOD_STATUSES)[number];

export const REWARD_REDEMPTION_STATUSES = ["pending", "redeemed", "forfeited"] as const;
export type RewardRedemptionStatus = (typeof REWARD_REDEMPTION_STATUSES)[number];

export type Profile = {
  id: string;
  displayName: string;
  accountStatus: AccountStatus;
  appRole: AppRole;
  createdAt: string;
  updatedAt: string;
};

export type Community = {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  topSupportersEnabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CommunityMember = {
  id: string;
  profileId: string;
  communityId: string;
  createdAt: string;
};

export type CheckIn = {
  id: string;
  profileId: string;
  communityId: string;
  locationId: string;
  businessDate: string;
  createdAt: string;
};

export type SupportPointEntry = {
  id: string;
  profileId: string;
  communityId: string;
  points: number;
  source: SupportPointSource;
  sourceId: string;
  rewardPeriodId: string | null;
  createdBy: string | null;
  reason: string | null;
  createdAt: string;
};

export type RewardPeriod = {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  status: RewardPeriodStatus;
  createdAt: string;
  closedAt: string | null;
};

export type RewardWinner = {
  id: string;
  rewardPeriodId: string;
  communityId: string;
  profileId: string;
  displayNameSnapshot: string;
  rank: number;
  pointsSnapshot: number;
  rewardAmount: number | null;
  rewardType: string;
  redemptionStatus: RewardRedemptionStatus;
  createdAt: string;
};

/** Public leaderboard row. No auth id, email, or phone. */
export type PublicLeaderboardRow = {
  communitySlug: string;
  communityName: string;
  displayName: string;
  points: number;
  rank: number;
};
