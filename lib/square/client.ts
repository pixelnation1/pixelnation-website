import "server-only";
import { SquareClient, SquareEnvironment } from "square";
import {
  getSquareAccessToken,
  getSquareEnvironmentName,
} from "@/lib/square/env";

let cachedClient: SquareClient | null = null;

export function createSquareClient(): SquareClient {
  const token = getSquareAccessToken();
  if (!token) {
    throw new Error("Missing SQUARE_ACCESS_TOKEN");
  }

  if (cachedClient) return cachedClient;

  const environment =
    getSquareEnvironmentName() === "sandbox"
      ? SquareEnvironment.Sandbox
      : SquareEnvironment.Production;

  cachedClient = new SquareClient({
    token,
    environment,
  });
  return cachedClient;
}
