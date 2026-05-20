import { SITE } from "@/lib/site";

export const HOME_METADATA = {
  title: "PixelNation | Phone, Computer, Console & Appliance Repair in Emporia, KS",
  description:
    "Professional phone, computer, console, appliance, data recovery, and board-level repair in Emporia, Kansas. Start your repair online today.",
} as const;

export const HERO_BULLETS = [
  "Charging port, screen, and battery replacement",
  "Laptop and desktop diagnostics and repair",
  "PS5 and Xbox HDMI repair",
  "Appliance troubleshooting and repair",
  "Data recovery from phones, SSDs, and hard drives",
  "Microsoldering and board-level repair",
] as const;

export const HOME_TRUST_ITEMS = [
  "Located in Emporia, Kansas",
  "Same-day repairs available on select services",
  "Mail-in repair accepted nationwide",
  "Advanced board-level diagnostics",
  "Professional training courses available",
] as const;

export const HOME_SERVICES = [
  {
    title: "Phone Repair",
    seoLabel: "Phone Repair Emporia KS",
    href: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt:
      "iPhone and Android phone repair in Emporia, Kansas — screens, batteries, and charging ports",
    description:
      "Cracked screens, weak batteries, charging failures, and camera issues on iPhone and Android devices. Local iPhone repair in Emporia with board-level options when needed.",
  },
  {
    title: "Computer Repair",
    seoLabel: "Computer Repair Emporia KS",
    href: "/computer-repair-emporia-ks",
    image: "/images/computerrepair.png",
    imageAlt:
      "Computer and laptop repair in Emporia, KS — slow systems, virus removal, and hardware faults",
    description:
      "Laptops and desktops that run slow, overheat, or fail to boot. Virus removal, SSD upgrades, and hardware diagnostics for work and school machines.",
  },
  {
    title: "Appliance Repair",
    seoLabel: "Appliance Repair Emporia KS",
    href: "/appliance-repair-emporia-ks",
    image: "/images/appliancerepair.png",
    imageAlt:
      "Appliance diagnostics and repair in Emporia, Kansas — refrigerators, dryers, and control faults",
    description:
      "Structured troubleshooting for refrigerators, dryers, and other appliances with power, heat, or control board problems.",
  },
  {
    title: "Console Repair",
    seoLabel: "Console Repair Emporia KS",
    href: "/console-repair-emporia-ks",
    image: "/images/consolerepair.png",
    imageAlt:
      "PS5 and Xbox HDMI repair in Emporia, KS — no display, overheating, and power issues",
    description:
      "PS5 HDMI repair, Xbox port damage, overheating, and no-display faults. Console repair backed by internal diagnostics and port rework.",
  },
  {
    title: "Data Recovery",
    seoLabel: "Data Recovery Emporia KS",
    href: "/data-recovery",
    image: "/images/datarecovery.png",
    imageAlt:
      "Data recovery in Emporia, Kansas — phones, SSDs, hard drives, and USB media",
    description:
      "Recover photos, documents, and files from phones, SSDs, hard drives, and USB drives when devices stop booting or storage fails.",
  },
  {
    title: "Microsoldering & Board-Level Repair",
    seoLabel: "Board Repair Emporia KS",
    href: "/board-repair",
    image: "/images/motherboardrepair2.png",
    imageAlt:
      "Microsoldering and board-level repair in Emporia, KS — charging ICs, HDMI ports, and trace repair",
    description:
      "Microsoldering Emporia KS for charging circuits, HDMI ports, trace damage, and power faults other shops may not attempt.",
  },
] as const;

export const COMMON_PROBLEMS = [
  { label: "iPhone not charging", href: "/phone-repair" },
  { label: "Cracked screens", href: "/phone-repair" },
  { label: "Laptop running slow", href: "/computer-repair-emporia-ks" },
  { label: "Computer not turning on", href: "/computer-repair-emporia-ks" },
  { label: "Refrigerator not cooling", href: "/appliance-repair-emporia-ks" },
  { label: "Dryer not heating", href: "/appliance-repair-emporia-ks" },
  { label: "PS5 no display", href: "/console-repair-emporia-ks" },
  { label: "Xbox HDMI damage", href: "/console-repair-emporia-ks" },
  { label: "Lost files", href: "/data-recovery" },
  { label: "Liquid damage", href: "/phone-repair" },
  { label: "Devices with no power", href: "/board-repair" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Advanced diagnostics",
    text: "We reproduce symptoms and test circuits before recommending parts or board work.",
  },
  {
    title: "Board-level repair",
    text: "Microsoldering, HDMI rework, and power rail repair when replacement alone is not enough.",
  },
  {
    title: "Data recovery expertise",
    text: "Structured recovery paths for phones, drives, and devices that will not power on.",
  },
  {
    title: "Mail-in service",
    text: "Ship devices from anywhere in the U.S. with clear updates through evaluation and repair.",
  },
  {
    title: "Local Emporia support",
    text: `Walk-in help during business hours at our ${SITE.address.region} location.`,
  },
  {
    title: "Hands-on training",
    text: "Learn practical repair and board-level skills through PixelNation training courses.",
  },
] as const;

export const ADVANCED_REPAIR_ITEMS = [
  "Charging port rework",
  "HDMI replacement",
  "Trace and pad repair",
  "Short circuit diagnosis",
  "Liquid damage recovery",
  "Power rail troubleshooting",
] as const;

export const MAIL_IN_STEPS = [
  {
    title: "Start a repair online",
    text: "Tell us about your device and issue through our contact form or by phone.",
  },
  {
    title: "Ship your device",
    text: "Pack it securely and send it to PixelNation with your reference information.",
  },
  {
    title: "Diagnostics and updates",
    text: "We evaluate the fault, explain options, and keep you informed before work proceeds.",
  },
  {
    title: "Return shipping",
    text: "After approval and repair, your device is returned ready to use.",
  },
] as const;

export const DATA_RECOVERY_DEVICES = [
  "Phones",
  "Hard drives",
  "SSDs",
  "USB drives",
  "Tablets",
  "Consoles",
] as const;

export const HOME_FAQ = [
  {
    question: "How long do repairs take?",
    answer:
      "Many common repairs finish within a business day when parts are available. Board-level work, data recovery, and mail-in jobs may need additional time—we outline timing before you approve the repair.",
  },
  {
    question: "Do you repair boards?",
    answer:
      "Yes. PixelNation performs board-level repair and microsoldering, including charging circuits, HDMI ports, trace work, and power faults on phones, consoles, and computers.",
  },
  {
    question: "Can you recover data?",
    answer:
      "Often, yes. We assess storage health and device condition, then recommend the safest recovery approach for phones, SSDs, hard drives, USB drives, and other media.",
  },
  {
    question: "Do you accept mail-in repairs?",
    answer:
      "Yes. Mail-in repair is available nationwide. Start online, ship your device, and receive diagnostics and repair updates before your device is returned.",
  },
  {
    question: "Do you offer training?",
    answer:
      "Yes. PixelNation offers hands-on repair and board-level training courses. Contact us for current schedules and course details.",
  },
  {
    question: "Do you repair appliances?",
    answer:
      "Yes. Appliance diagnostics and repair are a core service—we troubleshoot power, control, and mechanical faults on eligible units.",
  },
] as const;
