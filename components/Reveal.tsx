"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

/**
 * Rauno-grade line-mask reveal: content slides up from behind an
 * overflow mask (y 110% → 0) on a stiff spring, once, when scrolled
 * into view. Collapses to static under prefers-reduced-motion.
 *
 * Reliability: the in-view observer MUST sit on the outer mask div, not
 * the translated child — the child is clipped out of the layout by the
 * overflow mask while hidden, so it can never report "in view" and whole
 * sections stay permanently blank. A 1.5s viewport failsafe covers any
 * remaining edge cases (anchor jumps, programmatic scrolls).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const maskRef = useRef<HTMLDivElement>(null);
  const inView = useInView(maskRef, { once: true, amount: 0.15 });
  const [forced, setForced] = useState(false);
  const reveal = inView || forced;

  useEffect(() => {
    if (reduce || reveal || !maskRef.current) return;
    const t = window.setTimeout(() => {
      const r = maskRef.current?.getBoundingClientRect();
      if (r && r.top < window.innerHeight && r.bottom > 0) setForced(true);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [reduce, reveal]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={maskRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={reveal ? { y: "0%" } : { y: "110%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
