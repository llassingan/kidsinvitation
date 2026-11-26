import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito, Amiri } from "next/font/google";
import { invitation } from "@/lib/invitation";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const arabic = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const siteUrl = invitation.seo.siteUrl;
// The occasion comes from EVENT_TITLE, so an aqiqah-only preview never promises khitanan.
const title = `Undangan ${invitation.event.title} ${invitation.child.fullName}`;
const description = invitation.seo.description;
const previewAlt = `Ilustrasi ${invitation.child.nickname} melambaikan tangan di depan masjid berkubah`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${invitation.event.title} ${invitation.child.nickname}`,
    locale: "id_ID",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: previewAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og.jpg", alt: previewAlt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#174F50",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        {/* ES5 on purpose: this is the only code that runs on browsers too old
            for the app bundle. When the bundle never boots, mark the document so
            the reveal animations' hidden start state does not keep the invitation
            invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;r.setAttribute("data-boot","pending");setTimeout(function(){if(r.getAttribute("data-boot")==="pending")r.setAttribute("data-boot","stalled")},3500)})()`,
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
