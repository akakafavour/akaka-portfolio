"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HandAsset from "./HandAsset";
import Reveal from "./Reveal";
import { Asterisk, HandArrow } from "./Glyphs";

const GITHUB_URL = "https://github.com/Akakaui";

const CONTACT_ROWS = [
  { icon: "github", label: "github.com/Akakaui", href: GITHUB_URL, external: true },
  { icon: "x", label: "x.com/AkakaFavour", href: "https://x.com/AkakaFavour", external: true },
];

function ContactIcon({ name }: { name: string }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "mail")
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    );
  if (name === "pin")
    return (
      <svg {...common}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  if (name === "github")
    return (
      <svg {...common}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

/**
 * "My Signature" band — mockup-accurate 4-column layout: intro + exact
 * paragraph, taped grayscale portrait (crown doodle, "Building for what's
 * next." annotation), services column, and the Start-a-Project +
 * OR-JUST-SAY-HI column. Footer mono line row at the bottom.
 */
export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-y border-line bg-surface/60"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.9fr_0.95fr] lg:gap-10">
          {/* Intro column */}
          <div>
            <p className="eyebrow text-muted">
              <span className="text-accent">●</span> My signature
            </p>
            <Reveal className="mt-5">
              <h2
                id="about-heading"
                className="font-display text-[clamp(2rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-tight"
              >
                I Turn Ideas Into Working Websites.{" "}
                <Asterisk
                  aria-hidden="true"
                  className="inline-block h-[0.5em] w-[0.5em] -translate-y-[0.05em] text-violet"
                />
              </h2>
            </Reveal>
            <p className="mt-5 leading-relaxed text-muted">
              Three years in, I stopped treating &ldquo;building the site&rdquo;
              and &ldquo;making it work&rdquo; as two different jobs. Now I
              design, build, and fix the system behind it, for SaaS founders
              and digital businesses who&apos;d rather not explain their
              problem twice to two different people.
            </p>
            <p className="mt-4 font-hand text-xl leading-snug text-ink">
              Currently deep in AI agent tooling, alongside client work.
            </p>
          </div>

          {/* Taped grayscale portrait */}
          <motion.figure
            initial={reduce ? false : { rotate: 7, opacity: 0 }}
            whileInView={{ rotate: 4, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative mx-auto w-full max-w-[240px] self-center"
          >
            {/* Two yellow tape strips on the top corners */}
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-2 z-10 h-6 w-14 -rotate-45 rounded-sm bg-accent/80"
            />
            <span
              aria-hidden="true"
              className="absolute -right-4 -top-2 z-10 h-6 w-14 rotate-45 rounded-sm bg-accent/80"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 40 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute -top-12 left-1/2 z-10 w-16 -translate-x-1/2 text-accent-hover"
            >
              <path d="M4 20 6 7l7 6 7-9 7 9 7-6 2 13Z" />
              <path d="M5 20h30" />
            </svg>
            <div className="border border-ink bg-surface p-2.5 shadow-[0_18px_40px_-20px_rgba(17,18,20,0.4)]">
              <Image
                src="/akaka.jpg"
                alt="Akaka Favour, side profile against a mustard-yellow backdrop"
                width={640}
                height={800}
                className="h-auto w-full grayscale"
              />
            </div>
            <div aria-hidden="true" className="absolute -bottom-14 -right-10 z-10 w-40">
              <p className="font-hand text-[1.55rem] leading-[1.05] text-ink">
                Building for
                <br />
                what&apos;s next.
              </p>
              <HandArrow className="ml-auto mt-1 w-9 -scale-x-100 -rotate-[20deg] text-accent-hover" />
            </div>
          </motion.figure>

          {/* CTA + OR JUST SAY HI column — services now live in their own section */}
          <div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-pill px-6 py-3.5 font-semibold text-on-ink transition-colors hover:bg-accent hover:text-ink"
            >
              Start a Project
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <p className="eyebrow mt-8 text-muted">Or just say hi</p>
            <ul className="mt-4 space-y-3">
              {CONTACT_ROWS.map((row) => {
                const content = (
                  <>
                    <span className="shrink-0 text-ink">
                      <ContactIcon name={row.icon} />
                    </span>
                    <span className="text-sm text-muted">{row.label}</span>
                  </>
                );
                return (
                  <li key={row.label} className="flex items-center gap-3">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="flex items-center gap-3 transition-colors hover:text-ink"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* The autograph — an actual signature, per the band's name */}
        <div className="mt-16 flex flex-col items-start gap-1 border-t border-line pt-8">
          <p
            aria-hidden="true"
            className="font-hand text-[2.6rem] leading-none text-ink -rotate-2"
          >
            Akaka Favour
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 180 12"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            className="ml-1 w-44 text-accent"
          >
            <path d="M3 8c30-5 62 3 92-2 26-4 52-2 82 2" strokeWidth={2.5} />
            <path d="M60 10c20 1 44-1 64-3" strokeWidth={1.4} />
          </svg>
          <p className="eyebrow mt-2 text-muted">
            Akaka Favour. I build it. I make it pay.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            I also write <span className="font-semibold text-ink">Ship &amp; Sell</span>,
            a newsletter about why products don&apos;t make money.
          </p>
        </div>
      </div>
    </section>
  );
}
