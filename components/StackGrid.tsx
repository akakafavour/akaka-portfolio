/* eslint-disable @next/next/no-img-element */

/**
 * Tech stack — v6: a clean hairline grid of REAL brand SVGs (staged by the
 * engineer in public/logos/) with mono labels. Plain <img> on purpose:
 * next/image refuses SVG optimization without dangerouslyAllowSVG, and
 * these files are tiny already. Hover is a quiet paper-wash, nothing more.
 * Replaces the v5 mono StackStrip.
 */
const STACK = [
  { file: "/logos/nextdotjs.svg", label: "Next.js" },
  { file: "/logos/react.svg", label: "React" },
  { file: "/logos/typescript.svg", label: "TypeScript" },
  { file: "/logos/tailwindcss.svg", label: "Tailwind CSS" },
  { file: "/logos/nodedotjs.svg", label: "Node.js" },
  { file: "/logos/supabase.svg", label: "Supabase" },
  { file: "/logos/postgresql.svg", label: "PostgreSQL" },
  { file: "/logos/sanity.svg", label: "Sanity" },
  { file: "/logos/vercel.svg", label: "Vercel" },
  { file: "/logos/framer.svg", label: "Framer Motion" },
  { file: "/logos/gsap.svg", label: "GSAP" },
  { file: "/logos/amazonwebservices.svg", label: "AWS" },
];

export default function StackGrid() {
  return (
    <section
      aria-label="Tools and stack"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="eyebrow text-muted">Tools I build with</p>
        <ul className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-6">
          {STACK.map((tool) => (
            <li
              key={tool.label}
              className="group flex flex-col items-center justify-center gap-3 bg-surface px-3 py-7 transition-colors duration-200 hover:bg-bg"
            >
              <img
                src={tool.file}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-8 w-auto transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted transition-colors group-hover:text-ink">
                {tool.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
