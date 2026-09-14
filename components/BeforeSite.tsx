/**
 * BEFORE side of the hero slider — "BloomHarbor", a deliberately dated
 * fictional site built entirely in JSX/CSS (v6). Replaces the 370px
 * /assets/slider-before.png crop that went blurry when scaled; as a
 * container-query mock it stays crisp at any DPI.
 *
 * It is a prop, not product styling: cramped serif type, gray header bar,
 * dull beveled button, muted CSS skyline. Sizes are in cqw so the mock
 * scales with the slider frame. The tag ("Before") is rendered by the
 * slider in components/Hero.tsx.
 */
export default function BeforeSite() {
  return (
    <div
      aria-hidden="true"
      className="bh-old absolute inset-0 flex flex-col bg-[#e9e7e2] text-[#3a3a3a]"
    >
      {/* Gray header bar */}
      <div className="flex items-center justify-between bg-[#5f5f5f] px-[3cqw] py-[1.7cqw]">
        <span className="flex items-center gap-[0.9cqw] text-[2.1cqw] font-bold tracking-tight text-white">
          <span className="inline-block h-[1.6cqw] w-[1.6cqw] bg-white/85" />
          BloomHarbor
        </span>
        <span className="flex gap-[2.6cqw] text-[1.45cqw] text-white/70">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </span>
      </div>

      {/* Cramped two-column body */}
      <div className="grid flex-1 grid-cols-[1.05fr_0.95fr] gap-[2.5cqw] px-[4cqw] py-[2.6cqw]">
        <div className="flex flex-col justify-center">
          <p className="text-[3.3cqw] font-bold leading-[1.12] text-[#333333]">
            Grow Your Business With Our Solutions
          </p>
          <p className="mt-[1.3cqw] text-[1.55cqw] leading-snug text-[#6d6d6d]">
            We help you build a stronger online presence and reach more
            customers.
          </p>
          <span className="mt-[1.9cqw] w-fit border border-[#9c9c9c] border-b-2 bg-[#d8d5ce] px-[2.3cqw] py-[1cqw] text-[1.4cqw] text-[#4c4c4c]">
            Get Started
          </span>
        </div>

        {/* Dated CSS "photo" — flat gray skyline with a muted window grid */}
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-b from-[#c9c7c2] to-[#a8a6a1]">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-[1.2cqw]">
            <span className="h-[36%] w-[13%] bg-[#9a9893]" />
            <span className="h-[56%] w-[17%] bg-[#8a8882]" />
            <span className="h-[44%] w-[11%] bg-[#a5a39e]" />
            <span className="h-[68%] w-[19%] bg-[#7f7d77]" />
            <span className="h-[50%] w-[13%] bg-[#949290]" />
            <span className="h-[30%] w-[10%] bg-[#a19f99]" />
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
