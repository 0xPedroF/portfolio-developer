"use client";
import React from "react";
import { companies, projects, clientProjects } from "@/data";

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

/** Duplicate the list for seamless marquee, with unique React keys. */
function marqueeItems(lane: "primary" | "secondary") {
  return [...brandLogos, ...brandLogos].map((brand, index) => ({
    ...brand,
    key: `${lane}-${brand.id}-${index}`,
  }));
}

const Clients = () => {
  return (
    <section id="testimonials" className="section-gap">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_25px_70px_rgba(2,6,23,0.55)] backdrop-blur-2xl sm:rounded-2xl sm:p-8 lg:p-12">
          <div className="marquee-track-slow flex min-w-max items-center gap-6 py-2 sm:gap-12 lg:gap-16">
            {marqueeItems("primary").map((brand) => (
              <div
                key={brand.key}
                className="flex h-16 w-28 items-center justify-center rounded-xl border border-white/10 bg-black/30 px-3 py-2 sm:h-20 sm:w-36 sm:px-5 sm:py-3 lg:h-24 lg:w-40 lg:px-6 lg:py-4"
              >
                <img src={brand.img} alt={brand.alt} className="h-8 w-auto opacity-80 sm:h-10 lg:h-12" />
              </div>
            ))}
          </div>
          <div
            className="marquee-track-slow flex min-w-max items-center gap-6 py-2 sm:gap-12 lg:gap-16"
            aria-hidden="true"
            style={{ animationDelay: "-19s" }}
          >
            {marqueeItems("secondary").map((brand) => (
              <div
                key={brand.key}
                className="flex h-16 w-28 items-center justify-center rounded-xl border border-white/10 bg-black/30 px-3 py-2 sm:h-20 sm:w-36 sm:px-5 sm:py-3 lg:h-24 lg:w-40 lg:px-6 lg:py-4"
              >
                <img src={brand.img} alt={brand.alt} className="h-8 w-auto opacity-80 sm:h-10 lg:h-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
