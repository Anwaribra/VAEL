import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function PartnersPage() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-4xl sm:text-6xl font-light">
          {isAr ? 'شركاء النجاح وممظمي الأفراح' : 'Wedding Planner Partners'}
        </h1>
        <p className="text-zinc-400 font-light text-base sm:text-lg max-w-xl mx-auto">
          {isAr
            ? 'برنامج الشراكة المخصص لمظمي الأفراح واستديوهات التصوير والمصممين.'
            : 'Concierge partnership program tailored for luxury wedding planners and event agencies.'}
        </p>
      </main>
      <Footer />
    </div>
  );
}
