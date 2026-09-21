import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import Footer from './Footer';

export default function InquiryFooterSection() {
  const { isAr } = useLanguage();

  const handleNavigateCustom = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/custom');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section id="inquiry-footer" className="w-full bg-[#080808] text-[#F1EEE7]">
      
      {/* 05 — INQUIRY CALL TO ACTION */}
      <div className="py-32 md:py-44 px-6 sm:px-12 md:px-16 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto space-y-16 text-center flex flex-col items-center">
          
          {/* Distinct Section Anatomy 05: Capsule Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-sans font-light tracking-[0.25em] text-[#A8A8A3] uppercase">
            <span>{isAr ? 'طلب تصميم خاص' : 'BESPOKE INQUIRIES'}</span>
          </div>

          {/* Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 max-w-4xl"
          >
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F1EEE7] tracking-tight leading-[1.08]">
              {isAr ? 'هل لديك مناسبة في الذهن؟' : 'Have a moment in mind?'}
            </h2>
            <p className="text-base sm:text-xl font-light text-[#F1EEE7]/90 font-serif italic">
              {isAr ? 'شاركونا تفاصيل احتفالكم وسنقوم بصياغتها.' : 'Tell us what you are celebrating and we will shape the experience.'}
            </p>
            <p className="text-xs sm:text-sm font-light text-[#8E8E89] tracking-wide max-w-lg mx-auto">
              {isAr
                ? 'شاركونا المناسبة، التاريخ، والشعور الذي تطمحون إليه.'
                : 'Share the occasion, the date, and the feeling you have in mind.'}
            </p>
          </motion.div>

          {/* Dual CTAs: Primary & Secondary */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/custom"
              onClick={handleNavigateCustom}
              className="group inline-flex items-center gap-4 px-10 py-4 rounded-full bg-[#F1EEE7] text-[#080808] font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-white shadow-xl cursor-pointer"
            >
              <span>{isAr ? 'ابدأ المحادثة' : 'Start a conversation'}</span>
              <span className="rtl-mirror transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">→</span>
            </a>

            <a
              href="#experiences"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-[#A8A8A3] hover:text-[#F1EEE7] border border-white/10 hover:border-white/20 text-xs font-sans font-light tracking-[0.2em] uppercase transition-colors duration-500 cursor-pointer"
            >
              <span>{isAr ? 'شاهد الأعمال المختارة' : 'View selected work'}</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* UNIFIED FOOTER */}
      <Footer />

    </section>
  );
}
