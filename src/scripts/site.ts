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
  refreshReview?.();
  labelMenu();

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

type ViewName = "work" | "about" | "process" | "detail";

const views: Record<ViewName, HTMLElement | null> = {
  work: document.getElementById("view-work"),
  about: document.getElementById("view-about"),
  process: document.getElementById("view-process"),
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

  const ba = document.getElementById("detail-ba");
  if (ba) {
    ba.hidden = !shots.before;
    if (shots.before) {
      setImage(document.getElementById("ba-after") as HTMLImageElement | null, shots.hero, t.baAfter);
      setImage(document.getElementById("ba-before") as HTMLImageElement | null, shots.before, t.baBefore);
      setBeforeAfter(50);
    }
  }

  // Video row. Without `side`, the first two shots move up beside the video
  // and the grid starts at the third, keeping the captions aligned.
  const side = shots.side ?? [shots.shots[0] ?? shots.hero, shots.shots[1] ?? shots.hero];
  const offset = shots.side ? 0 : 2;
  const grid = shots.shots.slice(offset);

  const vidTag = document.getElementById("detail-vid-tag");
  if (vidTag) vidTag.textContent = t[project.tagKey];
  const video = document.getElementById("detail-video") as HTMLVideoElement | null;
  const videoPending = document.getElementById("detail-video-ph");
  if (video) {
    if (shots.video) {
      if (video.getAttribute("src") !== shots.video) video.src = shots.video;
    } else if (video.hasAttribute("src")) {
      video.removeAttribute("src");
      video.load();
    }
    video.hidden = !shots.video;
  }
  if (videoPending) videoPending.hidden = !!shots.video;
  side.forEach((src, n) =>
    setImage(document.getElementById(`detail-side-${n + 1}`) as HTMLImageElement | null, src, t[project.titleKey])
  );

  const shotsEl = document.getElementById("detail-shots");
  if (shotsEl) {
    shotsEl.replaceChildren(
      ...grid.map((src, i) => {
        const n = i + offset;
        const figure = document.createElement("figure");
        if (shots.tall?.includes(i)) figure.classList.add("is-tall");

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

/* ── Tablet / phone menu ── */

const burger = document.getElementById("nav-burger");
const burgerLabel = document.getElementById("nav-burger-label");
const sheet = document.getElementById("nav-sheet");

const menuIsOpen = () => burger?.getAttribute("aria-expanded") === "true";

function labelMenu() {
  if (!burgerLabel) return;
  const t = COPY[lang] as unknown as Record<string, string>;
  burgerLabel.textContent = menuIsOpen() ? t.menuClose : t.menuOpen;
}

function setMenu(open: boolean) {
  burger?.setAttribute("aria-expanded", String(open));
  if (sheet) sheet.hidden = !open;
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

applyLang(initialLang());
