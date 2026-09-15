"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Preloader v2 — the client's initials sequence (≈3s, once per session,
 * skipped under reduced motion):
 *   0.00  "A" bounces in (Clash Display, spring overshoot)
 *   0.35  "F" bounces in beside it
 *   0.75  A + F come together into the AF lockup
 *   1.15  "Akaka Favour" shows underneath
 *   1.55  the portrait pops in as a circular disc (spring + tilt settle)
 *   2.00  handwritten line writes in
 *   2.45  everything hands off to the asterisk draw + square beat
 *   2.95  yellow wipe floods the screen → page revealed, "af:reveal" fires
 * Corner labels stay. Word cycle rides the beats.
 */
const WORDS = ["Design", "Build", "Ship", "Ready"];

const spring = { type: "spring", stiffness: 320, damping: 17 } as const;

export default function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<
    "hidden" | "play" | "wipe" | "done"
  >("hidden");
  const [beat, setBeat] = useState(0); // 0 A · 1 F · 2 AF · 3 name · 4 photo · 5 hand · 6 asterisk · 7 square
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduce || sessionStorage.getItem("af-loaded")) return;
    sessionStorage.setItem("af-loaded", "1");
    setPhase("play");
    const at = (ms: number, fn: () => void) =>
      window.setTimeout(fn, ms);
    const timers = [
      at(350, () => setBeat(1)),
      at(750, () => setBeat(2)),
      at(1150, () => setBeat(3)),
      at(1550, () => setBeat(4)),
      at(2000, () => setBeat(5)),
      at(2450, () => setBeat(6)),
      at(2700, () => setBeat(7)),
      at(2950, () => setPhase("wipe")),
      at(3400, () => {
        setPhase("done");
        window.dispatchEvent(new Event("af:reveal"));
      }),
      ...WORDS.map((_, i) => at(150 + i * 750, () => setWord(i))),
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
      aria-hidden="true"
    >
      {/* The lockup: A + F letters, portrait disc, handwritten line */}
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-36 items-end justify-center">
          {/* Portrait disc — pops in after the name (beat 4) */}
          <motion.span
            className="absolute -right-24 top-0 block h-24 w-24 overflow-hidden rounded-full border-[3px] border-ink shadow-[0_18px_40px_-18px_rgba(17,18,20,0.45)]"
            initial={{ scale: 0, rotate: -18, opacity: 0 }}
            animate={
              beat >= 4
                ? { scale: 1, rotate: 6, opacity: 1 }
                : { scale: 0, rotate: -18, opacity: 0 }
            }
            transition={{ ...spring, damping: 15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/akaka.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.span>

          {/* A */}
          <motion.span
            className="font-display text-8xl font-semibold leading-none text-ink"
            initial={{ y: -110, opacity: 0, rotate: -8 }}
            animate={
              beat >= 2
                ? { x: -14, y: 0, opacity: 1, rotate: 0 }
                : beat >= 1
                  ? { x: 0, y: 0, opacity: 1, rotate: 0 }
                  : { y: 0, opacity: 1, rotate: 0 }
            }
            transition={{ ...spring, delay: 0 }}
          >
            A
          </motion.span>
          {/* F */}
          <motion.span
            className="font-display text-8xl font-semibold leading-none text-violet"
            initial={{ y: 130, opacity: 0, rotate: 10 }}
            animate={
              beat >= 1
                ? { x: 0, y: 0, opacity: 1, rotate: 0 }
                : { y: 130, opacity: 0, rotate: 10 }
            }
            transition={{ ...spring, delay: beat >= 1 ? 0 : 0.35 }}
          >
            F
          </motion.span>
        </div>

        {/* Name — shows once the letters lock (beat 3) */}
        <motion.p
          className="mt-2 font-mono text-xs uppercase tracking-[0.4em] text-ink"
          initial={{ opacity: 0, y: 8 }}
          animate={beat >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          Akaka Favour
        </motion.p>

        {/* Handwritten line — writes in at beat 5 */}
        <motion.p
          className="mt-3 font-hand text-3xl leading-none text-ink"
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          animate={
            beat >= 5
              ? { opacity: 1, y: 0, rotate: -2 }
              : { opacity: 0, y: 10, rotate: -2 }
          }
          transition={{ duration: 0.35 }}
        >
          i build things — then make them work.
        </motion.p>
      </div>

      {/* Asterisk + square beat — the original sequence, last act */}
      {beat >= 6 && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            beat >= 7 ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            className="grid h-24 w-24 place-items-center"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`h-20 w-20 ${beat >= 7 ? "text-ink" : "text-violet"}`}
            >
              {[
                "M12 2.5v19",
                "m3.8 7.25 16.4 9.5",
                "M20.2 7.25 3.8 16.75",
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="currentColor"
                  strokeWidth={2.8}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      duration: 0.35,
                      delay: i * 0.08,
                      ease: [0.65, 0, 0.35, 1],
                    },
                    opacity: { duration: 0.01, delay: i * 0.08 },
                  }}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      )}

      {/* Word cycle — masked slide-up on each beat */}
      <div className="absolute bottom-[20%] overflow-hidden">
        <motion.p
          key={WORDS[word]}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.3, ease: [0.34, 1.3, 0.64, 1] }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-ink"
        >
          {WORDS[word]}
        </motion.p>
      </div>

      {/* Corner labels */}
      <p className="eyebrow absolute bottom-6 left-6 text-muted">
        Akaka Favour
      </p>
      <p className="eyebrow absolute bottom-6 right-6 text-muted">
        Portfolio — 2026
      </p>
    </motion.div>
  );
}
