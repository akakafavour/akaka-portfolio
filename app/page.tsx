import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import LogoMarquee from "@/components/LogoMarquee";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-pill focus:px-4 focus:py-2 focus:text-on-ink"
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
        <main id="main">
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Process />
          <Contact />
        </main>
        <LogoMarquee />
        <Footer />
      </div>
    </>
  );
}
