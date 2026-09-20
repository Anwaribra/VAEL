import React, { useRef, useState } from 'react';
import { INVITATION_DESIGN_PRESETS } from '../data/invitationDesigns';
import { TEMPLATE_BACKGROUND_MAP } from '../data/backgroundTextures';

export default function InvitationCard({ config, compact = false, className = '', selectedBlockId = null, onSelectBlock }) {
  const designId = config.design || 'ivory';
  const designPreset = INVITATION_DESIGN_PRESETS[designId] || INVITATION_DESIGN_PRESETS.ivory;
  const bgTextureObj = TEMPLATE_BACKGROUND_MAP[config.templateId || designId] || TEMPLATE_BACKGROUND_MAP[designId] || TEMPLATE_BACKGROUND_MAP['ivory-ceremony'];

  const name1 = config.name1 || 'Karim';
  const name2 = config.name2 || 'Nour';
  const names = `${name1} & ${name2}`;
  const namesAR = `${name1} و ${name2}`;

  const type = config.occasion || 'Wedding';
  const isEngagement = type === 'Engagement';

  const isBoth = config.language === 'both';
  const isArabicFirst = config.language === 'ar' || isBoth;

  // Date formatting
  const dateObj = config.date ? new Date(config.date + 'T' + (config.time || '19:00')) : new Date();
  
  const formattedDateEN = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedDateAR = dateObj.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Time formatting
  const formattedTimeEN = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const formattedTimeAR = dateObj.toLocaleTimeString('ar-EG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Maps URL link logic
  let mapUrl = config.mapUrl;
  if (!mapUrl || !mapUrl.startsWith('https://')) {
    const venueQuery = `${config.venueName || ''} ${config.city || ''}`.trim();
    mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueQuery)}`;
  }

  // WhatsApp RSVP link logic
  let whatsappUrl = '';
  if (config.whatsapp) {
    const cleanPhone = config.whatsapp.replace(/\D/g, '');
    const rsvpTextEN = `I'll attend ${names}'s ${type.toLowerCase()}.`;
    const rsvpTextAR = `سأحضر ${isEngagement ? 'خطوبة' : 'فرح'} ${namesAR}.`;
    const rsvpText = isArabicFirst ? rsvpTextAR : rsvpTextEN;
    whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rsvpText)}`;
  }

  // Specular foil highlight tracking for Noir design
  const cardRef = useRef(null);
  const [foilPos, setFoilPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (designId !== 'noir' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFoilPos({ x, y });
  };

  // Invitation lines per type and language
  const inviteTextEN = isEngagement
    ? `${names} are getting engaged. Join us to celebrate.`
    : `Together with their families, ${names} request the honour of your presence at their wedding.`;

  const inviteTextAR = isEngagement
    ? `يسعد ${namesAR} دعوتكم لمشاركتهما فرحة خطوبتهما.`
    : `بكل الحب والفرح، يدعوكم ${namesAR} لمشاركتهما فرحة زفافهما.`;

  // Photo styling per design
  const getPhotoStyle = () => {
    if (config.keepOriginalColors) return '';
    if (designId === 'ivory') return 'p-3 bg-[#F4F0EA] border border-[#E0DAD0] shadow-sm';
    if (designId === 'noir') return 'grayscale contrast-[1.05] brightness-90 opacity-90 border border-[#27272A]';
    if (designId === 'oud') return 'sepia-[0.25] rounded-t-full border border-[#E5C396]/40 shadow-inner';
    return '';
  };

  // Blocks definitions array for dynamic ordering & visibility
  const blocksOrder = Array.isArray(config.blocks) ? config.blocks : [
    { id: 'names', visible: true },
    { id: 'datetime', visible: true },
    { id: 'venue', visible: true },
    { id: 'message', visible: true },
    { id: 'photo', visible: true },
    { id: 'rsvp', visible: true },
    { id: 'signature', visible: true }
  ];

  // Block Render Map
  const renderBlockContent = (blockId) => {
    const isSelected = selectedBlockId === blockId;
    const blockWrapperClass = `w-full transition-all duration-200 relative ${
      isSelected ? 'outline outline-1 outline-[#A88955] outline-offset-4 rounded p-1' : ''
    }`;

    switch (blockId) {
      case 'names':
        return (
          <div
            key="names"
            onClick={() => onSelectBlock && onSelectBlock('names')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing Names
              </span>
            )}
            <div className="space-y-3 w-full">
              <h1 className={`font-normal tracking-tight ${compact ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-6xl'}`}>
                {isArabicFirst ? namesAR : names}
              </h1>
              <div className="w-full font-light text-sm sm:text-base leading-relaxed">
                {isBoth ? (
                  <div className="space-y-2">
                    <p dir="rtl" className="text-sm sm:text-base">
                      {inviteTextAR}
                    </p>
                    <p dir="ltr" className={`text-xs sm:text-sm ${designPreset.subtextClass}`}>
                      {inviteTextEN}
                    </p>
                  </div>
                ) : isArabicFirst ? (
                  <p dir="rtl" className="text-sm sm:text-base">
                    {inviteTextAR}
                  </p>
                ) : (
                  <p dir="ltr" className="text-sm sm:text-base">
                    {inviteTextEN}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'datetime':
        return (
          <div
            key="datetime"
            onClick={() => onSelectBlock && onSelectBlock('datetime')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing Date
              </span>
            )}
            <div className={`w-full py-4 border-y space-y-1 ${designPreset.borderClass}`}>
              <div className="text-sm sm:text-base font-medium">
                {isArabicFirst ? formattedDateAR : formattedDateEN}
              </div>
              <div className={`text-xs font-mono uppercase tracking-wider ${designPreset.subtextClass}`}>
                {isArabicFirst ? formattedTimeAR : formattedTimeEN}
              </div>
            </div>
          </div>
        );

      case 'venue':
        return (
          <div
            key="venue"
            onClick={() => onSelectBlock && onSelectBlock('venue')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing Venue
              </span>
            )}
            <div className="w-full space-y-2">
              <p className="text-sm font-medium">
                {config.venueName || 'Al Nakheel Garden'}{config.city ? `, ${config.city}` : ''}
              </p>
              <div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-xs uppercase tracking-widest underline decoration-1 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity ${designPreset.accentClass}`}
                >
                  {isArabicFirst ? 'افتح على الخريطة' : 'Open in Maps'}
                </a>
              </div>
            </div>
          </div>
        );

      case 'message':
        if (!config.message || !config.message.trim()) return null;
        return (
          <div
            key="message"
            onClick={() => onSelectBlock && onSelectBlock('message')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing Message
              </span>
            )}
            <div className={`w-full py-3 px-4 rounded border text-xs leading-relaxed italic ${designPreset.borderClass} ${designPreset.subtextClass}`}>
              "{config.message.trim()}"
            </div>
          </div>
        );

      case 'photo':
        if (!config.photoUrl) return null;
        return (
          <div
            key="photo"
            onClick={() => onSelectBlock && onSelectBlock('photo')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing Photo
              </span>
            )}
            <div className="w-full flex justify-center py-2">
              <div className={`max-w-xs overflow-hidden ${getPhotoStyle()}`}>
                <img
                  src={config.photoUrl}
                  alt={names}
                  className="w-full h-auto max-h-64 object-cover rounded"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        );

      case 'rsvp':
        if (!whatsappUrl) return null;
        return (
          <div
            key="rsvp"
            onClick={() => onSelectBlock && onSelectBlock('rsvp')}
            className={blockWrapperClass}
          >
            {isSelected && (
              <span className="absolute -top-3 left-2 bg-[#A88955] text-white font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase z-10">
                Editing RSVP
              </span>
            )}
            <div className="w-full pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block w-full py-3 px-6 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${designPreset.borderClass} ${designPreset.textClass} hover:opacity-80`}
              >
                {isArabicFirst ? 'تأكيد الحضور على واتساب' : 'Confirm attendance on WhatsApp'}
              </a>
            </div>
          </div>
        );

      case 'signature':
        return (
          <div key="signature" className="w-full pt-6 border-t border-current/10 text-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] font-mono uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity ${designPreset.subtextClass}`}
            >
              {isArabicFirst ? 'صُنِع بـ VAEL' : 'Made with VAEL'}
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full overflow-hidden transition-all duration-300 ${designPreset.bgClass} ${designPreset.textClass} ${className}`}
      style={{ fontFamily: designPreset.fontFamily }}
    >
      {/* REAL TEXTURE BACKGROUND LAYER */}
      {(config.bgTexture || designPreset.bgImage || bgTextureObj?.src) && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={config.bgTexture || designPreset.bgImage || bgTextureObj.src}
            alt={bgTextureObj?.alt || ''}
            className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity scale-105"
          />
          {/* Readability backdrop overlay for maximum text contrast */}
          <div
            className="absolute inset-0 transition-colors duration-500"
            style={{ background: bgTextureObj?.overlay || 'rgba(0,0,0,0.40)' }}
          />
        </div>
      )}

      {/* AZURE: Luminous liquid-light wave motion overlay */}
      {designId === 'azure' && (
        <>
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen z-0"
            style={{
              background: `radial-gradient(ellipse 400px 300px at ${foilPos.x}% ${foilPos.y}%, rgba(96, 165, 250, 0.4), transparent 80%)`
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(147,197,253,0.15),transparent_65%)] animate-pulse z-0" />
        </>
      )}

      {/* NOIR: Specular metallic foil overlay */}
      {designId === 'noir' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            background: `radial-gradient(circle 350px at ${foilPos.x}% ${foilPos.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`
          }}
        />
      )}

      {/* OUD: 8-fold Islamic geometric ornament background */}
      {designId === 'oud' && (
        <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-center items-center z-0">
          <svg className="w-72 h-72 text-[#E5C396]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
            <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" />
            <polygon points="100,35 145,55 165,100 145,145 100,165 55,145 35,100 55,55" />
            <circle cx="100" cy="100" r="40" />
          </svg>
        </div>
      )}

      <div className={`relative z-10 mx-auto flex flex-col justify-between items-center text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${compact ? 'p-6 space-y-4 text-xs' : 'p-8 sm:p-12 space-y-8 max-w-xl'}`}>
        {blocksOrder
          .filter((b) => b.visible !== false)
          .map((b) => renderBlockContent(b.id))}
      </div>
    </div>
  );
}
