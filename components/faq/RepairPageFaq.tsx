import { FaqSection } from "@/components/faq/FaqSection";
import { getRepairPageFaqBundle, getTrainingFaqBundle } from "@/lib/faq/page-helpers";
import type { RepairPageId } from "@/lib/faq/repair-pages";

type RepairPageFaqProps = {
  page: RepairPageId;
  id?: string;
  title?: string;
};

export function RepairPageFaq({
  page,
  id = "faq",
  title = "Frequently asked questions",
}: RepairPageFaqProps) {
  const { items } = getRepairPageFaqBundle(page);
  return (
    <FaqSection
      items={items}
      id={id}
      title={title}
      showPeopleAlsoAsk
      initialVisible={6}
    />
  );
}

export function TrainingPageFaq({
  id = "faq",
  title = "Training FAQ",
}: {
  id?: string;
  title?: string;
}) {
  const { items } = getTrainingFaqBundle();
  return (
    <FaqSection
      items={items}
      id={id}
      title={title}
      showPeopleAlsoAsk
      initialVisible={6}
    />
  );
}
