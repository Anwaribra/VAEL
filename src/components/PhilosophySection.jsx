import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function PhilosophySection() {
  const { isAr } = useLanguage();
  const [activeDirectionIndex, setActiveDirectionIndex] = useState(0);

  const directions = [
    {
      id: '01',
      title: isAr ? 'ملكي' : 'ROYAL',
      subtitle: isAr ? 'تفاصيل معدنية، ظلال عميقة، ومدخل رسمي.' : 'Metallic details, deep shadows, and a formal entrance.',
      image: '/assets/vael_dir_royal.png',
    },
    {
      id: '02',
      title: isAr ? 'تحريري' : 'EDITORIAL',
      subtitle: isAr ? 'خطوط هادئة، مساحات واسعة، ورؤية عصرية.' : 'Quiet type, generous space, and a modern point of view.',
      image: '/assets/vael_dir_editorial.png',
    },
    {
      id: '03',
      title: isAr ? 'نباتي' : 'BOTANICAL',
      subtitle: isAr ? 'ظلال طبيعية، ألوان ناعمة، وإحساس بالمكان.' : 'Natural shadows, soft color, and a sense of place.',
      image: '/assets/vael_dir_botanical.png',
    },
    {
      id: '04',
      title: isAr ? 'نوار' : 'NOIR',
      subtitle: isAr ? 'أسطح داكنة، إضاءة هادئة، وأجواء خاصة.' : 'Dark surfaces, restrained light, and a private atmosphere.',
      image: '/assets/vael_dir_noir.png',
    },
    {
      id: '05',
      title: isAr ? 'مينيمل' : 'MINIMAL',
      subtitle: isAr ? 'خطوط واضحة، مساحات مفتوحة، وبدون تفاصيل زائدة.' : 'Clear type, open space, and nothing unnecessary.',
      image: '/assets/vael_dir_minimal.png',
    },
  ];

  const activeDirection = directions[activeDirectionIndex];

  return (
    <section id="philosophy" className="relative w-full py-32 md:py-44 px-6 sm:px-12 md:px-16 bg-[#080808] text-[#F1EEE7] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Index Header */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] pb-6 text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3]">
          <span className="text-[#F1EEE7]">02</span>
          <span className="w-8 h-px bg-white/20" />
          <span>{isAr ? 'الفلسفة' : 'PHILOSOPHY'}</span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F1EEE7] tracking-tight leading-[1.15]">
              {isAr ? (
                <>
                  ليس قالباً. <br />
                  <span className="font-serif italic text-[#A8A8A3]">
                    تبدأ كل دعوة من اللحظة ذاتها: الأسماء، المكان، الأجواء، والتفاصيل التي تستحق أن تُذكر.
                  </span>
                </>
              ) : (
                <>
                  NOT A TEMPLATE. <br />
                  <span className="font-serif italic text-[#A8A8A3]">
                    Every invitation begins with the moment itself: the names, the place, the mood, and the details worth remembering.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4 space-y-6">
            <p className="text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed">
              {isAr
                ? 'نشكّل الخطوط، الحركة، الصوت، والتفاصيل الدقيقة حول احتفال واحد.'
                : 'We shape the type, movement, sound, and small details around one celebration.'}
            </p>

            <a
              href="#process"
              className="inline-flex items-center gap-2 text-xs font-sans font-light tracking-[0.2em] text-[#F1EEE7] uppercase py-2 border-b border-white/20 hover:border-white transition-colors duration-500"
            >
              <span>{isAr ? 'شاهد كيف تتشكّل الدعوة' : 'See how an invitation takes shape'}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Minimalist Direction Showcase */}
        <div className="pt-12 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typographic Index List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-sans font-light text-[#A8A8A3] uppercase tracking-[0.2em] pb-4">
              {isAr ? 'الاتجاهات الفنية' : 'CREATIVE DIRECTIONS'}
            </div>

            <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4">
              {directions.map((dir, idx) => {
                const isActive = activeDirectionIndex === idx;
                return (
                  <button
                    key={dir.id}
                    onMouseEnter={() => setActiveDirectionIndex(idx)}
                    onClick={() => setActiveDirectionIndex(idx)}
                    className="group relative text-start transition-opacity duration-500 focus:outline-none"
                  >
                    <span
                      className={`font-display text-3xl sm:text-5xl font-light tracking-tight transition-colors duration-500 ${
                        isActive ? 'text-[#F1EEE7] opacity-100' : 'text-[#8E8E89]/40 hover:text-[#A8A8A3]'
                      }`}
                    >
                      {dir.title}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeDirectionLine"
                        className="h-px bg-white/40 mt-1 w-full"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Photograph Preview Thumbnail */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-xl bg-[#0b0b0e] border border-white/[0.08] overflow-hidden p-6 flex flex-col justify-between shadow-xl group">
              
              {/* High-End Editorial Direction Photograph with 80% Blur */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDirection.id}
                  src={activeDirection.image}
                  alt={activeDirection.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover blur-[10px] sm:blur-[12px] scale-105"
                />
              </AnimatePresence>

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none" />

              {/* Centered Lock Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 pointer-events-none z-20">
                <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#F1EEE7] shadow-xl">
                  <svg className="w-3.5 h-3.5 text-[#F1EEE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[9px] font-sans font-light tracking-[0.2em] text-[#F1EEE7]/90 uppercase bg-black/60 border border-white/10 px-3 py-0.5 rounded-full backdrop-blur-md">
                  {isAr ? 'نمط مغلق' : 'LOCKED PREVIEW'}
                </span>
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between text-xs font-sans font-light text-[#F1EEE7]/90 tracking-[0.2em] uppercase">
                <span className="drop-shadow-sm">{activeDirection.id} / {activeDirection.title}</span>
                <span className="drop-shadow-sm">{isAr ? 'اتجاه فني' : 'DIRECTION'}</span>
              </div>

              {/* Center Direction Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDirection.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-center my-auto space-y-2 pt-10"
                >
                  <p className="text-xs text-[#F1EEE7]/90 font-light leading-relaxed max-w-[280px] mx-auto drop-shadow-md">
                    {activeDirection.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Footer Tag */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-sans font-light text-[#F1EEE7]/70 tracking-[0.2em] uppercase border-t border-white/10 pt-3 drop-shadow-sm">
                <span>VAEL</span>
                <span>2026</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
