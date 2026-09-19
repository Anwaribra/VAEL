import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Lock, Heart, Gift, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ExperiencesSection() {
  const { isAr } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const mediumsData = isAr ? [
    {
      id: '01',
      tag: 'دعوة زفاف ملكية',
      title: 'دعوات الزفاف الإلكترونية والاحتفالات',
      subtitle: 'دعوات زفاف سينمائية تتضمن فتح الختم الفضي الملكي، تأكيد حضور الضيوف (RSVP)، خرائط للقاعة، وسجل الهدايا.',
      image: '/demos/northbound/assets/images/heroimage.7QtPkUtt_Z1tiXu7.webp',
      badge: 'الختم السائل + RSVP',
      highlights: [
        'فتح الختم الفضي السائل',
        'تأكيد حضور الضيوف RSVP',
        'خرائط تفاعلية للقاعة',
        'قائمة الهدايا والمباركات'
      ],
      link: '#showcase'
    },
    {
      id: '02',
      tag: 'هدية عيد ميلاد وذكريات',
      title: 'مواقع الهدايا الرقمية المغلقة بكلمة سر',
      subtitle: 'هدية رقمية رومانسية تفتح برمز سر خاص، تضم ألبوم صور تفاعلي زجاجي، رسائل صوتية، وعد تنازلي للمناسبة.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      badge: 'مشفر بكلمة سر',
      highlights: [
        'حماية برمز سر خاص بينكما',
        'معرض صور تفاعلي بلوري',
        'مذكرات صوتية عالية الدقة',
        'عداد تنازلي للمناسبة'
      ],
      link: '#showcase'
    },
    {
      id: '03',
      tag: 'سجل وقوائم الهدايا',
      title: 'قوائم الهدايا الإلكترونية والمباركات',
      subtitle: 'بديل مودرن للقوائم التقليدية، يتيح للمدعوين اختيار الهدية المناسبة وإرسال المباركات المالية والعينية بضغطة زر.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      badge: 'سجل الهدايا المباشر',
      highlights: [
        'بطاقات هدايا تفاعلية',
        'مباركات سريعة ومباشرة',
        'بطاقة NFC فيزيكال اختيارية',
        'دومين مخصص باسم المناسبة'
      ],
      link: '#showcase'
    },
    {
      id: '04',
      tag: 'تايم لاين ورسائل مفاجأة',
      title: 'التايم لاين الزمني ورسائل الكشف',
      subtitle: 'موقع زمني تفاعلي يوثق رحلة أجمل الأيام بين الزوجين، أو رابط مشفر يفتح في لحظة معينة ليكشف عن المفاجأة المنتظرة.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      badge: 'دومين دائم للأبد',
      highlights: [
        'تسلسل زمني للمحطات',
        'افتتاحية مفاجأة سينمائية',
        'موسيقى خلفية كاستم',
        'أرشيف رقمي دائم للأبد'
      ],
      link: '#showcase'
    }
  ] : [
    {
      id: '01',
      tag: 'Ceremonial Wedding',
      title: 'Ceremonial Wedding Invitation Portals',
      subtitle: 'High-editorial digital wedding invitations featuring melting silver wax seals, encrypted guest RSVP concierge, and venue maps.',
      image: '/demos/northbound/assets/images/heroimage.7QtPkUtt_Z1tiXu7.webp',
      badge: 'Liquid Seal & RSVP',
      highlights: [
        'Melting Silver Wax Seal',
        'Encrypted Guest RSVP',
        'Interactive Venue Maps',
        'Curated Gift Registry'
      ],
      link: '#showcase'
    },
    {
      id: '02',
      tag: 'Birthday & Anniversary',
      title: 'Password-Protected Personal Gift Capsules',
      subtitle: 'An intimate digital gift site unlocked with a secret passphrase, featuring spatial photo galleries, voice notes, and countdowns.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      badge: 'Passphrase Vault',
      highlights: [
        'Passphrase Vault Security',
        'Spatial Glass Photo Grid',
        '24-bit Audio Voice Memos',
        'Milestone Countdown'
      ],
      link: '#showcase'
    },
    {
      id: '03',
      tag: 'Gift Registry',
      title: 'Curated Wishlist & Digital Gift Registries',
      subtitle: 'A modern alternative to generic registries, allowing guests to inspect gift cards, contribute monetary blessings, and leave notes.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      badge: 'Interactive Wishlist',
      highlights: [
        'Interactive Gift Cards',
        'Instant Sentiment Tracking',
        'Optional Physical NFC Card',
        'Dedicated Custom Domain'
      ],
      link: '#showcase'
    },
    {
      id: '04',
      tag: 'Proposal & Timeline',
      title: 'Couples Timelines & Surprise Reveal Portals',
      subtitle: 'An interactive digital timeline tracing your shared milestones, or an encrypted link revealing a proposal in a cinematic atmosphere.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      badge: 'Permanent Archive',
      highlights: [
        'Milestone Chronology',
        'Cinematic Reveal Intro',
        'Custom Ambient Score',
        'Permanent Lifetime Link'
      ],
      link: '#showcase'
    }
  ];

  return (
    <div ref={containerRef} className="px-4 sm:px-6 md:px-12 py-20 bg-transparent select-none">
      
      {/* SECTION 03 — LUXURY CINEMATIC ARTIFACT GRID */}
      <motion.section
        id="experiences"
        style={{ scale: cardScale, opacity: cardOpacity }}
        className="relative rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0A0A0E] text-white border border-white/10 p-8 sm:p-12 md:p-16 shadow-[0_35px_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Subtle Edge Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none border border-white/10"></div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/10 pb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-mono text-white uppercase tracking-widest mb-4">
                {isAr ? '03 — التحف الرقمية والمجالات' : '03 — Our Bespoke Digital Mediums'}
              </div>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
                {isAr ? (
                  <>معرض التحف الرقمية <span className="font-serif italic text-zinc-400">التي نصممها.</span></>
                ) : (
                  <>Cinematic Mediums <span className="font-serif italic text-zinc-400">Crafted for Eternity.</span></>
                )}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-zinc-300 max-w-lg font-light leading-relaxed">
              {isAr
                ? 'استكشف التخصصات الرقمية الأربعة التي نقدمها كتحف تذكارية مخصصة للمناسبات الغالية.'
                : 'Explore our four signature digital mediums crafted as permanent milestone keepsakes.'}
            </p>
          </div>

          {/* 2x2 High-Editorial Visual Artifact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {mediumsData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-[2.5rem] bg-[#050507] border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:border-white/25 hover:scale-[1.01] transition-all duration-500"
              >
                {/* Visual Editorial Image Card Header */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono font-semibold text-white uppercase tracking-wider shadow-lg">
                      {item.badge}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg">
                      {item.id}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
                    {item.tag}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-white font-semibold tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                    {item.highlights.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Liquid Glass CTA Button */}
                  <div className="pt-4">
                    <a
                      href={item.link}
                      className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>{isAr ? 'معاينة النموذج الحي' : 'Explore Live Demo'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

    </div>
  );
}
