export const SHOP_METADATA = {
  title: "Pokémon, Magic: The Gathering & TCG Products | PixelNation",
  description:
    "Shop Pokémon cards, Magic: The Gathering, booster boxes, play boosters, and gaming accessories at PixelNation in Emporia, Kansas.",
  path: "/shop",
  canonical: "https://www.pixelnation.co/shop",
} as const;

/** PixelNation Shopify storefront */
export const SHOPIFY_STORE_URL = "https://pixelnations.myshopify.com/";

export const HERO_BULLETS = [
  "Pokémon Elite Trainer Boxes",
  "Magic: The Gathering Play Boosters",
  "Deck boxes and sleeves",
  "Dice and playmats",
  "Accessories for collectors and players",
  "New releases and specialty products",
] as const;

export const FEATURED_PRODUCTS = [
  {
    title: "Pokémon Scarlet & Violet 151 Elite Trainer Box",
    category: "Pokémon TCG",
    description:
      "Collector-favorite set featuring classic Kanto Pokémon. Elite Trainer Box includes booster packs, sleeves, dice, and storage for players and collectors.",
    image: "/images/151etb.jpg",
    imageAlt: "Pokémon Scarlet and Violet 151 Elite Trainer Box",
    keyword: "Pokémon Booster Boxes",
  },
  {
    title: "Prismatic Evolutions Elite Trainer Box",
    category: "Pokémon TCG",
    description:
      "Premium Pokémon TCG product with striking artwork and competitive accessories—ideal for sealed collectors and tournament players.",
    image: "/images/prismaticetb.jpg",
    imageAlt: "Prismatic Evolutions Elite Trainer Box Pokémon TCG",
    keyword: "Pokémon Cards Emporia KS",
  },
  {
    title: "Wilds of Eldraine Play Booster Box",
    category: "Magic: The Gathering",
    description:
      "MTG Play Booster box from the Wilds of Eldraine set—great for drafting, casual play, and building your collection.",
    image: "/images/eldraineplay.png",
    imageAlt: "Magic The Gathering Wilds of Eldraine Play Booster Box",
    keyword: "MTG Play Boosters",
  },
  {
    title: "Strixhaven Play Booster Box",
    category: "Magic: The Gathering",
    description:
      "Schools of magic come to life in this Play Booster box—popular for kitchen-table games and competitive staples.",
    image: "/images/strixhavenplay.png",
    imageAlt: "Magic The Gathering Strixhaven Play Booster Box",
    keyword: "Magic The Gathering Emporia KS",
  },
  {
    title: "Perfect Order",
    category: "Magic: The Gathering",
    description:
      "Specialty Magic product for collectors and players seeking unique sealed or collectible offerings—check Shopify for availability.",
    image: "/images/perfectorder.png",
    imageAlt: "Magic The Gathering Perfect Order product",
    keyword: "TCG Store Emporia KS",
  },
  {
    title: "Reality Fracture",
    category: "Magic: The Gathering",
    description:
      "Eye-catching MTG product for players who love bold art and collectible sealed product—available through the online store.",
    image: "/images/realityfracture.jpg",
    imageAlt: "Magic The Gathering Reality Fracture product",
    keyword: "Local Game Store Emporia KS",
  },
] as const;

export const SHOP_CATEGORIES = [
  {
    title: "Pokémon TCG",
    description: "Elite Trainer Boxes, booster products, and sealed Pokémon cards.",
    keyword: "Pokémon Cards Emporia KS",
  },
  {
    title: "Magic: The Gathering",
    description: "Play boosters, booster boxes, and MTG sealed product.",
    keyword: "Magic The Gathering Emporia KS",
  },
  {
    title: "Booster Boxes",
    description: "Sealed booster boxes for Pokémon and Magic collectors.",
    keyword: "Pokémon Booster Boxes",
  },
  {
    title: "Elite Trainer Boxes",
    description: "Complete Pokémon ETBs with packs, sleeves, and accessories.",
    keyword: "Pokémon Elite Trainer Box",
  },
  {
    title: "Deck Boxes & Sleeves",
    description: "Protect and organize your decks for play and collection.",
    keyword: "Trading Card Game Accessories",
  },
  {
    title: "Playmats",
    description: "Play surfaces for tournaments, Commander nights, and casual games.",
    keyword: "Playmats",
  },
  {
    title: "Dice & Accessories",
    description: "Dice, counters, and tabletop essentials for TCG players.",
    keyword: "Dice, Deck Boxes, Playmats",
  },
  {
    title: "Retro Gaming",
    description: "Collectibles and gaming products for nostalgia fans and collectors.",
    keyword: "Retro gaming collectibles",
  },
] as const;

export const WHY_SHOP = [
  {
    title: "Curated Pokémon and MTG products",
    text: "Hand-picked sealed product and accessories for collectors and competitive players.",
  },
  {
    title: "Tournament-ready accessories",
    text: "Sleeves, deck boxes, dice, and playmats for local play and events.",
  },
  {
    title: "Trusted local business",
    text: "Shop with a longtime Emporia business known for repair expertise and community focus.",
  },
  {
    title: "New and popular releases",
    text: "Stay current with hot sets, limited releases, and collector favorites.",
  },
  {
    title: "Support from fellow gamers",
    text: "Get recommendations from people who play and collect—not just sell boxes.",
  },
] as const;

export const HOT_PRODUCTS = [
  "Collector favorites and chase sealed product",
  "Limited releases while supplies last",
  "Competitive staples for Standard, Commander, and Pokémon",
  "Gift ideas for players, kids, and TCG enthusiasts",
] as const;

export const SHOP_FAQ = [
  {
    question: "What trading card products do you carry?",
    answer:
      "PixelNation carries Pokémon TCG sealed product, Magic: The Gathering play boosters and booster boxes, accessories, and select gaming collectibles through the online Shopify store and in-shop when available.",
  },
  {
    question: "Do you sell Pokémon and Magic: The Gathering?",
    answer:
      "Yes. PixelNation offers Pokémon Elite Trainer Boxes, booster products, Magic: The Gathering play boosters, and related accessories for players and collectors in Emporia, Kansas.",
  },
  {
    question: "Can I order online?",
    answer:
      "Yes. Customers can shop online through PixelNation's Shopify store at pixelnations.myshopify.com with secure checkout and shipping options.",
  },
  {
    question: "Do you carry accessories like sleeves and deck boxes?",
    answer:
      "Yes. PixelNation stocks trading card game accessories including sleeves, deck boxes, dice, playmats, and related supplies for Pokémon and Magic players.",
  },
  {
    question: "Do you stock new releases?",
    answer:
      "We add popular new Pokémon and Magic releases as they become available. Check the Shopify store for the latest inventory and announcements.",
  },
  {
    question: "Can I visit your store in Emporia?",
    answer:
      "Yes. Visit PixelNation in Emporia, Kansas during business hours (Monday–Friday, 9:00 AM–3:00 PM) or contact us about local pickup for online orders when available.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "Does PixelNation sell Pokémon cards in Emporia, Kansas?",
    answer:
      "Yes. PixelNation offers Pokémon Elite Trainer Boxes, booster products, and accessories in Emporia, Kansas.",
  },
  {
    question: "Does PixelNation sell Magic: The Gathering products?",
    answer:
      "Yes. PixelNation carries Magic: The Gathering play boosters, booster boxes, and accessories.",
  },
  {
    question: "Can I buy products online?",
    answer:
      "Yes. Customers can shop online through PixelNation's Shopify store.",
  },
] as const;
