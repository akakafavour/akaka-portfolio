"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import HandAsset from "./HandAsset";
import BeforeSite from "./BeforeSite";
import AfterSite from "./AfterSite";
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

const FAN = [
  {
    src: "/work/munachi-hero.png",
    className: "left-1/2 top-10 w-52 -translate-x-[105%] -rotate-6 sm:w-60",
    parallax: 60,
  },
  {
    src: "/work/vartex-hero.png",
    className: "left-1/2 top-4 w-52 -translate-x-1/2 z-10 sm:w-64",
    parallax: 30,
  },
  {
    src: "/work/oivs-hero.png",
    className: "left-1/2 top-10 w-52 translate-x-[5%] rotate-[7deg] sm:w-60",
    parallax: 90,
  },
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
    const failsafe = window.setTimeout(() => setRevealed(true), 3000);
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
  const fanY1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -FAN[0].parallax]);
  const fanY2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -FAN[1].parallax]);
  const fanY3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -FAN[2].parallax]);
  const fanY = [fanY1, fanY2, fanY3];

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
        className="relative font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
      >
        <span className="block overflow-hidden pb-1">
          <motion.span className="block" {...lineReveal(0.15)}>
            Your website{" "}
            <Asterisk className="mx-[0.02em] inline-block h-[0.58em] w-[0.58em] -translate-y-[0.03em] text-violet" />{" "}
            Should
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-3">
          <motion.span className="block" {...lineReveal(0.28)}>
            <span className="relative inline-block">
              Bring you work.
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
          className="lg:absolute lg:left-0 lg:top-1/2 lg:z-10 lg:max-w-[240px] lg:-translate-y-1/2"
        >
          <p className="font-mono text-xs uppercase leading-loose tracking-[0.12em] text-muted">
            Modern, fast &amp; conversion-focused websites for creators,
            startups and businesses.
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
          className="relative mx-auto max-w-3xl"
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
              real projects.
              <br />
              real results.
            </p>
            <HandArrow className="ml-16 mt-1 w-12 rotate-[8deg] text-ink" />
          </div>

          <BeforeAfterSlider />

          <p className="eyebrow mt-4 text-muted">
            Fictional demo — drag the handle. This is what I do to dated
            websites.
          </p>
        </motion.div>

        <motion.ul
          initial={reduce || !revealed ? { opacity: 0, y: 12 } : false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ ...SPRING, delay: revealed ? 0.35 : 0 }}
          aria-label="Stack"
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:items-end lg:gap-2.5"
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

      {/* Fanned real screenshots — parallax drift (decorative) */}
      <div
        aria-hidden="true"
        className="relative mx-auto mt-20 hidden h-44 max-w-3xl sm:block lg:h-52"
      >
        {FAN.map((card, i) => (
          <motion.div
            key={card.src}
            style={{ y: fanY[i] }}
            className={`absolute overflow-hidden rounded-lg border border-ink bg-surface shadow-[0_18px_40px_-18px_rgba(17,18,20,0.35)] transition-transform duration-300 hover:z-20 hover:rotate-0 ${card.className}`}
          >
            <HandAsset
              src={card.src}
              alt=""
              className="h-36 w-full object-cover object-top sm:h-40"
            />
          </motion.div>
        ))}
      </div>
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
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
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
          className="absolute inset-0 z-[1]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <BeforeSite />
          <span className="eyebrow absolute bottom-3 left-3 rounded bg-ink px-2.5 py-1 text-bg">
            Before
          </span>
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-ink"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />

        {/* Handle — black round badge, keyboard-operable */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after divider. Left arrow shows more of the old site. Right arrow shows more of the redesign."
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% of the old site visible`}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-bg bg-ink text-bg shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <ChevronGrips className="h-[18px] w-[18px]" />
        </div>
      </div>
    </div>
  );
}
