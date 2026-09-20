import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import InvitationCard from './InvitationCard';
import InvitationScene from './InvitationScene';
import { INVITATION_DESIGN_PRESETS, DEFAULT_INVITATION_CONFIG } from '../data/invitationDesigns';
import { TEMPLATE_BACKGROUND_MAP } from '../data/backgroundTextures';
import { getSongById } from '../data/songs';

export default function InvitationEnvelope({
  config = DEFAULT_INVITATION_CONFIG,
  onOpen,
  className = '',
  showDesignSwitcher = false,
  onDesignChange,
  compact = false
}) {
  const { isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const sealButtonRef = useRef(null);
  const audioRef = useRef(null);

  const designId = config.design || 'ivory';
  const designPreset = INVITATION_DESIGN_PRESETS[designId] || INVITATION_DESIGN_PRESETS.ivory;
  const ritualType = designPreset.ritual || 'wax-seal';

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Song audio setup
  useEffect(() => {
    if (!config.songId) return;
    const song = getSongById(config.songId);
    if (!song || !song.file) return;

    const audio = new Audio(song.file);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [config.songId]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) onOpen();

    // Start audio on user gesture if available
    if (audioRef.current && !isMuted) {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {
        setAudioPlaying(false);
      });
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
      setIsMuted(true);
    } else {
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
    setTimeout(() => {
      sealButtonRef.current?.focus();
    }, 300);
  };

  const name1 = config.name1 || 'Karim';
  const name2 = config.name2 || 'Nour';
  const initials = `${name1[0] || 'K'}&${name2[0] || 'N'}`;
  const bgTextureObj = TEMPLATE_BACKGROUND_MAP[config.templateId || designId] || TEMPLATE_BACKGROUND_MAP[designId] || TEMPLATE_BACKGROUND_MAP['ivory-ceremony'];

  // IF OPENED AND NOT COMPACT -> EXPAND INTO FULL PAGE EDITORIAL WEBSITE VIEW
  if (isOpen && !compact) {
    return (
      <InvitationScene
        background={bgTextureObj}
        className={`min-h-screen w-full flex flex-col items-center justify-start py-8 px-4 sm:px-8 select-none ${className}`}
        sceneStyle={{ minHeight: '100vh' }}
        previewClassName="w-full max-w-3xl sm:max-w-4xl"
      >
        {/* Floating Control Bar: Sound & Replay */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0B0B0E]/85 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 text-xs font-mono shadow-2xl">
          <button
            type="button"
            aria-pressed={audioPlaying}
            onClick={toggleSound}
            className="text-zinc-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            {audioPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
            <span>
              {audioPlaying
                ? (isAr ? 'الصوت يعمل 🎵' : 'Sound on 🎵')
                : (isAr ? 'الصوت متوقف' : 'Sound off')}
            </span>
          </button>
          
          <span className="text-zinc-700">|</span>

          <button
            type="button"
            onClick={handleReset}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isAr ? 'إعادة الفتح ↺' : 'Replay ↺'}
          </button>
        </div>

        {/* FULL EXPANDED INVITATION PAGE */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full my-4"
        >
          <InvitationCard config={config} compact={false} />
        </motion.div>

      </InvitationScene>
    );
  }

  // UNOPENED ENVELOPE OR COMPACT PREVIEW STAGE
  return (
    <div className={`relative w-full ${compact ? 'max-w-xl' : 'max-w-2xl'} mx-auto flex flex-col items-center select-none ${className}`}>
      
      {/* Design morphing plain-text switcher (if enabled) */}
      {showDesignSwitcher && (
        <div className="w-full flex justify-center items-center gap-6 mb-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
          {['ivory', 'noir', 'oud'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onDesignChange && onDesignChange(id)}
              className={`transition-colors py-1 ${
                designId === id
                  ? 'text-white border-b border-white'
                  : 'hover:text-zinc-200'
              }`}
            >
              {INVITATION_DESIGN_PRESETS[id].name[isAr ? 'ar' : 'en']}
            </button>
          ))}
        </div>
      )}

      {/* Control Bar */}
      <div className="w-full flex justify-between items-center mb-4 px-2 text-xs font-mono">
        <div>
          <button
            type="button"
            aria-pressed={audioPlaying}
            onClick={toggleSound}
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
          >
            <span>
              {audioPlaying
                ? (isAr ? 'الصوت يعمل' : 'Sound on')
                : (isAr ? 'الصوت متوقف' : 'Sound off')}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!isOpen ? (
            <button
              type="button"
              onClick={handleOpen}
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              {isAr ? 'تخطي' : 'Skip'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              {isAr ? 'إعادة الفتح' : 'Replay'}
            </button>
          )}
        </div>
      </div>

      {/* Main Unboxing Stage */}
      <div className={`relative w-full ${compact ? 'aspect-[4/3] sm:aspect-[16/11]' : 'aspect-[4/3] sm:aspect-[16/10]'} rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B0B0E] flex items-center justify-center`}>
        
        {/* REDUCED MOTION CROSSFADE FALLBACK */}
        {reducedMotion ? (
          <div className="w-full h-full p-4 flex items-center justify-center">
            {isOpen ? (
              <div className="w-full h-full overflow-y-auto rounded-xl">
                <InvitationCard config={config} compact={compact} />
              </div>
            ) : (
              <button
                ref={sealButtonRef}
                type="button"
                onClick={handleOpen}
                aria-label="Open invitation envelope"
                className="w-full h-full flex flex-col items-center justify-center bg-[#16161D] text-white p-8 rounded-xl cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-xl font-serif mb-4">
                  {initials}
                </div>
                <span className="font-serif text-2xl font-light">{name1} & {name2}</span>
                <span className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-widest">
                  {isAr ? 'انقر على الختم لفتح الدعوة' : 'Click seal to open'}
                </span>
              </button>
            )}
          </div>
        ) : (
          /* STANDARD PHYSICAL UNBOXING STAGE */
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            {/* The Invitation Card */}
            <motion.div
              initial={false}
              animate={{
                y: isOpen ? 0 : 40,
                scale: isOpen ? 1 : 0.92,
                opacity: isOpen ? 1 : 0.1
              }}
              transition={{
                duration: 1.2,
                delay: isOpen ? 0.3 : 0,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-4 z-20 overflow-y-auto rounded-xl shadow-2xl"
            >
              <InvitationCard config={config} compact={compact} />
            </motion.div>

            {/* Closed Envelope Overlay */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 border border-white/10 bg-[#121217] text-white"
                >
                  {/* Flap fold */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-[#1A1A22] border-b border-white/10 shadow-lg pointer-events-none" />

                  {/* RITUAL 1: IVORY SILVER WAX SEAL */}
                  {ritualType === 'wax-seal' && (
                    <button
                      ref={sealButtonRef}
                      type="button"
                      onClick={handleOpen}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpen();
                        }
                      }}
                      aria-label="Open silver wax seal"
                      className="relative z-40 w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-600 via-zinc-200 to-white p-[2px] shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                      <div className="w-full h-full rounded-full bg-[#181820] flex flex-col items-center justify-center text-zinc-100 border border-white/20">
                        <span className="font-serif text-xl font-bold tracking-wider">
                          {initials}
                        </span>
                        <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                          SEAL
                        </span>
                      </div>
                    </button>
                  )}

                  {/* RITUAL 2: NOIR OBSIDIAN GLASS SHATTER */}
                  {ritualType === 'obsidian-shatter' && (
                    <button
                      ref={sealButtonRef}
                      type="button"
                      onClick={handleOpen}
                      aria-label="Shatter obsidian glass seal"
                      className="relative z-40 w-24 h-24 rounded-2xl bg-[#09090D] border border-zinc-700 shadow-2xl flex items-center justify-center cursor-pointer hover:border-zinc-400 hover:scale-105 transition-all"
                    >
                      <span className="font-serif text-xl text-zinc-200 font-bold tracking-widest">
                        {initials}
                      </span>
                    </button>
                  )}

                  {/* RITUAL 3: OUD GOLD CALLIGRAPHY */}
                  {ritualType === 'gold-calligraphy' && (
                    <button
                      ref={sealButtonRef}
                      type="button"
                      onClick={handleOpen}
                      aria-label="Open gold calligraphic seal"
                      className="relative z-40 w-24 h-24 rounded-full bg-[#1C1815] border-2 border-[#E5C396] shadow-2xl flex flex-col items-center justify-center text-[#E5C396] cursor-pointer hover:scale-105 transition-transform"
                    >
                      <span className="font-serif text-lg font-bold">
                        {name1[0] || 'ك'} & {name2[0] || 'ن'}
                      </span>
                    </button>
                  )}

                  <div className="mt-6 text-center z-40">
                    <p className="font-serif text-lg font-light text-zinc-300">
                      {name1} & {name2}
                    </p>
                    <p className="text-[10px] font-mono opacity-60 mt-1 uppercase tracking-widest">
                      {isAr ? 'انقر على الختم لفتح الدعوة' : 'Tap seal to open'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

      </div>
    </div>
  );
}
