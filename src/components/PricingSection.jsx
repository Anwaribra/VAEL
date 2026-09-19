import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle, Gift, Heart, Crown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function PricingSection() {
  const { isAr } = useLanguage();

  const packages = isAr ? [
    {
      id: 'gift',
      name: 'باقة الهدية التذكارية',
      englishName: 'Digital Gift Capsule',
      badge: 'الأكثر طلباً للهدايا',
      icon: Gift,
      tagline: 'موقع هدية خاص يعبر عن مشاعرك لشخص عزيز في عيد ميلاده أو مناسبة خاصة.',
      popular: false,
      whatsappMsg: 'مرحباً، أرغب في الاستفسار عن باقة الهدية التذكارية (Digital Gift Capsule)',
      btnText: 'اطلب الباقة عبر واتساب',
      features: [
        'تصميم مخصص باسم وصور الشخص العزيز',
        'صفحة محمية بكلمة سر خاصة',
        'إمكانية إضافة رسالة صوتية أو فيديو خاص',
        'عداد تنازلي للمناسبة أو الذكرى',
        'تشغيل تلقائي لأغنية من اختيارك',
        'استلام الموقع خلال 24 ساعة'
      ]
    },
    {
      id: 'wedding',
      name: 'باقة دعوات الزفاف والخطوبة',
      englishName: 'Wedding & Ceremonial Portal',
      badge: 'الأفضل للأفراح والمناسبات',
      icon: Heart,
      tagline: 'دعوة إلكترونية شيك وعصرية تشاركها مع ضيوفك على الواتساب وإنستغرام.',
      popular: true,
      whatsappMsg: 'مرحباً، أرغب في طلب تفاصيل باقة دعوات الزفاف والخطوبة (Wedding Portal)',
      btnText: 'اطلب الباقة عبر واتساب',
      features: [
        'تصميم إلكتروني فاخر مع فتح الشمع السائل',
        'تأكيد حضور الضيوف (RSVP) مباشرة',
        'موقع القاعة وتوجيه غوغل مابز (Maps)',
        'قائمة هدايا الزفاف (Wishlist Registry)',
        'معرض صور ومذكرات للعروسين',
        'دعم كامل للغة العربية والإسبانية/الإنجليزية'
      ]
    },
    {
      id: 'vip',
      name: 'باقة التخصيص الكامل (VIP)',
      englishName: 'Bespoke Custom Experience',
      badge: 'تجربة خاصة وفريدة',
      icon: Crown,
      tagline: 'موقع مخصص بالكامل بتأثيرات بصريّة خاصة ودومين شخصي مخصص باسمكم.',
      popular: false,
      whatsappMsg: 'مرحباً، أرغب في حجز باقة التخصيص الكامل VIP (Bespoke Custom Experience)',
      btnText: 'اطلب الباقة عبر واتساب',
      features: [
        'تصميم ثلاثي الأبعاد مخصص بالكامل لمناسبتكم',
        'حجز دومين خاص باسمكم (مثل AriaAndDaniel.com)',
        'تضمين تأثيرات زجاجية وحركات بصرية خاصة',
        'كارت إلكتروني خشب/زجاج NFC مادي (اختياري)',
        'استضافة خاصة سريعة ومشفرة للأبد',
        'متابعة وتعديلات خاصة مع مصمم الموقع'
      ]
    }
  ] : [
    {
      id: 'gift',
      name: 'Digital Gift Capsule',
      englishName: 'Personal Milestone Site',
      badge: 'Most Popular Gift',
      icon: Gift,
      tagline: 'An intimate custom gift website to surprise a loved one on their birthday or special milestone.',
      popular: false,
      whatsappMsg: 'Hello, I would like to inquire about the Digital Gift Capsule package.',
      btnText: 'Order Package via WhatsApp',
      features: [
        'Customized with photos and name of your loved one',
        'Password-protected private secret vault',
        'Integrated high-fidelity voice notes or video',
        'Synchronized countdown clock to the celebration',
        'Autoplay custom music score or song',
        'Fast delivery within 24 hours'
      ]
    },
    {
      id: 'wedding',
      name: 'Wedding & Ceremonial Portal',
      englishName: 'Formal Invitation Site',
      badge: 'Top Choice for Weddings',
      icon: Heart,
      tagline: 'An elegant digital invitation portal to share with your guests via WhatsApp and Instagram.',
      popular: true,
      whatsappMsg: 'Hello, I would like to order the Wedding & Ceremonial Portal package.',
      btnText: 'Order Package via WhatsApp',
      features: [
        'Melting ceremonial silver wax seal interaction',
        'Guest RSVP concierge & response tracking',
        'Venue map location with Google Maps direction',
        'Interactive wedding gift wishlist registry',
        'Couples gallery & story timeline',
        'Bilingual English & Arabic support'
      ]
    },
    {
      id: 'vip',
      name: 'Bespoke Custom VIP',
      englishName: 'Fully Tailored Canvas',
      badge: 'Exclusive Experience',
      icon: Crown,
      tagline: 'A completely custom 3D web experience tailored from scratch with your private custom domain.',
      popular: false,
      whatsappMsg: 'Hello, I would like to book the Bespoke Custom VIP package.',
      btnText: 'Order Package via WhatsApp',
      features: [
        'Unconstrained 3D spatial web design from scratch',
        'Private custom domain registration (e.g. AriaAndDaniel.com)',
        'Refractive liquid glass surfaces & animations',
        'Optional physical liquid glass NFC physical card',
        'Permanent encrypted private hosting',
        'Direct consultation with senior art director'
      ]
    }
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white rounded-full blur-3xl pointer-events-none opacity-70"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/5 border border-black/10 text-xs sm:text-sm font-mono text-[#52525B] uppercase tracking-widest mb-4 font-semibold shadow-sm">
            {isAr ? '05 — الباقات والأسعار' : '05 — Pricing & Packages'}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#0F0F12] tracking-tight">
            {isAr ? (
              <>اختر الباقة المناسبة <span className="font-serif italic text-[#52525B]">لمناسبتك.</span></>
            ) : (
              <>Choose the Perfect Package <span className="font-serif italic text-[#52525B]">For Your Milestone.</span></>
            )}
          </h2>
          <p className="mt-4 text-[#52525B] font-light text-xl sm:text-2xl leading-relaxed">
            {isAr
              ? 'باقات مصممة خصيصاً لتلائم جميع المناسبات من الهدايا الشخصية إلى دعوات الزفاف الفاخرة.'
              : 'Tailored digital packages designed to suit every milestone from personal gift websites to luxury wedding portals.'}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#0F0F12] text-white shadow-2xl scale-[1.03] border-2 border-black/20'
                    : 'bg-white/85 text-[#0F0F12] border border-black/10 shadow-lg hover:shadow-2xl backdrop-blur-xl'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-4 right-8 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-md bg-gradient-to-r from-amber-200 to-amber-400 text-black">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Top Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                      pkg.popular ? 'bg-white text-black' : 'bg-black/5 text-[#0F0F12] border border-black/10'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-xs font-mono tracking-widest uppercase font-semibold ${
                      pkg.popular ? 'text-zinc-400' : 'text-[#71717A]'
                    }`}>
                      {pkg.englishName}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-3xl font-semibold mb-3">
                    {pkg.name}
                  </h3>

                  <p className={`text-base font-light leading-relaxed mb-8 ${
                    pkg.popular ? 'text-zinc-300' : 'text-[#52525B]'
                  }`}>
                    {pkg.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10 mb-8">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-light">
                        <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span className={pkg.popular ? 'text-zinc-200' : 'text-[#27272A]'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(pkg.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 hover:scale-105 ${
                      pkg.popular
                        ? 'bg-white text-black hover:bg-zinc-200'
                        : 'bg-[#0F0F12] text-white hover:bg-black'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{pkg.btnText}</span>
                  </a>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
