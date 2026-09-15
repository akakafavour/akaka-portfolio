import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
import Preloader from "@/components/Preloader";
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
  title: "Akaka Favour — I build it. I make it pay.",
  description:
    "Full-stack developer. I design, build, and fix the system behind your product — websites, web apps, and the conversion and revenue leaks around them. Built to make you money, not just look good.",
  openGraph: {
    title: "Akaka Favour — I build it. I make it pay.",
    description:
      "Design, code, deploy — then find what's leaking between your product and your revenue. Websites, web apps, and conversion fixes from one person.",
    type: "website",
    locale: "en_NG",
    siteName: "Akaka Favour",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ec",
};

/* No-flash theme boot: applies the saved (or system) theme before first
   paint. Runs inline in <head>, ahead of React hydration. */
const themeBoot = `
(function(){
  try {
    var saved = localStorage.getItem("af-theme");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${caveat.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
