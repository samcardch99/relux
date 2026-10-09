import type { APIRoute } from "astro";
import { VIEW_PATHS, WORK, projectPath } from "../data/copy";

/** Every address the site has: the homepage, each view and each listed project. */
export const GET: APIRoute = ({ site }) => {
  const paths = ["/", ...Object.values(VIEW_PATHS), ...WORK.map((p) => projectPath(p.i))];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  );
};
