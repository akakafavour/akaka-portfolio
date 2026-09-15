"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import BeforeSite from "./BeforeSite";
import AfterSite from "./AfterSite";
import ProjectLoop from "./ProjectLoop";
import { ArrowRight } from "./Arrows";
import { Asterisk, HandArrow, ScribbleUnderline } from "./Glyphs";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node",
  "Supabase",
  "AWS",
];

/**
 * Hero — mockup-locked: two-line uppercase masked headline with violet SVG
 * asterisk + scribble-underline SVG stroke, mono intro + "View my work"
 * flanking the before/after reveal (two JSX mini-sites; the modern side
 * wipes across the dated one as you scroll — no handle, no divider) over
 * the giant yellow disc, Caveat annotation + curved arrow, stack list on
 * the right edge.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  // Gate the entrance on the preloader's handoff ("af:reveal") so the
  // headline mask-reveal happens in front of the visitor, not behind the
  // overlay. Failsafe: reveal anyway after 3s no matter what.
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      sessionStorage.getItem("af-loaded") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealed(true);
      return;
    }
    const onReveal = () => setRevealed(true);
    window.addEventListener("af:reveal", onReveal);
    const failsafe = window.setTimeout(() => setRevealed(true), 3800);
    return () => {
      window.removeEventListener("af:reveal", onReveal);
      window.clearTimeout(failsafe);
    };
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const discY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  // The before/after wipe is driven by PAGE scroll, not the slider's own
  // position: at entry the visitor sees only the dated site; the first
  // ~700px of scrolling smoothly wipes it to the redesign. A spring keeps
  // it fluid instead of glued to the wheel.
  const wipe = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 1]), {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const lineReveal = (delay: number) => ({
    initial: reduce || !revealed ? { y: "110%" } : { y: "0%" },
    animate: revealed ? { y: "0%" } : { y: "110%" },
    transition: { ...SPRING, delay: revealed ? delay : 0 },
  });

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-16 pt-32 sm:px-6 sm:pt-40"
    >
      {/* Giant masked headline */}
      <h1
        id="hero-heading"
        className="metallic relative font-display text-[clamp(2.3rem,5.2vw,4.6rem)] font-semibold uppercase leading-[1.06] tracking-tight"
      >
        <span className="block overflow-hidden pb-1">
          <motion.span className="block" {...lineReveal(0.15)}>
            What you build{" "}
            <Asterisk className="mx-[0.02em] inline-block h-[0.58em] w-[0.58em] -translate-y-[0.03em] text-violet" />{" "}
            should
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-1">
          <motion.span className="block" {...lineReveal(0.26)}>
            make you money,
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-3">
          <motion.span className="block" {...lineReveal(0.37)}>
            <span className="relative inline-block">
              not just look good.
              <ScribbleUnderline className="absolute -bottom-3 left-0 w-full text-accent" />
            </span>
          </motion.span>
        </span>
      </h1>

      {/* Slider row flanked by mono intro (left) and stack list (right) */}
      <div className="relative mt-14 lg:mt-20">
        <motion.div
          initial={reduce || !revealed ? { opacity: 0, y: 12 } : false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ ...SPRING, delay: revealed ? 0.15 : 0 }}
          className="xl:absolute xl:left-0 xl:top-1/2 xl:z-10 xl:max-w-[200px] xl:-translate-y-1/2"
        >
          <p className="font-mono text-xs uppercase leading-loose tracking-[0.12em] text-muted">
            Full-stack developer. I build things, then make them work.
          </p>
          <a
            href="#work"
            className="group mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
          >
            View my work
            <ArrowRight className="inline-block transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={reduce || !revealed ? { opacity: 0, scale: 0.96 } : false}
          animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ ...SPRING, delay: revealed ? 0.25 : 0 }}
          className="relative mx-auto max-w-3xl xl:ml-auto xl:max-w-[660px]"
        >
          {/* Giant yellow disc — parallax on scroll */}
          <motion.div
            aria-hidden="true"
            style={{ y: discY }}
            className="absolute -right-12 -top-24 -z-10 h-72 w-72 rounded-full bg-accent sm:-right-20 sm:h-[28rem] sm:w-[28rem]"
          />

          {/* Annotation: "before → after." (Caveat) + curved arrow */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-28 z-10 hidden w-44 sm:block"
          >
            <p className="font-hand text-[1.7rem] leading-[1.02] text-ink">
              before →
              <br />
              after.
            </p>
            <HandArrow className="ml-16 mt-1 w-12 rotate-[8deg] text-ink" />
          </div>

          <BeforeAfterSlider wipe={wipe} />

          <p className="eyebrow mt-4 text-muted">
            Sample redesign. It reveals as you scroll.
          </p>
        </motion.div>

        <motion.ul
          initial={reduce || !revealed ? { opacity: 0, y: 12 } : false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ ...SPRING, delay: revealed ? 0.35 : 0 }}
          aria-label="Stack"
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 xl:absolute xl:right-0 xl:top-1/2 xl:mt-0 xl:-translate-y-1/2 xl:flex-col xl:items-end xl:gap-2.5"
        >
          {STACK.map((item) => (
            <li
              key={item}
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
            >
              {item}
            </li>
          ))}
          <li aria-hidden="true" className="hidden lg:mt-3 lg:block lg:h-8 lg:w-px lg:bg-ink" />
        </motion.ul>
      </div>

      {/* Infinite project loop — fan energy, real function */}
      <ProjectLoop />
    </section>
  );
}

/**
 * Before/after reveal — two JSX/CSS mini-sites of the same fictional
 * "BloomHarbor" content (components/BeforeSite.tsx + AfterSite.tsx).
 * Scroll-driven: as the frame travels up the viewport, the modern side
 * smoothly wipes across the dated one — no handle, no divider line. A
 * spring on the scroll progress keeps the motion fluid. Black BEFORE/AFTER
 * tags at the bottom corners.
 */
function BeforeAfterSlider({
  wipe,
}: {
  wipe: MotionValue<number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      // reduced motion: show the full transformation, no wipe animation
      if (beforeRef.current)
        beforeRef.current.style.clipPath = "inset(0 100% 0 0)";
      return;
    }
    const unsub = wipe.on("change", (v) => {
      if (beforeRef.current)
        beforeRef.current.style.clipPath = `inset(0 ${v * 100}% 0 0)`;
    });
    return unsub;
  }, [wipe, reduce]);

  return (
    <div className="relative">
      <p className="sr-only">
        A sample redesign: as you scroll, a dated website smoothly transforms
        into a modern one.
      </p>
      <div
        ref={trackRef}
        className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-xl border border-ink bg-surface shadow-[0_30px_60px_-30px_rgba(17,18,20,0.35)]"
      >
        {/* AFTER — base layer (JSX mini-site, scales crisp) */}
        <div className="absolute inset-0" aria-hidden="true">
          <AfterSite />
          <span className="eyebrow absolute bottom-3 right-3 rounded bg-ink px-2.5 py-1 text-bg">
            After
          </span>
        </div>

        {/* BEFORE — top layer, wiped away by scroll (JSX mini-site) */}
        <div
          ref={beforeRef}
          className="absolute inset-0 z-[1]"
          style={{ clipPath: "inset(0 0% 0 0)" }}
          aria-hidden="true"
        >
          <BeforeSite />
          <span className="eyebrow absolute bottom-3 left-3 rounded bg-ink px-2.5 py-1 text-bg">
            Before
          </span>
        </div>
      </div>
    </div>
  );
}
