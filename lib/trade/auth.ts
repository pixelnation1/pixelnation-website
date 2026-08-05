import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "pn_trade_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function getPassword(): string | null {
  return process.env.TRADE_ADMIN_PASSWORD?.trim() || null;
}

function getSecret(): string {
  return (
    process.env.TRADE_ADMIN_SECRET?.trim() ||
    process.env.TRADE_ADMIN_PASSWORD?.trim() ||
    "pixelnation-trade-dev-secret"
  );
}

function signToken(issuedAt: number): string {
  const payload = `${issuedAt}`;
  const sig = createHash("sha256")
    .update(`${payload}:${getSecret()}`)
    .digest("hex");
  return `${payload}.${sig}`;
}

export function isTradeAdminConfigured(): boolean {
  return Boolean(getPassword());
}

export function verifyTradeAdminPassword(password: string): boolean {
  const expected = getPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createTradeAdminSession(): Promise<void> {
  const token = signToken(Date.now());
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearTradeAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isTradeAdminAuthenticated(): Promise<boolean> {
  if (!isTradeAdminConfigured()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [issuedAtRaw, sig] = token.split(".");
  if (!issuedAtRaw || !sig) return false;
  const issuedAt = Number.parseInt(issuedAtRaw, 10);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > MAX_AGE_SECONDS * 1000) return false;
  const expected = signToken(issuedAt);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function requireTradeAdmin(): Promise<boolean> {
  return isTradeAdminAuthenticated();
}
