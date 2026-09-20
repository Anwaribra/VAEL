import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { INVITATION_DESIGN_PRESETS } from '../data/invitationDesigns';
import InvitationCard from '../components/InvitationCard';
import { songs } from '../data/songs';
import { processPhotoFile } from '../lib/photoProcessor';
import { getInvitation, updateInvitation, deleteInvitation, uploadInvitationPhoto } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ManageInvitationPage({ slug }) {
  const { isAr } = useLanguage();

  // Read edit token ONLY from URL fragment (#token)
  const token = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Form fields
  const [occasion, setOccasion] = useState('Wedding');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [venueName, setVenueName] = useState('');
  const [city, setCity] = useState('');
  const [mapUrlInput, setMapUrlInput] = useState('');
  const [message, setMessage] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [design, setDesign] = useState('ivory');
  const [language, setLanguage] = useState('both');
  const [songId, setSongId] = useState('');
  const [keepOriginalColors, setKeepOriginalColors] = useState(false);

  // Photo
  const [photoBlob, setPhotoBlob] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
  const [existingPhotoPath, setExistingPhotoPath] = useState('');

  // Actions state
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  useEffect(() => {
    if (!slug || !token) {
      setLoading(false);
      setErrorMsg(isAr ? 'رابط التعديل غير مكتمل أو ينقصه رمز الأمان.' : 'Missing edit token fragment in URL.');
      return;
    }

    const fetchConfig = async () => {
      try {
        const inv = await getInvitation(slug);
        if (!inv || !inv.config) {
          setErrorMsg(isAr ? 'لم يتم العثور على الدعوة.' : 'Invitation not found.');
          return;
        }

        const cfg = inv.config;
        setOccasion(cfg.occasion || 'Wedding');
        setName1(cfg.name1 || '');
        setName2(cfg.name2 || '');
        setDate(cfg.date || '');
        setTime(cfg.time || '19:00');
        setVenueName(cfg.venueName || '');
        setCity(cfg.city || '');
        setMapUrlInput(cfg.mapUrl || '');
        setMessage(cfg.message || '');
        setWhatsapp(cfg.whatsapp || '');
        setDesign(cfg.design || 'ivory');
        setLanguage(cfg.language || 'both');
        setSongId(cfg.songId || '');
        setKeepOriginalColors(cfg.keepOriginalColors || false);

        if (cfg.photoUrl) {
          setPhotoPreviewUrl(cfg.photoUrl);
        }
        if (inv.photo_path) {
          setExistingPhotoPath(inv.photo_path);
        }
      } catch (err) {
        setErrorMsg(err.message || (isAr ? 'حدث خطأ أثناء تحميل البيانات.' : 'Error loading invitation.'));
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [slug, token, isAr]);

  const liveConfig = {
    design,
    occasion,
    name1,
    name2,
    date,
    time,
    venueName,
    city,
    mapUrl: mapUrlInput,
    message,
    photoUrl: photoPreviewUrl,
    keepOriginalColors,
    whatsapp,
    language,
    songId
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const processedBlob = await processPhotoFile(file);
      setPhotoBlob(processedBlob);
      const url = URL.createObjectURL(processedBlob);
      setPhotoPreviewUrl(url);
    } catch (err) {
      alert(err.message || (isAr ? 'فشل معالجة الصورة.' : 'Failed to process image.'));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim() || !date || !time) {
      alert(isAr ? 'يرجى إكمال الحقول المطلوبة.' : 'Please fill required fields.');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      let photoPathToSave = existingPhotoPath;
      if (photoBlob) {
        photoPathToSave = await uploadInvitationPhoto(photoBlob);
      } else if (!photoPreviewUrl) {
        photoPathToSave = '';
      }

      const updatedConfig = {
        ...liveConfig,
        photoUrl: photoPreviewUrl
      };

      await updateInvitation(slug, token, updatedConfig, photoPathToSave);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(err.message || (isAr ? 'حدث خطأ أثناء حفظ التغييرات.' : 'Error saving changes.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteInput.trim().toUpperCase() !== 'DELETE' && deleteInput.trim() !== 'مسح') {
      alert(isAr ? 'يرجى كتابة "مسح" لتأكيد الحذف.' : 'Please type "DELETE" to confirm.');
      return;
    }

    setIsDeleting(true);

    try {
      await deleteInvitation(slug, token);

      // Clear local storage if matching slug
      try {
        const stored = localStorage.getItem('vael_my_invitation');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.slug === slug) {
            localStorage.removeItem('vael_my_invitation');
          }
        }
      } catch {
        // ignore
      }

      window.location.href = '/';
    } catch (err) {
      alert(err.message || (isAr ? 'حدث خطأ أثناء الحذف.' : 'Error deleting invitation.'));
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
        <Navbar />
        <main className="pt-36 pb-20 text-center font-mono text-xs text-zinc-400">
          {isAr ? 'جاري التحميل...' : 'Loading invitation details...'}
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between select-none">
        <Navbar />
        <main className="pt-36 pb-20 px-6 max-w-lg mx-auto text-center space-y-6">
          <h1 className="font-display text-3xl font-light">{isAr ? 'خطأ في الوصول' : 'Access Error'}</h1>
          <p className="text-zinc-400 font-light text-sm">{errorMsg}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors"
          >
            {isAr ? 'العودة للرئيسية' : 'Return home'}
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full select-none">
        
        <div className="mb-10 text-center sm:text-start max-w-2xl">
          <h1 className="font-display text-3xl sm:text-5xl font-light">
            {isAr ? 'تعديل دعوتك' : 'Edit your invitation'}
          </h1>
          <p className="text-zinc-400 font-light text-sm sm:text-base mt-2">
            {isAr ? 'قم بتحديث أي من بيانات الدعوة وحفظ التغييرات مباشرة.' : 'Update any details below and save your changes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Column */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-10">
            
            {/* INVITATION CARD LANGUAGE */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                  {isAr ? 'لغة بطاقة الدعوة' : 'Invitation Card Language'}
                </label>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {language === 'both' ? (isAr ? 'ثنائي اللغة' : 'Bilingual') : language === 'ar' ? (isAr ? 'عربي' : 'Arabic') : (isAr ? 'إنجليزي' : 'English')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-center font-medium ${
                    language === 'ar'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {isAr ? 'عربي' : 'Arabic'}
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-center font-medium ${
                    language === 'en'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  English
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('both')}
                  className={`py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-center font-medium ${
                    language === 'both'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {isAr ? 'كلاهما' : 'Both'}
                </button>
              </div>
            </div>

            {/* TYPE */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'نوع المناسبة' : 'Occasion Type'}
              </label>
              <div className="flex items-center gap-6 font-medium text-sm">
                <button
                  type="button"
                  onClick={() => setOccasion('Wedding')}
                  className={`py-1 transition-colors ${occasion === 'Wedding' ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {isAr ? 'فرح (Wedding)' : 'Wedding'}
                </button>
                <button
                  type="button"
                  onClick={() => setOccasion('Engagement')}
                  className={`py-1 transition-colors ${occasion === 'Engagement' ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {isAr ? 'خطوبة (Engagement)' : 'Engagement'}
                </button>
              </div>
            </div>

            {/* NAMES */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'الأسماء' : 'Names'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  maxLength={40}
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder={isAr ? 'الاسم الأول' : 'First Name'}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
                <input
                  type="text"
                  maxLength={40}
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder={isAr ? 'الاسم الثاني' : 'Second Name'}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
              </div>
            </div>

            {/* DATE & TIME */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'التاريخ والوقت' : 'Date & Time'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
              </div>
            </div>

            {/* VENUE & MAP */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'المكان والخريطة' : 'Venue & Map'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  maxLength={80}
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder={isAr ? 'اسم المكان' : 'Venue Name'}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={isAr ? 'المدينة' : 'City'}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                />
              </div>
              <input
                type="url"
                value={mapUrlInput}
                onChange={(e) => setMapUrlInput(e.target.value)}
                placeholder={isAr ? 'رابط خرائط جوجل' : 'Google Maps link'}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'رسالة شخصية' : 'Personal Message'}
              </label>
              <textarea
                maxLength={240}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border border-white/20 p-3 rounded-lg text-sm text-white focus:border-white focus:outline-none resize-none"
              />
            </div>

            {/* PHOTO */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'الصورة' : 'Photo'}
              </label>
              {photoPreviewUrl ? (
                <div className="flex items-center gap-6">
                  <img src={photoPreviewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-white/20" />
                  <button
                    type="button"
                    onClick={() => { setPhotoBlob(null); setPhotoPreviewUrl(''); setExistingPhotoPath(''); }}
                    className="text-xs font-mono text-red-400 hover:text-red-300 underline"
                  >
                    {isAr ? 'إزالة الصورة' : 'Remove photo'}
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoSelect}
                  className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-white/20 file:bg-white/10 file:text-white hover:file:bg-white hover:file:text-black transition-colors"
                />
              )}
            </div>

            {/* WHATSAPP */}
            <div className="space-y-2 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'رقم الواتساب لتأكيد الحضور' : 'WhatsApp number for confirmations'}
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value.replace(/[^\d+]/g, ''))}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white focus:border-white focus:outline-none font-mono"
              />
            </div>

            {/* MUSIC */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'الأغنية أو الموسيقى الخلفية' : 'Background Audio Score'}
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSongId('')}
                  className={`w-full p-3 rounded-xl border text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                    !songId
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{isAr ? 'بدون موسيقى (صامت)' : 'No Audio (Silent)'}</span>
                  {!songId && <span>✓</span>}
                </button>

                {songs.map((s) => {
                  const isSelected = songId === s.id;
                  const titleStr = typeof s.title === 'string' ? s.title : s.title[isAr ? 'ar' : 'en'];
                  const artistStr = typeof s.artist === 'string' ? s.artist : s.artist ? s.artist[isAr ? 'ar' : 'en'] : '';

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSongId(s.id)}
                      className={`w-full p-3 rounded-xl border text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white font-semibold'
                          : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div>{titleStr}</div>
                        {artistStr && <div className="text-[10px] opacity-70">{artistStr}</div>}
                      </div>
                      <div className="flex items-center gap-2">
                        {s.badge && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] uppercase font-mono">
                            {s.badge}
                          </span>
                        )}
                        {isSelected && <span>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESIGN */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                {isAr ? 'التصميم' : 'Design Theme'}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['ivory', 'noir', 'oud'].map((dId) => (
                  <button
                    key={dId}
                    type="button"
                    onClick={() => setDesign(dId)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      design === dId ? 'border-white bg-white/10 scale-105' : 'border-white/10 bg-white/5 opacity-70'
                    }`}
                  >
                    <span className="text-sm font-medium block text-white">
                      {INVITATION_DESIGN_PRESETS[dId].name[isAr ? 'ar' : 'en']}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 py-4 rounded-full bg-white text-black font-medium text-base hover:bg-zinc-200 transition-all disabled:opacity-50"
              >
                {isSaving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ التغييرات' : 'Save changes')}
              </button>

              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="px-8 py-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-medium text-base hover:bg-red-500 hover:text-white transition-all"
              >
                {isAr ? 'مسح الدعوة' : 'Delete invitation'}
              </button>
            </div>

            {saveSuccess && (
              <p className="text-xs font-mono text-emerald-400 text-center">
                {isAr ? 'تم حفظ التغييرات بنجاح!' : 'Changes saved successfully!'}
              </p>
            )}

          </form>

          {/* Desktop Preview */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block text-center">
                {isAr ? 'معاينة التغييرات' : 'Live Preview'}
              </span>
              <div className="rounded-2xl border border-white/10 bg-[#0B0B0E] p-2 shadow-2xl overflow-hidden">
                <InvitationCard config={liveConfig} compact={true} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none">
          <div className="w-full max-w-md bg-[#121217] border border-red-500/30 rounded-2xl p-6 space-y-6">
            <h3 className="font-display text-2xl text-red-300">{isAr ? 'تأكيد مسح الدعوة' : 'Confirm Deletion'}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isAr
                ? 'سيتم مسح هذه الدعوة والصور التابعة لها نهائيًا. اكتب "مسح" لتأكيد العملية:'
                : 'This invitation and its assets will be permanently deleted. Type "DELETE" to confirm:'}
            </p>

            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={isAr ? 'اكتب مسح' : 'Type DELETE'}
              className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-sm text-white focus:border-red-400 focus:outline-none"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-full bg-red-500 text-white font-medium text-xs hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? (isAr ? 'جاري المسح...' : 'Deleting...') : (isAr ? 'تأكيد المسح' : 'Confirm Delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
