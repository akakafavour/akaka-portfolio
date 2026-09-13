import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { ArrowUpRight, ArrowRight } from "@/components/Arrows";
import { Asterisk, TickIcon } from "@/components/Glyphs";

/* eslint-disable @next/next/no-img-element */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Akaka Favour`,
    description: project.outcome,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36">
      {/* Breadcrumb */}
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
        All work
      </Link>

      {/* Header */}
      <header className="mt-8">
        <p className="eyebrow text-muted">{project.category}</p>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {project.outcome}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-ink transition-colors hover:bg-accent-hover"
          >
            Visit the live site
            <ArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {project.urlLabel}
          </span>
        </div>
      </header>

      {/* Hero screenshot */}
      <figure className="mt-12 overflow-hidden rounded-2xl border border-ink bg-surface shadow-[0_30px_60px_-30px_rgba(17,18,20,0.35)]">
        <img src={project.image} alt={project.imageAlt} className="w-full" />
      </figure>

      {/* Overview */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_260px]">
        <div>
          {project.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-ink first:mt-0">
              {paragraph}
            </p>
          ))}

          {/* Case sections */}
          <div className="mt-12 grid gap-9">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{section.text}</p>
              </section>
            ))}
          </div>

          {/* Teardown — Problem / Fix / Result (Vartex) */}
          {project.teardown && (
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink bg-line sm:grid-cols-3">
              {(
                [
                  ["Problem", project.teardown.problem],
                  ["Fix", project.teardown.fix],
                  ["Result", project.teardown.result],
                ] as const
              ).map(([label, text]) => (
                <div key={label} className="bg-surface p-6">
                  <p
                    className={`eyebrow ${
                      label === "Problem" ? "text-accent-hover" : "text-ink"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Gallery — renders only if screenshots are staged */}
          {project.gallery.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {project.gallery.map((shot) => (
                <figure
                  key={shot.src}
                  className="overflow-hidden rounded-xl border border-ink bg-surface"
                >
                  <img src={shot.src} alt={shot.alt} className="w-full" loading="lazy" />
                  <figcaption className="border-t border-line px-4 py-2.5">
                    <span className="eyebrow text-muted">{shot.alt}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: stack + highlights */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="eyebrow text-muted">Stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-ink bg-surface px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted">What it includes</p>
            <ul className="mt-4 grid gap-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                  <TickIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-hover" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-ink bg-accent-tint p-5">
            <p className="font-hand text-2xl leading-tight text-ink">
              Want this for your business?
            </p>
            <Link
              href="/#contact"
              className="group mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-hover"
            >
              Start a project
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <nav
        aria-label="Next project"
        className="mt-20 flex items-center justify-between gap-4 border-t border-line pt-8"
      >
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center gap-3"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-ink text-ink transition-colors group-hover:bg-accent">
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          <span>
            <span className="eyebrow block text-muted">Next project</span>
            <span className="font-display text-lg font-semibold text-ink">
              {next.name}
            </span>
          </span>
        </Link>
        <Asterisk aria-hidden="true" className="h-6 w-6 text-violet" />
      </nav>
    </main>
  );
}
