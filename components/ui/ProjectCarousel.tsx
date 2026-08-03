"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CarouselProject = {
  id: number;
  title: string;
  des: string;
  img: string;
  link: string;
};

type ProjectCarouselProps = {
  items: CarouselProject[];
  badge?: string;
  viewLabel: string;
};

/** Side cards shrink toward this; center card grows to 1 (mobile only) */
const SIDE_SCALE = 0.94;
const SIDE_OPACITY = 0.62;

type LayoutMode = "mobile" | "desktop";

function useCarouselLayout() {
  const [mode, setMode] = useState<LayoutMode>("mobile");

  useEffect(() => {
    // Tablet + desktop share the 2-up page carousel
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return mode;
}

function ProjectSlide({
  project,
  badge,
  viewLabel,
  emphasized,
}: {
  project: CarouselProject;
  badge?: string;
  viewLabel: string;
  /** Mobile: active card. Desktop: hover only (handled by CSS) or in-view */
  emphasized?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col transition-opacity duration-300",
        emphasized === false && "opacity-45"
      )}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative block overflow-hidden rounded-2xl bg-[#11131c] ring-1 ring-white/[0.08] transition duration-300",
          "hover:ring-sky-400/50",
          emphasized && "ring-sky-400/40 md:ring-white/[0.08] md:hover:ring-sky-400/50"
        )}
        aria-label={`${viewLabel}: ${project.title}`}
      >
        <div className="relative aspect-[16/10] w-full">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.08),_transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.1),_transparent_55%)] transition-opacity duration-300",
              emphasized ? "opacity-100 md:opacity-0" : "opacity-0"
            )}
          />
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 80vw, 42vw"
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-6 md:p-7"
          />
        </div>
      </a>

      <div className="mt-4 flex flex-1 flex-col px-0.5 sm:mt-5">
        {badge ? (
          <p className="text-[11px] font-medium tracking-[0.04em] text-sky-400 sm:text-xs">
            {badge}
          </p>
        ) : null}
        <h3
          className={cn(
            "font-display text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl md:text-[1.65rem]",
            badge ? "mt-1.5" : "mt-0"
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/55">
          {project.des}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-medium tracking-tight text-sky-400 transition hover:gap-2 hover:text-sky-300"
        >
          {viewLabel}
          <span aria-hidden className="text-base leading-none">
            ›
          </span>
        </a>
      </div>
    </article>
  );
}

/**
 * Mobile: 1 centered card + equal peeks + scale
 * Tablet/Desktop: static grid if ≤3 items; else 2-up pages with side peek
 */
const ProjectCarousel = ({ items, badge, viewLabel }: ProjectCarouselProps) => {
  const mode = useCarouselLayout();
  const isDesktop = mode === "desktop";
  const useCarousel = !isDesktop || items.length > 3;
  const pageSize = isDesktop ? 2 : 1;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const activePage = Math.min(
    pageCount - 1,
    Math.floor(activeCard / pageSize)
  );

  const getSlideOffset = (root: HTMLDivElement, slide: HTMLElement) => {
    const rootRect = root.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    return root.scrollLeft + (slideRect.left - rootRect.left);
  };

  /** Mobile: center card. Desktop: align page start to the left padding edge */
  const getScrollLeftForCard = (
    root: HTMLDivElement,
    slide: HTMLElement,
    center: boolean
  ) => {
    const offset = getSlideOffset(root, slide);
    if (!center) return Math.max(0, offset);
    return Math.max(0, offset - (root.clientWidth - slide.getBoundingClientRect().width) / 2);
  };

  const sync = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const { scrollLeft, scrollWidth, clientWidth } = root;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);

    const slides = Array.from(
      root.querySelectorAll<HTMLElement>("[data-slide]")
    );
    if (!slides.length) return;

    const rootRect = root.getBoundingClientRect();
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    if (isDesktop) {
      // Page start = leftmost card closest to the scroller's left edge
      const target = rootRect.left + 8;
      slides.forEach((slide, index) => {
        const dist = Math.abs(slide.getBoundingClientRect().left - target);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      // Snap to page boundary (0, 2, 4…)
      best = Math.floor(best / pageSize) * pageSize;
    } else {
      const viewportCenter = rootRect.left + rootRect.width / 2;
      const falloff = Math.max(rootRect.width * 0.5, 1);

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const dist = Math.abs(slideCenter - viewportCenter);

        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }

        const t = Math.min(1, dist / falloff);
        const scale = 1 - t * (1 - SIDE_SCALE);
        const opacity = 1 - t * (1 - SIDE_OPACITY);
        slide.style.setProperty("--slide-scale", scale.toFixed(4));
        slide.style.setProperty("--slide-opacity", opacity.toFixed(4));
      });
    }

    if (isDesktop) {
      slides.forEach((slide) => {
        slide.style.removeProperty("--slide-scale");
        slide.style.removeProperty("--slide-opacity");
      });
    }

    setActiveCard(best);
  }, [isDesktop, pageSize]);

  const syncRaf = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      sync();
    });
  }, [sync]);

  useEffect(() => {
    if (!useCarousel) return;
    const root = scrollerRef.current;
    if (!root) return;

    sync();
    root.addEventListener("scroll", syncRaf, { passive: true });
    window.addEventListener("resize", syncRaf);
    return () => {
      root.removeEventListener("scroll", syncRaf);
      window.removeEventListener("resize", syncRaf);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [sync, syncRaf, useCarousel, items.length, isDesktop]);

  const scrollToCard = useCallback(
    (cardIndex: number, behavior: ScrollBehavior = "smooth") => {
      const root = scrollerRef.current;
      if (!root) return;
      const slide =
        root.querySelectorAll<HTMLElement>("[data-slide]")[cardIndex];
      if (!slide) return;

      root.scrollTo({
        left: getScrollLeftForCard(root, slide, !isDesktop),
        behavior,
      });
    },
    [isDesktop]
  );

  // Reset / align on layout mode changes
  useEffect(() => {
    if (!useCarousel) return;
    const id = requestAnimationFrame(() => {
      scrollToCard(0, "auto");
      sync();
    });
    return () => cancelAnimationFrame(id);
  }, [useCarousel, isDesktop, items.length, scrollToCard, sync]);

  const scrollByPage = (dir: -1 | 1) => {
    const nextPage = Math.min(pageCount - 1, Math.max(0, activePage + dir));
    scrollToCard(nextPage * pageSize);
  };

  if (!items.length) return null;

  // Desktop/tablet with few items: static grid (no carousel chrome)
  if (!useCarousel) {
    return (
      <div
        className="grid gap-6 md:gap-8"
        style={{
          gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, minmax(0, 1fr))`,
        }}
      >
        {items.map((project) => (
          <ProjectSlide
            key={project.id}
            project={project}
            badge={badge}
            viewLabel={viewLabel}
          />
        ))}
      </div>
    );
  }

  const pageStart = activePage * pageSize;

  return (
    <div
      className={cn(
        "w-full",
        // Mobile only: bleed to section-shell edges
        !isDesktop && "max-md:-mx-4 max-md:w-[calc(100%+2rem)]"
      )}
    >
      <div className="relative w-full overflow-x-clip">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-[2] transition-opacity duration-300",
            isDesktop ? "w-10 md:w-14" : "w-5",
            "bg-gradient-to-r from-[rgb(11,15,33)] via-[rgb(11,15,33)]/55 to-transparent",
            canPrev ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-[2] transition-opacity duration-300",
            isDesktop ? "w-10 md:w-14" : "w-5",
            "bg-gradient-to-l from-[rgb(11,15,33)] via-[rgb(11,15,33)]/55 to-transparent",
            canNext ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
        />

        <div
          ref={scrollerRef}
          className={cn(
            "carousel-x project-carousel relative flex snap-x snap-mandatory overflow-x-auto",
            !isDesktop && "project-carousel--mobile py-4",
            isDesktop && "project-carousel--desktop py-2"
          )}
          aria-roledescription="carousel"
          aria-label="Projects"
        >
          {items.map((project, index) => {
            const inPage =
              index >= pageStart && index < pageStart + pageSize;
            const isActiveMobile = !isDesktop && index === activeCard;

            return (
              <div
                key={project.id}
                data-slide
                className={cn(
                  "project-carousel__slide shrink-0",
                  !isDesktop && "snap-center",
                  // Desktop: snap only on page starts so arrows/trackpad advance by 2
                  isDesktop && index % pageSize === 0 && "snap-start"
                )}
              >
                <div className="project-carousel__slide-inner h-full">
                  <ProjectSlide
                    project={project}
                    badge={badge}
                    viewLabel={viewLabel}
                    emphasized={
                      isDesktop ? inPage : isActiveMobile ? true : false
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-[3] mt-5 flex items-center justify-center gap-3 sm:mt-7 md:mt-8">
        <button
          type="button"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={() => scrollByPage(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/90 transition hover:bg-white/[0.14] disabled:cursor-default disabled:opacity-25 sm:h-10 sm:w-10"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
            <path
              d="M8.5 1.5L2 8l6.5 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 px-2">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page + 1}`}
              aria-current={page === activePage}
              onClick={() => scrollToCard(page * pageSize)}
              className={cn(
                "h-[6px] rounded-full transition-all duration-300",
                page === activePage
                  ? "w-5 bg-white"
                  : "w-[6px] bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          disabled={!canNext}
          onClick={() => scrollByPage(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/90 transition hover:bg-white/[0.14] disabled:cursor-default disabled:opacity-25 sm:h-10 sm:w-10"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
            <path
              d="M1.5 1.5L8 8l-6.5 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
