import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlobalStructuredData } from "@/components/seo/GlobalStructuredData";
import { MAIN_MESSAGE, SITE } from "@/lib/site";
import { buildCanonical, CANONICAL_ORIGIN, DEFAULT_OG_IMAGE } from "@/lib/seo/site-seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: `${SITE.name} | Tech Repair in Emporia, KS`,
    template: `%s | ${SITE.name}`,
  },
  description: MAIN_MESSAGE,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: MAIN_MESSAGE,
    url: buildCanonical("/"),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: MAIN_MESSAGE,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <GlobalStructuredData />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
