// Streamlined Invitation Design Presets for Ivory, Noir, Oud, Azure, and Bespoke Background Textures

export type InvitationDesignId = 
  | 'ivory' 
  | 'noir' 
  | 'oud' 
  | 'azure' 
  | 'silver-damask' 
  | 'celestial-dragon' 
  | 'indigo-tapestry';

export type OccasionType = 'Wedding' | 'Engagement';
export type SiteLanguage = 'ar' | 'en' | 'both';

export interface InvitationConfig {
  design: InvitationDesignId;
  occasion: OccasionType;
  name1: string;
  name2: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  venueName: string;
  city: string;
  mapUrl?: string;
  message?: string;
  photoUrl?: string;
  keepOriginalColors?: boolean;
  whatsapp?: string;
  language: SiteLanguage;
  songId?: string;
  templateId?: string;
  bgTexture?: string;
  blocks?: Array<{ id: string; type?: string; labelEn?: string; labelAr?: string; visible: boolean; required?: boolean }>;
}

export interface InvitationDesignPreset {
  id: InvitationDesignId;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  bgClass: string;
  bgImage?: string;
  textClass: string;
  subtextClass: string;
  accentClass: string;
  borderClass: string;
  fontFamily: string;
  ritual: 'wax-seal' | 'obsidian-shatter' | 'gold-calligraphy';
  photoFilter: string;
}

export const INVITATION_DESIGN_PRESETS: Record<InvitationDesignId, InvitationDesignPreset> = {
  ivory: {
    id: 'ivory',
    name: { en: 'Ivory', ar: 'إيفوري' },
    description: { en: 'Warm ivory canvas with hairline rules and high-contrast editorial serif', ar: 'عاجي دافئ بخطوط كلاسيكية وأناقة تحريرية ملكية' },
    bgClass: 'bg-[#FAF8F5]',
    textClass: 'text-[#1C1917]',
    subtextClass: 'text-[#78716C]',
    accentClass: 'text-[#44403C]',
    borderClass: 'border-[#E7E5E4]',
    fontFamily: '"Cormorant Garamond", "Amiri", serif',
    ritual: 'wax-seal',
    photoFilter: 'paper-mat'
  },
  noir: {
    id: 'noir',
    name: { en: 'Noir', ar: 'نوار' },
    description: { en: 'Near-black monolithic obsidian canvas with silver typography and specular highlight', ar: 'أسود فاخر بأسلوب سينمائي ولمسات فضية لامعة' },
    bgClass: 'bg-[#0B0B0E]',
    textClass: 'text-[#F4F4F5]',
    subtextClass: 'text-[#A1A1AA]',
    accentClass: 'text-[#E4E4E7]',
    borderClass: 'border-[#27272A]',
    fontFamily: '"Bodoni Moda", "IBM Plex Sans Arabic", serif',
    ritual: 'obsidian-shatter',
    photoFilter: 'noir-grain'
  },
  oud: {
    id: 'oud',
    name: { en: 'Oud', ar: 'عود' },
    description: { en: 'Warm deep neutrals with soft gold and 8-fold Islamic geometric ornaments', ar: 'ألوان دافئة بلمسات ذهبية وزخارف إسلامية أصيلة' },
    bgClass: 'bg-[#1C1815]',
    textClass: 'text-[#F5F0EB]',
    subtextClass: 'text-[#D4C3B5]',
    accentClass: 'text-[#E5C396]',
    borderClass: 'border-[#3D352E]',
    fontFamily: '"Aref Ruqaa", "Amiri", serif',
    ritual: 'gold-calligraphy',
    photoFilter: 'warm-arch'
  },
  azure: {
    id: 'azure',
    name: { en: 'Azure Tide', ar: 'أزور تايد' },
    description: { en: 'Cobalt and midnight blue with luminous liquid motion and silver-white typography', ar: 'أزرق كوبالتي ملكي مع تموج مائي ناعم وخطوط فضية مشعة' },
    bgClass: 'bg-gradient-to-b from-[#09152A] via-[#0D1F3C] to-[#060D1A]',
    textClass: 'text-[#F0F6FF]',
    subtextClass: 'text-[#93C5FD]',
    accentClass: 'text-[#60A5FA]',
    borderClass: 'border-[#1E3A8A]/50',
    fontFamily: '"Bodoni Moda", "Cormorant Garamond", "Amiri", serif',
    ritual: 'obsidian-shatter',
    photoFilter: 'azure-glow'
  },
  'silver-damask': {
    id: 'silver-damask',
    name: { en: 'Silver Damask', ar: 'شامواه سيلفر' },
    description: { en: 'Embossed silver filigree texture with crisp metallic typography', ar: 'نقوش شامواه فضية بارزة مع خطوط معدنية فاخرة شديدة التباين' },
    bgClass: 'bg-[#060D1E]',
    bgImage: '/backgrounds/silver-damask.jpg',
    textClass: 'text-[#F8FAFC]',
    subtextClass: 'text-[#E2E8F0]',
    accentClass: 'text-[#94A3B8]',
    borderClass: 'border-[#94A3B8]/40',
    fontFamily: '"Bodoni Moda", "Cormorant Garamond", "Amiri", serif',
    ritual: 'wax-seal',
    photoFilter: 'noir-grain'
  },
  'celestial-dragon': {
    id: 'celestial-dragon',
    name: { en: 'Celestial Dragon', ar: 'التنين الأسطوري' },
    description: { en: 'Mystic navy canvas with white dragon line-art and glowing starry typography', ar: 'خلفية كحيلة أسطورية بنقوش التنين الأبيض والخطوط المشعة' },
    bgClass: 'bg-[#050B16]',
    bgImage: '/backgrounds/celestial-dragon.jpg',
    textClass: 'text-[#FFFFFF]',
    subtextClass: 'text-[#BAE6FD]',
    accentClass: 'text-[#38BDF8]',
    borderClass: 'border-[#38BDF8]/40',
    fontFamily: '"Bodoni Moda", "Cormorant Garamond", "Amiri", serif',
    ritual: 'obsidian-shatter',
    photoFilter: 'azure-glow'
  },
  'indigo-tapestry': {
    id: 'indigo-tapestry',
    name: { en: 'Indigo Tapestry', ar: 'سجاد إنديجو الفاخر' },
    description: { en: 'Deep indigo tapestry weave with framed antique gold and ivory calligraphy', ar: 'نسيج إنديجو ملكي مؤطر بلمسات ذهبية وعاجية أصيلة' },
    bgClass: 'bg-[#080B14]',
    bgImage: '/backgrounds/indigo-tapestry.jpg',
    textClass: 'text-[#FFFBEB]',
    subtextClass: 'text-[#FEF3C7]',
    accentClass: 'text-[#F59E0B]',
    borderClass: 'border-[#D97706]/40',
    fontFamily: '"Aref Ruqaa", "Amiri", serif',
    ritual: 'gold-calligraphy',
    photoFilter: 'warm-arch'
  }
};

export const INVITATION_DESIGNS = Object.values(INVITATION_DESIGN_PRESETS);

export const DEFAULT_INVITATION_CONFIG: InvitationConfig = {
  design: 'ivory',
  occasion: 'Wedding',
  name1: 'Karim',
  name2: 'Nour',
  date: '2026-11-14',
  time: '19:00',
  venueName: 'Al Nakheel Garden',
  city: 'New Cairo',
  mapUrl: 'https://maps.google.com/?q=Al+Nakheel+Garden+New+Cairo',
  message: '',
  language: 'both'
};
