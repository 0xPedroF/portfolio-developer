'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Change language
  const changeLanguage = (newLocale: string) => {
    // Get current path without locale prefix
    const path = window.location.pathname.replace(/^\/(en|pt)/, '') || '/';
    window.location.href = `/${newLocale}${path}`;
    setIsOpen(false);
  };
  
  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-1 py-2 px-3 rounded-lg border border-purple-400/30 text-white/90 text-sm font-medium transition-all duration-300 hover:text-white hover:border-purple-400/70 hover:bg-purple-400/10 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{locale === 'en' ? '🇬🇧' : '🇵🇹'}</span>
        <span>{locale.toUpperCase()}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-[#0a0a19] border border-purple-400/20 rounded-lg shadow-lg py-1 overflow-hidden"
          >
            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center w-full px-4 py-2 text-sm ${locale === 'en' ? 'text-purple-400 bg-purple-400/10' : 'text-white/80 hover:bg-purple-400/5'}`}
            >
              <span className="mr-2">🇬🇧</span>
              <span>{t('en')}</span>
              {locale === 'en' && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-auto h-4 w-4"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
            <button
              onClick={() => changeLanguage('pt')}
              className={`flex items-center w-full px-4 py-2 text-sm ${locale === 'pt' ? 'text-purple-400 bg-purple-400/10' : 'text-white/80 hover:bg-purple-400/5'}`}
            >
              <span className="mr-2">🇵🇹</span>
              <span>{t('pt')}</span>
              {locale === 'pt' && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-auto h-4 w-4"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 