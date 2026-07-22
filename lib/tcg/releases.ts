import type { ReleaseAnnouncement } from "@/lib/tcg/types";

/**
 * Release announcements — staff-editable.
 * Add entries only for real, confirmed products. Leave expectedRelease
 * unset unless the date/window is confirmed by the publisher.
 */
export const RELEASE_ANNOUNCEMENTS: readonly ReleaseAnnouncement[] = [];

export function getReleasesByGame(game: string): readonly ReleaseAnnouncement[] {
  return RELEASE_ANNOUNCEMENTS.filter((release) => release.game === game);
}

export function hasReleaseAnnouncements(): boolean {
  return RELEASE_ANNOUNCEMENTS.length > 0;
}

/** Preorder program facts — shown on /preorders-new-releases. */
export const PREORDER_POLICIES = [
  "PixelNation plans to offer preorders for select releases.",
  "Availability may depend on distributor allocation.",
  "Some releases may have quantity limits.",
  "Deposits may be required for certain products.",
  "Release dates are set by publishers and may change.",
  "Contact PixelNation for current preorder availability.",
] as const;
