import React from 'react';
import { motion } from 'framer-motion';

export default function LiquidMetalLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center my-6">
      
      {/* Outer Glow Halo */}
      <div className="absolute w-[360px] h-[120px] bg-black/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Liquid Metal VAEL Logotype */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center px-10 py-5 rounded-full bg-white/80 border border-black/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden group cursor-pointer"
      >
        {/* Chrome Shimmer Light Sweep */}
        <div className="absolute inset-0 chrome-shimmer opacity-30 group-hover:opacity-60 transition-opacity"></div>

        {/* VAEL Obsidian Display Text */}
        <span className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.35em] font-bold text-[#0F0F12] uppercase drop-shadow-sm pr-[-0.35em]">
          VAEL
        </span>
      </motion.div>

      {/* Studio Monogram Subtitle */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[#71717A] font-medium"
      >
        Luxury Digital Experience Studio
      </motion.span>

    </div>
  );
}

