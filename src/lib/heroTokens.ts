/**
 * Shared Hero DNA Tokens & Styling Classes
 * Derived from the Hero Section design system.
 */

export const HERO_TOKENS = {
  // Backgrounds & Atmospheres
  bgDark: '#050507',
  bgRadialVignette: 'radial-gradient(ellipse at center, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.65) 50%, #050507 100%)',
  borderHairline: 'border-white/10',

  // Typography Classes
  displayHeadline: 'font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.1]',
  displaySubhead: 'font-display text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight',
  serifItalic: 'font-serif italic font-normal text-white/90',
  bodyText: 'text-base sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed',
  mutedText: 'text-xs sm:text-sm text-zinc-400 font-light leading-relaxed',

  // Standard Button Classes (ONLY 2 ALLOWED)
  btnPrimary: 'px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wider shadow-2xl hover:bg-zinc-200 transition-all duration-300 inline-flex items-center gap-2.5 hover:scale-105 select-none cursor-pointer',
  btnSecondary: 'px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:scale-105 select-none cursor-pointer',

  // Standard Copy Guidelines
  copy: {
    invitations: {
      en: 'It begins with an invitation.',
      ar: 'كل حاجة بتبدأ بدعوة.'
    },
    gifts: {
      en: 'Some gifts are opened. Others are remembered.',
      ar: 'في هدايا بتتفتح.. وفي هدايا بتتفتكر.'
    },
    greetings: {
      en: 'A blessing, made to keep.',
      ar: 'تهنئة تتحفظ.'
    },
    keepsakes: {
      en: 'Hold the moment.',
      ar: 'امسك اللحظة بإيدك.'
    },
    partners: {
      en: 'For the people who make celebrations happen.',
      ar: 'لأصحاب الشغل اللي بيعمل الفرح.'
    },
    conciergeNote: {
      en: 'A demo. Every piece is made by our team from your brief.',
      ar: 'نموذج تجريبي. كل تجربة تصمم وتخصص بالكامل بواسطة فريقنا.'
    }
  }
};
