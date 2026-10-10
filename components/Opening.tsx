'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StarFieldFireflies from './StarFieldFireflies';
import { MemorialConfig } from '@/src/config';
import { audioManager } from '@/lib/audio';
import { Sparkles } from 'lucide-react';

interface OpeningProps {
  config: MemorialConfig;
  onComplete: () => void;
  onLightCandle?: () => void;
}

export default function Opening({ config, onComplete, onLightCandle }: OpeningProps) {
  const [isLit, setIsLit] = useState(false);
  const [showTextStage1, setShowTextStage1] = useState(false);
  const [showTextStage2, setShowTextStage2] = useState(false);
  const [showContinueBtn, setShowContinueBtn] = useState(false);

  const handleLightCandle = () => {
    if (isLit) return;
    setIsLit(true);
    onLightCandle?.();

    // Audio & Haptics on first user gesture
    audioManager.haptic(20);
    audioManager.playCandleIgnitionSound();
    audioManager.playWithFade(3000);

    // Stage 1 text (Name & dates) appears after 1.2s
    setTimeout(() => {
      setShowTextStage1(true);
    }, 1200);

    // Stage 2 text (Minu's words) appears after 2.8s
    setTimeout(() => {
      setShowTextStage2(true);
    }, 2800);

    // Continue button appears after ~4.5s
    setTimeout(() => {
      setShowContinueBtn(true);
    }, 4500);
  };

  const handleTapStar = () => {
    audioManager.playStarTwinkleSound();
    audioManager.haptic([20, 30, 20]);
  };

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-between px-6 py-8 overflow-hidden bg-gradient-to-b from-[#060913] via-[#0b1026] to-[#0d1430] text-[#fff4e0] select-none">
      {/* Background stars and fireflies */}
      <StarFieldFireflies showFireflies={isLit} highlightOneStar={isLit} density="full" />

      {/* Top Section: Minu's Bright Star Interactive Anchor */}
      <div className="w-full pt-[calc(env(safe-area-inset-top)+0.5rem)] flex flex-col items-center z-20">
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            {/* The Bright Star Tap Target (48x48px hit area) */}
            <button
              type="button"
              onClick={handleTapStar}
              aria-label="মিনুর তারা স্পর্শ করুন"
              className="relative p-3 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              {/* Star Glow Aura */}
              <div className="absolute w-8 h-8 rounded-full bg-[#f4c56a]/30 blur-md animate-ping" />
              {/* Star Icon */}
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[#f4c56a] via-[#fff4e0] to-white flex items-center justify-center shadow-[0_0_15px_rgba(244,197,106,0.9)]">
                <Sparkles className="w-4 h-4 text-[#0b1026]" />
              </div>
              <span className="mt-1 text-[11px] tracking-wider text-[#f4c56a]/90 font-serif-bengali">
                মিনুর তারা (স্পর্শ করো)
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Center: The Candle and Memorial Inscription */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-sm">
        {/* Candle Interactive Unit */}
        <button
          type="button"
          onClick={handleLightCandle}
          disabled={isLit}
          aria-label={isLit ? "মোমবাতি প্রজ্বলিত" : config.opening.candlePrompt}
          className={`group relative flex flex-col items-center justify-center p-6 focus:outline-none cursor-pointer transition-transform ${
            !isLit ? 'active:scale-95' : ''
          }`}
        >
          {/* Ambient Glow Bloom when lit */}
          {isLit && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.75, 0.95, 0.75],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 w-48 h-48 rounded-full bg-radial from-[#f4c56a]/45 via-[#f4c56a]/15 to-transparent blur-2xl pointer-events-none"
            />
          )}

          {/* SVG Candle Graphic */}
          <div className="relative w-24 h-40 flex flex-col items-center justify-end">
            {/* Animated Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 15 }}
                  animate={{
                    scale: [1, 1.08, 0.96, 1.04, 1],
                    opacity: 1,
                    y: 0,
                    rotate: [-1, 1.5, -0.8, 1, 0],
                  }}
                  transition={{
                    scale: { duration: 0.6, ease: 'easeOut' },
                    rotate: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute top-2 z-20 flex flex-col items-center origin-bottom"
                >
                  <svg width="34" height="52" viewBox="0 0 34 52" fill="none" className="filter drop-shadow-[0_0_12px_rgba(244,197,106,0.95)]">
                    {/* Outer flame aura */}
                    <path
                      d="M17 0C17 0 32 18 32 34C32 43.94 25.28 52 17 52C8.72 52 2 43.94 2 34C2 18 17 0 17 0Z"
                      fill="url(#outerFlameGrad)"
                      opacity="0.85"
                    />
                    {/* Inner hot core */}
                    <path
                      d="M17 12C17 12 25 24 25 36C25 42 21.4 47 17 47C12.6 47 9 42 9 36C9 24 17 12 17 12Z"
                      fill="url(#innerFlameGrad)"
                    />
                    <defs>
                      <linearGradient id="outerFlameGrad" x1="17" y1="0" x2="17" y2="52" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ffebad" />
                        <stop offset="0.4" stopColor="#f4c56a" />
                        <stop offset="0.85" stopColor="#e87a38" />
                        <stop offset="1" stopColor="#c2410c" />
                      </linearGradient>
                      <linearGradient id="innerFlameGrad" x1="17" y1="12" x2="17" y2="47" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ffffff" />
                        <stop offset="0.5" stopColor="#fff3b0" />
                        <stop offset="1" stopColor="#f4a838" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle Wick */}
            <div className="w-[3px] h-4 bg-[#4a3b32] rounded-t-sm z-10" />

            {/* Candle Body */}
            <div className="relative w-16 h-28 rounded-t-lg bg-gradient-to-r from-[#e7d7be] via-[#fff4e0] to-[#dfcbaf] shadow-2xl overflow-hidden flex flex-col items-center">
              {/* Wax melt indent */}
              <div className="absolute top-0 inset-x-0 h-2 bg-[#d8c3a3]/60 rounded-b-full" />
              {/* Soft candle texture & wax drip */}
              <div className="absolute top-1 left-2 w-2 h-7 bg-[#fffaf0]/80 rounded-full blur-[0.5px]" />
              <div className="absolute top-1 right-3 w-1.5 h-4 bg-[#fffaf0]/60 rounded-full blur-[0.5px]" />
              {/* Soft candle warm reflection when lit */}
              {isLit && (
                <motion.div
                  animate={{ opacity: [0.6, 0.85, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-b from-[#f4c56a]/30 via-transparent to-transparent pointer-events-none"
                />
              )}
            </div>

            {/* Candle Base/Saucer */}
            <div className="w-24 h-3 bg-gradient-to-r from-[#2c221e] via-[#483730] to-[#2c221e] rounded-full -mt-1 shadow-md shadow-black/80" />
          </div>

          {/* Unlit State Prompt */}
          {!isLit && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <span className="text-base sm:text-lg font-medium text-[#fff4e0] tracking-wide text-center">
                {config.opening.candlePrompt}
              </span>
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 text-xs text-[#f4c56a]"
              >
                <span>স্পর্শ করে জ্বালাও</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f4c56a]" />
              </motion.div>
            </motion.div>
          )}
        </button>

        {/* Revealed Memorial Words (Sequential Flow) */}
        <div className="w-full mt-4 flex flex-col items-center text-center min-h-[140px]">
          {/* Stage 1: Minu's Name & Dates */}
          <AnimatePresence>
            {showTextStage1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <h1 className="text-4xl sm:text-5xl font-serif-bengali font-semibold text-[#fff4e0] tracking-wide drop-shadow-[0_2px_12px_rgba(244,197,106,0.3)]">
                  {config.catName}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-[#f4c56a]/85 font-light tracking-wider">
                  {config.birthDate} — {config.passingDate}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 2: Minu's heartfelt line */}
          <AnimatePresence>
            {showTextStage2 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="mt-5 px-3"
              >
                <p className="text-lg sm:text-xl font-serif-bengali leading-relaxed text-[#fff4e0]/95 font-normal drop-shadow-sm">
                  &ldquo;{config.opening.brightStarLine}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full max-w-xs pb-[env(safe-area-inset-bottom)] mb-2 flex justify-center">
        <AnimatePresence>
          {showContinueBtn && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onClick={onComplete}
              className="w-full h-14 rounded-full bg-gradient-to-r from-[#f4c56a] to-[#e8a5a5] text-[#0b1026] font-medium text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,197,106,0.45)] active:scale-95 transition-transform cursor-pointer"
            >
              <span>{config.opening.continueButton}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
