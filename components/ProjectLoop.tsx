/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import SectionEyebrow from "./SectionEyebrow";
import { ArrowUpRight } from "./Arrows";

/**
 * Work (v8.2) — THE work section: "Here's what I've been up to." heading +
 * the projects as white tablet-bezel cards in a continuously drifting
 * infinite row. Cards sit straight (no tilt), pause on hover, and open
 * their case pages. bg-surface keeps the bezels visible in dark mode.
 */
export default function ProjectLoop() {
  const half = (ariaHidden: boolean) => (
    <div className="flex shrink-0 gap-8 pr-8" aria-hidden={ariaHidden}>
      {PROJECTS.map((project) => (
        <Link
          key={`${project.slug}-${ariaHidden}`}
          href={`/work/${project.slug}`}
          tabIndex={ariaHidden ? -1 : 0}
          className="group relative block w-[320px] shrink-0 transition-transform duration-300 hover:-translate-y-2 sm:w-[380px]"
        >
          {/* White tablet bezel — Honour-style frame, straight */}
          <div className="relative rounded-[1.5rem] border border-line bg-surface p-2.5 shadow-[0_24px_50px_-24px_rgba(17,18,20,0.4)] transition-shadow duration-300 group-hover:shadow-[0_34px_64px_-26px_rgba(17,18,20,0.55)]">
            <span aria-hidden="true" className="absolute left-2 top-2 h-1 w-1 rounded-full bg-muted/40" />
            <span aria-hidden="true" className="absolute right-2 top-2 h-1 w-1 rounded-full bg-muted/40" />
            <span aria-hidden="true" className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-muted/40" />
            <span aria-hidden="true" className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-muted/40" />
            <div className="overflow-hidden rounded-[1rem] border border-line">
              <img
                src={project.image}
                alt={ariaHidden ? "" : `${project.name} website screenshot`}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
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
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.outcome}
          </p>
        </Link>
      ))}
    </div>
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionEyebrow label="/ My work" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="work-heading"
            className="metallic font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
          >
            Here&apos;s what I&apos;ve been up to.
          </h2>
          <a
            href="https://github.com/Akakaui"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
          >
            View all projects
            <ArrowUpRight className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="group relative mt-12 overflow-x-clip py-4">
        {/* Edge fades — kept minimal, just enough to hint the loop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent opacity-60 sm:w-14"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent opacity-60 sm:w-14"
        />
        <div className="flex w-max animate-[projectloop_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {half(false)}
          {half(true)}
        </div>
      </div>
    </section>
  );
}
