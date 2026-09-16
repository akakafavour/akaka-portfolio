"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import {
  Asterisk,
  ChatIcon,
  ClockIcon,
  CodeIcon,
  DocIcon,
  HandArrow,
  PencilIcon,
  RocketIcon,
} from "./Glyphs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  num: string;
  label: string;
  heading: string;
  body: string;
  art: React.ReactNode;
  icon: React.ReactNode;
  days: string;
};

/* Copy is EXACT from the approved mockup — do not paraphrase.
   Illustrations are inline line-art in the brand palette (ink strokes,
   yellow + violet accents) — neutral craft imagery, deliberately NOT
   dev/code-focused: a brief is a conversation, build is blocks, ship is
   a paper plane, grow is a rising line. */
const STEPS: Step[] = [
  {
    num: "01",
    label: "Brief",
    heading: "Understand your goals.",
    body: "We discuss your vision, audience, features and goals. I ask the right questions, so we build the right thing.",
    art: (
      <svg viewBox="0 0 260 120" fill="none" className="h-full w-full text-ink" aria-hidden="true">
        <rect x="18" y="22" width="120" height="64" rx="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M40 86v16l17-16" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M38 44h80M38 58h64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="152" y="46" width="88" height="44" rx="12" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="174" cy="68" r="3.5" fill="currentColor" />
        <circle cx="190" cy="68" r="3.5" fill="currentColor" />
        <circle cx="206" cy="68" r="3.5" fill="#F2B705" />
        <circle cx="228" cy="28" r="7" fill="#6C4CF1" />
      </svg>
    ),
    icon: <ChatIcon className="h-[18px] w-[18px]" />,
    days: "1–2 days",
  },
  {
    num: "02",
    label: "Design",
    heading: "Turn ideas into layouts.",
    body: "I create clean, modern designs that match your brand and audience. You'll get interactive mockups before we build.",
    art: (
      <svg viewBox="0 0 260 120" fill="none" className="h-full w-full text-ink" aria-hidden="true">
        <rect x="24" y="12" width="184" height="94" rx="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 34h184" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="37" cy="23" r="2.5" fill="currentColor" />
        <circle cx="47" cy="23" r="2.5" fill="currentColor" />
        <rect x="38" y="46" width="66" height="46" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M118 54h74M118 66h74M118 78h48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M168 78a20 20 0 0 1 20-20v20z" fill="#6C4CF1" />
        <rect x="216" y="90" width="20" height="8" fill="#F2B705" />
      </svg>
    ),
    icon: <PencilIcon className="h-[18px] w-[18px]" />,
    days: "2–4 days",
  },
  {
    num: "03",
    label: "Build",
    heading: "Bring it to life.",
    body: "I turn designs into fast, responsive builds using clean code and modern tools. You get a smooth experience, on every device.",
    art: (
      <svg viewBox="0 0 260 120" fill="none" className="h-full w-full text-ink" aria-hidden="true">
        <rect x="28" y="80" width="54" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <rect x="88" y="80" width="54" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <rect x="148" y="80" width="54" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <rect x="58" y="48" width="54" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <rect x="118" y="48" width="54" height="26" rx="4" fill="#F2B705" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" />
        <rect x="88" y="14" width="54" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
        <path d="M115 48v-8" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    ),
    icon: <CodeIcon className="h-[18px] w-[18px]" />,
    days: "3–7 days",
  },
  {
    num: "04",
    label: "Ship",
    heading: "Go live, get results.",
    body: "I deploy your build, set up analytics, optimize for performance and test everything. Then we launch and make sure it's running smoothly.",
    art: (
      <svg viewBox="0 0 260 120" fill="none" className="h-full w-full text-ink" aria-hidden="true">
        <path d="M30 98c26-4 52-13 76-30" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round" />
        <path d="M212 16 118 56l32 10 5 28 17-21 25 10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M150 66l56-44" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="62" cy="88" r="5" fill="#F2B705" />
        <circle cx="88" cy="78" r="4" fill="#F2B705" opacity="0.6" />
        <circle cx="38" cy="96" r="3" fill="#F2B705" opacity="0.35" />
      </svg>
    ),
    icon: <RocketIcon className="h-[18px] w-[18px]" />,
    days: "1–2 days",
  },
  {
    num: "05",
    label: "Grow",
    heading: "Launch isn't the finish line.",
    body: "I hand over all the files, credentials and documentation you need. Then I check where visitors stop converting, and fix the leak.",
    art: (
      <svg viewBox="0 0 260 120" fill="none" className="h-full w-full text-ink" aria-hidden="true">
        <path d="M34 98h192" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 98V82M94 98V68M136 98V54M178 98V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 58c40-10 74-24 114-42" stroke="#6C4CF1" strokeWidth="3" strokeLinecap="round" />
        <path d="M146 22l14-7-2 16" stroke="#6C4CF1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="206" cy="26" r="7" fill="#F2B705" />
      </svg>
    ),
    icon: <DocIcon className="h-[18px] w-[18px]" />,
    days: "Ongoing",
  },
];

/**
 * THE P✳PELINE — mockup-locked. Giant outlined display title, five white
 * cards (labels above, yellow dots on top corners, illustrations are staged
 * crops) connected by a yellow dotted rail with a moving progress marker.
 * Desktop (≥1024px, motion allowed): GSAP ScrollTrigger pin + horizontal
 * scrub + pointer drag. Mobile / reduced motion: scroll-snap swipe + arrows.
 */
export default function Process() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dragState = useRef<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"snap" | "gsap">("gsap");

  useEffect(() => {
    // The pinned horizontal experience on EVERY screen — touch scrolling
    // drives ScrollTrigger scrub natively. Only reduced motion falls back
    // to the swipe row.
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const apply = () => setMode(mq.matches ? "gsap" : "snap");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (mode !== "gsap") return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (markerRef.current) {
            markerRef.current.style.left = `${8 + self.progress * 84}%`;
          }
          const active = Math.round(self.progress * tickRefs.current.length);
          tickRefs.current.forEach((tick, i) => {
            tick?.classList.toggle("bg-accent", i < active);
            tick?.classList.toggle("bg-line", i >= active);
          });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { clearProps: "x" });
    };
  }, [mode]);

  // Pointer drag on desktop: dragging left/right scrubs the pinned timeline.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "gsap") return;
    dragState.current = { x: e.clientX, y: window.scrollY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "gsap" || !dragState.current) return;
    const dx = dragState.current.x - e.clientX;
    window.scrollTo(0, dragState.current.y + dx * 1.4);
  };
  const endDrag = () => {
    dragState.current = null;
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const width = card
      ? card.getBoundingClientRect().width + 32
      : track.clientWidth * 0.8;
    track.scrollBy({
      left: dir * width,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-bg min-h-screen lg:h-screen"
    >
      <div className="flex h-full flex-col py-14 lg:py-8">
        <div className="mx-auto w-full max-w-6xl shrink-0 px-4 sm:px-6">
          <SectionEyebrow label="The pipeline" />

          <div className="mt-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
            <p className="hidden max-w-xs font-mono text-xs uppercase leading-loose tracking-[0.12em] text-muted lg:block">
              A clear, proven process from idea to launch. No guesswork.
            </p>
            <div aria-hidden="true" className="hidden w-40 self-end sm:block">
              <p className="font-hand text-2xl leading-[1.05] text-ink">
                From idea
                <br />
                to live. Then better.
              </p>
              <HandArrow className="ml-2 mt-0 w-9 -scale-x-100 rotate-[24deg] text-accent" />
            </div>
          </div>

          {/* Giant outlined display title — violet SVG asterisk replaces the I */}
          <h2
            id="process-heading"
            className="metallic text-center font-display text-[clamp(3.25rem,11vw,9rem)] font-semibold uppercase leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:2px_var(--color-ink)]"
          >
            The P
            <Asterisk
              aria-hidden="true"
              className="mx-[0.04em] inline-block h-[0.62em] w-[0.62em] -translate-y-[0.04em] text-violet [-webkit-text-stroke:0]"
            />
            pline
          </h2>
        </div>

        {/* Maxime-style tick ruler — desktop progress only */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1.5 lg:flex"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                tickRefs.current[i] = el;
              }}
              className="h-2.5 w-px bg-line transition-colors"
            />
          ))}
        </div>

        <div className="relative mt-6 flex-1 lg:mt-4">
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={
              mode === "gsap"
                ? "cursor-grab overflow-visible active:cursor-grabbing"
                : "snap-x snap-mandatory overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
            }
            style={mode === "snap" ? { scrollbarWidth: "none" } : undefined}
          >
            <div
              ref={trackRef}
              className="flex w-max items-stretch gap-10 px-6 sm:px-10"
            >
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="relative flex w-[300px] shrink-0 snap-center flex-col sm:w-[360px]"
                >
                  {/* Label ABOVE the card, per mockup — with icon chip */}
                  <p className="eyebrow mb-3 flex items-center gap-2.5 text-muted">
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink"
                    >
                      {step.icon}
                    </span>
                    {step.num}. {step.label}
                  </p>
                  <div className="relative flex flex-1 flex-col">
                    {/* Yellow dot on the card's top-left corner */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-1.5 -top-1.5 z-10 h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-bg"
                    />
                    <article className="flex flex-1 flex-col rounded-2xl border border-ink bg-surface p-5 shadow-[0_14px_30px_-16px_rgba(17,18,20,0.25)]">
                      <div className="grid h-40 place-items-center overflow-hidden rounded-lg border border-line bg-bg p-5">
                        {step.art}
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                        {step.heading}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                      <p className="eyebrow mt-5 flex items-center justify-between border-t border-line pt-4 text-muted">
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="h-3.5 w-3.5" />
                          {step.days}
                        </span>
                        <span className="flex items-center gap-2">
                          {step.num} / 05
                          <span aria-hidden="true" className="text-ink">
                            →
                          </span>
                        </span>
                      </p>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yellow dotted progress rail with moving marker (desktop) */}
          <div
            aria-hidden="true"
            className="relative mx-10 mt-10 hidden h-4 lg:block"
          >
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-dotted border-line" />
            {[0, 25, 50, 75, 100].map((p) => (
              <span
                key={p}
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-bg"
                style={{ left: `${p}%` }}
              />
            ))}
            <span
              ref={markerRef}
              className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pill ring-4 ring-bg ${
                mode === "gsap" ? "" : "hidden"
              }`}
              style={{ left: "8%" }}
            />
          </div>

          {/* Arrow controls — snap mode only (mobile + reduced motion) */}
          {mode === "snap" && (
            <div className="mt-8 flex justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous step"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink bg-surface text-ink transition-colors hover:bg-pill hover:text-on-ink"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next step"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink bg-surface text-ink transition-colors hover:bg-pill hover:text-on-ink"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>

        {/* Signature row — mockup-accurate */}
        <div className="mx-auto mt-12 flex w-full max-w-6xl shrink-0 flex-wrap items-center justify-between gap-4 px-4 sm:px-10">
          <p className="flex items-center gap-3">
            <Asterisk aria-hidden="true" className="h-7 w-7 text-ink" />
            <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-muted">
              Better process.
              <br />
              Better builds.
            </span>
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-pill underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
          >
            Let&apos;s build something great
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
