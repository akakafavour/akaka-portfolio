/**
 * v5 ticker — yellow strip, ink mono, repeating:
 * "// FREELANCE DEVELOPER // MODERN WEBSITES // FAST TURNAROUND //"
 * Two identical copies; the track translates -50% for a seamless loop.
 * Under prefers-reduced-motion it freezes to a static single line.
 */
const ITEMS = [
  "// Freelance developer",
  "// Modern websites",
  "// Fast turnaround",
];

export default function Marquee() {
  return (
    <section
      aria-label="What I do"
      className="overflow-hidden bg-accent py-3.5"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex items-center"
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink"
              >
                <span className="px-4">{item}</span>
                <span aria-hidden="true" className="px-1">
                  //
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
