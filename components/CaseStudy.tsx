import SectionEyebrow from "./SectionEyebrow";

const WHATSAPP_URL = "https://wa.me/REPLACE_WITH_NUMBER";
const VARTEX_URL = "https://vartexarchitects.com";

const FACTS = [
  { label: "Client", value: "Vartex Architects" },
  { label: "Sector", value: "Architecture · Nigeria" },
  { label: "Scope", value: "Full digital presence" },
  { label: "Method", value: "Problem → Fix → Result" },
];

const STACK = ["Next.js 15", "Sanity CMS", "GSAP", "Resend", "Tailwind v4"];

/**
 * Case file 01, opened up — the Vartex deep-dive. Stack facts are real from
 * the repo README. Akaka's side of the story stays as visible placeholders;
 * nothing is invented.
 */
export default function CaseStudy() {
  return (
    <section
      id="vartex-story"
      aria-labelledby="case-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionEyebrow label="Case file 01 — opened up" />
      <h2
        id="case-heading"
        className="mx-auto mt-6 max-w-2xl text-center font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
      >
        Vartex Architects. A real firm, a live site.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-muted">
        Not just a website — a full digital presence from scratch: design, a
        Next.js 15 + Sanity CMS build, GSAP motion, copywriting, SEO, Google
        Business Profile, Resend email, and handoff docs the client can
        actually use.
      </p>

      <ul
        aria-label="Stack"
        className="mt-6 flex flex-wrap justify-center gap-1.5"
      >
        {STACK.map((tech) => (
          <li
            key={tech}
            className="cursor-default rounded-full border border-line bg-accent-tint px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Facts row */}
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 md:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow text-muted">{fact.label}</dt>
            <dd className="mt-1.5 text-sm font-medium text-text">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* PROBLEM / FIX / RESULT — the teardown method as structure */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-ink bg-surface p-5 shadow-[0_14px_30px_-16px_rgba(17,18,20,0.2)] sm:p-6">
          <p className="eyebrow text-muted">Problem</p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
            [AKAKA: what did the client need?]
          </p>
        </div>
        <div className="rounded-xl border border-ink bg-surface p-5 shadow-[0_14px_30px_-16px_rgba(17,18,20,0.2)] sm:p-6">
          <p className="eyebrow text-ink">Fix</p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
            [AKAKA: what did you build?]
          </p>
        </div>
        <div className="rounded-xl border border-ink bg-surface p-5 shadow-[0_14px_30px_-16px_rgba(17,18,20,0.2)] sm:p-6">
          <p className="eyebrow text-accent-hover">Result</p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
            [AKAKA: what changed?]
          </p>
        </div>
      </div>
      <p className="eyebrow mt-4 text-muted">
        Filled from a short call with me. The structure is the point: problem,
        fix, result.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={VARTEX_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-ink px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-pill hover:text-on-ink"
        >
          View the live site
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="on-accent inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-accent-hover"
        >
          Ask me about this project
        </a>
      </div>
    </section>
  );
}
