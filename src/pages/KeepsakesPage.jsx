import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function KeepsakesPage() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-4xl sm:text-6xl font-light">
          {isAr ? 'الأرشيف والتذكارات الدائمة' : 'Memory Keepsakes'}
        </h1>
        <p className="text-zinc-400 font-light text-base sm:text-lg max-w-xl mx-auto">
          {isAr
            ? 'مواقع وأراشيف رقمية تعيش العمر كله لتوثيق محطات حياتكم الغالية.'
            : 'Permanent digital archives designed to preserve your most sacred shared moments.'}
        </p>
      </main>
      <Footer />
    </div>
  );
}
