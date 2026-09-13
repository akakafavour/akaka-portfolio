import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/assets", { recursive: true });

// fractional crops: [x0, y0, x1, y1] as portions of width/height
const jobs = [
  { src: "design-reference/mockup-home.png", out: "public/assets/slider-before.png", f: [0.262, 0.345, 0.495, 0.545] },
  { src: "design-reference/mockup-home.png", out: "public/assets/slider-after.png", f: [0.505, 0.345, 0.777, 0.545] },
  { src: "design-reference/mockup-pipeline.png", out: "public/assets/pipeline-brief.png", f: [0.065, 0.372, 0.226, 0.60] },
  { src: "design-reference/mockup-pipeline.png", out: "public/assets/pipeline-design.png", f: [0.254, 0.372, 0.414, 0.60] },
  { src: "design-reference/mockup-pipeline.png", out: "public/assets/pipeline-build.png", f: [0.439, 0.372, 0.598, 0.60] },
  { src: "design-reference/mockup-pipeline.png", out: "public/assets/pipeline-ship.png", f: [0.626, 0.372, 0.785, 0.60] },
  { src: "design-reference/mockup-pipeline.png", out: "public/assets/pipeline-handoff.png", f: [0.812, 0.372, 0.971, 0.60] },
];

for (const j of jobs) {
  const meta = await sharp(j.src).metadata();
  const left = Math.round(j.f[0] * meta.width);
  const top = Math.round(j.f[1] * meta.height);
  const width = Math.round((j.f[2] - j.f[0]) * meta.width);
  const height = Math.round((j.f[3] - j.f[1]) * meta.height);
  await sharp(j.src).extract({ left, top, width, height }).png().toFile(j.out);
  console.log(`${j.out}  ${width}x${height} (from ${meta.width}x${meta.height})`);
}
