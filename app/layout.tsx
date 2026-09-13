import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Clash Display + Satoshi are self-hosted via @font-face in app/globals.css
   (files land in public/fonts/). Caveat powers the handwritten annotation
   fallbacks; JetBrains Mono comes from Google. */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akaka Favour — Websites that bring you work",
  description:
    "Full-stack developer and designer in Port Harcourt, Nigeria. Design, code, copy, deploy — one person with an AI-accelerated pipeline. Websites and web apps that bring calls and messages.",
  openGraph: {
    title: "Akaka Favour — Websites that bring you work",
    description:
      "Design, code, copy, deploy — one person, an AI-accelerated pipeline. Websites and web apps that bring calls and messages.",
    type: "website",
    locale: "en_NG",
    siteName: "Akaka Favour",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${caveat.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
