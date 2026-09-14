"use client";

import ScrollExpand from "./ScrollExpand";

/**
 * CaseStudyHero — wraps ScrollExpand for the case study hero screenshot.
 * ScrollExpand manages its own height via the scroll track, so we don't
 * apply aspect-ratio or fixed height to the container.
 */
interface CaseStudyHeroProps {
  src: string;
  alt: string;
  name: string;
  outcome: string;
}

export default function CaseStudyHero({ src, alt, name, outcome }: CaseStudyHeroProps) {
  return (
    <ScrollExpand
      src={src}
      alt={alt}
      title={name}
      scrollHint="Scroll to explore"
      useWindowScroll
      mediaZoom={1.15}
      startWidth={60}
      startHeight={70}
      startRadius={16}
      endRadius={0}
      scrollDistance={1.0}
      holdDistance={0.2}
      overlayScrim={0.5}
      className="mt-12 w-full overflow-hidden rounded-2xl border border-ink"
    >
      <div className="max-w-lg text-center">
        <p className="mt-4 text-base leading-relaxed text-white/80">
          {outcome}
        </p>
      </div>
    </ScrollExpand>
  );
}
