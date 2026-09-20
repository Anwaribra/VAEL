import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function GiftsPage() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-4xl sm:text-6xl font-light">
          {isAr ? 'مواقع الهدايا الرقمية' : 'Digital Gift Capsules'}
        </h1>
        <p className="text-zinc-400 font-light text-base sm:text-lg max-w-xl mx-auto">
          {isAr
            ? 'هدية رقمية مشفرة بكلمة سر خاصة، تضم ألبوم صور بلوري ومذكرات صوتية ورسائل مفاجأة.'
            : 'Password-protected digital gifts featuring spatial galleries, voice memos, and surprise revelations.'}
        </p>
        <div className="pt-6">
          <a
            href="/custom"
            className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all shadow-xl"
          >
            {isAr ? 'طلب هدية مخصصة' : 'Request a Custom Gift'}
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
