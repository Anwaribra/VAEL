import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function SignatureMomentSection() {
  const { isAr } = useLanguage();
  const canvasRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let time = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (e.clientX - rect.left) * window.devicePixelRatio;
      targetY = (e.clientY - rect.top) * window.devicePixelRatio;
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      setIsInteracting(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.025;
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Create rich liquid gradient background inside canvas
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#F5F5F7');
      bgGrad.addColorStop(0.5, '#EBF0F5');
      bgGrad.addColorStop(1, '#E2E8F0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Liquid Reflection Grid & Fluid Nodes
      const cols = 24;
      const rows = 14;
      const cellW = width / cols;
      const cellH = height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300 * window.devicePixelRatio;

          const factor = Math.max(0, 1 - dist / maxDist);
          const ripple = Math.sin(dist * 0.025 - time * 3.5) * 20 * factor;

          const brightness = Math.floor(40 - factor * 30);
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 10}, ${0.1 + factor * 0.55})`;

          ctx.beginPath();
          ctx.arc(
            x + cellW / 2 + Math.cos(time + i) * 8,
            y + cellH / 2 + Math.sin(time + j) * 8 + ripple,
            Math.max(3, 5 * window.devicePixelRatio * (0.8 + factor * 1.8)),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      // Draw Glass Refraction Ring at cursor position
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 110 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(15, 15, 18, 0.4)';
      ctx.lineWidth = 2.5 * window.devicePixelRatio;
      ctx.stroke();

      const lensGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        120 * window.devicePixelRatio
      );
      lensGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      lensGradient.addColorStop(0.4, 'rgba(200, 200, 220, 0.2)');
      lensGradient.addColorStop(1, 'rgba(245, 245, 247, 0)');
      ctx.fillStyle = lensGradient;
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="signature" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#52525B] uppercase tracking-widest mb-4 font-semibold">
            {isAr ? '06 — المؤثرات البصرية التفاعلية' : '06 — Signature Liquid Surface'}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-[#0F0F12] tracking-tight">
            {isAr ? (
              <>السطح <span className="font-serif italic text-[#52525B]">التفاعلي الذكي.</span></>
            ) : (
              <>The Refractive <span className="font-serif italic text-[#52525B]">Canvas.</span></>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#52525B] font-light">
            {isAr
              ? 'حرك الماوس فوق السطح أدناه للتفاعل المباشر مع انكسارات الزجاج السائل.'
              : 'Move your cursor across the liquid surface below to trigger real-time glass refraction and reveal hidden typography.'}
          </p>
        </div>

        {/* Rounded Glass Interactive Surface Container */}
        <div className="relative w-full h-[480px] rounded-[2.5rem] bg-white/90 border border-black/15 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center cursor-crosshair">
          
          {/* Background Typography Revealed by Lens */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#71717A] mb-2 font-medium">
              {isAr ? 'إصدار VAEL الخاص' : 'VAEL Signature Edition'}
            </span>
            <h3 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#0F0F12] drop-shadow-sm">
              {isAr ? (
                <>هدية شخصية فريدة. <br /><span className="font-serif italic font-normal text-[#52525B]">صُنعت لتبقى للأبد.</span></>
              ) : (
                <>SOMETHING PERSONAL. <br /><span className="font-serif italic font-normal text-[#52525B]">MADE TO BE REMEMBERED.</span></>
              )}
            </h3>
          </div>

          {/* Interactive Canvas Shader Surface */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 mix-blend-multiply opacity-80"
          />

          {/* Floating Pill Callout */}
          <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
            <div className="px-5 py-2.5 rounded-full bg-[#0F0F12] text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 shadow-xl">
              <MousePointer className="w-4 h-4 text-white animate-bounce" />
              <span>
                {isInteracting
                  ? (isAr ? 'التفاعل نشط' : 'Refraction Active')
                  : (isAr ? 'حرك الماوس للتفاعل' : 'Hover Cursor to Interact')}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

