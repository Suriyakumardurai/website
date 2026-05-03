import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorBlob from "@/components/CursorBlob";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoPlanet — Fully AI Native",
  description: "We build AI SaaS products, automate your workflows, and craft digital experiences — powered by the latest in artificial intelligence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="glow-orb glow-1" aria-hidden="true" />
        <div className="glow-orb glow-2" aria-hidden="true" />
        <SmoothScroll>
          <CursorBlob />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
