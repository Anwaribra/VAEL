import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function TableFinderPage() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-4xl sm:text-6xl font-light">
          {isAr ? 'دليل الطاولات والجلوس' : 'Table Finder Demo'}
        </h1>
        <p className="text-zinc-400 font-light text-base sm:text-lg max-w-xl mx-auto">
          {isAr
            ? 'تطبيق تفاعلي يتيح للضيوف البحث عن أرقام طاولاتهم بسهولة أثناء الحفل.'
            : 'Interactive seat lookup helping your wedding guests easily find their table assignment.'}
        </p>
      </main>
      <Footer />
    </div>
  );
}
