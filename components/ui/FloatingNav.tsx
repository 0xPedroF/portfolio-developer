"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  clearUrlHash,
  getActiveSectionId,
  getNavScrollOffset,
  getScrollBehavior,
  scrollToSectionWhenReady,
  scrollToTop,
  setUrlHash,
} from "@/lib/scroll";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  name: string;
  link: string;
  translationKey: string;
};

const SPY_LOCK_MS = 1000;

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations("navbar");
  const reduceMotion = useReducedMotion();

  const sectionIds = useMemo(
    () => navItems.map((item) => item.link.replace("#", "")),
    [navItems]
  );

  const lockUntilRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(activeSection);
  activeRef.current = activeSection;

  const lockActive = useCallback((id: string, ms = SPY_LOCK_MS) => {
    lockUntilRef.current = Date.now() + ms;
    setActiveSection(id);
  }, []);

  const syncFromScroll = useCallback(() => {
    if (Date.now() < lockUntilRef.current) return;

    const next = getActiveSectionId(sectionIds, getNavScrollOffset());
    if (next !== activeRef.current) {
      setActiveSection(next);
    }

    const isScrolled = window.scrollY > 12;
    setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
  }, [sectionIds]);

  const scheduleSync = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      syncFromScroll();
    });
  }, [syncFromScroll]);

  // Scroll spy — rAF-coalesced, position-based (reliable for tall About)
  useEffect(() => {
    syncFromScroll();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });

    // Dynamic sections mount late — re-sync when DOM changes (debounced)
    let mutTimer: ReturnType<typeof setTimeout> | null = null;
    const onMutate = () => {
      if (mutTimer != null) return;
      mutTimer = setTimeout(() => {
        mutTimer = null;
        scheduleSync();
      }, 60);
    };
    const observer = new MutationObserver(onMutate);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      observer.disconnect();
      if (mutTimer != null) clearTimeout(mutTimer);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleSync, syncFromScroll]);

  // Close mobile menu on desktop breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Deep-link / refresh with hash — wait for dynamic sections
  useEffect(() => {
    let cancelled = false;

    const restoreHash = async (hash: string, smooth: boolean) => {
      if (!hash || cancelled) return;
      lockActive(hash, SPY_LOCK_MS + 400);
      await scrollToSectionWhenReady(hash, {
        behavior: getScrollBehavior(smooth),
      });
      if (!cancelled) scheduleSync();
    };

    const initial = window.location.hash.replace("#", "");
    if (initial) {
      // Instant first jump after mount so refresh feels correct,
      // then one smooth correction once layout settles.
      void restoreHash(initial, false).then(() => {
        if (!cancelled && !reduceMotion) {
          window.setTimeout(() => {
            void scrollToSectionWhenReady(initial, {
              behavior: "auto",
            });
          }, 120);
        }
      });
    }

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        lockActive("", 400);
        scrollToTop(getScrollBehavior());
        return;
      }
      void restoreHash(hash, true);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [lockActive, reduceMotion, scheduleSync]);

  // Escape closes mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const goHome = () => {
    setMobileMenuOpen(false);
    lockActive("", SPY_LOCK_MS);
    clearUrlHash();
    scrollToTop(getScrollBehavior());
  };

  const goToSection = (hashLink: string) => {
    const id = hashLink.replace("#", "");
    setMobileMenuOpen(false);
    lockActive(id);
    setUrlHash(id);
    void scrollToSectionWhenReady(id);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 25, 0.88)"
            : "rgba(10, 10, 25, 0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 10px 30px -12px rgba(0, 0, 0, 0.35)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 top-0 z-[5000] flex h-[var(--nav-height)] w-full items-center justify-between border-b px-4 sm:px-6",
          scrolled ? "border-white/10" : "border-transparent",
          className
        )}
      >
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 sm:gap-2.5"
          aria-label="Go to top"
        >
          <img
            src="/PF-Logo.png"
            alt=""
            className="h-8 w-auto select-none sm:h-9 md:h-10"
          />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white min-[400px]:text-xs sm:text-sm md:text-[0.95rem] md:tracking-[0.14em]">
            Pedro <span className="text-sky-400">Ferreira</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex lg:gap-2">
          {navItems.map((navItem, idx) => {
            const sectionId = navItem.link.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={`nav-link-${idx}`}
                href={navItem.link}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(navItem.link);
                }}
                className="group relative overflow-hidden px-2 py-2 lg:px-2.5"
              >
                <span
                  className={cn(
                    "font-display text-sm font-medium tracking-tight transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/90"
                  )}
                >
                  {t(navItem.translationKey)}
                </span>
                {isActive ? (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white/30 transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              goToSection("#contact");
            }}
            className="ml-2 inline-flex items-center rounded-lg border border-sky-400/30 px-3 py-2 font-display text-sm font-medium tracking-tight text-white/90 transition hover:border-sky-400/70 hover:bg-sky-400/10 hover:text-white lg:px-4"
          >
            {t("letsTalk")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative h-10 w-10 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-white transition duration-300",
                  mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 bg-white transition-all duration-200",
                  mobileMenuOpen ? "w-0 opacity-0" : "w-6 opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-white transition duration-300",
                  mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                )}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="fixed inset-x-0 top-[var(--nav-height)] z-[4999] border-b border-white/10 bg-[#0a0a19]/95 backdrop-blur-md md:hidden"
          >
            <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto p-4">
              {navItems.map((navItem, idx) => {
                const sectionId = navItem.link.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(navItem.link);
                    }}
                    className={cn(
                      "rounded-xl px-3 py-3 font-display text-base font-medium tracking-tight transition",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {t(navItem.translationKey)}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  goToSection("#contact");
                }}
                className="mt-2 rounded-xl border border-sky-400/30 px-3 py-3 text-center font-display text-base font-medium tracking-tight text-white/90 transition hover:border-sky-400/70 hover:bg-sky-400/10"
              >
                {t("letsTalk")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
