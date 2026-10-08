import { SITE } from "@/lib/site";
import { checkRateLimit } from "@/lib/trade/rate-limit";
import { FINAL_OFFER_CONSENT } from "@/lib/trade/content";
import type { TradeSubmissionInput } from "@/lib/trade/types";
import { formatCents } from "@/lib/trade/format";
import { isValidUsPhone } from "@/lib/legal/sms";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function formatBody(data: TradeSubmissionInput & { ip: string }): string {
  return [
    "PixelNation final offer request",
    "",
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Category: ${data.category}`,
    `Brand: ${data.brand}`,
    `Model: ${data.model}`,
    `Storage: ${data.storage || "n/a"}`,
    `Working status: ${data.workingStatus}`,
    `Cosmetic condition: ${data.cosmeticCondition}`,
    `Preferred option: ${data.preferredPayment}`,
    `Product slug: ${data.productSlug || "n/a"}`,
    `Listed product: ${data.productName || "n/a"}`,
    `Listed cash estimate: ${
      data.estimateCashCents != null ? formatCents(data.estimateCashCents) : "n/a"
    }`,
    `Listed store-credit estimate: ${
      data.estimateCreditCents != null
        ? formatCents(data.estimateCreditCents)
        : "n/a"
    }`,
    "",
    "Included accessories:",
    data.includedAccessories,
    "",
    "Damage / problems:",
    data.issueDescription || "n/a",
    "",
    `Consent: Yes — ${FINAL_OFFER_CONSENT}`,
    `Photos attached in payload: ${data.photoDataUrls?.length ?? 0}`,
    `IP: ${data.ip}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`trade-submissions:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: TradeSubmissionInput;
  try {
    body = (await request.json()) as TradeSubmissionInput;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (body.website != null && typeof body.website !== "string") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (body.website?.trim()) {
    return Response.json({ ok: true });
  }

  if (body.consent !== true) {
    return Response.json(
      { error: "Please confirm that online values are estimates." },
      { status: 400 },
    );
  }

  const required = [
    body.firstName,
    body.lastName,
    body.email,
    body.phone,
    body.category,
    body.brand,
    body.model,
    body.workingStatus,
    body.cosmeticCondition,
    body.includedAccessories,
    body.preferredPayment,
  ];
  if (required.some((value) => typeof value !== "string" || !value.trim() || value.length > 2000)) {
    return Response.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }
  if (!isValidEmail(body.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isValidUsPhone(body.phone)) {
    return Response.json(
      { error: "Please enter a valid U.S. phone number." },
      { status: 400 },
    );
  }

  const photos = body.photoDataUrls ?? [];
  if (!Array.isArray(photos) || photos.length > 3 || photos.some((url) =>
    typeof url !== "string" || url.length >= 1_800_000 ||
    !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(url)
  )) {
    return Response.json({ error: "Please attach up to 3 JPEG, PNG, or WebP photos under 1.2 MB each." }, { status: 400 });
  }

  const payload = {
    ...body,
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    photoDataUrls: photos,
    ip,
    submission_status: "new",
    created_at: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (!webhook && (!resendKey || !resendFrom)) {
    return Response.json(
      { error: `Your request could not be sent. Please call ${SITE.phone} or visit us for a trade-in quote.` },
      { status: 503 },
    );
  }
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        signal: AbortSignal.timeout(10_000),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "trade_submission",
          to: SITE.email,
          subject: `Trade offer request: ${payload.brand} ${payload.model}`,
          ...payload,
          photoDataUrls: photos,
        }),
      });
      if (!response.ok) throw new Error("Webhook rejected request");
    } catch {
      return Response.json(
        { error: "Unable to send your request right now. Please call us." },
        { status: 503 },
      );
    }
  }

  if (!webhook && resendKey && resendFrom) {
    try {
      const attachments = photos.map((dataUrl, index) => {
        const [, meta, data] = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/) || [];
        return {
          filename: `trade-photo-${index + 1}.${(meta || "image/jpeg").split("/")[1] || "jpg"}`,
          content: data || "",
        };
      }).filter((file) => file.content);

      const res = await fetch("https://api.resend.com/emails", {
        signal: AbortSignal.timeout(10_000),
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [SITE.email],
          reply_to: payload.email,
          subject: `Trade offer request: ${payload.brand} ${payload.model}`,
          text: formatBody(payload),
          attachments: attachments.length ? attachments : undefined,
        }),
      });
      if (!res.ok) throw new Error("Resend failed");
      const receipt = await res.json();
      if (typeof receipt?.id !== "string" || !receipt.id.trim()) throw new Error("Missing receipt");
    } catch {
      return Response.json(
        { error: "Unable to send your request right now. Please call us." },
        { status: 503 },
      );
    }
  }


  return Response.json({
    ok: true,
    message: "Your final offer request was received.",
  });
}
