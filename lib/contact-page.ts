export const CONTACT_METADATA = {
  title: "Contact PixelNation | Repair Services in Emporia, KS",
  description:
    "Contact PixelNation in Emporia, KS for phone repair, computer repair, appliance repair, game console repair, data recovery, and board-level microsoldering services.",
  path: "/contact",
  canonical: "https://www.pixelnation.co/contact",
} as const;

export const CONTACT_SERVICES = [
  { label: "Phone Repair", href: "/phone-repair", keyword: "Phone Repair Emporia KS" },
  {
    label: "Computer Repair",
    href: "/computer-repair",
    keyword: "Computer Repair Emporia KS",
  },
  {
    label: "Appliance Repair",
    href: "/appliance-repair",
    keyword: "Appliance Repair Emporia KS",
  },
  {
    label: "Console Repair",
    href: "/console-repair",
    keyword: "Console Repair Emporia KS",
  },
  {
    label: "Data Recovery",
    href: "/data-recovery",
    keyword: "Data Recovery Emporia KS",
  },
  {
    label: "Board Repair & Microsoldering",
    href: "/board-repair",
    keyword: "Board Repair Emporia KS",
  },
  { label: "Training Courses", href: "/training", keyword: "Repair training" },
] as const;

export const FORM_SERVICE_OPTIONS = [
  "Phone Repair",
  "Computer Repair",
  "Appliance Repair",
  "Console Repair",
  "Data Recovery",
  "Board Repair",
  "Training",
  "General Question",
] as const;

export const PREFERRED_CONTACT_OPTIONS = ["Phone", "Email", "Either"] as const;

export const CONTACT_FAQ = [
  {
    question: "How do I start a repair?",
    answer:
      "Call 620-591-0083, email support@pixelnation.co, or submit the contact form with your device type and symptoms. We outline evaluation steps, timing, and pricing before work begins.",
  },
  {
    question: "What information should I include when contacting you?",
    answer:
      "Include your device model, what happened, visible damage, and whether the device powers on. For data recovery, note which files matter most. Photos of damage can help us prepare before you visit or ship.",
  },
  {
    question: "Do you accept mail-in repairs?",
    answer:
      "Yes. PixelNation accepts mail-in repair and data recovery from customers outside Emporia. Contact us first so we can confirm your issue fits our services and share packing guidance.",
  },
  {
    question: "How quickly will I receive a response?",
    answer:
      "During business hours (Monday–Friday, 9:00 AM–3:00 PM), we aim to respond the same day. Messages received after hours or on weekends are answered on the next business day.",
  },
  {
    question: "Can I track my repair online?",
    answer:
      "Yes. Call or email us with your ticket information for a status update on active repairs.",
  },
  {
    question: "Do you offer training courses?",
    answer:
      "Yes. PixelNation offers hands-on training for technicians who want practical microsoldering and diagnostics skills. Visit the Training page or contact us for current course availability.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "How do I contact PixelNation in Emporia, Kansas?",
    answer:
      "You can call PixelNation at 620-591-0083 or email support@pixelnation.co.",
  },
  {
    question: "What are PixelNation's business hours?",
    answer:
      "PixelNation is open Monday through Friday from 9:00 AM to 3:00 PM.",
  },
  {
    question: "What services does PixelNation offer?",
    answer:
      "PixelNation provides phone repair, computer repair, appliance repair, console repair, data recovery, and board-level microsoldering services.",
  },
] as const;

export const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Emporia,+Kansas&hl=en&z=13&output=embed";

export const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Emporia,+Kansas";
