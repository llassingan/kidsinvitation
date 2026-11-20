import InvitationCover from "@/components/invitation/InvitationCover";
import OpeningGreeting from "@/components/invitation/OpeningGreeting";
import ChildProfile from "@/components/invitation/ChildProfile";
import EventDetails from "@/components/invitation/EventDetails";
import EventLocation from "@/components/invitation/EventLocation";
import GiftSection from "@/components/invitation/GiftSection";
import WishesSection from "@/components/invitation/WishesSection";

import SoundToggle from "@/components/ui/SoundToggle";
import AfterCover from "@/components/invitation/AfterCover";
import { invitation, sectionShown } from "@/lib/invitation";

// The guest name arrives in ?to=; blocking on the server keeps the page per request.
export const instant = false;

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

function guestFrom(params: { [key: string]: string | string[] | undefined }): string | null {
  const raw = params.to ?? params.kepada;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  return value.replace(/[<>]/g, "").slice(0, 80) || null;
}

// First section still visible, so the cover's scroll cue never points at a hidden anchor.
const firstAnchor = sectionShown("greeting")
  ? "#salam"
  : sectionShown("profile")
    ? "#profil"
    : sectionShown("event")
      ? "#acara"
      : sectionShown("location")
        ? "#lokasi"
        : sectionShown("gift")
          ? "#hadiah"
          : sectionShown("wishes")
          ? "#doa"
          : null;

export default async function Page({ searchParams }: Props) {
  const guest = guestFrom(await searchParams);
  const cover = sectionShown("cover");
  const footer = sectionShown("footer");

  return (
    <main id="top">
      {cover && <InvitationCover guest={guest} nextAnchor={firstAnchor} />}
      <AfterCover gated={cover}>
        {sectionShown("greeting") && <OpeningGreeting />}
        {sectionShown("profile") && <ChildProfile />}
        {sectionShown("event") && <EventDetails />}
        {sectionShown("location") && <EventLocation />}
        {sectionShown("gift") && <GiftSection />}
        {sectionShown("wishes") && <WishesSection />}

        {footer && (
        <footer className="relative overflow-hidden bg-cream px-4 pt-16 pb-24 text-center">
        <div aria-hidden="true" className="geo-bg geo-fade absolute inset-0 opacity-20" />
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] text-sand/60">
          <img src="/img/boy-quran.webp" alt="" width={400} height={900} loading="lazy" className="mx-auto h-40 w-auto" />
        </div>
        <p className="arabic arabic-compact relative mt-4 text-emerald" lang="ar" dir="rtl">والسلام عليكم ورحمة الله</p>
        <p className="relative mt-3 font-display text-2xl text-teal">
          Terima kasih atas doa dan kehadirannya
        </p>
        <p className="relative mt-1 text-sm font-semibold text-ink/70">
          Keluarga {invitation.parents.father} &amp; {invitation.parents.mother}
        </p>
        <a href="#top" className="btn-ghost relative mt-6">
          Kembali ke atas
        </a>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-1 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-sand to-transparent"
        />
        </footer>
        )}
      </AfterCover>
      <SoundToggle />
    </main>
  );
}
