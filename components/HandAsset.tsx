"use client";

import { useState } from "react";

/* eslint-disable @next/next/no-img-element */

/**
 * Hand-drawn annotation asset (transparent PNG from public/hand/).
 * Renders nothing if the file is missing at build/deploy time — the page
 * never shows a broken image for an annotation.
 */
export default function HandAsset({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
