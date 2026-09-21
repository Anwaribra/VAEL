import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CustomRequestPage() {
  const { isAr } = useLanguage();

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'anwarmousa100@gmail.com';
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201144162459';

  const [selectedOccasion, setSelectedOccasion] = useState('wedding');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Selected custom features
  const [selectedFeatures, setSelectedFeatures] = useState([
    'custom-monogram',
    'custom-music',
    'rsvp-management'
  ]);

  const [copiedMessage, setCopiedMessage] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Occasions list
  const OCCASIONS = [
    { id: 'wedding', label: { en: 'WEDDING', ar: 'زفاف وقران' } },
    { id: 'engagement', label: { en: 'ENGAGEMENT', ar: 'خطوبة' } },
    { id: 'celebration', label: { en: 'MILESTONE', ar: 'مناسبة خاصة' } },
    { id: 'heirloom', label: { en: 'HEIRLOOM', ar: 'رسالة ذكرى' } },
    { id: 'bespoke', label: { en: 'PURE BESPOKE', ar: 'تكليف كامل' } },
  ];

  // Available custom feature add-ons
  const FEATURE_OPTIONS = [
    {
      id: 'custom-monogram',
      label: { en: 'Bespoke Monogram & Crest', ar: 'شعار ومونوغرام مخصص' },
      desc: { en: 'Hand-crafted initials or family emblem', ar: 'تصميم الحروف والمونوغرام الخاص بكما' }
    },
    {
      id: 'custom-music',
      label: { en: 'Custom Audio & Music Track', ar: 'موسيقى وأغنية خاصة' },
      desc: { en: 'Ambient melody playing upon entrance', ar: 'تشغيل مقطع موسيقي عند الدخول' }
    },
    {
      id: 'photo-gallery',
      label: { en: 'Spatial Portrait Gallery', ar: 'معرض الصور والذكريات' },
      desc: { en: 'Interactive gallery & portrait timeline', ar: 'عرض ألبوم الصور واللحظات المميزة' }
    },
    {
      id: 'map-navigation',
      label: { en: 'Interactive Venue Mapping', ar: 'خريطة تفاعلية للوصول' },
      desc: { en: 'Direct Google Maps integration', ar: 'ربط مباشر بخرائط جوجل لموقع الحفل' }
    },
    {
      id: 'rsvp-management',
      label: { en: 'VIP RSVP & Guest Management', ar: 'تأكيد الحضور وإدارة الضيوف' },
      desc: { en: 'Count responses & meal choices', ar: 'استلام تأكيدات الحضور والمرافقين' }
    },
    {
      id: 'custom-domain',
      label: { en: 'Custom Vanity URL (name.com)', ar: 'دومين مخصص (رابط خاص)' },
      desc: { en: 'Exclusive domain for your celebration', ar: 'رابط خاص يحمل اسمكما مباشرة' }
    },
    {
      id: 'passcode-protection',
      label: { en: 'Private Passcode Protection', ar: 'رمز حماية خاص للضيوف' },
      desc: { en: 'Restricted access for invited guests', ar: 'دخول محمي بكود للمدعوين فقط' }
    }
  ];

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };

  const buildFormattedMessage = () => {
    const featureLabels = FEATURE_OPTIONS
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => (isAr ? f.label.ar : f.label.en));

    const lines = [
      isAr ? '[طلب تصميم خاص — VAEL Atelier]' : '[Private Commission Brief — VAEL Atelier]',
      '',
      isAr ? `المناسبة: ${OCCASIONS.find(o => o.id === selectedOccasion)?.label.ar}` : `Occasion: ${OCCASIONS.find(o => o.id === selectedOccasion)?.label.en}`,
    ];

    if (name.trim()) {
      lines.push(isAr ? `الاسم: ${name.trim()}` : `Name: ${name.trim()}`);
    }
    if (desiredDate.trim()) {
      lines.push(isAr ? `التاريخ المطلوب: ${desiredDate.trim()}` : `Desired Date: ${desiredDate.trim()}`);
    }
    if (contactInfo.trim()) {
      lines.push(isAr ? `طريقة التواصل: ${contactInfo.trim()}` : `Contact Info: ${contactInfo.trim()}`);
    }
    if (featureLabels.length > 0) {
      lines.push('');
      lines.push(isAr ? `العناصر المطلوبة:\n• ${featureLabels.join('\n• ')}` : `Selected Elements:\n• ${featureLabels.join('\n• ')}`);
    }
    if (details.trim()) {
      lines.push('');
      lines.push(isAr ? `تفاصيل الرؤية:\n${details.trim()}` : `Project Vision:\n${details.trim()}`);
    }

    return lines.join('\n');
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!contactInfo.trim()) {
      setValidationError(isAr ? 'يرجى إدخال طريقة التواصل (إيميل أو واتساب).' : 'Please provide how to reach you (email or WhatsApp).');
      return;
    }

    setIsSubmitting(true);
    const messageBody = buildFormattedMessage();

    try {
      await fetch('https://formsubmit.co/ajax/anwarmousa100@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `VAEL Atelier — Bespoke Commission Inquiry from ${name.trim() || contactInfo.trim()}`,
          clientName: name.trim() || 'Not specified',
          contactInfo: contactInfo.trim(),
          occasion: selectedOccasion,
          desiredDate: desiredDate.trim() || 'Not specified',
          selectedFeatures: selectedFeatures.join(', '),
          visionBrief: details.trim() || 'None provided',
          fullBriefText: messageBody,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Email dispatch error:', err);
      // Fallback to native mailto if network blocked
      const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
        'VAEL — Bespoke Commission Inquiry'
      )}&body=${encodeURIComponent(messageBody)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyMessage = () => {
    setValidationError('');
    if (!contactInfo.trim()) {
      setValidationError(isAr ? 'يرجى إكمال الحقول المطلوبة قبل النسخ.' : 'Please fill required fields before copying.');
      return;
    }

    const messageBody = buildFormattedMessage();
    navigator.clipboard.writeText(messageBody);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F1EEE7] flex flex-col justify-between">
      <Navbar />

      <main className="relative z-10 pt-36 pb-28 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto w-full space-y-16">
        
        {/* Page Header */}
        <div className="space-y-6 border-b border-white/[0.07] pb-12">
          <div className="flex items-center gap-3 text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3]">
            <span>VAEL ATELIER</span>
            <span className="w-8 h-px bg-white/20" />
            <span>{isAr ? 'طلب تصميم خاص' : 'PRIVATE COMMISSION'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F1EEE7] tracking-tight leading-[1.05]">
            {isAr ? (
              <>
                تصميم تجربة <br />
                <span className="font-serif italic text-[#A8A8A3]">خاصة لمناسبتكم.</span>
              </>
            ) : (
              <>
                Commission a <br />
                <span className="font-serif italic text-[#A8A8A3]">Bespoke Experience.</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#8E8E89] font-light max-w-2xl leading-relaxed">
            {isAr
              ? 'موقع رقمي سينمائي متفصّل بالكامل على شخصيتكم ولحظتكم الخاصة. شاركونا التفاصيل وسيقوم فريقنا الفني بصياغتها.'
              : 'A digital invitation crafted specifically for your celebration. Select your key requirements, share your vision, and our studio will orchestrate the experience.'}
          </p>
        </div>

        {/* OCCASION TYPOGRAPHIC SELECTOR */}
        <div className="space-y-6">
          <label className="text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3] block">
            {isAr ? '01 / نوع المناسبة' : '01 / OCCASION TYPE'}
          </label>

          <div className="flex flex-wrap gap-3">
            {OCCASIONS.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`px-5 py-3 rounded-full text-xs font-sans font-light tracking-[0.2em] uppercase transition-colors duration-500 border ${
                    isSelected
                      ? 'bg-[#F1EEE7] text-[#080808] border-[#F1EEE7]'
                      : 'bg-transparent text-[#A8A8A3] border-white/10 hover:border-white/30'
                  }`}
                >
                  {isAr ? occ.label.ar : occ.label.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* CRAFT ELEMENTS SELECTOR */}
        <div className="space-y-6 pt-10 border-t border-white/[0.07]">
          <label className="text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3] block">
            {isAr ? '02 / العناصر الفنية المطلوبة' : '02 / DESIRED CRAFT ELEMENTS'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURE_OPTIONS.map((feat) => {
              const isSelected = selectedFeatures.includes(feat.id);

              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  className={`px-5 py-4 rounded-xl border text-start transition-colors duration-500 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.03] border-white/30 text-[#F1EEE7]'
                      : 'bg-transparent border-white/10 text-[#8E8E89] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-sans font-light tracking-[0.15em] uppercase text-[#F1EEE7]">
                      {isAr ? feat.label.ar : feat.label.en}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-colors ${
                      isSelected ? 'bg-[#F1EEE7]' : 'bg-white/10'
                    }`} />
                  </div>
                  <p className="text-xs text-[#8E8E89] font-light">
                    {isAr ? feat.desc.ar : feat.desc.en}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* COMMISSION QUESTIONNAIRE FORM */}
        <form onSubmit={handleSendEmail} className="space-y-12 pt-10 border-t border-white/[0.07]">
          
          <label className="text-xs font-sans font-light uppercase tracking-[0.2em] text-[#A8A8A3] block">
            {isAr ? '03 / معلومات التكليف والتواصل' : '03 / COMMISSION DETAILS'}
          </label>

          {/* NAME & DATE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-sans font-light uppercase tracking-[0.15em] text-[#A8A8A3] block">
                {isAr ? 'الاسم أو أسماء العروسين' : 'Names / Couple'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isAr ? 'مثال: كريم ونور' : 'e.g., Karim & Nour'}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-[#F1EEE7] placeholder-[#8E8E89]/40 focus:border-white/40 focus:outline-none transition-colors font-sans"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-sans font-light uppercase tracking-[0.15em] text-[#A8A8A3] block">
                {isAr ? 'التاريخ المطلوب' : 'Desired Date'}
              </label>
              <input
                type="text"
                value={desiredDate}
                onChange={(e) => setDesiredDate(e.target.value)}
                placeholder={isAr ? 'مثال: 14 نوفمبر 2026' : 'e.g., November 14, 2026'}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-[#F1EEE7] placeholder-[#8E8E89]/40 focus:border-white/40 focus:outline-none transition-colors font-sans"
              />
            </div>
          </div>

          {/* CONTACT INFO (Required) */}
          <div className="space-y-3">
            <label className="text-xs font-sans font-light uppercase tracking-[0.15em] text-[#A8A8A3] block">
              {isAr ? 'طريقة التواصل: الواتساب أو البريد (مطلوب)' : 'Contact info: WhatsApp or Email (required)'}
            </label>
            <input
              required
              type="text"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder={isAr ? '01123456789 أو name@example.com' : '+201123456789 or name@example.com'}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-[#F1EEE7] placeholder-[#8E8E89]/40 focus:border-white/40 focus:outline-none transition-colors font-sans"
            />
          </div>

          {/* VISION BRIEF TEXTAREA */}
          <div className="space-y-3">
            <label className="text-xs font-sans font-light uppercase tracking-[0.15em] text-[#A8A8A3] block">
              {isAr ? 'ملاحظات الرؤية الفنية (اختياري)' : 'Vision Brief & Notes (optional)'}
            </label>
            <textarea
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={isAr ? 'صف لنا رؤيتك، الموسيقى المفضلة، أو أي تفاصيل خاصة...' : 'Describe your custom vision, music preferences, aesthetic references...'}
              className="w-full bg-white/[0.02] border border-white/10 p-5 rounded-xl text-sm text-[#F1EEE7] placeholder-[#8E8E89]/40 focus:border-white/40 focus:outline-none transition-colors resize-none leading-relaxed font-sans"
            />
          </div>

          {validationError && (
            <p className="text-xs text-red-400 font-sans tracking-wide">
              {validationError}
            </p>
          )}

          {isSubmitted && (
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/20 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#F1EEE7]">
                ✓
              </div>
              <h4 className="font-serif italic text-xl font-light text-[#F1EEE7]">
                {isAr ? 'تم استلام طلب التكليف بنجاح' : 'Commission Brief Received'}
              </h4>
              <p className="text-xs text-[#8E8E89] font-light max-w-md mx-auto">
                {isAr
                  ? `تم إرسال تفاصيل التكليف مباشرة إلى الاستوديو (${contactEmail}). وسنتواصل معكم قريباً.`
                  : `Your inquiry has been dispatched to ${contactEmail}. Our team will review your brief shortly.`}
              </p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full bg-[#F1EEE7] text-[#080808] disabled:opacity-50 font-medium text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-white cursor-pointer disabled:cursor-not-allowed"
            >
              <span>
                {isSubmitting
                  ? (isAr ? 'جاري إرسال التكليف...' : 'SUBMITTING BRIEF...')
                  : (isAr ? 'إرسال التكليف عبر البريد' : 'SUBMIT COMMISSION BRIEF')}
              </span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildFormattedMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-white/20 text-[#F1EEE7] font-medium text-xs font-sans tracking-[0.2em] uppercase text-center transition-colors duration-500 hover:border-white hover:bg-white/5 cursor-pointer"
            >
              <span>{isAr ? 'مراسلة عبر الواتساب →' : 'INQUIRE VIA WHATSAPP →'}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-6 py-4 text-xs font-sans font-light tracking-[0.15em] text-[#8E8E89] hover:text-[#F1EEE7] uppercase transition-colors duration-500 cursor-pointer text-center"
            >
              <span>{copiedMessage ? (isAr ? 'تم النسخ!' : 'COPIED!') : (isAr ? 'نسخ النص' : 'COPY BRIEF')}</span>
            </button>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
}
