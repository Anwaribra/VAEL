import React from 'react';
import { useLanguage } from '../LanguageContext';

import VaelLogo from './VaelLogo';

export default function Footer() {
  const { isAr } = useLanguage();

  const instagramUrl = 'https://www.instagram.com/vael.digital?stkn=NG1tZW9objlyb2Jm';

  const handleNavigateCustom = (e) => {
    if (window.location.pathname === '/custom') return;
    e.preventDefault();
    window.history.pushState({}, '', '/custom');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <footer className="w-full bg-[#080808] text-[#F1EEE7] py-20 px-6 sm:px-12 md:px-16 border-t border-white/[0.07] select-none text-xs font-sans font-light">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/[0.07] pb-12">
          
          {/* Wordmark */}
          <div className="space-y-2">
            <a href="/" className="block hover:opacity-80 transition-opacity">
              <VaelLogo className="h-8 md:h-9 w-auto text-[#F1EEE7]" />
            </a>
            <p className="text-[#8E8E89] tracking-[0.18em] uppercase text-[11px]">
              {isAr ? 'دعوات رقمية وتجارب خاصة' : 'Digital invitations & private experiences'}
            </p>
          </div>

          {/* Studio Navigation Links */}
          <div className="flex flex-wrap items-center gap-8 text-[#A8A8A3]">
            <a
              href="/custom"
              onClick={handleNavigateCustom}
              className="hover:text-[#F1EEE7] transition-colors duration-500 uppercase tracking-[0.2em]"
            >
              {isAr ? 'طلب خاص' : 'Inquiries'}
            </a>
            <a
              href="/#experiences"
              className="hover:text-[#F1EEE7] transition-colors duration-500 uppercase tracking-[0.2em]"
            >
              {isAr ? 'الأعمال' : 'Portfolio'}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F1EEE7] transition-colors duration-500 uppercase tracking-[0.2em]"
            >
              Instagram
            </a>
          </div>

        </div>

        {/* Quiet Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#8E8E89]/70 uppercase tracking-[0.2em]">
          <div>
            © 2026 VAEL STUDIO. {isAr ? 'جميع الحقوق محفوظة' : 'ALL RIGHTS RESERVED.'}
          </div>
          <div>
            {isAr ? 'متوفر عالمياً • استوديو غرينتش +3' : 'AVAILABLE WORLDWIDE • STUDIO GMT+3'}
          </div>
        </div>

      </div>
    </footer>
  );
}
