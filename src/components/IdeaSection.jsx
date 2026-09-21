import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function IdeaSection() {
  const { isAr } = useLanguage();

  const materials = isAr ? [
    {
      num: '01',
      title: 'الورق والختم الشمعي',
      desc: 'قوام عاجي دافئ مع ختم شمعي ملكي يمنح دعواتكم هيبة اللحظات الخاصة.'
    },
    {
      num: '02',
      title: 'الطباعة والنصوص الشريفة',
      desc: 'خطوط عربية ولاتينية محددة بعناية تحريرية لتعبر عن هوية المناسبة بأسلوب خالص.'
    },
    {
      num: '03',
      title: 'الموقع والخريطة التفاعلية',
      desc: 'توجيه دقيق ومباشر لضيوفكم إلى موقع القاعة مع تأكيد الحضور بنقرة واحدة.'
    }
  ] : [
    {
      num: '01',
      title: 'Paper & Wax Seal',
      desc: 'Tactile ivory canvas anchored with a melting ceremonial seal.'
    },
    {
      num: '02',
      title: 'Editorial Typography',
      desc: 'High-contrast serif type setting a quiet, enduring tone for the evening.'
    },
    {
      num: '03',
      title: 'Location & Attendance',
      desc: 'Direct map integration and guest confirmation without friction.'
    }
  ];

  return (
    <section id="craftsmanship" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#77736b]">
            {isAr ? 'الصنعة والتفاصيل' : 'Craftsmanship & Materials'}
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#171719] leading-[1.15] tracking-tight"
          >
            {isAr ? (
              <>
                ورق، ضوء، خطوط.. <br />
                <span className="font-serif italic text-[#77736b]">وتفاصيل تستحق التذكر.</span>
              </>
            ) : (
              <>
                Paper, light, type... <br />
                <span className="font-serif italic text-[#77736b]">and a few details worth remembering.</span>
              </>
            )}
          </motion.h2>

          <p className="text-[#77736b] font-light text-base sm:text-lg leading-relaxed">
            {isAr
              ? 'مصممة لاحتفال واحد، قصة واحدة، وسهرة واحدة.'
              : 'Designed for one celebration, one story, one evening.'}
          </p>
        </div>

        {/* 3 Material Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {materials.map((mat, idx) => (
            <motion.div
              key={mat.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-[#f1eee7]/60 border border-[#171719]/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#a88955] tracking-widest block">
                  {mat.num}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#171719]">
                  {mat.title}
                </h3>
                <p className="text-sm text-[#77736b] font-light leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
