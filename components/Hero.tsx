'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { MemorialConfig } from '@/src/config';
import { audioManager } from '@/lib/audio';

interface HeroProps {
  config: MemorialConfig;
}

export default function Hero({ config }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const [isCaressing, setIsCaressing] = useState(false);
  const [touchRipples, setTouchRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleCaress = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Determine touch position
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = rect.width / 2;
    let clientY = rect.height / 2;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX - rect.left;
      clientY = e.touches[0].clientY - rect.top;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX - rect.left;
      clientY = (e as React.MouseEvent).clientY - rect.top;
    }

    // Play cat purr and rhythmic vibration
    audioManager.playCatPurr(3.5);
    setIsCaressing(true);

    const rippleId = Date.now();
    setTouchRipples((prev) => [...prev.slice(-3), { id: rippleId, x: clientX, y: clientY }]);

    setTimeout(() => {
      setIsCaressing(false);
    }, 3500);

    setTimeout(() => {
      setTouchRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 2000);
  };

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-end overflow-hidden bg-[#060913] text-[#fff4e0] select-none">
      {/* Background Hero Image with Slow Ken Burns Motion and Interactive Caress Layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-pointer"
        onClick={handleCaress}
        onTouchStart={handleCaress}
        aria-label="মিনুর মাথায় হাত বোলান"
      >
        {!imageError ? (
          <motion.img
            src={config.heroPhoto}
            alt={config.catName}
            onError={() => setImageError(true)}
            initial={{ scale: 1 }}
            animate={{ scale: isCaressing ? 1.05 : 1.08 }}
            transition={{
              scale: isCaressing
                ? { duration: 0.8, ease: 'easeOut' }
                : { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#111936] via-[#1a2347] to-[#0b1026] flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#f4c56a]/10 flex items-center justify-center border border-[#f4c56a]/20">
              <Heart className="w-10 h-10 text-[#f4c56a]/60" />
            </div>
          </div>
        )}

        {/* Caress Golden Ripples */}
        <AnimatePresence>
          {touchRipples.map((r) => (
            <motion.div
              key={r.id}
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ left: r.x, top: r.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#f4c56a]/60 bg-radial from-[#f4c56a]/30 to-transparent pointer-events-none"
            />
          ))}
        </AnimatePresence>

        {/* Purring Glow Pulse */}
        {isCaressing && (
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-radial from-[#f4c56a]/25 via-transparent to-transparent pointer-events-none"
          />
        )}

        {/* Cinematic Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#0b1026]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 px-6 pb-10 pt-20 flex flex-col items-center text-center pointer-events-none">
        {/* Subtle decorative motif */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-2 flex items-center gap-2 text-xs tracking-widest text-[#f4c56a]/85"
        >
          <span className="w-6 h-[1px] bg-[#f4c56a]/40" />
          <span>একটি আত্মিক বন্ধন</span>
          <span className="w-6 h-[1px] bg-[#f4c56a]/40" />
        </motion.div>

        {/* Large Serif Bengali Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="text-5xl sm:text-6xl font-serif-bengali font-bold tracking-tight text-[#fff4e0] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          {config.hero.title}
        </motion.h1>

        {/* Minu's Direct Words to Nowrin */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-3 max-w-xs text-lg sm:text-xl font-serif-bengali leading-relaxed text-[#fff4e0]/95 font-light drop-shadow-md"
        >
          {config.hero.subtitle}
        </motion.p>

        {/* Tender Caress Hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 pointer-events-auto"
        >
          <div
            onClick={handleCaress}
            className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all ${
              isCaressing
                ? 'bg-[#f4c56a]/20 border-[#f4c56a] text-[#fff4e0] shadow-[0_0_15px_rgba(244,197,106,0.5)]'
                : 'bg-black/30 border-[#f4c56a]/30 text-[#f4c56a]/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f4c56a] animate-pulse" />
            <span>
              {isCaressing ? "মিনু ঘুরঘুর করে আদর নিচ্ছে... 🐾" : "মিনুর ছবিতে ট্যাপ করে একটু আদর করো"}
            </span>
          </div>
        </motion.div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-1 text-[#f4c56a]/70"
        >
          <span className="text-xs tracking-wider font-light">
            {config.hero.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-[#f4c56a]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
