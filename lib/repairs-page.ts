export const REPAIRS_METADATA = {
  title:
    "Repair Services in Emporia, KS | Phone, Computer, Console, Appliance & Board Repair | PixelNation",
  description:
    "Explore PixelNation repair services in Emporia, KS, including phone repair, computer repair, appliance repair, console repair, data recovery, microsoldering, and board-level repair.",
  path: "/repairs",
  canonical: "https://www.pixelnation.co/repairs",
} as const;

export const REPAIRS_SERVICE_CARDS = [
  {
    title: "Phone Repair",
    seoLabel: "Phone Repair Emporia KS",
    description:
      "Screens, batteries, charging ports, cameras, and board-level phone faults for iPhone and Android.",
    href: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt:
      "Phone repair in Emporia Kansas — iPhone and Android screen, battery, and charging port repair",
  },
  {
    title: "Computer & Laptop Repair",
    seoLabel: "Computer Repair Emporia KS",
    description:
      "Hardware, software, storage upgrades, virus removal, and performance tuning for PCs and Macs.",
    href: "/computer-repair",
    image: "/images/computerrepair.png",
    imageAlt:
      "Computer and laptop repair in Emporia Kansas — diagnostics, hardware, and software service",
  },
  {
    title: "Appliance Diagnostics & Repair",
    seoLabel: "Appliance Repair Emporia KS",
    description:
      "Structured troubleshooting for refrigerators, washers, dryers, ovens, and control board faults.",
    href: "/appliance-repair",
    image: "/images/appliancerepair.png",
    imageAlt:
      "Appliance repair in Emporia Kansas — refrigerator, washer, dryer, and oven diagnostics",
  },
  {
    title: "Console Repair",
    seoLabel: "Console Repair Emporia KS",
    description:
      "PS5 HDMI repair, Xbox ports, overheating, power faults, and board-level console work.",
    href: "/console-repair",
    image: "/images/gameconsolerepair2.png",
    imageAlt:
      "Game console repair in Emporia Kansas — PlayStation, Xbox, Nintendo Switch, and Steam Deck",
  },
  {
    title: "Data Recovery",
    seoLabel: "Data Recovery Emporia KS",
    description:
      "Recover photos, documents, and files from phones, hard drives, SSDs, USB drives, and SD cards.",
    href: "/data-recovery",
    image: "/images/datarecovery2.png",
    imageAlt:
      "Data recovery in Emporia Kansas — phones, hard drives, SSDs, and USB storage",
  },
  {
    title: "Microsoldering & Board-Level Repair",
    seoLabel: "Board Repair Emporia KS · Microsoldering Emporia KS",
    description:
      "Charging port microsoldering, HDMI ports, trace repair, liquid damage, and no-power diagnostics.",
    href: "/board-repair",
    image: "/images/motherboardrepair2.png",
    imageAlt:
      "Board repair and microsoldering in Emporia Kansas for phones, computers, consoles, and motherboards",
  },
  {
    title: "Training",
    seoLabel: "Repair training courses",
    description:
      "Hands-on courses for technicians who want practical microsoldering and diagnostics skills.",
    href: "/training",
    image: "/images/boardrepair.png",
    imageAlt:
      "PixelNation repair training courses in Emporia Kansas — microsoldering and diagnostics",
  },
] as const;

export const POPULAR_REPAIRS = [
  {
    title: "iPhone & Android screen repair",
    href: "/phone-repair",
    text: "Cracked glass, touch issues, and display replacements with quality parts.",
  },
  {
    title: "Charging port repair",
    href: "/phone-repair",
    text: "Loose ports, bent pins, and board-level charging circuit faults.",
  },
  {
    title: "Laptop slow or not booting",
    href: "/computer-repair",
    text: "Diagnostics, SSD upgrades, virus removal, and hardware faults.",
  },
  {
    title: "PS5 & Xbox HDMI repair",
    href: "/console-repair",
    text: "No display, damaged HDMI ports, and video output restoration.",
  },
  {
    title: "Refrigerator & dryer repair",
    href: "/appliance-repair",
    text: "Cooling, heating, and control faults on household appliances.",
  },
  {
    title: "Dead phone data recovery",
    href: "/data-recovery",
    text: "Photos and files from phones that will not power on.",
  },
] as const;

export const ADVANCED_REPAIR_POINTS = [
  "Microsoldering for charging ports and HDMI connectors",
  "Trace, pad, and connector restoration",
  "Short circuit and power rail diagnostics",
  "Liquid damage board evaluation and rework",
  "No-power phone, console, and computer faults",
  "Board-level data recovery access paths",
] as const;

export const COMMON_PROBLEMS = [
  { label: "Phone not charging", href: "/phone-repair" },
  { label: "Cracked phone screen", href: "/phone-repair" },
  { label: "Laptop running slow", href: "/computer-repair" },
  { label: "Computer will not turn on", href: "/computer-repair" },
  { label: "Refrigerator not cooling", href: "/appliance-repair" },
  { label: "Dryer not heating", href: "/appliance-repair" },
  { label: "PS5 no display / HDMI damage", href: "/console-repair" },
  { label: "Xbox overheating", href: "/console-repair" },
  { label: "Lost photos or files", href: "/data-recovery" },
  { label: "Liquid-damaged phone", href: "/phone-repair" },
  { label: "Device with no power", href: "/board-repair" },
  { label: "USB or SD card not recognized", href: "/data-recovery" },
] as const;

export const REPAIRS_FAQ = [
  {
    question: "What repair services does PixelNation offer?",
    answer:
      "PixelNation offers phone repair, computer and laptop repair, appliance diagnostics and repair, game console repair, data recovery, microsoldering, and board-level repair in Emporia, Kansas—with mail-in options nationwide.",
  },
  {
    question: "Do you repair phones and computers?",
    answer:
      "Yes. PixelNation repairs iPhone and Android phones, tablets, laptops, desktops, gaming PCs, and Mac systems with structured diagnostics and clear communication before work begins.",
  },
  {
    question: "Do you repair appliances?",
    answer:
      "Yes. We diagnose and repair refrigerators, washers, dryers, ovens, dishwashers, and other household appliances when faults fall within our service scope.",
  },
  {
    question: "Do you repair game consoles?",
    answer:
      "Yes. PixelNation repairs PlayStation, Xbox, Nintendo Switch, Steam Deck, and related consoles—including HDMI port repair, overheating, and power faults.",
  },
  {
    question: "Do you offer data recovery?",
    answer:
      "Yes. PixelNation recovers photos, documents, and critical files from phones, hard drives, SSDs, USB drives, SD cards, and other storage when recovery is realistic.",
  },
  {
    question: "Do you perform board-level repair and microsoldering?",
    answer:
      "Yes. PixelNation performs board-level repair and microsoldering in Emporia, Kansas for charging ports, HDMI ports, traces, pads, shorts, liquid damage, and no-power faults.",
  },
  {
    question: "Can I track my repair online?",
    answer:
      "Yes. Contact us by phone or email with your ticket information for status updates on your active repair.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "What repair services are available in Emporia, Kansas at PixelNation?",
    answer:
      "PixelNation provides phone repair, computer repair, appliance repair, console repair, data recovery, microsoldering, and board-level repair in Emporia, Kansas.",
  },
  {
    question: "Does PixelNation offer microsoldering in Emporia, KS?",
    answer:
      "Yes. PixelNation offers microsoldering and board-level repair for phones, computers, consoles, and electronics in Emporia, Kansas.",
  },
] as const;
