import type { Metadata } from "next";
import {
  AdvancedRepairSection,
  CommonProblemsSection,
  DataRecoveryHomeSection,
  EducationalSection,
  FAQSection,
  FinalCTASection,
  HeroSection,
  MailInRepairSection,
  TrainingHomeSection,
  TrustBar,
  WhatWeRepairSection,
  WhyChooseSection,
} from "@/components/home/HomePageSections";
import { HOME_METADATA } from "@/lib/homepage";

export const metadata: Metadata = {
  title: HOME_METADATA.title,
  description: HOME_METADATA.description,
  openGraph: {
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhatWeRepairSection />
      <CommonProblemsSection />
      <WhyChooseSection />
      <EducationalSection />
      <AdvancedRepairSection />
      <MailInRepairSection />
      <DataRecoveryHomeSection />
      <TrainingHomeSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
