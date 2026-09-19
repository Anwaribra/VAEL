import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function IdeaSection() {
  const { isAr } = useLanguage();

  return (
    <section id="idea" className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl pointer-events-none opacity-60"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/5 border border-black/10 text-xs sm:text-sm font-mono text-[#52525B] uppercase tracking-widest font-semibold shadow-sm">
            {isAr ? '02 — لماذا موقع خاص كهدية؟' : '02 — Why Choose a Custom Gift Website?'}
          </div>
        </div>

        {/* Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-center text-[#0F0F12] leading-[1.15] tracking-tight max-w-5xl mx-auto"
        >
          {isAr ? (
            <>
              بعض المناسبات واللحظات <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-[#52525B]">تستحق أكثر من مجرد رسالة عادية.</span>
            </>
          ) : (
            <>
              Some milestone occasions deserve <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-[#52525B]">more than a standard text message.</span>
            </>
          )}
        </motion.h2>

        {/* Description Paragraph */}
        <div className="mt-10 max-w-4xl mx-auto text-center space-y-4 text-[#52525B] font-light leading-relaxed text-xl sm:text-2xl md:text-3xl">
          <p>
            {isAr
              ? 'في عصر الرسائل السريعة، الهدايا الرقمية المخصصة تصنع أثراً لا يُنسى. نحول مناسباتك الغالية — من أعياد الميلاد ودعوات الزفاف إلى الذكريات الرومانسية — إلى مواقع إلكترونية تفاعلية راقية تعبر عن اهتمامك الحقيقي.'
              : 'In an era of instant text notifications, custom digital gift websites leave a lasting emotional impression. We transform your most cherished milestones — from birthdays and romantic anniversaries to formal wedding portals — into interactive websites.'}
          </p>
        </div>

        {/* Clean Editorial Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-9 sm:p-12 rounded-[2.5rem] bg-white/80 border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] space-y-6 hover:border-black/25 hover:shadow-xl transition-all backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#0F0F12] text-white flex items-center justify-center shadow-md font-mono font-bold text-lg">
              01
            </div>
            <h3 className="font-display text-3xl text-[#0F0F12] font-semibold">
              {isAr ? 'هدية شخصية فريدة' : 'Uniquely Personal'}
            </h3>
            <p className="text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              {isAr
                ? 'مصممة خصيصاً بالأسماء، الصور، الأغاني المفضلة والرسائل الصوتية التي تحمل طابعكم الخاص.'
                : 'Tailored specifically with intimate photos, secret voice memos, custom music playlists, and personal memories.'}
            </p>
          </div>

          <div className="p-9 sm:p-12 rounded-[2.5rem] bg-white/80 border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] space-y-6 hover:border-black/25 hover:shadow-xl transition-all backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-black/5 text-[#0F0F12] flex items-center justify-center border border-black/10 font-mono font-bold text-lg">
              02
            </div>
            <h3 className="font-display text-3xl text-[#0F0F12] font-semibold">
              {isAr ? 'تصميم فاخر وتفاعلي' : 'Luxury & Interactive'}
            </h3>
            <p className="text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              {isAr
                ? 'مؤثرات بصريّة راقية، مظاريف تفتح مثل الشمع الملكي، وحماية بكلمة سر خاصة للمستلم.'
                : 'Refractive liquid glass surfaces, melting ceremonial wax seals, and passphrase-protected gift vaults.'}
            </p>
          </div>

          <div className="p-9 sm:p-12 rounded-[2.5rem] bg-white/80 border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] space-y-6 hover:border-black/25 hover:shadow-xl transition-all backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-black/5 text-[#0F0F12] flex items-center justify-center border border-black/10 font-mono font-bold text-lg">
              03
            </div>
            <h3 className="font-display text-3xl text-[#0F0F12] font-semibold">
              {isAr ? 'تبقى أونلاين للأبد' : 'Permanent Online Memory'}
            </h3>
            <p className="text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
              {isAr
                ? 'رابط خاص ودائم على إنترنت، يمكنك أنت والمستلم تصفحه وتذكر الذكريات الجميلة في أي وقت.'
                : 'Hosted permanently on a private domain link that you and your loved one can revisit anytime from any device.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

