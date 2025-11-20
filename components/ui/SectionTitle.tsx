import React from 'react';
import { useTranslations } from 'next-intl';

interface SectionTitleProps {
  namespace: string;
  titleKey: string;
  highlightedWordIndex?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  namespace, 
  titleKey,
  highlightedWordIndex = 1
}) => {
  const t = useTranslations(namespace);
  const title = t(titleKey);
  const words = title.split(' ');
  
  return (
    <h1 className="heading">
      {words.map((word, index) => (
        <span 
          key={index} 
          className={index === highlightedWordIndex ? 'text-purple' : ''}
        >
          {word}{' '}
        </span>
      ))}
    </h1>
  );
};

export default SectionTitle; 