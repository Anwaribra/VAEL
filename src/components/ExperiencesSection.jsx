import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ExperiencesSection() {
  const { isAr } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = isAr ? [
    {
      id: '01',
      tag: 'دعوة زفاف ملكية',
      title: 'دعوات الزفاف الإلكترونية والاحتفالات',
      subtitle: 'دعوات زفاف سينمائية تتضمن فتح الختم الفضي الملكي، تأكيد حضور الضيوف (RSVP)، وخرائط للقاعة.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      badge: 'الختم السائل + RSVP',
      link: '#showcase'
    },
    {
      id: '02',
      tag: 'هدية عيد ميلاد وذكريات',
      title: 'مواقع الهدايا الرقمية المشفرة',
      subtitle: 'هدية رقمية رومانسية تفتح برمز سر خاص، تضم ألبوم صور بلوري، رسائل صوتية، وعد تنازلي.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      badge: 'مشفر بكلمة سر',
      link: '/gifts'
    },
    {
      id: '03',
      tag: 'سجل وقوائم الهدايا',
      title: 'قوائم الهدايا الإلكترونية والمباركات',
      subtitle: 'بديل مودرن للقوائم التقليدية، يتيح للمدعوين اختيار الهدية المناسبة وإرسال المباركات المالية والعينية.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      badge: 'سجل الهدايا المباشر',
      link: '/gifts'
    },
    {
      id: '04',
      tag: 'تايم لاين ورسائل مفاجأة',
      title: 'التايم لاين الزمني ورسائل الكشف',
      subtitle: 'موقع زمني تفاعلي يوثق رحلة أجمل الأيام بين الزوجين، أو رابط مشفر يفتح في لحظة معينة.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      badge: 'دومين دائم للأبد',
      link: '/custom'
    }
  ] : [
    {
      id: '01',
      tag: 'Ceremonial Wedding',
      title: 'Ceremonial Wedding Invitation Portals',
      subtitle: 'High-editorial digital wedding invitations featuring melting silver wax seals, guest RSVP, and venue maps.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      badge: 'Liquid Seal & RSVP',
      link: '#showcase'
    },
    {
      id: '02',
      tag: 'Birthday & Anniversary',
      title: 'Password-Protected Personal Gift Capsules',
      subtitle: 'An intimate digital gift site unlocked with a secret passphrase, featuring spatial photo galleries and voice notes.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      badge: 'Passphrase Vault',
      link: '/gifts'
    },
    {
      id: '03',
      tag: 'Gift Registry',
      title: 'Curated Wishlist & Digital Gift Registries',
      subtitle: 'A modern alternative to generic registries, allowing guests to inspect gift cards and leave monetary blessings.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      badge: 'Interactive Wishlist',
      link: '/gifts'
    },
    {
      id: '04',
      tag: 'Proposal & Timeline',
      title: 'Couples Timelines & Surprise Reveal Portals',
      subtitle: 'An interactive digital timeline tracing your shared milestones in a cinematic atmosphere.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      badge: 'Permanent Archive',
      link: '/custom'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  return (
    <section id="experiences" className="w-full py-24 px-4 sm:px-6 md:px-12 bg-transparent select-none overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header (Clean, dark text over light background) */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            {isAr ? '03 — المعرض التفاعلي 3D' : '03 — Interactive 3D Stack'}
          </span>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#0F0F12] tracking-tight">
            {isAr ? (
              <>تحفنا الرقمية <span className="font-serif italic text-zinc-500">للحظاتكم الخالدة.</span></>
            ) : (
              <>Cinematic Mediums <span className="font-serif italic text-zinc-500">Crafted for Eternity.</span></>
            )}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-zinc-500 tracking-wider">
            {isAr
              ? `${items.length} نماذج رقمية مخصصة • اسحب يميناً أو يساراً للتصفح`
              : `${items.length} digital mediums • Drag left or right to explore`}
          </p>
        </div>

        {/* 3D COVER FLOW STACK CAROUSEL */}
        <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center perspective-1000">
          {items.map((item, index) => {
            const count = items.length;
            // Calculate relative offset in circular array
            let diff = index - activeIndex;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const isCenter = diff === 0;
            const isLeft = diff === -1 || (diff < 0 && Math.abs(diff) <= 1);
            const isRight = diff === 1 || (diff > 0 && Math.abs(diff) <= 1);

            // Determine 3D transform position & rotation based on offset
            let translateX = '0%';
            let scale = 1;
            let rotateY = 0;
            let opacity = 0;
            let zIndex = 0;

            if (isCenter) {
              translateX = '0%';
              scale = 1.05;
              rotateY = 0;
              opacity = 1;
              zIndex = 30;
            } else if (diff === -1) {
              translateX = isAr ? '55%' : '-55%';
              scale = 0.84;
              rotateY = isAr ? -18 : 18;
              opacity = 0.65;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = isAr ? '-55%' : '55%';
              scale = 0.84;
              rotateY = isAr ? 18 : -18;
              opacity = 0.65;
              zIndex = 20;
            } else {
              translateX = diff < 0 ? (isAr ? '100%' : '-100%') : (isAr ? '-100%' : '100%');
              scale = 0.7;
              rotateY = diff < 0 ? (isAr ? -30 : 30) : (isAr ? 30 : -30);
              opacity = 0;
              zIndex = 10;
            }

            return (
              <motion.div
                key={item.id}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  zIndex: zIndex
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute w-[280px] sm:w-[360px] md:w-[400px] h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer bg-[#0A0A0E] text-white ${
                  isCenter ? 'ring-2 ring-white/30 cursor-grab active:cursor-grabbing' : 'pointer-events-auto'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold uppercase tracking-wider text-white">
                    {item.badge}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white">
                    {item.id}
                  </span>
                </div>

                {/* Card Bottom Gradient Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end space-y-3 z-10">
                  <span className="text-[10px] font-mono text-amber-200/90 uppercase tracking-widest font-semibold block">
                    {item.tag}
                  </span>

                  <h3 className="font-display text-xl sm:text-2xl font-normal text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Action Link (Active on Center Card) */}
                  {isCenter && (
                    <div className="pt-2">
                      <a
                        href={item.link}
                        className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:bg-zinc-200"
                      >
                        <span>{isAr ? 'معاينة النموذج الحي' : 'Explore Live Demo'}</span>
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CONTROLS & PAGINATION DOTS (matching zuu-ano.vercel.app layout) */}
        <div className="flex justify-center items-center gap-6 pt-4">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={isAr ? handleNext : handlePrev}
            aria-label="Previous Slide"
            className="w-11 h-11 rounded-full bg-[#0F0F12] text-white hover:bg-black border border-black/10 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/10">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all ${
                  idx === activeIndex
                    ? 'w-6 h-2 rounded-full bg-[#0F0F12]'
                    : 'w-2 h-2 rounded-full bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={isAr ? handlePrev : handleNext}
            aria-label="Next Slide"
            className="w-11 h-11 rounded-full bg-[#0F0F12] text-white hover:bg-black border border-black/10 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
