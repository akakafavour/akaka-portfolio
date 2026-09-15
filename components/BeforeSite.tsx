/**
 * BEFORE side of the hero reveal — "BloomHarbor", a deliberately dated
 * fictional site built entirely in JSX/CSS (v6). As a container-query mock
 * it stays crisp at any DPI.
 *
 * It is a prop, not product styling: cramped serif type, gray header bar,
 * dull beveled button, muted CSS skyline. Sizes are in cqw so the mock
 * scales with the slider frame. All colors go through .bh-site CSS vars
 * so the mock flips with light/dark mode (see globals.css). The tag
 * ("Before") is rendered by the slider in components/Hero.tsx.
 */
export default function BeforeSite() {
  return (
    <div
      aria-hidden="true"
      className="bh-site bh-old absolute inset-0 flex flex-col bg-[var(--bh-bg)] text-[var(--bh-fg)]"
    >
      {/* Gray header bar */}
      <div className="flex items-center justify-between bg-[var(--bh-header)] px-[3cqw] py-[1.7cqw]">
        <span className="flex items-center gap-[0.9cqw] text-[2.1cqw] max-sm:text-[3cqw] font-bold tracking-tight text-white/90">
          <span className="inline-block h-[1.6cqw] w-[1.6cqw] bg-white/85" />
          BloomHarbor
        </span>
        <span className="flex gap-[2.6cqw] text-[1.45cqw] max-sm:text-[2.1cqw] max-sm:text-[3cqw] text-white/60">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </span>
      </div>

      {/* Cramped two-column body */}
      <div className="grid flex-1 grid-cols-[1.05fr_0.95fr] gap-[2.5cqw] px-[4cqw] py-[2.6cqw]">
        <div className="flex flex-col justify-center">
          <p className="text-[3.3cqw] max-sm:text-[4.8cqw] font-bold leading-[1.12] text-[var(--bh-fg-strong)]">
            Grow Your Business With Our Solutions
          </p>
          <p className="mt-[1.3cqw] text-[1.55cqw] max-sm:text-[2.3cqw] leading-snug text-[var(--bh-fg-muted)]">
            We help you build a stronger online presence and reach more
            customers.
          </p>
          <span className="mt-[1.9cqw] w-fit border border-[var(--bh-line)] border-b-2 bg-[var(--bh-btn-bg)] px-[2.3cqw] py-[1cqw] text-[1.4cqw] max-sm:text-[2cqw] max-sm:text-[2.9cqw] text-[var(--bh-btn-fg)]">
            Get Started
          </span>
        </div>

        {/* Dated CSS "photo" — flat skyline with a muted window grid */}
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-b from-[var(--bh-panel-a)] to-[var(--bh-panel-b)]">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-[1.2cqw]">
            <span className="h-[36%] w-[13%] bg-[var(--bh-header)] opacity-70" />
            <span className="h-[56%] w-[17%] bg-[var(--bh-header)] opacity-90" />
            <span className="h-[44%] w-[11%] bg-[var(--bh-header)] opacity-50" />
            <span className="h-[68%] w-[19%] bg-[var(--bh-header)]" />
            <span className="h-[50%] w-[13%] bg-[var(--bh-header)] opacity-60" />
            <span className="h-[30%] w-[10%] bg-[var(--bh-header)] opacity-45" />
          </div>
          <span
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(255,255,255,0.35) 6px 8px), repeating-linear-gradient(to right, transparent 0 8px, rgba(60,60,60,0.25) 8px 10px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
