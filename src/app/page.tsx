import type { Metadata } from "next";
import InvitationCover from "@/components/invitation/InvitationCover";
import OpeningGreeting from "@/components/invitation/OpeningGreeting";
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

// The greeting always renders and always comes first, so it is the cue's target.
const firstAnchor = "#salam";

// Same values the layout builds, repeated here because this block replaces the
// layout's openGraph and twitter wholesale instead of merging into them.
const pageTitle = `Undangan ${invitation.event.title} ${invitation.child.fullName}`;
const previewAlt = `Ilustrasi ${invitation.child.nickname} melambaikan tangan di depan masjid berkubah`;

// WhatsApp and Telegram read og:description at share time, so the guest name is
// baked into the preview instead of only showing up after the link is opened.
// Everything except the description is left to the layout, but openGraph and
// twitter are replaced whole rather than merged field by field: a partial block
// would drop the image, card type, and og:url along with the fields it omits.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const guest = guestFrom(await searchParams);
  const description = guest ? `Undangan untuk ${guest}` : invitation.seo.description;

  return {
    description,
    openGraph: {
      type: "website",
      url: "/",
      siteName: `${invitation.event.title} ${invitation.child.nickname}`,
      locale: "id_ID",
      title: pageTitle,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: previewAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [{ url: "/og.jpg", alt: previewAlt }],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const guest = guestFrom(await searchParams);
  const cover = sectionShown("cover");
  const footer = sectionShown("footer");

  return (
    <main id="top">
      {cover && <InvitationCover guest={guest} nextAnchor={firstAnchor} />}
      <AfterCover gated={cover}>
        <OpeningGreeting />
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
        {/* <p className="relative mt-1 text-sm font-semibold text-ink/70">
          Keluarga {invitation.parents.father} &amp; {invitation.parents.mother}
        </p> */}
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
