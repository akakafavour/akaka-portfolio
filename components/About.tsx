"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HandAsset from "./HandAsset";
import Reveal from "./Reveal";

const WHATSAPP_URL = "https://wa.me/REPLACE_WITH_NUMBER";
const EMAIL_URL = "mailto:[AKAKA-EMAIL]";
const X_URL = "https://x.com/[X-HANDLE]";
const GITHUB_URL = "https://github.com/Akakaui";

const SERVICES = [
  { name: "Custom Website Development", icon: "bolt" },
  { name: "Landing Pages & Funnels", icon: "code" },
  { name: "Web App Development", icon: "layers" },
  { name: "UI/UX Design & Redesign", icon: "sparkles" },
] as const;

function ServiceIcon({ name }: { name: (typeof SERVICES)[number]["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "bolt")
    return (
      <svg {...common}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    );
  if (name === "code")
    return (
      <svg {...common}>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      </svg>
    );
  if (name === "layers")
    return (
      <svg {...common}>
        <path d="m12 2 9 5-9 5-9-5 9-5z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

const CONTACT_ROWS = [
  { icon: "mail", label: "[AKAKA-EMAIL]", href: EMAIL_URL, external: false },
  { icon: "pin", label: "Port Harcourt, Nigeria (Remote OK)" },
  { icon: "github", label: "github.com/Akakaui", href: GITHUB_URL, external: true },
  { icon: "x", label: "x.com/[X-HANDLE]", href: X_URL, external: true },
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
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.9fr_0.95fr_0.85fr] lg:gap-10">
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
                <span aria-hidden="true" className="text-violet">✳</span>
              </h2>
            </Reveal>
            <p className="mt-5 leading-relaxed text-muted">
              I&apos;m a freelance developer and designer focused on building
              clean, fast and high-converting websites. I care about details,
              performance and results.
            </p>
            <p className="mt-4 font-hand text-xl leading-snug text-ink">
              Now: building AI agent tooling and shipping client work from Port
              Harcourt.
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
            <HandAsset
              src="/hand/crown.png"
              alt=""
              className="absolute -top-14 left-1/2 z-10 w-20 -translate-x-1/2"
            />
            <div className="border border-ink bg-surface p-2.5 shadow-[0_18px_40px_-20px_rgba(17,18,20,0.4)]">
              <Image
                src="/akaka.jpg"
                alt="Akaka Favour, side profile against a mustard-yellow backdrop"
                width={640}
                height={800}
                className="h-auto w-full grayscale"
              />
            </div>
            <div aria-hidden="true" className="absolute -bottom-12 -right-8 w-36">
              <HandAsset
                src="/hand/note-building-next.png"
                alt="Building for what's next."
                className="w-full"
              />
              <HandAsset
                src="/hand/arrow-small.png"
                alt=""
                className="ml-auto mt-1 w-10"
              />
            </div>
          </motion.figure>

          {/* Services column — nav anchor #services */}
          <div id="services" className="scroll-mt-28">
            <p className="eyebrow text-muted">Let&apos;s work together</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">
              I build websites, landing pages and{" "}
              <span className="underline decoration-accent decoration-4 underline-offset-4">
                web apps
              </span>
              .
            </p>
            <ul className="mt-6 space-y-4">
              {SERVICES.map((service) => (
                <li key={service.name} className="flex items-center gap-3">
                  <span className="shrink-0 text-ink">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + OR JUST SAY HI column */}
          <div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3.5 font-semibold text-bg transition-colors hover:bg-accent hover:text-ink"
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

        {/* Footer mono line row — mockup-accurate */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <p className="eyebrow text-muted">
            © 2026 Akaka Favour. All rights reserved.
          </p>
          <p className="eyebrow text-muted">Build / Design / Deploy</p>
        </div>
      </div>
    </section>
  );
}
