import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
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
    <>
      {/* Site chrome — same as home */}
      <div className="grain-overlay" aria-hidden="true" />
      <SiteHeader />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-40 h-20 w-20 rounded-bl-full bg-violet"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-40 h-16 w-16 rounded-tr-full bg-violet"
      />

      <main
        id="main"
        className="mx-auto w-full max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36"
      >
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

      {/* Header — ticket header: case number, oversized title, meta strip */}
      <header className="mt-10">
        <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
          <span className="text-ink">CASE-{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line" />
          {project.category}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold uppercase leading-[1.02] tracking-tight text-ink">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {project.outcome}
        </p>

        {/* Meta strip — the work-order rail: visit, url, stack chips */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-line py-4">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
          >
            Visit the live site
            <ArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <span className="ml-auto hidden gap-2 sm:flex">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted"
              >
                {tech}
              </span>
            ))}
          </span>
        </div>
      </header>

      {/* Hero screenshot — ticket frame with yellow corner dot */}
      <figure className="relative mt-12 overflow-hidden rounded-2xl border border-ink bg-surface shadow-[0_30px_60px_-30px_rgba(17,18,20,0.35)]">
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 z-10 h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-bg/60"
        />
        <img src={project.image} alt={project.imageAlt} className="w-full" />
      </figure>

      {/* Body */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_260px]">
        <div>
          {project.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-ink first:mt-0">
              {paragraph}
            </p>
          ))}

          {/* Case sections — numbered like the pipeline */}
          <div className="mt-14 grid gap-10">
            {project.sections.map((section, i) => (
              <section key={section.heading} className="relative border-l-2 border-line pl-6 sm:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-bg"
                />
                <p className="eyebrow text-muted">§ {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{section.text}</p>
              </section>
            ))}
          </div>

          {/* Teardown — docket rows: PROBLEM / FIX / RESULT */}
          {project.teardown && (
            <div className="mt-14 overflow-hidden rounded-2xl border border-ink">
              {(
                [
                  ["Problem", project.teardown.problem, "bg-accent"],
                  ["Fix", project.teardown.fix, "bg-ink"],
                  ["Result", project.teardown.result, "bg-violet"],
                ] as const
              ).map(([label, text, edge]) => (
                <div
                  key={label}
                  className={`relative grid gap-1 border-line p-6 sm:grid-cols-[120px_1fr] sm:gap-6 ${
                    label !== "Problem" ? "border-t" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1.5 ${edge}`}
                  />
                  <p className="eyebrow pl-3 pt-1 text-muted">{label}</p>
                  <p className="pl-3 text-sm leading-relaxed text-ink">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
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

        {/* Sidebar — the spec sheet: stack, includes, CTA docket */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line p-5">
            <p className="eyebrow text-muted">Stack</p>
            <ul className="mt-4 grid gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line p-5">
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
          <div className="relative overflow-hidden border border-ink bg-accent-tint p-5 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,0_100%)]">
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

      {/* Next project — the handoff stamp */}
      <nav
        aria-label="Next project"
        className="group relative mt-24 overflow-hidden rounded-2xl border border-ink bg-surface"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1.5 bg-accent transition-all duration-300 group-hover:w-3"
        />
        <Link
          href={`/work/${next.slug}`}
          className="group/inner relative grid grid-cols-[1fr_auto] items-center gap-6 p-8 pl-10 transition-colors duration-300 hover:bg-ink sm:p-10 sm:pl-12"
        >
          <div>
            <p className="eyebrow text-muted transition-colors group-hover/inner:text-bg/60">
              Next case
            </p>
            <p className="mt-2 font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-semibold leading-none tracking-tight text-ink transition-colors group-hover/inner:text-bg">
              {next.name}
            </p>
            <p className="eyebrow mt-3 flex items-center gap-2 text-muted transition-colors group-hover/inner:text-accent">
              {next.category}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover/inner:translate-x-1.5"
              />
            </p>
          </div>
          <div
            aria-hidden="true"
            className="relative hidden w-52 justify-self-end overflow-hidden rounded-lg border border-line opacity-60 transition-all duration-300 group-hover/inner:opacity-100 sm:block"
          >
            <img src={next.image} alt="" className="w-full" loading="lazy" />
          </div>
        </Link>
      </nav>

      <Asterisk aria-hidden="true" className="mx-auto mt-10 h-6 w-6 text-violet" />
    </main>
    <Footer />
    </>
  );
}
