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
    <footer className="w-full pb-10 mb-[100px] md:mb-5" 
    id="contact">
      <div className="flex flex-col items-center">
        <SectionTitle namespace="footer" titleKey="title" highlightedWordIndex={1} />
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {t('reachOut')}
        </p>
        <a href="mailto:contact@pedrofdev.com">
          <MagicButton
            translationKey="cta"
            translationNamespace="footer"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 flex-col items-center">
        <p className="text-center text-sm md:text-base font-light">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
