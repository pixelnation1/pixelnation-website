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

  if (body.website?.trim()) {
    return Response.json({ ok: true });
  }

  if (!body.consent) {
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
  if (required.some((value) => !value?.trim())) {
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

  const photos = (body.photoDataUrls || []).slice(0, 3).filter((url) => {
    return typeof url === "string" && url.startsWith("data:image/") && url.length < 1_800_000;
  });

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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "trade_submission",
          to: SITE.email,
          subject: `Trade offer request: ${payload.brand} ${payload.model}`,
          ...payload,
          photoDataUrls: photos.map((url, index) => ({
            index,
            bytes: url.length,
            preview: url.slice(0, 64),
          })),
        }),
      });
    } catch {
      return Response.json(
        { error: "Unable to send your request right now. Please call us." },
        { status: 503 },
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  if (resendKey) {
    try {
      const attachments = photos.map((dataUrl, index) => {
        const [, meta, data] = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/) || [];
        return {
          filename: `trade-photo-${index + 1}.${(meta || "image/jpeg").split("/")[1] || "jpg"}`,
          content: data || "",
        };
      }).filter((file) => file.content);

      const res = await fetch("https://api.resend.com/emails", {
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
    } catch {
      return Response.json(
        { error: "Unable to send your request right now. Please call us." },
        { status: 503 },
      );
    }
  }

  if (!webhook && !resendKey) {
    console.info("[trade submission]", formatBody(payload));
  }

  return Response.json({
    ok: true,
    message: "Your final offer request was received.",
  });
}
