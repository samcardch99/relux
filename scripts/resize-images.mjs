/**
 * Genera versiones mas pequeñas de las fotos de public/assets para que el
 * navegador elija la que necesita (srcset): un movil no tiene por que bajar la
 * foto de 2400 px pensada para escritorio.
 *
 *   public/assets/foo.webp  →  public/assets/w/foo-800.webp, foo-1200.webp
 *
 * Solo se crean las anchuras menores que el original, y escribe en
 * src/data/image-widths.json que anchuras tiene cada foto, que es lo que lee
 * src/data/images.ts. Las dos salidas son regenerables y no se versionan.
 * Se ejecuta antes de `astro dev` y `astro build`; si una version ya existe y
 * es mas nueva que su original, no la vuelve a hacer.
 */
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [800, 1200];
const SRC = "public/assets";
const OUT = path.join(SRC, "w");
const MANIFEST = "src/data/image-widths.json";

await mkdir(OUT, { recursive: true });

const newer = async (file, than) => {
  try {
    return (await stat(file)).mtimeMs >= than;
  } catch {
    return false;
  }
};

const manifest = {};
let made = 0;
for (const name of (await readdir(SRC)).sort()) {
  if (!/\.(webp|jpe?g|png)$/i.test(name) || name.startsWith("mask-")) continue;
  const file = path.join(SRC, name);
  const { width } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < width * 0.85);
  if (!widths.length) continue;

  const mtime = (await stat(file)).mtimeMs;
  const base = name.replace(/\.[^.]+$/, "");
  for (const w of widths) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    if (await newer(out, mtime)) continue;
    await sharp(file).resize({ width: w }).webp({ quality: 80, effort: 6 }).toFile(out);
    made++;
  }
  manifest[`/assets/${name}`] = [...widths, width];
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`resize-images: ${Object.keys(manifest).length} fotos, ${made} versiones nuevas`);
