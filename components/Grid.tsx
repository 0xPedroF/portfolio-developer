"use client";
import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { useTranslations } from 'next-intl'
import SectionTitle from './ui/SectionTitle'

const Grid = () => {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="relative w-full py-12">
      <div className="section-shell space-y-10 overflow-hidden">
        <div className="text-center">
          <SectionTitle namespace="about" titleKey="title" highlightedWordIndex={1} />
        </div>
        <div className="w-full max-w-full overflow-hidden">
          <BentoGrid className="w-full py-12 px-2 sm:px-4 lg:px-6">
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
                  description={description}
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