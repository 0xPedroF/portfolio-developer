import React, { memo } from "react";
import { useTranslations } from 'next-intl';

/**  UI: border magic from tailwind css btns
 *   Link: https://ui.aceternity.com/components/tailwindcss-buttons */
const MagicButton = memo(({
  title,
  translationKey,
  translationNamespace = 'common',
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title?: string;
  translationKey?: string;
  translationNamespace?: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  // Only initialize translations if a translationKey is provided
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = translationKey ? useTranslations(translationNamespace) : null;
  
  // Use translation if available, otherwise use the provided title
  const buttonText = translationKey && t ? t(translationKey) : title;
  
  return (
    <button
      className="relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-xl p-[1px] focus:outline-none z-50"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl
             bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {buttonText}
        {position === "right" && icon}
      </span>
    </button>
  );
});

MagicButton.displayName = "MagicButton";

export default MagicButton;