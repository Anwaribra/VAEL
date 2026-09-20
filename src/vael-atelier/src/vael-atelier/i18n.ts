import type { BlockType, Locale, TemplateFeature } from "./types";

export interface Strings {
  /* collection */
  collectionTitle: string;
  collectionSubtitle: string;
  free: string;
  premium: string;
  freeDesign: string;
  premiumDesign: string;
  previewDesign: string;
  useDesign: string;
  requestDesign: string;
  close: string;
  replay: string;
  previous: string;
  next: string;
  carouselLabel: string;
  indexLabel: string;
  slideLabel: (index: number, total: number, name: string) => string;
  showDesign: (name: string) => string;
  drawerFreeNote: string;
  drawerPremiumNote: string;
  includes: string;
  featureNames: Record<TemplateFeature, string>;
  /* builder */
  builderLabel: string;
  elements: string;
  elementsHint: string;
  yourInvitation: string;
  structureLabel: string;
  dropAtEnd: string;
  allPlaced: string;
  addBlock: (name: string) => string;
  dragBlock: (name: string) => string;
  keyboardHint: string;
  edit: string;
  moveUp: string;
  moveDown: string;
  hide: string;
  show: string;
  remove: string;
  hiddenTag: string;
  previewInvitation: string;
  design: string;
  block: string;
  selectBlockPrompt: string;
  blockNames: Record<BlockType, string>;
  designHeading: string;
  designFree: string;
  designPremium: string;
  designPremiumNote: string;
  currentDesign: string;
  changeDesign: string;
  previewSheetLabel: string;
  inspectorSheetLabel: string;
  stageEmpty: string;
  fields: {
    partnerOne: string;
    connector: string;
    partnerTwo: string;
    text: string;
    date: string;
    showWeekday: string;
    time: string;
    timeLabel: string;
    venueName: string;
    address: string;
    mapUrl: string;
    mapLabel: string;
    message: string;
    photoUpload: string;
    photoReplace: string;
    photoRemove: string;
    photoAlt: string;
    photoShape: string;
    shapes: { arch: string; rectangle: string; oval: string };
    rsvpLabel: string;
    rsvpDeadline: string;
    rsvpHref: string;
    markText: string;
  };
  placeholders: {
    names: string;
    text: string;
    date: string;
    time: string;
    venue: string;
    map: string;
    photo: string;
    rsvp: string;
  };
  status: {
    added: (name: string, where: string) => string;
    moved: (name: string, where: string) => string;
    removed: (name: string) => string;
    hidden: (name: string) => string;
    shown: (name: string) => string;
    template: (name: string) => string;
    photoError: string;
    photoUpdated: string;
  };
  where: {
    top: string;
    end: string;
    between: (a: string, b: string) => string;
  };
  dnd: {
    pickedUp: (name: string) => string;
    overTarget: (name: string, target: string) => string;
    dropped: (name: string) => string;
    cancelled: (name: string) => string;
    instructions: string;
  };
}

const en: Strings = {
  collectionTitle: "The collection",
  collectionSubtitle: "Begin with a visual language. Everything else can change.",
  free: "Free",
  premium: "Premium",
  freeDesign: "Free design",
  premiumDesign: "Premium design",
  previewDesign: "Preview design",
  useDesign: "Use this design",
  requestDesign: "Request this design",
  close: "Close",
  replay: "Replay the opening",
  previous: "Previous design",
  next: "Next design",
  carouselLabel: "Invitation designs",
  indexLabel: "All designs",
  slideLabel: (i, n, name) => `${name}, design ${i} of ${n}`,
  showDesign: (name) => `Show ${name}`,
  drawerFreeNote: "Free to use. It opens in the builder with this design already applied.",
  drawerPremiumNote:
    "Premium designs are made to order. Send a request and we will get back to you.",
  includes: "Includes",
  featureNames: {
    seal: "a seal",
    map: "a map link",
    rsvp: "RSVP",
    photo: "a photo",
    message: "a personal message",
    curtain: "an opening curtain",
    "animated-background": "moving light",
  },
  builderLabel: "Invitation builder",
  elements: "Elements",
  elementsHint: "Drag an element onto the invitation, or press Add.",
  yourInvitation: "Your invitation",
  structureLabel: "Invitation structure",
  dropAtEnd: "Drop here to add at the end",
  allPlaced: "Every element is already on your invitation.",
  addBlock: (n) => `Add ${n}`,
  dragBlock: (n) => `Drag ${n}`,
  keyboardHint:
    "Alt with the up or down arrow moves the selected element. Delete removes it.",
  edit: "Edit",
  moveUp: "Move up",
  moveDown: "Move down",
  hide: "Hide",
  show: "Show",
  remove: "Remove",
  hiddenTag: "Hidden",
  previewInvitation: "Preview invitation",
  design: "Design",
  block: "Element",
  selectBlockPrompt: "Select an element to edit it.",
  blockNames: {
    names: "Names",
    "invitation-line": "Invitation line",
    date: "Date",
    time: "Time",
    venue: "Venue",
    map: "Map link",
    message: "Message",
    photo: "Photo",
    rsvp: "RSVP",
    "vael-mark": "VAEL signature",
  },
  designHeading: "Choose a design",
  designFree: "Free",
  designPremium: "Premium",
  designPremiumNote: "Premium designs open a preview and can be requested.",
  currentDesign: "Current design",
  changeDesign: "Change design",
  previewSheetLabel: "Invitation preview",
  inspectorSheetLabel: "Edit invitation",
  stageEmpty: "Add an element to begin.",
  fields: {
    partnerOne: "First name",
    connector: "Between the names",
    partnerTwo: "Second name",
    text: "Text",
    date: "Date",
    showWeekday: "Show the weekday",
    time: "Time",
    timeLabel: "Text before the time",
    venueName: "Venue name",
    address: "Address",
    mapUrl: "Map link",
    mapLabel: "Link text",
    message: "Message",
    photoUpload: "Upload a photo",
    photoReplace: "Replace photo",
    photoRemove: "Remove photo",
    photoAlt: "Description for screen readers",
    photoShape: "Frame",
    shapes: { arch: "Arch", rectangle: "Rectangle", oval: "Oval" },
    rsvpLabel: "Button text",
    rsvpDeadline: "Reply-by note",
    rsvpHref: "Reply link (phone, WhatsApp or web)",
    markText: "Signature text",
  },
  placeholders: {
    names: "Your names",
    text: "Write something here",
    date: "Add a date",
    time: "Add a time",
    venue: "Add a venue",
    map: "Add a map link",
    photo: "Add a photo",
    rsvp: "Reply",
  },
  status: {
    added: (n, w) => `${n} added ${w}.`,
    moved: (n, w) => `${n} moved ${w}.`,
    removed: (n) => `${n} removed. It is back in Elements.`,
    hidden: (n) => `${n} hidden.`,
    shown: (n) => `${n} shown.`,
    template: (n) => `Design changed to ${n}.`,
    photoError: "Choose an image file (JPG, PNG or WebP).",
    photoUpdated: "Photo updated.",
  },
  where: {
    top: "at the top",
    end: "at the end",
    between: (a, b) => `between ${a} and ${b}`,
  },
  dnd: {
    pickedUp: (n) => `Picked up ${n}.`,
    overTarget: (n, t) => `${n} is over ${t}.`,
    dropped: (n) => `${n} dropped.`,
    cancelled: (n) => `Moving ${n} cancelled.`,
    instructions:
      "To pick up an element, press space or enter. Use the arrow keys to move it over the invitation structure, then press space or enter to drop it. Press escape to cancel.",
  },
};

const ar: Strings = {
  collectionTitle: "المجموعة",
  collectionSubtitle: "ابدأ بلغة بصرية. كل شيء آخر يمكن تغييره.",
  free: "مجاني",
  premium: "مميز",
  freeDesign: "تصميم مجاني",
  premiumDesign: "تصميم مميز",
  previewDesign: "معاينة التصميم",
  useDesign: "استخدم هذا التصميم",
  requestDesign: "اطلب هذا التصميم",
  close: "إغلاق",
  replay: "إعادة الافتتاح",
  previous: "التصميم السابق",
  next: "التصميم التالي",
  carouselLabel: "تصاميم الدعوات",
  indexLabel: "كل التصاميم",
  slideLabel: (i, n, name) => `${name}، التصميم ${i} من ${n}`,
  showDesign: (name) => `اعرض ${name}`,
  drawerFreeNote: "مجاني. يفتح في المصمم وقد طُبّق عليه هذا التصميم.",
  drawerPremiumNote: "التصاميم المميزة تُنفَّذ حسب الطلب. أرسل طلبك وسنعود إليك.",
  includes: "يتضمن",
  featureNames: {
    seal: "ختم",
    map: "رابط الخريطة",
    rsvp: "تأكيد الحضور",
    photo: "صورة",
    message: "رسالة شخصية",
    curtain: "ستارة افتتاحية",
    "animated-background": "ضوء متحرك",
  },
  builderLabel: "مصمم الدعوة",
  elements: "العناصر",
  elementsHint: "اسحب عنصرًا إلى الدعوة، أو اضغط إضافة.",
  yourInvitation: "دعوتك",
  structureLabel: "بنية الدعوة",
  dropAtEnd: "أفلت هنا للإضافة في النهاية",
  allPlaced: "كل العناصر موجودة على دعوتك.",
  addBlock: (n) => `أضف ${n}`,
  dragBlock: (n) => `اسحب ${n}`,
  keyboardHint: "مفتاح Alt مع السهم لأعلى أو لأسفل ينقل العنصر المحدد. مفتاح Delete يحذفه.",
  edit: "تعديل",
  moveUp: "نقل لأعلى",
  moveDown: "نقل لأسفل",
  hide: "إخفاء",
  show: "إظهار",
  remove: "حذف",
  hiddenTag: "مخفي",
  previewInvitation: "معاينة الدعوة",
  design: "التصميم",
  block: "العنصر",
  selectBlockPrompt: "اختر عنصرًا لتعديله.",
  blockNames: {
    names: "الأسماء",
    "invitation-line": "جملة الدعوة",
    date: "التاريخ",
    time: "الوقت",
    venue: "المكان",
    map: "رابط الخريطة",
    message: "رسالة",
    photo: "صورة",
    rsvp: "تأكيد الحضور",
    "vael-mark": "توقيع VAEL",
  },
  designHeading: "اختر تصميمًا",
  designFree: "مجاني",
  designPremium: "مميز",
  designPremiumNote: "التصاميم المميزة تفتح معاينة ويمكن طلبها.",
  currentDesign: "التصميم الحالي",
  changeDesign: "تغيير التصميم",
  previewSheetLabel: "معاينة الدعوة",
  inspectorSheetLabel: "تعديل الدعوة",
  stageEmpty: "أضف عنصرًا لتبدأ.",
  fields: {
    partnerOne: "الاسم الأول",
    connector: "بين الاسمين",
    partnerTwo: "الاسم الثاني",
    text: "النص",
    date: "التاريخ",
    showWeekday: "إظهار اليوم",
    time: "الوقت",
    timeLabel: "نص قبل الوقت",
    venueName: "اسم المكان",
    address: "العنوان",
    mapUrl: "رابط الخريطة",
    mapLabel: "نص الرابط",
    message: "الرسالة",
    photoUpload: "ارفع صورة",
    photoReplace: "استبدال الصورة",
    photoRemove: "حذف الصورة",
    photoAlt: "وصف الصورة لقارئ الشاشة",
    photoShape: "الإطار",
    shapes: { arch: "قوس", rectangle: "مستطيل", oval: "بيضاوي" },
    rsvpLabel: "نص الزر",
    rsvpDeadline: "ملاحظة موعد الرد",
    rsvpHref: "رابط الرد (هاتف أو واتساب أو موقع)",
    markText: "نص التوقيع",
  },
  placeholders: {
    names: "الأسماء",
    text: "اكتب هنا",
    date: "أضف تاريخًا",
    time: "أضف وقتًا",
    venue: "أضف مكانًا",
    map: "أضف رابط الخريطة",
    photo: "أضف صورة",
    rsvp: "تأكيد الحضور",
  },
  status: {
    added: (n, w) => `تمت إضافة ${n} ${w}.`,
    moved: (n, w) => `تم نقل ${n} ${w}.`,
    removed: (n) => `تم حذف ${n}. عاد إلى العناصر.`,
    hidden: (n) => `تم إخفاء ${n}.`,
    shown: (n) => `تم إظهار ${n}.`,
    template: (n) => `تم تغيير التصميم إلى ${n}.`,
    photoError: "اختر ملف صورة (JPG أو PNG أو WebP).",
    photoUpdated: "تم تحديث الصورة.",
  },
  where: {
    top: "في الأعلى",
    end: "في النهاية",
    between: (a, b) => `بين ${a} و${b}`,
  },
  dnd: {
    pickedUp: (n) => `تم رفع ${n}.`,
    overTarget: (n, t) => `${n} فوق ${t}.`,
    dropped: (n) => `تم إفلات ${n}.`,
    cancelled: (n) => `تم إلغاء نقل ${n}.`,
    instructions:
      "لرفع عنصر اضغط المسافة أو Enter. استخدم الأسهم لتحريكه فوق بنية الدعوة، ثم اضغط المسافة أو Enter لإفلاته. اضغط Escape للإلغاء.",
  },
};

export const strings: Record<Locale, Strings> = { en, ar };

export function templateText(
  t: { name: string; description: string; i18n?: { ar?: { name?: string; description?: string } } },
  locale: Locale,
): { name: string; description: string } {
  const over = locale === "ar" ? t.i18n?.ar : undefined;
  return { name: over?.name ?? t.name, description: over?.description ?? t.description };
}
