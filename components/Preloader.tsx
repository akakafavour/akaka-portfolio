"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Preloader — handcrafted, After-Effects-style intro sequence.
 * Plays once per session on the homepage. Skipped entirely under
 * prefers-reduced-motion. Timeline (≈2.1s):
 *   0.00  yellow disc pops in (spring overshoot)
 *   0.45  disc fades, asterisk strokes draw themselves in (pathLength)
 *   0.85  ink rounded-square draws around the asterisk, asterisk rotates
 *   1.35  square releases, asterisk settles + pulses
 *   1.70  WIPE: background floods yellow, asterisk turns ink and swells
 *   2.10  overlay fades out, page revealed, "af:reveal" event fires
 * A mono word cycles with each beat: Design → Build → Ship → Ready.
 */
const WORDS = ["Design", "Build", "Ship", "Ready"];

export default function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"hidden" | "play" | "wipe" | "done">(
    "hidden"
  );
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduce || sessionStorage.getItem("af-loaded")) return;
    sessionStorage.setItem("af-loaded", "1");
    setPhase("play");
    const timers = [
      window.setTimeout(() => setWord(1), 520),
      window.setTimeout(() => setWord(2), 960),
      window.setTimeout(() => setWord(3), 1400),
      window.setTimeout(() => setPhase("wipe"), 1700),
      window.setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("af-done", "1");
        window.dispatchEvent(new Event("af:reveal"));
      }, 2150),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce]);

  if (phase === "hidden" || phase === "done") return null;

  const wiping = phase === "wipe";

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center overflow-hidden"
      initial={{ backgroundColor: "rgba(245,243,236,1)" }}
      animate={{
        backgroundColor: wiping ? "#F2B705" : "rgba(245,243,236,1)",
      }}
      transition={{ duration: 0.32, ease: [0.83, 0, 0.17, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.32, ease: "easeOut" } }}
      aria-hidden="true"
    >
      {/* Shape lockup */}
      <div className="relative grid h-40 w-40 place-items-center">
        {/* Beat 1 — yellow disc */}
        <motion.span
          className="absolute h-28 w-28 rounded-full bg-accent"
          initial={{ scale: 0 }}
          animate={{
            scale: wiping ? 1.15 : [0, 1.14, 1],
            opacity: [1, 1, 0],
            transition: {
              duration: wiping ? 0.3 : 0.8,
              times: wiping ? undefined : [0, 0.55, 1],
              ease: [0.34, 1.4, 0.64, 1],
            },
          }}
        />

        {/* Beat 2 — asterisk draws itself (three strokes) */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="absolute h-24 w-24"
          animate={{ rotate: wiping ? 90 : [0, -30, 0] }}
          transition={{
            duration: wiping ? 0.32 : 1.1,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          {[
            "M12 2.5v19",
            "m3.8 7.25 16.4 9.5",
            "M20.2 7.25 3.8 16.75",
          ].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={wiping ? "#111214" : "#F2B705"}
              strokeWidth={wiping ? 2.6 : 3.2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.4,
                  delay: 0.45 + i * 0.09,
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: { duration: 0.01, delay: 0.45 + i * 0.09 },
              }}
            />
          ))}
        </motion.svg>

        {/* Beat 3 — ink rounded-square draws around the asterisk */}
        <motion.svg
          viewBox="0 0 40 40"
          fill="none"
          className="absolute h-32 w-32"
        >
          <motion.rect
            x="3"
            y="3"
            width="34"
            height="34"
            rx="9"
            stroke={wiping ? "#111214" : "#111214"}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.15,
              times: [0, 0.35, 0.75, 1],
              delay: 0.55,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </motion.svg>
      </div>

      {/* Word cycle — masked, one job per beat */}
      <div className="absolute bottom-[22%] overflow-hidden">
        <motion.p
          key={WORDS[word]}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.32, ease: [0.34, 1.3, 0.64, 1] }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-ink"
        >
          {WORDS[word]}
          <span aria-hidden="true" className="ml-1 text-accent-hover">
            .
          </span>
        </motion.p>
      </div>

      {/* Corner labels — handcrafted-title feel */}
      <p className="eyebrow absolute bottom-6 left-6 text-muted">
        Akaka Favour
      </p>
      <p className="eyebrow absolute bottom-6 right-6 text-muted">
        Portfolio — 2026
      </p>
    </motion.div>
  );
}
