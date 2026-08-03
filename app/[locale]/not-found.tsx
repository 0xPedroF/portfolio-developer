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
      <div className="pointer-events-none absolute -top-64 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-500/25 via-indigo-500/15 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-32 left-[-20%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-400/20 via-teal-500/10 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="grid-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="section-shell space-y-8 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="grid-overlay" />
          </div>
          
          {/* 404 Number */}
          <div className="relative">
            <h1 className="bg-gradient-to-br from-sky-300 via-indigo-300 to-violet-300 bg-clip-text font-display text-9xl font-extrabold tracking-tight text-transparent drop-shadow-2xl md:text-[12rem]">
              {t("title")}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 animate-pulse rounded-full bg-sky-500/20 blur-3xl" />
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <FaExclamationTriangle className="text-6xl text-amber-400/80" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t("heading")}
          </h2>

          {/* Description */}
          <p className="body-muted mx-auto max-w-2xl text-lg">
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



