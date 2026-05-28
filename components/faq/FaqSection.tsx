import { FAQ } from "@/components/FAQ";
import { PeopleAlsoAsk } from "@/components/faq/PeopleAlsoAsk";
import type { FaqItem } from "@/lib/seo/types";
import { buildPeopleAlsoAsk } from "@/lib/faq/utils";
import type { PeopleAlsoAskItem } from "@/lib/faq/types";

type FaqSectionProps = {
  items: readonly FaqItem[];
  id?: string;
  title?: string;
  /** Accordion: initial visible count (default 6) */
  initialVisible?: number;
  /** Show People Also Ask block above accordion */
  peopleAlsoAsk?: readonly PeopleAlsoAskItem[];
  conversationalQueries?: readonly string[];
  featuredAnswer?: string;
  showPeopleAlsoAsk?: boolean;
  className?: string;
};

export function FaqSection({
  items,
  id = "faq",
  title = "Frequently asked questions",
  initialVisible = 6,
  peopleAlsoAsk,
  conversationalQueries,
  featuredAnswer,
  showPeopleAlsoAsk = false,
  className,
}: FaqSectionProps) {
  if (!items.length) return null;

  const paa =
    peopleAlsoAsk ??
    (showPeopleAlsoAsk
      ? buildPeopleAlsoAsk(items, conversationalQueries ?? [], featuredAnswer, 5)
      : []);

  return (
    <div className={className}>
      {paa.length > 0 ? (
        <div className="mb-10">
          <PeopleAlsoAsk items={paa} />
        </div>
      ) : null}
      <FAQ
        items={items}
        id={id}
        heading={title}
        initialVisible={initialVisible}
        showHeading
      />
    </div>
  );
}
