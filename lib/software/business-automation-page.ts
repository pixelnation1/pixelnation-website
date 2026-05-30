import { SITE } from "@/lib/site";
import { SOFTWARE_SERVICE_PATHS } from "@/lib/software/links";

export const BUSINESS_AUTOMATION_METADATA = {
  title: "Business Automation Systems & Workflow Software | PixelNation",
  description:
    "PixelNation builds automation systems, dashboards, CRM tools, reporting workflows, and custom business software that help companies save time and operate smarter.",
  path: SOFTWARE_SERVICE_PATHS.businessAutomation,
} as const;

export const BUSINESS_AUTOMATION_KEYWORDS = [
  "business automation",
  "workflow automation software",
  "CRM automation",
  "internal dashboard development",
  "reporting systems",
  "inventory workflow software",
  "business process automation",
] as const;

export const HERO = {
  eyebrow: "Business Automation · Workflow Software · Nationwide",
  headline: "Automate the Busywork and Build Better Systems",
  subheadline:
    "PixelNation replaces manual spreadsheets, missed follow-ups, and disconnected tools with automation systems, dashboards, CRM workflows, and custom software that help your team work faster and make better decisions.",
  bullets: [
    "Workflow and process automation",
    "CRM and lead tracking systems",
    "Internal dashboards and reporting",
    "Inventory and operations workflows",
    "Employee and scheduling tools",
    "Integrations across your stack",
  ],
} as const;

export const PROBLEMS_WE_SOLVE = [
  {
    title: "Manual spreadsheets",
    text: "Critical business data trapped in Excel files that break, duplicate, and never sync—costing hours and creating errors.",
  },
  {
    title: "Missed follow-ups",
    text: "Leads and customers fall through the cracks when reminders, tasks, and handoffs live in people's heads or scattered inboxes.",
  },
  {
    title: "Disconnected systems",
    text: "Copy-pasting between tools, double entry, and no single source of truth for sales, operations, or inventory.",
  },
  {
    title: "Repetitive admin work",
    text: "Staff spending hours on data entry, status updates, and report generation that software should handle automatically.",
  },
  {
    title: "Poor reporting",
    text: "Leadership making decisions without timely KPIs because reports are manual, outdated, or spread across too many places.",
  },
] as const;

export const AUTOMATION_SERVICES = [
  {
    title: "CRM Automation",
    description:
      "Custom CRM workflows, pipeline stages, automated follow-ups, and lead routing tailored to how your sales team actually closes.",
    items: ["Lead capture and scoring", "Automated reminders", "Pipeline dashboards", "Integration with email and SMS"],
  },
  {
    title: "Lead Tracking",
    description:
      "Centralized lead management from first touch to conversion—with visibility into source, status, and next actions.",
    items: ["Multi-channel lead intake", "Assignment rules", "Activity logging", "Conversion reporting"],
  },
  {
    title: "Internal Dashboards",
    description:
      "Real-time operational dashboards for managers and teams—KPIs, workload, revenue, and performance at a glance.",
    items: ["Custom metrics", "Role-based views", "Drill-down reporting", "Scheduled exports"],
  },
  {
    title: "Reporting Systems",
    description:
      "Automated reports that pull from your data sources and deliver insights on schedule—no more Friday spreadsheet marathons.",
    items: ["Scheduled reports", "Data aggregation", "Visual charts", "Email delivery"],
  },
  {
    title: "Inventory Workflows",
    description:
      "Stock tracking, reorder alerts, supplier management, and location-level counts connected to how you actually move product.",
    items: ["Low-stock alerts", "Supplier records", "Multi-location counts", "Purchase order flows"],
  },
  {
    title: "Employee Tools",
    description:
      "Scheduling, task management, time tracking, and internal communication tools built for your team's specific workflows.",
    items: ["Shift scheduling", "Task assignment", "Time and attendance", "Internal notifications"],
  },
] as const;

export const WHY_AUTOMATION_PROFITABILITY = [
  {
    title: "Labor cost reduction",
    text: "Automating repetitive tasks frees staff for revenue-generating work instead of admin overhead.",
  },
  {
    title: "Fewer costly errors",
    text: "Consistent automated workflows reduce mistakes from manual entry, missed steps, and outdated data.",
  },
  {
    title: "Faster response times",
    text: "Instant notifications and automated follow-ups mean leads and customers get attention when it matters.",
  },
  {
    title: "Better decisions",
    text: "Real-time dashboards and reports give leadership visibility to act on trends—not guess from stale numbers.",
  },
  {
    title: "Scalable operations",
    text: "Systems that grow with volume so adding customers or locations does not require proportional headcount.",
  },
  {
    title: "Competitive speed",
    text: "Teams that automate respond faster, quote faster, and deliver faster than competitors still running on spreadsheets.",
  },
] as const;

export const BUSINESS_AUTOMATION_FAQ = [
  {
    question: "Can you automate business processes?",
    answer:
      "Yes. PixelNation builds workflow automation, CRM systems, dashboards, reporting tools, and custom integrations that replace manual processes and disconnected spreadsheets.",
  },
  {
    question: "What business processes can be automated?",
    answer:
      "Common targets include lead follow-up, inventory tracking, reporting, employee scheduling, customer onboarding, invoice reminders, and data sync between tools your team already uses.",
  },
  {
    question: "Do I need to replace my existing software?",
    answer:
      "Not always. We often integrate with tools you already use—connecting CRMs, payment systems, spreadsheets, and APIs into a unified workflow rather than forcing a full rip-and-replace.",
  },
  {
    question: "How long does a business automation project take?",
    answer:
      "Timeline depends on complexity. Focused automations can ship in weeks; larger dashboard and CRM builds may take several months across phased delivery.",
  },
  {
    question: "Is custom automation worth it for small businesses?",
    answer:
      "When manual work costs hours every week, creates errors, or blocks growth, targeted automation often pays for itself quickly—especially for service businesses with repeatable workflows.",
  },
  {
    question: "Do you work with businesses outside Kansas?",
    answer:
      `Yes. PixelNation serves businesses nationwide from our base in ${SITE.address.region}, with remote discovery, demos, and structured project delivery.`,
  },
] as const;

export const CONVERSATIONAL_QUERIES = [
  "How to automate business workflows",
  "Custom CRM development for small business",
  "Business dashboard development company",
  "Replace spreadsheets with custom software",
] as const;

export const GEO_COPY = `PixelNation builds business automation systems for companies in ${SITE.address.region} and nationwide. From CRM workflows to inventory automation and executive dashboards, we help operators eliminate busywork and run smarter systems.`;
