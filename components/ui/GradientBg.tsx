"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(8, 18, 48)",
  gradientBackgroundEnd = "rgb(4, 10, 28)",
  firstColor = "56, 189, 248",
  secondColor = "14, 165, 233",
  thirdColor = "125, 211, 252",
  fourthColor = "99, 102, 241",
  fifthColor = "34, 211, 238",
  pointerColor = "56, 189, 248",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    el.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    el.style.setProperty("--first-color", firstColor);
    el.style.setProperty("--second-color", secondColor);
    el.style.setProperty("--third-color", thirdColor);
    el.style.setProperty("--fourth-color", fourthColor);
    el.style.setProperty("--fifth-color", fifthColor);
    el.style.setProperty("--pointer-color", pointerColor);
    el.style.setProperty("--size", size);
    el.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) / 18;
      cur.current.y += (target.current.y - cur.current.y) / 18;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(
          cur.current.x
        )}px, ${Math.round(cur.current.y)}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    target.current.x = event.clientX - rect.left;
    target.current.y = event.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("relative z-10", className)}>{children}</div>

      <div
        className={cn(
          "gradients-container absolute inset-0 h-full w-full blur-xl",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(36px)]"
        )}
      >
        <div
          className={cn(
            "absolute opacity-90 [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.85)_0,_rgba(var(--first-color),_0)_55%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] h-[var(--size)] w-[var(--size)]",
            "left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[transform-origin:center_center] animate-first"
          )}
        />
        <div
          className={cn(
            "absolute opacity-80 [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] h-[var(--size)] w-[var(--size)]",
            "left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-400px)] animate-second"
          )}
        />
        <div
          className={cn(
            "absolute opacity-80 [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.75)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] h-[var(--size)] w-[var(--size)]",
            "left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%+400px)] animate-third"
          )}
        />
        <div
          className={cn(
            "absolute opacity-60 [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.7)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] h-[var(--size)] w-[var(--size)]",
            "left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-200px)] animate-fourth"
          )}
        />
        <div
          className={cn(
            "absolute opacity-75 [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.75)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] h-[var(--size)] w-[var(--size)]",
            "left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth"
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute -left-1/2 -top-1/2 h-full w-full opacity-60",
              "[background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.75)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)]"
            )}
          />
        )}
      </div>
    </div>
  );
};
