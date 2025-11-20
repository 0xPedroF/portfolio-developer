"use client";
import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { useTranslations } from 'next-intl'
import SectionTitle from './ui/SectionTitle'

const Grid = () => {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="w-full">
        <SectionTitle namespace="about" titleKey="title" highlightedWordIndex={1} />
        <div className="w-full max-w-full overflow-hidden">
          <BentoGrid className="w-full py-20 px-4 sm:px-6 lg:px-8">
              {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }) => (
                  <BentoGridItem
                  id={id}
                  key={id}
                  title={id === 1 ? t('collaboration') : 
                         id === 2 ? t('flexible') : 
                         id === 3 ? t('techStack') : 
                         id === 4 ? t('techEnthusiast') : 
                         id === 5 ? t('buildingLibrary') : 
                         id === 6 ? t('projectTogether') : title}
                  description={id === 3 ? t('improving') : description}
                  className={className}
                  img={img}
                  imgClassName={imgClassName}
                  titleClassName={titleClassName}
                  spareImg={spareImg}
                  />
              ))}
          </BentoGrid>
        </div>
    </section>
  )
}

export default Grid