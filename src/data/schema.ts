/**
 * JSON-LD for search engines, rendered into each page's <head> (Layout.astro).
 * Only facts the site already states: no street address, hours, licence or
 * ratings until the business publishes them.
 */
import {
  COPY,
  DETAIL,
  HOME_DESCRIPTION,
  HOME_PATH,
  EMAIL,
  FOUNDERS,
  INSTAGRAM,
  REVIEWS_URL,
  SERVICES,
  SHOTS,
  VIEW_PATHS,
  WORK,
  projectPath,
  type Lang,
} from "./copy";

const SITE = "https://relux-construction.com";
const ORG = `${SITE}/#organization`;
const WEBSITE = `${SITE}/#website`;
const abs = (path: string) => new URL(path, SITE).href;
const MIAMI = {
  "@type": "City",
  name: "Miami",
  containedInPlace: { "@type": "State", name: "Florida" },
};

/**
 * The business, the site and the page itself; on every page, in its language
 * (the business keeps one @id across both, so it is one entity).
 */
export const siteGraph = (lang: Lang, path: string, title: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": ORG,
      name: "RE-LUX Construction",
      url: abs(HOME_PATH[lang]),
      description: HOME_DESCRIPTION[lang],
      logo: abs("/logo-512.png"),
      image: abs("/assets/liz-1.webp"),
      email: EMAIL,
      telephone: FOUNDERS[0].tel,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: MIAMI,
      founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, telephone: f.tel })),
      contactPoint: FOUNDERS.map((f) => ({
        "@type": "ContactPoint",
        contactType: "customer service",
        name: f.name,
        telephone: f.tel,
        email: EMAIL,
        availableLanguage: ["English", "Spanish"],
      })),
      knowsLanguage: ["en", "es"],
      hasMap: REVIEWS_URL,
      sameAs: [INSTAGRAM.url],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: `${SITE}/`,
      name: "RE-LUX Construction",
      inLanguage: ["en", "es"],
      publisher: { "@id": ORG },
    },
    {
      "@type": "WebPage",
      "@id": `${abs(path)}#webpage`,
      url: abs(path),
      name: title,
      inLanguage: lang,
      isPartOf: { "@id": WEBSITE },
      about: { "@id": ORG },
    },
  ],
});

/** The four services; homepage only, in its language. */
export const servicesGraph = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => ({
    "@type": "Service",
    "@id": `${abs(HOME_PATH[lang])}#service-${s.n}`,
    name: COPY[lang][s.titleKey],
    description: COPY[lang][s.descKey],
    url: `${abs(HOME_PATH[lang])}#services`,
    inLanguage: lang,
    provider: { "@id": ORG },
    areaServed: MIAMI,
  })),
});

const HOME_CRUMB = { en: "Home", es: "Inicio" } as const;

const crumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], n) => ({
    "@type": "ListItem",
    position: n + 1,
    name,
    item: abs(path),
  })),
});

/** Breadcrumbs for the work, about and process pages. */
export const viewSchema = (view: keyof (typeof VIEW_PATHS)["en"], name: string, lang: Lang) => ({
  "@context": "https://schema.org",
  ...crumbs([
    [HOME_CRUMB[lang], HOME_PATH[lang]],
    [name, VIEW_PATHS[lang][view]],
  ]),
});

/** Breadcrumbs and the photo gallery of one project page. */
export const projectSchema = (index: number, lang: Lang) => {
  const t = COPY[lang];
  const project = WORK.find((p) => p.i === index)!;
  const url = abs(projectPath(index, lang));
  const name = t[project.titleKey];
  // Meta labels are per language; the location row is the one naming a place
  const location = DETAIL[lang][index].meta.find(([k]) => k === "Location" || k === "Ubicación")?.[1];
  return {
    "@context": "https://schema.org",
    "@graph": [
      crumbs([
        [HOME_CRUMB[lang], HOME_PATH[lang]],
        [t.workTitle + " " + t.workTitleEm, VIEW_PATHS[lang].work],
        [name, projectPath(index, lang)],
      ]),
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: `${name} — RE-LUX Construction`,
        description: DETAIL[lang][index].summary,
        about: t[project.tagKey],
        inLanguage: lang,
        image: abs(SHOTS[index].hero),
        ...(location && { contentLocation: { "@type": "Place", name: location } }),
        creator: { "@id": ORG },
        isPartOf: { "@id": WEBSITE },
      },
    ],
  };
};
