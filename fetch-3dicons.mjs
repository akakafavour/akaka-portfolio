import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public/assets/3d", { recursive: true });

const base = "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes";
const icons = [
  { id: "744cc0-rocket", name: "rocket" },
  { id: "ddbd61-bulb", name: "bulb" },
  { id: "1b714e-tick", name: "tick" },
  { id: "4f52f8-cube", name: "cube" },
];
const sizes = [1000, 500, 400];

for (const { id, name } of icons) {
  let saved = false;
  for (const size of sizes) {
    const url = `${base}/${id}/front/${size}/gradient.webp`;
    try {
      const res = await fetch(url);
      if (!res.ok) { console.log(`${name} ${size}: HTTP ${res.status}`); continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const out = `public/assets/3d/${name}.png`;
      await sharp(buf).png().toFile(out);
      console.log(`saved ${out} (${buf.length} bytes webp -> png, size=${size})`);
      saved = true;
      break;
    } catch (e) {
      console.log(`${name} ${size} failed: ${String(e).slice(0, 60)}`);
    }
  }
  if (!saved) console.log(`FAILED: ${name}`);
}
