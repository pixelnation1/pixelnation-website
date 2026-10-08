import { FORM_SERVICE_OPTIONS, PREFERRED_CONTACT_OPTIONS, isRepairInquiry } from "@/lib/contact-page";
import {
  isValidUsPhone,
  SMS_CONSENT_DISCLOSURE,
  SMS_CONSENT_PHONE_ERROR,
  SMS_CONSENT_SOURCE_CONTACT,
} from "@/lib/legal/sms";
import { SITE } from "@/lib/site";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  deviceType?: string;
  description: string;
  preferredContact: string;
  smsConsent?: boolean;
  smsConsentText?: string;
  smsConsentTimestamp?: string | null;
  smsConsentSource?: string;
};

type StoredContactSubmission = {
  name: string;
  email: string;
  phone: string;
  mobile_phone: string;
  service: string;
  deviceType: string;
  description: string;
  preferredContact: string;
  sms_consent: boolean;
  sms_consent_text: string;
  sms_consent_timestamp: string | null;
  sms_consent_source: string;
  ip_address: string | null;
  user_agent: string | null;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip");
}

function formatEmailBody(data: StoredContactSubmission): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile phone: ${data.mobile_phone}`,
    `Service: ${data.service}`,
    ...(isRepairInquiry(data.service) ? [`Device: ${data.deviceType}`] : []),
    `Preferred contact: ${data.preferredContact}`,
    "",
    "SMS consent record:",
    `SMS consent: ${data.sms_consent ? "Yes" : "No"}`,
    `SMS consent source: ${data.sms_consent_source}`,
    `SMS consent timestamp: ${data.sms_consent_timestamp ?? "n/a"}`,
    `SMS consent disclosure: ${data.sms_consent_text || "n/a"}`,
    `IP address: ${data.ip_address ?? "n/a"}`,
    `User agent: ${data.user_agent ?? "n/a"}`,
    "",
    "Description:",
    data.description,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    service,
    deviceType,
    description,
    preferredContact,
    smsConsent,
    smsConsentText,
    smsConsentTimestamp,
    smsConsentSource,
  } = body;

  if (typeof name !== "string" || !name.trim() || name.length > 120) {
    return Response.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.trim() || !isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (typeof phone !== "string" || !phone.trim() || phone.length > 30 || !isValidUsPhone(phone)) {
    return Response.json(
      {
        error:
          "Please enter a valid U.S. mobile phone number (for example, 620-779-7158).",
      },
      { status: 400 },
    );
  }
  if (!FORM_SERVICE_OPTIONS.some((option) => option === service)) {
    return Response.json({ error: "Please select an inquiry type." }, { status: 400 });
  }
  const isRepair = isRepairInquiry(service);
  if (isRepair && (typeof deviceType !== "string" || !deviceType.trim() || deviceType.length > 120)) {
    return Response.json({ error: "Please enter a device type." }, { status: 400 });
  }
  if (typeof description !== "string" || description.trim().length < 10) {
    return Response.json(
      { error: "Please enter a message (at least 10 characters)." },
      { status: 400 },
    );
  }
  if (!PREFERRED_CONTACT_OPTIONS.some((option) => option === preferredContact)) {
    return Response.json(
      { error: "Please select a preferred contact method." },
      { status: 400 },
    );
  }

  const consented = smsConsent === true;
  if (consented && (!phone.trim() || !isValidUsPhone(phone))) {
    return Response.json({ error: SMS_CONSENT_PHONE_ERROR }, { status: 400 });
  }

  const payload: StoredContactSubmission = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    mobile_phone: phone.trim(),
    service: service.trim(),
    deviceType: isRepair ? deviceType!.trim() : "",
    description: description.trim(),
    preferredContact: preferredContact.trim(),
    sms_consent: consented,
    sms_consent_text: consented
      ? (smsConsentText?.trim() || SMS_CONSENT_DISCLOSURE)
      : "",
    sms_consent_timestamp: consented
      ? (smsConsentTimestamp?.trim() || new Date().toISOString())
      : null,
    sms_consent_source: smsConsentSource?.trim() || SMS_CONSENT_SOURCE_CONTACT,
    ip_address: getClientIp(request),
    user_agent: request.headers.get("user-agent"),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM_EMAIL?.trim();
  const deliveryError = () => Response.json(
    { error: `Unable to send your message right now. Please call ${SITE.phone} or email ${SITE.email}.` },
    { status: 503 },
  );

  // Use one delivery route. A webhook is authoritative when configured, so a
  // second provider cannot duplicate an accepted inquiry or mask its failure.
  if (!webhook && (!resendKey || !resendFrom)) {
    console.error("[contact form] Delivery is not configured.");
    return deliveryError();
  }

  try {
    const response = await fetch(webhook || "https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        "Content-Type": "application/json",
        ...(!webhook ? { Authorization: `Bearer ${resendKey}` } : {}),
      },
      body: JSON.stringify(webhook ? {
        to: SITE.email,
        from: payload.email,
        subject: `Contact: ${payload.service} — ${payload.name}`,
        ...payload,
      } : {
        from: resendFrom,
        to: [SITE.email],
        reply_to: payload.email,
        subject: `Website contact: ${payload.service} — ${payload.name}`,
        text: formatEmailBody(payload),
      }),
    });
    if (!response.ok) {
      console.error("[contact form] Delivery rejected", {
        provider: webhook ? "webhook" : "resend",
        status: response.status,
      });
      return deliveryError();
    }
    if (!webhook) {
      const result = await response.json() as { id?: unknown } | null;
      if (!result || typeof result.id !== "string" || !result.id.trim()) {
        console.error("[contact form] Missing email acceptance receipt.");
        return deliveryError();
      }
      console.info("[contact form] Email accepted", { id: result.id });
    }
  } catch {
    // Never log the customer's message, credentials, or provider response body.
    console.error("[contact form] Delivery request failed or timed out.");
    return deliveryError();
  }

  return Response.json({
    ok: true,
    message:
      "Thank you for contacting PixelNation. We received your message and will respond during business hours.",
  });
}
