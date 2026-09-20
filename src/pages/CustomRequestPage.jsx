import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { INVITATION_TEMPLATES, getTemplateById } from '../data/invitationTemplates';
import { getTemplate } from '../vael-atelier';
import InvitationCard from '../components/InvitationCard';
import { 
  Sparkles, 
  Send, 
  Copy, 
  CheckCircle2, 
  MessageCircle, 
  Music, 
  Image as ImageIcon, 
  MapPin, 
  Users, 
  Globe, 
  ShieldCheck, 
  PenTool, 
  Check, 
  ChevronDown,
  Clock,
  Compass,
  Star
} from 'lucide-react';

export default function CustomRequestPage() {
  const { isAr } = useLanguage();

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'anwarmousa100@gmail.com';
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201144162459';

  const [requestedTemplate, setRequestedTemplate] = useState(null);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [occasion, setOccasion] = useState('');
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
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Available custom feature add-ons
  const FEATURE_OPTIONS = [
    {
      id: 'custom-monogram',
      icon: PenTool,
      label: { en: 'Bespoke Monogram & Crest', ar: 'شعار ومونوغرام مخصص للعروسين' },
      desc: { en: 'Hand-crafted initials or family emblem', ar: 'تصميم الحروف والمونوغرام الخاص بكما' }
    },
    {
      id: 'custom-music',
      icon: Music,
      label: { en: 'Custom Music & Audio Track', ar: 'موسيقى وأغنية خاصة' },
      desc: { en: 'Background melody that plays upon entrance', ar: 'تشغيل مقطع موسيقي أو أغنية عند الدخول' }
    },
    {
      id: 'photo-gallery',
      icon: ImageIcon,
      label: { en: 'Photo & Video Story Gallery', ar: 'معرض الصور والذكريات' },
      desc: { en: 'Interactive portrait gallery & memory timeline', ar: 'عرض ألبوم الصور واللحظات المميزة' }
    },
    {
      id: 'map-navigation',
      icon: MapPin,
      label: { en: 'Interactive Venue Navigation', ar: 'خريطة تفاعلية للوصول للقاعة' },
      desc: { en: 'Direct Google Maps integration & directions', ar: 'ربط مباشر بخرائط جوجل وموقع الحفل' }
    },
    {
      id: 'rsvp-management',
      icon: Users,
      label: { en: 'VIP Guest List & Instant RSVP', ar: 'تأكيد الحضور وإدارة الضيوف' },
      desc: { en: 'Count responses & meal choices effortlessly', ar: 'استلام تأكيدات الحضور وعدد المرافقين' }
    },
    {
      id: 'custom-domain',
      icon: Globe,
      label: { en: 'Custom Domain (e.g., name.com)', ar: 'دومين مخصص (رابط خاص)' },
      desc: { en: 'Unique vanity URL for your celebration', ar: 'رابط خاص يحمل اسمكما مباشرة' }
    },
    {
      id: 'passcode-protection',
      icon: ShieldCheck,
      label: { en: 'Private Passcode Protection', ar: 'رمز حماية خاص للضيوف' },
      desc: { en: 'Restricted access for invited guests only', ar: 'دخول محمي بكود للمدعوين فقط' }
    }
  ];

  // Sync state with URL template and templateName parameters
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const urlParamTemplate = search.get('template');
    const templateName = search.get('templateName');

    if (urlParamTemplate) {
      const tmpl = getTemplateById(urlParamTemplate) || getTemplate(urlParamTemplate);
      if (tmpl) {
        setRequestedTemplate(tmpl);
        setOccasion(tmpl.category === 'wedding' ? (isAr ? 'زفاف' : 'Wedding') : (isAr ? 'خطوبة' : 'Engagement'));
      } else {
        const name = templateName || urlParamTemplate;
        setRequestedTemplate({
          id: urlParamTemplate,
          name: { en: name, ar: name },
          category: 'wedding',
          layout: 'editorial',
          access: 'premium',
          description: { en: '', ar: '' },
          theme: 'ivory',
          badge: 'Premium Atelier'
        });
      }
    }
  }, [isAr]);

  // Update details automatically when requestedTemplate or selectedFeatures change if user hasn't overwritten heavily
  useEffect(() => {
    const featureLabels = FEATURE_OPTIONS
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => (isAr ? f.label.ar : f.label.en));

    let autoText = '';
    if (requestedTemplate) {
      const tmplName = isAr ? requestedTemplate.name.ar : requestedTemplate.name.en;
      autoText = isAr
        ? `أود طلب تصميم مخصص قائم على قالب "${tmplName}".\nالمميزات المطلوبة:\n• ${featureLabels.join('\n• ')}`
        : `I would like to request a custom design based on the "${tmplName}" template.\nDesired features:\n• ${featureLabels.join('\n• ')}`;
    } else {
      autoText = isAr
        ? `أود تصميم موقع مخصص بالكامل لمناسبتنا.\nالمميزات المطلوبة:\n• ${featureLabels.join('\n• ')}`
        : `I would like to commission a completely custom bespoke website for our event.\nDesired features:\n• ${featureLabels.join('\n• ')}`;
    }

    setDetails(autoText);
  }, [requestedTemplate, selectedFeatures, isAr]);

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };

  const handleSelectTemplate = (tmpl) => {
    setRequestedTemplate(tmpl);
    if (tmpl) {
      setOccasion(tmpl.category === 'wedding' ? (isAr ? 'زفاف' : 'Wedding') : (isAr ? 'خطوبة' : 'Engagement'));
      const newUrl = `${window.location.pathname}?template=${tmpl.id}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    } else {
      const newUrl = window.location.pathname;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
    setShowTemplateSelector(false);
  };

  const buildFormattedMessage = () => {
    const lines = [];

    if (requestedTemplate) {
      lines.push(isAr ? `[طلب تصميم قالب مخصص: ${requestedTemplate.name.ar}]` : `[Requested Design: ${requestedTemplate.name.en}]`);
    } else {
      lines.push(isAr ? '[طلب تصميم موقع مخصص بالكامل — VAEL Atelier]' : '[Commission Bespoke Website — VAEL Atelier]');
    }
    lines.push('');

    if (name.trim()) {
      lines.push(isAr ? `الاسم: ${name.trim()}` : `Name: ${name.trim()}`);
    }
    if (occasion.trim()) {
      lines.push(isAr ? `المناسبة: ${occasion.trim()}` : `Occasion: ${occasion.trim()}`);
    }
    if (desiredDate.trim()) {
      lines.push(isAr ? `التاريخ المطلوب: ${desiredDate.trim()}` : `Desired Date: ${desiredDate.trim()}`);
    }
    if (contactInfo.trim()) {
      lines.push(isAr ? `طريقة التواصل: ${contactInfo.trim()}` : `Contact Info: ${contactInfo.trim()}`);
    }
    if (details.trim()) {
      lines.push('');
      lines.push(isAr ? `تفاصيل الفكرة:\n${details.trim()}` : `Project Vision:\n${details.trim()}`);
    }

    return lines.join('\n');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!details.trim()) {
      setValidationError(isAr ? 'يرجى كتابة تفاصيل ما تفكر به.' : 'Please describe what you have in mind.');
      return;
    }
    if (!contactInfo.trim()) {
      setValidationError(isAr ? 'يرجى إدخال طريقة التواصل (إيميل أو واتساب).' : 'Please provide how to reach you (email or WhatsApp).');
      return;
    }

    const messageBody = buildFormattedMessage();
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      requestedTemplate
        ? `VAEL — Custom Request (${requestedTemplate.name.en})`
        : 'VAEL — Bespoke Atelier Request'
    )}&body=${encodeURIComponent(messageBody)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyMessage = () => {
    setValidationError('');
    if (!details.trim() || !contactInfo.trim()) {
      setValidationError(isAr ? 'يرجى إكمال الحقول المطلوبة قبل النسخ.' : 'Please fill required fields before copying.');
      return;
    }

    const messageBody = buildFormattedMessage();
    navigator.clipboard.writeText(messageBody);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#040406] text-white flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-600/10 via-amber-400/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-36 pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-widest uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'استوديو التصميم المخصص' : 'Bespoke Design Atelier'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-none text-white">
            {requestedTemplate ? (
              isAr ? (
                <>طلب تصميم <span className="font-serif italic text-amber-200">{requestedTemplate.name.ar}</span></>
              ) : (
                <>Commission <span className="font-serif italic text-amber-200">{requestedTemplate.name.en}</span></>
              )
            ) : (
              isAr ? (
                <>تصميم موقع <span className="font-serif italic text-amber-200">خاص لمناسبتك</span></>
              ) : (
                <>Commission a <span className="font-serif italic text-amber-200">Bespoke Experience</span></>
              )
            )}
          </h1>

          <p className="text-zinc-400 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'موقع متفصّل بالكامل على شخصيتك ولحظتك الخاصة. اختر القالب، عدّل التفاصيل والمميزات، وسيتولى فريقنا الفني تحويلها إلى واقع سينمائي.'
              : 'A digital invitation crafted specifically for your moment. Select a base design, tailor custom features, and our studio will bring your vision to life.'}
          </p>
        </div>

        {/* REQUESTED TEMPLATE HERO CARD & SELECTOR */}
        <div className="mb-12 rounded-3xl bg-[#090A0F]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            
            {/* Live Template Card Preview */}
            <div className="w-full md:w-72 shrink-0 flex flex-col items-center">
              <div className="w-full h-72 rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group bg-black/40">
                <InvitationCard
                  config={{
                    design: requestedTemplate ? requestedTemplate.theme : 'ivory',
                    templateId: requestedTemplate ? requestedTemplate.id : 'the-monogram',
                    occasion: 'Wedding',
                    name1: isAr ? 'كريم' : 'Karim',
                    name2: isAr ? 'نور' : 'Nour',
                    date: '2026-11-14',
                    time: '19:00',
                    venueName: isAr ? 'قصر النخيل' : 'Al Nakheel Palace',
                    city: isAr ? 'القاهرة الجديدة' : 'New Cairo',
                    language: 'both'
                  }}
                  compact={true}
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 mt-2 flex items-center gap-1">
                <Compass className="w-3 h-3 text-amber-400" />
                {isAr ? 'معاينة حية للقالب المختار' : 'Live Interactive Preview'}
              </span>
            </div>

            {/* Template Info & Selector */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400/20" />
                    {requestedTemplate ? (isAr ? 'القالب التحريري المحدد' : 'Selected Base Design') : (isAr ? 'اختر قالبك المفضل' : 'Choose Base Design')}
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-zinc-300 hover:text-white hover:border-amber-400/50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isAr ? 'تغيير القالب' : 'Change Template'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTemplateSelector ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown / Grid of Templates */}
                {showTemplateSelector ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4 p-3 bg-black/60 rounded-2xl border border-white/10 max-h-60 overflow-y-auto custom-scrollbar">
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate(null)}
                      className={`p-2.5 rounded-xl text-right text-xs transition-all border ${
                        !requestedTemplate
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold">{isAr ? 'رؤية خاصة مخصصة بالكامل' : 'Pure Custom Concept'}</div>
                      <div className="text-[10px] opacity-75">{isAr ? 'بدون قالب مسبق' : 'Bespoke design from scratch'}</div>
                    </button>

                    {INVITATION_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tmpl)}
                        className={`p-2.5 rounded-xl text-right text-xs transition-all border ${
                          requestedTemplate?.id === tmpl.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                            : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-semibold">{isAr ? tmpl.name.ar : tmpl.name.en}</div>
                        <div className="text-[10px] text-zinc-400 capitalize">{tmpl.layout} • {tmpl.access}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h2 className="font-serif text-3xl font-normal text-white mb-2">
                      {requestedTemplate ? (isAr ? requestedTemplate.name.ar : requestedTemplate.name.en) : (isAr ? 'تصميم خاص فريد' : 'Pure Bespoke Commission')}
                    </h2>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed mb-4">
                      {requestedTemplate
                        ? (isAr ? requestedTemplate.description.ar : requestedTemplate.description.en)
                        : (isAr ? 'تصميم موقع إلكتروني مخصص من الصفر يناسب ذوقك وتفاصيل حديقة مناسبتك بالكامل.' : 'A custom-built digital Atelier experience tailored to your exact story and aesthetic.')}
                    </p>
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {requestedTemplate?.badge || 'Premium Atelier'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {requestedTemplate ? `${requestedTemplate.layout} layout` : 'Bespoke layout'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    48h Atelier Delivery
                  </span>
                </div>
              </div>

              {/* Quick Info Strip */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {isAr ? 'التسليم: ٤٨ ساعة' : 'Turnaround: 48 Hours'}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'دعم فني وتعديلات مخصصة' : 'Direct Studio Support'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* CUSTOM FEATURE SELECTION CHECKLIST */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-widest text-amber-300/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'المميزات الإضافية والتخصيص' : 'Select Custom Features'}</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              {selectedFeatures.length} {isAr ? 'محددة' : 'selected'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURE_OPTIONS.map((feat) => {
              const isSelected = selectedFeatures.includes(feat.id);
              const IconComp = feat.icon;

              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                      : 'bg-[#090A0E] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {isAr ? feat.label.ar : feat.label.en}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                      {isAr ? feat.desc.ar : feat.desc.en}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* INQUIRY FORM */}
        <form onSubmit={handleSendEmail} className="space-y-8 bg-[#090A0F] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl relative">
          
          <div className="border-b border-white/10 pb-4 mb-2">
            <h3 className="font-serif text-2xl font-normal text-white">
              {isAr ? 'تفاصيل الطلب والتواصل' : 'Inquiry & Contact Details'}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              {isAr ? 'سيتم إرسال الطلب مباشرة للفريق الفني عبر الواتساب أو الإيميل.' : 'Your customized inquiry is ready to send directly to our atelier team.'}
            </p>
          </div>

          {/* YOUR NAME (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
              {isAr ? 'الاسم أو أسماء العروسين (اختياري)' : 'Your Name / Couple Names (optional)'}
            </label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? 'مثال: كريم ونور' : 'e.g., Karim & Nour'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          {/* PROJECT VISION & DETAILS (Required) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-amber-300 block flex justify-between">
              <span>{isAr ? 'تفاصيل الرؤية والملاحظات (مطلوب)' : 'Project Vision & Notes (required)'}</span>
              <span className="text-[10px] text-zinc-500 font-sans">
                {details.length}/1000
              </span>
            </label>
            <textarea
              required
              maxLength={1000}
              rows={6}
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder={isAr ? 'صف لنا رؤيتك، الأغنية المفضلة، ألوان الديكور، أو أي طلب خاص...' : 'Describe your custom website vision, audio choice, aesthetic preferences...'}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors resize-none leading-relaxed font-sans"
            />
          </div>

          {/* OCCASION & DESIRED DATE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'المناسبة (اختياري)' : 'Occasion (optional)'}
              </label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder={isAr ? 'مثال: حفل زفاف، خطوبة، خطوبة بالخارج...' : 'e.g., Wedding, Engagement, Private Anniversary'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'التاريخ المطلوب (اختياري)' : 'Desired Date (optional)'}
              </label>
              <input
                type="text"
                value={desiredDate}
                onChange={(e) => setDesiredDate(e.target.value)}
                placeholder={isAr ? 'مثال: 14 نوفمبر 2026' : 'e.g., November 14, 2026'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* HOW TO REACH YOU (Required: Email or WhatsApp) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-amber-300 block">
              {isAr ? 'طريقة التواصل: رقم الواتساب أو الإيميل (مطلوب)' : 'Contact details: WhatsApp number or Email (required)'}
            </label>
            <input
              required
              type="text"
              name="contact"
              autoComplete="email tel"
              inputMode="text"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder={isAr ? '01123456789 أو name@example.com' : '+201123456789 or name@example.com'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors font-mono"
            />
          </div>

          {validationError && (
            <p className="text-xs text-red-400 font-mono text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
              {validationError}
            </p>
          )}

          {/* Zero-Storage Notice */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'خصوصية تامة 100%' : '100% Privacy Guarantee'}</span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              {isAr
                ? 'لا يتم حفظ أي معلومات في داتابيز. يتم توجيه الطلب مباشرة للاستوديو عبر الواتساب أو البريد.'
                : 'Zero database storage notice: Your request is dispatched directly via secure email/WhatsApp.'}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-2 space-y-4">
            
            {/* WHATSAPP DIRECT ACTION (PRIMARY) */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildFormattedMessage() || (isAr ? 'مرحباً VAEL، حابب أطلب موقع خاص' : 'Hello VAEL, I would like to inquire about a custom website'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm text-center shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>{isAr ? 'إرسال الطلب فوراً عبر الواتساب ↗' : 'Send Inquiry via WhatsApp ↗'}</span>
            </a>

            {/* EMAIL AND COPY BUTTONS (SECONDARY) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'إرسال عبر البريد الإلكتروني' : 'Send via Email'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedMessage ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMessage ? (isAr ? 'تم نسخ نص الطلب!' : 'Request Copied!') : (isAr ? 'نسخ نص الطلب' : 'Copy Request Text')}</span>
              </button>
            </div>

            {/* Direct Studio Email */}
            <div className="text-center pt-2">
              <span className="text-xs font-mono text-zinc-400">
                {isAr ? 'أو تواصل مباشرة معنا عبر البريد: ' : 'Or email our team directly: '}
                <a href={`mailto:${contactEmail}`} className="text-amber-200 underline underline-offset-4 hover:text-white select-all">{contactEmail}</a>
              </span>
            </div>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
}
