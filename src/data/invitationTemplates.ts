// Structured Template Registry for VAEL Digital Experience Studio

import { InvitationDesignId } from './invitationDesigns';
import { TemplateBackground, TEMPLATE_BACKGROUND_MAP } from './backgroundTextures';

export type TemplateAccess = 'free' | 'premium';
export type TemplateCategory = 'wedding' | 'engagement' | 'archive';

export interface InvitationTemplate {
  id: string;
  name: { en: string; ar: string };
  category: TemplateCategory;
  access: TemplateAccess;
  theme: InvitationDesignId;
  description: { en: string; ar: string };
  layout: 'classic' | 'cinematic' | 'ornate' | 'minimal' | 'botanical' | 'celestial';
  typography: string;
  badge?: string;
  accentBg: string;
  textColor: string;
  borderStyle: string;
  previewBg: string;
  features: string[];
  background?: TemplateBackground;
}

const RAW_TEMPLATES: Omit<InvitationTemplate, 'background'>[] = [
  // FREE COLLECTION
  {
    id: 'ivory-ceremony',
    name: { en: 'Ivory Ceremony', ar: 'إيفوري السيريموني' },
    category: 'wedding',
    access: 'free',
    theme: 'ivory',
    description: {
      en: 'Soft paper, silver light, and a quiet beginning.',
      ar: 'ورق ناعم، ضوء فضي، وبداية هادئة.'
    },
    layout: 'classic',
    typography: '"Cormorant Garamond", "Amiri", serif',
    accentBg: '#FAF8F5',
    textColor: '#1C1917',
    borderStyle: 'border-[#E7E5E4]',
    previewBg: '#F4F0EA',
    features: ['seal', 'map', 'rsvp', 'photo']
  },
  {
    id: 'noir-evening',
    name: { en: 'Noir Evening', ar: 'نوار السهرة' },
    category: 'wedding',
    access: 'free',
    theme: 'noir',
    description: {
      en: 'Obsidian darkness for an unforgettable night.',
      ar: 'ظلمة الأوبسيديان لسهرة لا تُنسى.'
    },
    layout: 'cinematic',
    typography: '"Bodoni Moda", "Amiri", serif',
    accentBg: '#0B0B0E',
    textColor: '#F4F4F5',
    borderStyle: 'border-[#27272A]',
    previewBg: '#121217',
    features: ['obsidian-seal', 'map', 'rsvp', 'photo']
  },
  {
    id: 'oud-garden',
    name: { en: 'Oud Garden', ar: 'حديقة العود' },
    category: 'wedding',
    access: 'free',
    theme: 'oud',
    description: {
      en: 'Warm sand, olive shadows, and golden geometry.',
      ar: 'رمال دافئة، ظلال زيتونية، وهندسة ذهبية.'
    },
    layout: 'ornate',
    typography: '"Aref Ruqaa", "Amiri", serif',
    accentBg: '#1C1815',
    textColor: '#F5F0EB',
    borderStyle: 'border-[#3D352E]',
    previewBg: '#26201B',
    features: ['gold-seal', 'map', 'rsvp', 'music']
  },
  {
    id: 'linea-minimal',
    name: { en: 'Linea', ar: 'لينيا' },
    category: 'engagement',
    access: 'free',
    theme: 'ivory',
    description: {
      en: 'Pure form, quiet type, and the beauty of restraint.',
      ar: 'شكل خالص، خط هادئ، وجمال البساطة.'
    },
    layout: 'minimal',
    typography: '"Cormorant Garamond", sans-serif',
    accentBg: '#FFFFFF',
    textColor: '#0F0F12',
    borderStyle: 'border-[#0F0F12]/15',
    previewBg: '#F7F7F9',
    features: ['minimal-seal', 'map', 'rsvp']
  },
  {
    id: 'nacre-pearl',
    name: { en: 'Nacre', ar: 'ناكر اللؤلؤ' },
    category: 'wedding',
    access: 'free',
    theme: 'ivory',
    description: {
      en: 'Pearl tones and soft edges for an intimate celebration.',
      ar: 'درجات لؤلؤية وحواف ناعمة لاحتفال دافئ.'
    },
    layout: 'classic',
    typography: '"Cormorant Garamond", "Amiri", serif',
    accentBg: '#F7F5F0',
    textColor: '#2C2A29',
    borderStyle: 'border-[#E2DFD8]',
    previewBg: '#EFECE6',
    features: ['pearl-seal', 'map', 'rsvp', 'photo']
  },

  // PREMIUM COLLECTION
  {
    id: 'azure-tide',
    name: { en: 'Azure Tide', ar: 'أزور تايد' },
    category: 'wedding',
    access: 'premium',
    theme: 'azure',
    description: {
      en: 'A luminous blue invitation shaped by light, movement, and water.',
      ar: 'دعوة كوبالتية مشعة بالضوء والتموج المائي الفاخر.'
    },
    layout: 'cinematic',
    typography: '"Bodoni Moda", "Cormorant Garamond", "Amiri", serif',
    badge: 'Premium collection',
    accentBg: '#09152A',
    textColor: '#F0F6FF',
    borderStyle: 'border-[#1E3A8A]/50',
    previewBg: '#0D1F3C',
    features: ['seal', 'map', 'rsvp', 'animated-scenes']
  },
  {
    id: 'moonlit-villa',
    name: { en: 'Moonlit Villa', ar: 'فيلا القمر' },
    category: 'wedding',
    access: 'premium',
    theme: 'noir',
    description: {
      en: 'A cinematic invitation for an evening under the trees.',
      ar: 'دعوة سينمائية لسهرة تحت ظلال الأشجار.'
    },
    layout: 'cinematic',
    typography: '"Bodoni Moda", serif',
    badge: 'Premium collection',
    accentBg: '#090A10',
    textColor: '#E2E8F0',
    borderStyle: 'border-[#334155]',
    previewBg: '#0F172A',
    features: ['metallic-seal', 'gallery', 'rsvp', 'music']
  },
  {
    id: 'palm-house',
    name: { en: 'Palm House', ar: 'بيت النخيل' },
    category: 'wedding',
    access: 'premium',
    theme: 'ivory',
    description: {
      en: 'Warm cream, botanical shadows, and garden light.',
      ar: 'كريم دافئ، ظلال نباتية، وضوء الحدائق.'
    },
    layout: 'botanical',
    typography: '"Cormorant Garamond", serif',
    badge: 'Premium collection',
    accentBg: '#F3F0E6',
    textColor: '#1C2819',
    borderStyle: 'border-[#747963]/30',
    previewBg: '#E8E3D5',
    features: ['botanical-seal', 'map', 'rsvp', 'gallery']
  },
  {
    id: 'velvet-archive',
    name: { en: 'Velvet Archive', ar: 'أرشيف الفيلفيت' },
    category: 'wedding',
    access: 'premium',
    theme: 'oud',
    description: {
      en: 'Burgundy, black, and antique gold with a ceremonial weight.',
      ar: 'عنابي، أسود، وذهب أثري بثقل طقسي ملكي.'
    },
    layout: 'ornate',
    typography: '"Aref Ruqaa", serif',
    badge: 'Premium collection',
    accentBg: '#2A0E14',
    textColor: '#FDF4E3',
    borderStyle: 'border-[#AA8B52]/40',
    previewBg: '#3D151D',
    features: ['gold-calligraphy', 'map', 'rsvp', 'gallery']
  },
  {
    id: 'celestial-letter',
    name: { en: 'Celestial Letter', ar: 'رسالة السماوات' },
    category: 'engagement',
    access: 'premium',
    theme: 'noir',
    description: {
      en: 'A midnight composition mapped with quiet stars.',
      ar: 'تكوين منتصف الليل مرسوم بنجوم هادئة.'
    },
    layout: 'celestial',
    typography: '"Bodoni Moda", serif',
    badge: 'Premium collection',
    accentBg: '#0C1322',
    textColor: '#E0F2FE',
    borderStyle: 'border-[#38BDF8]/30',
    previewBg: '#131F37',
    features: ['star-seal', 'map', 'rsvp', 'music']
  },
  {
    id: 'the-monogram',
    name: { en: 'The Monogram', ar: 'ذا مونوغرام' },
    category: 'wedding',
    access: 'premium',
    theme: 'ivory',
    description: {
      en: 'An art-directed invitation built around one unforgettable mark.',
      ar: 'دعوة فنية مصممة حول شعار خاص لا يُنسى.'
    },
    layout: 'classic',
    typography: '"Bodoni Moda", "Cormorant Garamond", serif',
    badge: 'Premium collection',
    accentBg: '#F5F2EB',
    textColor: '#1A1817',
    borderStyle: 'border-[#A88955]/40',
    previewBg: '#EFE9DE',
    features: ['monogram-seal', 'map', 'rsvp', 'custom-mark']
  },
  {
    id: 'silver-damask',
    name: { en: 'Silver Damask', ar: 'شامواه سيلفر' },
    category: 'wedding',
    access: 'premium',
    theme: 'silver-damask',
    description: {
      en: 'Embossed silver filigree texture with crisp metallic typography.',
      ar: 'نقوش شامواه فضية بارزة مع خطوط معدنية فاخرة شديدة التباين.'
    },
    layout: 'classic',
    typography: '"Bodoni Moda", "Cormorant Garamond", serif',
    badge: 'Atelier Texture',
    accentBg: '#060D1E',
    textColor: '#F8FAFC',
    borderStyle: 'border-[#94A3B8]/40',
    previewBg: '#0F172A',
    features: ['wax-seal', 'map', 'rsvp', 'texture-bg']
  },
  {
    id: 'celestial-dragon',
    name: { en: 'Celestial Dragon', ar: 'التنين الأسطوري' },
    category: 'wedding',
    access: 'premium',
    theme: 'celestial-dragon',
    description: {
      en: 'Mystic navy canvas with white dragon line-art and glowing starry typography.',
      ar: 'تكوين أسطوري بنقوش التنين الأبيض والخطوط المشعة.'
    },
    layout: 'cinematic',
    typography: '"Bodoni Moda", "Playfair Display", serif',
    badge: 'Atelier Texture',
    accentBg: '#050B16',
    textColor: '#FFFFFF',
    borderStyle: 'border-[#38BDF8]/40',
    previewBg: '#0F172A',
    features: ['obsidian-shatter', 'map', 'rsvp', 'texture-bg']
  },
  {
    id: 'indigo-tapestry',
    name: { en: 'Indigo Tapestry', ar: 'نسيج الإنديجو' },
    category: 'wedding',
    access: 'premium',
    theme: 'indigo-tapestry',
    description: {
      en: 'Deep indigo tapestry weave with framed antique gold and ivory typography.',
      ar: 'نسيج إنديجو ملكي مؤطر بلمسات ذهبية عتيقة.'
    },
    layout: 'ornate',
    typography: '"Aref Ruqaa", "Amiri", serif',
    badge: 'Atelier Texture',
    accentBg: '#080B14',
    textColor: '#FFFBEB',
    borderStyle: 'border-[#D97706]/40',
    previewBg: '#181E2E',
    features: ['gold-calligraphy', 'map', 'rsvp', 'texture-bg']
  }
];

export const INVITATION_TEMPLATES: InvitationTemplate[] = RAW_TEMPLATES.map((t) => ({
  ...t,
  background: TEMPLATE_BACKGROUND_MAP[t.id] || TEMPLATE_BACKGROUND_MAP['ivory-ceremony']
}));

export const getTemplateById = (id: string): InvitationTemplate => {
  return INVITATION_TEMPLATES.find((t) => t.id === id || t.id.startsWith(id)) || INVITATION_TEMPLATES[0];
};
