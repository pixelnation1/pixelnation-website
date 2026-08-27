import { checkRateLimit } from "@/lib/trade/rate-limit";
import { getEventBySlug, isSoldOut, seatsRemaining } from "@/lib/events";
import { isValidUsPhone } from "@/lib/legal/sms";
import { SITE } from "@/lib/site";

type RegistrationPayload = {
  eventSlug?: string;
  name?: string;
  email?: string;
  phone?: string;
  playerCount?: number;
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

function formatEmailBody(data: {
  eventTitle: string;
  eventSlug: string;
  name: string;
  email: string;
  phone: string;
  playerCount: number;
  ip: string | null;
  userAgent: string | null;
}): string {
  return [
    `Event: ${data.eventTitle}`,
    `Event slug: ${data.eventSlug}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "n/a"}`,
    `Number of players: ${data.playerCount}`,
    `Payment: not collected`,
    `IP address: ${data.ip ?? "n/a"}`,
    `User agent: ${data.userAgent ?? "n/a"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown";
  const limit = checkRateLimit(`event-register:${ip}`, 8, 60 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: RegistrationPayload;
  try {
    body = (await request.json()) as RegistrationPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const eventSlug = body.eventSlug?.trim() ?? "";
  const event = getEventBySlug(eventSlug);
  if (!event) {
    return Response.json({ error: "That event could not be found." }, { status: 404 });
  }
  if (!event.registrationRequired) {
    return Response.json(
      { error: "This event does not require registration." },
      { status: 400 },
    );
  }
  if (event.status === "cancelled") {
    return Response.json({ error: "This event has been cancelled." }, { status: 400 });
  }
  if (event.status === "completed") {
    return Response.json({ error: "This event has already finished." }, { status: 400 });
  }
  if (isSoldOut(event)) {
    return Response.json({ error: "This event is sold out." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const playerCount = Number(body.playerCount);

  if (!name || name.length > 120) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone && !isValidUsPhone(phone)) {
    return Response.json(
      { error: "Please enter a valid U.S. phone number, or leave it blank." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(playerCount) || playerCount < 1 || playerCount > 12) {
    return Response.json(
      { error: "Please enter a valid number of players." },
      { status: 400 },
    );
  }

  const remaining = seatsRemaining(event);
  if (remaining !== null && playerCount > remaining) {
    return Response.json(
      { error: `Only ${remaining} ${remaining === 1 ? "seat remains" : "seats remain"}.` },
      { status: 400 },
    );
  }

  const payload = {
    eventTitle: event.title,
    eventSlug: event.slug,
    name,
    email,
    phone,
    playerCount,
    ip,
    userAgent: request.headers.get("user-agent"),
  };

  const webhook =
    process.env.EVENT_REGISTRATION_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event-registration",
          to: SITE.email,
          from: email,
          subject: `Event registration: ${event.title} — ${name}`,
          ...payload,
          paymentStatus: "unpaid",
        }),
      });
    } catch {
      return Response.json(
        { error: "Unable to submit registration right now. Please call us." },
        { status: 503 },
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [SITE.email],
          reply_to: email,
          subject: `Event registration: ${event.title} — ${name}`,
          text: formatEmailBody(payload),
        }),
      });
      if (!res.ok) throw new Error("Resend failed");
    } catch {
      return Response.json(
        { error: "Unable to submit registration right now. Please call us." },
        { status: 503 },
      );
    }
  }

  if (!webhook && !resendKey) {
    console.info("[event registration]", formatEmailBody(payload));
  }

  return Response.json({
    ok: true,
    message: `You're registered for ${event.title}. PixelNation will follow up if anything changes.`,
  });
}
