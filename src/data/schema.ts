/**
 * JSON-LD for search engines, rendered into each page's <head> (Layout.astro).
 * Only facts the site already states: no street address, hours, licence or
 * ratings until the business publishes them.
 */
import {
  COPY,
  DETAIL,
  EMAIL,
  FOUNDERS,
  INSTAGRAM,
  REVIEWS_URL,
  SERVICES,
  SHOTS,
  VIEW_PATHS,
  WORK,
  projectPath,
} from "./copy";

const SITE = "https://relux-construction.com";
const ORG = `${SITE}/#organization`;
const WEBSITE = `${SITE}/#website`;
const en = COPY.en;
const abs = (path: string) => new URL(path, SITE).href;
const MIAMI = {
  "@type": "City",
  name: "Miami",
  containedInPlace: { "@type": "State", name: "Florida" },
};

/** The business and the site; on every page. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": ORG,
      name: "RE-LUX Construction",
      url: `${SITE}/`,
      description:
        "Interior remodeling and custom woodwork for homes and businesses across Miami. Kitchens, closets, bathrooms and complete interiors, designed and built by our own team.",
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
      sameAs: [INSTAGRAM.url, REVIEWS_URL],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: `${SITE}/`,
      name: "RE-LUX Construction",
      inLanguage: ["en", "es"],
      publisher: { "@id": ORG },
    },
  ],
};

/** The four services; homepage only. */
export const servicesGraph = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => ({
    "@type": "Service",
    "@id": `${SITE}/#service-${s.n}`,
    name: en[s.titleKey],
    description: en[s.descKey],
    url: `${SITE}/#services`,
    provider: { "@id": ORG },
    areaServed: MIAMI,
  })),
};

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
export const viewSchema = (view: keyof typeof VIEW_PATHS, name: string) => ({
  "@context": "https://schema.org",
  ...crumbs([
    ["Home", "/"],
    [name, VIEW_PATHS[view]],
  ]),
});

/** Breadcrumbs and the photo gallery of one project page. */
export const projectSchema = (index: number) => {
  const project = WORK.find((p) => p.i === index)!;
  const url = abs(projectPath(index));
  const name = en[project.titleKey];
  const location = DETAIL.en[index].meta.find(([k]) => k === "Location")?.[1];
  return {
    "@context": "https://schema.org",
    "@graph": [
      crumbs([
        ["Home", "/"],
        ["All projects", VIEW_PATHS.work],
        [name, projectPath(index)],
      ]),
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: `${name} — RE-LUX Construction`,
        description: DETAIL.en[index].summary,
        about: en[project.tagKey],
        image: abs(SHOTS[index].hero),
        ...(location && { contentLocation: { "@type": "Place", name: location } }),
        creator: { "@id": ORG },
        isPartOf: { "@id": WEBSITE },
      },
    ],
  };
};
