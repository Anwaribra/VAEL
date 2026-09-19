import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ExperiencesSection() {
  const { isAr } = useLanguage();
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const experiencesData = isAr ? [
    {
      id: '01',
      category: 'دعوات زفاف وخطوبة',
      title: 'دعوة زفاف إلكترونية ملكية',
      subtitle: 'موقع دعوة فرح شيك ومودرن يحتوي على فتح الختم السائل، تأكيد حضور الضيوف (RSVP)، خرائط غوغل مابز للقاعة، وقائمة الهدايا (Wishlist).',
      tag: 'دعوات الزفاف',
      year: '2026'
    },
    {
      id: '02',
      category: 'سايت هدية عيد ميلاد',
      title: 'موقع الهدية المغلقة بكلمة سر',
      subtitle: 'هدية رقمية فريدة تفتح برمز سر خاص بينكما، تحتوي على ألبوم الصور التفاعلي، مذكرات صوتية عالية الجودة، وعد تنازلي.',
      tag: 'هدايا تذكارية',
      year: '2026'
    },
    {
      id: '03',
      category: 'قائمة الهدايا الإلكترونية',
      title: 'سجل هدايا المناسبات والزفاف',
      subtitle: 'بديل مودرن للقوائم التقليدية، يتيح للمدعوين اختيار الهدية المناسبة وإرسال المباركات المالية أو العينية بضغطة زر.',
      tag: 'قائمة الهدايا',
      year: '2026'
    },
    {
      id: '04',
      category: 'سجل ذكريات الخطوبة والزواج',
      title: 'التايم لاين الزمني للزوجين',
      subtitle: 'موقع زمني تفاعلي يوثق رحلة وتاريخ أجمل الأيام بين الزوجين بطريقة بصريّة راقية ومستمرة للأبد.',
      tag: 'ذكريات رومانسية',
      year: '2026'
    },
    {
      id: '05',
      category: 'مفاجأة طلب زواج أو خطوبة',
      title: 'موقع الكشف عن المفاجأة',
      subtitle: 'رابط مشفر خاص يُرسل في لحظة معينة ليفتح بشكل سينمائي ويكشف عن المفاجأة أو الرسالة المنتظرة.',
      tag: 'مفاجآت خاصة',
      year: '2026'
    },
    {
      id: '06',
      category: 'تصميم خاص بالكامل (VIP)',
      title: 'موقع مخصص من الصفر',
      subtitle: 'تصميم غير محدود تماماً ينفذ بناءً على أفكارك ومناسبتك الخاصة مع دومين مخصص باسم العميل.',
      tag: 'تخصيص كامل',
      year: '2026'
    }
  ] : [
    {
      id: '01',
      category: 'Wedding & Engagement',
      title: 'Ceremonial Wedding Invitation Portal',
      subtitle: 'A modern digital wedding invitation featuring melting silver wax seal, guest RSVP concierge, Google Maps location, and gift wishlist.',
      tag: 'Wedding Portal',
      year: '2026'
    },
    {
      id: '02',
      category: 'Birthday & Gift Site',
      title: 'Password-Protected Gift Capsule',
      subtitle: 'An intimate birthday gift site unlocked with a secret passphrase, featuring interactive photo galleries, high-fidelity audio notes, and countdowns.',
      tag: 'Gift Vault',
      year: '2026'
    },
    {
      id: '03',
      category: 'Digital Gift Registry',
      title: 'Interactive Wishlist & Gift Registry',
      subtitle: 'A modern alternative to registry lists, allowing guests to inspect gifts, contribute monetary blessings, and leave personal notes.',
      tag: 'Gift Registry',
      year: '2026'
    },
    {
      id: '04',
      category: 'Anniversary Chronicle',
      title: 'Couples Memory Timeline',
      subtitle: 'An interactive digital timeline tracing your shared milestones with refractive glass containers and soundscapes.',
      tag: 'Romantic Memory',
      year: '2026'
    },
    {
      id: '05',
      category: 'Surprise Proposal',
      title: 'Encrypted Reveal Portal',
      subtitle: 'A mysterious encrypted link designed to reveal a proposal or surprise message in a cinematic environment.',
      tag: 'Surprise Reveal',
      year: '2026'
    },
    {
      id: '06',
      category: 'Full Custom VIP',
      title: 'Bespoke Unconstrained Canvas',
      subtitle: 'A completely custom digital website crafted from scratch around your specific vision, custom domain, and score.',
      tag: 'Custom VIP',
      year: '2026'
    }
  ];

  const activeExp = experiencesData[activeIdx] || experiencesData[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={containerRef} className="px-4 sm:px-6 md:px-12 py-16 bg-transparent">
      
      {/* SECTION 03 — FLOATING SCROLL-EXPANDING ROUNDED CARD */}
      <motion.section
        id="experiences"
        style={{ scale: cardScale, opacity: cardOpacity }}
        className="relative rounded-[2.5rem] md:rounded-[3rem] bg-[#0A0A0E] text-white border border-black/10 p-8 sm:p-12 md:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden"
      >
        {/* Card Edge Glow */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none border border-white/10"></div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-mono text-white uppercase tracking-widest mb-4">
                {isAr ? '03 — أنواع المواقع والخدمات' : '03 — Types of Websites We Design'}
              </div>
              <h2 className="font-display text-5xl sm:text-7xl font-light text-white tracking-tight">
                {isAr ? (
                  <>أنواع المواقع <span className="font-serif italic text-zinc-400">التي نصممها.</span></>
                ) : (
                  <>Digital Mediums <span className="font-serif italic text-zinc-400">Designed for Every Occasion.</span></>
                )}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-zinc-300 max-w-lg font-light leading-relaxed">
              {isAr
                ? 'استكشف النماذج المختلفة من مواقـع الهدايا ودعوات الزفاف الإلكترونية. مرّر فوق أي نوع لمعاينته.'
                : 'Explore our archetypes of digital gift websites and ceremonial portals. Hover over any category to preview.'}
            </p>
          </div>

          {/* Editorial Interactive Chapter Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Category List */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {experiencesData.map((exp, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={exp.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`group relative py-6 px-7 rounded-2xl cursor-pointer transition-all duration-300 ${
                      isActive ? 'bg-white/10 border border-white/30 shadow-xl' : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className={`text-sm font-mono transition-colors duration-300 ${
                          isActive ? 'text-white font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}>
                          {exp.id}
                        </span>
                        <h3 className={`font-display text-2xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-300 ${
                          isActive ? 'text-white font-semibold translate-x-2' : 'text-zinc-400 font-light group-hover:text-zinc-300'
                        }`}>
                          {exp.category}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`hidden sm:block text-xs uppercase tracking-widest font-mono transition-opacity duration-300 ${
                          isActive ? 'opacity-100 text-zinc-300 font-semibold' : 'opacity-0'
                        }`}>
                          {exp.tag}
                        </span>
                        <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${
                          isActive ? 'text-white translate-x-1' : 'text-zinc-700 opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Lens Preview Container */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32 w-full aspect-[4/5] rounded-[2.5rem] bg-black/60 p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden border border-white/15 backdrop-blur-xl">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExp.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    {/* Top Metadata */}
                    <div className="flex justify-between items-start">
                      <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono tracking-widest font-bold uppercase shadow">
                        {activeExp.tag}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 uppercase">
                        Ref / {activeExp.id}
                      </span>
                    </div>

                    {/* Metallic Ring Graphic */}
                    <div className="my-auto py-8 flex flex-col items-center justify-center relative">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-white/10 via-white to-white/20 p-[2px] shadow-2xl animate-pulse">
                        <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                          <span className="font-display text-5xl text-white font-bold">{activeExp.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Text Content */}
                    <div>
                      <h4 className="font-display text-2xl md:text-3xl text-white font-semibold mb-2">
                        {activeExp.title}
                      </h4>
                      <p className="text-sm text-zinc-300 font-light leading-relaxed">
                        {activeExp.subtitle}
                      </p>
                      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-400">
                        <span>VAEL Studio Edition</span>
                        <span>{activeExp.year}</span>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </motion.section>

    </div>
  );
}
