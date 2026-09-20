import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { getInvitation } from '../lib/supabase';
import { InvitationRenderer, getTemplate, sampleData } from '../vael-atelier';

export default function InvitationGuestPage({ slug }) {
  const { isAr } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [invitation, setInvitation] = useState(null);

  const fetchInvitationData = async () => {
    setLoading(true);
    setErrorMsg('');
    setIsExpired(false);

    try {
      const inv = await getInvitation(slug);
      if (!inv || (!inv.config && !inv.templateId)) {
        setErrorMsg(isAr ? 'لم يتم العثور على الدعوة المطلوبة.' : 'Invitation not found.');
        return;
      }

      if (inv.expires_at) {
        const expireTime = new Date(inv.expires_at).getTime();
        if (Date.now() > expireTime) {
          setIsExpired(true);
          return;
        }
      }

      setInvitation(inv);

      const cfg = inv.config || {};
      const name1 = cfg.data?.names?.partnerOne || cfg.name1 || 'Karim';
      const name2 = cfg.data?.names?.partnerTwo || cfg.name2 || 'Nour';
      document.title = isAr ? `${name1} و ${name2} — دعوة` : `${name1} & ${name2} — Invitation`;
    } catch (err) {
      setErrorMsg(err.message || (isAr ? 'حدث خطأ أثناء تحميل الدعوة.' : 'Failed to load invitation.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    fetchInvitationData();

    return () => {
      document.title = 'VAEL Studio';
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, [slug, isAr]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center select-none font-mono text-xs text-zinc-400">
        <div className="animate-pulse tracking-widest uppercase">
          {isAr ? 'جاري تحميل الدعوة...' : 'Loading invitation...'}
        </div>
      </div>
    );
  }

  // Expired State
  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center select-none space-y-6">
        <h1 className="font-display text-4xl font-light text-zinc-300">
          {isAr ? 'انتهت صلاحية هذه الدعوة' : 'This invitation has expired'}
        </h1>
        <p className="text-zinc-500 text-sm max-w-sm">
          {isAr
            ? 'مضت فترة الفعالية المحددة لهذه الدعوة ولم تعد متاحة للعرض.'
            : 'The ceremonial period for this invitation has concluded.'}
        </p>
        <a
          href="/"
          className="px-8 py-3 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors"
        >
          {isAr ? 'الرئيسية' : 'Back home'}
        </a>
      </div>
    );
  }

  // Error State
  if (errorMsg || !invitation) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center select-none space-y-6">
        <h1 className="font-display text-3xl font-light">
          {isAr ? 'الدعوة غير موجودة' : 'Invitation Not Found'}
        </h1>
        <p className="text-zinc-400 text-sm max-w-sm">{errorMsg}</p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={fetchInvitationData}
            className="px-8 py-3 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors"
          >
            {isAr ? 'إعادة المحاولة' : 'Retry'}
          </button>
          <a
            href="/"
            className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-xs hover:bg-white hover:text-black transition-colors"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </a>
        </div>
      </div>
    );
  }

  const cfg = invitation.config || {};
  let templateId = cfg.templateId || cfg.template || invitation.templateId;
  if (!templateId || templateId === 'ivory') templateId = 'ivory-ceremony';
  if (templateId === 'noir') templateId = 'noir-evening';
  if (templateId === 'oud') templateId = 'oud-garden';

  const template = getTemplate(templateId) || getTemplate('ivory-ceremony');

  let data = cfg.data;
  if (!data) {
    data = sampleData(isAr ? 'ar' : 'en');
    if (cfg.name1 || cfg.name2) {
      data.names = {
        partnerOne: cfg.name1 || '',
        partnerTwo: cfg.name2 || '',
        connector: isAr ? 'و' : '&'
      };
    }
    if (cfg.date) {
      data.date = { value: cfg.date, showWeekday: true };
    }
    if (cfg.time) {
      data.time = { value: cfg.time, label: isAr ? 'الوقت' : 'Ceremony at' };
    }
    if (cfg.venueName || cfg.city) {
      data.venue = { name: cfg.venueName || '', address: cfg.city || '' };
    }
    if (cfg.mapUrl) {
      data.map = { url: cfg.mapUrl, label: isAr ? 'رابط الخريطة' : 'View map' };
    }
    if (cfg.whatsapp) {
      data.rsvp = {
        href: `https://wa.me/${cfg.whatsapp.replace(/[^\d+]/g, '')}`,
        label: isAr ? 'تأكيد الحضور' : 'Confirm Attendance',
        deadline: ''
      };
    }
    if (cfg.message) {
      data.message = { text: cfg.message };
    }
    if (cfg.photoUrl) {
      data.photo = { src: cfg.photoUrl, alt: 'Photo', shape: 'arch' };
    }
  }

  const blocks = cfg.blocks;

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-center items-center py-12 px-4 selection:bg-amber-500/20">
      <div className="w-full max-w-[540px]">
        <InvitationRenderer
          template={template}
          blocks={blocks}
          data={data}
          locale={isAr ? 'ar' : 'en'}
          showPlaceholders={false}
          motion="reveal"
        />
      </div>
    </div>
  );
}
