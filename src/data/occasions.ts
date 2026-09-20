// Occasion presets and tone copy system for VAEL experiences

export type TonePreset = 'formal' | 'warm' | 'modern';

export interface OccasionPreset {
  id: string;
  name: { en: string; ar: string };
  scheduleDefaults: {
    reception: string;
    ceremony: string;
    dinner: string;
    party: string;
  };
  recommendedDesigns: string[];
  copyPresets: Record<
    TonePreset,
    {
      en: { headline: string; phrase: string };
      ar: { headline: string; phrase: string };
    }
  >;
}

export const OCCASION_PRESETS: Record<string, OccasionPreset> = {
  Wedding: {
    id: 'Wedding',
    name: { en: 'Wedding', ar: 'حفل زفاف' },
    scheduleDefaults: {
      reception: '17:30',
      ceremony: '18:00',
      dinner: '20:00',
      party: '21:00'
    },
    recommendedDesigns: ['ivory', 'noir', 'oud', 'botanical', 'zaffa', 'layl'],
    copyPresets: {
      formal: {
        en: {
          headline: 'Wedding Ceremony & Reception',
          phrase: 'Request the honour of your presence at the celebration of their wedding.'
        },
        ar: {
          headline: 'حفل الزفاف المبارك',
          phrase: 'يتشرفان بدعوتكم لحضور حفل زفافهما وتكتمل فرحتهما بمشاركتكم.'
        }
      },
      warm: {
        en: {
          headline: 'Celebrating Our Love',
          phrase: 'We invite you to join us for an unforgettable evening of laughter, toasts, and joy.'
        },
        ar: {
          headline: 'فرحتنا تكمل بيكم',
          phrase: 'هنستناكم تفرحوا معانا في أجمل يوم في حياتنا وبحضوركم تكمل الفرحة.'
        }
      },
      modern: {
        en: {
          headline: 'The Wedding Celebration',
          phrase: 'We are getting married! Join us as we celebrate our new chapter.'
        },
        ar: {
          headline: 'حفل زفافنا',
          phrase: 'كل حاجة بتبدأ بدعوة - جمعنا الحبايب عشان نحتفل بليلة عمرنا سوا.'
        }
      }
    }
  },
  Engagement: {
    id: 'Engagement',
    name: { en: 'Engagement Party', ar: 'حفل خطوبة' },
    scheduleDefaults: {
      reception: '18:00',
      ceremony: '18:30',
      dinner: '20:30',
      party: '21:30'
    },
    recommendedDesigns: ['zaffa', 'botanical', 'ivory', 'glass'],
    copyPresets: {
      formal: {
        en: {
          headline: 'Engagement Celebration',
          phrase: 'Cordially invite you to celebrate their engagement evening.'
        },
        ar: {
          headline: 'حفل الخطوبة',
          phrase: 'يتشرفان بدعوتكم لمشاركتهم فرحة الخطوبة السعيدة.'
        }
      },
      warm: {
        en: {
          headline: 'We are Engaged!',
          phrase: 'Come raise a glass with us as we celebrate our engagement.'
        },
        ar: {
          headline: 'خطوبتنا فرحة تجمعنا',
          phrase: 'هنستناكم نشرب الشربات سوا ونفرح بالخطوبة في سهرة جميلة.'
        }
      },
      modern: {
        en: {
          headline: 'Engagement Soirée',
          phrase: 'Join us for music, laughter, and drinks to mark our engagement.'
        },
        ar: {
          headline: 'حفل الخطوبة',
          phrase: 'يلا نفرح سوا بالخطوبة ونقضي ليلة ممتعة مع كل الحبايب.'
        }
      }
    }
  },
  'Katb el-Ketab': {
    id: 'Katb el-Ketab',
    name: { en: 'Katb el-Ketab', ar: 'كتب كتاب' },
    scheduleDefaults: {
      reception: '16:00',
      ceremony: '16:30',
      dinner: '18:30',
      party: '19:30'
    },
    recommendedDesigns: ['oud', 'ivory', 'ramla'],
    copyPresets: {
      formal: {
        en: {
          headline: 'Katb el-Ketab Ceremony',
          phrase: 'Request your presence as they solidify their holy matrimony contract.'
        },
        ar: {
          headline: 'مراسم كتب الكتاب',
          phrase: 'يتشرفون بدعوتكم لحضور عقد قرانهم المبارك وإتمام سنة الله ورسوله.'
        }
      },
      warm: {
        en: {
          headline: 'Marriage Contract Ceremony',
          phrase: 'Join us for a blessed gathering to celebrate our matrimony.'
        },
        ar: {
          headline: 'عقد قران مبارك',
          phrase: 'مستنيينكم تشهدوا على عقد قراننا وتشاركونا الدعوات والمباركات.'
        }
      },
      modern: {
        en: {
          headline: 'Matrimony Contract',
          phrase: 'Celebrating our holy matrimony ceremony surrounded by loved ones.'
        },
        ar: {
          headline: 'كتب الكتاب',
          phrase: 'لحظة الفرحة الكبيرة - شاركونا كتب كتابنا والاحتفال برحلتنا.'
        }
      }
    }
  },
  'Henna night': {
    id: 'Henna night',
    name: { en: 'Henna Night', ar: 'ليلة الحنة' },
    scheduleDefaults: {
      reception: '19:00',
      ceremony: '19:30',
      dinner: '21:00',
      party: '22:00'
    },
    recommendedDesigns: ['oud', 'zaffa'],
    copyPresets: {
      formal: {
        en: {
          headline: 'Bespoke Henna Night',
          phrase: 'Invite you to share in the joyful traditions of Henna Night.'
        },
        ar: {
          headline: 'ليلة الحنة السعيدة',
          phrase: 'يتشرفون بدعوتكم لحضور ليلة الحنة المباركة والأجواء التراثية.'
        }
      },
      warm: {
        en: {
          headline: 'Traditional Henna Soirée',
          phrase: 'Let’s dance and celebrate Henna Night with music and joy!'
        },
        ar: {
          headline: 'حنة وغنا وفرحة',
          phrase: 'تعالوا نفرح بالحنة ونرقص ونغني في ليلة استثنائية مش هتتنسى.'
        }
      },
      modern: {
        en: {
          headline: 'Henna Celebration',
          phrase: 'Celebrating Henna Night with our absolute favorite people.'
        },
        ar: {
          headline: 'ليلة الحنة',
          phrase: 'أجواء الحنة والبهجة مستنياكم - تعالوا نقضي أحلى ليلة.'
        }
      }
    }
  },
  Sebou: {
    id: 'Sebou',
    name: { en: 'Newborn Sebou', ar: 'سبوع المولود' },
    scheduleDefaults: {
      reception: '15:00',
      ceremony: '15:30',
      dinner: '17:30',
      party: '18:30'
    },
    recommendedDesigns: ['botanical', 'ivory'],
    copyPresets: {
      formal: {
        en: {
          headline: 'Newborn Blessing Ceremony',
          phrase: 'Request your joyful presence to welcome their newborn angel.'
        },
        ar: {
          headline: 'حفل سبوع المولود المبارك',
          phrase: 'يتشرفون بدعوتكم لمشاركتهم فرحة استقبال مولودهم الجديد.'
        }
      },
      warm: {
        en: {
          headline: 'Welcoming Our Baby',
          phrase: 'Join us to sprinkle blessings and celebrate our little miracle.'
        },
        ar: {
          headline: 'سبوع غالي ونور دنيتنا',
          phrase: 'تعالوا دقوا الهون ودقوا الشموع ونوروا سبوع حبيبنا الصغير.'
        }
      },
      modern: {
        en: {
          headline: 'Baby Arrival Gathering',
          phrase: 'Celebrating our baby arrival with intimate tea and treats.'
        },
        ar: {
          headline: 'سبوع المولود',
          phrase: 'نور جديد دخل حياتنا - مستنيينكم تحتفلوا معانا بسبوع النونو.'
        }
      }
    }
  }
};
