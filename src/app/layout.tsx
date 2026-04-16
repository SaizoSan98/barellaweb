import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
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
        </QuoteProvider>
      </body>
    </html>
  );
}
