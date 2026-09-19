import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, HeartHandshake, ShieldCheck, ArrowUpRight, Award, Layers, CheckCircle2 } from 'lucide-react';

const servicesData = [
  {
    id: '01',
    badge: 'Digital Gift Vault',
    title: 'Bespoke Milestone Memory Archives',
    subtitle: 'Private encrypted digital vaults crafted for birthdays, anniversaries, and romantic milestones.',
    description: 'A dedicated private digital space that combines high-resolution photographic galleries, 24-bit spatial voice memos, countdown clocks, and secret passphrase authentication.',
    features: [
      'Passphrase-encrypted personal vault',
      'Spatial 24-bit voice memo frequency player',
      'Interactive timeline with glass media cards',
      'Custom vanity domain or private link'
    ],
    accentIcon: Gift,
    tag: 'Popular Commission'
  },
  {
    id: '02',
    badge: 'Ceremonial Wedding Portal',
    title: 'High-Fashion Wedding & Event Portals',
    subtitle: 'High-editorial digital wedding invitations with liquid silver seals and guest concierge.',
    description: 'Elevate formal unions with an interactive digital monograph featuring melting wax seal mechanics, real-time RSVP concierge, spatial Amalfi/venue itineraries, and guest wishlists.',
    features: [
      'Liquid silver wax seal melting interaction',
      'Encrypted guest RSVP & concierge system',
      'Spatial travel, venue & dress code guides',
      'Post-ceremony guest photo archive'
    ],
    accentIcon: HeartHandshake,
    tag: 'Ceremonial Exclusive'
  },
  {
    id: '03',
    badge: 'Digital Gift Registry',
    title: 'Curated Wishlist & Gift Registries',
    subtitle: 'Spatial digital gift registries for luxury weddings, baby showers, and milestone galas.',
    description: 'A refined alternative to generic registries. Guests can explore interactive 3D gift cards, contribute towards dream experiences, and receive personalized video/audio thank-you notes.',
    features: [
      'Bespoke gift & experience registry UI',
      'Seamless contribution & sentiment tracking',
      'Personalized video/audio thank-you memos',
      'Optional silver liquid glass physical NFC card'
    ],
    accentIcon: Award,
    tag: 'Registry Medium'
  },
  {
    id: '04',
    badge: 'Achievement Monograph',
    title: 'Executive & Academic Monograph',
    subtitle: 'Refined digital publications celebrating career retrospectives, graduations, and life honors.',
    description: 'A permanent digital monograph designed for scholars, executives, and pioneers to showcase publications, life milestones, leadership timelines, and archival press.',
    features: [
      'High-editorial typography & layout design',
      'Interactive research & publication timeline',
      'Archival video & media documentation',
      'Lifetime cloud hosting & domain backup'
    ],
    accentIcon: Award,
    tag: 'Legacy Edition'
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [selectedServiceId, setSelectedServiceId] = useState('01');

  return (
    <section id="services" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#52525B] uppercase tracking-widest mb-4 font-semibold">
              03 — Studio Services & Offerings
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#0F0F12] tracking-tight">
              Crafted Mediums for <span className="font-serif italic text-[#52525B]">Eternity.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#52525B] max-w-md font-light leading-relaxed">
            Inspired by high-end digital publishing, we deliver four core studio services tailored to your exact story.
          </p>
        </div>

        {/* Services Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selection Cards */}
          <div className="lg:col-span-6 space-y-4">
            {servicesData.map((service) => {
              const isSelected = selectedServiceId === service.id;
              const IconComp = service.accentIcon;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedServiceId(service.id);
                    setActiveService(service);
                  }}
                  className={`group relative p-6 sm:p-8 rounded-[2rem] cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-[#0F0F12] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/15 scale-[1.01]'
                      : 'bg-white/60 hover:bg-white/90 text-[#52525B] border border-black/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#0F0F12] text-white' : 'bg-black/5 text-[#0F0F12]'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] block font-semibold">
                          Service {service.id} / {service.badge}
                        </span>
                        <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-wider">
                          {service.tag}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 ${
                      isSelected ? 'text-[#0F0F12] translate-x-1 -translate-y-1' : 'text-[#A1A1AA] group-hover:text-[#0F0F12]'
                    }`} />
                  </div>

                  <h3 className={`font-display text-2xl tracking-tight transition-colors ${
                    isSelected ? 'text-[#0F0F12] font-semibold' : 'text-[#27272A] font-normal group-hover:text-[#0F0F12]'
                  }`}>
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#52525B] font-light leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Inspector Panel */}
          <div className="lg:col-span-6 sticky top-32">
            <div className="rounded-[2.5rem] bg-[#0A0A0E] text-white p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.2)] border border-black/10 overflow-hidden relative">
              
              {/* Radial Light Sweep */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/[0.05] rounded-full blur-3xl pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="px-3.5 py-1 rounded-full bg-white text-black text-[10px] font-mono uppercase tracking-widest font-bold">
                      {activeService.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      VAEL Service Spec
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white font-normal leading-snug">
                    {activeService.title}
                  </h3>

                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {activeService.description}
                  </p>

                  {/* Included Features List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                      Standard Deliverables Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA inside Panel */}
                  <div className="pt-6 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="px-7 py-3.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-bold shadow-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                      <span>Inquire {activeService.badge}</span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </a>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Studio Edition 2026
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
