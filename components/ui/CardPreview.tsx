"use client";

import Image from "next/image";

type CardPreviewProps = {
  title: string;
  img: string;
  link?: string;
};

const CardPreview = ({ title, img, link }: CardPreviewProps) => {
  const content = (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#151b3c] via-[#090f1f] to-[#05070e] transition-all duration-300 hover:border-white/25 sm:rounded-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_55%)] opacity-80" />
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 768px) 85vw, (max-width: 1280px) 45vw, 30vw"
        className="relative object-contain p-3 transition-transform duration-500 ease-out hover:scale-[1.03] sm:p-5 md:p-6"
        priority={false}
      />
      {link && (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/25">
          <div className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 sm:text-sm">
            View
          </div>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full"
        aria-label={`View ${title} project`}
      >
        {content}
      </a>
    );
  }

  return <div className="relative w-full">{content}</div>;
};

export default CardPreview;
