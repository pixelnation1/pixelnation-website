import {
  AdvancedRepairSection,
  BuySellTradeHomeSection,
  CommonProblemsSection,
  DataRecoveryHomeSection,
  DivisionSelectorSection,
  EducationalSection,
  EventsPreviewHomeSection,
  ExpansionAnnouncementSection,
  FAQSection,
  FinalCTASection,
  HeroSection,
  MailInRepairSection,
  MeetPixelNationSection,
  OurMissionSection,
  TrainingHomeSection,
  SoftwareDevelopmentHomeSection,
  TradingCardsHomeSection,
  TrustBar,
  WhatWeCarryHomeSection,
  WhatWeRepairSection,
  WhyChooseSection,
} from "@/components/home/HomePageSections";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { HOME_METADATA } from "@/lib/homepage";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: HOME_METADATA.title,
  description: HOME_METADATA.description,
  path: HOME_METADATA.path,
  titleAbsolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HeroSection />
      <MeetPixelNationSection />
      <DivisionSelectorSection />
      <OurMissionSection />
      <TrustBar />
      <WhatWeRepairSection />
      <TradingCardsHomeSection />
      <WhatWeCarryHomeSection />
      <EventsPreviewHomeSection />
      <BuySellTradeHomeSection />
      <ExpansionAnnouncementSection />
      <CommonProblemsSection />
      <WhyChooseSection />
      <EducationalSection />
      <AdvancedRepairSection />
      <MailInRepairSection />
      <DataRecoveryHomeSection />
      <TrainingHomeSection />
      <SoftwareDevelopmentHomeSection />
      <FAQSection />
      <section className="border-t border-card-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <RelatedLinks currentPath="/" title="More from PixelNation" />
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
