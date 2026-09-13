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

/**
 * Pipeline step icons — 24px grid, 1.8px stroke, drawn to read at 18px
 * inside the yellow chips. One component per pipeline stage + clock.
 */
export function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4c-1.2-.1-2.4-.4-3.5-1L3 20l1.1-4.2A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M8 10h8" />
      <path d="M8 13.5h5" />
    </svg>
  );
}

export function PencilIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m14.5 4.5 5 5L8 21H3v-5L14.5 4.5Z" />
      <path d="m12.5 6.5 5 5" />
    </svg>
  );
}

export function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="M13.5 4.5 10.5 19.5" />
    </svg>
  );
}

export function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M12.5 4.5c3-2 6.5-1.5 6.5-1.5s.5 3.5-1.5 6.5L11 16l-3-3 4.5-8.5Z" />
      <path d="M9 10.5 5.5 11 4 13l3 .5" />
      <path d="M13.5 15l-.5 3.5L15 20l.5-3" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </svg>
  );
}

export function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function TickIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </svg>
  );
}
