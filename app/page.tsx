import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import StackGrid from "@/components/StackGrid";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      {/* Film grain — decorative, pointer-transparent */}
      <div className="grain-overlay" aria-hidden="true" />
      <SiteHeader />

      {/* Page-corner violet quarter-circles (fixed chrome, per mockups) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-40 h-20 w-20 rounded-bl-full bg-violet"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-40 h-16 w-16 rounded-tr-full bg-violet"
      />

      <div className="relative">
        {/* Faint dotted center spine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 border-l-2 border-dotted border-line md:block"
        />
        {/* 01–04 page ruler — left edge, desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 hidden xl:block"
        >
          <div className="absolute inset-y-0 left-0 border-l border-line" />
          <div className="relative flex h-full flex-col justify-between py-40">
            {["01", "02", "03", "04"].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="h-px w-3 bg-line" />
                <span className="font-mono text-[0.65rem] text-muted">{n}</span>
              </div>
            ))}
          </div>
        </div>

        <main id="main">
          <Hero />
          <Marquee />
          <Work />
          <StackGrid />
          <CaseStudy />
          <About />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
