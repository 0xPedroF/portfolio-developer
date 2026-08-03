'use client'

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GrideGlobe";
import { useMemo, useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import MagicButton from "./MagicButton";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/** Stack used across the portfolio — extras fill columns so no empty ghost pills */
const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "Tailwind",
  "Three.js",
  "Java",
  "Vite",
  "PostgreSQL",
  "Docker",
  "Git",
  "Framer",
  "AWS",
];

function buildTechColumns(columnCount = 3, minPerColumn = 5) {
  const columns: string[][] = Array.from({ length: columnCount }, () => []);

  TECH_STACK.forEach((tech, index) => {
    columns[index % columnCount].push(tech);
  });

  columns.forEach((column, columnIndex) => {
    let cursor = 0;
    while (column.length < minPerColumn) {
      const tech = TECH_STACK[(columnIndex + cursor * columnCount) % TECH_STACK.length];
      column.push(tech);
      cursor += 1;
    }
  });

  return columns;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // Rows stay content-sized (no 1fr stretch) so tablet/desktop
        // don't grow empty space below the real content.
        "mx-auto grid w-full max-w-full grid-cols-2 gap-3",
        "sm:gap-3.5",
        "md:grid-cols-6 md:auto-rows-auto md:gap-4",
        "lg:grid-cols-5 lg:auto-rows-[minmax(10.5rem,auto)] lg:gap-5",
        "xl:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

function PanelMedia({
  id,
  img,
  imgClassName,
  spareImg,
}: {
  id: number;
  img?: string;
  imgClassName?: string;
  spareImg?: string;
}) {
  if (id === 6) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        <BackgroundGradientAnimation />
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
      </div>
    );
  }

  if (!img && !spareImg) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
      {img ? (
        id === 5 ? (
          <img
            src={img}
            alt=""
            className={cn(
              "pointer-events-none absolute bottom-0 right-0 w-28 object-contain opacity-50 sm:w-40 sm:opacity-65 md:w-56 md:opacity-85 lg:w-72 lg:opacity-95",
              imgClassName
            )}
          />
        ) : (
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover object-center",
              id === 1 &&
                "scale-105 object-[center_18%] opacity-55 sm:opacity-75 md:opacity-90",
              imgClassName
            )}
            priority={id === 1}
          />
        )
      ) : null}

      {spareImg ? (
        <img
          src={spareImg}
          alt=""
          className={cn(
            "pointer-events-none absolute object-contain",
            id === 4 &&
              "bottom-2 right-2 h-14 w-14 opacity-80 sm:bottom-3 sm:right-3 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24",
            id === 5 && "inset-0 h-full w-full object-cover opacity-20"
          )}
        />
      ) : null}

      {id === 5 ? (
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,24,0.94)] via-[rgba(6,9,24,0.45)] to-transparent" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,9,24,0.92)] via-[rgba(6,9,24,0.3)] to-transparent" />
      )}
    </div>
  );
}

function TechStackBackground() {
  const columns = useMemo(() => buildTechColumns(3, 6), []);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[58%] overflow-hidden md:block lg:w-[55%]"
      aria-hidden
    >
      <div className="absolute inset-y-[-25%] right-0 flex gap-3 pr-1 lg:gap-4 lg:pr-2">
        {columns.map((column, columnIndex) => {
          const loop = [...column, ...column];
          return (
            <div
              key={columnIndex}
              className={cn(
                "flex w-max flex-col gap-3 lg:gap-3.5",
                columnIndex === 1 ? "tech-marquee-down" : "tech-marquee-up",
                columnIndex === 0 && "opacity-70",
                columnIndex === 1 && "opacity-90",
                columnIndex === 2 && "opacity-55"
              )}
              style={{ animationDuration: `${18 + columnIndex * 6}s` }}
            >
              {loop.map((item, itemIndex) => (
                <span
                  key={`${item}-${columnIndex}-${itemIndex}`}
                  className="whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/85 shadow-[0_8px_24px_rgba(2,6,23,0.3)] backdrop-blur-sm lg:px-3.5 lg:py-2.5 lg:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Soft fade into the text — no hard cut line */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[rgba(6,9,24,0.88)] from-[10%] via-[rgba(6,9,24,0.35)] via-[55%] to-transparent lg:w-24" />
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[rgba(6,9,24,0.65)] via-[rgba(6,9,24,0.2)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[rgba(6,9,24,0.75)] via-[rgba(6,9,24,0.25)] to-transparent" />
    </div>
  );
}

function TechStackMobile() {
  const columns = useMemo(() => buildTechColumns(3, 5), []);

  return (
    <div className="relative mt-3 min-h-[7.5rem] flex-1 overflow-hidden md:hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-0 flex justify-center gap-2">
          {columns.map((column, columnIndex) => {
            const loop = [...column.slice(0, 5), ...column.slice(0, 5)];
            return (
              <div
                key={columnIndex}
                className={cn(
                  "flex flex-col gap-2",
                  columnIndex === 1 ? "tech-marquee-down" : "tech-marquee-up",
                  columnIndex === 1 && "opacity-95",
                  columnIndex === 2 && "opacity-80"
                )}
                style={{ animationDuration: `${16 + columnIndex * 5}s` }}
              >
                {loop.map((item, itemIndex) => (
                  <span
                    key={`${item}-${columnIndex}-${itemIndex}`}
                    className="whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[10px] text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[rgba(6,9,24,0.98)] from-[15%] via-[rgba(6,9,24,0.45)] via-[60%] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[rgba(6,9,24,0.55)] to-transparent" />
      </div>
    </div>
  );
}

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const showLottie = Boolean(copied && animationData);

  useEffect(() => {
    if (!copied) return;

    let cancelled = false;
    import("@/data/confetti.json").then((mod) => {
      if (!cancelled) setAnimationData(mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText("contact@pedrofdev.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[rgba(6,9,24,0.85)] p-2.5 shadow-[0_20px_45px_rgba(2,6,23,0.55)] backdrop-blur-2xl transition-all duration-300 hover:border-white/25",
        "sm:rounded-xl sm:p-3.5",
        "md:rounded-2xl md:p-4",
        "lg:p-4",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 sm:opacity-30">
        <div className="grid-overlay" />
      </div>

      <div
        className={cn(
          titleClassName,
          "relative z-10 flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden rounded-lg border border-white/5 bg-black/25 p-3",
          "sm:gap-2.5 sm:rounded-xl sm:p-4",
          "md:gap-3 md:p-5",
          "lg:p-6",
          id === 3 && "justify-start pb-0 sm:pb-0 md:pb-5",
          id === 6 && "items-center justify-center gap-3 sm:gap-4 md:gap-5"
        )}
      >
        <PanelMedia
          id={id}
          img={img}
          imgClassName={imgClassName}
          spareImg={spareImg}
        />

        {id === 3 && <TechStackBackground />}

        {description ? (
          <div
            className={cn(
              "relative z-10 text-xs font-light leading-relaxed text-white/60 sm:text-sm",
              id === 3
                ? "max-w-[11rem] md:max-w-[45%] lg:max-w-[42%]"
                : "max-w-[14rem] lg:max-w-xs lg:text-base"
            )}
          >
            {id === 3 && (
              <span
                className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 hidden rounded-2xl bg-gradient-to-r from-[rgba(6,9,24,0.7)] via-[rgba(6,9,24,0.28)] to-transparent md:block"
                aria-hidden
              />
            )}
            {description}
          </div>
        ) : null}

        <div
          className={cn(
            "relative z-10 font-display text-sm font-semibold leading-snug tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-base md:text-lg",
            "sm:text-base",
            "md:text-lg md:leading-snug",
            "lg:text-xl",
            id === 1 && "md:text-xl lg:text-2xl xl:text-3xl md:max-w-[90%]",
            id === 2 && "md:max-w-[95%] lg:text-xl",
            id === 3 && "md:max-w-[45%] lg:max-w-[42%]",
            id === 6 && "mx-auto max-w-[16rem] text-center sm:max-w-sm lg:text-2xl"
          )}
        >
          {id === 3 && (
            <span
              className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 hidden rounded-2xl bg-gradient-to-r from-[rgba(6,9,24,0.75)] via-[rgba(6,9,24,0.3)] to-transparent md:block"
              aria-hidden
            />
          )}
          {title}
        </div>

        {id === 2 && (
          <div className="relative z-0 mt-1 h-[88px] w-full overflow-hidden rounded-xl sm:mt-2 sm:h-[120px] md:mt-3 md:h-[130px] lg:absolute lg:inset-x-2 lg:bottom-2 lg:mt-0 lg:h-[9.5rem]">
            <GridGlobe />
          </div>
        )}

        {id === 3 && <TechStackMobile />}

        {id === 6 && (
          <div className="relative z-20 w-full max-w-sm">
            <div
              className={`pointer-events-none absolute -bottom-5 -right-5 z-40 ${
                copied ? "block" : "hidden"
              }`}
            >
              {showLottie && animationData && (
                <ErrorBoundary fallbackRender={() => <div />}>
                  <Lottie
                    animationData={animationData}
                    loop={false}
                    style={{ height: 140, width: 260 }}
                  />
                </ErrorBoundary>
              )}
            </div>

            <MagicButton
              translationKey={copied ? "emailCopied" : "copyEmail"}
              icon={<IoCopyOutline />}
              position="left"
              handleClick={handleCopy}
              className="!w-full md:!w-full"
              otherClasses="!bg-slate-900/90 !backdrop-blur-xl !border-white/20 hover:!border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
