import { LegalDocument } from "@/components/legal/LegalDocument";
import { createPageMetadataFromLegacy } from "@/lib/seo/metadata";
import {
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_METADATA,
  PRIVACY_POLICY_SECTIONS,
} from "@/lib/legal/privacy-policy";

export const metadata = createPageMetadataFromLegacy(PRIVACY_POLICY_METADATA);

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      effectiveDate={PRIVACY_POLICY_EFFECTIVE_DATE}
      intro={PRIVACY_POLICY_INTRO}
      sections={PRIVACY_POLICY_SECTIONS}
      breadcrumbLabel="Privacy Policy"
    />
  );
}
