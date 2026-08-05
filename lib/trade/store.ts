import { promises as fs } from "fs";
import path from "path";
import {
  DEFAULT_TRADE_SETTINGS,
  SAMPLE_TRADE_ITEMS,
} from "@/lib/trade/sample-items";
import type { TradeItem, TradeSettings } from "@/lib/trade/types";

const DATA_DIR = path.join(process.cwd(), "data");
const ITEMS_PATH = path.join(DATA_DIR, "trade-items.json");
const SETTINGS_PATH = path.join(DATA_DIR, "trade-settings.json");

export type TradeStoreSnapshot = {
  items: TradeItem[];
  settings: TradeSettings;
};

async function ensureDataFiles(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ITEMS_PATH);
  } catch {
    await fs.writeFile(
      ITEMS_PATH,
      JSON.stringify(SAMPLE_TRADE_ITEMS, null, 2),
      "utf8",
    );
  }
  try {
    await fs.access(SETTINGS_PATH);
  } catch {
    await fs.writeFile(
      SETTINGS_PATH,
      JSON.stringify(DEFAULT_TRADE_SETTINGS, null, 2),
      "utf8",
    );
  }
}

export async function readTradeSettings(): Promise<TradeSettings> {
  await ensureDataFiles();
  const raw = await fs.readFile(SETTINGS_PATH, "utf8");
  const parsed = JSON.parse(raw) as Partial<TradeSettings>;
  return {
    ...DEFAULT_TRADE_SETTINGS,
    ...parsed,
  };
}

export async function writeTradeSettings(settings: TradeSettings): Promise<void> {
  await ensureDataFiles();
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf8");
}

export async function readTradeItems(): Promise<TradeItem[]> {
  await ensureDataFiles();
  const raw = await fs.readFile(ITEMS_PATH, "utf8");
  const parsed = JSON.parse(raw) as TradeItem[];
  if (!Array.isArray(parsed)) return [...SAMPLE_TRADE_ITEMS];
  return parsed;
}

export async function writeTradeItems(items: TradeItem[]): Promise<void> {
  await ensureDataFiles();
  await fs.writeFile(ITEMS_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function getTradeSnapshot(): Promise<TradeStoreSnapshot> {
  const [items, settings] = await Promise.all([
    readTradeItems(),
    readTradeSettings(),
  ]);
  return { items, settings };
}

export async function getPublicTradeItems(): Promise<{
  items: TradeItem[];
  settings: TradeSettings;
}> {
  const { items, settings } = await getTradeSnapshot();
  const visible = items.filter((item) => {
    if (!item.active) return false;
    if (item.isSample && !settings.publishSampleItems) return false;
    return true;
  });
  return { items: visible, settings };
}

export async function upsertTradeItem(item: TradeItem): Promise<TradeItem[]> {
  const items = await readTradeItems();
  const index = items.findIndex((row) => row.id === item.id);
  const next = [...items];
  if (index >= 0) {
    next[index] = item;
  } else {
    next.push(item);
  }
  await writeTradeItems(next);
  return next;
}

export async function replaceAllTradeItems(items: TradeItem[]): Promise<void> {
  await writeTradeItems(items);
}
