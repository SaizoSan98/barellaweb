import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BARELLA Épületgépészet - Prémium Megoldások",
  description: "Ipari és lakossági épületgépészet felsőfokon. Klíma, hőszivattyú, légtechnika tervezés és kivitelezés.",
  metadataBase: new URL("https://barella.hu"),
  openGraph: {
    title: "BARELLA Épületgépészet - Prémium Megoldások",
    description: "Ipari és lakossági épületgépészet felsőfokon. Klíma, hőszivattyú, légtechnika tervezés és kivitelezés.",
    url: "https://barella.hu",
    siteName: "BARELLA Épületgépészet",
    type: "website",
    locale: "hu_HU",
  },
  alternates: {
    canonical: "https://barella.hu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QuoteProvider>
          <SmoothScroll />
          {children}
          <QuoteModal />
          <ScrollToTop />
          <CookieBanner />
        </QuoteProvider>
      </body>
    </html>
  );
}
