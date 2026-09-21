import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight, Lock, X, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { INVITATION_TEMPLATES } from '../data/invitationTemplates';
import InvitationCard from './InvitationCard';
import InvitationScene from './InvitationScene';

export default function InvitationsSection() {
  const { isAr } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [premiumModalTemplate, setPremiumModalTemplate] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTemplates = INVITATION_TEMPLATES.filter((t) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'free') return t.access === 'free';
    if (filterCategory === 'premium') return t.access === 'premium';
    return t.category === filterCategory;
  });

  const templatesList = filteredTemplates.length > 0 ? filteredTemplates : INVITATION_TEMPLATES;
  const currentTemplate = templatesList[activeIndex] || templatesList[0];

  // Reset activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filterCategory]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % templatesList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + templatesList.length) % templatesList.length);
  };

  const handlePointerDown = (e) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handlePointerUp = (e) => {
    if (dragStartX === null) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStartX;
    if (diff > 40) {
      if (isAr) handleNext(); else handlePrev();
    } else if (diff < -40) {
      if (isAr) handlePrev(); else handleNext();
    }
    setDragStartX(null);
  };

  // Keyboard arrow listener for gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (isAr) handleNext(); else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isAr) handlePrev(); else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAr, activeIndex, templatesList.length]);

  const handleSelectTemplate = (tmpl) => {
    if (tmpl.access === 'free') {
      window.location.href = `/create?template=${tmpl.id}`;
    } else {
      setPremiumModalTemplate(tmpl);
    }
  };

  return (
    <section
      id="collection"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 bg-[#F5F5F7] text-[#0F0F12] border-b border-black/10 overflow-hidden"
    >
      {/* Anchor duplicate for backwards compatibility */}
      <div id="invitations-section" className="absolute top-0 left-0" />

      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-mono uppercase tracking-widest text-[#52525B]">
            {isAr ? 'معرض المجموعات' : 'Atelier Collection'}
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#0F0F12] leading-[1.08]">
            {isAr ? 'المجموعة الفنية' : 'The atelier collection'}
          </h2>

          <p className="text-zinc-600 font-light text-base sm:text-xl leading-relaxed">
            {isAr
              ? 'كل تصميم مُصمم كتحفة فنية مستقلة على خلفية ملموسة من الطبيعة.'
              : 'Each design is crafted as bespoke stationery resting on a physical material surface.'}
          </p>
        </div>

        {/* Filter Pills Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[
            { id: 'all', labelEn: 'All Designs', labelAr: 'كل التصاميم' },
            { id: 'free', labelEn: 'Free Collection', labelAr: 'المجموعة المجانية' },
            { id: 'premium', labelEn: 'Premium Atelier', labelAr: 'المجموعة الملكية ✦' },
            { id: 'wedding', labelEn: 'Wedding', labelAr: 'زفاف' },
            { id: 'engagement', labelEn: 'Engagement', labelAr: 'خطوبة' }
          ].map((cat) => {
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0F0F12] text-white shadow-md'
                    : 'bg-black/5 text-zinc-600 hover:bg-black/10 hover:text-black'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* COVERFLOW GALLERY CONTAINER */}
        <div
          aria-roledescription="carousel"
          aria-label={isAr ? 'معرض التصاميم' : 'Template Collection Gallery'}
          className="relative w-full py-4 flex flex-col items-center justify-center touch-pan-y"
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          {/* Gallery Cards Stage */}
          <div className="relative w-full max-w-6xl h-[580px] sm:h-[640px] flex items-center justify-center perspective-[1400px] overflow-visible">
            {templatesList.map((tmpl, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              let transformStyle = '';
              let zIndex = 20 - Math.abs(offset);
              let opacity = 0;
              let pointerEvents = 'none';

              if (offset === 0) {
                transformStyle = 'rotateY(0deg) scale(1) translateZ(0px)';
                opacity = 1;
                pointerEvents = 'auto';
              } else if (offset === -1 || (activeIndex === 0 && index === templatesList.length - 1 && templatesList.length > 2)) {
                transformStyle = isAr
                  ? 'rotateY(-10deg) scale(0.86) translateX(280px) translateZ(-90px)'
                  : 'rotateY(10deg) scale(0.86) translateX(-280px) translateZ(-90px)';
                opacity = 0.55;
                pointerEvents = 'auto';
              } else if (offset === 1 || (activeIndex === templatesList.length - 1 && index === 0 && templatesList.length > 2)) {
                transformStyle = isAr
                  ? 'rotateY(10deg) scale(0.86) translateX(-280px) translateZ(-90px)'
                  : 'rotateY(-10deg) scale(0.86) translateX(280px) translateZ(-90px)';
                opacity = 0.55;
                pointerEvents = 'auto';
              } else if (offset === -2) {
                transformStyle = isAr
                  ? 'rotateY(-14deg) scale(0.72) translateX(500px) translateZ(-180px)'
                  : 'rotateY(14deg) scale(0.72) translateX(-500px) translateZ(-180px)';
                opacity = 0.2;
              } else if (offset === 2) {
                transformStyle = isAr
                  ? 'rotateY(14deg) scale(0.72) translateX(-500px) translateZ(-180px)'
                  : 'rotateY(-14deg) scale(0.72) translateX(500px) translateZ(-180px)';
                opacity = 0.2;
              } else {
                opacity = 0;
              }

              return (
                <div
                  key={tmpl.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[310px] sm:w-[380px] md:w-[440px] h-[520px] sm:h-[580px] rounded-3xl cursor-pointer transition-all duration-700 ease-out border overflow-hidden shadow-2xl ${
                    isActive
                      ? 'border-white/60 ring-1 ring-black/20 shadow-[0_30px_90px_rgba(0,0,0,0.32)]'
                      : 'border-white/20 filter brightness-90 hover:brightness-100'
                  }`}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                    pointerEvents
                  }}
                >
                  {/* REAL PHYSICAL BACKGROUND SCENE + LIVE INVITATION PREVIEW CARD */}
                  <InvitationScene
                    background={tmpl.background}
                    className="w-full h-full rounded-3xl"
                    sceneStyle={{ minHeight: '100%', height: '100%' }}
                    previewClassName="w-full max-w-[380px]"
                  >
                    <InvitationCard
                      config={{
                        design: tmpl.theme,
                        templateId: tmpl.id,
                        occasion: tmpl.category === 'engagement' ? 'Engagement' : 'Wedding',
                        name1: isAr ? 'كريم' : 'Karim',
                        name2: isAr ? 'نور' : 'Nour',
                        date: '2026-11-14',
                        time: '19:00',
                        venueName: isAr ? 'حديقة النخيل' : 'Al Nakheel Garden',
                        city: isAr ? 'القاهرة الجديدة' : 'New Cairo',
                        language: isAr ? 'ar' : 'en'
                      }}
                      compact={true}
                    />
                  </InvitationScene>

                  {/* Top Floating Template Info Badge */}
                  <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                      <Layers className="w-3 h-3" />
                      <span>{isAr ? tmpl.name.ar : tmpl.name.en}</span>
                    </span>

                    {tmpl.access === 'premium' ? (
                      <span className="bg-amber-500/80 backdrop-blur-md text-black font-semibold text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-amber-300 shadow-md flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Premium</span>
                      </span>
                    ) : (
                      <span className="bg-white/80 backdrop-blur-md text-black font-medium text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">
                        Free
                      </span>
                    )}
                  </div>

                  {/* Bottom Hover/Active CTA Overlay Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white shadow-xl">
                    <div className="space-y-0.5">
                      <div className="text-xs font-serif font-medium">
                        {isAr ? tmpl.name.ar : tmpl.name.en}
                      </div>
                      <div className="text-[10px] text-zinc-300 font-mono opacity-80">
                        {tmpl.layout} layout
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(tmpl);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 shadow-lg flex items-center gap-1.5 ${
                        tmpl.access === 'premium'
                          ? 'bg-amber-400 text-black hover:bg-amber-300'
                          : 'bg-white text-black hover:bg-zinc-100'
                      }`}
                    >
                      <span>
                        {tmpl.access === 'premium'
                          ? isAr ? 'عرض التصميم' : 'View design'
                          : isAr ? 'استخدم التصميم' : 'Use design'}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GALLERY NAVIGATION CONTROLS */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isAr ? 'التصميم السابق' : 'Previous Template'}
              className="w-12 h-12 rounded-full bg-[#0F0F12] text-white flex items-center justify-center shadow-xl hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots Slider Bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/10 backdrop-blur-md">
              {templatesList.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to template ${t.name.en}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-7 h-2.5 rounded-full bg-[#0F0F12]'
                      : 'w-2.5 h-2.5 rounded-full bg-black/30 hover:bg-black/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label={isAr ? 'التصميم التالي' : 'Next Template'}
              className="w-12 h-12 rounded-full bg-[#0F0F12] text-white flex items-center justify-center shadow-xl hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Active Template Quick Action CTA Bar */}
          <div className="pt-6 text-center space-y-2">
            <button
              type="button"
              onClick={() => handleSelectTemplate(currentTemplate)}
              className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-[#0F0F12] text-white font-medium text-sm sm:text-base shadow-2xl hover:bg-black transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>
                {currentTemplate.access === 'premium'
                  ? isAr ? `عرض تصميم ${currentTemplate.name.ar}` : `View ${currentTemplate.name.en}`
                  : isAr ? `اصنع تصميم ${currentTemplate.name.ar}` : `Use ${currentTemplate.name.en}`}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* TASTEFUL PREMIUM TEMPLATE PREVIEW MODAL */}
      <AnimatePresence>
        {premiumModalTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPremiumModalTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl bg-[#111116] border border-white/20 text-white p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPremiumModalTemplate(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 inline-block">
                  Premium collection
                </span>
                <h3 className="font-serif text-3xl font-light">
                  {isAr ? premiumModalTemplate.name.ar : premiumModalTemplate.name.en}
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {isAr ? premiumModalTemplate.description.ar : premiumModalTemplate.description.en}
                </p>
              </div>

              {/* Live Preview Canvas with Real Texture */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/15 my-2 shadow-2xl">
                <InvitationScene background={premiumModalTemplate.background} className="w-full h-full">
                  <InvitationCard
                    config={{
                      design: premiumModalTemplate.theme,
                      templateId: premiumModalTemplate.id,
                      occasion: 'Wedding',
                      name1: 'Karim',
                      name2: 'Nour',
                      date: '2026-11-14',
                      time: '19:00',
                      venueName: 'Al Nakheel Garden',
                      city: 'New Cairo',
                      language: isAr ? 'ar' : 'en'
                    }}
                    compact={true}
                  />
                </InvitationScene>
              </div>

              {/* Special Features */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {isAr ? 'مميزات هذا التصميم الملكي:' : 'Design Craftsmanship:'}
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isAr ? 'خلفيات طبيعية حقيقية مخصصة ومطابقة لأجواء المناسبة' : 'Real art-directed physical background texture'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isAr ? 'تأثيرات بصرية مخصصة ومطابقة لطلبكم' : 'Bespoke editorial composition & custom seal mark'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isAr ? 'إمكانية إضافة أغنية وصور عالية الجودة' : 'High-definition audio score & couple photo gallery'}</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`/create?template=${premiumModalTemplate.id}`}
                  className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs text-center shadow-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{isAr ? 'استخدم هذا التصميم المخصص' : 'Use this design'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setPremiumModalTemplate(null)}
                  className="w-full py-3 rounded-full border border-white/15 text-zinc-300 hover:text-white text-xs font-medium text-center transition-colors cursor-pointer"
                >
                  {isAr ? 'العودة للمجموعة' : 'Back to collection'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
