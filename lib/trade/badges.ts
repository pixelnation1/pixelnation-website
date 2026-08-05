import type { PublicTradeItem } from "@/lib/trade/types";

export function accessoryBadges(requiredAccessories: string): string[] {
  if (!requiredAccessories?.trim()) return [];
  return requiredAccessories
    .split(/,|;|\band\b/i)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 4)
    .map((part) => {
      const cleaned = part.replace(/\s+/g, " ");
      if (/controller/i.test(cleaned)) return "Controller Included";
      if (/power|charger|adapter|ac /i.test(cleaned)) return "Power / Charger Included";
      if (/hdmi/i.test(cleaned)) return "HDMI Included";
      if (/dock/i.test(cleaned)) return "Dock Included";
      if (/cable/i.test(cleaned)) return "Cable Included";
      return cleaned.length > 28 ? `${cleaned.slice(0, 26)}…` : cleaned;
    });
}

export function conditionBadges(
  item: Pick<PublicTradeItem, "conditionNote" | "acceptsNonworking">,
  brokenMode: boolean,
): { label: string; tone: "good" | "warn" | "repair" }[] {
  const badges: { label: string; tone: "good" | "warn" | "repair" }[] = [];
  const note = item.conditionNote.toLowerCase();

  if (/fully functional|good cosmetic|powers on|boots/i.test(note)) {
    badges.push({ label: "Fully Functional", tone: "good" });
  } else {
    badges.push({ label: "Condition Reviewed In Store", tone: "warn" });
  }

  if (/light|minor|normal cosmetic|wear/i.test(note)) {
    badges.push({ label: "Minor Wear Accepted", tone: "good" });
  }

  if (item.acceptsNonworking || brokenMode) {
    badges.push({
      label: brokenMode ? "Broken? We Still Buy It" : "We Also Buy Broken Ones",
      tone: "repair",
    });
  } else {
    badges.push({ label: "Working Preferred", tone: "warn" });
  }

  return badges;
}
