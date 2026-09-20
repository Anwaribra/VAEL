import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function ProcessSection() {
  const { isAr } = useLanguage();

  const steps = [
    {
      id: '01',
      title: isAr ? '01 — شاركونا اللحظة' : '01 — Tell us the moment',
      description: isAr
        ? 'شاركونا التاريخ، المكان، الأجواء، وما ترغبون أن يشعر به ضيوفكم.'
        : 'Share the date, place, mood, and what you want your guests to feel.',
    },
    {
      id: '02',
      title: isAr ? '02 — نشكّل التجربة' : '02 — Shape the experience',
      description: isAr
        ? 'نقوم بصياغة الخطوط، الحركة، الصوت، الصور، والتفاصيل حول قصتكم.'
        : 'We refine the type, movement, sound, images, and details around your story.',
    },
    {
      id: '03',
      title: isAr ? '03 — استلموا الرابط الخاص' : '03 — Receive the private link',
      description: isAr
        ? 'تصلكم الدعوة كرابط رقمي متجاوب وجاهز للمشاركة.'
        : 'Your invitation is delivered as a responsive, shareable digital experience.',
    },
  ];

  return (
    <section id="process" className="relative w-full py-32 md:py-44 px-6 sm:px-12 md:px-16 bg-[#080808] text-[#F1EEE7] border-b border-white/[0.07] select-none">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] pb-6 text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3] mb-12">
          <span className="text-[#F1EEE7]">04</span>
          <span className="w-8 h-px bg-white/20" />
          <span>{isAr ? 'خطوات العمل' : 'PROCESS'}</span>
        </div>

        {/* Section Title Block */}
        <div className="max-w-3xl space-y-4 mb-16 md:mb-20">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F1EEE7] tracking-tight leading-[1.1]">
            {isAr ? 'كيف تتحول اللحظة إلى صفحة.' : 'How a moment becomes a page.'}
          </h2>
        </div>

        {/* 3-Step Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 border-t border-white/[0.07] pt-12 md:pt-16">
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
                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F1EEE7] tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-[#8E8E89] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6">
                <div className="w-10 h-px bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
