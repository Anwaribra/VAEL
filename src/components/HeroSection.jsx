import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

import VaelLogo from './VaelLogo';

export default function HeroSection({ onWaitlistSubmit }) {
  const { isAr } = useLanguage();
  const heroRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

  // Keyboard Escape & Focus restoration
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      triggerRef.current?.focus();
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEmailError('');
    // Keep isSubmitted state so returning to modal shows confirmation if previously submitted
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim();
    
    // Basic RFC 5322 regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setEmailError(
        isAr
          ? 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setEmailError('');
    setIsSubmitted(true);

    // Persist cleanly to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('vael_waitlist_emails') || '[]');
      if (!existing.includes(emailTrimmed)) {
        existing.push(emailTrimmed);
        localStorage.setItem('vael_waitlist_emails', JSON.stringify(existing));
      }
    } catch {
      // Quiet fallback if localStorage is restricted
    }

    // Invoke optional prop callback
    onWaitlistSubmit?.(emailTrimmed);
  };

  return (
    <div ref={heroRef} className="w-full">
      <motion.section
        id="hero-section"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full min-h-[90vh] md:min-h-[95vh] bg-[#080808] text-[#F1EEE7] overflow-hidden flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-36 sm:pt-44 md:pt-48 pb-20 md:pb-28 select-none border-b border-white/[0.07]"
      >
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(8,8,8,0.9)_100%)] z-10" />

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1 my-auto">
          
          {/* Left Column: Confident Editorial Typography */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-start flex flex-col items-center lg:items-start">
            
            {/* Studio Badge & Titles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-sans font-light tracking-[0.2em] text-[#A8A8A3] uppercase">
                <span>{isAr ? 'استوديو رقمي مستقل' : 'INDEPENDENT DIGITAL STUDIO'}</span>
              </div>

              <h1 className="flex justify-center lg:justify-start">
                <a href="/" className="inline-block hover:opacity-90 transition-opacity">
                  <VaelLogo className="h-16 sm:h-24 md:h-28 w-auto text-[#F1EEE7]" />
                </a>
              </h1>

              <div className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F1EEE7] tracking-tight leading-[1.08]">
                {isAr ? (
                  <>
                    دعوات رقمية <br />
                    <span className="font-serif italic text-[#A8A8A3]">مصممة شخصياً.</span>
                  </>
                ) : (
                  <>
                    Digital invitations <br />
                    <span className="font-serif italic text-[#A8A8A3]">made personal.</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed tracking-wide"
            >
              {isAr
                ? 'تجارب رقمية خاصة وموجهة فنوياً لحفلات الزفاف والخطوبة والمناسبات المميزة.'
                : 'Private, art-directed digital experiences for weddings, engagements, and meaningful celebrations.'}
            </motion.p>

            {/* Dual CTAs: Primary & Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5"
            >
              <a
                href="/custom"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/custom');
                  window.dispatchEvent(new Event('popstate'));
                }}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#F1EEE7] text-[#080808] font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-white shadow-lg"
              >
                <span>{isAr ? 'ابدأ تصميمك الخاص' : 'Start a commission'}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </a>

              <a
                href="#experiences"
                className="inline-flex items-center gap-2 text-xs font-sans font-light tracking-[0.2em] text-[#A8A8A3] hover:text-[#F1EEE7] uppercase py-2 transition-colors duration-500 border-b border-transparent hover:border-white/20"
              >
                <span>{isAr ? 'شاهد الأعمال المختارة' : 'View selected work'}</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: High-End Editorial Invitation Photograph Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/5] rounded-2xl bg-[#0b0b0e] border border-white/[0.08] overflow-hidden flex flex-col justify-between p-8 sm:p-10 select-none shadow-2xl group">
              
              {/* High-End Editorial Photograph Background */}
              <img
                src="/assets/vael_hero_invitation.png"
                alt="VAEL Art-Directed Blank Invitation Still Life"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-scale duration-700 group-hover:scale-[1.02]"
              />

              {/* Quiet Ambient Gradient Overlays for Readability & Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between text-xs font-sans font-light text-[#F1EEE7]/90 tracking-[0.2em] uppercase">
                <span className="drop-shadow-sm">VAEL STUDIO</span>
                <span className="drop-shadow-sm">2026</span>
              </div>

              {/* Center Announcement Content */}
              <div className="relative z-10 space-y-5 text-center my-auto pt-16">
                
                <div className="space-y-2">
                  <span className="text-xs font-sans font-light uppercase tracking-[0.25em] text-[#F1EEE7]/80 drop-shadow-sm">
                    {isAr ? 'الإصدار الأول' : 'THE FIRST EDITION'}
                  </span>
                  <h3 className="font-serif italic text-xl sm:text-2xl font-light text-[#F1EEE7] tracking-tight leading-snug drop-shadow-md max-w-xs mx-auto">
                    {isAr
                      ? 'انضموا إلى قائمة الانتظار للحصول على دعوة رقمية مجانية عند الإطلاق.'
                      : 'Join the early list for a complimentary digital invitation from VAEL at launch.'}
                  </h3>
                </div>

                <div className="pt-1">
                  <button
                    ref={triggerRef}
                    onClick={() => setIsModalOpen(true)}
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 text-[#F1EEE7] text-xs font-sans font-light tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/40 shadow-xl"
                  >
                    <span>{isAr ? 'انضم إلى قائمة الانتظار' : 'Join the waitlist'}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>

              </div>

              {/* Bottom Metadata */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-sans font-light text-[#F1EEE7]/70 tracking-[0.2em] uppercase border-t border-white/10 pt-4 drop-shadow-sm">
                <span>{isAr ? 'إصدارات خاصة' : 'PRE-LAUNCH EDITION'}</span>
                <span>VAEL</span>
              </div>

            </div>
          </motion.div>

        </div>

      </motion.section>

      {/* Quiet Accessible Waitlist Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="waitlist-title"
              aria-describedby="waitlist-desc"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md bg-[#0e0e12] border border-white/10 rounded-2xl p-8 sm:p-10 text-[#F1EEE7] shadow-2xl space-y-7"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                aria-label={isAr ? 'إغلاق' : 'Close'}
                className="absolute top-6 right-6 text-[#A8A8A3] hover:text-[#F1EEE7] transition-colors focus:outline-none"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 id="waitlist-title" className="font-serif italic text-2xl sm:text-3xl font-light text-[#F1EEE7]">
                      {isAr ? 'الانضمام للقائمة الأولى' : 'Join the early list'}
                    </h3>
                    <p id="waitlist-desc" className="text-xs sm:text-sm text-[#8E8E89] font-light leading-relaxed">
                      {isAr
                        ? 'اتركوا بريدكم الإلكتروني وسنخبركم عندما تتوفر أولى دعوات VAEL.'
                        : 'Leave your email and we’ll let you know when VAEL’s first invitations are ready.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="waitlist-email" className="block text-xs font-sans font-light tracking-[0.18em] uppercase text-[#A8A8A3]">
                      {isAr ? 'البريد الإلكتروني' : 'Email address'}
                    </label>
                    <input
                      ref={inputRef}
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#F1EEE7] placeholder-[#8E8E89]/50 text-sm font-sans focus:outline-none focus:border-white/40 transition-colors"
                    />
                    {emailError && (
                      <p className="text-xs text-rose-400 font-sans tracking-wide pt-1">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#F1EEE7] hover:bg-white text-[#080808] font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <span>{isAr ? 'انضم إلى قائمة الانتظار' : 'Join the waitlist'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto text-[#F1EEE7]">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif italic text-2xl sm:text-3xl font-light text-[#F1EEE7]">
                      {isAr ? 'تمت إضافتكم للقائمة.' : 'You’re on the list.'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8E8E89] font-light leading-relaxed max-w-xs mx-auto">
                      {isAr
                        ? 'سنقوم بإعلامكم فور جاهزية الدعوات الأولى.'
                        : 'We’ll let you know when the first invitations are ready.'}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-sans font-light tracking-[0.2em] text-[#F1EEE7] uppercase transition-colors"
                    >
                      {isAr ? 'إغلاق' : 'Close'}
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
