"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LiquidMetal — chrome/liquid metallic text effect for display headlines.
 *
 * Uses a canvas overlay that renders a scrolling metallic gradient reflection
 * mapped onto the text via CSS mask. Works in both light and dark modes:
 *
 *   Light: warm gold/bronze shimmer — high contrast on #f5f3ec paper
 *   Dark:  cool silver/chrome shimmer — luminous on #0d0d0f background
 *
 * The component wraps children and applies the metallic effect as a
 * foreground layer, preserving the text's semantic HTML.
 *
 * Props:
 *   strength  — 0-1, how intense the reflection contrast is (default 0.85)
 *   className — additional classes for the container
 */
interface LiquidMetalProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function LiquidMetal({
  children,
  strength = 0.85,
  className = "",
}: LiquidMetalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(false);

  // Track dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Canvas metallic gradient animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    const speed = 0.4;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      offset += speed;

      if (isDark) {
        // Dark mode: cool silver/chrome
        const gradient = ctx.createLinearGradient(offset % (w * 2) - w, 0, (offset % (w * 2)) + w * 0.5, h);
        gradient.addColorStop(0, `rgba(255,255,255,${0.05 * strength})`);
        gradient.addColorStop(0.2, `rgba(200,205,215,${0.5 * strength})`);
        gradient.addColorStop(0.35, `rgba(255,255,255,${0.85 * strength})`);
        gradient.addColorStop(0.5, `rgba(160,165,175,${0.4 * strength})`);
        gradient.addColorStop(0.65, `rgba(255,255,255,${0.7 * strength})`);
        gradient.addColorStop(0.8, `rgba(190,195,205,${0.45 * strength})`);
        gradient.addColorStop(1, `rgba(255,255,255,${0.05 * strength})`);
        ctx.fillStyle = gradient;
      } else {
        // Light mode: warm gold/bronze sheen
        const gradient = ctx.createLinearGradient(offset % (w * 2) - w, 0, (offset % (w * 2)) + w * 0.5, h);
        gradient.addColorStop(0, `rgba(242,183,5,${0.08 * strength})`);
        gradient.addColorStop(0.2, `rgba(200,160,40,${0.35 * strength})`);
        gradient.addColorStop(0.35, `rgba(255,220,80,${0.7 * strength})`);
        gradient.addColorStop(0.5, `rgba(180,140,30,${0.3 * strength})`);
        gradient.addColorStop(0.65, `rgba(242,183,5,${0.55 * strength})`);
        gradient.addColorStop(0.8, `rgba(200,160,40,${0.35 * strength})`);
        gradient.addColorStop(1, `rgba(242,183,5,${0.08 * strength})`);
        ctx.fillStyle = gradient;
      }

      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, strength]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Base text — visible, gets its color from existing .metallic or direct color */}
      <span className="relative z-0">{children}</span>
      {/* Metallic reflection overlay — composited via mix-blend-mode */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-overlay"
        aria-hidden="true"
        style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
      />
    </div>
  );
}
