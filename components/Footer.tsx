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
      <footer className="w-full py-16" id="contact">
        <div className="section-shell space-y-8 text-center">
          <SectionTitle namespace="footer" titleKey="title" highlightedWordIndex={1} />
          <p className="text-white/70 md:mt-6 max-w-2xl mx-auto">
            {t('reachOut')}
          </p>
          <div className="flex flex-col items-center gap-4">
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
              className="text-base text-white/80 hover:text-white transition-colors"
            >
              contact@pedrofdev.com
            </a>
          </div>
        </div>
      </footer>
      <p className="text-center text-sm text-white/40 pb-8">
        {t('copyright')}
      </p>
    </>
  );
};

export default Footer;
