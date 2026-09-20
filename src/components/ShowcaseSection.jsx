import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Play, Pause, Volume2, ShieldCheck, Heart, Radio, Gift, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ShowcaseSection() {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState('wedding');
  const [unlocked, setUnlocked] = useState(true);
  const [passphrase, setPassphrase] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [contributedGifts, setContributedGifts] = useState([]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passphrase.toLowerCase() === 'forever' || passphrase.length > 0) {
      setUnlocked(true);
    }
  };

  const toggleGiftContribution = (giftId) => {
    if (contributedGifts.includes(giftId)) {
      setContributedGifts(contributedGifts.filter(id => id !== giftId));
    } else {
      setContributedGifts([...contributedGifts, giftId]);
    }
  };

  return (
    <section id="showcase" className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/5 border border-black/10 text-xs sm:text-sm font-mono text-[#52525B] uppercase tracking-widest mb-4 font-semibold shadow-sm">
            {isAr ? '04 — الديموهات الحية' : '04 — Live Artifact Showcase'}
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-light text-[#0F0F12] tracking-tight">
            {isAr ? (
              <>جرب النماذج بنفسك <span className="font-serif italic text-[#52525B]">لايف دلوقتي.</span></>
            ) : (
              <>Interact With Live <span className="font-serif italic text-[#52525B]">Demo Artifacts.</span></>
            )}
          </h2>
          <p className="mt-4 text-[#52525B] font-light text-xl sm:text-2xl md:text-3xl">
            {isAr
              ? 'دوس على أي ديمو تحت عشان تفتحه وتجرب السايت شغال إزاي بنفسك.'
              : 'Click any tab below to test live interactive sample websites directly.'}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'wedding', name: isAr ? 'دعوة زفاف فاخرة' : 'Bespoke Wedding Portal' },
            { id: 'memory', name: isAr ? 'سايت هدية شخصية' : 'Personal Gift Site' },
            { id: 'wishlist', name: isAr ? 'قائمة الهدايا والفلوس' : 'Digital Gift Registry' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#0F0F12] text-white shadow-xl scale-[1.02]'
                  : 'bg-white/80 text-[#52525B] hover:text-[#0F0F12] border border-black/10'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Demo View Container */}
        <div className="relative min-h-[580px] w-full rounded-[3.5rem] md:rounded-[4.5rem] bg-[#0A0A0E] text-white p-8 sm:p-12 md:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-xl overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* DEMO 1: THE CEREMONIAL WEDDING PORTAL */}
            {activeTab === 'wedding' && (
              <motion.div
                key="wedding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] uppercase tracking-widest border border-white/10 font-medium">
                    {isAr ? 'دعوة زفاف فاخرة' : 'Ceremonial Monograph'}
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white font-light tracking-tight">
                    {isAr ? 'موقع زفاف فاخر' : 'Ceremonial Wedding Portal'}
                  </h3>

                  <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                    {isAr
                      ? 'موقع دعوة زفاف فاخر يشتمل على تأكيد الحضور (RSVP)، قائمة الهدايا (Wishlist)، وجدول الفعاليات بالتفاصيل الكاملة.'
                      : 'A refined ceremonial website featuring interactive guest RSVP, curated gift wishlist, and full event schedule.'}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="/demos/northbound/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider shadow-xl hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>{isAr ? 'معاينة الموقع الكامل' : 'Explore Live Site'}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <a
                    href="/demos/northbound/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-2xl overflow-hidden border border-white/15 bg-[#050505] shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                  >
                    {/* Clean Preview Image without techy browser headers */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src="/demos/northbound/assets/images/heroimage.7QtPkUtt_Z1tiXu7.webp"
                        alt="Ceremonial Wedding Portal Preview"
                        className="w-full h-full object-cover object-top filter brightness-[0.9] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                        <div className="space-y-1">
                          <span className="text-[11px] text-zinc-300 font-light tracking-widest uppercase">
                            {isAr ? 'Aria & Daniel — Villa Cimbrone' : 'Aria & Daniel — Villa Cimbrone'}
                          </span>
                          <h4 className="font-display text-2xl md:text-3xl text-white font-medium">
                            {isAr ? 'فتح التصميم الحي بالكامل' : 'Open Full Website'}
                          </h4>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                          <span className="font-light">{isAr ? 'يتضمن RSVP، قائمة الهدايا والمعرض' : 'Includes RSVP, Wishlist & Gallery'}</span>
                          <span className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs transition-colors">
                            {isAr ? 'تصفح الدعوة' : 'View Site'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}

            {/* DEMO 2: THE PERSONAL GIFT ARCHIVE */}
            {activeTab === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono tracking-widest uppercase border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    Personal Milestone Gift Site
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white font-medium">
                    Personal Gift Archive
                  </h3>

                  <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                    {isAr
                      ? 'تصميم مخصص للمناسبات الخاصة وهدايا أعياد الميلاد. يحتوي على أرشيف صور خاص، رسائل صوتية، وقائمة هدايا السرية.'
                      : 'Designed for Elena & Marcus. A private interactive gift site containing intimate photographic moments, encrypted letters, and high-fidelity spatial audio.'}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="/demos/gift-site/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider shadow-xl hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>{isAr ? 'معاينة موقع الهدية الكامل' : 'Explore Live Site'}</span>
                    </a>
                  </div>

                  {!unlocked ? (
                    <form onSubmit={handleUnlock} className="space-y-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <Lock className="w-3.5 h-3.5 text-white" />
                        <span>Passphrase required (Try: "forever")</span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                          placeholder="Enter secret word..."
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-white font-mono"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg"
                        >
                          Unlock
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl bg-white/10 border border-white/20 space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-white font-semibold">
                        <span className="flex items-center gap-2">
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                          Archive Unlocked — Access Granted
                        </span>
                        <span className="text-[10px] text-zinc-400">24 Audio Tracks</span>
                      </div>

                      {/* Audio Player Component */}
                      <div className="p-4 rounded-xl bg-black/80 text-white flex items-center justify-between shadow-lg border border-white/10">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div className="flex-1 mx-4">
                          <p className="text-xs text-white font-semibold">Midnight Voice Memo #04</p>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                            <div className={`h-full bg-white rounded-full transition-all duration-300 ${isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-1/4'}`}></div>
                          </div>
                        </div>
                        <Volume2 className="w-4 h-4 text-zinc-400" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Spatial Frequency Visualizer Frame */}
                <div className="lg:col-span-7">
                  <a
                    href="/demos/gift-site/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-2xl overflow-hidden aspect-[16/10] bg-[#050505] text-white p-8 flex flex-col justify-between shadow-2xl border border-white/10 hover:border-white/30 transition-all"
                  >
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                        Spatial Frequency Visualizer
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white text-black font-semibold text-[10px] tracking-wider uppercase">Open Full Demo</span>
                    </div>

                    <div className="my-auto py-6 flex items-center justify-center gap-2 h-32">
                      {[40, 65, 30, 85, 95, 45, 70, 90, 100, 60, 35, 80, 50, 75, 90, 40, 60, 80, 95, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-full bg-gradient-to-t from-zinc-700 via-white to-zinc-300 transition-all duration-300"
                          style={{
                            height: isPlayingAudio ? `${Math.sin(i + Date.now() * 0.005) * 40 + 50}%` : `${h}%`
                          }}
                        ></div>
                      ))}
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Personal Gift Site</span>
                        <h4 className="text-base font-display text-white font-semibold">Elena Vance — 30th Birthday Vault</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-300 group-hover:underline">Explore Site &rarr;</span>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}

            {/* DEMO 3: THE DIGITAL GIFT REGISTRY & WISHLIST */}
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono tracking-widest uppercase border border-white/10">
                    <Gift className="w-3.5 h-3.5 text-white" />
                    Spatial Gift Registry Medium
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white font-medium">
                    Digital Gift & Wishlist Registry
                  </h3>

                  <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                    {isAr
                      ? 'قائمة هدايا وتبرعات تفاعلية فاخرة. يمكن للضيوف تصفح الهدايا، المساهمة في التجارب، وإرسال مباركات خاصة.'
                      : 'Designed for luxury celebrations. Guests can inspect curated gift cards, contribute towards dream experiences, and attach encrypted personal blessings.'}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="/demos/gift-registry/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider shadow-xl hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>{isAr ? 'معاينة قائمة الهدايا الحية' : 'Explore Live Site'}</span>
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">Interactive Features</span>
                    <p className="text-xs text-zinc-300">Live progress bars, currency switcher, donor messages wall, and custom amount contribution modals.</p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <a
                    href="/demos/gift-registry/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group p-6 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:border-white transition-all shadow-2xl mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">74% Total Funded</span>
                        <h4 className="font-display text-2xl font-semibold text-white">Aurelia & Julian Digital Registry</h4>
                      </div>
                      <span class="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs transition-transform group-hover:scale-105">
                        Open Full Site &rarr;
                      </span>
                    </div>
                  </a>

                  {[
                    { id: 'item1', title: 'Amalfi Coast Honeymoon Experience', category: 'Romantic Journey', status: '64% Funded' },
                    { id: 'item2', title: 'Bowers & Wilkins Hi-Fi Audio System', category: 'Home Keepsake', status: 'Claimed by Marc' },
                    { id: 'item3', title: 'Sukiyabashi Omakase Tasting Experience', category: 'Fine Dining', status: 'Available' }
                  ].map((gift) => {
                    const isGiven = contributedGifts.includes(gift.id);
                    return (
                      <div
                        key={gift.id}
                        onClick={() => toggleGiftContribution(gift.id)}
                        className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                          isGiven
                            ? 'bg-white text-black border-white shadow-xl'
                            : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`text-[10px] font-mono uppercase tracking-widest ${isGiven ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            {gift.category} • {gift.status}
                          </span>
                          <h4 className="font-display text-lg font-semibold">{gift.title}</h4>
                        </div>

                        <div className="flex items-center gap-2">
                          {isGiven ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Blessed & Sent
                            </span>
                          ) : (
                            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white hover:text-black transition-colors border border-white/20">
                              Gift & Bless
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

