"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import BeforeSite from "./BeforeSite";
import AfterSite from "./AfterSite";
import ProjectLoop from "./ProjectLoop";
import { ArrowRight, ChevronGrips } from "./Arrows";
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
 * flanking the before/after slider (two JSX mini-sites, black corner tags,
 * black round handle) over the giant yellow disc, Caveat annotation +
 * curved arrow, stack list on the right edge, and a fanned parallax strip
 * of real screenshots.
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

          {/* Annotation: "real projects. real results." (Caveat) + curved arrow */}
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

          <BeforeAfterSlider />

          <p className="eyebrow mt-4 text-muted">
            Sample redesign. Drag the handle.
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
 * Before/after slider — two JSX/CSS mini-sites of the same fictional
 * "BloomHarbor" content (components/BeforeSite.tsx + AfterSite.tsx; the v5
 * 370px PNG crops were blurry when scaled and are retired). One thin black
 * frame, black BEFORE/AFTER tags at the bottom corners, black round
 * ‹› handle, keyboard-operable.
 */
function BeforeAfterSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const posRef = useRef(100);
  const touched = useRef(false);
  const [hinting, setHinting] = useState(false);
  const reduce = useReducedMotion();
  const inView = useInView(trackRef, { once: true, amount: 0.4 });

  const applyPos = (next: number) => {
    // full 0–100 range — drag far enough and one side is completely revealed
    const clamped = Math.min(100, Math.max(0, next));
    posRef.current = clamped;
    if (beforeRef.current)
      beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
      handleRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)));
      handleRef.current.setAttribute(
        "aria-valuetext",
        `${Math.round(clamped)}% of the old site visible`
      );
    }
  };

  // Affordance: the moment the slider enters the viewport, the divider runs
  // one silent demo — glides toward the redesign and settles mid-frame — so
  // visitors see what the handle does without being told. Stops instantly
  // the moment they grab it. A soft ring pulse on the handle backs it up.
  useEffect(() => {
    if (inView) setHinting(true);
  }, [inView]);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    const D = 2600;
    const ease = (x: number) =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / D);
      let p: number;
      if (t < 0.45) p = 100 + (30 - 100) * ease(t / 0.45);
      else if (t < 0.75) p = 30 + (55 - 30) * ease((t - 0.45) / 0.3);
      else p = 55 + (46 - 55) * ease((t - 0.75) / 0.25);
      if (!touched.current) applyPos(p);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const markTouched = () => {
    if (!touched.current) {
      touched.current = true;
      setHinting(false);
    }
  };

  const setFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    applyPos(((clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div className="relative">
      <p className="sr-only">
        Interactive demo: a dated website transforms into a modern redesign as
        you drag the handle.
      </p>
      <div
        ref={trackRef}
        className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-xl border border-ink bg-surface shadow-[0_30px_60px_-30px_rgba(17,18,20,0.35)]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          dragging.current = true;
          markTouched();
          e.currentTarget.setPointerCapture(e.pointerId);
          e.preventDefault();
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        {/* AFTER — base layer (JSX mini-site, scales crisp) */}
        <div className="absolute inset-0" aria-hidden="true">
          <AfterSite />
          <span className="eyebrow absolute bottom-3 right-3 rounded bg-ink px-2.5 py-1 text-bg">
            After
          </span>
        </div>

        {/* BEFORE — top layer, clipped from the right (JSX mini-site) */}
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

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-ink"
          style={{ left: "100%" }}
          aria-hidden="true"
        />

        {/* Handle — black round badge, keyboard-operable */}
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label="Before and after divider. Left arrow shows more of the old site. Right arrow shows more of the redesign."
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={100}
          aria-valuetext="100% of the old site visible"
          aria-orientation="horizontal"
          onKeyDown={(e) => {
            markTouched();
            const step = e.shiftKey ? 10 : 4;
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              applyPos(posRef.current - step);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              applyPos(posRef.current + step);
            } else if (e.key === "Home") {
              e.preventDefault();
              applyPos(100);
            } else if (e.key === "End") {
              e.preventDefault();
              applyPos(0);
            }
          }}
          className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-bg bg-ink text-bg shadow-lg ${
            hinting ? "af-hint" : ""
          }`}
          style={{ left: "100%" }}
        >
          <ChevronGrips className="h-[18px] w-[18px]" />
        </div>
      </div>
    </div>
  );
}
