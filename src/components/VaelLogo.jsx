import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function VaelLogo({ className = "h-8 w-auto", alt = "VAEL Studio Logo" }) {
  const { isAr } = useLanguage();

  const logoSrc = isAr ? '/assets/vael-logo-arabic.png' : '/assets/vael-logo-official.png';

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`object-contain select-none pointer-events-none drag-none ${className}`}
      loading="eager"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
