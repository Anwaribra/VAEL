import React from 'react';

export default function InvitationScene({
  background,
  children,
  className = '',
  sceneStyle = {},
  previewClassName = ''
}) {
  const bgSrc = background?.src || '/assets/backgrounds/ivory/handmade-paper.webp';
  const bgOverlay = background?.overlay || 'rgba(0, 0, 0, 0.15)';
  const bgOpacity = background?.opacity ?? 0.85;
  const bgPosition = background?.position || 'center';
  const bgBlur = background?.blur || '0px';

  return (
    <div
      className={`invitationScene relative overflow-hidden isolation-isolate w-full select-none ${className}`}
      style={{
        minHeight: '540px',
        backgroundColor: '#e9e4db',
        ...sceneStyle
      }}
    >
      {/* 1. Real texture image */}
      <img
        className="invitationScene__texture absolute inset-0 -z-30 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none scale-[1.03]"
        src={bgSrc}
        alt={background?.alt || 'Invitation background texture'}
        aria-hidden="true"
        loading="lazy"
        style={{
          objectPosition: bgPosition,
          opacity: bgOpacity,
          filter: bgBlur !== '0px' ? `blur(${bgBlur})` : 'none'
        }}
      />

      {/* 2. Color overlay */}
      <div
        className="invitationScene__overlay absolute inset-0 -z-20 pointer-events-none transition-colors duration-700 ease-out"
        style={{ background: bgOverlay }}
      />

      {/* 3. Soft vignette */}
      <div
        className="invitationScene__vignette absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.22) 100%)'
        }}
      />

      {/* 4. Invitation preview wrapped with physical drop shadow */}
      <div className="invitationScene__content relative z-20 w-full h-full flex items-center justify-center p-4 sm:p-8">
        <div
          className={`invitationPreview w-full transition-transform duration-500 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.15)] ${previewClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
