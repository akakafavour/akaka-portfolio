import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "./Reveal";

/**
 * Work — mockup-accurate: "/ MY WORK" eyebrow, "Featured Projects",
 * quiet "View All Projects ↗" link, three case cards that rest slightly
 * rotated (a loose fan) and straighten + lift on hover.
 */
type Project = {
  name: string;
  category: string;
  url: string;
  urlLabel: string;
  image: { src: string; alt: string };
  tilt: string;
};

const PROJECTS: Project[] = [
  {
    name: "Vartex Architects",
    category: "Client Site / Next.js 15 · Sanity CMS · GSAP",
    url: "https://vartexarchitects.com",
    urlLabel: "vartexarchitects.com",
    image: {
      src: "/work/vartex-hero.png",
      alt: "Screenshot of the Vartex Architects website homepage",
    },
    tilt: "sm:-rotate-2",
  },
  {
    name: "Orji Munachi",
    category: "Client Site / Next.js · TypeScript",
    url: "https://munachi-portfolio.vercel.app/",
    urlLabel: "munachi-portfolio.vercel.app",
    image: {
      src: "/work/munachi-hero.png",
      alt: "Screenshot of Orji Munachi's portfolio website homepage",
    },
    tilt: "sm:rotate-1",
  },
  {
    name: "OIVS — OKWU URRATA Identification & Voting System",
    category: "Full-Stack Concept / Registration · Identity · Verified Voting",
    url: "https://oivs-institutional.vercel.app",
    urlLabel: "oivs-institutional.vercel.app",
    image: {
      src: "/work/oivs-hero.png",
      alt: "Screenshot of the OIVS institutional web application",
    },
    tilt: "sm:-rotate-1",
  },
];

function BrowserFrame({
  urlLabel,
  children,
}: {
  urlLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink bg-surface shadow-[0_14px_30px_-16px_rgba(17,18,20,0.25)]">
      <div className="flex items-center gap-3 border-b border-line bg-bg px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
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
            Featured Projects
          </h2>
        </Reveal>
        <a
          href="https://github.com/Akakaui"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
        >
          View All Projects
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className={`group flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 ${project.tilt}`}
          >
            <BrowserFrame urlLabel={project.urlLabel}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
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
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink text-ink transition-colors hover:bg-accent"
              >
                <span aria-hidden="true" className="text-sm">
                  ↗
                </span>
              </a>
            </div>
            <p className="eyebrow mt-1.5 text-muted">{project.category}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
