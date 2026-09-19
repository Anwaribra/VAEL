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
    <div ref={heroRef} className="w-full px-3 sm:px-6 pt-3 md:pt-4 pb-4">
      <motion.section
        id="hero-section"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full min-h-[88vh] md:min-h-[92vh] max-w-7xl mx-auto bg-[#050507] text-white overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-20 select-none rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-white/10"
      >
        
        {/* Three.js Interactive GPU Woven Light Particle Canvas */}
        <WovenParticleCanvas />

        {/* Subtle Radial Ambient Glow & Vignette Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050507]/30 to-[#050507]"></div>

        {/* Central Hero Text Composition */}
        <div className="relative z-20 max-w-5xl mx-auto w-full text-center py-10 sm:py-16 space-y-8">
          
          {/* Animated Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.08]">
            {isAr ? (
              <>
                نسِيجٌ ينبض بالحياة... <br />
                <em className="font-serif italic font-light text-amber-100">تحفٌ رقمية صُمّمت لتُخلّد.</em>
              </>
            ) : (
              <>
                Woven by Light... <br />
                <em className="font-serif italic font-light text-amber-100">Digital Portals for Eternity.</em>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed px-4"
          >
            {isAr
              ? 'مواقع كاستم بهوية سينمائية وتجربة تفاعلية ثلاثية الأبعاد للهدايا، ودعوات الزفاف، والمناسبات التذكارية.'
              : 'Custom digital portals for luxury gifts, ceremonial wedding invitations, and milestone archives.'}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <a
              href="#showcase"
              className="px-9 py-4 rounded-full bg-amber-200 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:bg-white transition-all duration-300 flex items-center gap-2.5 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>{isAr ? 'معاينة النماذج الحية' : 'Explore Live Demos'}</span>
            </a>

            <a
              href="#pricing"
              className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <span>{isAr ? 'احجز هديتك' : 'Order Gift'}</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
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

      // Warm Amber / Champagne Gold HSL Palette
      const color = new THREE.Color();
      const hue = 0.08 + Math.random() * 0.06; // Amber gold
      const lightness = 0.55 + Math.random() * 0.35;
      color.setHSL(hue, 0.85, lightness);

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
      size: 0.022,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
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

  return <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]" />;
}
