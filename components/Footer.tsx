"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Asterisk } from "./Glyphs";

const EMAIL_URL = "mailto:[AKAKA-EMAIL]";
const X_URL = "https://x.com/[X-HANDLE]";
const GITHUB_URL = "https://github.com/Akakaui";
const WHATSAPP_URL = "https://wa.me/REPLACE_WITH_NUMBER";

const LINKS = [
  { label: "Email", href: EMAIL_URL, icon: "/icons/gmail.svg", external: false },
  { label: "X", href: X_URL, icon: "/icons/x.svg", external: true },
  { label: "GitHub", href: GITHUB_URL, icon: "/icons/github.svg", external: true },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: "/icons/whatsapp.svg", external: true },
];

/**
 * Black mega footer — mockup-accurate: "✳ Let's Build Something Great" +
 * supporting line + magnetic yellow "Get in Touch →" + BUILD / DESIGN /
 * DEPLOY + links row + © 2026 Akaka Favour. Magnetic pull is ≤8px,
 * pointer:fine only, disabled under reduced motion.
 */
export default function Footer() {
  const reduce = useReducedMotion();
  const [magnetic, setMagnetic] = useState(false);
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    setMagnetic(mq.matches);
  }, [reduce]);

  const pull = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    x.set(Math.max(-8, Math.min(8, dx)));
    y.set(Math.max(-8, Math.min(8, dy)));
  };
  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <footer className="border-t border-ink bg-ink">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr_auto]">
        <p className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-bg">
          <Asterisk
            aria-hidden="true"
            className="mr-1 inline-block h-[0.55em] w-[0.55em] -translate-y-[0.05em] text-accent"
          />{" "}
          Let&apos;s Build Something Great
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-bg/70">
          Got a project, idea, or just want to say hi? I&apos;m always open to
          new opportunities and collaborations.
        </p>
        <motion.a
          href="#contact"
          style={{ x, y }}
          onPointerMove={pull}
          onPointerLeave={release}
          className="group on-accent inline-flex w-fit items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-ink transition-colors hover:bg-accent-hover"
        >
          Get in Touch
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.a>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="eyebrow text-muted">Build / Design / Deploy</p>
          <p className="eyebrow text-muted">© 2026 Akaka Favour</p>
        </div>
        <nav
          aria-label="Footer"
          className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-2"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-bg"
            >
              <img
                src={link.icon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 invert"
                loading="lazy"
              />
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
