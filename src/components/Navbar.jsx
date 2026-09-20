import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

import VaelLogo from './VaelLogo';

export default function Navbar() {
  const { isAr, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocation = () => {
      setCurrentPath(window.location.pathname + window.location.hash);
    };

    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const whatsappUrl = `https://wa.me/201144162459?text=${encodeURIComponent(
    isAr
      ? 'مرحباً VAEL، حابب أستفسر عن تصميم موقع خاص/دعوة زفاف مخصصة'
      : 'Hello VAEL, I would like to order a custom website / wedding invitation'
  )}`;

  const navLinks = isAr ? [
    { name: 'الرئيسية', href: '/' },
    { name: 'الأعمال المختارة', href: '#experiences' },
    { name: 'الفلسفة', href: '#philosophy' },
    { name: 'طلب خاص', href: '/custom' },
  ] : [
    { name: 'HOME', href: '/' },
    { name: 'EXPERIENCES', href: '#experiences' },
    { name: 'PHILOSOPHY', href: '#philosophy' },
    { name: 'COMMISSIONS', href: '/custom' },
  ];

  const isLinkActive = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && href.startsWith('/') && currentPath.startsWith(href)) return true;
    if (href.startsWith('#') && currentPath.includes(href)) return true;
    return false;
  };

  const handleCustomClick = (e, href) => {
    if (href === '/custom') {
      e.preventDefault();
      window.history.pushState({}, '', '/custom');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.07] px-6 sm:px-12 md:px-16 py-5 md:py-6 select-none transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logotype */}
        <a href="/" className="flex items-center group">
          <VaelLogo className="h-6 sm:h-7 md:h-8 w-auto transition-opacity duration-300 group-hover:opacity-80" />
        </a>

        {/* Center: Desktop Nav Links (No Pill Containers) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleCustomClick(e, link.href)}
                className={`text-xs font-sans font-light tracking-[0.2em] uppercase transition-colors duration-500 relative py-1 ${
                  active ? 'text-[#F1EEE7]' : 'text-[#A8A8A3] hover:text-[#F1EEE7]'
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <motion.div
                    layoutId="navbarActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white/40"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-5">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="text-xs font-sans font-light tracking-[0.2em] text-[#A8A8A3] hover:text-[#F1EEE7] uppercase transition-colors duration-500 cursor-pointer"
            aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Understated Outline CTA */}
          <a
            href="/custom"
            onClick={(e) => handleCustomClick(e, '/custom')}
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full border border-white/20 text-xs font-sans font-light tracking-[0.2em] text-[#F1EEE7] uppercase transition-colors duration-500 hover:border-white hover:bg-white/5"
          >
            <span>{isAr ? 'طلب خاص' : 'INQUIRE'}</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F1EEE7] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[73px] bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.07] px-6 py-8 space-y-6 text-[#F1EEE7]"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleCustomClick(e, link.href);
                  }}
                  className="text-sm font-sans font-light tracking-[0.2em] uppercase py-2 border-b border-white/[0.07] flex items-center justify-between text-[#A8A8A3] hover:text-[#F1EEE7]"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </nav>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full border border-white/20 text-xs font-sans font-light tracking-[0.2em] uppercase text-[#F1EEE7] text-center block"
              >
                {isAr ? 'تواصل عبر الواتساب' : 'INQUIRE ON WHATSAPP'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
