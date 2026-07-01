import type { Metadata } from "next";
import {
  DM_Sans,
  Playfair_Display,
  Pinyon_Script,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/constants";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital marketing",
    "advertising agency",
    "social media management",
    "SEO",
    "PPC",
    "content creation",
    "Bougain Mediaa",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/logos/logo-icon-green.png",
    apple: "/logos/logo-icon-green.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${sourceSerif.variable} ${pinyon.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
