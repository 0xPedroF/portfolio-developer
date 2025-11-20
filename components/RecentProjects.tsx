"use client";
import { projects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import SectionTitle from "./ui/SectionTitle";
import CardPreview from "./ui/CardPreview";

const RecentProjects = () => {
  const t = useTranslations('projects');
  const commonT = useTranslations('common');
  
  return (
    <div className="py-20" id="projects">
      <SectionTitle namespace="projects" titleKey="title" highlightedWordIndex={1} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-5 p-4 mt-10 max-w-7xl mx-auto">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            key={id}
            className="w-full h-[40rem] sm:h-[42rem] md:h-[44rem] lg:h-[46rem] xl:h-[48rem] 2xl:h-[50rem] flex items-center justify-center"
          >
            <PinContainer title={title} href={link}>
              <div className="flex flex-col gap-5 sm:gap-6">
                <CardPreview title={title} img={img} />

                <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl line-clamp-1">
                {title}
              </h1>

              <p
                className="text-sm sm:text-base md:text-lg font-light text-white/70 line-clamp-3"
                style={{ color: "#BEC1DD", margin: "0.5rem 0" }}
              >
                {des}
              </p>

              <div className="flex items-center justify-between mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-2 sm:mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[0.2] rounded-full bg-black w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${4 * index + 1}px)`,
                      }}
                    >
                      <img src={icon} alt={`Technology icon ${index + 1}`} className="p-1 sm:p-1.5 md:p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <a 
                    className="flex text-sm sm:text-base md:text-lg text-purple border border-purple rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-purple hover:text-white group" 
                    href={link} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {commonT('viewProject')}
                    <FaLocationArrow className="ms-1 sm:ms-2 group-hover:translate-x-1 transition-transform duration-300" color="#CBACF9" />
                  </a>
                </div>
              </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
