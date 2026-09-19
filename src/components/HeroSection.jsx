import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import * as THREE from 'three';
import { useLanguage } from '../LanguageContext';

export default function HeroSection() {
  const { isAr } = useLanguage();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.7]);

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }));
    buttonControls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 1.2, duration: 0.8 },
    });
  }, [textControls, buttonControls]);

  return (
    <div ref={heroRef} className="w-full pb-6">
      <motion.section
        id="hero-section"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full min-h-[92vh] md:min-h-[96vh] bg-[#050507] text-white overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 pt-36 sm:pt-44 md:pt-48 pb-28 select-none rounded-b-[3.5rem] md:rounded-b-[4.5rem] shadow-[0_35px_100px_rgba(0,0,0,0.6)] border-b border-white/10"
      >
        
        {/* Three.js Interactive GPU Woven Light Particle Canvas */}
        <WovenParticleCanvas />

        {/* Dark Vignette Ambient Radial Glow & Text Dimmer */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#050507]/80 via-[#050507]/60 to-[#050507]"></div>

        {/* Central Hero Text Composition */}
        <div className="relative z-20 max-w-5xl mx-auto w-full text-center space-y-8 sm:space-y-10">
          
          {/* Animated Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {isAr ? (
              <>
                موقع خاص لمناسبتك.. <br />
                <em className="font-serif italic font-normal text-white/90">تحفة رقمية متفصلة عشان تعيش العمر كله.</em>
              </>
            ) : (
              <>
                Woven by Light... <br />
                <em className="font-serif italic font-normal text-white/90">Digital Portals for Eternity.</em>
              </>
            )}
          </h1>

          {/* Subtitle - Clean Editorial Paragraph (No Pill Container) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed px-4 drop-shadow-md"
          >
            {isAr
              ? 'مواقع ودعوات مخصصة بتجربة سينمائية تفاعلية.. للهدايا الغالية، ودعوات الفرح، وأرشيف أجمل لحظاتكم.'
              : 'Custom digital portals for luxury gifts, ceremonial wedding invitations, and milestone archives.'}
          </motion.p>

          {/* Action Buttons - Liquid Glass Design Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            {/* Primary Solid White Button */}
            <a
              href="#showcase"
              className="px-9 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2.5 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-black text-black" />
              <span>{isAr ? 'جرب الديموهات الحية بنفسك' : 'Explore Live Demos'}</span>
            </a>

            {/* Secondary Liquid Glass Button */}
            <a
              href={`https://wa.me/201144162459?text=${encodeURIComponent(isAr ? 'مرحباً VAEL، حابب أطلب موقع خاص/دعوة زفاف مخصصة' : 'Hello VAEL, I would like to order a custom website / wedding invitation')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <span>{isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </motion.section>
    </div>
  );
}

// --- Three.js Interactive GPU Particle Canvas Component ---
function WovenParticleCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // 40,000 Woven Light Particles
    const particleCount = 40000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.6, 0.55, 180, 30);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Pure Silver & Diamond Ice Light HSL Palette
      const color = new THREE.Color();
      const lightness = 0.65 + Math.random() * 0.35;
      color.setHSL(0.0, 0.0, lightness);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.45,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(mouse.x * 3.5, mouse.y * 3.5, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(
          positions[ix],
          positions[iy],
          positions[iz]
        );
        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        );
        const velocity = new THREE.Vector3(
          velocities[ix],
          velocities[iy],
          velocities[iz]
        );

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.6) {
          const force = (1.6 - dist) * 0.012;
          const direction = new THREE.Vector3()
            .subVectors(currentPos, mouseWorld)
            .normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        // Return to original position spring force
        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.0012);
        velocity.add(returnForce);

        // Damping
        velocity.multiplyScalar(0.94);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.08;
      points.rotation.x = Math.sin(elapsedTime * 0.04) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      torusKnot.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden rounded-b-[3.5rem] md:rounded-b-[4.5rem]" />;
}
