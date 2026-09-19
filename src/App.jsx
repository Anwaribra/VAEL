import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IdeaSection from './components/IdeaSection';
import ExperiencesSection from './components/ExperiencesSection';
import ShowcaseSection from './components/ShowcaseSection';
import SignatureMomentSection from './components/SignatureMomentSection';
import FinalCtaSection from './components/FinalCtaSection';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#F5F5F7] text-[#0F0F12] font-sans antialiased selection:bg-black/10 selection:text-black overflow-x-hidden">
        
        {/* Static Ambient Radial Background Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-ambient-light-radial"></div>

        {/* Liquid Glass Header Navigation */}
        <Navbar />

        {/* Natural Editorial Section Flow - 100% Unified Continuous Background */}
        <main className="relative z-10">
          <HeroSection />
          <IdeaSection />
          <ExperiencesSection />
          <ShowcaseSection />
          <SignatureMomentSection />
          <FinalCtaSection />
        </main>

      </div>
    </LanguageProvider>
  );
}
