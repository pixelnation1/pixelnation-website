import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function recordWebhookEvent(
  admin: SupabaseClient,
  input: {
    squareEventId: string;
    eventType: string;
    squareOrderId?: string | null;
    squarePaymentId?: string | null;
    squareRefundId?: string | null;
    outcome: string;
    detail?: Record<string, unknown>;
  },
): Promise<"inserted" | "duplicate"> {
  const { error } = await admin.from("square_webhook_events").insert({
    square_event_id: input.squareEventId,
    event_type: input.eventType,
    square_order_id: input.squareOrderId ?? null,
    square_payment_id: input.squarePaymentId ?? null,
    square_refund_id: input.squareRefundId ?? null,
    outcome: input.outcome,
    detail: input.detail ?? {},
  });

  if (error) {
    if (error.code === "23505") return "duplicate";
    throw error;
  }
  return "inserted";
}

export async function webhookEventAlreadyProcessed(
  admin: SupabaseClient,
  squareEventId: string,
): Promise<boolean> {
  const { data } = await admin
    .from("square_webhook_events")
    .select("id")
    .eq("square_event_id", squareEventId)
    .maybeSingle();
  return Boolean(data);
}
