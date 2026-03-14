import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://abhaysingh4feb-s.github.io/love-arcade";

export const metadata: Metadata = {
  title: {
    default: "Love Arcade — 9 Levels of Us | Interactive Romantic Experience",
    template: "%s | Love Arcade",
  },
  description:
    "Love Arcade is a cinematic, interactive romantic web experience with 9 mini-games celebrating your relationship — from memory match to a final love confession. Play together and relive your love story.",
  keywords: [
    "Love Arcade",
    "romantic game",
    "love game online",
    "couples game",
    "interactive love experience",
    "9 Levels of Us",
    "romantic mini games",
    "relationship game",
    "love quiz",
    "memory match love",
    "valentine game",
    "love confession game",
    "couples activity online",
    "romantic web app",
  ],
  authors: [{ name: "Abhay Pratap Singh" }],
  creator: "Abhay Pratap Singh",
  publisher: "Abhay Pratap Singh",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Love Arcade",
    title: "Love Arcade — 9 Levels of Us | Interactive Romantic Experience",
    description:
      "A cinematic, interactive romantic web experience with 9 mini-games celebrating your relationship. Play together and relive your love story.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Love Arcade — 9 Levels of Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Arcade — 9 Levels of Us",
    description:
      "A cinematic, interactive romantic web experience with 9 mini-games celebrating your relationship.",
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Love Arcade",
    alternateName: "9 Levels of Us",
    url: siteUrl,
    description:
      "A cinematic, interactive romantic web experience with 9 mini-games celebrating your relationship.",
    applicationCategory: "GameApplication",
    genre: "Romantic",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Abhay Pratap Singh",
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0F172A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen ambient-glow" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
