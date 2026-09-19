import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function FinalCtaSection() {
  const { isAr } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Birthday');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* Background Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white rounded-full blur-3xl pointer-events-none opacity-80"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/5 border border-black/10 text-xs sm:text-sm font-mono text-[#52525B] font-semibold uppercase tracking-widest mb-8 shadow-sm">
          {isAr ? '07 — تواصل معنا واستفسر الآن' : '07 — Contact & Inquire Now'}
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#0F0F12] tracking-tight leading-[1.15]">
          {isAr ? (
            <>اصنع هديتك الرقمية اليوم <br /><span className="normal-case font-serif italic text-[#52525B]">واترك انطباعاً لا يُنسى.</span></>
          ) : (
            <>Create Your Digital Website Today <br /><span className="normal-case font-serif italic text-[#52525B]">And Leave an Unforgettable Impression.</span></>
          )}
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-[#52525B] font-light text-xl sm:text-2xl md:text-3xl leading-relaxed">
          {isAr
            ? 'تواصل معنا فوراً عبر الواتساب أو إنستغرام للبدء في تجهيز وتصميم موقعك الخاص خلال 24-48 ساعة.'
            : 'Get in touch via WhatsApp or Instagram to start crafting your custom website within 24–48 hours.'}
        </p>

        {/* Refined Single Action Button */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(isAr ? 'مرحباً، أرغب في طلب موقع خاص لمناسبتي' : 'Hello, I would like to order a custom digital website for my occasion.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[#0F0F12] text-white font-bold text-base sm:text-lg uppercase tracking-wider shadow-2xl hover:bg-black transition-all duration-300 hover:scale-105"
          >
            <span>{isAr ? 'تواصل عبر واتساب الآن' : 'Order via WhatsApp Now'}</span>
            <ArrowUpRight className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="mt-24 sm:mt-28 pt-10 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm text-[#52525B] font-mono">
          <div className="flex items-center gap-3">
            <span className="font-display text-[#0F0F12] tracking-widest font-bold text-lg">VAEL</span>
            <span>{isAr ? '© 2026 جميع الحقوق محفوظة.' : '© 2026 VAEL Studio. All rights reserved.'}</span>
          </div>

          <div className="flex gap-8 text-[#52525B] font-medium">
            <a href="#" className="hover:text-[#0F0F12] transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-[#0F0F12] transition-colors">{isAr ? 'شروط الخدمة' : 'Terms of Service'}</a>
            <a href="#" className="hover:text-[#0F0F12] transition-colors">{isAr ? 'حماية البيانات' : 'Vault Security'}</a>
          </div>

          <div>
            <span>{isAr ? 'توجيه وإخراج فني مخصص' : 'Custom Digital Direction'}</span>
          </div>
        </footer>

      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-[2.5rem] liquid-glass-dark border border-white/20 p-8 md:p-12 shadow-2xl"
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-8">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">Private Studio Inquiry</span>
                    <h3 className="font-display text-2xl text-white font-semibold">Commission a VAEL Experience</h3>
                    <p className="text-xs text-zinc-300 font-light mt-1">
                      Provide your contact details and intended occasion. Our art director will contact you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">Occasion Type</label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-white font-sans"
                      >
                        <option value="Birthday">Birthday Milestone</option>
                        <option value="Anniversary">Anniversary Chronicle</option>
                        <option value="Wedding">Formal Wedding Portal</option>
                        <option value="Engagement">Engagement Revelation</option>
                        <option value="Graduation">Honoris Monograph</option>
                        <option value="Custom">Custom Bespoke Experience</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">Your Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-white font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors mt-6 shadow-xl"
                    >
                      Submit Commission Inquiry
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-white font-semibold">Inquiry Received</h3>
                  <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                    Thank you. A VAEL partner will review your inquiry for the {occasion} commission and respond shortly.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-white/20 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/30"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
