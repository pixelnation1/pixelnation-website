import { SITE } from "@/lib/site";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  deviceType: string;
  description: string;
  preferredContact: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatEmailBody(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Device: ${data.deviceType}`,
    `Preferred contact: ${data.preferredContact}`,
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

  const { name, email, phone, service, deviceType, description, preferredContact } =
    body;

  if (!name?.trim() || name.length > 120) {
    return Response.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!phone?.trim() || phone.length > 30) {
    return Response.json({ error: "Please enter a phone number." }, { status: 400 });
  }
  if (!service?.trim()) {
    return Response.json({ error: "Please select a service." }, { status: 400 });
  }
  if (!deviceType?.trim() || deviceType.length > 120) {
    return Response.json({ error: "Please enter a device type." }, { status: 400 });
  }
  if (!description?.trim() || description.length < 10) {
    return Response.json(
      { error: "Please describe the problem (at least 10 characters)." },
      { status: 400 },
    );
  }
  if (!preferredContact?.trim()) {
    return Response.json(
      { error: "Please select a preferred contact method." },
      { status: 400 },
    );
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service: service.trim(),
    deviceType: deviceType.trim(),
    description: description.trim(),
    preferredContact: preferredContact.trim(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: SITE.email,
          from: payload.email,
          subject: `Contact: ${payload.service} — ${payload.name}`,
          ...payload,
        }),
      });
    } catch {
      return Response.json(
        { error: "Unable to send your message right now. Please call us directly." },
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
          reply_to: payload.email,
          subject: `Website contact: ${payload.service} — ${payload.name}`,
          text: formatEmailBody(payload),
        }),
      });
      if (!res.ok) {
        throw new Error("Resend failed");
      }
    } catch {
      return Response.json(
        { error: "Unable to send your message right now. Please call us directly." },
        { status: 503 },
      );
    }
  }

  if (!webhook && !resendKey) {
    console.info("[contact form]", formatEmailBody(payload));
  }

  return Response.json({
    ok: true,
    message:
      "Thank you for contacting PixelNation. We received your message and will respond during business hours.",
  });
}
