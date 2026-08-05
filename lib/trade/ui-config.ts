/** Frontend-only UI config for the Trade Values search experience. */

export const TRADE_CATEGORY_BUTTONS = [
  { label: "PlayStation", category: "PlayStation", icon: "PS" },
  { label: "Xbox", category: "Xbox", icon: "XB" },
  { label: "Nintendo", category: "Nintendo", icon: "NS" },
  { label: "Retro Gaming", category: "Retro Gaming", icon: "RG" },
  { label: "Handhelds", category: "Gaming Handhelds", icon: "HH" },
  { label: "Phones", category: "Phones", icon: "PH" },
  { label: "Computers", category: "Computers", icon: "PC" },
  { label: "Accessories", category: "Controllers & Accessories", icon: "AC" },
  { label: "VR", category: "Virtual Reality", icon: "VR" },
  { label: "Tablets", category: "Tablets", icon: "TB" },
  { label: "Other", category: "Other Electronics", icon: "OT" },
] as const;

export const POPULAR_SEARCHES = [
  "PS5 Disc",
  "PS5 Digital",
  "Nintendo Switch OLED",
  "Steam Deck",
  "Xbox Series X",
  "Switch Lite",
  "DualSense",
  "iPhone 12",
  "PlayStation 4 Pro",
  "Nintendo 64",
] as const;

export const TRUST_BADGES = [
  "Local Emporia Business",
  "Fair Market Pricing",
  "Fast In-Store Evaluation",
  "Higher Store Credit Available",
  "We Buy Broken Electronics",
  "No Appointment Needed",
] as const;

export const BROKEN_DEVICE_EXAMPLES = [
  "Broken HDMI",
  "Water Damage",
  "Dead Battery",
  "Won't Turn On",
  "Cracked Screen",
  "No Video",
  "Bad Charging Port",
  "Missing Parts",
] as const;

export const BROKEN_MODE_MESSAGE =
  "We may still make an offer because PixelNation repairs electronics.";
