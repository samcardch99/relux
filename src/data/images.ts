/**
 * Responsive sources for the photos in public/assets: the smaller copies made
 * by scripts/resize-images.mjs (listed in image-widths.json), so each browser
 * downloads the size it actually shows.
 */
import WIDTHS from "./image-widths.json";

const widths = WIDTHS as Record<string, number[]>;

/** How wide a photo shows at each layout, for the `sizes` attribute. */
export const SIZES = {
  full: "100vw",
  half: "(max-width: 720px) 100vw, 50vw",
  card: "(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw",
  panel: "(max-width: 720px) 100vw, 40vw",
} as const;

/** `srcset` for a photo, or undefined when it has no smaller copies. */
export function srcsetFor(src: string): string | undefined {
  const list = widths[src];
  if (!list) return undefined;
  const base = src.replace(/^\/assets\//, "/assets/w/").replace(/\.[^.]+$/, "");
  return list
    .map((w, i) => (i === list.length - 1 ? `${src} ${w}w` : `${base}-${w}.webp ${w}w`))
    .join(", ");
}

/** Spread onto an <img>: src plus its srcset and sizes. */
export function responsive(src: string, sizes: string = SIZES.full) {
  const srcset = srcsetFor(src);
  return srcset ? { src, srcset, sizes } : { src };
}
