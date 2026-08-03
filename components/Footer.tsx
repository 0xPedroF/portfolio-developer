"use client";
import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";
import { useTranslations } from 'next-intl';
import SectionTitle from "./ui/SectionTitle";

const Footer = () => {
  const t = useTranslations('footer');
  
  return (
    <>
      <footer className="section-gap" id="contact">
        <div className="section-shell space-y-6 text-center sm:space-y-8">
          <SectionTitle namespace="footer" titleKey="title" highlightedWordIndex={1} />
          <p className="body-muted mx-auto max-w-2xl md:mt-2">
            {t('reachOut')}
          </p>
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <a href="mailto:contact@pedrofdev.com" className="w-full max-w-md">
              <MagicButton
                translationKey="cta"
                translationNamespace="footer"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a 
              href="mailto:contact@pedrofdev.com" 
              className="break-all font-mono text-sm tracking-tight text-white/70 transition-colors hover:text-sky-300 sm:text-base"
            >
              contact@pedrofdev.com
            </a>
          </div>
        </div>
      </footer>
      <p className="pb-6 text-center font-mono text-[11px] tracking-wide text-white/35 sm:pb-8 sm:text-xs">
        {t('copyright', { year: new Date().getFullYear() })}
      </p>
    </>
  );
};

export default Footer;
