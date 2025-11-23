'use client'

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GrideGlobe";
import { useState, useEffect } from "react";
import animationData from '@/data/confetti.json'
import { IoCopyOutline } from "react-icons/io5";
import MagicButton from "./MagicButton";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslations } from 'next-intl';

// Dynamically import the Lottie component with SSR disabled to prevent hydration issues
// This also avoids the componentWillUpdate deprecation warning
const LottieWrapper = dynamic(() => import('react-lottie').then(mod => {
  const Lottie = mod.default;
  return (props: any) => <Lottie {...props} />;
}), { 
  ssr: false,
  // No loading component to prevent hydration mismatches
});

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
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 md:grid-row-7 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 mx-auto w-full max-w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
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
  const t = useTranslations('common');
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["Firebase", "NextJS", "MongoDB"];

  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only show Lottie animation after the component is mounted and copied state is true
  useEffect(() => {
    if (isMounted && copied) {
      setShowLottie(true);
    }
  }, [isMounted, copied]);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "contact@pedrofdev.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
      setShowLottie(false);
    }, 3000);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative flex w-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(6,9,24,0.85)] p-6 shadow-[0_20px_45px_rgba(2,6,23,0.55)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_35px_90px_rgba(2,6,23,0.65)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="grid-overlay" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" />
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "relative z-10 flex min-h-40 flex-col gap-3 rounded-[20px] border border-white/5 bg-black/20 p-5 md:h-full lg:p-8 group-hover/bento:border-white/15 overflow-visible"
          )}
        >
          <div className="font-sans text-sm font-light text-white/70 md:max-w-48 md:text-sm lg:text-base relative z-10">
            {description}
          </div>
          <div
            className="font-sans text-2xl font-semibold text-white lg:text-3xl relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && (
            <div className="relative w-full h-full">
              <GridGlobe />
            </div>
          )}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-1 z-0">
              {/* tech stack lists */}
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/5 px-3 py-2 text-xs text-white/90 shadow-[0_4px_12px_rgba(2,6,23,0.3)] lg:px-4 lg:py-3 lg:text-base transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-xl bg-white/[0.02] border border-white/5 px-3 py-4 text-center text-transparent lg:px-4" />
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="rounded-xl bg-white/[0.02] border border-white/5 px-3 py-4 text-center text-transparent lg:px-4" />
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/5 px-3 py-2 text-xs text-white/90 shadow-[0_4px_12px_rgba(2,6,23,0.3)] lg:px-4 lg:py-3 lg:text-base transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-6 sm:mt-8 relative z-50">
              {/* Serpentine animation - appears when email is copied */}
              <div
                className={`absolute -bottom-5 -right-5 z-40 ${copied ? "block" : "hidden"}`}
              >
                {/* Only render Lottie component client-side when it should be shown */}
                {isMounted && showLottie && (
                  <ErrorBoundary fallbackRender={() => <div />}>
                    <LottieWrapper options={defaultOptions} height={200} width={400} />
                  </ErrorBoundary>
                )}
              </div>

              <div className="relative z-50">
                <MagicButton
                  translationKey={copied ? 'emailCopied' : 'copyEmail'}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-slate-900/90 !backdrop-blur-xl !border-white/20 hover:!border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};