import { footer } from "framer-motion/client";
import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" 
    id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:contact@pedrofdev.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Pedro Ferreira
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              download={info.download ? true : null}
              className="w-12 h-12 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg 
              saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-purple/30 
              hover:border-purple hover:scale-110 transition-all duration-300 group relative"
              aria-label={info.label || `Social link ${info.id}`}
            >
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity 
              duration-300 bg-black-200 px-2 py-1 rounded text-xs whitespace-nowrap">
                {info.id === 1 ? 'GitHub' : info.id === 2 ? 'LinkedIn' : 'Download Resume'}
              </div>
              <img 
                src={info.img} 
                alt={info.id === 1 ? 'GitHub' : info.id === 2 ? 'LinkedIn' : 'Resume'} 
                width={24} 
                height={24}
                className="group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
