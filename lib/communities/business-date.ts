/**
 * America/Chicago calendar date, matching set_check_in_business_date():
 * `(created_at at time zone 'America/Chicago')::date`
 *
 * Used only for reading "today's" rows — inserts never set business_date
 * from the client or app; the DB trigger owns that.
 */
export function getChicagoBusinessDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Human-readable Chicago business date for success UI. */
export function formatChicagoBusinessDateDisplay(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  // Noon UTC avoids DST edge issues when formatting a calendar date.
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
