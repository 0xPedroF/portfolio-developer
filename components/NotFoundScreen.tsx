import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { cn } from "@/lib/utils";

export type NotFoundCopy = {
  status: string;
  heading: string;
  description: string;
  backHome: string;
};

export const defaultNotFoundCopy: NotFoundCopy = {
  status: "RADAR · NO MATCH",
  heading: "We scanned the whole map…",
  description:
    "This route ghosted us. Zero pings on the radar — just empty space.",
  backHome: "Beam me home",
};

type NotFoundScreenProps = {
  homeHref: string;
  copy?: Partial<NotFoundCopy>;
};

/**
 * Shared 404 — radar gif blended into the shell, no glow frame.
 */
export default function NotFoundScreen({
  homeHref,
  copy,
}: NotFoundScreenProps) {
  const text = { ...defaultNotFoundCopy, ...copy };

  return (
    <main className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-14 sm:px-8 sm:py-16 md:px-10">
      <div className="pointer-events-none absolute -top-48 right-[-12%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-sky-500/20 via-indigo-500/12 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-16%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-cyan-400/15 via-teal-500/8 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="grid-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div
          className={cn(
            "section-shell overflow-hidden text-center",
            "px-5 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14"
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="grid-overlay" />
          </div>

          <div className="relative flex flex-col items-center gap-7 sm:gap-8">
            <span className="glass-chip text-cyan-100/85">{text.status}</span>

            {/* Soft edge fade into section-shell so the gif feels native */}
            <div className="relative w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-sm">
              <Image
                src="/404.gif"
                alt="404 radar scan — page not found"
                width={640}
                height={360}
                priority
                unoptimized
                className="mx-auto h-auto w-full select-none"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    linear-gradient(to right, rgba(9,12,28,0.95) 0%, transparent 18%, transparent 82%, rgba(9,12,28,0.95) 100%),
                    linear-gradient(to bottom, rgba(9,12,28,0.92) 0%, transparent 22%, transparent 78%, rgba(9,12,28,0.95) 100%)
                  `,
                }}
              />
            </div>

            <div className="max-w-lg space-y-3 sm:space-y-3.5">
              <h1 className="font-display text-balance text-[1.65rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[2.1rem]">
                {text.heading}
              </h1>
              <p className="mx-auto max-w-md text-[0.95rem] leading-relaxed text-white/60 sm:text-base">
                {text.description}
              </p>
            </div>

            <Link
              href={homeHref}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 font-display text-sm font-medium tracking-tight text-white transition hover:border-sky-400/45 hover:bg-sky-400/10 sm:h-12 sm:px-7"
            >
              <FaHome className="text-sky-300/90" />
              {text.backHome}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
