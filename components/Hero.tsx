"use client";
import React, { memo } from "react";
import MagicButton from "./ui/MagicButton";
import { FaBriefcase, FaLocationArrow, FaRocket, FaCog, FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import GlitchText from "./ui/GlitchText";
import { scrollToSectionWhenReady, setUrlHash } from "@/lib/scroll";

const Hero = memo(() => {
  const t = useTranslations("hero");

  const goTo = (id: string) => {
    setUrlHash(id);
    void scrollToSectionWhenReady(id);
  };

  const highlights = [
    {
      icon: <FaRocket className="text-lg text-emerald-400 sm:text-xl" />,
      title: t("highlights.discovery.title"),
      description: t("highlights.discovery.description"),
    },
    {
      icon: <FaCog className="text-lg text-cyan-400 sm:text-xl" />,
      title: t("highlights.delivery.title"),
      description: t("highlights.delivery.description"),
    },
    {
      icon: <FaHeart className="text-lg text-pink-400 sm:text-xl" />,
      title: t("highlights.care.title"),
      description: t("highlights.care.description"),
    },
  ];

  return (
    <section className="relative w-full pb-6 pt-4 sm:pb-10 sm:pt-6 md:pb-16" id="home">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.3),_transparent_65%)] blur-3xl sm:h-[420px] sm:w-[420px]" />
      </div>

      <div className="section-shell overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-overlay" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_0.9fr] lg:gap-12">
          {/* Primary copy — always first and fully visible */}
          <div className="space-y-5">
            <span className="glass-chip">{t("productTagline")}</span>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="font-display text-balance text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {t("title")}
              </h1>
              <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/75 sm:text-lg lg:text-xl lg:leading-relaxed">
                {t("subtitle")}
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-white/45 sm:text-xs md:text-sm">
                {t("location")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagicButton
                translationKey="cta"
                translationNamespace="footer"
                icon={<FaLocationArrow />}
                position="right"
                handleClick={() => goTo("contact")}
              />
              <MagicButton
                translationKey="showWork"
                icon={<FaBriefcase />}
                position="right"
                otherClasses="bg-gradient-to-r from-sky-700/90 via-indigo-700/90 to-violet-600/90"
                handleClick={() => goTo("projects")}
              />
            </div>
          </div>

          {/* Highlights — stacked list on mobile, card panel on desktop */}
          <div className="relative">
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-4 sm:p-6 lg:bg-gradient-to-b lg:from-white/[0.07] lg:via-transparent lg:to-white/[0.03] lg:shadow-[0_20px_80px_rgba(5,7,14,0.55)] lg:backdrop-blur-2xl">
              <div className="mb-3 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 sm:mb-4 sm:px-4 sm:py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/90 sm:text-[11px] sm:tracking-[0.22em]">
                  <GlitchText text={t("dynamicWebMagic")} glitchInterval={4000} />
                </p>
              </div>

              <div className="grid gap-2.5 sm:gap-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-black/20 p-3 transition duration-300 hover:border-white/15 hover:bg-black/30 sm:p-4"
                  >
                    <div className="mt-0.5 flex-shrink-0">{highlight.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold tracking-tight text-white sm:text-[0.95rem]">
                        {highlight.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-[13px] sm:leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
