import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function GuestLinksPage() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-4xl sm:text-6xl font-light">
          {isAr ? 'أداة روابط الضيوف المخصصة' : 'Guest Links Tool'}
        </h1>
        <p className="text-zinc-400 font-light text-base sm:text-lg max-w-xl mx-auto">
          {isAr
            ? 'إنشاء روابط دعوة مخصصة باسم كل ضيف لمشاركتها مباشرة عبر واتساب.'
            : 'Generate personalized invitation links for every guest on your list.'}
        </p>
      </main>
      <Footer />
    </div>
  );
}
