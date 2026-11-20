import invitationJson from "@/data/invitation.json";

export type Invitation = typeof invitationJson;

export const invitation: Invitation = invitationJson;

export type SectionName = keyof Invitation["sections"];

/**
 * Sections are opt-out: a section renders unless its JSON entry says show:false,
 * so hiding a block never means deleting its markup.
 */
export function sectionShown(name: SectionName): boolean {
  return invitation.sections[name].show !== false;
}

export function eventDate(data: Invitation = invitation): Date {
  const { date, startTime } = data.event;
  return new Date(`${date}T${startTime}:00+08:00`);
}

const dayNames = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatEventDay(date: Date): string {
  return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatBirthDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "[Tanggal Lahir]";
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

// Age is computed from the birth date so the invitation never goes stale.
export function ageInMonths(birthIso: string, at: Date = new Date()): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthIso)) return Number.NaN;
  const birth = new Date(`${birthIso}T00:00:00`);
  let months = (at.getFullYear() - birth.getFullYear()) * 12 + at.getMonth() - birth.getMonth();
  if (at.getDate() < birth.getDate()) months -= 1;
  return Math.max(0, months);
}

export function fullDateText(data: Invitation): string {
  return `${data.child.birthPlace}, ${formatBirthDate(data.child.birthDate)}`;
}

// Calendar links use the event's own wall clock plus its timezone, so the
// invitation never shifts by an hour for guests in another zone.
export function calendarUrls(data: Invitation) {
  const day = data.event.date.replace(/-/g, "");
  const start = `${day}T${data.event.startTime.replace(":", "")}00`;
  const end = `${day}T${data.event.endTime.replace(":", "")}00`;
  const title = `Aqiqah & Khitanan ${data.child.fullName}`;
  const place = `${data.venue.name}, ${data.venue.address}`;
  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", title);
  google.searchParams.set("dates", `${start}/${end}`);
  google.searchParams.set("ctz", data.event.timezone);
  google.searchParams.set("location", place);
  return { google: google.toString(), icsStart: start, icsEnd: end, title, place };
}

export function mapsEmbedUrl(data: Invitation): string | null {
  const q = data.venue.mapsUrl;
  const embedMatch = q.match(/[?&]q=([^&]+)/);
  if (embedMatch && embedMatch[1].length > 0) {
    return `https://maps.google.com/maps?q=${embedMatch[1]}&z=16&output=embed`;
  }
  if (q.includes("/maps/embed")) return q;
  return null;
}

export function icsFile(data: Invitation): string {
  const { title, place } = calendarUrls(data);
  const start = toUtcStamp(data.event.date, data.event.startTime, data.event.timezone);
  const end = toUtcStamp(data.event.date, data.event.endTime, data.event.timezone);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Undangan//Aqiqah Khitanan//ID",
    "BEGIN:VEVENT",
    `UID:${start}-aqiqah-khitanan`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${place.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Wall-clock time in a named zone converted to UTC, for calendar files. */
function toUtcStamp(day: string, time: string, timeZone: string): string {
  const naive = Date.parse(`${day}T${time}:00Z`);
  const offsetName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(naive))
    .find((part) => part.type === "timeZoneName")?.value;
  const match = offsetName?.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  const minutes = match
    ? (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3] ?? 0))
    : 0;
  const utc = new Date(naive - minutes * 60_000);
  return utc.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
}

/** Guests always land on a usable map, even before mapsUrl is filled in. */
export function mapsLink(data: Invitation): string {
  const url = data.venue.mapsUrl;
  const query = url.match(/[?&]q=([^&]+)/)?.[1];
  if (url.includes("maps.google.com") && !query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${data.venue.name} ${data.venue.address}`,
    )}`;
  }
  return url;
}
