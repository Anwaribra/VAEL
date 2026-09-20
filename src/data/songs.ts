export interface Song {
  id: string;
  title: { en: string; ar: string };
  artist: { en: string; ar: string };
  file: string; // Relative path inside public/ (e.g., '/songs/adore-you-chorus.mp3')
  fullFile?: string;
  startTime?: number; // Offset in seconds to start playback at chorus
  duration?: number;
  badge?: string;
  access?: 'free' | 'premium';
}

// Curated Audio Library for VAEL Digital Experience Studio
export const songs: Song[] = [
  {
    id: 'amr-diab-ajmal-oyoun',
    title: {
      en: 'Ajmal Oyoun (Borj El Hout)',
      ar: 'أجمل عيون (برج الحوت)'
    },
    artist: {
      en: 'Amr Diab',
      ar: 'عمرو دياب'
    },
    file: '/songs/amr-diab-ajmal-oyoun-chorus.mp3',
    fullFile: '/songs/عمرو دياب أجمل عيون في الكون .mp3',
    startTime: 0,
    duration: 45,
    badge: 'Arabic Iconic',
    access: 'premium'
  },
  {
    id: 'stephen-sanchez-until-i-found-you',
    title: {
      en: 'Until I Found You (Chorus Edit)',
      ar: 'أنتيل أي فوند يو (اللازمة الفاخرة)'
    },
    artist: {
      en: 'Stephen Sanchez',
      ar: 'ستيفن سانشيز'
    },
    file: '/songs/until-i-found-you-chorus.mp3',
    fullFile: '/songs/SpotiDownloader.com - Until I Found You - Stephen Sanchez.mp3',
    startTime: 0,
    duration: 45,
    badge: 'Bespoke Favorite',
    access: 'premium'
  },
  {
    id: 'harry-styles-adore-you',
    title: {
      en: 'Adore You (Chorus Refrain)',
      ar: 'أدور يو (مقطع اللازمة المباشر)'
    },
    artist: {
      en: 'Harry Styles',
      ar: 'هاري ستايلز'
    },
    file: '/songs/adore-you-chorus.mp3',
    fullFile: '/songs/SpotiDownloader.com - Adore You - Harry Styles.mp3',
    startTime: 0,
    duration: 45,
    badge: 'Premium Choice',
    access: 'premium'
  }
];

export function getSongById(id?: string): Song | undefined {
  if (!id) return undefined;
  return songs.find((s) => s.id === id);
}
