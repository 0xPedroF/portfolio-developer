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
    <section className="relative w-full py-16" id="experience">
      <div className="section-shell space-y-12">
        <SectionTitle namespace="experience" titleKey="title" highlightedWordIndex={1} />

      <div className="w-full grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 grid-cols-1 gap-6 lg:gap-8 xl:gap-10 max-w-full">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "linear-gradient(135deg, rgba(20,16,41,0.95) 0%, rgba(6,10,27,0.9) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 border-white/10 text-white"
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
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_70px_rgba(2,6,23,0.55)]">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t('connectWith')} <span className="text-purple">{t('socialMedia')}</span>
        </h2>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">{t('checkOutWork')}</p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              download={info.download ? "CV-Resume-Pedro-Ferreira.pdf" : undefined}
              className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
              aria-label={info.label || `Social link ${info.id}`}
            >
              <div className="absolute -top-10 rounded-full bg-black/70 px-3 py-1 text-xs opacity-0 backdrop-blur transition group-hover:opacity-100">
                {info.id === 1 ? footerT('github') : info.id === 2 ? footerT('linkedin') : footerT('resume')}
              </div>
              <img 
                src={info.img} 
                alt={info.id === 1 ? footerT('github') : info.id === 2 ? footerT('linkedin') : footerT('resume')} 
                width={32} 
                height={32}
                className="transition-transform duration-300 group-hover:scale-110" 
              />
            </a>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Experience;