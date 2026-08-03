"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";

const MagicButton = memo(
  ({
    title,
    translationKey,
    translationNamespace = "common",
    icon,
    position,
    handleClick,
    otherClasses,
    className,
  }: {
    title?: string;
    translationKey?: string;
    translationNamespace?: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
    className?: string;
  }) => {
    const t = useTranslations(translationNamespace);
    const buttonText = translationKey ? t(translationKey) : title;

    return (
      <button
        type="button"
        className={`relative z-50 inline-flex h-12 w-full overflow-hidden rounded-xl p-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 md:w-60 ${className ?? ""}`}
        onClick={handleClick}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7dd3fc_0%,#4f46e5_45%,#c4b5fd_100%)]" />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-slate-950 px-7 font-display text-sm font-medium tracking-tight text-white backdrop-blur-3xl ${otherClasses ?? ""}`}
        >
          {position === "left" && icon}
          {buttonText}
          {position === "right" && icon}
        </span>
      </button>
    );
  }
);

MagicButton.displayName = "MagicButton";

export default MagicButton;
