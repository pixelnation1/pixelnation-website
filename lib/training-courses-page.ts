export const TRAINING_COURSES_METADATA = {
  title: "Microsoldering Training Courses & Pricing | PixelNation",
  description:
    "Explore PixelNation microsoldering and board repair training courses, pricing, and hands-on instruction options. Learn advanced diagnostics and real-world repair skills.",
  path: "/training-courses",
  canonical: "https://www.pixelnation.co/training-courses",
} as const;

export type TrainingCourse = {
  id: string;
  name: string;
  track: string;
  skillLevel: string;
  duration: string;
  price: number;
  priceDisplay: string;
  priceNote?: string;
  badge?: string;
  featured?: boolean;
  restricted?: boolean;
  audience: string;
  summary: string;
  learn: readonly string[];
  handsOn?: readonly string[];
  comparison: {
    topicsCovered: string;
    handsOnPractice: string;
    recommendedExperience: string;
  };
};

export const REPAIR_TRACK_COURSES: readonly TrainingCourse[] = [
  {
    id: "fundamentals-ports-connectors",
    name: "Fundamentals – Ports & Connectors",
    track: "Repair Track",
    skillLevel: "Beginner",
    duration: "3 days",
    price: 499,
    priceDisplay: "$499",
    priceNote: "Introductory pricing per student",
    badge: "Introductory Pricing",
    featured: true,
    audience:
      "Beginners and repair technicians entering board-level work who want the most common, profitable repairs seen in real shops.",
    summary:
      "Structured 3-day hands-on training focused on foundational microsoldering through guided practice—emphasizing consistency, proper technique, and confidence on real repair scenarios.",
    learn: [
      "Charging port replacement",
      "HDMI port repair (console-focused)",
      "FPC connector replacement",
      "Pad repair and recovery techniques",
      "Heat control and precision soldering fundamentals",
    ],
    comparison: {
      topicsCovered: "Ports, connectors, pads, soldering fundamentals",
      handsOnPractice: "Full workshop — guided repairs",
      recommendedExperience: "None required; helpful if familiar with basic tools",
    },
  },
  {
    id: "practical-board-repair",
    name: "Practical Board Repair",
    track: "Repair Track",
    skillLevel: "Advanced",
    duration: "5 days",
    price: 1200,
    priceDisplay: "$1,200",
    priceNote: "Per student",
    audience:
      "Students ready to move beyond ports and connectors into board-level diagnostics and more advanced fault isolation.",
    summary:
      "Intensive 5-day course developing real diagnostic thinking—multimeter work, shorts, power issues, schematics introduction, and complex hands-on board scenarios.",
    learn: [
      "Effective multimeter use for diagnostics",
      "Identifying and isolating short circuits",
      "Troubleshooting power and charging issues",
      "Board components and circuit behavior",
      "Introduction to schematics and board-level logic",
      "Advanced tools including DC power supplies",
    ],
    handsOn: [
      "Water damage recovery",
      "IC replacement",
      "Jumper wire and trace repair",
      "Complex fault troubleshooting",
    ],
    comparison: {
      topicsCovered: "Diagnostics, shorts, power, schematics, advanced rework",
      handsOnPractice: "Water damage, IC, trace, complex faults",
      recommendedExperience: "Ports/connectors experience or prior bench work",
    },
  },
] as const;

export const INVESTIGATOR_TRACK_COURSES: readonly TrainingCourse[] = [
  {
    id: "investigator-level-1",
    name: "Level 1 – Device Disassembly & Microsoldering Fundamentals",
    track: "Investigator Track",
    skillLevel: "Professional",
    duration: "5 days",
    price: 1500,
    priceDisplay: "$1,500",
    priceNote: "Per student",
    restricted: true,
    audience:
      "Law enforcement, government agencies, military intelligence, and corporate investigators who require advanced device handling skills.",
    summary:
      "Foundational training in safe device handling and microsoldering with emphasis on preserving device integrity during repair and recovery workflows.",
    learn: [
      "Safe disassembly and reassembly procedures",
      "Port and connector replacement",
      "Foundational microsoldering techniques",
      "Handling torn pads, misalignment, and common challenges",
      "Best practices for maintaining device condition",
    ],
    comparison: {
      topicsCovered: "Disassembly, ports, foundational microsoldering, integrity",
      handsOnPractice: "Guided device-handling scenarios",
      recommendedExperience: "Professional investigator or agency role",
    },
  },
  {
    id: "investigator-level-2",
    name: "Level 2 – Board-Level Diagnostics",
    track: "Investigator Track",
    skillLevel: "Professional",
    duration: "5 days",
    price: 1800,
    priceDisplay: "$1,800",
    priceNote: "Per student",
    restricted: true,
    audience:
      "Investigators who completed Level 1 or equivalent experience and need structured board-level diagnostic capability.",
    summary:
      "Builds on foundational skills with focus on diagnosing and resolving complex board-level issues using structured troubleshooting and power/data circuit analysis.",
    learn: [
      "Advanced multimeter usage",
      "Faults in power and data circuits",
      "Structured troubleshooting methods",
      "Schematics and board-level analysis introduction",
      "DC power supplies for device evaluation",
    ],
    handsOn: ["Real-world fault scenarios and guided repair work"],
    comparison: {
      topicsCovered: "Diagnostics, power/data circuits, schematics, evaluation",
      handsOnPractice: "Real fault scenarios",
      recommendedExperience: "Level 1 or approved equivalent",
    },
  },
  {
    id: "investigator-level-3",
    name: "Level 3 – Advanced Board Work & Component Recovery",
    track: "Investigator Track",
    skillLevel: "Expert",
    duration: "5 days",
    price: 2200,
    priceDisplay: "$2,200",
    priceNote: "Per student",
    restricted: true,
    audience:
      "Experienced professionals ready for complex board-level repairs, precision component work, and advanced recovery scenarios.",
    summary:
      "Advanced course for complex board repairs and component-level recovery—non-standard layouts, precision removal/replacement, and high-stakes troubleshooting workflows.",
    learn: [
      "Advanced troubleshooting workflows",
      "Non-standard board layouts",
      "Precision component removal and replacement",
      "Advanced soldering techniques",
      "Complex repair and recovery scenarios",
    ],
    comparison: {
      topicsCovered: "Advanced recovery, components, complex boards",
      handsOnPractice: "Complex guided scenarios",
      recommendedExperience: "Level 2 or significant board-level background",
    },
  },
] as const;

export const ALL_COURSES = [
  ...REPAIR_TRACK_COURSES,
  ...INVESTIGATOR_TRACK_COURSES,
] as const;

export const TRAINING_FORMAT_NOTES = [
  "Small group instruction (maximum 4 students)",
  "Hands-on, guided repair work",
  "Individual workstation provided",
  "Real devices and boards used for training",
] as const;

export const PAYMENT_POLICY = {
  payment:
    "Payment is required in full at the time of registration. Tuition includes training only unless otherwise specified.",
  government:
    "Government agencies: please call to arrange payment via check or money order.",
  cancellation:
    "One-week grace period for a full refund when the course date is more than 4 weeks away. After the grace period, cancellations may be refunded only if the seat can be filled; a $100 cancellation fee may apply. Rescheduling may be available based on availability if you cannot attend due to unforeseen circumstances.",
  afterRegistration:
    "After registering, you receive a confirmation email with schedule, location, and preparation information.",
} as const;

export const WHAT_STUDENTS_LEARN = [
  "Microsoldering fundamentals",
  "Board-level diagnostics",
  "Charging port replacement",
  "HDMI port repair",
  "Trace and pad repair",
  "Short circuit diagnosis",
  "Liquid damage recovery",
  "Component identification",
  "Tool setup and selection",
  "Real-world troubleshooting",
] as const;

export const WHO_SHOULD_ENROLL = [
  "Repair shop owners",
  "Technicians",
  "Beginners",
  "Entrepreneurs",
  "Electronics hobbyists",
  "Advanced technicians",
] as const;

export const COURSES_FAQ = [
  {
    question: "What experience level is required?",
    answer:
      "The Fundamentals course requires no prior microsoldering experience. Practical Board Repair and investigator levels expect prior skills as described on each course card. Contact us if you are unsure which course fits.",
  },
  {
    question: "Are the courses hands-on?",
    answer:
      "Yes. All courses focus on active participation, guided repair work, and real-world scenarios—not lecture-only instruction.",
  },
  {
    question: "What tools are used?",
    answer:
      "Students train with professional microscopes, soldering irons, hot air stations, multimeters, DC power supplies, thermal tools, and precision hand tools provided at individual workstations.",
  },
  {
    question: "Can I book private training?",
    answer:
      "Yes. PixelNation offers one-on-one instruction and customized courses for businesses and organizations. Contact us to discuss goals and scheduling.",
  },
  {
    question: "What is included in the course fee?",
    answer:
      "Tuition covers hands-on training, guided instruction, access to professional equipment during class, and practice boards/materials as specified. Payment is due in full at registration unless arranged otherwise for government agencies.",
  },
  {
    question: "How do I reserve my spot?",
    answer:
      "Reserve through the PixelNation shop or contact us at 620-591-0083 or support@pixelnation.co. Seats are limited to ensure individual instruction.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "How much does PixelNation microsoldering training cost?",
    answer:
      "PixelNation offers multiple hands-on training courses with pricing based on course length, skill level, and customization options.",
  },
  {
    question: "What is included in the training courses?",
    answer:
      "Courses include hands-on practice, diagnostics instruction, microsoldering techniques, and real-world repair workflows.",
  },
  {
    question: "Can I book private training?",
    answer:
      "Yes. PixelNation offers one-on-one and customized private training options.",
  },
] as const;
