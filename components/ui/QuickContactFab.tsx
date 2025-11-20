"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaPaperPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import { MdOutgoingMail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

type Action = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  download?: boolean;
  target?: string;
  hoverClass?: string;
};

const QuickContactFab = () => {
  const footerT = useTranslations("footer");
  const commonT = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const actions = useMemo<Action[]>(() => {
    const baseActions: Action[] = [
      {
        id: "github",
        label: footerT("github"),
        href: "https://github.com/0xPedroF",
        icon: <FaGithub className="text-xl" />,
        target: "_blank",
        hoverClass: "hover:bg-[#F05032] hover:border-[#F05032] hover:text-white",
      },
      {
        id: "linkedin",
        label: footerT("linkedin"),
        href: "https://www.linkedin.com/in/ppedroferreira/",
        icon: <FaLinkedin className="text-xl" />,
        target: "_blank",
        hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
      },
      {
        id: "resume",
        label: footerT("resume"),
        href: "/docs/CV-Resume-Pedro-Ferreira.pdf",
        icon: <TbFileCv  className="text-xl" />,
        download: true,
        hoverClass: "hover:bg-[#10b981] hover:border-[#10b981]",
      },
      {
        id: "email",
        label: commonT("sendMessage"),
        href: "mailto:contact@pedrofdev.com",
        icon: <MdOutgoingMail className="text-xl" />,
        hoverClass: "hover:bg-[#f43f5e] hover:border-[#f43f5e] hover:text-white",
      },
    ];
    return baseActions.reverse();
  }, [footerT, commonT]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const radius = 112;

  return (
    <div className="fixed bottom-6 right-6 z-[80]" ref={wrapperRef}>
      <div className="relative h-16 w-16">
        <AnimatePresence>
          {actions.map((action, index) => {
            const angleDeg =
              180 + (index * 90) / Math.max(actions.length - 1, 1);
            const angleRad = (angleDeg * Math.PI) / 180;
            const offsetX = Math.cos(angleRad) * radius;
            const offsetY = Math.sin(angleRad) * radius;

            return (
              <div
                key={action.id}
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <motion.a
                  href={action.href}
                  target={action.target}
                  rel={
                    action.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  download={action.download}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, scale: 0.75, x: 0, y: 0 }}
                  animate={
                    isOpen
                      ? {
                          opacity: 1,
                          scale: 1,
                          x: offsetX,
                          y: offsetY,
                        }
                      : {
                          opacity: 0,
                          scale: 0.55,
                          x: offsetX * 0.4,
                          y: offsetY * 0.4,
                        }
                  }
                  exit={{
                    opacity: 0,
                    scale: 0.55,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 34,
                    mass: 0.7,
                    delay: index * (isOpen ? 0.02 : 0),
                  }}
                  className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-[0_15px_40px_rgba(2,6,23,0.6)] backdrop-blur transition hover:scale-[1.05] ${action.hoverClass ?? "hover:border-purple/60 hover:bg-slate-900"}`}
                >
                  {action.icon}
                  <span className="sr-only">{action.label}</span>
                </motion.a>
              </div>
            );
          })}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Quick contact menu"
          className="absolute inset-0 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#5c5ce0] via-[#4c57c8] to-[#1f7ac9] text-white shadow-[0_18px_35px_rgba(31,122,201,0.35)] ring-1 ring-white/15 transition hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <FaPaperPlane
            className={`text-2xl transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default QuickContactFab;

