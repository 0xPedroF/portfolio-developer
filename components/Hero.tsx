"use client";
import React, { memo } from "react";
import MagicButton from "./ui/MagicButton";
import { FaBriefcase, FaLocationArrow, FaRocket, FaCog, FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import GlitchText from "./ui/GlitchText";

const Hero = memo(() => {
  const t = useTranslations("hero");

  const highlights = [
    {
      icon: <FaRocket className="text-2xl text-emerald-400" />,
      title: t("highlights.discovery.title"),
      description: t("highlights.discovery.description"),
    },
    {
      icon: <FaCog className="text-2xl text-cyan-400" />,
      title: t("highlights.delivery.title"),
      description: t("highlights.delivery.description"),
    },
    {
      icon: <FaHeart className="text-2xl text-pink-400" />,
      title: t("highlights.care.title"),
      description: t("highlights.care.description"),
    },
  ];

  return (
    <section className="relative w-full pb-24 pt-28" id="home">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-5 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.35),_transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="section-shell overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid-overlay" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-50" />
        <div className="relative grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1.05fr)_0.9fr]">
          <div className="space-y-5">
            <div className="space-y-3">
              <span className="glass-chip">{t("productTagline")}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="text-base text-white/80 sm:text-lg lg:text-xl">{t("subtitle")}</p>
              <p className="text-sm text-white/60 sm:text-base">{t("location")}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a href="#contact" className="w-full sm:w-auto">
                <MagicButton
                  translationKey="cta"
                  translationNamespace="footer"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </a>
              <a href="#projects" className="w-full sm:w-auto">
                <MagicButton
                  translationKey="showWork"
                  icon={<FaBriefcase />}
                  position="right"
                  otherClasses="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-violet-500/90"
                />
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-white/10 via-transparent to-white/5 p-6 shadow-[0_20px_80px_rgba(5,7,14,0.6)] backdrop-blur-2xl">
              <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-40 w-40 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/50 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl relative overflow-hidden">
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
                    <GlitchText text={t("dynamicWebMagic")} glitchInterval={4000} />
                  </p>
                </div>
                <div className="space-y-3">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex-shrink-0 mt-0.5">{highlight.icon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-1">{highlight.title}</p>
                        <p className="text-xs leading-relaxed text-white/70">
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
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
