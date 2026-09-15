"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Psychology order: proof (Work) → trust (About) → offer (Services) →
   method (Process) → action (Contact + Let's talk). */
const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/**
 * Floating ink pill: the AF monogram doubles as the theme switch (a quiet
 * easter egg — hover hints with a sun/moon morph, click spins and flips the
 * theme) · centered nav with scroll-spy underline · yellow "LET'S TALK ↗".
 */
export default function SiteHeader() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [dark, setDark] = useState<boolean | null>(null);

  // Sync with the no-flash boot script's decision (af-theme in localStorage)
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !(dark ?? false);
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("af-theme", next ? "dark" : "light");
    } catch {
      /* private mode — theme still applies for this visit */
    }
  };

  useEffect(() => {
    const sections = NAV.map((item) =>
      document.getElementById(item.href.slice(1))
    ).filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={reduce ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <header
        aria-label="Primary"
        className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-ink py-2 pl-2 pr-2 shadow-[0_20px_50px_-20px_rgba(17,18,20,0.5)] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {/* AF monogram — looks stock, is secretly the theme switch.
            Quiet cues: a yellow ring on hover, a micro toggle-track under
            the letters whose knob flips with the theme, full spin on tap. */}
        <motion.button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={dark ?? false}
          title="Tap to switch the lights"
          whileTap={reduce ? undefined : { rotate: 360, scale: 0.88 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="group mr-1 flex h-8 w-8 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full bg-bg text-ink ring-1 ring-transparent transition-all duration-300 hover:ring-accent"
        >
          <span className="font-display text-[0.7rem] font-semibold leading-none">
            AF
          </span>
          <span
            aria-hidden="true"
            className="relative mt-[3px] block h-[3px] w-[14px] rounded-full bg-ink/15"
          >
            <motion.span
              className="absolute top-1/2 h-[3px] w-[7px] -translate-y-1/2 rounded-full bg-accent"
              animate={{ left: dark ? "7px" : "0px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </span>
        </motion.button>

        {NAV.map((item) => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-1.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.04em] text-bg transition-colors hover:bg-accent hover:text-ink sm:px-3 sm:text-xs sm:tracking-[0.08em] ${
                isActive
                  ? "underline decoration-accent decoration-2 underline-offset-[6px]"
                  : ""
              }`}
            >
              {item.label}
            </a>
          );
        })}

        {/* Résumé — direct download, sits with the credentials slot */}
        <a
          href="/resume.pdf"
          download
          className="shrink-0 whitespace-nowrap rounded-full px-1.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.04em] text-bg/70 underline decoration-dotted decoration-bg/40 underline-offset-[6px] transition-colors hover:bg-accent hover:text-ink hover:decoration-ink sm:px-3 sm:text-xs sm:tracking-[0.08em]"
        >
          Résumé
        </a>

        <a
          href="#contact"
          className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-accent-hover sm:ml-2 sm:px-4"
        >
          <span className="hidden sm:inline">Let&apos;s talk</span>
          <span aria-hidden="true" className="inline-block">
            ↗
          </span>
        </a>
      </header>
    </motion.div>
  );
}
