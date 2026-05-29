import { SITE } from "@/lib/site";

export const SHOPIFY_STORE_URL = "https://pixelnations.myshopify.com/";

export const SHOP_METADATA = {
  title: "Shop Magic: The Gathering, Pokémon & TCG Products | PixelNation",
  description:
    "Shop Magic: The Gathering, Pokémon, sealed trading card products, playmats, collector boxes, and gaming accessories from PixelNation.",
  path: "/shop",
} as const;

export const SHOP_IMAGE_FALLBACK = "/images/coverlogo.png";

/** Preferred image paths; ProductImage falls back to .png then coverlogo on error. */
export function resolveShopImage(stem: string): string {
  const jpgCandidates = [`/images/${stem}.jpg`, `/images/${stem}.png`];
  const knownJpg = new Set([
    "151etb",
    "prismaticetb",
    "ffplay",
    "realityfracture",
  ]);
  const knownPngOnly = new Set(["strixhavenplay", "perfectorder", "eldraineplay"]);

  if (knownPngOnly.has(stem)) return `/images/${stem}.png`;
  if (knownJpg.has(stem)) return `/images/${stem}.jpg`;
  return jpgCandidates[0]!;
}

export type ShopProductCard = {
  title: string;
  description: string;
  imageStem: string;
  imageAlt: string;
};

export const SHOP_PRODUCT_CARDS: readonly ShopProductCard[] = [
  {
    title: "Pokémon Elite Trainer Boxes",
    description:
      "Sealed Pokémon Elite Trainer Boxes with booster packs, accessories, and promo cards—ideal for players and collectors building a collection.",
    imageStem: "151etb",
    imageAlt:
      "Pokémon Elite Trainer Box sealed product available from PixelNation in Emporia, Kansas",
  },
  {
    title: "Magic: The Gathering Play Boosters",
    description:
      "Fresh MTG Play Booster boxes and packs for Standard, Commander, and casual play nights—great for drafting and expanding your deck.",
    imageStem: "strixhavenplay",
    imageAlt:
      "Magic The Gathering Play Booster boxes for sealed MTG play at PixelNation",
  },
  {
    title: "MTG Collector Products",
    description:
      "Premium Magic: The Gathering collector booster boxes and specialty sealed products for collectors chasing foils, alt arts, and showcase cards.",
    imageStem: "realityfracture",
    imageAlt:
      "Magic The Gathering collector booster products from PixelNation shop",
  },
  {
    title: "Final Fantasy MTG Products",
    description:
      "Magic: The Gathering x Final Fantasy crossover sealed products—perfect for fans of both franchises and Commander deck builders.",
    imageStem: "ffplay",
    imageAlt:
      "Magic The Gathering Final Fantasy sealed trading card products at PixelNation",
  },
  {
    title: "TCG Gift Ideas",
    description:
      "Trading card game gifts for birthdays, holidays, and game nights—sealed boxes, ETBs, and collector products players actually want.",
    imageStem: "prismaticetb",
    imageAlt:
      "Trading card game gift ideas including Pokémon and Magic sealed products",
  },
  {
    title: "Sealed Trading Card Products",
    description:
      "Factory-sealed booster boxes, bundles, and specialty TCG releases across Magic, Pokémon, and other popular trading card games.",
    imageStem: "perfectorder",
    imageAlt:
      "Sealed trading card game products including booster boxes and bundles",
  },
] as const;

export const SHOP_HERO_BULLETS = [
  "Magic: The Gathering sealed products",
  "Pokémon Elite Trainer Boxes & sealed packs",
  "Playmats and gaming accessories",
  "Collector boxes and premium TCG releases",
  "Gifts for players and collectors",
  "Emporia, KS shop with online ordering",
] as const;

export const SHOP_CATEGORIES = [
  "Magic: The Gathering",
  "Pokémon TCG",
  "Sealed booster boxes",
  "Playmats",
  "Collector products",
  "Gaming gifts",
] as const;

export const SHOP_FAQS = [
  {
    question: "What can you shop at PixelNation?",
    answer:
      "PixelNation offers Magic: The Gathering products, Pokémon sealed products, playmats, collector boxes, and other trading card game accessories through our online Shopify store. Browse sealed booster boxes, Elite Trainer Boxes, Play Boosters, and gift-ready TCG products.",
  },
  {
    question: "Do you sell Magic: The Gathering?",
    answer:
      "Yes. PixelNation sells Magic: The Gathering sealed products including Play Boosters, collector boosters, crossover sets like Final Fantasy MTG, and other factory-sealed releases available through our Shopify store.",
  },
  {
    question: "Do you sell Pokémon products?",
    answer:
      "Yes. PixelNation carries Pokémon trading card products such as Elite Trainer Boxes and other sealed Pokémon TCG items for players and collectors in Emporia, Kansas and online across the United States.",
  },
  {
    question: "Do you ship trading card products?",
    answer:
      "Trading card products ordered through the PixelNation Shopify store can ship to customers across the United States. Local customers in Emporia, Kansas can also visit our shop during business hours when in-store pickup or local availability applies.",
  },
  {
    question: "Are these products good for collectors and players?",
    answer:
      "Yes. Our sealed TCG inventory is chosen for both collectors who want premium boxes and promo cards, and players who need fresh boosters for Standard, Commander, and casual play. Sealed products make strong gifts for gamers too.",
  },
] as const;

export const SHOP_CONVERSATIONAL_QUERIES = [
  "What TCG products does PixelNation sell?",
  "Where can I buy Pokémon cards in Emporia KS?",
  "Does PixelNation sell Magic The Gathering boosters?",
] as const;

export const SHOP_GEO_COPY = `PixelNation is a gaming and trading card destination in ${SITE.address.region}, serving local players and collectors who visit our shop as well as online customers across the United States. Whether you are hunting sealed Magic: The Gathering, Pokémon Elite Trainer Boxes, playmats, or collector products, you can browse and order through our Shopify store.`;
