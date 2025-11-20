"use client";
import React from "react";
import { workExperience, socialMedia } from "@/data";
import { Button } from "./ui/MovingBorders";
import { useTranslations } from 'next-intl';
import SectionTitle from "./ui/SectionTitle";

const Experience = () => {
  const t = useTranslations('experience');
  const footerT = useTranslations('footer');
  
  return (
    <div className="py-20 w-full" id="experience">
      <SectionTitle namespace="experience" titleKey="title" highlightedWordIndex={1} />

      <div className="w-full mt-12 grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 grid-cols-1 gap-6 lg:gap-8 xl:gap-10 max-w-full">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.id === 1 ? t('job1.title') : 
                     card.id === 2 ? t('job2.title') : 
                     card.id === 3 ? t('job3.title') : 
                     t('job4.title')}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.id === 1 ? t('job1.title') : 
                   card.id === 2 ? t('job2.title') : 
                   card.id === 3 ? t('job3.title') : 
                   t('job4.title')}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.id === 1 ? t('job1.desc') : 
                   card.id === 2 ? t('job2.desc') : 
                   card.id === 3 ? t('job3.desc') : 
                   t('job4.desc')}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Social Media Connect Section */}
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {t('connectWith')} <span className="text-purple">{t('socialMedia')}</span>
        </h2>
        
        <div className="flex items-center gap-6 mt-2">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              download={info.download ? "CV-Resume-Pedro-Ferreira.pdf" : undefined}
              className="w-16 h-16 cursor-pointer flex justify-center items-center backdrop-filter 
              backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-xl border border-purple/30 
              hover:border-purple hover:scale-110 transition-all duration-300 group relative"
              aria-label={info.label || `Social link ${info.id}`}
            >
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity 
              duration-300 bg-black-200 px-3 py-2 rounded-lg text-sm font-medium">
                {info.id === 1 ? footerT('github') : info.id === 2 ? footerT('linkedin') : footerT('resume')}
              </div>
              <img 
                src={info.img} 
                alt={info.id === 1 ? footerT('github') : info.id === 2 ? footerT('linkedin') : footerT('resume')} 
                width={32} 
                height={32}
                className="group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          ))}
        </div>
        <p className="text-white-200 text-center mt-6 max-w-lg">
          {t('checkOutWork')}
        </p>
      </div>
    </div>
  );
};

export default Experience;