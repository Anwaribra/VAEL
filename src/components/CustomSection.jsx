import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function CustomSection() {
  const { isAr } = useLanguage();

  return (
    <section className="relative w-full py-36 px-6 bg-[#050507] text-white border-b border-white/10 overflow-hidden select-none flex items-center justify-center">
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-tight">
          {isAr ? 'عايز حاجة تانية؟' : 'Something else in mind?'}
        </h2>

        <p className="max-w-xl mx-auto text-zinc-400 font-light text-base sm:text-xl leading-relaxed">
          {isAr
            ? 'موقع متفصّل على شخص واحد ولحظة واحدة. احكيلنا وهنرد عليك.'
            : "A website made for one person, one moment, one story. Tell us and we'll write back."}
        </p>

        <div className="pt-4">
          <a
            href="/custom"
            className="inline-block px-9 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
          >
            {isAr ? 'موقع مخصص' : 'Custom website'}
          </a>
        </div>
      </div>
    </section>
  );
}
