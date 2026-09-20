// Background Texture Configuration & Sourced Asset Registry for VAEL Digital Atelier

export interface TextureAsset {
  id: string;
  src: string;
  alt: string;
  license: string;
  sourceUrl: string;
  author?: string;
  authorUrl?: string;
}

export interface TemplateBackground {
  type: 'image';
  src: string;
  position?: string;
  overlay?: string;
  blur?: string;
  opacity?: number;
  alt?: string;
  license?: string;
  sourceUrl?: string;
}

export const backgroundTextures: Record<string, TextureAsset[]> = {
  ivory: [
    {
      id: "handmade-paper",
      src: "/assets/backgrounds/ivory/handmade-paper.webp",
      alt: "Warm handmade paper texture with natural subtle grain",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1586075010923-2dd4570fb338",
      author: "Annie Spratt",
      authorUrl: "https://unsplash.com/@anniespratt"
    },
    {
      id: "linen-window-shadow",
      src: "/assets/backgrounds/ivory/linen-window-shadow.webp",
      alt: "Soft window shadow across warm ivory linen fabric",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1596178065887-1198b6148b2b",
      author: "Smit Patel",
      authorUrl: "https://unsplash.com/@smitpatel"
    },
    {
      id: "pearl-paper",
      src: "/assets/backgrounds/ivory/pearl-paper.webp",
      alt: "Smooth cream pearl paper texture with luminous surface",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1607604276583-eef5d076aa5f",
      author: "Ksenia Chernaya",
      authorUrl: "https://unsplash.com/@ksenia_chernaya"
    }
  ],
  noir: [
    {
      id: "black-velvet",
      src: "/assets/backgrounds/noir/black-velvet.webp",
      alt: "Deep black velvet texture with subtle light folds",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1618005182384-a83a8bd57fbe",
      author: "Milad Fakurian",
      authorUrl: "https://unsplash.com/@fakurian"
    },
    {
      id: "obsidian-stone",
      src: "/assets/backgrounds/noir/obsidian-stone.webp",
      alt: "Charcoal obsidian stone background with rich dark grain",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1600585154340-be6161a56a0c",
      author: "Ruan Richard",
      authorUrl: "https://unsplash.com/@ruanrichard"
    }
  ],
  oud: [
    {
      id: "persian-rug",
      src: "/assets/backgrounds/oud/persian-rug.webp",
      alt: "Muted antique Persian rug texture with delicate woven motifs",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1600121848594-d8644e57abab",
      author: "Aishath Naj",
      authorUrl: "https://unsplash.com/@aishathnaj"
    },
    {
      id: "sandstone-arch",
      src: "/assets/backgrounds/oud/sandstone-arch.webp",
      alt: "Warm sandstone arch texture with gentle architectural shadow",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1513694203232-719a280e022f",
      author: "Robby McCullough",
      authorUrl: "https://unsplash.com/@robbymccullough"
    }
  ],
  azure: [
    {
      id: "blue-silk",
      src: "/assets/backgrounds/premium/azure-silk.webp",
      alt: "Deep blue silk folds with soft directional ambient light",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1528459801416-a9e53bbf4e17",
      author: "Tim Mossholder",
      authorUrl: "https://unsplash.com/@timmossholder"
    }
  ],
  premium: [
    {
      id: "palm-house",
      src: "/assets/backgrounds/premium/palm-house.webp",
      alt: "Warm plaster wall with soft botanical palm leaf shadows",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1579783902614-a3fb3927b675",
      author: "Birmingham Museums Trust",
      authorUrl: "https://unsplash.com/@birminghammuseumstrust"
    },
    {
      id: "velvet-archive",
      src: "/assets/backgrounds/premium/velvet-archive.webp",
      alt: "Burgundy velvet antique textile with deep crimson folds",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1544816155-12df9643f363",
      author: "Evie S.",
      authorUrl: "https://unsplash.com/@evieshaffer"
    },
    {
      id: "midnight-fabric",
      src: "/assets/backgrounds/premium/midnight-fabric.webp",
      alt: "Midnight blue celestial fabric with subtle starlight texture",
      license: "Unsplash License (Free commercial & non-commercial use)",
      sourceUrl: "https://unsplash.com/photos/1534447677768-be436bb09401",
      author: "Eberhard Grossgasteiger",
      authorUrl: "https://unsplash.com/@eberhardgross"
    }
  ]
};

export const TEMPLATE_BACKGROUND_MAP: Record<string, TemplateBackground> = {
  'ivory-ceremony': {
    type: 'image',
    src: '/assets/backgrounds/ivory/handmade-paper.webp',
    position: 'center',
    overlay: 'rgba(244, 240, 234, 0.40)',
    opacity: 0.88,
    alt: 'Warm handmade paper texture'
  },
  'noir-evening': {
    type: 'image',
    src: '/assets/backgrounds/noir/black-velvet.webp',
    position: 'center',
    overlay: 'rgba(11, 11, 14, 0.55)',
    opacity: 0.90,
    alt: 'Dark black velvet texture'
  },
  'oud-garden': {
    type: 'image',
    src: '/assets/backgrounds/oud/sandstone-arch.webp',
    position: 'center',
    overlay: 'rgba(28, 24, 21, 0.45)',
    opacity: 0.85,
    alt: 'Warm sandstone arch texture'
  },
  'linea-minimal': {
    type: 'image',
    src: '/assets/backgrounds/ivory/linen-window-shadow.webp',
    position: 'center',
    overlay: 'rgba(255, 255, 255, 0.45)',
    opacity: 0.82,
    alt: 'Soft window shadow across ivory linen'
  },
  'nacre-pearl': {
    type: 'image',
    src: '/assets/backgrounds/ivory/pearl-paper.webp',
    position: 'center',
    overlay: 'rgba(247, 245, 240, 0.35)',
    opacity: 0.85,
    alt: 'Pearl paper luminous surface'
  },
  'azure-tide': {
    type: 'image',
    src: '/assets/backgrounds/premium/azure-silk.webp',
    position: 'center',
    overlay: 'rgba(8, 18, 48, 0.28)',
    opacity: 0.92,
    alt: 'Deep blue silk folds with soft light'
  },
  'moonlit-villa': {
    type: 'image',
    src: '/assets/backgrounds/noir/obsidian-stone.webp',
    position: 'center',
    overlay: 'rgba(9, 10, 16, 0.58)',
    opacity: 0.90,
    alt: 'Charcoal obsidian stone background'
  },
  'palm-house': {
    type: 'image',
    src: '/assets/backgrounds/premium/palm-house.webp',
    position: 'center',
    overlay: 'rgba(243, 240, 230, 0.38)',
    opacity: 0.88,
    alt: 'Botanical palm leaf shadows on warm plaster'
  },
  'velvet-archive': {
    type: 'image',
    src: '/assets/backgrounds/premium/velvet-archive.webp',
    position: 'center',
    overlay: 'rgba(42, 14, 20, 0.50)',
    opacity: 0.90,
    alt: 'Burgundy velvet antique textile'
  },
  'celestial-letter': {
    type: 'image',
    src: '/assets/backgrounds/premium/midnight-fabric.webp',
    position: 'center',
    overlay: 'rgba(12, 19, 34, 0.52)',
    opacity: 0.92,
    alt: 'Midnight blue celestial fabric'
  },
  'the-monogram': {
    type: 'image',
    src: '/assets/backgrounds/oud/persian-rug.webp',
    position: 'center',
    overlay: 'rgba(245, 242, 235, 0.55)',
    opacity: 0.85,
    alt: 'Muted antique Persian rug texture'
  },
  'silver-damask': {
    type: 'image',
    src: '/assets/backgrounds/premium/azure-silk.webp',
    position: 'center',
    overlay: 'rgba(6, 13, 30, 0.50)',
    opacity: 0.88,
    alt: 'Embossed silver filigree damask texture'
  },
  'celestial-dragon': {
    type: 'image',
    src: '/assets/backgrounds/premium/midnight-fabric.webp',
    position: 'center',
    overlay: 'rgba(5, 11, 22, 0.55)',
    opacity: 0.92,
    alt: 'Mystic navy celestial dragon texture'
  },
  'indigo-tapestry': {
    type: 'image',
    src: '/assets/backgrounds/oud/persian-rug.webp',
    position: 'center',
    overlay: 'rgba(8, 11, 20, 0.50)',
    opacity: 0.85,
    alt: 'Deep indigo tapestry weave texture'
  }
};
