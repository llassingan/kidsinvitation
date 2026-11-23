/**
 * Every value comes from a NEXT_PUBLIC_* variable so this module is safe to
 * import from Client Components.
 *
 * Next inlines only the whole `process.env.NEXT_PUBLIC_X` expression, so each
 * read is its own statement: anything chained onto it (`a || b`, a variable key)
 * is left as a runtime lookup, and the browser has no env to look up.
 */

function sectionCover(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_COVER;
  return value === undefined || value === "" ? "true" : value;
}

function sectionEvent(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_EVENT;
  return value === undefined || value === "" ? "true" : value;
}

function sectionDresscode(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_DRESSCODE;
  return value === undefined || value === "" ? "true" : value;
}

function sectionLocation(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_LOCATION;
  return value === undefined || value === "" ? "true" : value;
}

function sectionGift(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_GIFT;
  return value === undefined || value === "" ? "true" : value;
}

function sectionWishes(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_WISHES;
  return value === undefined || value === "" ? "true" : value;
}

function sectionFooter(): string {
  const value = process.env.NEXT_PUBLIC_SECTION_FOOTER;
  return value === undefined || value === "" ? "true" : value;
}

function childNickname(): string {
  const value = process.env.NEXT_PUBLIC_CHILD_NICKNAME;
  return value === undefined || value === "" ? "[Nama Panggilan]" : value;
}

function childFullName(): string {
  const value = process.env.NEXT_PUBLIC_CHILD_FULL_NAME;
  return value === undefined || value === "" ? "[Nama Lengkap Anak]" : value;
}

function childIllustration(): string {
  const value = process.env.NEXT_PUBLIC_CHILD_ILLUSTRATION;
  return value === undefined || value === "" ? "/img/baby-portrait.webp" : value;
}

function fatherName(): string {
  const value = process.env.NEXT_PUBLIC_FATHER_NAME;
  return value === undefined || value === "" ? "[Nama Ayah]" : value;
}

function motherName(): string {
  const value = process.env.NEXT_PUBLIC_MOTHER_NAME;
  return value === undefined || value === "" ? "[Nama Ibu]" : value;
}

function eventTitle(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_TITLE;
  return value === undefined || value === "" ? "Aqiqah" : value;
}

function eventDateValue(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_DATE;
  return value === undefined || value === "" ? "2026-12-20" : value;
}

function eventStart(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_START;
  return value === undefined || value === "" ? "09:00" : value;
}

function eventEnd(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_END;
  return value === undefined || value === "" ? "12:00" : value;
}

function eventTimezoneLabel(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_TIMEZONE_LABEL;
  return value === undefined || value === "" ? "WITA" : value;
}

function eventTimezone(): string {
  const value = process.env.NEXT_PUBLIC_EVENT_TIMEZONE;
  return value === undefined || value === "" ? "Asia/Makassar" : value;
}

function dressCode(): string {
  const value = process.env.NEXT_PUBLIC_DRESS_CODE;
  return value === undefined || value === "" ? "" : value;
}

function venueName(): string {
  const value = process.env.NEXT_PUBLIC_VENUE_NAME;
  return value === undefined || value === "" ? "" : value;
}

function venueAddress(): string {
  const value = process.env.NEXT_PUBLIC_VENUE_ADDRESS;
  return value === undefined || value === "" ? "" : value;
}

function venueNote(): string {
  const value = process.env.NEXT_PUBLIC_VENUE_NOTE;
  return value === undefined || value === "" ? "" : value;
}

function mapsUrl(): string {
  const value = process.env.NEXT_PUBLIC_MAPS_URL;
  return value === undefined || value === "" ? "" : value;
}

function giftIntro(): string {
  const value = process.env.NEXT_PUBLIC_GIFT_INTRO;
  return value === undefined || value === "" ? "Kehadiran dan doa Bapak/Ibu sudah cukup membahagiakan kami. Bila tetap ingin menitipkan tanda kasih, kami sediakan rekening berikut." : value;
}

function giftBank(): string {
  const value = process.env.NEXT_PUBLIC_GIFT_BANK;
  return value === undefined || value === "" ? "" : value;
}

function giftAccountNumber(): string {
  const value = process.env.NEXT_PUBLIC_GIFT_ACCOUNT_NUMBER;
  return value === undefined || value === "" ? "" : value;
}

function giftAccountHolder(): string {
  const value = process.env.NEXT_PUBLIC_GIFT_ACCOUNT_HOLDER;
  return value === undefined || value === "" ? "" : value;
}

function giftNote(): string {
  const value = process.env.NEXT_PUBLIC_GIFT_NOTE;
  return value === undefined || value === "" ? "" : value;
}

function showPublicWishes(): string {
  const value = process.env.NEXT_PUBLIC_SHOW_PUBLIC_WISHES;
  return value === undefined || value === "" ? "true" : value;
}

function audioEnabled(): string {
  const value = process.env.NEXT_PUBLIC_AUDIO_ENABLED;
  return value === undefined || value === "" ? "true" : value;
}

function audioSrc(): string {
  const value = process.env.NEXT_PUBLIC_AUDIO_SRC;
  return value === undefined || value === "" ? "" : value;
}

function audioVolume(): string {
  const value = process.env.NEXT_PUBLIC_AUDIO_VOLUME;
  return value === undefined || value === "" ? "0.35" : value;
}

function siteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  return value === undefined || value === "" ? "http://localhost:3000" : value;
}

function seoDescription(): string {
  const value = process.env.NEXT_PUBLIC_SEO_DESCRIPTION;
  return value === undefined || value === "" ? "Undangan syukuran aqiqah dan khitan putra kami." : value;
}

function clampVolume(raw: string): number {
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0.35;
}

const invitation = {
  sections: {
    cover: { show: sectionCover() !== "false" },
    event: { show: sectionEvent() !== "false" },
    dresscode: { show: sectionDresscode() !== "false" },
    location: { show: sectionLocation() !== "false" },
    gift: { show: sectionGift() !== "false" },
    wishes: { show: sectionWishes() !== "false" },
    footer: { show: sectionFooter() !== "false" },
  },
  child: {
    nickname: childNickname(),
    fullName: childFullName(),
    illustration: childIllustration(),
  },
  parents: {
    father: fatherName(),
    mother: motherName(),
  },
  event: {
    title: eventTitle(),
    date: eventDateValue(),
    startTime: eventStart(),
    endTime: eventEnd(),
    timezone: eventTimezone(),
    timezoneLabel: eventTimezoneLabel(),
    dressCode: dressCode(),
  },
  venue: {
    name: venueName(),
    address: venueAddress(),
    note: venueNote(),
    mapsUrl: mapsUrl(),
  },
  gift: {
    intro: giftIntro(),
    bank: giftBank(),
    accountNumber: giftAccountNumber(),
    accountHolder: giftAccountHolder(),
    note: giftNote(),
  },
  wishes: {
    showPublicWishes: showPublicWishes() !== "false",
  },
  audio: {
    enabled: audioEnabled() !== "false",
    src: audioSrc(),
    // A typo in the env value must not mute the invitation silently.
    volume: clampVolume(audioVolume()),
  },
  seo: {
    siteUrl: siteUrl(),
    description: seoDescription(),
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
