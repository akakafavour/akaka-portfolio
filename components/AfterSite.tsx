import { ArrowRight } from "./Arrows";

/**
 * AFTER side of the hero slider — the modern redesign of the same
 * "BloomHarbor" content, built entirely in JSX/CSS (v6). Replaces the
 * 370px /assets/slider-after.png crop. Clean grotesk type (the site's
 * own Satoshi stack), violet #6C4CF1 + lime accent shapes per the
 * approved mockup's after side, proper CTA pair. Sizes in cqw so the
 * mock scales with the slider frame. The tag ("After") is rendered by
 * the slider in components/Hero.tsx.
 */
export default function AfterSite() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col overflow-hidden bg-white text-ink"
    >
      {/* Clean nav */}
      <div className="flex items-center justify-between px-[3cqw] py-[1.7cqw]">
        <span className="flex items-center gap-[0.8cqw] text-[2cqw] max-sm:text-[2.9cqw] font-semibold tracking-tight">
          <span className="inline-block h-[1.4cqw] w-[1.4cqw] rounded-full bg-violet" />
          BloomHarbor
        </span>
        <span className="flex items-center gap-[2.4cqw] text-[1.4cqw] max-sm:text-[2cqw] max-sm:text-[2.9cqw] text-muted">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
          <span className="rounded-full bg-pill px-[1.8cqw] py-[0.7cqw] text-on-ink">
            Get Started
          </span>
        </span>
      </div>

      {/* Body: headline left, shapes + building right */}
      <div className="relative grid flex-1 grid-cols-[1.05fr_0.95fr] px-[4cqw]">
        <div className="relative flex flex-col justify-center pb-[2cqw]">
          <p className="text-[4.2cqw] font-semibold leading-[1.08] tracking-tight">
            Modern solutions
            <br />
            for <span className="text-violet">growing brands.</span>
          </p>
          <p className="mt-[1.5cqw] max-w-[36cqw] text-[1.7cqw] max-sm:text-[2.4cqw] leading-relaxed text-muted">
            We help businesses build powerful websites, automate workflows and
            turn ideas into real growth.
          </p>
          <div className="mt-[2.3cqw] flex items-center gap-[2.2cqw]">
            <span className="flex items-center gap-[0.9cqw] rounded-full bg-[#a3e635] px-[2.6cqw] py-[1.2cqw] text-[1.65cqw] max-sm:text-[2.4cqw] font-medium text-ink">
              Get Started
              <ArrowRight className="h-[1.5cqw] w-[1.5cqw]" />
            </span>
            <span className="flex items-center gap-[0.9cqw] text-[1.65cqw] max-sm:text-[2.4cqw] text-ink">
              <span className="grid h-[2.9cqw] w-[2.9cqw] place-items-center rounded-full border border-ink/30">
                <svg
                  viewBox="0 0 10 10"
                  className="h-[1.1cqw] w-[1.1cqw]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.5 1.5v7l6-3.5-6-3.5z" />
                </svg>
              </span>
              Watch Demo
            </span>
          </div>
        </div>

        {/* Violet + lime quarter-circle shapes and a CSS building */}
        <div className="relative">
          <span className="absolute right-[2%] top-[6%] h-[11cqw] w-[11cqw] rounded-bl-full bg-violet" />
          <span className="absolute bottom-[4%] right-[30%] h-[8cqw] w-[8cqw] rounded-tl-full bg-[#a3e635]" />
          <div className="absolute bottom-0 right-[6%] h-[44%] w-[30%] overflow-hidden rounded-t-md bg-[#b9b7b2]">
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 7px, rgba(255,255,255,0.5) 7px 9px), repeating-linear-gradient(to right, transparent 0 9px, rgba(17,18,20,0.16) 9px 11px)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
