"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Floating black ink pill, mockup-accurate: white circle AF monogram ·
 * centered nav (active section = yellow underline, scroll-spy) · yellow
 * "LET'S TALK ↗" pill. Drops in on load.
 */
export default function SiteHeader() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

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
        <a
          href="#main"
          aria-label="Akaka Favour — back to top"
          className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bg font-display text-xs font-semibold text-ink"
        >
          AF
        </a>
        {NAV.map((item) => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-bg transition-colors hover:bg-accent hover:text-ink ${
                isActive
                  ? "underline decoration-accent decoration-2 underline-offset-[6px]"
                  : ""
              }`}
            >
              {item.label}
            </a>
          );
        })}
        <a
          href="#contact"
          className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-accent-hover"
        >
          Let&apos;s talk
          <span aria-hidden="true" className="inline-block">
            ↗
          </span>
        </a>
      </header>
    </motion.div>
  );
}
