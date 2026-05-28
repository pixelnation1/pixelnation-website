export type CitySlug =
  | "emporia"
  | "wichita"
  | "topeka"
  | "manhattan"
  | "lawrence"
  | "salina"
  | "kansas-city";

export type CityData = {
  slug: CitySlug;
  name: string;
  state: string;
  stateAbbr: string;
  regionLabel: string;
  /** Nearby city slugs for internal linking */
  nearbySlugs: CitySlug[];
  geoKeywords: string[];
  isPrimaryLocation: boolean;
  driveTimeNote?: string;
};

export const CITIES: Record<CitySlug, CityData> = {
  emporia: {
    slug: "emporia",
    name: "Emporia",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Emporia, Kansas",
    nearbySlugs: ["topeka", "lawrence", "manhattan", "wichita"],
    geoKeywords: ["Emporia KS", "Lyon County", "Flint Hills"],
    isPrimaryLocation: true,
    driveTimeNote: "Walk-in and mail-in repairs at our Emporia shop.",
  },
  wichita: {
    slug: "wichita",
    name: "Wichita",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Wichita, Kansas",
    nearbySlugs: ["emporia", "salina", "kansas-city"],
    geoKeywords: ["Wichita KS", "Sedgwick County", "south-central Kansas"],
    isPrimaryLocation: false,
    driveTimeNote: "Mail-in repair and regional drop-off coordination from Wichita.",
  },
  topeka: {
    slug: "topeka",
    name: "Topeka",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Topeka, Kansas",
    nearbySlugs: ["emporia", "lawrence", "manhattan", "kansas-city"],
    geoKeywords: ["Topeka KS", "Shawnee County", "northeast Kansas"],
    isPrimaryLocation: false,
    driveTimeNote: "Convenient mail-in repair for Topeka and Shawnee County customers.",
  },
  manhattan: {
    slug: "manhattan",
    name: "Manhattan",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Manhattan, Kansas",
    nearbySlugs: ["topeka", "salina", "lawrence", "emporia"],
    geoKeywords: ["Manhattan KS", "Riley County", "K-State area"],
    isPrimaryLocation: false,
    driveTimeNote: "Students and professionals in Manhattan can ship devices to our Emporia bench.",
  },
  lawrence: {
    slug: "lawrence",
    name: "Lawrence",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Lawrence, Kansas",
    nearbySlugs: ["topeka", "kansas-city", "manhattan", "emporia"],
    geoKeywords: ["Lawrence KS", "Douglas County", "KU area"],
    isPrimaryLocation: false,
    driveTimeNote: "Lawrence customers rely on our mail-in program for board-level and data recovery work.",
  },
  salina: {
    slug: "salina",
    name: "Salina",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Salina, Kansas",
    nearbySlugs: ["manhattan", "wichita", "emporia"],
    geoKeywords: ["Salina KS", "Saline County", "north-central Kansas"],
    isPrimaryLocation: false,
    driveTimeNote: "Central Kansas mail-in repair with tracking from Salina to Emporia.",
  },
  "kansas-city": {
    slug: "kansas-city",
    name: "Kansas City",
    state: "Kansas",
    stateAbbr: "KS",
    regionLabel: "Kansas City, KS",
    nearbySlugs: ["lawrence", "topeka", "wichita"],
    geoKeywords: ["Kansas City KS", "Wyandotte County", "KC metro"],
    isPrimaryLocation: false,
    driveTimeNote: "Metro KC customers use insured mail-in repair to our Kansas shop.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES) as CitySlug[];

export function getCity(slug: string): CityData | undefined {
  return CITIES[slug as CitySlug];
}

export function getCityOrThrow(slug: string): CityData {
  const city = getCity(slug);
  if (!city) throw new Error(`Unknown city: ${slug}`);
  return city;
}
