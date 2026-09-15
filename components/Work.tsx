import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Arrows";

/**
 * Work — Honour-style presentation (v8.1): "Here's what I've been up to.",
 * clean 2-col grid of white tablet-bezel cards — screenshot, title,
 * one-line description, soft "View Project" pill. Cards link to their
 * individual case pages at /work/[slug]. Mobile: full-width stack.
 */
function TabletFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-[1.5rem] border border-ink/10 bg-white p-2.5 shadow-[0_24px_50px_-24px_rgba(17,18,20,0.4)] transition-shadow duration-300 group-hover:shadow-[0_34px_64px_-26px_rgba(17,18,20,0.5)]">
      <span aria-hidden="true" className="absolute left-2 top-2 h-1 w-1 rounded-full bg-pill/20" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-1 w-1 rounded-full bg-pill/20" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-pill/20" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-pill/20" />
      <div className="overflow-hidden rounded-[1rem] border border-line">
        {children}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionEyebrow label="/ My work" />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2
            id="work-heading"
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
          >
            Here&apos;s what I&apos;ve been up to.
          </h2>
        </Reveal>
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

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-8">
        {PROJECTS.map((project) => (
          <article key={project.slug} className="group flex flex-col">
            <Link
              href={`/work/${project.slug}`}
              aria-label={`Read the ${project.name} case study`}
              className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-2"
            >
              <TabletFrame>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-auto w-full"
                />
              </TabletFrame>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                {project.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {project.outcome}
              </p>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-bg px-5 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-all duration-200 group-hover:bg-accent group-hover:ring-accent">
                View Project
                <ArrowUpRight className="text-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
