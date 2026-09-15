/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";

/**
 * LogoMarquee — the workshop band (v9): every line of work gets its tools
 * on the wall — code (Next.js, React…), design (Figma), writing (Notion) —
 * in one slow seamless loop on ink. Silhouettes by default, full brand
 * color + lift on hover. The whole band drifts a few pixels opposite the
 * mouse — a quiet parallax, pointer:fine only.
 */
const TOOLS = [
  { file: "/logos/nextdotjs.svg", label: "Next.js" },
  { file: "/logos/react.svg", label: "React" },
  { file: "/logos/typescript.svg", label: "TypeScript" },
  { file: "/logos/figma.svg", label: "Figma" },
  { file: "/logos/tailwindcss.svg", label: "Tailwind CSS" },
  { file: "/logos/nodedotjs.svg", label: "Node.js" },
  { file: "/logos/supabase.svg", label: "Supabase" },
  { file: "/logos/postgresql.svg", label: "PostgreSQL" },
  { file: "/logos/notion.svg", label: "Notion" },
  { file: "/logos/sanity.svg", label: "Sanity" },
  { file: "/logos/vercel.svg", label: "Vercel" },
  { file: "/logos/framer.svg", label: "Framer Motion" },
  { file: "/logos/gsap.svg", label: "GSAP" },
  { file: "/logos/amazonwebservices.svg", label: "AWS" },
];

export default function LogoMarquee() {
  const driftRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!driftRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - r.left) / r.width - 0.5;
    driftRef.current.style.transform = `translateX(${ratio * -28}px)`;
  };
  const onMouseLeave = () => {
    if (driftRef.current) driftRef.current.style.transform = "translateX(0px)";
  };

  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={ariaHidden}>
      {TOOLS.map((tool) => (
        <img
          key={`${tool.label}-${ariaHidden}`}
          src={tool.file}
          alt={ariaHidden ? "" : tool.label}
          aria-hidden={ariaHidden}
          loading="lazy"
          className="h-7 w-auto brightness-0 invert opacity-40 transition-all duration-300 hover:-translate-y-1 hover:opacity-100 hover:brightness-100 hover:invert-0"
        />
      ))}
    </div>
  );

  return (
    <section
      aria-label="Tools and stack"
      className="overflow-hidden border-t border-ink bg-pill py-12"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <p className="eyebrow mx-auto mb-8 w-full max-w-6xl px-4 text-muted sm:px-6">
        The workshop — every line of work, its tools.
      </p>
      <div ref={driftRef} className="transition-transform duration-300 ease-out">
        <div
          className="flex w-max animate-[projectloop_44s_linear_infinite] will-change-transform motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
