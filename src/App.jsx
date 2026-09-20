import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperiencesSection from './components/ExperiencesSection';
import PhilosophySection from './components/PhilosophySection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProcessSection from './components/ProcessSection';
import InquiryFooterSection from './components/InquiryFooterSection';

// Page Routes
import CreateInvitationPage from './pages/CreateInvitationPage';
import ManageInvitationPage from './pages/ManageInvitationPage';
import InvitationGuestPage from './pages/InvitationGuestPage';
import CustomRequestPage from './pages/CustomRequestPage';
import GiftsPage from './pages/GiftsPage';
import GreetingsPage from './pages/GreetingsPage';
import KeepsakesPage from './pages/KeepsakesPage';
import GuestLinksPage from './pages/GuestLinksPage';
import TableFinderPage from './pages/TableFinderPage';
import GuestAlbumPage from './pages/GuestAlbumPage';
import PartnersPage from './pages/PartnersPage';

import { LanguageProvider, useLanguage } from './LanguageContext';
import { CollectionSection } from './vael-atelier';

function AnimatedCollectionSection({ locale, navigate }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.91, 1, 1, 0.91]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.75, 1, 1, 0.75]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ['4.5rem', '2.5rem', '2.5rem', '4.5rem']
  );

  return (
    <section ref={containerRef} className="relative py-10 md:py-16 px-2 sm:px-4 md:px-6 bg-transparent">
      <motion.div
        style={{ scale, opacity, borderRadius }}
        className="max-w-[98rem] mx-auto overflow-hidden will-change-transform shadow-[0_35px_100px_rgba(0,0,0,0.4)] border border-white/10"
      >
        <CollectionSection
          locale={locale}
          navigate={navigate}
        />
      </motion.div>
    </section>
  );
}

function LandingPageContent() {
  const { isAr } = useLanguage();

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F1EEE7] overflow-x-hidden">
      {/* Liquid Glass Navigation */}
      <Navbar />

      {/* Natural Editorial Section Flow: 01 Hero -> 02 Experiences -> 03 Philosophy -> 04 Capabilities -> 05 Process -> 06 Inquiry & Footer */}
      <main className="relative z-10">
        <HeroSection />
        <ExperiencesSection />
        <PhilosophySection />
        <CapabilitiesSection />
        <ProcessSection />
        <InquiryFooterSection />
      </main>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderRoute = () => {
    // 1. Invitations Configurator Routes (/create, /invitations/design)
    if (
      currentPath === '/create' ||
      currentPath === '/create/' ||
      currentPath.startsWith('/invitations/design')
    ) {
      return <CreateInvitationPage />;
    }

    // 2. Manage Invitation Route (/manage/:slug)
    if (currentPath.startsWith('/manage/')) {
      const slug = currentPath.split('/manage/')[1]?.replace(/\/$/, '') || '';
      return <ManageInvitationPage slug={slug} />;
    }

    // 3. Guest Invitation Route (/i/:slug)
    if (currentPath.startsWith('/i/')) {
      const slug = currentPath.split('/i/')[1]?.replace(/\/$/, '') || '';
      return <InvitationGuestPage slug={slug} />;
    }

    // 4. Custom Website Request Route (/custom)
    if (currentPath === '/custom' || currentPath === '/custom/') {
      return <CustomRequestPage />;
    }

    // 5. Additional Studio Experience Routes
    if (currentPath.startsWith('/gifts')) {
      return <GiftsPage />;
    }
    if (currentPath.startsWith('/greetings')) {
      return <GreetingsPage />;
    }
    if (currentPath.startsWith('/keepsakes')) {
      return <KeepsakesPage />;
    }
    if (currentPath.startsWith('/tools/guest-links')) {
      return <GuestLinksPage />;
    }
    if (currentPath.startsWith('/table-finder')) {
      return <TableFinderPage />;
    }
    if (currentPath.startsWith('/album')) {
      return <GuestAlbumPage />;
    }
    if (currentPath.startsWith('/partners')) {
      return <PartnersPage />;
    }

    // Default: Deployed Full Studio Landing Page with Integrated Invitations & Experiences
    return <LandingPageContent />;
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300 overflow-x-hidden">
        {renderRoute()}
      </div>
    </LanguageProvider>
  );
}
