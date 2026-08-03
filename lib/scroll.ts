/** Fallback when --nav-height is unavailable. */
export const NAV_SCROLL_OFFSET = 92;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getScrollBehavior(
  preferSmooth = true
): ScrollBehavior {
  if (!preferSmooth || prefersReducedMotion()) return "auto";
  return "smooth";
}

/** Reads --nav-height and adds a small breathing gap under the bar. */
export function getNavScrollOffset(): number {
  if (typeof window === "undefined") return NAV_SCROLL_OFFSET;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-height")
    .trim();
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return NAV_SCROLL_OFFSET;

  if (raw.endsWith("rem")) {
    const root = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return value * (Number.isFinite(root) ? root : 16) + 12;
  }

  if (raw.endsWith("px")) return value + 12;
  return value + 12;
}

export function scrollToTop(behavior?: ScrollBehavior) {
  window.scrollTo({
    top: 0,
    behavior: behavior ?? getScrollBehavior(),
  });
}

export function scrollToSection(
  id: string,
  offset: number = getNavScrollOffset(),
  behavior?: ScrollBehavior
) {
  const element = document.getElementById(id);
  if (!element) return false;

  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: behavior ?? getScrollBehavior(),
  });
  return true;
}

/** Wait until a section exists (dynamic imports / late mount). */
export function waitForElement(
  id: string,
  timeoutMs = 6000
): Promise<HTMLElement | null> {
  const existing = document.getElementById(id);
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const started = Date.now();

    const finish = (el: HTMLElement | null) => {
      observer.disconnect();
      window.clearInterval(poll);
      resolve(el);
    };

    const check = () => {
      const el = document.getElementById(id);
      if (el) {
        finish(el);
        return;
      }
      if (Date.now() - started >= timeoutMs) finish(null);
    };

    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    const poll = window.setInterval(check, 100);
    check();
  });
}

/**
 * Scroll to a section that may not be mounted yet (e.g. dynamic About).
 * Re-measures after layout so late content doesn't leave you mid-page.
 */
export async function scrollToSectionWhenReady(
  id: string,
  options?: {
    offset?: number;
    behavior?: ScrollBehavior;
    timeoutMs?: number;
  }
) {
  const behavior = options?.behavior ?? getScrollBehavior();
  const el = await waitForElement(id, options?.timeoutMs ?? 6000);
  if (!el) return false;

  const go = (nextBehavior: ScrollBehavior) =>
    scrollToSection(id, options?.offset ?? getNavScrollOffset(), nextBehavior);

  go(behavior);

  // Wait two frames for layout, then correct (dynamic placeholders → real content)
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
  go("auto");

  window.setTimeout(() => go("auto"), 320);
  return true;
}

/** Remove URL hash so a refresh lands at the top. */
export function clearUrlHash() {
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}`);
}

export function setUrlHash(hash: string) {
  const next = hash.startsWith("#") ? hash : `#${hash}`;
  if (window.location.hash === next) return;
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}${next}`);
}

/**
 * Classic scroll-spy: last section whose top has crossed the nav probe line.
 * Handles tall sections (About) far better than IntersectionObserver ratios.
 */
export function getActiveSectionId(
  sectionIds: readonly string[],
  offset: number = getNavScrollOffset()
): string {
  if (typeof window === "undefined" || sectionIds.length === 0) return "";

  const scrollY = window.scrollY;
  // Treat the hero / top of page as "no nav highlight"
  if (scrollY < 48) return "";

  const probeY = offset + 16;
  let active = "";

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - probeY <= 0) {
      active = id;
    }
  }

  // Stick on the last section when the user reaches the document end
  const doc = document.documentElement;
  const atBottom =
    scrollY + window.innerHeight >= doc.scrollHeight - 32;
  if (atBottom) {
    for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
      if (document.getElementById(sectionIds[i])) return sectionIds[i];
    }
  }

  return active;
}
