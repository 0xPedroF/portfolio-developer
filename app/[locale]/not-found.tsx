"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import MagicButton from "@/components/ui/MagicButton";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <main className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-8 md:px-10 lg:px-12">
      {/* Background effects matching the site design */}
      <div className="pointer-events-none absolute -top-64 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-32 left-[-20%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-sky-400/25 via-cyan-500/10 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="grid-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="section-shell text-center space-y-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid-overlay" />
          </div>
          
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-br from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              {t("title")}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <FaExclamationTriangle className="text-6xl text-amber-400/80" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            {t("heading")}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* Back Home Button */}
          <div className="pt-4">
            <Link href={`/${locale}`}>
              <MagicButton
                translationKey="backHome"
                translationNamespace="notFound"
                icon={<FaHome />}
                position="right"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}



