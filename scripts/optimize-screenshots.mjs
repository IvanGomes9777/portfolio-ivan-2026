import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "../public/screenshots");

const pngs = readdirSync(DIR).filter((f) => f.endsWith(".png"));

for (const file of pngs) {
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.png$/, ".webp"));
  const before = statSync(src).size;
  await sharp(src)
    .resize(1600, 900, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(out);
  const after = statSync(out).size;
  unlinkSync(src);
  console.log(
    `${file} → ${path.basename(out)}  ${(before / 1e6).toFixed(2)}MB → ${(after / 1e3).toFixed(0)}KB`
  );
}
console.log("done");
