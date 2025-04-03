import { clientProjects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";

const ClientProjects = () => {
  return (
    <div className="py-20" id="clientProjects">
      <h1 className="heading">
        Projects I've Developed for{" "}
        <span className="text-purple">Clients</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {clientProjects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            key={id}
            className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
          >
            <PinContainer title={title} href={link}>
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image 
                    src="/bg.png" 
                    alt="Background" 
                    fill
                    sizes="(max-width: 768px) 100vw, 570px"
                    className="object-cover"
                    priority={false}
                    loading="lazy"
                  />
                </div>
                <div className="z-10 absolute bottom-0 w-auto h-auto">
                  <Image 
                    src={img} 
                    alt={title} 
                    width={550} 
                    height={450}
                    sizes="(max-width: 768px) 90vw, 550px"
                    priority={false}
                    loading="lazy"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{ color: "#BEC1DD", margin: "1vh 0" }}
              >
                {des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image 
                        src={icon} 
                        alt={`Technology icon ${index + 1}`} 
                        width={24} 
                        height={24}
                        className="p-2"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <a 
                    className="flex lg:text-xl md:text-xs text-sm text-purple border border-purple rounded-full px-4 py-2 transition-all duration-300 hover:bg-purple hover:text-white group" 
                    href={link} 
                    target="_blank"
                  >
                    Check Live Site
                    <FaLocationArrow className="ms-2 group-hover:translate-x-1 transition-transform duration-300" color="#CBACF9" />
                  </a>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientProjects;
