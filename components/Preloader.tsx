"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Preloader v3 — v2's content (A+F lockup, name, portrait, handwritten line)
 * fused with v1's hand-drawn animation quality: draw-on strokes, smooth
 * rotation, square morph, and a soft exit fade.
 *
 * Timeline (≈3.8s, once per session, skipped under reduced motion):
 *   0.00  yellow disc pops in behind the lockup (spring overshoot)
 *   0.30  "A" drops in with rotation settle
 *   0.60  "F" drops in with rotation settle
 *   0.90  A+F lockup settles together
 *   1.20  "Akaka Favour" name fades up
 *   1.55  portrait disc pops in with tilt settle
 *   1.90  handwritten line writes in
 *   2.30  asterisk draws itself (3 staggered strokes) + rotates
 *   2.60  rounded-square draws around the asterisk
 *   3.00  square releases, asterisk settles + pulses
 *   3.40  WIPE: background floods yellow
 *   3.80  overlay fades out smoothly → page revealed, "af:reveal" fires
 */
const WORDS = ["Design", "Build", "Ship", "Ready"];

// Softer springs — less bouncy, more fluid than v2's 320/17
const springSoft = { type: "spring", stiffness: 220, damping: 26 } as const;
const springLetter = { type: "spring", stiffness: 260, damping: 24 } as const;

export default function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<
    "hidden" | "play" | "wipe" | "done"
  >("hidden");
  const [beat, setBeat] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduce || sessionStorage.getItem("af-loaded")) return;
    sessionStorage.setItem("af-loaded", "1");
    setPhase("play");
    const at = (ms: number, fn: () => void) =>
      window.setTimeout(fn, ms);
    const timers = [
      at(300, () => setBeat(1)),
      at(600, () => setBeat(2)),
      at(900, () => setBeat(3)),
      at(1200, () => setBeat(4)),
      at(1550, () => setBeat(5)),
      at(1900, () => setBeat(6)),
      at(2300, () => setBeat(7)),
      at(2600, () => setBeat(8)),
      at(3000, () => setBeat(9)),
      at(3400, () => setPhase("wipe")),
      at(3800, () => {
        setPhase("done");
        window.dispatchEvent(new Event("af:reveal"));
      }),
      ...WORDS.map((_, i) => at(200 + i * 750, () => setWord(i))),
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
      {/* Yellow disc — v1 opening beat, sits behind the lockup */}
      <motion.span
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full bg-accent sm:h-96 sm:w-96"
        initial={{ scale: 0 }}
        animate={{
          scale: wiping ? 1.15 : beat >= 1 ? 1 : 0,
          opacity: [1, 1, 0],
        }}
        transition={{
          scale: { ...springSoft, damping: 20 },
          opacity: { duration: 0.8, times: [0, 0.55, 1] },
        }}
      />

      {/* The lockup: A + F letters, portrait disc, handwritten line */}
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-36 items-end justify-center">
          {/* Portrait disc — pops in with tilt settle */}
          <motion.span
            className="absolute -right-24 top-0 block h-24 w-24 overflow-hidden rounded-full border-[3px] border-ink shadow-[0_18px_40px_-18px_rgba(17,18,20,0.45)]"
            initial={{ scale: 0, rotate: -18, opacity: 0 }}
            animate={
              beat >= 5
                ? { scale: 1, rotate: 6, opacity: 1 }
                : { scale: 0, rotate: -18, opacity: 0 }
            }
            transition={{ ...springSoft, damping: 20 }}
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
              beat >= 3
                ? { x: -14, y: 0, opacity: 1, rotate: 0 }
                : beat >= 1
                  ? { x: 0, y: 0, opacity: 1, rotate: 0 }
                  : { y: 0, opacity: 1, rotate: 0 }
            }
            transition={{ ...springLetter, delay: 0 }}
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
            transition={{ ...springLetter, delay: beat >= 1 ? 0 : 0.3 }}
          >
            F
          </motion.span>
        </div>

        {/* Name — shows once the letters lock */}
        <motion.p
          className="mt-2 font-mono text-xs uppercase tracking-[0.4em] text-ink"
          initial={{ opacity: 0, y: 8 }}
          animate={beat >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          Akaka Favour
        </motion.p>

        {/* Handwritten line — writes in */}
        <motion.p
          className="mt-3 font-hand text-3xl leading-none text-ink"
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          animate={
            beat >= 6
              ? { opacity: 1, y: 0, rotate: -2 }
              : { opacity: 0, y: 10, rotate: -2 }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          websites that bring you work.
        </motion.p>
      </div>

      {/* Asterisk + square morph — v1 signature, now smoother */}
      {beat >= 7 && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
            beat >= 9 ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            className="relative grid h-32 w-32 place-items-center"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springSoft, damping: 20 }}
          >
            {/* Rounded-square — draws around the asterisk (v1 technique) */}
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
                animate={
                  beat >= 9
                    ? { pathLength: 0, opacity: 0 }
                    : beat >= 8
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: {
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1],
                  },
                  opacity: { duration: 0.01 },
                }}
              />
            </motion.svg>

            {/* Asterisk — draws itself + rotates smoothly (v1) */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-20 w-20"
              animate={{ rotate: wiping ? 90 : beat >= 9 ? 0 : [0, -30, 0] }}
              transition={{
                rotate: { duration: wiping ? 0.32 : 1.1, ease: [0.65, 0, 0.35, 1] },
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
                      delay: i * 0.09,
                      ease: [0.65, 0, 0.35, 1],
                    },
                    opacity: { duration: 0.01, delay: i * 0.09 },
                  }}
                />
              ))}
            </motion.svg>
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
