/**
 * Every value comes from a NEXT_PUBLIC_* variable so this module is safe to
 * import from Client Components. Each one also has a server-only twin without
 * the prefix, which wins at build time and keeps the copy out of the bundle.
 */

const key = (publicName: string) => publicName.replace("NEXT_PUBLIC_", "");

function read(publicName: string, fallback: string): string {
  const value = process.env[key(publicName)] || process.env[publicName];
  return value === undefined || value === "" ? fallback : value;
}

function readBool(publicName: string, fallback: boolean): boolean {
  return read(publicName, fallback ? "true" : "false") !== "false";
}

const invitation = {
  sections: {
    cover: { show: readBool("NEXT_PUBLIC_SECTION_COVER", true) },
    event: { show: readBool("NEXT_PUBLIC_SECTION_EVENT", true) },
    dresscode: { show: readBool("NEXT_PUBLIC_SECTION_DRESSCODE", true) },
    location: { show: readBool("NEXT_PUBLIC_SECTION_LOCATION", true) },
    gift: { show: readBool("NEXT_PUBLIC_SECTION_GIFT", true) },
    wishes: { show: readBool("NEXT_PUBLIC_SECTION_WISHES", true) },
    footer: { show: readBool("NEXT_PUBLIC_SECTION_FOOTER", true) },
  },
  child: {
    nickname: read("NEXT_PUBLIC_CHILD_NICKNAME", "[Nama Panggilan]"),
    fullName: read("NEXT_PUBLIC_CHILD_FULL_NAME", "[Nama Lengkap Anak]"),
    illustration: read("NEXT_PUBLIC_CHILD_ILLUSTRATION", "/img/baby-portrait.webp"),
  },
  parents: {
    father: read("NEXT_PUBLIC_FATHER_NAME", "[Nama Ayah]"),
    mother: read("NEXT_PUBLIC_MOTHER_NAME", "[Nama Ibu]"),
  },
  event: {
    title: read("NEXT_PUBLIC_EVENT_TITLE", "Aqiqah"),
    date: read("NEXT_PUBLIC_EVENT_DATE", "2026-12-20"),
    startTime: read("NEXT_PUBLIC_EVENT_START", "09:00"),
    endTime: read("NEXT_PUBLIC_EVENT_END", "12:00"),
    timezone: read("NEXT_PUBLIC_EVENT_TIMEZONE", "Asia/Makassar"),
    timezoneLabel: read("NEXT_PUBLIC_EVENT_TIMEZONE_LABEL", "WITA"),
    dressCode: read("NEXT_PUBLIC_DRESS_CODE", ""),
  },
  venue: {
    name: read("NEXT_PUBLIC_VENUE_NAME", ""),
    address: read("NEXT_PUBLIC_VENUE_ADDRESS", ""),
    note: read("NEXT_PUBLIC_VENUE_NOTE", ""),
    mapsUrl: read("NEXT_PUBLIC_MAPS_URL", ""),
  },
  gift: {
    intro: read(
      "NEXT_PUBLIC_GIFT_INTRO",
      "Kehadiran dan doa Bapak/Ibu sudah cukup membahagiakan kami. Bila tetap ingin menitipkan tanda kasih, kami sediakan rekening berikut.",
    ),
    bank: read("NEXT_PUBLIC_GIFT_BANK", ""),
    accountNumber: read("NEXT_PUBLIC_GIFT_ACCOUNT_NUMBER", ""),
    accountHolder: read("NEXT_PUBLIC_GIFT_ACCOUNT_HOLDER", ""),
    note: read("NEXT_PUBLIC_GIFT_NOTE", ""),
  },
  wishes: {
    showPublicWishes: readBool("NEXT_PUBLIC_SHOW_PUBLIC_WISHES", true),
  },
  audio: {
    enabled: readBool("NEXT_PUBLIC_AUDIO_ENABLED", true),
    src: read("NEXT_PUBLIC_AUDIO_SRC", ""),
    volume: Number(read("NEXT_PUBLIC_AUDIO_VOLUME", "0.35")),
  },
  seo: {
    siteUrl: read("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
    description: read("NEXT_PUBLIC_SEO_DESCRIPTION", "Undangan syukuran aqiqah dan khitanan putra kami."),
  },
};

export type Invitation = typeof invitation;
export type SectionName = keyof Invitation["sections"];

export { invitation };

/**
 * Sections are opt-out: a section renders unless its env entry says false,
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

/**
 * EVENT_TITLE is the whole occasion ("Aqiqah & Khitanan" or just "Aqiqah"),
 * so the copy never claims khitanan for an aqiqah-only invitation. Nouns are
 * lowercased to follow "syukuran".
 */
export function eventTitleParts(data: Invitation = invitation) {
  const nouns = data.event.title
    .split(/\s*(?:&|dan)\s*/i)
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => label.charAt(0).toLowerCase() + label.slice(1));
  return nouns.length ? nouns : ["aqiqah"];
}

// Calendar links use the event's own wall clock plus its timezone, so the
// invitation never shifts by an hour for guests in another zone.
export function calendarUrls(data: Invitation) {
  const day = data.event.date.replace(/-/g, "");
  const start = `${day}T${data.event.startTime.replace(":", "")}00`;
  const end = `${day}T${data.event.endTime.replace(":", "")}00`;
  const title = `${data.event.title} ${data.child.fullName}`;
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
