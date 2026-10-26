import type { APIRoute } from "astro";
import { HOME_PATH, PRIVACY_PATH, VIEW_PATHS, WORK, projectPath, type Lang } from "../data/copy";

/** Every address the site has, in both languages; each entry names its pair
 *  (hreflang) so search engines serve the right one. */
export const GET: APIRoute = ({ site }) => {
  const pages = (lang: Lang) => [
    HOME_PATH[lang],
    ...Object.values(VIEW_PATHS[lang]),
    ...WORK.map((p) => projectPath(p.i, lang)),
    PRIVACY_PATH[lang],
  ];
  const en = pages("en");
  const es = pages("es");
  const abs = (p: string) => new URL(p, site).href;
  const entry = (loc: string, pair: [string, string]) =>
    [
      `  <url><loc>${abs(loc)}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${abs(pair[0])}"/>`,
      `    <xhtml:link rel="alternate" hreflang="es" href="${abs(pair[1])}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pair[0])}"/>`,
      `  </url>`,
    ].join("\n");
  const urls = en.flatMap((p, i) => [entry(p, [p, es[i]]), entry(es[i], [p, es[i]])]).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  );
};
