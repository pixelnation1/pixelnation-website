import { WeeklyEventCard } from "@/components/events/WeeklyEventCard";
import { resolveWeeklySchedule } from "@/lib/events/weekly";

export function WeeklyScheduleGrid({ now = new Date() }: { now?: Date }) {
  const days = resolveWeeklySchedule(now);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {days.map((day) => (
        <div
          key={day.day}
          className={day.day === "friday" ? "md:col-span-2 xl:col-span-2" : undefined}
        >
          <WeeklyEventCard day={day} />
        </div>
      ))}
    </div>
  );
}
