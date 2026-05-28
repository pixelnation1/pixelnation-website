import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { articleCanDataBeRecoveredFromDeadPhone } from "./can-data-be-recovered-from-dead-phone";
import { articleCommonCausesLaptopNoDisplay } from "./common-causes-laptop-no-display";
import { articleHdmiPortVsEncoder } from "./hdmi-port-vs-encoder-failure";
import { articleHowConsoleOverheatingDamages } from "./how-console-overheating-damages";
import { articleHowLiquidDamageCorrodes } from "./how-liquid-damage-corrodes";
import { articleSignsPhoneBoardDamage } from "./signs-phone-board-damage";
import { articleWhatCausesChargingPortFailure } from "./what-causes-charging-port-failure";
import { articleWhatHappensDiagnosticRepair } from "./what-happens-during-diagnostic-repair";
import { articleWhatIsMicrosoldering } from "./what-is-microsoldering";
import { articleWhyPs5HdmiPortsFail } from "./why-ps5-hdmi-ports-fail";

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  articleWhatIsMicrosoldering,
  articleWhyPs5HdmiPortsFail,
  articleSignsPhoneBoardDamage,
  articleCanDataBeRecoveredFromDeadPhone,
  articleCommonCausesLaptopNoDisplay,
  articleHowLiquidDamageCorrodes,
  articleWhatCausesChargingPortFailure,
  articleHdmiPortVsEncoder,
  articleHowConsoleOverheatingDamages,
  articleWhatHappensDiagnosticRepair,
];

export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);
}

export const FEATURED_ARTICLES = KNOWLEDGE_ARTICLES.filter((a) => a.featured);
export const POPULAR_ARTICLES = KNOWLEDGE_ARTICLES.filter((a) => a.popular);
export const RECENT_ARTICLES = [...KNOWLEDGE_ARTICLES].sort(
  (a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
);
