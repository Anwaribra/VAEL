import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { isAr, toggleLang } = useLanguage();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'anwarmousa100@gmail.com';

  return (
    <footer className="w-full py-16 px-6 bg-[#050507] text-zinc-400 border-t border-white/10 select-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <a href="/" className="font-serif italic text-2xl text-white font-normal tracking-tight hover:opacity-80 transition-opacity">
          VAEL
        </a>

        {/* Contact Email as text */}
        <div className="text-xs font-mono text-zinc-300">
          {contactEmail}
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {isAr ? 'English' : 'العربية'}
        </button>
      </div>
    </footer>
  );
}
