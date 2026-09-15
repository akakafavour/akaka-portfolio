import Reveal from "./Reveal";
import { ArrowUpRight } from "./Arrows";

/**
 * Résumé — compact band after About. Dual purpose: a credibility artifact
 * for clients and a formal PDF for job applications. The PDF lives at
 * public/resume.pdf; until it's dropped in, the button links there anyway
 * (we draft the resume content with the client before designing it).
 */
export default function Resume() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-4 sm:px-6"
    >
      <Reveal className="mt-4">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="eyebrow text-muted">
              <span className="text-accent">●</span> The paper trail
            </p>
            <h2
              id="resume-heading"
              className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-tight text-ink"
            >
              Need the formal version?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              The one-page résumé — the degree, the builds, the results — for
              clients who need it and HR desks that ask.
            </p>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-pill px-6 py-3.5 font-semibold text-on-ink transition-colors hover:bg-accent hover:text-ink"
          >
            Download résumé
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
