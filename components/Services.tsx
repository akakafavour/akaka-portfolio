import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Arrows";
import { ChatIcon, CodeIcon, DocIcon, PencilIcon, RocketIcon } from "./Glyphs";

/**
 * Services (v12) — work orders: the studio ticket made physical. Each card
 * is a real work order — case number, READY status stamp that stamps in on
 * hover, barcode strip, perforated tear-off bottom edge. Copy is broad on
 * purpose: sites, web apps, tools, automations, AI agent tooling — not a
 * web-design menu. The revenue offer stays the LEAK DOCKET (unchanged).
 */
const SERVICES = [
  {
    icon: <CodeIcon className="h-5 w-5" />,
    name: "Custom builds",
    line: "Design, copy and code from one person. Sites, web apps, internal tools, automations — whatever the project needs. Live in 7 to 10 days.",
  },
  {
    icon: <PencilIcon className="h-5 w-5" />,
    name: "Site redesigns",
    line: "Your site gets visits but no calls. I rebuild it to convert. Same business, new engine.",
  },
  {
    icon: <RocketIcon className="h-5 w-5" />,
    name: "Landing pages & funnels",
    line: "One page, one job: turn a campaign's traffic into bookings, signups or messages.",
  },
  {
    icon: <DocIcon className="h-5 w-5" />,
    name: "Web apps & AI tooling",
    line: "Dashboards, portals, internal tools, AI agent tooling. Full-stack builds with auth and a real database.",
  },
];

/* Ticket perforation — a punched strip along the card's bottom edge:
   round holes of the page background cut out of the card surface. */
const PERFORATION_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 5px 3px, var(--color-bg) 2.6px, transparent 2.7px)",
  backgroundSize: "12px 12px",
  backgroundRepeat: "repeat-x",
  backgroundPosition: "bottom center",
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionEyebrow label="/ How I can help" />
      <Reveal className="mt-8">
        <h2
          id="services-heading"
          className="metallic font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
        >
          What I take off your plate.
        </h2>
      </Reveal>

      {/* The ticket board — two columns, alternating tilt */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7">
        {SERVICES.map((service, i) => (
          <Reveal key={service.name} className="h-full">
            <Link
              href="#contact"
              className={`group relative flex h-full flex-col border border-ink bg-surface p-6 pb-9 pr-7 transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_48px_-24px_rgba(17,18,20,0.4)] sm:p-7 sm:pb-10 ${
                i % 2 === 0
                  ? "-rotate-[0.6deg] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]"
                  : "rotate-[0.6deg] [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]"
              }`}
            >
              {/* Index tab — the yellow strip tickets hang from */}
              <span
                aria-hidden="true"
                className={`absolute top-0 h-2 w-16 bg-accent ${
                  i % 2 === 0 ? "left-0" : "right-0"
                }`}
              />

              {/* Work-order header: case number + READY stamp (stamps in on hover) */}
              <span className="eyebrow mt-3 flex items-center justify-between text-muted">
                <span className="pt-2">SRVC-0{i + 1}</span>
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block -rotate-3 scale-125 rounded-sm border-2 border-accent-hover px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent-hover opacity-0 transition-all duration-200 ease-out group-hover:rotate-[-6deg] group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
                  >
                    Ready
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-ink bg-bg text-ink transition-colors duration-300 group-hover:bg-accent"
                  >
                    {service.icon}
                  </span>
                </span>
              </span>

              <span className="mt-4 block font-display text-[1.35rem] font-semibold leading-snug text-ink">
                {service.name}
              </span>
              <span className="mt-2.5 block text-sm leading-relaxed text-muted">
                {service.line}
              </span>

              {/* Work-order footer: barcode + CTA, above the perforated edge */}
              <span className="mt-auto inline-flex items-end justify-between gap-4 pt-6">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-ink">
                  Open a ticket
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="h-7 w-24 shrink-0 opacity-25 transition-opacity duration-300 group-hover:opacity-50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px)",
                    color: "var(--color-ink)",
                  }}
                />
              </span>

              {/* Perforated tear-off edge — the ticket bottom */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3"
                style={PERFORATION_STYLE}
              />
            </Link>
          </Reveal>
        ))}
      </div>

      {/* The LEAK DOCKET — the revenue offer as a work order. Ink card,
          yellow edge, barcode corner, one clear CTA. */}
      <Reveal className="mt-8">
        <Link
          href="#contact"
          className="group relative block overflow-hidden border border-ink bg-pill p-7 text-on-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(17,18,20,0.55)] [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,0_100%)] sm:p-9"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1.5 bg-accent"
          />
          {/* Barcode — docket texture */}
          <span
            aria-hidden="true"
            className="absolute right-7 top-7 hidden h-10 w-28 opacity-30 sm:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px)",
            }}
          />
          <span className="eyebrow block text-accent">DOCKET-05 · REVENUE LEAK</span>
          <div className="mt-4 grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
            <span
              aria-hidden="true"
              className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-pill"
            >
              <ChatIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold sm:text-[1.7rem]">
                Conversion &amp; revenue fixes
              </span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-on-ink/70">
                The site is fine and something else is leaking: the offer,
                the onboarding, the follow-up. I find it and fix it. Built
                for SaaS founders who would rather not start from zero.
              </span>
            </span>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-on-ink px-6 py-3 text-sm font-semibold text-pill transition-colors duration-200 group-hover:bg-accent">
              Report a leak
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
