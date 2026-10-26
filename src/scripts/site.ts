import {
  COPY,
  DETAIL,
  HOME_PATH,
  PAGE_TITLES,
  PROJECTS,
  SHOTS,
  SITE_NAME,
  VIEW_PATHS,
  WORK,
  counterpartPath,
  projectPath,
  type Lang,
} from "../data/copy";
import { SIZES, srcsetFor } from "../data/images";

const STORAGE_KEY = "relux:lang";

/** The two proportions the renders come in. */
const LANDSCAPE = 16 / 9;
const PORTRAIT = 4 / 5;
/** Sum of proportions that fills a gallery row (see renderShots). */
const ROW_SPAN = 2.3;
/** Gap between gallery photos; matches `.detail__row` in DetailView.astro. */
const GALLERY_GAP = 20;
/** Gap inside the video row; matches `.vid__row`. */
const VIDEO_GAP = 16;

/* ──────────────────────────────────────────────
   Images
   A photo that fails to load fades out and leaves
   the tonal `.media` block behind it, so the page
   never shows a broken-image box.
   ────────────────────────────────────────────── */

function watchImage(img: HTMLImageElement) {
  if (img.complete) {
    if (img.naturalWidth === 0 && img.getAttribute("src")) {
      img.dataset.failed = "";
    }
    return;
  }
  img.addEventListener("error", () => (img.dataset.failed = ""), { once: true });
}

/** `sizes` (SIZES in data/images) lets the browser pick a smaller copy. */
function setImage(img: HTMLImageElement | null, src: string, alt = "", sizes: string = SIZES.full) {
  if (!img) return;
  delete img.dataset.failed;
  // srcset first, so the browser never starts on the full-size file
  const srcset = srcsetFor(src);
  if (srcset) {
    img.sizes = sizes;
    img.srcset = srcset;
  } else {
    img.removeAttribute("srcset");
  }
  img.src = src;
  img.alt = alt;
  watchImage(img);
}

document.querySelectorAll("img").forEach(watchImage);

/* ──────────────────────────────────────────────
   Language
   ────────────────────────────────────────────── */

/* Each page is built in one language (English at the root, Spanish under
   /es/), and <html lang> says which. The toggle loads the same page in the
   other language and remembers the choice; a visitor who never chose, whose
   browser is in Spanish, is taken to the Spanish page on arrival. */
const lang: Lang = document.documentElement.lang === "es" ? "es" : "en";

function preferredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* storage unavailable — fall through to the navigator hint */
  }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : null;
}

/** Load the current page (view, project and section included) in `next`. */
function goToLang(next: Lang, replace = false) {
  if (next === lang) return false;
  // A page with no counterpart (the 404) leads to the other language's homepage
  const path = counterpartPath(location.pathname) ?? HOME_PATH[next];
  const url = path + location.hash;
  if (replace) location.replace(url);
  else location.assign(url);
  return true;
}

// Only pages with a counterpart: the 404 stays put, so the visitor sees it
{
  const preferred = preferredLang();
  if (preferred && counterpartPath(location.pathname)) goToLang(preferred, true);
}

/** On load, fill in what the server can't: the WhatsApp greeting, the parts drawn in the browser (project detail, reviews) and the
 *  form. Changing language loads the other page (goToLang). */
function applyLang(next: Lang) {
  // Keyed texts (data-i18n…) are already in the page's language, written by
  // the server (middleware.ts): rewriting them here would repaint the hero
  // and delay its first paint
  const t = COPY[next] as unknown as Record<string, string>;

  // WhatsApp links open a chat with a greeting in the visitor's language
  document.querySelectorAll<HTMLAnchorElement>("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${a.dataset.wa}?text=${encodeURIComponent(t.waText)}`;
    a.setAttribute("aria-label", t.waLabel);
  });

  if (openDetail !== null) renderDetail(openDetail);
  refreshReview?.();
  // The tab title follows the language too — on the pages this script titles
  // (the homepage and its views; the 404 and privacy pages keep their own)
  if (hasHome || stack.length) document.title = titleFor(current());
  labelMenu();

  // The contact form is a React island and re-reads its copy from this event.
  window.dispatchEvent(new CustomEvent("relux:lang", { detail: { lang: next } }));
}

// EN / ES are links to the page's counterpart; the script goes to the one
// matching what is on screen now (an open view or project) instead
document.querySelectorAll<HTMLElement>("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const next = btn.dataset.lang;
    if (next !== "en" && next !== "es") return;
    event.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* non-fatal: the toggle still works for this visit */
    }
    goToLang(next);
  });
});

/* ──────────────────────────────────────────────
   Full-screen views
   ────────────────────────────────────────────── */

type ViewName = "work" | "about" | "process" | "detail";

const views: Record<ViewName, HTMLElement | null> = {
  work: document.getElementById("view-work"),
  about: document.getElementById("view-about"),
  process: document.getElementById("view-process"),
  detail: document.getElementById("view-detail"),
};

/** Only the homepage carries the page underneath the views; a view's own
 *  page has nothing to close onto, so it loads the homepage instead. */
// The 404 has its own <main>, marked so it isn't taken for the homepage
const hasHome = !!document.querySelector("main:not([data-standalone])");

/* A page carries one contact section (the homepage's, or that of the view the
   page is about). Views without their own hold an empty slot, and the section
   moves into the view on top, returning to its place when none is. */
const contactSection = document.querySelector<HTMLElement>("[data-contact]");
const contactHome = contactSection && {
  parent: contactSection.parentNode!,
  next: contactSection.nextSibling,
};
function placeContact() {
  if (!contactSection || !contactHome) return;
  const top = stack[stack.length - 1];
  const slot = top ? views[top]?.querySelector("[data-contact-slot]") : null;
  if (slot) {
    if (contactSection.parentNode !== slot) slot.append(contactSection);
  } else if (contactSection.parentNode !== contactHome.parent) {
    contactHome.parent.insertBefore(contactSection, contactHome.next);
  }
}

/** Views currently on screen, innermost last. */
const stack: ViewName[] = [];
let openDetail: number | null = null;
let lastFocused: HTMLElement | null = null;

function openView(name: ViewName) {
  const el = views[name];
  if (!el) return;

  if (!stack.length) lastFocused = document.activeElement as HTMLElement;

  el.hidden = false;
  el.scrollTop = 0;
  if (!stack.includes(name)) stack.push(name);
  document.body.classList.add("is-locked");

  el.querySelector<HTMLElement>("[data-close]")?.focus({ preventScroll: true });
  placeContact();
  // Deferred: on landing this runs before the header handlers below are set up
  requestAnimationFrame(() => markScrolled());
}

function closeView(name: ViewName) {
  const el = views[name];
  if (el) el.hidden = true;

  const i = stack.indexOf(name);
  if (i > -1) stack.splice(i, 1);
  if (name === "detail") openDetail = null;

  if (!stack.length) {
    document.body.classList.remove("is-locked");
    lastFocused?.focus({ preventScroll: true });
    lastFocused = null;
  }
  placeContact();
  requestAnimationFrame(() => markScrolled());
}

function closeAllViews() {
  (["detail", "process", "about", "work"] as ViewName[]).forEach(closeView);
}

/* ──────────────────────────────────────────────
   Project detail
   ────────────────────────────────────────────── */

function renderDetail(index: number) {
  const project = PROJECTS[index];
  const entry = DETAIL[lang]?.[index];
  const shots = SHOTS[index];
  if (!project || !entry || !shots) return;

  const t = COPY[lang] as unknown as Record<string, string>;
  openDetail = index;

  const tag = document.getElementById("detail-tag");
  const title = document.getElementById("detail-title");
  const summary = document.getElementById("detail-summary");
  if (tag) tag.textContent = t[project.tagKey];
  if (title) title.textContent = t[project.titleKey];
  if (summary) summary.textContent = entry.summary;

  // A single cropped banner, or three whole portraits in its place.
  const heroImg = document.getElementById("detail-hero") as HTMLImageElement | null;
  const heroSet = document.getElementById("detail-hero-set");
  document.getElementById("detail-hero-box")?.classList.toggle("is-set", !!shots.heroSet);
  if (heroSet) heroSet.hidden = !shots.heroSet;
  if (heroImg) {
    heroImg.hidden = !!shots.heroSet;
    heroImg.style.objectPosition = shots.heroFocus ?? "";
  }
  if (shots.heroSet) {
    shots.heroSet.forEach((src, n) =>
      setImage(
        document.getElementById(`detail-hero-${n + 1}`) as HTMLImageElement | null,
        src,
        t[project.titleKey],
        SIZES.half
      )
    );
  } else {
    setImage(heroImg, shots.hero, t[project.titleKey]);
  }

  const paras = document.getElementById("detail-paras");
  if (paras) {
    paras.replaceChildren(
      ...entry.paras.map((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        return p;
      })
    );
  }

  const meta = document.getElementById("detail-meta");
  if (meta) {
    meta.replaceChildren(
      ...entry.meta.map(([key, value]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = key;
        dd.textContent = value;
        row.append(dt, dd);
        return row;
      })
    );
  }

  const ba = document.getElementById("detail-ba");
  if (ba) {
    ba.hidden = !shots.before;
    if (shots.before) {
      setImage(document.getElementById("ba-after") as HTMLImageElement | null, shots.hero, t.baAfter);
      setImage(document.getElementById("ba-before") as HTMLImageElement | null, shots.before, t.baBefore);
      setBeforeAfter(50);
    }
  }

  // Video row, only when there is a video: the clip and one portrait, in
  // columns as wide as their proportions so both share one height.
  const vid = document.getElementById("detail-vid");
  if (vid) vid.hidden = !shots.video;
  const vidTag = document.getElementById("detail-vid-tag");
  if (vidTag) vidTag.textContent = t[project.tagKey];
  const video = document.getElementById("detail-video") as HTMLVideoElement | null;
  if (video) {
    if (shots.video) {
      if (video.getAttribute("src") !== shots.video) video.src = shots.video;
    } else if (video.hasAttribute("src")) {
      video.removeAttribute("src");
      video.load();
    }
  }
  if (shots.video) {
    const ratio = shots.videoRatio ?? 9 / 16;
    document.getElementById("detail-vid-frame")?.style.setProperty("--ratio", String(ratio));
    // Same height as a gallery row of three portraits, centred.
    const total = ratio + PORTRAIT;
    const row = document.getElementById("detail-vid-row");
    row?.style.setProperty("--cols", `minmax(0, ${ratio / total}fr) minmax(0, ${PORTRAIT / total}fr)`);
    row?.style.setProperty(
      "--row-width",
      `calc((100% - ${2 * GALLERY_GAP}px) * ${total / (3 * PORTRAIT)} + ${VIDEO_GAP}px)`
    );
    if (shots.videoSide) {
      setImage(document.getElementById("detail-side") as HTMLImageElement | null, shots.videoSide, t[project.titleKey]);
    }
  }

  renderShots(shots.shots, shots.tall ?? [], entry.captions, t[project.titleKey]);
  tagGallery();
}

/**
 * Numbers every photo on screen in the detail view, in reading order, for the
 * full-screen viewer (ProjectLightbox). A photo that appears twice keeps the
 * number it got first, so both open the same slide.
 */
function tagGallery() {
  const imgs = document.querySelectorAll<HTMLImageElement>(
    "#detail-hero:not([hidden]), #detail-hero-set:not([hidden]) img, #detail-vid:not([hidden]) #detail-side, #detail-shots img"
  );
  const seen = new Map<string, number>();
  document.querySelectorAll<HTMLImageElement>("#view-detail img[data-lb-index]").forEach((img) => {
    delete img.dataset.lbIndex;
    img.removeAttribute("role");
    img.removeAttribute("tabindex");
  });
  imgs.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) return;
    if (!seen.has(src)) seen.set(src, seen.size);
    img.dataset.lbIndex = String(seen.get(src));
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");
    img.setAttribute("aria-haspopup", "dialog");
  });
}

/* ── Gallery ── */

/**
 * Lays the gallery out in rows and makes each column as wide as its photo's
 * proportion: the row then has one height and every photo shows whole.
 * Proportions start from `tall` and are corrected from the file itself once
 * it loads (the rows stay as first grouped).
 */
function renderShots(srcs: string[], tall: number[], captions: string[], title: string) {
  const shotsEl = document.getElementById("detail-shots");
  if (!shotsEl) return;

  const figures = srcs.map((src, i) => {
    const figure = document.createElement("figure");
    const frame = document.createElement("div");
    frame.className = "media";
    const img = document.createElement("img");
    img.loading = "lazy";
    frame.append(img);

    const caption = document.createElement("figcaption");
    caption.textContent = captions[i] ?? "";

    figure.append(frame, caption);
    // Uncaptioned photos still say what they show, for screen readers and search
    const t = COPY[lang] as unknown as Record<string, string>;
    setImage(img, src, captions[i] || `${title} — ${t.altPhoto} ${i + 1}`, SIZES.half);
    return { figure, frame, img, ratio: tall.includes(i) ? PORTRAIT : LANDSCAPE };
  });

  // A row closes once its proportions add up to ROW_SPAN: two landscapes,
  // three portraits, or one of each.
  type Item = (typeof figures)[number];
  const groups: Item[][] = [[]];
  let span = 0;
  for (const it of figures) {
    if (span >= ROW_SPAN) {
      groups.push([]);
      span = 0;
    }
    groups[groups.length - 1].push(it);
    span += it.ratio;
  }

  const sum = (items: Item[]) => items.reduce((s, it) => s + it.ratio, 0);
  const rows = groups.map((items) => {
    const el = document.createElement("div");
    el.className = "detail__row";
    el.append(...items.map((it) => it.figure));
    return { el, items };
  });

  // A short last row keeps the height of the row above (or of a full row of
  // portraits when it is the only one) and is centred, instead of stretching.
  const layout = () => {
    rows.forEach(({ el, items }, r) => {
      items.forEach((it) => it.frame.style.setProperty("--ratio", String(it.ratio)));
      // Normalised so the tracks always add up to 1fr: below that, a lone
      // portrait's column would only fill part of its row.
      const s = sum(items);
      el.style.setProperty("--cols", items.map((it) => `minmax(0, ${it.ratio / s}fr)`).join(" "));
      const isShort = r === rows.length - 1 && s < ROW_SPAN;
      if (!isShort) {
        el.style.removeProperty("--row-width");
        return;
      }
      const ref = rows[r - 1]?.items;
      const refSpan = ref ? sum(ref) : 3 * PORTRAIT;
      const refGaps = ((ref?.length ?? 3) - 1) * GALLERY_GAP;
      el.style.setProperty(
        "--row-width",
        `calc((100% - ${refGaps}px) * ${s / refSpan} + ${(items.length - 1) * GALLERY_GAP}px)`
      );
    });
  };
  layout();

  rows.forEach(({ items }) =>
    items.forEach((it) => {
      const correct = () => {
        if (!it.img.naturalWidth) return;
        const ratio = it.img.naturalWidth / it.img.naturalHeight;
        if (Math.abs(ratio - it.ratio) < 0.01) return;
        it.ratio = ratio;
        layout();
      };
      if (it.img.complete) correct();
      else it.img.addEventListener("load", correct, { once: true });
    })
  );

  shotsEl.replaceChildren(...rows.map(({ el }) => el));
}

/* ── Before / after slider ── */

const baStage = document.getElementById("ba-stage");
const baClip = document.getElementById("ba-clip");
const baHandle = document.getElementById("ba-handle");
let baPct = 50;

function setBeforeAfter(pct: number) {
  baPct = Math.max(0, Math.min(100, pct));
  if (baClip) baClip.style.clipPath = `inset(0 ${(100 - baPct).toFixed(2)}% 0 0)`;
  if (baHandle) {
    baHandle.style.left = `${baPct.toFixed(2)}%`;
    baHandle.setAttribute("aria-valuenow", String(Math.round(baPct)));
  }
}

if (baStage && baHandle) {
  // getBoundingClientRect and clientX are both in viewport px, so the page
  // zoom cancels out of the ratio.
  const follow = (e: PointerEvent) => {
    const r = baStage.getBoundingClientRect();
    setBeforeAfter(((e.clientX - r.left) / r.width) * 100);
  };
  baHandle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    baHandle.setPointerCapture(e.pointerId);
    follow(e);
    baHandle.addEventListener("pointermove", follow);
  });
  const release = () => baHandle.removeEventListener("pointermove", follow);
  baHandle.addEventListener("pointerup", release);
  baHandle.addEventListener("pointercancel", release);
  baHandle.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setBeforeAfter(baPct - 5);
    else if (e.key === "ArrowRight") setBeforeAfter(baPct + 5);
    else return;
    e.preventDefault();
  });
}

function openProject(index: number) {
  renderDetail(index);
  openView("detail");
}

/* ──────────────────────────────────────────────
   Addresses
   Every open view has its own path (VIEW_PATHS,
   projectPath). Opening one pushes a history entry
   that records the whole stack of views, so Back
   closes the view and Forward brings it back.
   `depth` counts the entries pushed on top of the
   one the visitor landed on: while it is above 0,
   closing a view is simply going back in history.
   ────────────────────────────────────────────── */

type Route = { views: ViewName[]; project: number | null };
type HistoryState = Route & { relux: true; depth: number };

let depth = 0;
/** Views only cover the page, so going back must not move the page underneath;
 *  and a "close and go to…" scrolls itself once the history step has landed. */
history.scrollRestoration = "manual";
/** Where to scroll once a "close and go to…" has returned to the homepage. */
let pendingGoto: string | null = null;
/** View to open once a switch from the menu has returned to the starting entry. */
let pendingOpen: ViewName | null = null;

function pathFor({ views, project }: Route) {
  const top = views[views.length - 1];
  if (!top) return HOME_PATH[lang];
  if (top === "detail") return project === null ? HOME_PATH[lang] : projectPath(project, lang);
  return VIEW_PATHS[lang][top];
}

function routeFromPath(path: string): Route {
  const p = path.endsWith("/") ? path : `${path}/`;
  const paths = VIEW_PATHS[lang];
  for (const name of Object.keys(paths) as (keyof typeof paths)[]) {
    if (paths[name] === p) return { views: [name], project: null };
  }
  const slug = p.match(/^\/(?:projects|es\/proyectos)\/([^/]+)\/$/)?.[1];
  const project = WORK.find((w) => w.slug === slug);
  return project ? { views: ["detail"], project: project.i } : { views: [], project: null };
}

const current = (): Route => ({ views: [...stack], project: openDetail });

/** Tab titles, matching the <title> each page is built with (PAGE_TITLES). */
function titleFor({ views, project }: Route) {
  const top = views[views.length - 1];
  if (!top) return PAGE_TITLES[lang].home;
  if (top === "detail") {
    const t = COPY[lang] as unknown as Record<string, string>;
    return project === null ? SITE_NAME : `${t[PROJECTS[project].titleKey]} — ${SITE_NAME}`;
  }
  return PAGE_TITLES[lang][top];
}

function record(push: boolean, hash = "") {
  const route = current();
  if (push) depth += 1;
  const state: HistoryState = { ...route, relux: true, depth };
  const url = pathFor(route) + hash;
  if (push) history.pushState(state, "", url);
  else history.replaceState(state, "", url);
  document.title = titleFor(route);
}

/** Make the views on screen match a route, closing from the top down. */
function applyRoute({ views, project }: Route) {
  [...stack].reverse().forEach((name) => {
    if (!views.includes(name)) closeView(name);
  });
  if (views.includes("detail") && project !== null && openDetail !== project) {
    renderDetail(project);
  }
  views.forEach((name) => {
    if (stack.includes(name)) return;
    if (name === "detail" && project !== null) renderDetail(project);
    openView(name);
  });
}

function scrollToSection(id: string) {
  requestAnimationFrame(() => {
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/** Close the view on top, as the Back button would. */
function closeTop() {
  if (!stack.length) return;
  if (depth > 0) {
    history.back();
    return;
  }
  if (!hasHome) {
    location.assign(HOME_PATH[lang]);
    return;
  }
  closeView(stack[stack.length - 1]);
  record(false);
}

/** Open a view in place of whatever is open. Views share one layer, so
 *  stacking them would leave whichever comes later in the page on top; and
 *  history returns to the entry the visit started from first, so Back and the
 *  close button go straight to the homepage, not through the previous view. */
function switchToView(name: ViewName) {
  // A view's page carries only the views it opens itself; any other loads its page
  if (!views[name] && name !== "detail") {
    location.assign(VIEW_PATHS[lang][name]);
    return;
  }
  if (depth > 0) {
    // A second click while the history step is under way only changes the target
    const stepping = pendingOpen !== null;
    pendingOpen = name;
    if (!stepping) history.go(-depth);
    return;
  }
  const replacing = stack.length > 0;
  closeAllViews();
  openView(name);
  record(!replacing);
}

/** Close every view and scroll the homepage to a section. */
function closeAllAndGo(id: string) {
  if (depth > 0) {
    pendingGoto = id;
    history.go(-depth);
    return;
  }
  if (!hasHome) {
    location.assign(HOME_PATH[lang] + (id ? `#${id}` : ""));
    return;
  }
  closeAllViews();
  record(false, id ? `#${id}` : "");
  scrollToSection(id);
}

window.addEventListener("popstate", (event) => {
  const state = event.state as HistoryState | null;
  depth = state?.relux ? state.depth : 0;
  const route = state?.relux ? state : routeFromPath(location.pathname);
  if (!hasHome && (!route.views.length || pendingGoto !== null)) {
    location.assign(HOME_PATH[lang] + (pendingGoto ? `#${pendingGoto}` : ""));
    return;
  }
  applyRoute(route);
  document.title = titleFor(current());

  if (pendingGoto !== null) {
    const id = pendingGoto;
    pendingGoto = null;
    // Landed on the entry the visit started from, which may itself be a view
    if (stack.length) {
      closeAllViews();
      record(false, id ? `#${id}` : "");
    }
    scrollToSection(id);
  }

  if (pendingOpen !== null) {
    const name = pendingOpen;
    pendingOpen = null;
    switchToView(name);
  }
});

// A page loaded at a view's address arrives with that view already rendered
// open; register it so it behaves as if it had been opened here.
{
  const landing = routeFromPath(location.pathname);
  stack.length = 0;
  landing.views.forEach((name) => {
    if (name === "detail" && landing.project !== null) renderDetail(landing.project);
    openView(name);
  });
  history.replaceState(
    { ...landing, relux: true, depth: 0 } satisfies HistoryState,
    "",
    location.href
  );
}

/* ──────────────────────────────────────────────
   Wiring
   ────────────────────────────────────────────── */

document.addEventListener("click", (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  // Open a project detail. Cards are links, so a modified click still opens
  // the project's page in a new tab.
  const card = target.closest<HTMLElement>("[data-project]");
  if (card) {
    // No detail view on this page: the card's link loads the project's page
    if (!views.detail) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const index = Number(card.dataset.project);
    if (!Number.isNaN(index)) {
      openProject(index);
      record(true);
    }
    return;
  }

  // Open a named view
  const opener = target.closest<HTMLElement>("[data-open]");
  if (opener) {
    // A menu link to a view is a real address: modified clicks open it in a new tab
    if (opener.matches("a") && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    event.preventDefault();
    closeMenu();
    const name = opener.dataset.open as ViewName;
    if (stack.length === 1 && stack[0] === name) return;
    switchToView(name);
    return;
  }

  // Close a named view, optionally scrolling somewhere on the way out
  const closer = target.closest<HTMLElement>("[data-close]");
  if (closer) {
    const goto = closer.dataset.goto;
    if (goto === "contact" && scrollToViewContact()) return;
    if (goto) closeAllAndGo(goto);
    else closeTop();
    return;
  }

  // Any in-page link returns to the homepage first — except "contact", which
  // every view carries a copy of at its end. A page without the homepage (the
  // 404) has nothing to scroll to, so it loads it.
  const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (anchor) {
    closeMenu();
    if (stack.length || !hasHome) {
      event.preventDefault();
      const id = anchor.getAttribute("href")!.slice(1);
      if (id === "contact" && scrollToViewContact()) return;
      closeAllAndGo(id);
    }
  }
});

/** Scrolls the open view down to its own contact section, if it has one. */
function scrollToViewContact(): boolean {
  const top = stack[stack.length - 1];
  const contact = top ? document.getElementById(`view-${top}`)?.querySelector<HTMLElement>("[data-contact]") : null;
  if (!contact) return false;
  contact.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && stack.length) closeTop();
});

/* ── Tablet / phone menu ── */

const burger = document.getElementById("nav-burger");
const burgerLabel = document.getElementById("nav-burger-label");
const sheet = document.getElementById("nav-sheet");

const menuIsOpen = () => burger?.getAttribute("aria-expanded") === "true";

function labelMenu() {
  if (!burgerLabel) return;
  const t = COPY[lang] as unknown as Record<string, string>;
  const next = menuIsOpen() ? t.menuClose : t.menuOpen;
  if (burgerLabel.textContent === next) return;
  burgerLabel.textContent = next;
  burgerLabel.animate(
    [
      { opacity: 0, transform: "translateY(5px)", letterSpacing: "0.34em" },
      { opacity: 1, transform: "none", letterSpacing: "0.24em" },
    ],
    { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
  );
}

let sheetTimer = 0;

function setMenu(open: boolean) {
  burger?.setAttribute("aria-expanded", String(open));
  if (sheet) {
    clearTimeout(sheetTimer);
    if (open) {
      sheet.hidden = false;
      void sheet.offsetHeight; // start from the closed state so it animates
      sheet.classList.add("is-open");
    } else {
      sheet.classList.remove("is-open");
      // Hide once the curtain is up (0.22s delay + 0.7s lift)
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sheetTimer = window.setTimeout(() => (sheet.hidden = true), reduce ? 0 : 950);
    }
  }
  // Only lock here if no full-screen view already holds the lock
  if (!stack.length) document.body.classList.toggle("is-locked", open);
  labelMenu();
}

function closeMenu() {
  if (menuIsOpen()) setMenu(false);
}

burger?.addEventListener("click", () => setMenu(!menuIsOpen()));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuIsOpen()) setMenu(false);
});

// Back to desktop width: the sheet is gone, so release the scroll lock too
window.matchMedia("(min-width: 1081px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});

/* Once whatever is on screen (the page, or an open view, which scrolls on its
   own) has moved past the top, the header gets a solid backing so titles
   don't show through it. Scroll doesn't bubble, so listen in the capture phase. */
const siteNav = document.getElementById("site-nav");
function markScrolled() {
  const top = stack.length ? views[stack[stack.length - 1]]?.scrollTop ?? 0 : window.scrollY;
  siteNav?.classList.toggle("is-scrolled", top > 24);
}
document.addEventListener("scroll", markScrolled, { capture: true, passive: true });
markScrolled();

/* The floating WhatsApp button steps aside while the contact section is on
   screen: it would cover the form, and the section lists every way to reach
   us anyway. The section moves into whichever view is open; the observer
   follows the element. */
{
  const wa = document.querySelector<HTMLElement>(".wa");
  if (wa && contactSection && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => wa.classList.toggle("is-away", entry.isIntersecting), {
      threshold: 0.15,
    }).observe(contactSection);
  }
}

/* Contact clicks reach Google Analytics as events, once it is enabled
   (Layout.astro); without it window.gtag doesn't exist and this does nothing.
   The form reports its own "generate_lead" (ContactForm.jsx). */
document.addEventListener("click", (e) => {
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
  if (!gtag || !link) return;
  const href = link.getAttribute("href") ?? "";
  if (link.hasAttribute("data-wa")) gtag("event", "whatsapp_click");
  else if (href.startsWith("tel:")) gtag("event", "phone_click", { number: href.slice(4) });
  else if (href.startsWith("mailto:")) gtag("event", "email_click");
});

/* Before the form's island hydrates, its markup is a plain <form> with no
   action: a submit then would reload the page and lose the message. Hold it;
   once hydrated, react-hook-form handles the event itself (and calls
   preventDefault regardless). */
document.addEventListener(
  "submit",
  (e) => {
    if ((e.target as Element).closest("[data-contact]")) e.preventDefault();
  },
  true
);

/* ── Client reviews slider ── */

/**
 * Las reseñas son reales y vienen de la Places API, asi que su texto NO se
 * traduce: se muestra tal y como lo escribio quien la dejo, con su `lang` para
 * que el navegador lo lea bien. Solo cambian de idioma los rotulos de alrededor,
 * que si estan en COPY.
 */

type Review = {
  text: string;
  lang: string | null;
  name: string;
  avatar: string;
  monthsAgo: number;
};

const revRoot = document.getElementById("reviews");
const revList: Review[] = (() => {
  try {
    return JSON.parse(revRoot?.dataset.reviews ?? "[]");
  } catch {
    return [];
  }
})();

let refreshReview: (() => void) | undefined;

if (revRoot && revList.length > 1) {
  const revText = document.getElementById("review-text");
  const revName = document.getElementById("review-name");
  const revWhen = document.getElementById("review-when");
  const revAvatar = document.getElementById("review-avatar");
  const bars = [...revRoot.querySelectorAll<HTMLElement>("[data-rev-bar]")];

  /** Each review stays up this long, while its bar fills. */
  const DUR = 7000;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let revIndex = 0;
  let started = performance.now();
  let pausedAt: number | null = null;

  const renderWhen = (r: Review) => {
    if (!revWhen) return;
    const c = COPY[lang] as unknown as Record<string, string>;
    revWhen.textContent =
      r.monthsAgo === 1 ? c.revAgo1 : c.revAgo.replace("{n}", String(r.monthsAgo));
  };

  const renderReview = () => {
    const r = revList[revIndex];
    if (revText) {
      revText.textContent = r.text;
      // mismo escalado por longitud que aplica Astro en el primer render
      revText.classList.remove("is-l", "is-xl");
      if (r.text.length > 460) revText.classList.add("is-xl");
      else if (r.text.length > 260) revText.classList.add("is-l");
      if (r.lang) revText.setAttribute("lang", r.lang);
      else revText.removeAttribute("lang");
      // Fade up from 10px below: one frame hidden, then release the transition
      revText.classList.add("is-enter");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => revText.classList.remove("is-enter"))
      );
    }
    if (revName) revName.textContent = r.name;
    renderWhen(r);
    if (revAvatar instanceof HTMLImageElement && r.avatar) {
      revAvatar.src = r.avatar;
    }
  };

  const goReview = (n: number) => {
    revIndex = (n + revList.length) % revList.length;
    started = performance.now();
    if (pausedAt !== null) pausedAt = started;
    renderReview();
  };

  // A language switch only relabels the date; it must not restart the slide
  refreshReview = () => renderWhen(revList[revIndex]);

  document
    .getElementById("review-prev")
    ?.addEventListener("click", () => goReview(revIndex - 1));
  document
    .getElementById("review-next")
    ?.addEventListener("click", () => goReview(revIndex + 1));
  revRoot.querySelectorAll<HTMLElement>("[data-rev-go]").forEach((btn) =>
    btn.addEventListener("click", () => goReview(Number(btn.dataset.revGo)))
  );

  // Hovering the section holds the current review; leaving resumes the bar
  revRoot.addEventListener("mouseenter", () => {
    pausedAt = performance.now();
  });
  revRoot.addEventListener("mouseleave", () => {
    if (pausedAt !== null) started += performance.now() - pausedAt;
    pausedAt = null;
  });

  const tick = () => {
    const now = pausedAt ?? performance.now();
    const k = still ? 1 : Math.min(1, (now - started) / DUR);
    bars.forEach((bar, n) => {
      bar.style.width = `${n < revIndex ? 100 : n === revIndex ? k * 100 : 0}%`;
    });
    if (!still && k >= 1 && pausedAt === null) goReview(revIndex + 1);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── Go ── */

applyLang(lang);
