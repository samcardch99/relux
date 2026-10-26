/**
 * Layout of a project's photo gallery, shared by the server (DetailView.astro,
 * for a project's own page) and the browser (renderShots in site.ts, which
 * redraws it as projects open and corrects each photo's proportion once it
 * loads).
 *
 * Photos go in rows and each column is as wide as its photo's proportion, so a
 * row has one height and every photo shows whole.
 */

/** The two proportions the renders come in; real files correct them on load. */
export const LANDSCAPE = 16 / 9;
export const PORTRAIT = 4 / 5;
/** Sum of proportions that fills a row: two landscapes, three portraits, or one of each. */
export const ROW_SPAN = 2.3;
/** Gap between photos; matches `.detail__row` in DetailView.astro. */
export const GALLERY_GAP = 20;

/** Starting proportions: `tall` lists the gallery positions that are portraits. */
export const startRatios = (count: number, tall: number[] = []) =>
  Array.from({ length: count }, (_, i) => (tall.includes(i) ? PORTRAIT : LANDSCAPE));

/** Positions grouped into rows: a row closes once its proportions reach ROW_SPAN. */
export function groupRows(ratios: number[]) {
  const rows: number[][] = [[]];
  let span = 0;
  ratios.forEach((ratio, i) => {
    if (span >= ROW_SPAN) {
      rows.push([]);
      span = 0;
    }
    rows[rows.length - 1].push(i);
    span += ratio;
  });
  return rows;
}

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

/**
 * CSS variables for one row: `--cols`, normalised so the tracks add up to 1fr
 * (below that a lone portrait would only fill part of its row), and for a short
 * last row a `--row-width` that keeps the height of the row above (or of a full
 * row of portraits when it is the only one), centred instead of stretched.
 */
export function rowVars(row: number[], previous: number[] | undefined, isLast: boolean) {
  const s = sum(row);
  const cols = row.map((r) => `minmax(0, ${r / s}fr)`).join(" ");
  if (!isLast || s >= ROW_SPAN) return { cols };
  const refSpan = previous ? sum(previous) : 3 * PORTRAIT;
  const refGaps = ((previous?.length ?? 3) - 1) * GALLERY_GAP;
  const rowWidth = `calc((100% - ${refGaps}px) * ${s / refSpan} + ${(row.length - 1) * GALLERY_GAP}px)`;
  return { cols, rowWidth };
}
