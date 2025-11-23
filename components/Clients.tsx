"use client";
import React from "react";
import { companies, projects, clientProjects } from "@/data";
import { useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";

const techIconSet = Array.from(
  new Set([
    ...projects.flatMap((project) => project.iconLists ?? []),
    ...clientProjects.flatMap((project) => project.iconLists ?? []),
  ])
).filter(Boolean) as string[];

const formatAlt = (path: string) =>
  (path.split("/").pop() || "brand")
    .replace(".svg", "")
    .replace(/[-_]/g, " ")
    .toUpperCase();

const brandLogos = [
  ...companies.map((company) => ({
    id: `company-${company.id}`,
    img: company.img,
    alt: company.name,
  })),
  ...techIconSet.map((icon, index) => ({
    id: `tech-${index}`,
    img: icon,
    alt: formatAlt(icon),
  })),
];

const Clients = () => {
  const experienceT = useTranslations("experience");

  return (
    <section id="testimonials" className="relative w-full py-16">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <div className="flex min-w-max items-center gap-8 sm:gap-12 lg:gap-16 marquee-track-slow py-2">
            {[...brandLogos, ...brandLogos].map((brand) => (
              <div
                key={`${brand.id}-primary`}
                className="flex h-20 w-36 sm:h-24 sm:w-40 items-center justify-center rounded-xl border border-white/10 bg-black/30 px-5 sm:px-6 py-3 sm:py-4"
              >
                <img src={brand.img} alt={brand.alt} className="h-10 w-auto sm:h-12 opacity-80" />
              </div>
            ))}
          </div>
          <div className="flex min-w-max items-center gap-8 sm:gap-12 lg:gap-16 marquee-track-slow py-2" aria-hidden="true" style={{ animationDelay: "-19s" }}>
            {[...brandLogos, ...brandLogos].map((brand) => (
              <div
                key={`${brand.id}-secondary`}
                className="flex h-20 w-36 sm:h-24 sm:w-40 items-center justify-center rounded-xl border border-white/10 bg-black/30 px-5 sm:px-6 py-3 sm:py-4"
              >
                <img src={brand.img} alt={brand.alt} className="h-10 w-auto sm:h-12 opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
