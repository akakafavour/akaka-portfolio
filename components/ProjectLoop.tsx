/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ArrowUpRight } from "./Arrows";

/**
 * ProjectLoop — the fan strip, rebuilt (v7): the three projects as proper
 * browser-framed cards in a continuously drifting infinite row. Slight
 * alternating tilt keeps the fan energy; hover pauses the drift, straightens
 * and lifts the card. Click → the project's case page. Seamless loop via a
 * duplicated half translated -50%; reduced motion freezes the drift.
 */
export default function ProjectLoop() {
  const half = (ariaHidden: boolean) => (
    <div className="flex shrink-0 gap-8 pr-8" aria-hidden={ariaHidden}>
      {PROJECTS.map((project, i) => (
        <Link
          key={`${project.slug}-${i}`}
          href={`/work/${project.slug}`}
          tabIndex={ariaHidden ? -1 : 0}
          className={`group relative block w-[320px] shrink-0 transition-transform duration-300 hover:z-10 hover:rotate-0 hover:-translate-y-2 sm:w-[380px] ${
            i % 2 === 0 ? "-rotate-[2.5deg]" : "rotate-[2.5deg]"
          }`}
        >
          <div className="overflow-hidden rounded-xl border border-ink bg-surface shadow-[0_18px_40px_-18px_rgba(17,18,20,0.35)] transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-22px_rgba(17,18,20,0.4)]">
            <div className="flex items-center gap-3 border-b border-line bg-bg px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="eyebrow flex-1 truncate rounded-full border border-line bg-surface px-3 py-1 text-muted">
                {project.urlLabel}
              </span>
            </div>
            <img
              src={project.image}
              alt={ariaHidden ? "" : `${project.name} website screenshot`}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-lg font-semibold text-ink">
              {project.name}
            </span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full border border-ink text-ink transition-colors group-hover:bg-accent"
            >
              <ArrowUpRight className="text-sm" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div
      aria-label="Selected work — opens the project pages"
      className="group relative mt-20 overflow-x-clip py-4"
    >
      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-28"
      />
      <div className="flex w-max animate-[projectloop_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
