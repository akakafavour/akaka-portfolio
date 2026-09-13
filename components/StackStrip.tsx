const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "AWS",
  "Framer Motion",
  "AI-accelerated delivery (Codex-class tooling)",
];

/**
 * Quiet stack strip — mono labels only, no cards, no icons.
 * It answers "can he actually build?" in one glance.
 */
export default function StackStrip() {
  return (
    <section aria-label="Tools and stack" className="border-y border-line bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-baseline gap-x-6 gap-y-2 px-4 py-8 sm:px-6">
        <p className="eyebrow text-accent">Built with</p>
        {STACK.map((item) => (
          <span
            key={item}
            className="font-mono text-xs uppercase tracking-[0.08em] text-ink"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
