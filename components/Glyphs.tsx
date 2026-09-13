/**
 * Inline SVG glyph set — the v6 glyph rule: no text-glyph asterisks, no
 * emoji-like characters anywhere in rendered copy. Every mark is a real SVG
 * so it keeps brand colors, scales with the type via em sizing, and can
 * never fall back to an emoji font.
 */

/**
 * Six-spoke asterisk — the site's signature mark (violet in headlines,
 * yellow in the footer, ink in the pipeline signature row). Size it in em
 * so it tracks the surrounding font size.
 */
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.5v19" />
      <path d="m3.8 7.25 16.4 9.5" />
      <path d="M20.2 7.25 3.8 16.75" />
    </svg>
  );
}

/**
 * Hand-drawn double-stroke scribble underline (signal yellow under the
 * hero's "Bring you work."). Replaces the retired /hand/scribble-underline.png.
 */
export function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 11c38-7 82 5 128-2 28-4 58-3 84 1" strokeWidth={5} />
      <path d="M42 15c46 3 94-5 136-7" strokeWidth={2.5} />
    </svg>
  );
}

/**
 * Hand-drawn curved arrow, drawn pointing down-left (top-right tail,
 * bottom-left head) to match the mockup annotations ("real projects.",
 * "From idea to live site."). Rotate/flip via className per placement.
 * Replaces the retired /hand/arrow-*.png files.
 */
export function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M54 6C31 11 18 27 20 52" />
      <path d="m11 42 9 11 11-9" />
    </svg>
  );
}
