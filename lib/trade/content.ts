export const TRADE_VALUES_METADATA = {
  title: "Video Game & Electronics Trade Values | PixelNation Emporia KS",
  description:
    "Search estimated PixelNation trade values for game consoles, handhelds, controllers, phones, computers, and electronics. Choose cash or higher-value store credit in Emporia, Kansas.",
  path: "/trade-values",
  keywords: [
    "video game trade values Emporia KS",
    "sell video games Emporia Kansas",
    "sell used electronics Emporia KS",
    "trade in game console Emporia",
    "sell broken electronics Emporia",
    "used gaming systems Emporia KS",
  ],
} as const;

export const SELL_TO_PIXELNATION_METADATA = {
  title: "Sell Electronics & Game Systems to PixelNation | Emporia KS",
  description:
    "Request a final PixelNation offer for game consoles, handhelds, phones, computers, and electronics in Emporia, Kansas. Online values are estimates pending inspection.",
  path: "/sell-to-pixelnation",
  keywords: [
    "sell used electronics Emporia KS",
    "sell video games Emporia Kansas",
    "trade in game console Emporia",
    "sell broken electronics Emporia",
  ],
} as const;

export const TRADE_ESTIMATE_NOTICE =
  "Displayed values are estimates for fully functional items in good condition with all required accessories. Final offers are determined after an in-store inspection and may change based on condition, completeness, inventory, market demand, and current resale value.";

export const STORE_CREDIT_COPY = {
  title: "Get More with PixelNation Store Credit",
  body: "Store credit generally provides more value than a cash offer and can be used toward eligible products sold by PixelNation. Final terms and exclusions may apply.",
} as const;

export const CONDITION_LEVELS = [
  {
    title: "Excellent",
    points: [
      "Fully functional",
      "Very light cosmetic wear",
      "Clean and ready for resale",
      "Includes all required accessories",
    ],
  },
  {
    title: "Good",
    points: [
      "Fully functional",
      "Normal cosmetic wear",
      "No major cracks, damage, or missing critical accessories",
    ],
  },
  {
    title: "Fair",
    points: [
      "Functional but noticeably worn",
      "May have scratches, damaged housing, weak battery, minor defects, or missing accessories",
      "Reduced offer may apply",
    ],
  },
  {
    title: "Damaged or Nonworking",
    points: [
      "Cracked, damaged, incomplete, or not fully functional",
      "PixelNation may still make an offer because we repair electronics",
      "Requires individual evaluation",
    ],
  },
] as const;

export const HOW_TRADES_WORK = [
  {
    title: "Find Your Item",
    body: "Search the PixelNation Trade Values page for an estimated offer.",
  },
  {
    title: "Bring It In",
    body: "Bring the item and all available controllers, chargers, cables, docks, cases, stands, and accessories to PixelNation.",
  },
  {
    title: "We Inspect It",
    body: "PixelNation tests functionality, checks the condition, verifies the model and storage capacity, and confirms included accessories.",
  },
  {
    title: "Choose Cash or Store Credit",
    body: "Accept the final offer and choose the available payment option. Store credit may provide a higher value.",
  },
] as const;

export const TRADE_VALUE_TERMS = [
  "All values displayed online are estimates and are not guaranteed offers. Final offers are determined after PixelNation physically inspects and tests the item. Values may change without notice based on condition, functionality, missing accessories, current inventory, market demand, resale value, and other factors.",
  "Items must be legally owned by the person presenting them for sale or trade. PixelNation may require valid government-issued identification and may refuse any transaction at its discretion. Devices must be removed from personal accounts, activation locks, passcodes, and remote-management systems before a transaction can be completed.",
  "Customers are responsible for backing up and removing personal data before surrendering a device. PixelNation is not responsible for data left on traded devices.",
  "Cash availability and payment methods may vary. Store credit has no cash value unless required by applicable law and may be subject to additional terms.",
  "PixelNation may decline items that are counterfeit, reported lost or stolen, unsafe, excessively damaged, account-locked, modified in an unacceptable manner, or otherwise unsuitable for resale.",
] as const;

export const TRADE_FAQS = [
  {
    question: "Are the online trade values guaranteed?",
    answer:
      "No. Online values are estimates only. A final offer is made after PixelNation inspects and tests your item in store.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Appointments are helpful during busy times but are not always required. You can start with the Get a Final Offer form or visit during business hours.",
  },
  {
    question: "Can I sell a broken console or device?",
    answer:
      "Often yes. Because PixelNation repairs electronics, damaged or nonworking items may still receive an offer after evaluation. Some listings note when nonworking units are accepted.",
  },
  {
    question: "Do I need to include the controller and cables?",
    answer:
      "Required accessories are listed on each trade value card. Missing critical accessories usually lower the offer. Bring everything you have so we can evaluate completeness accurately.",
  },
  {
    question: "Is store credit worth more than cash?",
    answer:
      "Store credit generally provides more value than cash for the same item, subject to PixelNation terms and eligible products. Final credit amounts are confirmed after inspection.",
  },
  {
    question: "Do you accept phones, tablets, and computers?",
    answer:
      "Eligible phones, tablets, computers, and other electronics may be reviewed. Account-locked devices and incomplete systems may be declined or valued lower.",
  },
  {
    question: "What should I do with my personal data?",
    answer:
      "Back up and remove personal data before trading a device. Sign out of accounts and disable activation locks when possible. PixelNation is not responsible for data left on traded devices.",
  },
  {
    question: "Do you accept account-locked devices?",
    answer:
      "Devices with activation locks, MDM profiles, or inaccessible accounts are often declined until locks are removed. Contact us if you are unsure.",
  },
  {
    question: "Can my final offer be lower than the online value?",
    answer:
      "Yes. Final offers can be lower—or occasionally adjusted—based on condition, functionality, missing accessories, demand, inventory, and resale value.",
  },
  {
    question: "Can PixelNation refuse a trade?",
    answer:
      "Yes. PixelNation may refuse any transaction at its discretion, including items that appear counterfeit, reported lost or stolen, unsafe, or unsuitable for resale.",
  },
  {
    question: "How long does an inspection take?",
    answer:
      "Many inspections are completed during the visit, but timing depends on the device, queue, and testing needed. Complex or busy-day evaluations may take longer.",
  },
  {
    question: "What identification will I need?",
    answer:
      "PixelNation may require valid government-issued identification before completing a purchase or trade. Bring ID when you visit.",
  },
] as const;

export const FINAL_OFFER_CONSENT =
  "I understand that any online value or response is an estimate. A final offer requires inspection and testing by PixelNation.";
