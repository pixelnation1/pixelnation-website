export const BOARD_REPAIR_METADATA = {
  title: "Board Repair & Microsoldering in Emporia, KS | PixelNation",
  description:
    "Advanced board repair and microsoldering in Emporia, KS for phones, consoles, computers, and electronics. Charging ports, HDMI ports, no power issues, liquid damage, and component-level repair.",
  path: "/board-repair",
  canonical: "https://www.pixelnation.co/board-repair",
} as const;

export const HERO_BULLETS = [
  "Charging port replacement",
  "HDMI port replacement",
  "No power diagnostics",
  "Short circuit troubleshooting",
  "Trace and pad repair",
  "Connector replacement",
  "Liquid damage recovery",
  "Component-level board repair",
] as const;

export const BOARD_REPAIR_SERVICES = [
  {
    title: "Charging Port Microsoldering",
    description:
      "USB-C, Lightning, and proprietary charging ports soldered directly to the logic board.",
    keyword: "Charging Port Microsoldering",
  },
  {
    title: "HDMI Port Microsoldering",
    description:
      "Console and device HDMI ports replaced with fine-pitch soldering for reliable video output.",
    keyword: "HDMI Port Microsoldering",
  },
  {
    title: "Connector Replacement",
    description:
      "Damaged flex connectors, FPC sockets, and board-to-board connectors restored or replaced.",
    keyword: "Circuit Board Repair",
  },
  {
    title: "Trace and Pad Repair",
    description:
      "Broken traces, lifted pads, and damaged landing zones rebuilt for stable connections.",
    keyword: "Component Level Repair",
  },
  {
    title: "Short Circuit Diagnosis",
    description:
      "Systematic testing to locate shorts on power rails and data lines before rework.",
    keyword: "No Power Board Repair",
  },
  {
    title: "Liquid Damage Board Repair",
    description:
      "Corrosion treatment, ultrasonic cleaning, and component replacement after liquid exposure.",
    keyword: "Liquid Damage Board Repair",
  },
  {
    title: "Power Rail Troubleshooting",
    description:
      "PMIC, charging IC, and voltage regulator faults that prevent boot or charge.",
    keyword: "No Power Board Repair",
  },
  {
    title: "Component Replacement",
    description:
      "Failed capacitors, filters, MOSFETs, and small ICs removed and replaced under microscope.",
    keyword: "Component Level Repair",
  },
  {
    title: "Logic Board Repair",
    description:
      "Phone and tablet logic boards diagnosed and repaired at the circuit level.",
    keyword: "Logic Board Repair",
  },
  {
    title: "Motherboard Repair",
    description:
      "Laptop and desktop motherboard faults beyond simple swap-and-replace repairs.",
    keyword: "Motherboard Repair Emporia KS",
  },
] as const;

export const DEVICES_WE_REPAIR = [
  {
    title: "iPhones",
    description: "Logic board, charging, and connector faults on Apple phones.",
    keyword: "Board Repair Emporia KS",
  },
  {
    title: "Android phones",
    description: "Power, charging, and board-level faults on Android devices.",
    keyword: "Microsoldering Emporia KS",
  },
  {
    title: "iPads and tablets",
    description: "Tablet logic boards, charging ports, and display-related power issues.",
    keyword: "Logic Board Repair",
  },
  {
    title: "Game consoles",
    description: "PS5, Xbox, Switch, Steam Deck HDMI, power, and motherboard work.",
    keyword: "Console motherboard repair",
  },
  {
    title: "Laptops",
    description: "Charging circuits, no power, and motherboard-level laptop faults.",
    keyword: "Motherboard Repair Emporia KS",
  },
  {
    title: "Desktop motherboards",
    description: "Desktop board diagnostics when swap-only repair is not enough.",
    keyword: "Motherboard Repair",
  },
  {
    title: "Gaming PCs",
    description: "Power delivery, shorts, and connector issues on custom builds.",
    keyword: "Circuit Board Repair",
  },
  {
    title: "Small electronics",
    description: "Handheld devices and specialty electronics with board faults.",
    keyword: "Component Level Repair",
  },
  {
    title: "Appliance control boards",
    description: "Control board evaluation when applicable—contact us with your model.",
    keyword: "Board diagnostics",
  },
] as const;

export const COMMON_BOARD_PROBLEMS = [
  "Device will not power on",
  "Device will not charge",
  "HDMI port ripped off",
  "USB-C port damage",
  "Liquid damage",
  "Shorted components",
  "Broken connectors",
  "Torn pads",
  "Damaged traces",
  "No display issues",
  "Intermittent power problems",
  "Failed charging circuits",
] as const;

export const MICROSOLDERING_CAPABILITIES = [
  "Fine-pitch connector work",
  "HDMI and USB-C port replacement",
  "Under-microscope soldering",
  "Jumper wire repair",
  "Pad restoration",
  "Component removal and replacement",
  "Board cleaning and inspection",
] as const;

export const SERVICE_PROCESS = [
  {
    title: "Tell us what happened",
    text: "Describe symptoms, recent damage, and what the device was doing before it failed.",
  },
  {
    title: "Board inspection",
    text: "We inspect and diagnose the board under magnification and structured test procedures.",
  },
  {
    title: "Repair assessment",
    text: "We identify whether board-level repair is realistic for your device and explain options.",
  },
  {
    title: "Your approval",
    text: "You approve the work and pricing before microsoldering or component replacement begins.",
  },
  {
    title: "Repair and testing",
    text: "We complete the agreed repair and test power, charging, display, or data paths as applicable.",
  },
] as const;

export const BOARD_REPAIR_FAQ = [
  {
    question: "What is board-level repair?",
    answer:
      "Board-level repair means diagnosing and fixing faults on the circuit board itself—connectors, traces, pads, shorts, and failed components—rather than only swapping external parts.",
  },
  {
    question: "Do you repair HDMI ports?",
    answer:
      "Yes. PixelNation performs HDMI port microsoldering for game consoles and other devices with damaged or missing HDMI connectors.",
  },
  {
    question: "Do you repair charging ports?",
    answer:
      "Yes. We replace and microsolder charging ports on phones, tablets, laptops, and other devices when the port or surrounding pads are damaged.",
  },
  {
    question: "Can you fix liquid damage?",
    answer:
      "Sometimes. Success depends on corrosion depth and which components were affected. We evaluate liquid-damaged boards honestly before recommending repair or recovery paths.",
  },
  {
    question: "Can you repair devices with no power?",
    answer:
      "Often we can diagnose no-power faults. Causes may include charging circuits, shorts, PMIC issues, or connector damage—board-level work may restore function when parts alone do not.",
  },
  {
    question: "Do you repair laptop motherboards?",
    answer:
      "Yes, when the fault is within scope of board-level diagnostics and microsoldering. We assess laptop motherboards individually and explain realistic outcomes.",
  },
  {
    question: "Do you repair console motherboards?",
    answer:
      "Yes. PixelNation repairs console HDMI ports, power faults, and other motherboard-level issues on PlayStation, Xbox, Nintendo, Steam Deck, and related systems.",
  },
  {
    question: "Is board repair always possible?",
    answer:
      "No. Severe layer damage, extensive corrosion, or catastrophic shorts may make repair impractical. We communicate clearly after diagnosis—we do not guarantee every board can be repaired.",
  },
] as const;

export const BOARD_REPAIR_PRICING_INTRO = {
  lead: "Advanced board-level repair pricing starts at $99.",
  detail:
    "Final pricing depends on the device type, fault complexity, required parts, and the amount of board-level work involved. A detailed quote is provided after diagnostics.",
} as const;

export const BOARD_REPAIR_PRICING = [
  { title: "Charging Port Microsoldering", price: "$99", keyword: "Charging Port Repair" },
  { title: "Connector Replacement", price: "$99", keyword: "Board Repair Emporia KS" },
  { title: "HDMI Port Repair", price: "$149", keyword: "HDMI Port Repair" },
  { title: "Trace & Pad Repair", price: "$149", keyword: "Microsoldering Emporia KS" },
  { title: "Short Circuit Diagnostics", price: "$149", keyword: "Board Repair Emporia KS" },
  { title: "Water Damage Board Repair", price: "$149", keyword: "Microsoldering Emporia KS" },
  { title: "Advanced Data Recovery", price: "$299", keyword: "Data Recovery" },
] as const;

export const BOARD_REPAIR_PRICING_NOTE =
  "Every board repair is different. These prices are starting points and may vary depending on the device, damage, and parts required.";

export const WHEN_BOARD_REPAIR_MAKES_SENSE = [
  "Device powers on but does not function correctly",
  "Charging ports or connectors are damaged",
  "HDMI ports are broken",
  "Liquid damage has affected the motherboard",
  "Data must be recovered from a failed device",
  "Replacing the entire board is not practical",
] as const;

export const AEO_ANSWERS = [
  {
    question: "What is board-level repair?",
    answer:
      "Board-level repair is the process of diagnosing and repairing faults directly on a circuit board, including damaged connectors, failed components, broken traces, torn pads, and power issues.",
  },
  {
    question: "Does PixelNation offer microsoldering in Emporia, Kansas?",
    answer:
      "Yes. PixelNation provides microsoldering and board-level repair services in Emporia, Kansas for phones, computers, consoles, and other electronics.",
  },
  {
    question: "Can a device with no power be repaired?",
    answer:
      "Sometimes. No-power issues may be caused by damaged ports, short circuits, failed components, or power rail faults that can be diagnosed at the board level.",
  },
] as const;
