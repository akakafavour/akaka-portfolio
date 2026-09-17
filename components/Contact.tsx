/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "./Footer";
import SectionEyebrow from "./SectionEyebrow";

const GITHUB_URL = "https://github.com/akakafavour";
const X_URL = "https://x.com/AkakaFavour";
const LINKEDIN_URL = "https://www.linkedin.com/in/akaka-favour-490188291/";

const CHANNELS = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: "/icons/gmail.svg", external: false },
  { label: "LinkedIn", value: "akaka-favour", href: LINKEDIN_URL, icon: "/icons/linkedin.svg", external: true },
  { label: "X", value: "@AkakaFavour", href: X_URL, icon: "/icons/x.svg", external: true },
  { label: "GitHub", value: "github.com/akakafavour", href: GITHUB_URL, icon: "/icons/github.svg", external: true },
];

type SendState = "idle" | "sending" | "sent" | "fallback" | "error";

/**
 * Contact — v7: working form. Posts to /api/contact, which emails the
 * inquiry via Resend when RESEND_API_KEY is configured; without a key the
 * server returns delivered:false and the form falls back to a prefilled
 * email-client draft so the visitor's message is never lost.
 */
export default function Contact() {
  const [state, setState] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok && json.delivered) {
        setState("sent");
        form.reset();
      } else if (json.ok && !json.delivered) {
        // Delivery not configured yet — hand off to the email client.
        const subject = encodeURIComponent(
          `Project inquiry from ${payload.name}`,
        );
        const body = encodeURIComponent(
          `${payload.message}\n\n— ${payload.name}\n${payload.email}`,
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setState("fallback");
      } else {
        setErrorMsg(json.error ?? "Something went wrong.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error — email me directly instead.");
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionEyebrow label="Contact" />

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Left — the pitch + direct channels */}
        <div>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            Tell me what
            <br />
            your business
            <br />
            needs.
            <AsteriskMark />
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            One message is enough. Send your business name and what you&apos;re
            trying to fix or build. You get an honest answer on price,
            timeline and the first thing I&apos;d fix, usually the same day.
          </p>

          <p className="eyebrow mt-10 text-muted">Or just say hi</p>
          <div className="mt-4 grid content-start gap-2.5">
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-4 rounded-xl border border-ink bg-surface px-5 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-tint"
              >
                <span className="flex items-center gap-3.5">
                  <img
                    src={channel.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5"
                    loading="lazy"
                  />
                  <span className="text-sm font-semibold text-ink">
                    {channel.label}
                  </span>
                </span>
                <span className="text-right text-sm text-muted">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
          <p className="eyebrow mt-5 leading-relaxed text-muted">
            Whichever channel you pick, you get me, not a form queue.
          </p>
        </div>

        {/* Right — the form */}
        <form
          data-form-version="v8"
          onSubmit={onSubmit}
          className="grid content-start gap-4 rounded-2xl border border-ink bg-surface p-6 shadow-[0_24px_48px_-28px_rgba(17,18,20,0.3)] sm:p-8"
        >
          <div className="grid gap-1.5">
            <label htmlFor="contact-name" className="eyebrow text-muted">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="rounded-lg border border-ink bg-bg px-4 py-3 text-ink outline-none transition-shadow placeholder:text-muted/60 focus:ring-2 focus:ring-accent"
              placeholder="Adaeze Okafor"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-email" className="eyebrow text-muted">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-lg border border-ink bg-bg px-4 py-3 text-ink outline-none transition-shadow placeholder:text-muted/60 focus:ring-2 focus:ring-accent"
              placeholder="you@business.com"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-message" className="eyebrow text-muted">
              What do you need?
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="rounded-lg border border-ink bg-bg px-4 py-3 text-ink outline-none transition-shadow placeholder:text-muted/60 focus:ring-2 focus:ring-accent"
              placeholder="We run 12 short-let apartments in Lekki. Our site gets visits but no bookings."
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="on-accent mt-1 w-fit rounded-full bg-accent px-8 py-3.5 font-semibold text-pill transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
          >
            {state === "sending" ? "Sending…" : "Send message"}
          </button>

          {state === "sent" && (
            <p className="text-sm font-semibold text-ink" role="status">
              ✓ Message sent. You get an answer, usually the same day.
            </p>
          )}
          {state === "fallback" && (
            <p className="text-sm font-semibold text-ink" role="status">
              ✓ Opening your email app with the message prefilled — just hit
              send.
            </p>
          )}
          {state === "error" && (
            <p className="text-sm font-semibold text-ink" role="alert">
              ✗ {errorMsg}
            </p>
          )}

          <p className="eyebrow leading-relaxed text-muted">
            Hate forms? Email me directly:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-pill underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

function AsteriskMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      aria-hidden="true"
      className="ml-2 inline-block h-[0.5em] w-[0.5em] -translate-y-[0.08em] text-violet"
    >
      <path d="M12 2.5v19" />
      <path d="m3.8 7.25 16.4 9.5" />
      <path d="M20.2 7.25 3.8 16.75" />
    </svg>
  );
}
