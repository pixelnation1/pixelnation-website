import { LegalDocument } from "@/components/legal/LegalDocument";
import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import {
  TERMS_OF_SERVICE_EFFECTIVE_DATE,
  TERMS_OF_SERVICE_INTRO,
  TERMS_OF_SERVICE_METADATA,
  TERMS_OF_SERVICE_SECTIONS,
} from "@/lib/legal/terms-of-service";

export const metadata = createPageMetadataFromLegacy(TERMS_OF_SERVICE_METADATA);

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      effectiveDate={TERMS_OF_SERVICE_EFFECTIVE_DATE}
      intro={TERMS_OF_SERVICE_INTRO}
      sections={TERMS_OF_SERVICE_SECTIONS}
      breadcrumbLabel="Terms of Service"
    />
  );
}
