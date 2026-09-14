"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * AnimatedThemeToggler — sun ↔ moon morph with a smooth spin + scale.
 *
 * SVG paths for sun and moon are morph-compatible (same point count).
 * The toggle spins 180°, scales down then up, and cross-fades the icon.
 *
 * Light mode: shows moon icon (click to go dark).
 * Dark mode: shows sun icon (click to go light).
 *
 * Uses the same persistence as the original ThemeToggle:
 *   - toggles `.dark` on <html>
 *   - writes `af-theme` to localStorage
 */
export default function AnimatedThemeToggler() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("af-theme", next ? "dark" : "light");

    // Trigger spin animation
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  }, [dark]);

  if (!ready) return null;

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-on-ink transition-colors hover:bg-accent hover:text-pill"
    >
      {/* Sun icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        className={`absolute h-4 w-4 transition-all duration-500 ${
          spinning ? "rotate-180 scale-0" : "rotate-0 scale-100"
        } ${dark ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
      </svg>
      {/* Moon icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-4 w-4 transition-all duration-500 ${
          spinning ? "rotate-180 scale-0" : "rotate-0 scale-100"
        } ${dark ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
