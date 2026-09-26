import { WebhooksHelper } from "square";
import { createSquareClient } from "@/lib/square/client";
import { CatalogCategoryResolver } from "@/lib/square/catalog";
import {
  getSquareLocationId,
  getSquareWebhookNotificationUrl,
  getSquareWebhookSignatureKey,
  isSquareSupportPointsEnabled,
} from "@/lib/square/env";
import { processCompletedSquareOrder } from "@/lib/square/process-order";
import { processCompletedSquareRefund } from "@/lib/square/process-refund";
import {
  recordWebhookEvent,
  webhookEventAlreadyProcessed,
} from "@/lib/square/webhook-events";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SquareWebhookEnvelope = {
  merchant_id?: string;
  type?: string;
  event_id?: string;
  created_at?: string;
  data?: {
    type?: string;
    id?: string;
    object?: Record<string, unknown>;
  };
};

function logWebhook(
  event: string,
  details: Record<string, string | number | boolean | undefined>,
) {
  // Never log access tokens, signature keys, emails, or card data.
  console.error(`[square-webhook] ${event}`, details);
}

async function verifySquareSignature(
  rawBody: string,
  signatureHeader: string | null,
): Promise<boolean> {
  const signatureKey = getSquareWebhookSignatureKey();
  if (!signatureKey || !signatureHeader) return false;

  try {
    return await WebhooksHelper.verifySignature({
      requestBody: rawBody,
      signatureHeader,
      signatureKey,
      notificationUrl: getSquareWebhookNotificationUrl(),
    });
  } catch {
    return false;
  }
}

function paymentFromObject(
  object: Record<string, unknown> | undefined,
): {
  id?: string;
  status?: string;
  orderId?: string;
  locationId?: string;
  customerId?: string;
  createdAt?: string;
  amountMoney?: { amount?: bigint | number };
  tipMoney?: { amount?: bigint | number };
  refundedMoney?: { amount?: bigint | number };
} | null {
  if (!object) return null;
  const payment = (object.payment ?? object) as Record<string, unknown>;
  if (!payment || typeof payment !== "object") return null;
  return payment as ReturnType<typeof paymentFromObject> extends infer T
    ? T
    : never;
}

function refundFromObject(
  object: Record<string, unknown> | undefined,
): {
  id?: string;
  status?: string;
  paymentId?: string;
  orderId?: string;
  locationId?: string;
  amountMoney?: { amount?: bigint | number };
} | null {
  if (!object) return null;
  const refund = (object.refund ?? object) as Record<string, unknown>;
  if (!refund || typeof refund !== "object") return null;
  return refund as ReturnType<typeof refundFromObject> extends infer T
    ? T
    : never;
}

/**
 * Square webhook: verify HMAC on raw body, then process COMPLETED payments
 * and completed refunds for Support Points.
 *
 * Subscribe in Square Dashboard:
 * - payment.updated (filter status COMPLETED; primary for POS paid orders)
 * - refund.updated (filter status COMPLETED / APPROVED)
 *
 * Notification URL must match exactly:
 * https://www.pixelnation.co/api/square/webhook
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature");

  const valid = await verifySquareSignature(rawBody, signature);
  if (!valid) {
    logWebhook("invalid_signature", {});
    return new Response("Forbidden", { status: 403 });
  }

  let envelope: SquareWebhookEnvelope;
  try {
    envelope = JSON.parse(rawBody) as SquareWebhookEnvelope;
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const eventType = envelope.type ?? "";
  const eventId = envelope.event_id ?? "";
  if (!eventId || !eventType) {
    return new Response("Bad Request", { status: 400 });
  }

  let admin;
  try {
    admin = createSupabaseAdminClient();
  } catch {
    logWebhook("admin_unavailable", {});
    return new Response("Service Unavailable", { status: 503 });
  }

  if (await webhookEventAlreadyProcessed(admin, eventId)) {
    return Response.json({ ok: true, duplicate: true });
  }

  const awardsEnabled = isSquareSupportPointsEnabled();
  const configuredLocationId = getSquareLocationId();

  try {
    if (eventType === "payment.updated") {
      const paymentHint = paymentFromObject(envelope.data?.object);
      const paymentId = paymentHint?.id ?? envelope.data?.id;
      if (!paymentId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          outcome: "ignored",
          detail: { reason: "missing_payment_id" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const square = createSquareClient();
      const paymentResponse = await square.payments.get({ paymentId });
      const payment = paymentResponse.payment;
      if (!payment) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squarePaymentId: paymentId,
          outcome: "ignored",
          detail: { reason: "payment_not_found" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      if (configuredLocationId && payment.locationId !== configuredLocationId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squarePaymentId: payment.id,
          squareOrderId: payment.orderId ?? null,
          outcome: "ignored",
          detail: { reason: "location_mismatch" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      if ((payment.status ?? "").toUpperCase() !== "COMPLETED") {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squarePaymentId: payment.id,
          squareOrderId: payment.orderId ?? null,
          outcome: "ignored",
          detail: { reason: "payment_not_completed", status: payment.status },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const orderId = payment.orderId;
      if (!orderId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squarePaymentId: payment.id,
          outcome: "ignored",
          detail: { reason: "payment_missing_order_id" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      // Retry briefly if line items are not yet populated (known Square race).
      let order = (await square.orders.get({ orderId })).order ?? null;
      if (order && !(order.lineItems?.length)) {
        await new Promise((r) => setTimeout(r, 750));
        order = (await square.orders.get({ orderId })).order ?? null;
      }

      if (!order) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squarePaymentId: payment.id,
          squareOrderId: orderId,
          outcome: "ignored",
          detail: { reason: "order_not_found" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const catalogResolver = new CatalogCategoryResolver(square);
      const result = await processCompletedSquareOrder({
        admin,
        squareClient: square,
        catalogResolver,
        order,
        payment,
        awardsEnabled,
      });

      await recordWebhookEvent(admin, {
        squareEventId: eventId,
        eventType,
        squarePaymentId: payment.id,
        squareOrderId: orderId,
        outcome: result.outcome,
        detail: {
          awardCount: result.awards.length,
          points: result.awards.map((a) => a.points),
        },
      });

      return Response.json({ ok: true, outcome: result.outcome });
    }

    if (eventType === "refund.updated") {
      const refundHint = refundFromObject(envelope.data?.object);
      const refundId = refundHint?.id ?? envelope.data?.id;
      if (!refundId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          outcome: "ignored",
          detail: { reason: "missing_refund_id" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const square = createSquareClient();
      const refundResponse = await square.refunds.get({ refundId });
      const refund = refundResponse.refund;
      if (!refund) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squareRefundId: refundId,
          outcome: "ignored",
          detail: { reason: "refund_not_found" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      if (configuredLocationId && refund.locationId !== configuredLocationId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squareRefundId: refund.id,
          outcome: "ignored",
          detail: { reason: "location_mismatch" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const refundStatus = (refund.status ?? "").toUpperCase();
      if (refundStatus !== "COMPLETED" && refundStatus !== "APPROVED") {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squareRefundId: refund.id,
          outcome: "ignored",
          detail: { reason: "refund_not_completed", status: refund.status },
        });
        return Response.json({ ok: true, ignored: true });
      }

      if (!refund.paymentId) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squareRefundId: refund.id,
          outcome: "ignored",
          detail: { reason: "refund_missing_payment_id" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const payment = (
        await square.payments.get({ paymentId: refund.paymentId })
      ).payment;
      if (!payment) {
        await recordWebhookEvent(admin, {
          squareEventId: eventId,
          eventType,
          squareRefundId: refund.id,
          outcome: "ignored",
          detail: { reason: "payment_not_found" },
        });
        return Response.json({ ok: true, ignored: true });
      }

      const originalOrderId = payment.orderId ?? null;
      const refundOrderId = refund.orderId ?? null;

      const originalOrder = originalOrderId
        ? ((await square.orders.get({ orderId: originalOrderId })).order ?? null)
        : null;
      const refundOrder =
        refundOrderId && refundOrderId !== originalOrderId
          ? ((await square.orders.get({ orderId: refundOrderId })).order ?? null)
          : null;

      const catalogResolver = new CatalogCategoryResolver(square);
      const result = await processCompletedSquareRefund({
        admin,
        catalogResolver,
        refund,
        payment,
        originalOrder,
        refundOrder,
        awardsEnabled,
      });

      await recordWebhookEvent(admin, {
        squareEventId: eventId,
        eventType,
        squarePaymentId: payment.id,
        squareOrderId: result.orderId,
        squareRefundId: refund.id,
        outcome: result.outcome,
        detail: { detail: result.detail },
      });

      return Response.json({ ok: true, outcome: result.outcome });
    }

    await recordWebhookEvent(admin, {
      squareEventId: eventId,
      eventType,
      outcome: "ignored",
      detail: { reason: "unhandled_event_type" },
    });
    return Response.json({ ok: true, ignored: true });
  } catch (error) {
    logWebhook("processing_error", {
      eventType,
      message: error instanceof Error ? error.message : "unknown",
    });
    // Return 500 so Square retries; event_id not recorded yet on failure paths
    // that throw before recordWebhookEvent.
    return new Response("Internal Server Error", { status: 500 });
  }
}
