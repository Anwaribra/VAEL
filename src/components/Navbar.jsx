import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Home, Layers, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Navbar() {
  const { isAr, toggleLang } = useLanguage();
  const [isOverLight, setIsOverLight] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) {
        setIsOverLight(true);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // If the hero section's bottom edge is above 80px, navbar is over the light body background
      if (rect.bottom <= 80) {
        setIsOverLight(true);
      } else {
        setIsOverLight(false);
      }
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition);

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
    { name: 'الخدمات', href: '#idea' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'Demos', href: '#showcase' },
    { name: 'Services', href: '#idea' },
  ];

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    isAr
      ? 'مرحباً VAEL، حابب أستفسر عن تصميم موقع خاص/دعوة زفاف مخصصة'
      : 'Hello VAEL, I would like to order a custom gift website / wedding invitation'
  )}`;

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
                  isOverLight ? 'text-[#0F0F12]' : 'text-white'
                }`}
              />
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:scale-105 hidden sm:inline-flex items-center gap-2 ${
                isOverLight
                  ? 'bg-[#0F0F12] text-white hover:bg-black'
                  : 'bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-black shadow-lg'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
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
          <button onClick={toggleLang} className="flex flex-col items-center gap-0.5 text-white font-bold" aria-label="Toggle Language">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-[9px] font-mono uppercase tracking-widest">{isAr ? 'EN' : 'AR'}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-zinc-200 gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </a>
        </motion.div>
      </div>
    </>
  );
}
