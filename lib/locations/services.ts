export type ServiceSlug =
  | "iphone-repair"
  | "ps5-hdmi-repair"
  | "xbox-repair"
  | "computer-repair"
  | "data-recovery"
  | "microsoldering"
  | "board-repair"
  | "liquid-damage-repair"
  | "charging-port-repair"
  | "hdmi-repair";

export type ServiceData = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /** Existing canonical repair page when applicable */
  canonicalPath?: string;
  image: string;
  imageAlt: string;
  serviceType: string;
  keywords: string[];
  capabilities: string[];
  relatedServiceSlugs: ServiceSlug[];
  relatedRepairPaths: string[];
  /** Quick AEO-style answers */
  turnaround: string;
  mailInFriendly: boolean;
};

export const SERVICES: Record<ServiceSlug, ServiceData> = {
  "iphone-repair": {
    slug: "iphone-repair",
    name: "iPhone Repair",
    shortName: "iPhone",
    canonicalPath: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt: "iPhone repair — screens, batteries, and board-level fixes",
    serviceType: "iPhone Repair",
    keywords: ["iPhone repair", "iPhone screen", "iPhone battery", "Apple phone repair"],
    capabilities: [
      "Cracked screen and display replacement",
      "Battery and power management faults",
      "Charging port and Lightning/USB-C repair",
      "Camera, speaker, and Face ID issues",
      "Board-level charging and no-power diagnostics",
      "Data preservation when storage is at risk",
    ],
    relatedServiceSlugs: ["charging-port-repair", "liquid-damage-repair", "data-recovery", "board-repair"],
    relatedRepairPaths: ["/phone-repair", "/board-repair", "/data-recovery"],
    turnaround: "Many iPhone screen and battery jobs complete within one business day when parts are in stock.",
    mailInFriendly: true,
  },
  "ps5-hdmi-repair": {
    slug: "ps5-hdmi-repair",
    name: "PS5 HDMI Repair",
    shortName: "PS5 HDMI",
    canonicalPath: "/console-repair",
    image: "/images/gameconsolerepair2.png",
    imageAlt: "PS5 HDMI port repair and console video output restoration",
    serviceType: "PlayStation 5 HDMI Repair",
    keywords: ["PS5 HDMI repair", "PS5 no video", "PlayStation 5 HDMI port", "PS5 display repair"],
    capabilities: [
      "HDMI port replacement and rework",
      "No video and blank screen diagnostics",
      "Power rail and short testing",
      "Overheating and thermal assessment",
      "USB and rear I/O port repair",
      "Post-repair video and stability verification",
    ],
    relatedServiceSlugs: ["hdmi-repair", "xbox-repair", "board-repair", "microsoldering"],
    relatedRepairPaths: ["/console-repair", "/board-repair"],
    turnaround: "PS5 HDMI repairs typically take 3–7 business days depending on port condition and board health.",
    mailInFriendly: true,
  },
  "xbox-repair": {
    slug: "xbox-repair",
    name: "Xbox Repair",
    shortName: "Xbox",
    canonicalPath: "/console-repair",
    image: "/images/gameconsolerepair2.png",
    imageAlt: "Xbox console repair — HDMI, power, and overheating",
    serviceType: "Xbox Console Repair",
    keywords: ["Xbox repair", "Xbox HDMI", "Xbox Series X repair", "Xbox no power"],
    capabilities: [
      "HDMI and display output repair",
      "No power and boot loop diagnostics",
      "Overheating and fan service",
      "Disc drive and USB port issues",
      "Internal power supply faults",
      "Board-level connector and trace repair",
    ],
    relatedServiceSlugs: ["ps5-hdmi-repair", "hdmi-repair", "board-repair"],
    relatedRepairPaths: ["/console-repair", "/board-repair"],
    turnaround: "Most Xbox HDMI and power faults are evaluated within 48 hours; repair time follows diagnostics.",
    mailInFriendly: true,
  },
  "computer-repair": {
    slug: "computer-repair",
    name: "Computer Repair",
    shortName: "Computer",
    canonicalPath: "/computer-repair",
    image: "/images/computerrepair.png",
    imageAlt: "Computer and laptop repair — hardware, SSD, and diagnostics",
    serviceType: "Computer Repair",
    keywords: ["computer repair", "laptop repair", "PC repair", "Mac repair Kansas"],
    capabilities: [
      "Laptop and desktop hardware repair",
      "SSD and storage upgrades",
      "Virus removal and OS troubleshooting",
      "No boot and blue screen diagnostics",
      "Motherboard and power rail repair",
      "Data recovery coordination",
    ],
    relatedServiceSlugs: ["data-recovery", "board-repair", "microsoldering"],
    relatedRepairPaths: ["/computer-repair", "/data-recovery", "/board-repair"],
    turnaround: "Common computer repairs often finish same-day or next business day when parts are available.",
    mailInFriendly: true,
  },
  "data-recovery": {
    slug: "data-recovery",
    name: "Data Recovery",
    shortName: "Data Recovery",
    canonicalPath: "/data-recovery",
    image: "/images/datarecovery2.png",
    imageAlt: "Data recovery for phones, drives, and failed storage",
    serviceType: "Data Recovery",
    keywords: ["data recovery", "phone data recovery", "hard drive recovery", "SSD recovery"],
    capabilities: [
      "Phones and tablets that will not boot",
      "SSD, HDD, and NVMe drive recovery",
      "Water-damaged device assessment",
      "USB flash and external enclosure recovery",
      "Board-level access when power-on fails",
      "Clear status updates through the process",
    ],
    relatedServiceSlugs: ["liquid-damage-repair", "iphone-repair", "computer-repair", "board-repair"],
    relatedRepairPaths: ["/data-recovery", "/phone-repair", "/computer-repair"],
    turnaround: "Data recovery timelines vary by media health—many cases receive an initial assessment within 2–3 business days.",
    mailInFriendly: true,
  },
  microsoldering: {
    slug: "microsoldering",
    name: "Microsoldering",
    shortName: "Microsoldering",
    canonicalPath: "/board-repair",
    image: "/images/boardrepair.png",
    imageAlt: "Microsoldering and precision board repair",
    serviceType: "Microsoldering",
    keywords: ["microsoldering", "board repair", "trace repair", "component level repair"],
    capabilities: [
      "Fine-pitch connector and port rework",
      "Trace and pad reconstruction",
      "Charging IC and PMIC repair",
      "Short detection and rail isolation",
      "Reflow on dense assemblies",
      "Microscope verification after rework",
    ],
    relatedServiceSlugs: ["board-repair", "charging-port-repair", "hdmi-repair", "liquid-damage-repair"],
    relatedRepairPaths: ["/board-repair", "/training"],
    turnaround: "Microsoldering jobs are quoted after bench diagnostics—typically 5–10 business days for complex boards.",
    mailInFriendly: true,
  },
  "board-repair": {
    slug: "board-repair",
    name: "Board Repair",
    shortName: "Board Repair",
    canonicalPath: "/board-repair",
    image: "/images/motherboardrepair2.png",
    imageAlt: "Board-level repair for phones, consoles, and computers",
    serviceType: "Board-Level Repair",
    keywords: ["board repair", "logic board repair", "motherboard repair", "no power repair"],
    capabilities: [
      "Logic board and motherboard diagnostics",
      "Charging and power management faults",
      "HDMI and high-speed port repair",
      "Liquid damage and corrosion treatment",
      "Connector and flex damage",
      "Component-level replacement",
    ],
    relatedServiceSlugs: ["microsoldering", "hdmi-repair", "charging-port-repair", "liquid-damage-repair"],
    relatedRepairPaths: ["/board-repair", "/phone-repair", "/console-repair"],
    turnaround: "Board repair starts with evaluation—many quotes are ready within 1–2 business days of receipt.",
    mailInFriendly: true,
  },
  "liquid-damage-repair": {
    slug: "liquid-damage-repair",
    name: "Liquid Damage Repair",
    shortName: "Liquid Damage",
    canonicalPath: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt: "Liquid damage repair for phones and electronics",
    serviceType: "Liquid Damage Repair",
    keywords: ["liquid damage repair", "water damaged phone", "corrosion repair", "phone water damage"],
    capabilities: [
      "Ultrasonic and corrosion treatment",
      "Power rail and short isolation",
      "Component replacement after exposure",
      "Data recovery when storage is intact",
      "Honest feasibility assessment",
      "Preventive cleaning on borderline cases",
    ],
    relatedServiceSlugs: ["data-recovery", "iphone-repair", "board-repair", "microsoldering"],
    relatedRepairPaths: ["/phone-repair", "/data-recovery", "/board-repair"],
    turnaround: "Liquid damage cases need prompt evaluation—contact us quickly; mail-in within 24–48 hours is ideal.",
    mailInFriendly: true,
  },
  "charging-port-repair": {
    slug: "charging-port-repair",
    name: "Charging Port Repair",
    shortName: "Charging Port",
    canonicalPath: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt: "Charging port repair and microsoldering",
    serviceType: "Charging Port Repair",
    keywords: ["charging port repair", "phone not charging", "USB-C port repair", "Lightning port repair"],
    capabilities: [
      "Loose or broken charging ports",
      "USB-C and Lightning port replacement",
      "Board-level charging IC repair",
      "Cable detection and fast-charge faults",
      "Pad and trace damage from wear",
      "Post-repair charge cycle testing",
    ],
    relatedServiceSlugs: ["iphone-repair", "microsoldering", "board-repair"],
    relatedRepairPaths: ["/phone-repair", "/board-repair"],
    turnaround: "Charging port repairs often complete in 1–3 business days; board-level cases may take longer.",
    mailInFriendly: true,
  },
  "hdmi-repair": {
    slug: "hdmi-repair",
    name: "HDMI Repair",
    shortName: "HDMI",
    canonicalPath: "/console-repair",
    image: "/images/gameconsolerepair2.png",
    imageAlt: "HDMI port repair for consoles and devices",
    serviceType: "HDMI Port Repair",
    keywords: ["HDMI repair", "HDMI port replacement", "console HDMI", "no video repair"],
    capabilities: [
      "HDMI port replacement on consoles",
      "No signal and flickering output",
      "Pad and trace damage at the port",
      "PS5, Xbox, and Switch HDMI service",
      "Computer and dock HDMI when applicable",
      "Signal verification after rework",
    ],
    relatedServiceSlugs: ["ps5-hdmi-repair", "xbox-repair", "board-repair", "microsoldering"],
    relatedRepairPaths: ["/console-repair", "/board-repair"],
    turnaround: "HDMI port repairs usually take 3–7 business days including bench testing.",
    mailInFriendly: true,
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES) as ServiceSlug[];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES[slug as ServiceSlug];
}

export function getServiceOrThrow(slug: string): ServiceData {
  const service = getService(slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
