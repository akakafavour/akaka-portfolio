import rough from "rough";
import { writeFileSync, mkdirSync } from "node:fs";

const Y = "#F2B705";
const INK = "#111214";

const doc = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">${inner}</svg>`;

mkdirSync("public/hand", { recursive: true });

// 1. scribble-underline — two overlapping wavy passes, 480x56
{
  const rc = rough.svg(480, 56, { options: { roughness: 1.6, bowing: 3, strokeWidth: 5, stroke: Y } });
  const wave = (y0, amp, phase) => {
    let d = `M 8 ${y0}`;
    for (let x = 8; x <= 456; x += 16) {
      const up = ((x / 16 + phase) % 2 === 0) ? -amp : amp;
      d += ` Q ${x + 8} ${y0 + up} ${x + 16} ${y0}`;
    }
    return d;
  };
  const inner =
    rc.path(wave(26, 7, 0), { stroke: Y, strokeWidth: 5, roughness: 1.6, bowing: 3 }) +
    rc.path(wave(38, 6, 1), { stroke: Y, strokeWidth: 4, roughness: 1.9, bowing: 4 });
  writeFileSync("public/hand/scribble-underline.svg", doc(480, 56, inner));
}

// 2. arrow-curve — long curved arrow with head, 120x180
{
  const rc = rough.svg(120, 180);
  const o = { stroke: Y, strokeWidth: 5, roughness: 1.8, bowing: 2 };
  const inner =
    rc.path("M 18 12 Q 62 62 88 152", o) +
    rc.linearPath([[88, 152], [62, 140]], o) +
    rc.linearPath([[88, 152], [96, 124]], o);
  writeFileSync("public/hand/arrow-curve.svg", doc(120, 180, inner));
}

// 3. arrow-small — small curved arrow, 96x96
{
  const rc = rough.svg(96, 96);
  const o = { stroke: Y, strokeWidth: 5, roughness: 1.8, bowing: 2 };
  const inner =
    rc.path("M 8 10 Q 42 34 70 78", o) +
    rc.linearPath([[70, 78], [46, 72]], o) +
    rc.linearPath([[70, 78], [64, 52]], o);
  writeFileSync("public/hand/arrow-small.svg", doc(96, 96, inner));
}

// 4. crown — ink hand-drawn crown, 100x80
{
  const rc = rough.svg(100, 80);
  const o = { stroke: INK, strokeWidth: 5, roughness: 1.5, bowing: 2 };
  const inner =
    rc.linearPath([[10, 64], [20, 16], [36, 48], [50, 8], [64, 48], [80, 16], [90, 64]], o) +
    rc.linearPath([[10, 64], [90, 64]], o);
  writeFileSync("public/hand/crown.svg", doc(100, 80, inner));
}

// 5. scribble-circle — small emphasis circle, 90x60 (for chips/numbers)
{
  const rc = rough.svg(90, 60);
  const o = { stroke: Y, strokeWidth: 4, roughness: 1.9, bowing: 3 };
  const inner = rc.path("M 46 6 C 16 4 4 18 6 32 C 8 50 34 58 56 54 C 80 50 88 34 82 20 C 76 8 58 4 40 7", o);
  writeFileSync("public/hand/scribble-circle.svg", doc(90, 60, inner));
}

console.log("generated: scribble-underline, arrow-curve, arrow-small, crown, scribble-circle");
