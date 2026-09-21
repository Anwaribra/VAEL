import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function ExperiencesSection() {
  const { isAr } = useLanguage();

  const experiences = [
    {
      id: '01',
      category: isAr ? 'زفاف' : 'WEDDING',
      title: isAr ? 'أحمد وياسمين' : 'Ahmed & Yasmine',
      description: isAr
        ? 'دعوة زفاف خاصة تكشف بتأثير سينمائي، مع تأكيد حضور الضيوف، خرائط الموقع، وختم فضي أنيق.'
        : 'A private wedding invitation with a cinematic reveal, guest RSVP, venue directions, and a restrained silver seal.',
      previewImage: '/assets/vael_exp_wedding.png',
      link: '/i/oox6nqb7jj',
      targetBlank: false,
    },
    {
      id: '02',
      category: isAr ? 'احتفال خاص' : 'PRIVATE CELEBRATION',
      title: isAr ? 'احتفال خاص' : 'A Private Celebration',
      description: isAr
        ? 'بوابة هدايا حميمية تضم صوراً خاصة، رسائل صوتية، ومدخلاً محمياً برمز سري.'
        : 'An intimate gift portal with private photographs, voice notes, and a passcode-protected entrance.',
      previewImage: '/assets/vael_exp_celebration.png',
      link: '/gifts',
      targetBlank: false,
    },
    {
      id: '03',
      category: isAr ? 'خطوبة' : 'ENGAGEMENT',
      title: isAr ? 'نور وعمر' : 'Nour & Omar',
      description: isAr
        ? 'دعوة خطوبة تكشف بتأثير خاص، مع اتجاهات الوصول للموقع وتجربة مدروسة للضيوف.'
        : 'An engagement invitation with a private reveal, venue directions, and a considered guest experience.',
      previewImage: '/assets/vael_exp_engagement.png',
      link: '/i/oox6nqb7jj',
      targetBlank: false,
    },
  ];

  return (
    <section id="experiences" className="w-full py-32 md:py-44 px-6 sm:px-12 md:px-16 bg-[#080808] text-[#F1EEE7] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto space-y-28">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3] block">
              {isAr ? '01 — أعمال مختارة' : '01 — SELECTED EXPERIENCES'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F1EEE7] tracking-tight">
              {isAr ? 'تجارب مختارة' : 'Selected experiences'}
            </h2>
          </div>

          <p className="text-xs font-sans font-light text-[#8E8E89] tracking-[0.2em] uppercase">
            {isAr ? 'دعوات نفخر بتقديمها.' : 'A few invitations we would be proud to send.'}
          </p>
        </div>

        {/* Large Editorial Portfolio List */}
        <div className="space-y-36">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              
              {/* Text Meta Column */}
              <div className={`lg:col-span-5 space-y-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                
                <div className="flex items-center gap-4 text-xs font-sans font-light tracking-[0.2em] text-[#A8A8A3] uppercase">
                  <span className="text-[#F1EEE7]">{exp.id}</span>
                  <span className="w-8 h-px bg-white/20" />
                  <span>{exp.category}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-light text-[#F1EEE7] tracking-tight">
                  {exp.title}
                </h3>

                <p className="text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed max-w-md">
                  {exp.description}
                </p>

                <div className="pt-2">
                  <a
                    href={exp.link}
                    target={exp.targetBlank ? '_blank' : '_self'}
                    rel={exp.targetBlank ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 text-xs font-sans font-light tracking-[0.2em] text-[#F1EEE7] uppercase py-2 border-b border-white/20 hover:border-white transition-colors duration-500"
                  >
                    <span>{isAr ? 'افتح التجربة' : 'OPEN EXPERIENCE'}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </a>
                </div>

              </div>

              {/* Floating Editorial Viewport Media */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl bg-[#0b0b0e] border border-white/[0.08] overflow-hidden group shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
                  
                  {/* High-End Editorial Photograph Background with 80% Blur */}
                  <img
                    src={exp.previewImage}
                    alt={exp.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[10px] sm:blur-[12px] scale-105 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75"
                  />

                  {/* Dark Backdrop Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none" />

                  {/* Centered Sleek Lock Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 pointer-events-none z-20">
                    <div className="w-11 h-11 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#F1EEE7] shadow-xl group-hover:border-white/40 transition-colors">
                      <svg className="w-4 h-4 text-[#F1EEE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-sans font-light tracking-[0.25em] text-[#F1EEE7]/90 uppercase bg-black/60 border border-white/10 px-3.5 py-1 rounded-full backdrop-blur-md shadow-md">
                      {isAr ? 'معاينة مغلقة • خـاص' : 'PRIVATE ARCHIVE'}
                    </span>
                  </div>

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-sans font-light text-[#F1EEE7]/90 tracking-[0.2em] uppercase">
                    <span className="drop-shadow-sm">{exp.id}</span>
                    <span className="drop-shadow-sm">VAEL ATELIER</span>
                  </div>

                  {/* Bottom Bar */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-sans font-light text-[#F1EEE7]/80 tracking-[0.18em] uppercase border-t border-white/10 pt-4 drop-shadow-sm">
                    <span>{exp.category}</span>
                    <span>2026</span>
                  </div>

                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
