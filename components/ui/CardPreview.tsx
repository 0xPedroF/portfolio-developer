"use client";

import Image from "next/image";

type CardPreviewProps = {
  title: string;
  img: string;
};

const CardPreview = ({ title, img }: CardPreviewProps) => {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#151b3c] via-[#090f1f] to-[#05070e] shadow-[0_25px_60px_rgba(5,7,14,0.55)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_55%)] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(244,114,182,0.15),_rgba(99,102,241,0.05))]" />
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
          className="relative object-contain p-6 sm:p-7 md:p-8 drop-shadow-[0_20px_45px_rgba(15,23,42,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.05]"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 border border-white/5 rounded-[28px] opacity-60" />
        <div className="pointer-events-none absolute inset-6 rounded-2xl border border-white/5 opacity-20" />
      </div>
    </div>
  );
};

export default CardPreview;

