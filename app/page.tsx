import {
  BuySellTradeHomeSection,
  EventsPreviewHomeSection,
  VisitPixelNationSection,
  FAQSection,
  HeroSection,
  MeetPixelNationSection,
  MoreServicesHomeSection,
  TradingCardsHomeSection,
  TrustBar,
  WhatWeRepairSection,
} from "@/components/home/HomePageSections";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
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
      <TrustBar />
      <EventsPreviewHomeSection />
      <WhatWeRepairSection />
      <TradingCardsHomeSection />
      <BuySellTradeHomeSection />
      <MeetPixelNationSection />
      <MoreServicesHomeSection />
      <FAQSection />
      <VisitPixelNationSection />
    </>
  );
}
