import { SITE } from "@/lib/site";

export const TERMS_OF_SERVICE_METADATA = {
  title: "Terms of Service | PixelNation",
  description:
    "Read PixelNation’s Terms of Service for website use, repair services, retail purchases, and SMS messaging terms.",
  path: "/terms-of-service",
  canonical: "https://www.pixelnation.co/terms-of-service",
  titleAbsolute: true,
} as const;

export const TERMS_OF_SERVICE_EFFECTIVE_DATE = "July 28, 2026";

export type TermsSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export const TERMS_OF_SERVICE_INTRO = [
  `These Terms of Service (“Terms”) govern your use of the ${SITE.name} website at ${SITE.domain} and your interactions with PixelNation for electronics repair, diagnostics, retail products, trading cards, collectibles, and related services in ${SITE.address.region}.`,
  "By accessing the website, submitting a form, purchasing products, or requesting services, you agree to these Terms. If you do not agree, do not use the website or our services.",
] as const;

export const TERMS_OF_SERVICE_SECTIONS: readonly TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      "These Terms form a binding agreement between you and PixelNation. Additional written estimates, invoices, intake forms, or in-store policies may also apply to specific repairs or purchases and will control if they conflict with general website content for that transaction.",
    ],
  },
  {
    id: "services",
    title: "Description of services",
    paragraphs: [
      "PixelNation provides electronics repair, device diagnostics, computer, smartphone, tablet, and game console services, appliance repair, data recovery, microsoldering and board-level repair, trading card games, collectibles, and related retail products and community gaming offerings as available.",
      "Service availability, timelines, and inventory can change. Website descriptions are informational and do not guarantee that a particular repair, part, or product is available at any given time.",
    ],
  },
  {
    id: "estimates",
    title: "Repair estimates and diagnostics",
    paragraphs: [
      "Many repairs begin with diagnostics to identify the fault and provide an estimate. Diagnostic fees, if any, will be disclosed before or at intake. Estimates are good-faith assessments based on information available at the time and may change if additional damage, parts needs, or complications are discovered.",
      "We will seek your approval before proceeding with work beyond an approved estimate, except where you have authorized us in writing or at intake to proceed within an agreed range.",
    ],
  },
  {
    id: "authorization",
    title: "Customer authorization",
    paragraphs: [
      "By authorizing a repair, you confirm that you own the device or have authority to authorize service. You authorize PixelNation to inspect, test, disassemble, repair, and, when necessary, replace components as agreed.",
      "You agree to provide accurate contact information and to respond to quotes and status updates in a timely manner.",
    ],
  },
  {
    id: "device-access",
    title: "Device access and passwords",
    paragraphs: [
      "Some diagnostics and repairs require device passwords, PINs, account credentials, or unlocked access. Providing access is voluntary but may be required to complete certain services. You are responsible for backing up data and removing sensitive accounts or credentials when appropriate before leaving a device for service.",
    ],
  },
  {
    id: "data-loss",
    title: "Data-loss disclaimer",
    paragraphs: [
      "Electronics repair, board-level work, liquid-damage treatment, storage failure, and related services carry inherent risk of data loss or further device failure. PixelNation is not responsible for loss of data, software, settings, or media unless a separate written data-recovery agreement expressly states otherwise.",
      "We strongly recommend backing up important data before service whenever the device allows.",
    ],
  },
  {
    id: "unclaimed",
    title: "Unclaimed devices",
    paragraphs: [
      "Devices left beyond a reasonable storage period after notice that work is complete, declined, or abandoned may be subject to storage fees and, to the extent permitted by applicable law, disposal, recycling, or other disposition. Contact us promptly regarding completed or pending jobs.",
    ],
  },
  {
    id: "parts-warranty",
    title: "Parts and warranty limitations",
    paragraphs: [
      "Repair warranties, if offered, apply only to the specific parts and labor described on your invoice and for the stated period. Warranties typically exclude new physical damage, liquid exposure, misuse, unauthorized repairs, software issues unrelated to the repair, and unrelated failures.",
      "Manufacturer warranties, third-party parts warranties, and retail product warranties are governed by their own terms. PixelNation does not guarantee that repair will restore a device to new condition or preserve manufacturer warranty status.",
    ],
  },
  {
    id: "retail",
    title: "Retail purchases and product availability",
    paragraphs: [
      "Trading cards, games, consoles, collectibles, and other retail products are subject to availability, condition descriptions, and store policies. Preorders and new-release availability are not guaranteed until confirmed by PixelNation.",
      "Product images and descriptions on the website are illustrative and may not reflect current stock.",
    ],
  },
  {
    id: "pricing",
    title: "Pricing and payment",
    paragraphs: [
      "Prices for repairs, diagnostics, training, and retail products are as quoted at the time of sale or authorization. Payment is due as stated on invoices or at checkout. We may refuse or delay service for unpaid balances.",
      "Taxes, shipping, and third-party fees may apply where relevant.",
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    paragraphs: [
      "You may use the website for lawful personal or business purposes related to learning about and contacting PixelNation. You agree not to misuse the site, attempt unauthorized access, scrape content in a way that impairs the service, submit malicious code, or interfere with site operation.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    paragraphs: [
      "Website content, branding, logos, text, graphics, and layout are owned by PixelNation or its licensors and are protected by applicable intellectual property laws. You may not copy, modify, or redistribute site content for commercial purposes without prior written permission, except for limited personal, non-commercial use permitted by law.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited conduct",
    paragraphs: [
      "You agree not to:",
    ],
    bullets: [
      "Provide false identity or ownership information for devices or purchases",
      "Use the website or communications for fraud, harassment, or illegal activity",
      "Attempt to reverse engineer, overload, or disrupt the website or related systems",
      "Misrepresent SMS consent or submit forms on behalf of others without authority",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services",
    paragraphs: [
      "The website and business operations may rely on third-party platforms for hosting, maps, payments, messaging, shipping, analytics, and similar services. Those providers have their own terms and privacy practices. PixelNation is not responsible for third-party outages, delays, or policies beyond our reasonable control.",
    ],
  },
  {
    id: "sms-terms",
    title: "SMS Terms and Conditions",
    paragraphs: [
      "Customers opt in to PixelNation SMS by entering a mobile phone number and manually checking the SMS consent box on the Contact page at https://www.pixelnation.co/contact. Checking the box is optional and is never preselected.",
      "By opting in, you agree to receive transactional and customer-care text messages from PixelNation. Messages may include repair status updates, diagnostic results, appointment reminders, order updates, delivery notifications, product-arrival notices, pickup notifications, and responses to customer-support requests.",
      "Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.",
      "You may opt out at any time by replying STOP. After submitting STOP, you may receive one final confirmation message. For assistance, reply HELP, call or text 620-779-7158, email support@pixelnation.co, or visit https://www.pixelnation.co/.",
      "Wireless carriers are not liable for delayed or undelivered messages. PixelNation may modify or discontinue its SMS program at any time.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, PixelNation and its owners, employees, and agents are not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, goodwill, or business opportunities arising from website use or services.",
      "Our total liability for any claim related to a specific repair or purchase is limited to the amount you paid PixelNation for that repair or purchase, except where applicable law requires otherwise.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless PixelNation from claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your misuse of the website, your breach of these Terms, your unauthorized authorization of device service, or your violation of law or third-party rights.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      `These Terms are governed by the laws of the State of Kansas, without regard to conflict-of-law principles. Courts located in Kansas shall have exclusive jurisdiction over disputes arising from these Terms or your use of the website or services, except where applicable law provides otherwise.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to the terms",
    paragraphs: [
      "We may update these Terms from time to time. The effective date will be revised when changes are posted. Continued use of the website or services after changes are posted constitutes acceptance of the updated Terms for future interactions.",
    ],
  },
  {
    id: "contact",
    title: "Contact details",
    paragraphs: [
      `Questions about these Terms may be directed to ${SITE.name}:`,
      `Email: ${SITE.email}`,
      `Phone: 620-779-7158`,
      `Location: ${SITE.address.region}`,
      `Website: ${SITE.domain}/`,
      `Contact form: ${SITE.domain}/contact`,
    ],
  },
] as const;
