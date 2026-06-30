import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import GlobalBackground from "@/components/site/global-background";
import ScrollToTop from "@/components/site/scroll-to-top";
import MobileNav from "@/components/site/mobile-nav";
import MobileStickyCTA from "@/components/site/mobile-sticky-cta";
import MobileQuickContact from "@/components/site/mobile-quick-contact";
import MobileSectionNav from "@/components/site/mobile-section-nav";
import MobileBackGesture from "@/components/site/mobile-back-gesture";
import MobileReadingRing from "@/components/site/mobile-reading-ring";
import MobilePullToRefresh from "@/components/site/mobile-pull-to-refresh";
import { MobileBookmarkButton } from "@/components/site/mobile-bookmarks";
import MobileCommandPalette from "@/components/site/mobile-command-palette";
import MobileOfflineIndicator from "@/components/site/mobile-offline-indicator";
import MobileCompareSheet from "@/components/site/mobile-compare";
import MobileFeedback from "@/components/site/mobile-feedback";
import MobileOnboarding from "@/components/site/mobile-onboarding";
import MobileGestureTutorial from "@/components/site/mobile-gesture-tutorial";
import { MobileReadingListButton } from "@/components/site/mobile-reading-list";
import { MobileContentSearchButton } from "@/components/site/mobile-content-search";
import MobileQuickActions from "@/components/site/mobile-quick-actions";
import { MobileContentBookmarkPrompt } from "@/components/site/mobile-content-bookmarks";
import MobileReadingProgressSync from "@/components/site/mobile-reading-progress-sync";
import MobileRecentlyClosed from "@/components/site/mobile-recently-closed";
import MobileSocialProof from "@/components/site/mobile-social-proof";
import { GlobalStructuredData } from "@/components/site/structured-data";
import { SITE_CONFIG } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "AutoPlanet Corporation — Enterprise AI Automation",
    template: "%s · AutoPlanet Corporation",
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "AutoPlanet Corporation",
    "AutoPlanet",
    "APC",
    "enterprise AI",
    "AI automation",
    "AI automation company",
    "custom LLM development",
    "custom LLM",
    "AI agents",
    "autonomous AI agents",
    "AI SaaS development",
    "workflow automation",
    "AI workflow automation",
    "RAG pipelines",
    "retrieval augmented generation",
    "AI engineering team",
    "production AI",
    "AI-native engineering",
    "LLM fine-tuning",
    "machine learning solutions",
    "computer vision",
    "predictive analytics",
    "AI consulting",
    "AI strategy",
    "enterprise AI solutions",
    "AI integration",
    "VPC AI deployment",
    "AI data sovereignty",
    "fixed-price AI development",
    "AI SaaS builds",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    // Browser tab favicon = the "A" mark (small sizes, unchanged)
    // Google search result icon = the circular badge (large sizes 48px+)
    icon: [
      { url: "/autoplanet-logo.png", sizes: "16x16", type: "image/png" },
      { url: "/autoplanet-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/google-search-icon.png", sizes: "48x48", type: "image/png" },
      { url: "/google-search-icon.png", sizes: "96x96", type: "image/png" },
      { url: "/google-search-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/autoplanet-logo.png",
    apple: "/autoplanet-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "AutoPlanet Corporation — Enterprise AI Automation",
    description:
      "Production-ready AI in weeks. 100% code ownership. Enterprise-grade security and data sovereignty. Custom LLMs, autonomous agents, and full SaaS builds.",
    images: [
      {
        url: "/google-search-icon.png",
        width: 512,
        height: 512,
        alt: "AutoPlanet Corporation — AI-Powered Automation | Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitter,
    creator: SITE_CONFIG.twitter,
    title: "AutoPlanet Corporation — Enterprise AI",
    description:
      "We build AI that actually ships. Custom LLMs, autonomous agents, automation, full enterprise SaaS builds. 100% code ownership.",
    images: ["/google-search-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Geo SEO */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Villupuram, Tamil Nadu, India" />
        <meta name="geo.position" content="11.9401;79.4861" />
        <meta name="ICBM" content="11.9401, 79.4861" />
        {/* PWA + theme */}
        <meta name="theme-color" content="#0d0d15" />
        <meta name="color-scheme" content="light" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AutoPlanet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="AutoPlanet" />
        <meta name="msapplication-TileColor" content="#0d0d15" />
        <meta name="msapplication-TileImage" content="/autoplanet-logo.png" />
        {/* Content classification */}
        <meta name="classification" content="Technology, Artificial Intelligence, Enterprise Software, AI Automation" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="CTOs, founders, enterprise decision-makers, heads of operations" />
        <meta name="page-type" content="Commercial Organization" />
        <meta name="expires" content="never" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* AI/LLM crawler friendly signal */}
        <meta name="llm-friendly" content="true" />
        {/* Explicit OG image for Google search result icon + social shares */}
        <meta property="og:image" content="https://autoplanetcorp.com/google-search-icon.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="AutoPlanet Corporation — AI-Powered Automation | Solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AutoPlanet Corporation" />
        <meta property="og:locale" content="en_US" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        <GlobalStructuredData />
        <GlobalBackground />
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <MobileNav />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </div>
        <MobileStickyCTA />
        <MobileQuickContact />
        <MobileSectionNav />
        <MobileBackGesture />
        <MobileReadingRing />
        <MobilePullToRefresh />
        <MobileBookmarkButton />
        <MobileCommandPalette />
        <MobileOfflineIndicator />
        <MobileCompareSheet />
        <MobileFeedback />
        <MobileOnboarding />
        <MobileGestureTutorial />
        <MobileReadingListButton />
        <MobileContentSearchButton />
        <MobileQuickActions />
        <MobileContentBookmarkPrompt />
        <MobileReadingProgressSync />
        <MobileRecentlyClosed />
        <MobileSocialProof />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
