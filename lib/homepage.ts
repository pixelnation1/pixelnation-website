export const HOME_METADATA = {
  title: "PixelNation | Electronics Repair in Emporia, KS",
  description: "Phone, computer, console and appliance repair in downtown Emporia. Get help with damaged HDMI ports, motherboard faults and data recovery.",
  path: "/",
} as const;

export const HERO_HEADLINE = "Electronics repair in Emporia, Kansas";
export const HERO_SUPPORT = "Cracked phone screen? PS5 turns on with no picture? Tell us what happened. We’ll diagnose the fault and walk you through your repair options.";
export const HERO_BULLETS = [
  "Phone screens, batteries and charging ports",
  "Console HDMI ports and computer diagnostics",
  "Microsoldering and data recovery",
] as const;

export const HOME_VISIT = {
  title: "Visit our repair shop",
  body: "Bring your device to our downtown Emporia shop. For appliance service or a mail-in repair, call ahead so we can help you plan the next step.",
} as const;

export const HOME_TRUST_ITEMS = [
  "Downtown Emporia",
  "Board-level diagnostics",
  "Nationwide mail-in repair",
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

export { HOME_FAQS } from "@/lib/faq/global";
