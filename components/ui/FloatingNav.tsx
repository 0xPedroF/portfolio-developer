"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { throttle } from "lodash";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  // Update visibility based on scroll
  useEffect(() => {
    const handleScroll = throttle(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY / height
      setVisible(current > 0.001) // Show with even the slightest scroll
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect active section based on scroll position
  useEffect(() => {
    const sections = navItems.map(item => item.link.replace('#', ''));
    
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Special case for contact section (which is usually at the bottom)
      // Check if we're near the bottom of the page
      if (window.innerHeight + window.scrollY >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }
      
      // Check each section to see if it's in view
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          // Consider a section active if it occupies a significant portion of the viewport
          const isVisible = 
            (top <= windowHeight * 0.4 && bottom >= windowHeight * 0.3) || 
            (top >= 0 && top <= windowHeight * 0.4);
          
          if (isVisible) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop and Mobile Navbar */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: visible ? 'rgba(10, 10, 25, 0.85)' : 'rgba(10, 10, 25, 0)',
          backdropFilter: visible ? 'blur(12px)' : 'none',
          boxShadow: visible ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none',
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1], // Smooth curve for better effect
        }}
        className={cn(
          "fixed top-0 left-0 w-full z-[5000] px-6 py-5 flex items-center justify-between border-b transition-all duration-300",
          visible ? "border-white/10" : "border-transparent",
          className
        )}
      >
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-white"
        >
          Pedro<span className="text-purple-400">Ferreira</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((navItem, idx) => {
            const isActive = activeSection === navItem.link.replace('#', '');
            
            return (
              <Link
                key={`nav-link-${idx}`}
                href={navItem.link}
                className="relative overflow-hidden group py-2 px-2"
              >
                <span 
                  className={`text-sm font-medium transition-colors flex items-center ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white/90'
                  }`}
                >
                  {navItem.name}
                </span>
                {/* Active indicator - using motion for smoother animation */}
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  initial={false}
                  animate={{ 
                    width: isActive ? '100%' : '0%',
                    opacity: isActive ? 1 : 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 26, 
                      mass: 1
                    }
                  }}
                  layoutId="activeNavIndicator"
                />
                {/* Hover indicator */}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-400/40 group-hover:w-full transition-all duration-300 ease-out"></span>
                )}
              </Link>
            );
          })}
          
          {/* Contact Button */}
          <Link 
            href="#contact"
            className="relative py-2 px-4 rounded-lg border border-purple-400/30 text-white/90 text-sm font-medium transition-all duration-300 hover:text-white hover:border-purple-400/70 hover:bg-purple-400/10 ml-2 cursor-pointer group"
          >
            <span className="inline-flex items-center">
              Let's Talk
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative w-10 h-10 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 delay-200' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'w-0 opacity-50' : 'w-6 delay-200 opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 delay-200' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-[4999] bg-gradient-to-b from-[#0a0a19]/95 to-[#0a0a19]/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col p-5 space-y-5">
              {navItems.map((navItem, idx) => {
                const isActive = activeSection === navItem.link.replace('#', '');
                
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    onClick={handleLinkClick}
                    className={`text-lg font-medium border-b border-white/10 pb-3 relative ${
                      isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center"
                    >
                      {navItem.name}
                    </motion.div>
                    
                    {/* Mobile active indicator */}
                    {isActive && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                href="#contact"
                onClick={handleLinkClick}
                className="relative mt-4 py-3 px-4 w-full text-center rounded-lg border border-purple-400/30 text-white/90 font-medium transition-all duration-300 hover:text-white hover:border-purple-400/70 hover:bg-purple-400/10 cursor-pointer group"
              >
                <span className="inline-flex items-center justify-center">
                  Let's Talk
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
