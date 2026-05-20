export const TRAINING_METADATA = {
  title:
    "Microsoldering & Board Repair Training | Hands-On Repair Courses | PixelNation",
  description:
    "Hands-on microsoldering and board repair training from PixelNation. Learn diagnostics, component-level repair, charging ports, HDMI ports, trace repair, and real-world repair workflows.",
  path: "/training",
  canonical: "https://www.pixelnation.co/training",
} as const;

export const HERO_BULLETS = [
  "Charging port replacement",
  "HDMI port replacement",
  "Trace and pad repair",
  "Short circuit diagnostics",
  "Liquid damage recovery",
  "Real-world troubleshooting",
  "One-on-one and small group instruction",
  "Beginner to advanced training",
] as const;

export const WHY_TRAIN_BENEFITS = [
  "Hands-on practical instruction",
  "Real devices and real fault scenarios",
  "Structured diagnostics methodology",
  "Small class sizes (maximum 4 students)",
  "Personalized guidance",
  "Business and workflow insights",
] as const;

export const COURSE_TOPICS = [
  {
    title: "Microsoldering Fundamentals",
    description:
      "Heat control, flux usage, tip selection, and safe rework on surface-mount assemblies.",
    keyword: "Microsoldering Training",
  },
  {
    title: "Board-Level Diagnostics",
    description:
      "Multimeter use, fault isolation, and systematic troubleshooting on real boards.",
    keyword: "Electronics Diagnostics Training",
  },
  {
    title: "Charging Port Repair",
    description:
      "USB-C, Lightning, and console charging port replacement with pad-safe technique.",
    keyword: "iPhone Repair Training",
  },
  {
    title: "HDMI Port Repair",
    description:
      "Console-focused HDMI port replacement and video output restoration.",
    keyword: "Board Repair Courses",
  },
  {
    title: "Trace and Pad Repair",
    description:
      "Pad restoration, jumper work, and trace reconstruction fundamentals.",
    keyword: "Component Level Repair Training",
  },
  {
    title: "Liquid Damage Recovery",
    description:
      "Corrosion assessment, cleaning concepts, and when board work is realistic.",
    keyword: "Logic Board Repair Training",
  },
  {
    title: "Power Rail Troubleshooting",
    description:
      "Identifying shorts, failed PMIC paths, and no-power failure patterns.",
    keyword: "Board Repair Training",
  },
  {
    title: "Component Identification",
    description:
      "Reading board layouts, common ICs, filters, and connectors under magnification.",
    keyword: "Electronics Repair Training",
  },
  {
    title: "Tool Selection and Setup",
    description:
      "Workstation organization, microscope setup, and professional bench layout.",
    keyword: "Hands-On Repair Training",
  },
  {
    title: "Real-World Repair Workflow",
    description:
      "From intake to test—guided scenarios that mirror customer repairs.",
    keyword: "Microsoldering Classes Kansas",
  },
] as const;

export const WHO_IS_FOR = [
  {
    title: "Repair shop owners",
    text: "Expand service offerings with board-level repairs customers expect from advanced shops.",
  },
  {
    title: "New technicians",
    text: "Build foundational microsoldering skills with structured, guided practice.",
  },
  {
    title: "Experienced technicians",
    text: "Level up from part swaps to connector rework, diagnostics, and confidence under a microscope.",
  },
  {
    title: "Hobbyists",
    text: "Learn structured hands-on skills without lecture-only theory.",
  },
  {
    title: "Entrepreneurs",
    text: "Enter the repair industry with practical bench skills and workflow insight.",
  },
  {
    title: "Electronics enthusiasts",
    text: "Understand how modern devices fail and how professional repairs are performed.",
  },
] as const;

export const SKILL_LEVELS = [
  {
    level: "Beginner",
    description:
      "Learn microscope setup, soldering basics, through-hole and surface-mount practice, and safe board handling. No prior microsoldering experience required.",
  },
  {
    level: "Intermediate",
    description:
      "Connector replacement, HDMI and charging port repair, pad fundamentals, and guided component removal and installation.",
  },
  {
    level: "Advanced",
    description:
      "Short circuit diagnosis, multimeter-based fault isolation, power rail concepts, and complex board failures—available through private training and future advanced workshops.",
  },
] as const;

export const STUDENT_LEARNING = [
  "Proper microscope use",
  "Soldering and desoldering techniques",
  "Flux and tool selection",
  "Connector and port replacement",
  "Trace and pad reconstruction",
  "Reading schematics and board views",
  "Multimeter and thermal diagnostics",
  "Identifying common failure patterns",
  "Structured troubleshooting",
] as const;

export const COURSE_OBJECTIVES = [
  "Understand proper soldering and rework techniques",
  "Perform HDMI and charging port replacements",
  "Use a multimeter for diagnostics and fault isolation",
  "Identify common failure points on consoles and consumer electronics",
  "Develop confidence working under a microscope",
] as const;

export const WORKSHOP_CURRICULUM = [
  {
    day: "Day 1 — Fundamentals",
    topics: [
      "Tool setup and workstation organization",
      "Soldering fundamentals: heat control, flux, and tip selection",
      "Through-hole and surface-mount practice",
      "Introduction to microscopes and magnification",
    ],
  },
  {
    day: "Day 2 — Core Repairs",
    topics: [
      "HDMI port replacement (console-focused)",
      "Charging port repair",
      "Pad repair fundamentals",
      "Safe component removal and installation",
    ],
  },
  {
    day: "Day 3 — Diagnostics & Real-World Application",
    topics: [
      "Diagnostics using a multimeter",
      "Identifying shorts and common board failures",
      "Guided real repair scenarios",
      "Troubleshooting and repair workflow",
    ],
  },
] as const;

export const TRAINING_FORMATS = [
  {
    title: "One-on-one private training",
    description:
      "Personalized instruction tailored to your skill level and repair goals.",
  },
  {
    title: "Small group classes",
    description:
      "Hands-on workshop with a maximum of 4 students for individual workstation time.",
  },
  {
    title: "Custom shop training",
    description:
      "Training designed for your team’s devices, tools, and service mix.",
  },
  {
    title: "Specialized workshops",
    description:
      "Focused sessions on specific topics—contact us for availability.",
  },
] as const;

export const TOOLS_EQUIPMENT = [
  "Microscopes",
  "Hot air stations",
  "Soldering irons",
  "Multimeters",
  "Power supplies",
  "Thermal cameras",
  "Precision hand tools",
] as const;

export const WHATS_PROVIDED = [
  "Access to professional repair equipment during training",
  "Practice boards and repair materials",
  "Guided instruction and troubleshooting support",
  "Individual workstation in small-group workshops",
] as const;

export const TRAINING_FAQ = [
  {
    question: "Do I need prior experience?",
    answer:
      "No prior microsoldering experience is required for the foundational workshop. Basic familiarity with electronics or repair tools is helpful but not necessary.",
  },
  {
    question: "Is the training hands-on?",
    answer:
      "Yes. This is not a lecture-based course. The majority of time is spent performing actual repairs and practice work under guided instruction on real devices and boards.",
  },
  {
    question: "What tools will I use?",
    answer:
      "Students use professional microscopes, soldering irons, hot air stations, multimeters, power supplies, thermal tools, and precision hand tools provided during training.",
  },
  {
    question: "Can experienced technicians attend?",
    answer:
      "Yes. Experienced technicians attend to expand into board-level repair, improve rework quality, and strengthen diagnostics workflow.",
  },
  {
    question: "Do you offer private training?",
    answer:
      "Yes. PixelNation offers one-on-one private training and custom shop training in addition to scheduled small-group workshops.",
  },
  {
    question: "What devices are covered?",
    answer:
      "Training focuses on skills applied to phones, game consoles, computers, and consumer electronics—with console HDMI and charging port work featured in the core curriculum.",
  },
  {
    question: "How do I book training?",
    answer:
      "Reserve your seat through the PixelNation shop or contact us for private training, custom schedules, and course availability in Emporia, Kansas.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "What does PixelNation teach in its microsoldering training?",
    answer:
      "PixelNation teaches hands-on microsoldering, board-level diagnostics, charging port repair, HDMI repair, trace repair, and real-world troubleshooting.",
  },
  {
    question: "Who is this training designed for?",
    answer:
      "The training is designed for repair shop owners, technicians, entrepreneurs, and electronics enthusiasts.",
  },
  {
    question: "Do students get hands-on practice?",
    answer:
      "Yes. Training is hands-on and includes practical work on real circuit boards and repair scenarios.",
  },
] as const;
