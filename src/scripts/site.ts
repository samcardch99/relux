import { COPY, DETAIL, PROJECTS, SHOTS, type Lang } from "../data/copy";

const STORAGE_KEY = "relux:lang";

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

function setImage(img: HTMLImageElement | null, src: string, alt = "") {
  if (!img) return;
  delete img.dataset.failed;
  img.src = src;
  img.alt = alt;
  watchImage(img);
}

document.querySelectorAll("img").forEach(watchImage);

/* ──────────────────────────────────────────────
   Language
   ────────────────────────────────────────────── */

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* storage unavailable — fall through to the navigator hint */
  }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

let lang: Lang = "en";

function applyLang(next: Lang) {
  lang = next;
  document.documentElement.lang = next;

  const t = COPY[next] as unknown as Record<string, string>;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const value = t[el.dataset.i18n ?? ""];
    if (typeof value !== "string") return;
    // `{n}` lo rellena el propio nodo con su data-n (numero de reseñas de Google)
    el.textContent = el.dataset.n
      ? value.replace("{n}", el.dataset.n)
      : value;
  });

  document
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-i18n-ph]")
    .forEach((el) => {
      const value = t[el.dataset.i18nPh ?? ""];
      if (typeof value === "string") el.placeholder = value;
    });

  document.querySelectorAll<HTMLElement>("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === next);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === next));
  });

  if (openDetail !== null) renderDetail(openDetail);

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* non-fatal: the toggle still works for this visit */
  }

  // The contact form is a React island and re-reads its copy from this event.
  window.dispatchEvent(new CustomEvent("relux:lang", { detail: { lang: next } }));
}

document.querySelectorAll<HTMLElement>("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.lang;
    if (next === "en" || next === "es") applyLang(next);
  });
});

/* ──────────────────────────────────────────────
   Full-screen views
   ────────────────────────────────────────────── */

type ViewName = "work" | "about" | "detail";

const views: Record<ViewName, HTMLElement | null> = {
  work: document.getElementById("view-work"),
  about: document.getElementById("view-about"),
  detail: document.getElementById("view-detail"),
};

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
}

function closeAllViews() {
  (["detail", "about", "work"] as ViewName[]).forEach(closeView);
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

  setImage(
    document.getElementById("detail-hero") as HTMLImageElement | null,
    shots.hero,
    t[project.titleKey]
  );

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

  const shotsEl = document.getElementById("detail-shots");
  if (shotsEl) {
    shotsEl.replaceChildren(
      ...shots.shots.map((src, n) => {
        const figure = document.createElement("figure");

        const frame = document.createElement("div");
        frame.className = "media";
        const img = document.createElement("img");
        img.loading = "lazy";
        frame.append(img);

        const caption = document.createElement("figcaption");
        caption.textContent = entry.captions[n] ?? "";

        figure.append(frame, caption);
        setImage(img, src, entry.captions[n] ?? "");
        return figure;
      })
    );
  }
}

function openProject(index: number) {
  renderDetail(index);
  openView("detail");
}

/* ──────────────────────────────────────────────
   Wiring
   ────────────────────────────────────────────── */

document.addEventListener("click", (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  // Open a project detail
  const card = target.closest<HTMLElement>("[data-project]");
  if (card) {
    const index = Number(card.dataset.project);
    if (!Number.isNaN(index)) openProject(index);
    return;
  }

  // Open a named view
  const opener = target.closest<HTMLElement>("[data-open]");
  if (opener) {
    openView(opener.dataset.open as ViewName);
    return;
  }

  // Close a named view, optionally scrolling somewhere on the way out
  const closer = target.closest<HTMLElement>("[data-close]");
  if (closer) {
    const goto = closer.dataset.goto;
    if (goto) {
      closeAllViews();
      requestAnimationFrame(() => {
        document.getElementById(goto)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      closeView(closer.dataset.close as ViewName);
    }
    return;
  }

  // Any in-page link returns to the homepage first
  const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (anchor) {
    closeAllViews();
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && stack.length) {
    closeView(stack[stack.length - 1]);
  }
});

/* ── Mobile navigation ── */

const burger = document.getElementById("nav-burger");
const menu = document.getElementById("nav-menu");

function closeMenu() {
  burger?.setAttribute("aria-expanded", "false");
  menu?.classList.remove("is-open");
}

burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  menu?.classList.toggle("is-open", !open);
});

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
  when: string;
};

const revRoot = document.getElementById("reviews");
const revList: Review[] = (() => {
  try {
    return JSON.parse(revRoot?.dataset.reviews ?? "[]");
  } catch {
    return [];
  }
})();

if (revRoot && revList.length > 1) {
  const revText = document.getElementById("review-text");
  const revName = document.getElementById("review-name");
  const revWhen = document.getElementById("review-when");
  const revNum = document.getElementById("review-num");
  const revAvatar = document.getElementById("review-avatar");

  let revIndex = 0;

  const renderReview = () => {
    const r = revList[revIndex];
    if (revText) {
      revText.textContent = r.text;
      if (r.lang) revText.setAttribute("lang", r.lang);
      else revText.removeAttribute("lang");
    }
    if (revName) revName.textContent = r.name;
    if (revWhen) revWhen.textContent = r.when;
    if (revNum) revNum.textContent = String(revIndex + 1).padStart(2, "0");
    if (revAvatar instanceof HTMLImageElement && r.avatar) {
      revAvatar.src = r.avatar;
    }
  };

  const stepReview = (delta: number) => {
    revIndex = (revIndex + delta + revList.length) % revList.length;
    renderReview();
  };

  document
    .getElementById("review-prev")
    ?.addEventListener("click", () => stepReview(-1));
  document
    .getElementById("review-next")
    ?.addEventListener("click", () => stepReview(1));
}

/* ── Go ── */

applyLang(initialLang());
