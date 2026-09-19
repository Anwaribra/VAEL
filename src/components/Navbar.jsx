import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, FolderKanban, Globe, Moon, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Navbar() {
  const [isOverLight, setIsOverLight] = useState(false);
  const { toggleLang, isAr } = useLanguage();

  useEffect(() => {
    const checkPosition = () => {
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // The navbar floating pill sits at top: 20px, height ~56px.
        // Its bottom boundary is at ~80px from top of viewport.
        // If the bottom boundary of hero section is above 80px, navbar has crossed into light section content.
        setIsOverLight(rect.bottom <= 85);
      } else {
        setIsOverLight(window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });
    checkPosition();
    const timer = setTimeout(checkPosition, 100);

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
      clearTimeout(timer);
    };
  }, []);

  const navLinks = isAr ? [
    { name: 'الرئيسية', href: '#' },
    { name: 'النماذج الحية', href: '#showcase' },
    { name: 'الباقات والأسعار', href: '#pricing' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'Demos', href: '#showcase' },
    { name: 'Packages', href: '#pricing' },
  ];

  return (
    <>
      {/* DESKTOP & TABLET TOP FLOATING NAVBAR */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 pointer-events-none flex justify-center px-4"
      >
        <div
          className={`w-full max-w-5xl pointer-events-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-3 ${
            isOverLight
              ? 'bg-white/85 backdrop-blur-2xl border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
              : 'bg-[#050507]/75 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Brand Logotype */}
          <a href="#" className="flex items-center gap-1 group shrink-0">
            <span
              className={`font-serif italic text-2xl font-normal tracking-tight group-hover:opacity-75 transition-colors ${
                isOverLight ? 'text-[#0F0F12]' : 'text-white'
              }`}
            >
              VAEL
            </span>
            <span
              className={`text-[10px] font-sans font-semibold select-none transition-colors ${
                isOverLight ? 'text-[#71717A]' : 'text-amber-200/80'
              }`}
            >
              ®
            </span>
          </a>

          {/* Centered Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                  isOverLight
                    ? 'text-[#52525B] hover:text-[#0F0F12]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Language Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher Icon Button */}
            <button
              onClick={toggleLang}
              className={`w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm border hover:scale-105 active:scale-95 ${
                isOverLight
                  ? 'bg-black/5 hover:bg-black/10 border-black/10 text-[#0F0F12]'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe
                className={`w-4 h-4 transition-colors ${
                  isOverLight ? 'text-[#0F0F12]' : 'text-amber-200'
                }`}
              />
            </button>

            <a
              href="#pricing"
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:scale-105 hidden sm:inline-flex items-center ${
                isOverLight
                  ? 'bg-[#0F0F12] text-white hover:bg-black'
                  : 'bg-amber-200 text-black hover:bg-white'
              }`}
            >
              <span>{isAr ? 'احجز هديتك' : 'Order Gift'}</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* MOBILE BOTTOM FLOATING DOCK */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs pointer-events-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-full bg-[#0F0F12]/90 backdrop-blur-2xl border border-white/20 px-5 py-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between"
        >
          <a href="#" className="flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-[9px] font-mono uppercase tracking-widest">{isAr ? 'الرئيسية' : 'Home'}</span>
          </a>

          <a href="#showcase" className="flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors">
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-mono uppercase tracking-widest">{isAr ? 'النماذج' : 'Demos'}</span>
          </a>

          {/* Mobile Language Switcher */}
          <button onClick={toggleLang} className="flex flex-col items-center gap-0.5 text-amber-200 font-bold" aria-label="Toggle Language">
            <Globe className="w-4 h-4" />
            <span className="text-[9px] font-mono uppercase tracking-widest">{isAr ? 'EN' : 'AR'}</span>
          </button>

          <a href="#pricing" className="flex items-center justify-center bg-amber-200 text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            <span>{isAr ? 'طلب' : 'Order'}</span>
          </a>
        </motion.div>
      </div>
    </>
  );
}


