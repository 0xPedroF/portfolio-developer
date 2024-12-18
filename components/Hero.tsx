import React from "react";
import { Spotlight } from "./ui/Spotlight";
import MagicButton from "./ui/MagicButton";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";


const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* UI: grid, reduce grid color from 0.2 to 0.03 */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
      
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic
          </p>

          <h2 className="text-center text-[40px] md:text-5xl lg:text-6xl dark:text-white text-black leading-snug tracking-wide my-4 font-bold mb-8">
          Transforming Concepts into Seamless <span className="text-purple">User Experiences</span> 
          </h2>          

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Pedro Ferreira, a Web Developer based in Portugal.
          </p>

        <div className="flex gap-6">
          <a href="#about">
            <MagicButton
              title="Show my skills"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
          <a href="#projects">
            <MagicButton
              title="Show my work"
              icon={<FaBriefcase />}
              position="right"
              otherClasses="bg-[#00092f]"
            />
          </a>
        </div>
          

        

        </div>
      </div>
    </div>
  );
};

export default Hero;