import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function LegalModals({ activeTab, onClose, setActiveTab }) {
  const { isAr } = useLanguage();

  if (!activeTab) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-[2.5rem] bg-[#0A0A0E] text-white border border-white/20 p-6 sm:p-10 md:p-12 shadow-[0_35px_100px_rgba(0,0,0,0.8)] my-8 select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Tabs Header */}
          <div className="flex gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto pr-12">
            {[
              { id: 'privacy', label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy', icon: ShieldCheck },
              { id: 'terms', label: isAr ? 'شروط الخدمة' : 'Terms of Service', icon: FileText },
              { id: 'security', label: isAr ? 'حماية البيانات (Security)' : 'Vault Security', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Body */}
          <div className="space-y-6 text-zinc-200 font-light leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* 1. PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">VAEL Legal & Confidentiality</span>
                  <h3 className="font-display text-3xl font-semibold text-white">
                    {isAr ? 'سياسة الخصوصية وحماية الذكريات' : 'Privacy Policy & Memory Confidentiality'}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {isAr
                    ? 'في استوديوهات VAEL، ندرك تماماً أن الذكريات الشخصية والصور والرسائل الصوتية للمناسبات الخاصة تحمل قيمة عاطفية لا تقدّر بثمن. نلتزم بحماية خصوصيتك بنسبة 100% وعدم مشاركة أي بيانات مع أي طرف ثالث.'
                    : 'At VAEL Studio, we treat your personal photos, audio memos, and milestone archives with absolute reverence and zero-compromise privacy standards.'}
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'عدم استخدام البيانات للتسويق أو الذكاء الاصطناعي' : 'Zero AI Training & No Data Selling'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'لا نستخدم صورك أو تسجيلاتك الصوتية لإعادة تدريب نماذج ذكاء اصطناعي ولا يتم مشاركتها أو بيعها مطلقاً.'
                        : 'We never train public AI models on your personal assets nor do we sell your data to third-party brokers.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'الملكية الكاملة للعميل 100%' : '100% Client Ownership'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'أنت تحتفظ بالملكية الفكرية والشخصية الكاملة لكافة المحتويات، ويمكنك طلب حذف أو أرشفة أي موقع في أي وقت.'
                        : 'You retain full intellectual ownership over all custom websites and uploaded digital media assets.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'التشفير وحماية المظاريف' : 'Encrypted Envelope Security'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'المواقع والرسائل المغلقة بكلمة سر لا يمكن فتحها إلا برمز السر الخاص الذي يحدده العميل للمستلم.'
                        : 'Passphrase-protected gift capsules remain locked until the precise client-defined secret word is entered.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">VAEL Studio Terms & Delivery</span>
                  <h3 className="font-display text-3xl font-semibold text-white">
                    {isAr ? 'شروط الخدمة والتسليم' : 'Terms of Service & Bespoke Delivery'}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {isAr
                    ? 'تنظم هذه الشروط كيفية طلب وتصميم وتسليم المواقع الخاصة ودعوات الزفاف الإلكترونية من استوديوهات VAEL.'
                    : 'These terms outline the production timeline, domain hosting guarantees, and modification policies for all VAEL digital artifacts.'}
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'سرعة التجهيز والتسليم (24-48 ساعة)' : '24–48 Hour Express Delivery'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'يتم تجهيز وتصميم موقعك الخاص خلال 24 إلى 48 ساعة من استلام الصور والرسائل الصوتية المطلوبة.'
                        : 'Custom gift websites and ceremonial invitations are produced and ready for review within 24 to 48 hours.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'استضافة دائمية ومدى الحياة' : 'Permanent Lifetime Hosting Guarantee'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'رابط موقعك ينشر على دومين خاص دائم يظل شغالاً ومدعوماً مدى الحياة لتصفحه في أي وقت.'
                        : 'Your vanity domain link remains online and accessible permanently with standard lifetime hosting.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'التعديلات المجانية' : 'Complimentary Modifications'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'يتضمن طلبك تعديلات مجانية على النصوص والصور خلال أول 30 يوماً بعد التسليم.'
                        : 'Includes complimentary text and photo updates during the first 30 days after project delivery.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. VAULT SECURITY */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">VAEL Infrastructure & Encryption</span>
                  <h3 className="font-display text-3xl font-semibold text-white">
                    {isAr ? 'حماية البيانات والحافظة المشفرة' : 'Vault Security & Passphrase Encryption'}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {isAr
                    ? 'نعتمد أعلى معايير الأمان والتشفير لحماية الوسائط، الرسائل الصوتية، ودعوات الزفاف من التصفح غير المصرح به.'
                    : 'Our digital gift vaults utilize AES-256 standards, private CDN endpoints, and passphrase authentication.'}
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'تشفير رمز السر (Passphrase Authentication)' : 'Client Passphrase Encryption'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'رموز السر الخاصة بمواقع الهدايا تشفر على جانب المتصفح ولا تخزن كنص واضح على السيرفر.'
                        : 'Passphrases for locked gift capsules are validated securely without raw plain-text storage.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'حماية التسجيلات الصوتية والصور' : 'Private Media Distribution (CDN)'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'التسجيلات الصوتية والصور فائقة الدقة تستضاف على سيرفرات سريعة ومحمية ضد التحميل العشوائي.'
                        : 'High-resolution images and 24-bit audio memos are distributed over secure SSL/TLS channels.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'الختم الشمعي الملكي' : 'Melting Wax Seal Mechanics'}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isAr
                        ? 'مظاريف دعوات الزفاف تشتمل على مؤثر كسر الختم الشمعي الفضي لمنح المستلم تجربة فتح غير مسبوقة.'
                        : 'Interactive wedding envelopes feature silver wax seal mechanics for authentic unboxing experiences.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Modal Footer Button */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
            >
              {isAr ? 'إغلاق النافذة' : 'Close Window'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
