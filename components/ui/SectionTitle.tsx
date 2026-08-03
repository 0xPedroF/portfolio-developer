import React from "react";
import { useTranslations } from "next-intl";

interface SectionTitleProps {
  namespace: string;
  titleKey: string;
  highlightedWordIndex?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  namespace,
  titleKey,
  highlightedWordIndex = 1,
}) => {
  const t = useTranslations(namespace);
  const title = t(titleKey);
  const words = title.split(" ");

  return (
    <h2 className="heading">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={index === highlightedWordIndex ? "heading-accent" : undefined}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
};

export default SectionTitle;
