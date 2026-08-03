import { SITE } from "@/lib/site";

export const PRIVACY_POLICY_METADATA = {
  title: "Privacy Policy | PixelNation",
  description:
    "Read PixelNation’s Privacy Policy, including how we collect and use information and how SMS messaging and mobile information are handled.",
  path: "/privacy-policy",
  canonical: "https://www.pixelnation.co/privacy-policy",
  titleAbsolute: true,
} as const;

export const PRIVACY_POLICY_EFFECTIVE_DATE = "July 28, 2026";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export const PRIVACY_POLICY_INTRO = [
  `This Privacy Policy describes how ${SITE.name} (“PixelNation,” “we,” “us,” or “our”) collects, uses, and protects information when you visit ${SITE.domain}, contact us, request repairs or product information, or otherwise interact with our business in ${SITE.address.region}.`,
  `By using our website or submitting information to us, you acknowledge this Privacy Policy. If you do not agree, please do not use the website or submit personal information.`,
] as const;

export const PRIVACY_POLICY_SECTIONS: readonly LegalSection[] = [
  {
    id: "business-contact",
    title: "Business name and contact information",
    paragraphs: [
      `Business name: ${SITE.name}`,
      `Location: ${SITE.address.region}`,
      `Phone: 620-779-7158`,
      `Email: ${SITE.email}`,
      `Website: ${SITE.domain}/`,
      `Hours: ${SITE.hours}`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information PixelNation collects",
    paragraphs: [
      "Depending on how you interact with us, we may collect:",
    ],
    bullets: [
      "Contact details such as your name, email address, and mobile or other phone number",
      "Repair and service details such as device type, symptoms, photos you choose to send, and appointment preferences",
      "Retail and product inquiry details related to trading cards, collectibles, games, consoles, and related products",
      "Messages you send through our contact form, email, phone, or text",
      "SMS consent status and related disclosure records when you affirmatively opt in to text messages",
      "Technical information such as browser type, device type, referring pages, and general usage data collected through cookies or similar technologies",
      "Payment-related information when you pay for goods or services (processed by our payment providers; we do not store full payment card numbers on our website)",
    ],
  },
  {
    id: "how-collected",
    title: "How information is collected",
    paragraphs: [
      "We collect information in the following ways:",
    ],
    bullets: [
      "Directly from you when you fill out forms, call or text us, email us, visit our shop, or request services or products",
      "Automatically when you browse our website through cookies, logs, and similar technologies",
      "From service providers that help us operate our website, communications, analytics, or payment processing, to the extent they provide information needed to deliver those services",
    ],
  },
  {
    id: "how-used",
    title: "How information is used",
    paragraphs: [
      "We use personal information to:",
    ],
    bullets: [
      "Respond to inquiries and provide customer support",
      "Schedule, diagnose, quote, and complete repair and related services",
      "Provide order, pickup, delivery, appointment, and status communications you request or that are needed to fulfill a service",
      "Send transactional and customer-care text messages when you affirmatively opt in",
      "Process purchases and payments for goods and services",
      "Improve our website, services, and customer experience",
      "Comply with legal obligations and protect the rights, property, and safety of PixelNation, our customers, and the public",
    ],
  },
  {
    id: "sms-messaging",
    title: "SMS Messaging and Mobile Information",
    paragraphs: [
      "If you provide your mobile phone number and affirmatively opt in, PixelNation may send transactional and customer-care text messages regarding repair status updates, diagnostic results, appointment reminders, order updates, delivery notifications, pickup notices, and customer support. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. Consent is not a condition of purchase.",
      "PixelNation does not sell, rent, or share mobile phone numbers, SMS consent records, or SMS opt-in information with third parties or affiliates for their marketing or promotional purposes. Mobile phone numbers and SMS opt-in data may only be shared with service providers when needed to operate the messaging program, deliver text messages, operate the business, or comply with legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to operate the site, remember preferences, understand traffic patterns, and improve performance. Analytics tools may collect aggregated or pseudonymous information about how visitors use the site.",
      "You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.",
    ],
  },
  {
    id: "service-providers",
    title: "Service providers",
    paragraphs: [
      "We may share information with trusted service providers who assist with website hosting, form delivery, email, SMS messaging platforms, analytics, payment processing, shipping, and similar operational needs. These providers are permitted to use personal information only as needed to perform services for PixelNation and are expected to protect that information appropriately.",
      "We may also disclose information when required by law, legal process, or to protect PixelNation and others from fraud, abuse, or security threats.",
    ],
  },
  {
    id: "payments",
    title: "Payment processing",
    paragraphs: [
      "When you pay for products or services, payment card and related billing details are handled by our payment processors. PixelNation does not store full payment card numbers on this website. Payment providers process transactions under their own privacy and security practices.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "We retain personal information for as long as needed to provide services, maintain business and repair records, comply with legal and tax obligations, resolve disputes, and enforce our agreements. SMS consent and opt-out records may be retained as needed to demonstrate compliance with messaging rules and to honor your preferences.",
      "When information is no longer needed, we take reasonable steps to delete, de-identify, or securely archive it consistent with our operational practices.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    paragraphs: [
      "We use reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      "Please protect your own account credentials, device access codes, and any sensitive information you share with us.",
    ],
  },
  {
    id: "rights",
    title: "Customer privacy rights",
    paragraphs: [
      "Depending on applicable law, you may have rights to request access to, correction of, or deletion of certain personal information we hold about you, or to ask questions about how we use your information.",
      `To make a privacy request, contact us at ${SITE.email} or call 620-779-7158. We may need to verify your identity before fulfilling a request. Some requests may be limited where we must retain records for legal, security, or legitimate business reasons.`,
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    paragraphs: [
      "Our website and services are directed to adults and are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, contact us and we will take appropriate steps to delete it.",
    ],
  },
  {
    id: "third-party-links",
    title: "Links to third-party websites",
    paragraphs: [
      "Our website may contain links to third-party websites, maps, social platforms, payment pages, or product resources. We are not responsible for the privacy practices or content of those sites. Review their policies before providing personal information.",
    ],
  },
  {
    id: "updates",
    title: "Policy updates",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The effective date at the top of this page will be revised when changes are posted. Continued use of the website or services after an update means you acknowledge the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact information",
    paragraphs: [
      `If you have questions about this Privacy Policy or our privacy practices, contact ${SITE.name}:`,
      `Email: ${SITE.email}`,
      `Phone: 620-779-7158`,
      `Location: ${SITE.address.region}`,
      `Website: ${SITE.domain}/`,
      `You may also visit our Contact page at ${SITE.domain}/contact.`,
    ],
  },
] as const;
