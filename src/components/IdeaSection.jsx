import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock, Music, Search, Key, Share2, MousePointer, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function IdeaSection() {
  const { isAr } = useLanguage();

  return (
    <section id="idea" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden select-none">
      
      {/* Background Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl pointer-events-none opacity-60"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 border border-black/10 text-xs sm:text-sm font-mono text-[#52525B] uppercase tracking-widest font-semibold shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#0F0F12]" />
            <span>{isAr ? '02 — ليه تعمل سايت خاص كهدية؟' : '02 — Why Choose a Custom Gift Website?'}</span>
          </div>
        </div>

        {/* Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-center text-[#0F0F12] leading-[1.12] tracking-tight max-w-5xl mx-auto"
        >
          {isAr ? (
            <>
              فيه مناسَبات ولحظات غالية.. <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-[#52525B]">تستاهل أكتر بكثير من مجرد مسج عادية.</span>
            </>
          ) : (
            <>
              Some milestone occasions deserve <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-[#52525B]">more than a standard text message.</span>
            </>
          )}
        </motion.h2>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto text-center text-[#52525B] font-light leading-relaxed text-lg sm:text-xl md:text-2xl"
        >
          {isAr
            ? 'بنحوّل أحلى أوقاتك — أعياد الميلاد، الذكريات الحلوة، ودعوات الفرح — لسايت رقمي تفاعلي متصمّم ليك مخصوص عشان يفضل معاك طول العمر.'
            : 'We transform your most cherished milestones into interactive digital gift websites crafted with high-end luxury aesthetics.'}
        </motion.p>

        {/* 3-Column Luxury Gradient Cards Grid (Inspired by core-features-gradient-cards) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1 — Uniquely Personal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2rem] h-[420px] p-8 flex flex-col justify-between overflow-hidden border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-500"
            style={{
              background: 'radial-gradient(circle at 50% -10%, #FDE68A 0%, #FCA5A5 30%, #F8FAFC 75%)'
            }}
          >
            {/* Visual Decorative Top Composition */}
            <div className="relative w-full h-48 flex items-center justify-center">
              
              {/* Glassmorphic Audio & Photo Card Mockup */}
              <div className="relative z-10 w-full max-w-[240px] bg-white/80 backdrop-blur-xl border border-white/60 p-4 rounded-2xl shadow-xl space-y-3 group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
                      <Music className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#0F0F12]">Voice Memo 01</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                </div>

                {/* Sound Wave Graphic */}
                <div className="flex items-center justify-center gap-1 h-7 px-2 bg-slate-50 rounded-lg">
                  {[40, 75, 50, 90, 60, 100, 45, 80, 65, 95, 30, 70, 85].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.08 }}
                      className="w-1 bg-amber-500 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Floating Secret Passcode Pill */}
              <div className="absolute top-3 right-2 z-20 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200 text-[11px] font-mono font-bold text-amber-900 shadow-md flex items-center gap-1.5 animate-bounce">
                <Key className="w-3 h-3 text-amber-600" />
                <span>Passcode 2026</span>
              </div>

              {/* Cursor Icon */}
              <MousePointer className="absolute bottom-4 left-6 z-20 w-6 h-6 text-slate-800 drop-shadow-md group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />

            </div>

            {/* Bottom Card Title & Subtitle */}
            <div className="relative z-10 space-y-2 pt-4 border-t border-black/5">
              <h3 className="font-display text-2xl sm:text-3xl text-[#0F0F12] font-semibold tracking-tight">
                {isAr ? 'هدية متفصلة لِيك' : 'Uniquely Personal'}
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] font-light leading-relaxed">
                {isAr
                  ? 'بتجمع ريكوردات الصوت، صوركم الغالية، أغانيكم المفضلة، وعداد تنازلي للمناسبة.'
                  : 'Tailored with intimate photos, secret voice memos, custom playlists, and countdowns.'}
              </p>
            </div>
          </motion.div>

          {/* CARD 2 — Wax Seal & Unboxing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2rem] h-[420px] p-8 flex flex-col justify-between overflow-hidden border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-500"
            style={{
              background: 'radial-gradient(circle at 50% -10%, #E2E8F0 0%, #CBD5E1 30%, #F8FAFC 75%)'
            }}
          >
            {/* Visual Decorative Top Composition */}
            <div className="relative w-full h-48 flex flex-col items-center justify-center">
              
              {/* Mesh Dot Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* 3D Wax Seal Stamp Emblem */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-200 p-[3px] shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-[#18181B] flex flex-col items-center justify-center text-amber-200 shadow-inner">
                  <Gift className="w-8 h-8 text-amber-300 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-amber-100 mt-1">VAEL</span>
                </div>
              </div>

              {/* Action Button Badge */}
              <div className="mt-4 z-10 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800 shadow-lg group-hover:scale-105 transition-transform">
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAr ? 'فتح الجواب الملكي' : 'Melt Wax Seal'}</span>
              </div>

            </div>

            {/* Bottom Card Title & Subtitle */}
            <div className="relative z-10 space-y-2 pt-4 border-t border-black/5">
              <h3 className="font-display text-2xl sm:text-3xl text-[#0F0F12] font-semibold tracking-tight">
                {isAr ? 'تجربة إهداء وفتح شيك' : 'Cinematic Unboxing'}
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] font-light leading-relaxed">
                {isAr
                  ? 'فتح الجواب الأنيق وتأكيد الحضور التفاعلي بيدي إحساس الفخامة لكل معزوم.'
                  : 'Refractive liquid glass surfaces, melting ceremonial wax seals, and secret gift vaults.'}
              </p>
            </div>
          </motion.div>

          {/* CARD 3 — Permanent Online Archive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2rem] h-[420px] p-8 flex flex-col justify-between overflow-hidden border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-500"
            style={{
              background: 'radial-gradient(circle at 50% -10%, #A7F3D0 0%, #99F6E4 30%, #F8FAFC 75%)'
            }}
          >
            {/* Visual Decorative Top Composition */}
            <div className="relative w-full h-48 flex flex-col items-center justify-center space-y-3">
              
              {/* Floating Domain Link Badge */}
              <div className="w-full max-w-[250px] bg-white/90 backdrop-blur-xl border border-emerald-200 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 group-hover:scale-105 transition-transform duration-500">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider">Permanent Domain</div>
                  <div className="text-xs font-mono font-semibold text-slate-900 truncate">vael.gift/memories-2026</div>
                </div>
              </div>

              {/* Floating Search Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-300 text-xs font-mono font-medium text-slate-700 shadow-md">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Search in Gift Vault</span>
              </div>

            </div>

            {/* Bottom Card Title & Subtitle */}
            <div className="relative z-10 space-y-2 pt-4 border-t border-black/5">
              <h3 className="font-display text-2xl sm:text-3xl text-[#0F0F12] font-semibold tracking-tight">
                {isAr ? 'بيفضل أونلاين طول العمر' : 'Permanent Archive'}
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] font-light leading-relaxed">
                {isAr
                  ? 'رابط خاص ودائم على النت، تقدر تفتحه وتفتكر أحلى الذكريات في أي وقت ومن أي مكان.'
                  : 'Hosted permanently on a private domain link that you can revisit anytime from any device.'}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
