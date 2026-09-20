import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Home, Layers, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Navbar() {
  const { isAr, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if current scroll position is over a light background section
      const hero = document.getElementById('hero-section');
      if (!hero) {
        // Default to light mode for pages without dark hero (e.g. /create, /custom)
        setIsOverLight(true);
        return;
      }

      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= 70) {
        setIsOverLight(true);
      } else {
        setIsOverLight(false);
      }
    };

    const handleLocation = () => {
      setCurrentPath(window.location.pathname + window.location.hash);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('popstate', handleLocation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
    { name: 'معرض الأعمال الحية', href: '#showcase' },
    { name: 'موقع مخصص', href: '/custom' },
    { name: 'تواصل معنا', href: '#contact' },
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Live Showcase', href: '#showcase' },
    { name: 'Custom Website', href: '/custom' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const isLinkActive = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && href.startsWith('/') && currentPath.startsWith(href)) return true;
    if (href.startsWith('#') && currentPath.includes(href)) return true;
    return false;
  };

  return (
    <>
      {/* DESKTOP & TABLET ELASTIC NAVBAR */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 top-3.5 left-0 right-0 px-4 sm:px-6 flex justify-center transition-all duration-500 ease-out pointer-events-auto"
      >
        <div
          className={`w-full max-w-5xl transition-all duration-500 ease-out flex items-center justify-between rounded-full px-6 py-2.5 ${
            isOverLight
              ? 'bg-white/60 backdrop-blur-2xl border border-black/10 text-[#0F0F12] shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
              : 'bg-[#07070a]/70 backdrop-blur-2xl border border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Brand Logotype */}
          <a href="/" className="flex items-center gap-1 group shrink-0">
            <span
              className={`font-serif italic text-2xl font-normal tracking-tight transition-colors ${
                isOverLight ? 'text-[#0F0F12] group-hover:opacity-75' : 'text-white group-hover:opacity-80'
              }`}
            >
              VAEL
            </span>
            <span
              className={`text-[10px] font-sans font-semibold relative -top-2 inline-block transition-colors ${
                isOverLight ? 'text-[#71717A]' : 'text-amber-200/90'
              }`}
            >
              ®
            </span>
          </a>

          {/* Centered Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 justify-center shrink-0">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium tracking-wide whitespace-nowrap transition-all relative py-1 group ${
                    isOverLight
                      ? active ? 'text-[#0F0F12] font-semibold' : 'text-[#52525B] hover:text-[#0F0F12]'
                      : active ? 'text-white font-semibold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Clean hover & active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-px transition-transform origin-left duration-300 ${
                      isOverLight ? 'bg-[#0F0F12]' : 'bg-white'
                    } ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className={`text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all px-2.5 py-1.5 rounded-full border flex items-center gap-1 cursor-pointer active:scale-95 ${
                isOverLight
                  ? 'border-black/10 text-[#52525B] hover:text-[#0F0F12] hover:bg-black/5'
                  : 'border-white/15 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Inquire Studio CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight whitespace-nowrap transition-all duration-300 hidden sm:inline-flex items-center justify-center shadow-md hover:scale-105 active:scale-95 cursor-pointer ${
                isOverLight
                  ? 'bg-[#0F0F12] text-white hover:bg-black'
                  : 'bg-white text-[#050507] hover:bg-zinc-200'
              }`}
            >
              <span>{isAr ? 'تواصل معنا' : 'Inquire Studio'}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border ${
                isOverLight
                  ? 'border-black/10 text-[#0F0F12] bg-black/5'
                  : 'border-white/15 text-zinc-300 bg-white/5'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden fixed top-20 left-4 right-4 z-40 rounded-3xl p-6 shadow-2xl space-y-4 ${
                isOverLight
                  ? 'bg-[#F5F5F7]/95 backdrop-blur-2xl border border-black/10 text-[#0F0F12]'
                  : 'bg-[#07070a]/95 backdrop-blur-2xl border border-white/20 text-white'
              }`}
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-serif italic tracking-wide py-2 border-b flex items-center justify-between ${
                      isOverLight
                        ? 'text-[#0F0F12] border-black/10 hover:text-black'
                        : 'text-zinc-200 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60" />
                  </a>
                ))}
              </nav>

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 rounded-full font-semibold text-xs text-center shadow-lg flex items-center justify-center gap-2 ${
                    isOverLight ? 'bg-[#0F0F12] text-white' : 'bg-white text-black'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>{isAr ? 'تواصل عبر واتساب' : 'Inquire on WhatsApp'}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* MOBILE BOTTOM FLOATING DOCK */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs pointer-events-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-500 ${
            isOverLight
              ? 'bg-[#F5F5F7]/95 backdrop-blur-2xl border border-black/10 text-[#0F0F12] shadow-[0_15px_40px_rgba(0,0,0,0.1)]'
              : 'bg-[#07070a]/90 backdrop-blur-2xl border border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
          }`}
        >
          <a href="/" className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity">
            <Home className="w-4 h-4" />
            <span className="text-[9px] font-sans uppercase tracking-widest">{isAr ? 'الرئيسية' : 'Home'}</span>
          </a>

          <a href="#showcase" className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity">
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-sans uppercase tracking-widest">{isAr ? 'الأعمال' : 'Showcase'}</span>
          </a>

          <button onClick={toggleLang} className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity" aria-label="Toggle Language">
            <Globe className="w-4 h-4" />
            <span className="text-[9px] font-sans uppercase tracking-widest">{isAr ? 'EN' : 'AR'}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wide shadow-md gap-1 ${
              isOverLight ? 'bg-[#0F0F12] text-white' : 'bg-white text-black'
            }`}
          >
            <MessageCircle className="w-3 h-3 text-emerald-500" />
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </a>
        </motion.div>
      </div>
    </>
  );
}
