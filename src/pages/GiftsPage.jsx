import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

export default function GiftsPage() {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const portfolioItems = [
    {
      id: '01',
      category: isAr ? 'دعوة زفاف سينمائية' : 'CINEMATIC WEDDING VAULT',
      title: isAr ? 'دعوة زفاف — أحمد وياسمين' : 'Ahmed & Yasmine Wedding Vault',
      description: isAr
        ? 'تجربة دعوة زفاف فاخرة تكشف بتأثير سينمائي، مع تأكيد حضور الضيوف، خريطة تفاعلية للموقع، وختم فضي أنيق.'
        : 'A luxury wedding experience featuring a cinematic reveal, guest RSVP, interactive venue map, and a silver wax seal.',
      tag: isAr ? 'إصدار فاخر' : 'LUXURY EDITION',
      status: isAr ? 'معرض الأعمال القريب' : 'UPCOMING SHOWCASE',
      image: '/assets/vael_exp_wedding.png',
      aspect: 'aspect-[16/10]',
    },
    {
      id: '02',
      category: isAr ? 'بوابة هدايا وتجارب خاصة' : 'PRIVATE MILESTONE & GIFT PORTAL',
      title: isAr ? 'بوابة الذكريات — احتفال خاص' : 'A Private Anniversary & Gift Portal',
      description: isAr
        ? 'بوابة هدايا رقمية حميمية محمية بكود خاص، تضم ألبوم صور تفاعلي، رسائل صوتية، وختم شمعي مخصص.'
        : 'An intimate passcode-protected portal featuring an interactive portrait gallery, voice notes, and a custom seal.',
      tag: isAr ? 'محمي بكود خاص' : 'PASSCODE PROTECTED',
      status: isAr ? 'أعمال الاستوديو' : 'STUDIO ARCHIVE',
      image: '/assets/vael_exp_celebration.png',
      aspect: 'aspect-[4/5]',
    },
    {
      id: '03',
      category: isAr ? 'دعوة خطوبة ملكية' : 'ROYAL ENGAGEMENT INVITATION',
      title: isAr ? 'دعوة خطوبة — نور وعمر' : 'Nour & Omar Engagement Vault',
      description: isAr
        ? 'دعوة خطوبة مصممة شخصياً بخطوط عربية عريقة، زخارف هندسية، وتأكيد حضور مباشر عبر الواتساب.'
        : 'A bespoke engagement invitation designed with classical Arabic typography, geometric accents, and direct WhatsApp RSVP.',
      tag: isAr ? 'زخارف مذهبة' : 'GOLD ACCENTED',
      status: isAr ? 'معرض الأعمال القريب' : 'UPCOMING SHOWCASE',
      image: '/assets/vael_exp_engagement.png',
      aspect: 'aspect-[16/10]',
    },
    {
      id: '04',
      category: isAr ? 'تكليف خاص لمناسبة فريدة' : 'PURE BESPOKE COMMISSION',
      title: isAr ? 'تجربة رقمية — قصة واحدة' : 'One Person, One Story Experience',
      description: isAr
        ? 'عمل فني رقمي متفصّل بالكامل حول قصة واحدة ولحظة واحدة، مصمم وفق أرقى معايير الاستوديو.'
        : 'A fully art-directed digital masterpiece built around one person, one moment, and one extraordinary story.',
      tag: isAr ? 'تكليف خاص' : 'PURE BESPOKE',
      status: isAr ? 'قريباً في المعرض' : 'LAUNCHING SOON',
      image: '/assets/vael_hero_invitation.png',
      aspect: 'aspect-[4/5]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#F1EEE7] flex flex-col justify-between selection:bg-white/20">
      <Navbar />

      <main className="relative z-10 pt-36 pb-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto w-full space-y-20">
        
        {/* Page Header */}
        <div className="space-y-6 border-b border-white/[0.07] pb-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-sans font-light tracking-[0.25em] text-[#A8A8A3] uppercase">
            <span>{isAr ? 'معرض الأعمال والتطبيقات القادمة' : 'PORTFOLIO & UPCOMING SHOWCASE'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F1EEE7] tracking-tight leading-[1.08]">
            {isAr ? (
              <>
                معرض الأعمال <br />
                <span className="font-serif italic text-[#A8A8A3]">والتجارب الرقمية القادمة.</span>
              </>
            ) : (
              <>
                Selected Portfolio & <br />
                <span className="font-serif italic text-[#A8A8A3]">Upcoming Experiences.</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'نعرض هنا نماذج من أحدث أعمال استوديو VAEL والتجارب الرقمية القادمة: دعوات زفاف سينمائية، بوابات هدايا خاصة، وتكليفات فنية متفصّلة بالكامل.'
              : 'An editorial portfolio showcasing VAEL Studio’s selected works and upcoming releases: cinematic invitations, private portals, and bespoke commissions.'}
          </p>

          <div className="pt-4">
            <a
              href="/custom"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/custom');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#F1EEE7] text-[#080808] font-medium text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-white shadow-xl cursor-pointer"
            >
              <span>{isAr ? 'اطلب تصميم خاص لمناسبتك' : 'Inquire For a Bespoke Design'}</span>
              <span className="rtl-mirror transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">→</span>
            </a>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="space-y-16">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-6 text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3]">
            <span>{isAr ? 'أعمال الاستوديو والمعاينات' : 'SHOWCASE ARCHIVE'}</span>
            <span>VAEL ATELIER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
            {portfolioItems.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group space-y-6 bg-[#0b0b0e] border border-white/[0.08] rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-500 shadow-xl"
              >
                {/* Media Aspect Viewport */}
                <div className={`relative w-full ${item.aspect} rounded-xl overflow-hidden bg-black/80 flex flex-col justify-between p-6 border border-white/10 group-hover:border-white/30 transition-colors`}>
                  
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[8px] sm:blur-[10px] group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-sans font-light text-[#F1EEE7] tracking-[0.2em] uppercase">
                    <span className="bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-[#A8A8A3] font-sans">
                      {item.status}
                    </span>
                  </div>

                  {/* Centered Seal Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#F1EEE7] shadow-2xl group-hover:border-white/40 transition-colors">
                      <svg className="w-4 h-4 text-[#F1EEE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-sans font-light text-[#F1EEE7]/80 tracking-[0.18em] uppercase border-t border-white/10 pt-3">
                    <span>{item.category}</span>
                    <span>2026</span>
                  </div>

                </div>

                {/* Content Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-sans font-light tracking-[0.2em] text-[#A8A8A3] uppercase">
                    <span className="text-[#F1EEE7]">{item.id}</span>
                    <span className="w-6 h-px bg-white/20" />
                    <span>{item.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F1EEE7] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#8E8E89] font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3">
                    <a
                      href="/custom"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', '/custom');
                        window.dispatchEvent(new Event('popstate'));
                      }}
                      className="inline-flex items-center gap-2 text-xs font-sans font-light tracking-[0.2em] text-[#F1EEE7] uppercase py-1 border-b border-white/20 hover:border-white transition-colors duration-500 cursor-pointer"
                    >
                      <span>{isAr ? 'اطلب تصميم مشابه' : 'INQUIRE SIMILAR DESIGN'}</span>
                      <span className="rtl-mirror transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">→</span>
                    </a>
                  </div>
                </div>

              </motion.article>
            ))}
          </div>
        </div>

        {/* Custom Request Callout Banner */}
        <div className="bg-[#0b0b0e] border border-white/10 rounded-2xl p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-light uppercase tracking-[0.25em] text-[#A8A8A3]">
              {isAr ? 'تصلنا التفاصيل مباشرة' : 'BESPOKE COMMISSIONS'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#F1EEE7] tracking-tight">
              {isAr ? 'هل لديك مناسبة قادمة؟' : 'Planning a celebration?'}
            </h2>
            <p className="text-sm sm:text-base text-[#8E8E89] font-light leading-relaxed">
              {isAr
                ? 'شاركونا الفكرة والمناسبة وسيقوم فريق الاستوديو بصياغة تجربة رقمية استثنائية خصيصاً لكم.'
                : 'Share your occasion and vision with our studio, and we will orchestrate an extraordinary digital experience tailored for your moment.'}
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/custom"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/custom');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#F1EEE7] text-[#080808] font-medium text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-white shadow-xl cursor-pointer"
            >
              <span>{isAr ? 'اطلب تصميمك الخاص الآن' : 'Inquire For a Bespoke Design Now'}</span>
              <span className="rtl-mirror transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">→</span>
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
