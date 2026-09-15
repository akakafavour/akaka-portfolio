"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import HandAsset from "./HandAsset";
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
  image: string;
  icon: React.ReactNode;
  days: string;
};

/* Copy is EXACT from the approved mockup — do not paraphrase.
   Illustrations are client-cropped PNGs staged in public/assets/. */
const STEPS: Step[] = [
  {
    num: "01",
    label: "Brief",
    heading: "Understand your goals.",
    body: "We discuss your vision, audience, features and goals. I ask the right questions, so we build the right thing.",
    image: "/assets/pipeline-brief.png",
    icon: <ChatIcon className="h-[18px] w-[18px]" />,
    days: "1–2 days",
  },
  {
    num: "02",
    label: "Design",
    heading: "Turn ideas into layouts.",
    body: "I create clean, modern designs that match your brand and audience. You'll get interactive mockups before we build.",
    image: "/assets/pipeline-design.png",
    icon: <PencilIcon className="h-[18px] w-[18px]" />,
    days: "2–4 days",
  },
  {
    num: "03",
    label: "Build",
    heading: "Bring it to life.",
    body: "I turn designs into fast, responsive websites using clean code and modern tools. You get a smooth experience, on every device.",
    image: "/assets/pipeline-build.png",
    icon: <CodeIcon className="h-[18px] w-[18px]" />,
    days: "3–7 days",
  },
  {
    num: "04",
    label: "Ship",
    heading: "Go live, get results.",
    body: "I deploy your site, set up analytics, optimize for performance and test everything. Then we launch and make sure it's running smoothly.",
    image: "/assets/pipeline-ship.png",
    icon: <RocketIcon className="h-[18px] w-[18px]" />,
    days: "1–2 days",
  },
  {
    num: "05",
    label: "Grow",
    heading: "Launch isn't the finish line.",
    body: "I hand over all the files, credentials and documentation you need. Then I check where visitors stop converting, and fix the leak.",
    image: "/assets/pipeline-handoff.png",
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
        scrub: 1,
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
                to live site.
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
                      <div className="overflow-hidden rounded-lg border border-line">
                        <HandAsset
                          src={step.image}
                          alt={`${step.label} step illustration`}
                          className="h-40 w-full object-cover"
                        />
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

          {/* Total-time strip — speed is the offer */}
          <p className="eyebrow mx-auto mt-6 flex w-fit items-center gap-2.5 rounded-full border border-ink bg-surface px-5 py-2.5 text-ink">
            <ClockIcon className="h-4 w-4 text-accent-hover" />
            Total: about 7–10 days to live
          </p>

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
              Better websites.
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
