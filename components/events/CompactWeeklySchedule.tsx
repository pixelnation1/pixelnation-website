import { WEEKLY_SCHEDULE, OPEN_PLAY } from "@/lib/events/weekly-schedule";
import { RECURRING_DAY_LABELS } from "@/lib/events/helpers";

export function CompactWeeklySchedule() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <caption className="sr-only">Typical weekly nights at PixelNation</caption>
        <thead>
          <tr className="border-b border-card-border text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="py-2 pr-4 font-semibold">Day</th>
            <th className="py-2 pr-4 font-semibold">Event</th>
            <th className="py-2 font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {WEEKLY_SCHEDULE.flatMap((day) =>
            day.slots.map((slot) => (
              <tr key={slot.id} className="border-b border-card-border/60">
                <th className="py-2.5 pr-4 font-medium text-foreground" scope="row">
                  {RECURRING_DAY_LABELS[day.day]}
                </th>
                <td className="py-2.5 pr-4 text-foreground">{slot.title}</td>
                <td className="py-2.5 text-muted">
                  {slot.timesVary
                    ? "Times vary"
                    : slot.startTime && slot.endTime
                      ? `${slot.startTime} – ${slot.endTime}`
                      : slot.startTime}
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{OPEN_PLAY.body}</p>
    </div>
  );
}
