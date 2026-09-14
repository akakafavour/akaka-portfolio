import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Arrows";

/**
 * Work — mockup-kayode presentation (v6): "Featured Projects" heading,
 * quiet "View all projects" link, and a clean responsive grid of cards.
 * Each card = browser frame (macOS dots + URL bar) holding the real
 * screenshot, with title + mono category line + circular arrow button
 * below. No fanned tilt — cards sit straight and lift on hover.
 * Every card links to its individual case page at /work/[slug].
 */
function BrowserFrame({
  urlLabel,
  children,
}: {
  urlLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink bg-surface shadow-[0_14px_30px_-16px_rgba(17,18,20,0.25)] transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-20px_rgba(17,18,20,0.35)]">
      <div className="flex items-center gap-3 border-b border-line bg-bg px-4 py-2.5">
        {/* macOS traffic lights — browser chrome idiom, not brand color */}
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="eyebrow flex-1 truncate rounded-full border border-line bg-surface px-3 py-1 text-muted">
          {urlLabel}
        </span>
      </div>
      {children}
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

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {PROJECTS.map((project) => (
          <article key={project.slug} className="group flex flex-col">
            <Link
              href={`/work/${project.slug}`}
              aria-label={`Read the ${project.name} case study`}
              className="flex flex-col transition-transform duration-300 hover:-translate-y-2"
            >
              <BrowserFrame urlLabel={project.urlLabel}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                  {project.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink text-ink transition-colors group-hover:bg-accent"
                >
                  <ArrowUpRight className="text-sm" />
                </span>
              </div>
              <p className="eyebrow mt-1.5 text-muted">{project.category}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
