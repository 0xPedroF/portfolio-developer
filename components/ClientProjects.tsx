"use client";
import { clientProjects } from "@/data";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import SectionTitle from "./ui/SectionTitle";
import CardPreview from "./ui/CardPreview";

const ClientProjects = () => {
  const t = useTranslations('clients');
  const commonT = useTranslations('common');
  
  return (
    <section className="relative w-full py-16" id="clientProjects">
      <div className="section-shell space-y-10">
        <div className="text-center">
          <SectionTitle namespace="clients" titleKey="title" highlightedWordIndex={0} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {clientProjects.map(({ id, title, des, img, link }) => (
            <article
              key={id}
              className="flex min-h-[30rem] flex-col gap-5 rounded-[28px] border border-white/10 bg-[rgba(5,7,20,0.9)] p-6 shadow-[0_25px_70px_rgba(2,6,23,0.55)] backdrop-blur-2xl"
            >
              <CardPreview title={title} img={img} link={link} />

              <div className="flex flex-1 flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">{title}</h2>
                  <p className="text-sm leading-relaxed text-white/70">{des}</p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {t('clientText') || 'Client'}
                  </div>
                  <a 
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10" 
                    href={link} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {commonT('viewProject')}
                    <FaLocationArrow className="transition-transform duration-300" color="#CBACF9" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientProjects;
