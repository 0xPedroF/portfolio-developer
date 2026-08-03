"use client";
import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { useTranslations } from 'next-intl'
import SectionTitle from './ui/SectionTitle'

const Grid = () => {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="section-gap">
      <div className="section-shell space-y-6 overflow-hidden sm:space-y-8 md:space-y-10">
        <div className="text-center">
          <SectionTitle namespace="about" titleKey="title" highlightedWordIndex={1} />
        </div>
        <div className="w-full max-w-full overflow-hidden">
          <BentoGrid className="w-full py-1 sm:py-2 md:py-3 lg:py-4">
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
      </div>
    </section>
  )
}

export default Grid