/**
 * Builds the Spanish pages (/es/…) out of the same components as the English
 * ones. Every translatable text in the markup carries its COPY key
 * (data-i18n, data-i18n-alt, data-i18n-ph) — the same keys the language toggle
 * uses in the browser (applyLang in site.ts) — so here they are swapped for
 * the Spanish copy before the page is written, and search engines read each
 * language at its own address. Text the components render without a key
 * (project details, titles, JSON-LD) is chosen by language where it is built.
 */
import { defineMiddleware } from "astro:middleware";
import { COPY, langOfPath } from "./data/copy";

const ES = COPY.es as unknown as Record<string, string>;

const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s: string) => escapeText(s).replace(/"/g, "&quot;");

/** Elements holding only text, as applyLang requires (it sets textContent). */
const TEXT = /(<([a-z0-9-]+)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/gi;
const N = /\sdata-n="([^"]*)"/;

function toSpanish(html: string) {
  return html
    .replace(/<html lang="en"/, '<html lang="es"')
    .replace(TEXT, (all, open: string, _tag, key: string, _text, close: string) => {
      const value = ES[key];
      if (typeof value !== "string") return all;
      const n = open.match(N)?.[1];
      return open + escapeText(n ? value.replace("{n}", n) : value) + close;
    })
    .replace(/<(img|input|textarea)\b[^>]*>/gi, (tag) =>
      tag
        .replace(/\salt="[^"]*"([^>]*\sdata-i18n-alt="([^"]+)")/, (all, rest: string, key: string) =>
          typeof ES[key] === "string" ? ` alt="${escapeAttr(ES[key])}"${rest}` : all
        )
        .replace(/(\sdata-i18n-alt="([^"]+)"[^>]*?)\salt="[^"]*"/, (all, before: string, key: string) =>
          typeof ES[key] === "string" ? `${before} alt="${escapeAttr(ES[key])}"` : all
        )
        .replace(/\splaceholder="[^"]*"([^>]*\sdata-i18n-ph="([^"]+)")/, (all, rest: string, key: string) =>
          typeof ES[key] === "string" ? ` placeholder="${escapeAttr(ES[key])}"${rest}` : all
        )
    );
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const type = response.headers.get("content-type") ?? "";
  if (langOfPath(context.url.pathname) !== "es" || !type.includes("text/html")) return response;
  return new Response(toSpanish(await response.text()), response);
});
