"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Rauno-grade line-mask reveal: content slides up from behind an
 * overflow mask (y 110% → 0) on a stiff spring, once, when scrolled
 * into view. Collapses to static under prefers-reduced-motion.
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
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
