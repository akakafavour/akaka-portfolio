"use client";

import { motion, useReducedMotion } from "framer-motion";
import HandAsset from "./HandAsset";

/**
 * Floating 3D render (client-staged transparent PNGs in public/assets/3d/).
 * Gentle y-float on a slow loop; static under prefers-reduced-motion.
 * Sizes 80–120px per the v6 spec.
 */
export default function Float3D({
  src,
  className = "",
  size = 96,
}: {
  src: string;
  className?: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 block ${className}`}
      style={{ width: size }}
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={
        reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <HandAsset src={src} alt="" className="w-full" />
    </motion.span>
  );
}
