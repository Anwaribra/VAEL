import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function HowItWorksSection() {
  const { isAr } = useLanguage();

  const steps = isAr ? [
    {
      step: '01',
      title: 'اختر الباقة والمناسبة',
      tagline: 'حدد الباقة المناسبة لمناسبتك',
      desc: 'اختر الباقة التي تناسبك (سايت هدية، دعوة زفاف، أو تخصيص كامل VIP) واضغط على طلب عبر واتساب.'
    },
    {
      step: '02',
      title: 'أرسل البيانات والصور',
      tagline: 'أرسل التفاصيل واللمسات الخاصة',
      desc: 'شارِك معنا الصور، الأسماء، الأغنية المفضلة، والرسائل الصوتية أو النصية التي تريد تضمينها.'
    },
    {
      step: '03',
      title: 'استلم موقعك فوراً',
      tagline: 'موقعك جاهز في 24-48 ساعة',
      desc: 'تستلم رابطك الخاص على إنترنت محمي بكلمة سر جاهز للمشاركة وإبهار الشخص العزيز عليك.'
    }
  ] : [
    {
      step: '01',
      title: 'Choose Package & Occasion',
      tagline: 'Select your suited tier',
      desc: 'Select from our 3 tiers (Digital Gift Capsule, Wedding Portal, or Bespoke VIP) and click Order via WhatsApp.'
    },
    {
      step: '02',
      title: 'Send Photos & Details',
      tagline: 'Share your intimate touches',
      desc: 'Send us your photos, names, favorite music track, and personal voice memos or custom messages.'
    },
    {
      step: '03',
      title: 'Receive Your Live Website',
      tagline: 'Ready in 24–48 hours',
      desc: 'Receive your private domain link, passphrase-protected and ready to share to impress your loved one.'
    }
  ];

  return (
    <section id="process" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-widest block mb-3 font-semibold">
              {isAr ? '06 — كيف تطلب موقعك في 3 خطوات بسيطة؟' : '06 — How to Order in 3 Simple Steps'}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#0F0F12] tracking-tight">
              {isAr ? (
                <>اختر. أرسل. <span className="font-serif italic text-[#52525B]">أهدِ.</span></>
              ) : (
                <>Select. Send. <span className="font-serif italic text-[#52525B]">Surprise.</span></>
              )}
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#52525B] max-w-md font-light leading-relaxed">
            {isAr
              ? 'خطوات عمل سلسة وسريعة تضمن لك استلام موقع ذو جودة عالية وفخامة لا تضاهى.'
              : 'A seamless 3-stage process ensuring fast 24-48h delivery of your high-fashion digital website.'}
          </p>
        </div>

        {/* 3-Step Visual Sequence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative z-10 p-8 rounded-[2rem] bg-white/80 border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-black/25 hover:shadow-xl transition-all space-y-6 backdrop-blur-xl"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-white font-bold bg-[#0F0F12] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Stage {item.step}
                </span>
                <span className="text-2xl font-display font-bold text-black/20">0{idx + 1}</span>
              </div>

              <h3 className="font-display text-2xl text-[#0F0F12] font-semibold">
                {item.title}
              </h3>
              
              <p className="text-xs font-mono uppercase tracking-widest text-[#71717A] font-medium">
                {item.tagline}
              </p>

              <p className="text-sm text-[#52525B] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

