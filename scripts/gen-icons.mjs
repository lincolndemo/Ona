// Rasterises the app icon (scripts/icon-source.svg) into the PNG sizes the PWA
// and iOS home screen need. Re-run with: node scripts/gen-icons.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const svg = readFileSync(new URL("./icon-source.svg", import.meta.url));

const targets = [
  [192, "public/pwa-192.png"],
  [512, "public/pwa-512.png"],
  [180, "public/apple-touch-icon.png"],
];

for (const [size, out] of targets) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log("wrote", out, `(${size}x${size})`);
}
