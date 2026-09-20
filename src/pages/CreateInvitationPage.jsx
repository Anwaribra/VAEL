import React from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../LanguageContext';
import { InvitationBuilder } from '../vael-atelier';

export default function CreateInvitationPage() {
  const { isAr } = useLanguage();

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="h-screen bg-[#F5F5F7] text-[#0F0F12] flex flex-col overflow-hidden" style={{ '--vael-builder-offset': '72px' }}>
      <Navbar />
      <div className="pt-[72px] flex-1 overflow-hidden">
        <InvitationBuilder
          locale={isAr ? 'ar' : 'en'}
          storageKey="vael:atelier:draft"
          onUsePremiumTemplate={(t) => {
            navigate(`/custom?template=${t.id}&templateName=${encodeURIComponent(t.name)}`);
          }}
        />
      </div>
    </div>
  );
}
