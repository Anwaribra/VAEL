import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function CapabilitiesSection() {
  const { isAr } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    {
      id: '01',
      title: isAr ? 'حفلات الزفاف والخطوبة' : 'Weddings & engagements',
      description: isAr
        ? 'دعوات رقمية مزودة بتأكيد الحضور، اتجاهات الموقع، تفاصيل الضيوف، وكشف بصري مدروس.'
        : 'Digital invitations with RSVP, venue directions, guest details, and a considered reveal.',
      tag: isAr ? 'دعوات تفاعلية' : 'INTERACTIVE INVITATIONS',
      link: '/create',
      ctaText: isAr ? 'اطلب تصميم دعوة' : 'Request Invitation',
    },
    {
      id: '02',
      title: isAr ? 'المناسبات والاحتفالات الخاصة' : 'Private celebrations',
      description: isAr
        ? 'بوابات دعوات لأعياد الميلاد، الذكريات السنوية، الهدايا، واللقاءات الحميمية.'
        : 'Invitation portals for birthdays, anniversaries, gifts, and intimate gatherings.',
      tag: isAr ? 'تجارب حميمية' : 'PRIVATE PORTALS',
      link: '/gifts',
      ctaText: isAr ? 'استكشف بوابات الهدايا' : 'Explore Portals',
    },
    {
      id: '03',
      title: isAr ? 'التكليفات الفنية الخاصة' : 'Custom commissions',
      description: isAr
        ? 'تجارب رقمية موجهة فنوياً بالكامل ومبنية حول شخص واحد، لحظة واحدة، أو قصة واحدة.'
        : 'Fully art-directed digital experiences built around one person, one moment, or one story.',
      tag: isAr ? 'تكليف خاص' : 'BESPOKE ATELIER',
      link: '/custom',
      ctaText: isAr ? 'ابدأ طلب تكليف خاص' : 'Commission Studio',
      isCustomHighlight: true,
    },
  ];

  return (
    <section id="capabilities" className="w-full py-28 md:py-36 px-6 sm:px-12 md:px-16 bg-[#080808] text-[#F1EEE7] border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3]">
              <span className="text-[#F1EEE7]">03</span>
              <span className="w-8 h-px bg-white/20" />
              <span>{isAr ? 'ما نبتكره' : 'WHAT WE CREATE'}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F1EEE7] tracking-tight leading-[1.1]">
              {isAr ? 'ما نبتكره' : 'What we create'}
            </h2>
          </div>

          <p className="text-xs font-sans font-light text-[#8E8E89] tracking-[0.2em] uppercase max-w-md">
            {isAr
              ? 'دعوات رقمية وتجارب خاصة لحفلات الزفاف، المناسبات، والقصص الفريدة.'
              : 'Invitations and private digital experiences for weddings, celebrations, and one-off stories.'}
          </p>
        </div>

        {/* 3 Categories Table & Interactive Showcase Cards */}
        <div className="divide-y divide-white/[0.07]">
          {categories.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            const itemOpacity = isAnyHovered ? (isHovered ? 'opacity-100' : 'opacity-50') : 'opacity-100';

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group py-10 sm:py-12 transition-all duration-500 ${itemOpacity} ${
                  item.isCustomHighlight ? 'bg-white/[0.015] px-6 sm:px-8 rounded-2xl border border-white/10 my-4' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Category Number & Title */}
                  <div className="lg:col-span-5 flex items-baseline gap-6">
                    <span className="text-xs sm:text-sm font-sans font-light text-[#A8A8A3] tracking-[0.2em]">
                      {item.id}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans font-light tracking-[0.25em] text-[#A8A8A3] uppercase block">
                        {item.tag}
                      </span>
                      <h3 className="font-display text-2xl sm:text-4xl font-light text-[#F1EEE7] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Category Description */}
                  <div className="lg:col-span-4">
                    <p className="text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Interactive Action Node */}
                  <div className="lg:col-span-3 flex justify-start lg:justify-end">
                    <a
                      href={item.link}
                      onClick={(e) => {
                        if (item.link.startsWith('/')) {
                          e.preventDefault();
                          window.history.pushState({}, '', item.link);
                          window.dispatchEvent(new Event('popstate'));
                        }
                      }}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-sans font-light tracking-[0.2em] uppercase transition-all duration-500 ${
                        item.isCustomHighlight
                          ? 'bg-[#F1EEE7] text-[#080808] hover:bg-white shadow-lg'
                          : 'bg-white/[0.04] text-[#F1EEE7] border border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span>{item.ctaText}</span>
                      <span className="rtl-mirror transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">→</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
