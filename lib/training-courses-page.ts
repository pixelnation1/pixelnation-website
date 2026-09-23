import { SITE } from "@/lib/site";

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
  /** Optional public schedule; omit on Investigator Track courses. */
  schedule?: string;
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
    id: "practical-board-repair-intensive",
    name: "Practical Board Repair Intensive",
    track: "Repair Track",
    skillLevel: "Beginner to Intermediate",
    duration: "3 Days / 15 Hours",
    schedule: "Friday–Sunday, 10:00 AM–3:00 PM",
    price: 1500,
    priceDisplay: "$1,500",
    priceNote: "Per student",
    featured: true,
    audience:
      "Beginners and working technicians who want a single intensive covering the most common shop repairs—ports and connectors—plus practical board-level diagnostics.",
    summary:
      "An intensive 3-day hands-on board repair course that takes students from microsoldering fundamentals into practical board-level diagnostics and component-level repair.\n\nStudents work with professional repair equipment and practice boards while learning techniques and diagnostic processes used in real electronics repair environments.\n\nThe focus is not simply learning how to replace individual components. Students learn how to approach a failed device systematically, use diagnostic tools correctly, identify faults, perform board-level repairs, and recover from common microsoldering mistakes.",
    learn: [
      "Microsoldering fundamentals and proper heat control",
      "Charging port replacement",
      "Game console HDMI port replacement",
      "FPC and board connector replacement",
      "Pad repair and recovery",
      "Jumper wire and trace repair",
      "Component removal and replacement",
      "Proper multimeter use for board diagnostics",
      "Continuity, resistance, and diode-mode testing",
      "Identifying and isolating short circuits",
      "Troubleshooting power and charging problems",
      "Understanding common board components and circuit behavior",
      "Using DC power supplies for diagnostics",
      "Introduction to schematics and boardviews",
      "Understanding power rails and board-level logic",
      "Liquid-damage inspection and diagnostic techniques",
      "IC removal and replacement",
      "Systematic fault isolation",
      "Real-world board troubleshooting",
    ],
    comparison: {
      topicsCovered: "Ports, connectors, pads, diagnostics, shorts, power, schematics",
      handsOnPractice: "Ports, water damage, IC, trace, complex faults",
      recommendedExperience: "None required; helpful if familiar with basic tools",
    },
  },
] as const;

/** Repair Track / Practical Board Repair Intensive only. Not used by Investigator Track. */
export const PRACTICAL_BOARD_REPAIR_INTENSIVE_BOOKING = {
  url: "https://app.squareup.com/appointments/book/classes/ylpswjtvdqub0f/LRCKYM56QVYGP/classes",
  ctaLabel: "Reserve Your Seat — $1,500",
  paymentMessage:
    "Full tuition is required at registration to reserve your seat.",
  nextClassLabel: "Next Class",
  nextClassDates: "November 13–15, 2026",
  details: [
    "Friday–Sunday",
    "10:00 AM–3:00 PM",
    "15 Hours of Hands-On Training",
    "$1,500 Per Student",
    "Limited to 6 Students",
  ],
  includesNote: "One registration includes all three days of training.",
} as const;

/** Repair Track / Practical Board Repair Intensive only. */
export const REPAIR_TRACK_INSTRUCTOR = {
  eyebrow: "About Your Instructor",
  name: "Nathan Jobe",
  paragraphs: [
    "Nathan Jobe has extensive hands-on experience in electronics repair, microsoldering, and board-level diagnostics.",
    "His professional training includes hands-on microsoldering instruction with Jessa Jones of iPad Rehab and board-level MacBook repair training with Louis Rossmann.",
    "Since that training, Nathan has spent years applying board-level diagnostic and microsoldering techniques to real customer devices including smartphones, tablets, laptops, game consoles, liquid-damaged electronics, and component-level board failures.",
  ],
  disclaimer:
    "This describes historical professional training only. Nathan Jobe and PixelNation are not currently affiliated with, endorsed by, sponsored by, or certified by Jessa Jones, iPad Rehab, Louis Rossmann, or their businesses.",
} as const;

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

/** Repair Track / Practical Board Repair Intensive only. Not used by Investigator Track. */
export const REPAIR_TRACK_REGISTRATION_POLICIES = {
  paymentNotice:
    "Full tuition is required at registration to reserve your seat.",
  sections: [
    {
      title: "Registration & Payment",
      paragraphs: [
        "Payment is required in full at the time of registration to reserve a seat.",
        "Tuition covers all three days of instruction, use of training equipment, practice boards, and standard training materials unless otherwise specified. One $1,500 registration includes Friday, Saturday, and Sunday. Saturday and Sunday are continuation training days and are not separately bookable. Square uses the Friday class session as the customer-facing enrollment for the complete three-day program.",
        "Because class sizes are intentionally limited, registration reserves a seat that may otherwise have been offered to another student.",
      ],
    },
    {
      title: "Cancellation & Rescheduling Policy",
      paragraphs: [
        "Please review these terms on this page before you continue to Square to pay.",
        "Students may cancel within 7 days of registration for a full refund, provided the scheduled course is still at least 30 days away.",
        "After the 7-day grace period, tuition is non-refundable.",
        "If a student is unable to attend, they may request to transfer their registration to a future available class. Rescheduling is subject to availability and approval by PixelNation.",
        "If PixelNation must cancel or reschedule a class, registered students may choose between transferring their tuition to another available course date or receiving a full refund of tuition paid.",
        "Travel expenses, lodging, transportation, meals, and other personal expenses are not included in tuition and are not reimbursable by PixelNation.",
      ],
    },
    {
      title: "What Happens After Registration?",
      paragraphs: [
        "After registering, students will receive confirmation of their seat along with course information, what to expect, recommended travel planning information, and anything they should bring.",
        "Students attending scheduled group training are not required to bring professional repair equipment unless otherwise stated.",
        "Training equipment will be available during the course.",
      ],
    },
    {
      title: "Questions Before Booking?",
      paragraphs: [
        "Have questions about the course, your current experience level, travel, or whether this training is appropriate for you? Contact PixelNation before registering and we'll help you determine whether the course matches what you're looking to learn.",
      ],
    },
  ],
} as const;

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
      "The Practical Board Repair Intensive requires no prior microsoldering experience. Investigator track levels expect prior skills as described on each course card. Contact us if you are unsure which course fits.",
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
      `Reserve through our training courses page or contact us at ${SITE.phone} or support@pixelnation.co. Seats are limited to ensure individual instruction.`,
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
