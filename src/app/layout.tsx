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

const title = `Undangan Aqiqah & Khitanan ${invitation.child.fullName}`;

export const metadata: Metadata = {
  metadataBase: new URL(invitation.seo.siteUrl),
  title,
  description: invitation.seo.description,
  openGraph: {
    title,
    description: invitation.seo.description,
    images: [{ url: "/img/cover-hero.webp", width: 1400, height: 933, alt: "Ilustrasi undangan" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: invitation.seo.description },
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
      <body>{children}</body>
    </html>
  );
}
