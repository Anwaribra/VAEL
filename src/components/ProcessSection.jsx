import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function ProcessSection() {
  const { isAr } = useLanguage();

  const steps = [
    {
      id: '01',
      stepTag: 'STEP 01',
      title: isAr ? 'شاركونا اللحظة' : 'Tell us the moment',
      description: isAr
        ? 'شاركونا التاريخ، المكان، الأجواء، وما ترغبون أن يشعر به ضيوفكم.'
        : 'Share the date, place, mood, and what you want your guests to feel.',
    },
    {
      id: '02',
      stepTag: 'STEP 02',
      title: isAr ? 'نشكّل التجربة' : 'Shape the experience',
      description: isAr
        ? 'نقوم بصياغة الخطوط، الحركة، الصوت، الصور، والتفاصيل حول قصتكم.'
        : 'We refine the type, movement, sound, images, and details around your story.',
    },
    {
      id: '03',
      stepTag: 'STEP 03',
      title: isAr ? 'استلموا الرابط الخاص' : 'Receive the private link',
      description: isAr
        ? 'تصلكم الدعوة كرابط رقمي متجاوب وجاهز للمشاركة.'
        : 'Your invitation is delivered as a responsive, shareable digital experience.',
    },
  ];

  return (
    <section id="process" className="relative w-full py-32 md:py-44 px-6 sm:px-12 md:px-16 bg-[#080808] text-[#F1EEE7] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 space-y-16">
        
        {/* Distinct Section Anatomy 04: Timeline Progress Node Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.07] pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-sans font-light uppercase tracking-[0.25em] text-[#A8A8A3]">
              <span className="w-2 h-2 rounded-full bg-white/60" />
              <span>{isAr ? 'منهجية العمل' : 'STUDIO PROCESS'}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#F1EEE7] tracking-tight leading-[1.08]">
              {isAr ? 'كيف تتحول اللحظة إلى صفحة.' : 'How a moment becomes a page.'}
            </h2>
          </div>

          <p className="text-xs font-sans font-light text-[#8E8E89] tracking-[0.2em] uppercase max-w-sm">
            {isAr ? 'ثلاث خطوات مدروسة من الفكرة وحتى التسليم.' : 'Three considered steps from initial brief to final reveal.'}
          </p>
        </div>

        {/* 3-Step Timeline Track */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 pt-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`pt-6 md:pt-0 md:pr-12 ${
                idx > 0 ? 'border-t md:border-t-0 border-white/[0.07] pt-10 md:pt-0' : ''
              } ${
                idx < steps.length - 1 ? 'md:border-r border-white/[0.07]' : ''
              } space-y-6 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-sans font-light tracking-[0.25em] text-[#A8A8A3] uppercase bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full inline-block">
                  {step.stepTag}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F1EEE7] tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-[#8E8E89] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6">
                <div className="w-12 h-px bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
