'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChapterConfig } from '@/src/config';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '@/lib/audio';

interface ChapterProps {
  chapter: ChapterConfig;
  index: number;
  isWarmTheme?: boolean;
  onOpenLightbox: (src: string, caption: string) => void;
}

export default function Chapter({
  chapter,
  index,
  isWarmTheme = false,
  onOpenLightbox,
}: ChapterProps) {
  const [mediaError, setMediaError] = useState(false);
  const [revealedSentences, setRevealedSentences] = useState<number>(0);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);
  const [accentGlowed, setAccentGlowed] = useState(false);
  const [isPurringActive, setIsPurringActive] = useState(false);
  const [specialGazeWhisper, setSpecialGazeWhisper] = useState(false);

  // Slight alternating tilt for the polaroid memory frame: -1.5deg, 1.8deg, etc.
  const rotations = [-1.5, 1.8, -1.2, 1.6, -1.8, 1.4, -1.3, 0];
  const tiltDeg = rotations[index % rotations.length];

  // Split text into meaningful sentences
  const sentences = chapter.text
    .split(/(?<=[।?!])\s+/)
    .filter((s) => s.trim().length > 0);

  // Trigger emotional sentence reveals when card enters view
  const handleViewportEnter = () => {
    const interval = chapter.isQuietChapter ? 1500 : 900;

    sentences.forEach((_, i) => {
      setTimeout(() => {
        setRevealedSentences((prev) => Math.max(prev, i + 1));

        // Chapter 6 Reveal Effect: when sentence with "তোমার কোল" appears
        if (chapter.id === 6 && i === 0 && !accentGlowed) {
          setAccentGlowed(true);
          audioManager.haptic(20);
        }
      }, (i + 1) * interval);
    });

    // Chapter 4 Mystery delay (+2000ms after last sentence)
    if (chapter.mysteryText) {
      const mysteryDelay = (sentences.length + 1) * interval + 2000;
      setTimeout(() => {
        setMysteryRevealed(true);
      }, mysteryDelay);
    }
  };

  const handleFeelPurr = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPurringActive(true);
    audioManager.playCatPurr(4.5);
    setTimeout(() => {
      setIsPurringActive(false);
    }, 4500);
  };

  const handleGazeInEyes = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.playStarTwinkleSound();
    audioManager.haptic([20, 30, 20]);
    setSpecialGazeWhisper(true);
    setTimeout(() => setSpecialGazeWhisper(false), 4500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      onViewportEnter={handleViewportEnter}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full pl-10 pr-4 my-16 first:mt-6 last:mb-20"
      aria-label={`অধ্যায় ${chapter.bnNumber}: ${chapter.title}`}
    >
      {/* Chapter Bengali Number Badge (Clean typography) */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs tracking-widest uppercase font-serif-bengali font-semibold ${
            isWarmTheme ? 'text-[#a26838]' : 'text-[#f4c56a]'
          }`}
        >
          অধ্যায় {chapter.bnNumber}
        </span>
      </div>

      {/* Memory Frame (Polaroid tilt, rounded corners, soft shadow, touch to zoom) */}
      <div
        className="relative my-4 cursor-pointer"
        onClick={() => onOpenLightbox(chapter.mediaPath, chapter.title)}
      >
        <motion.div
          style={{ rotate: `${tiltDeg}deg` }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 rounded-2xl shadow-xl transition-all duration-700 ${
            isPurringActive
              ? 'ring-4 ring-[#f4c56a] shadow-[0_0_30px_rgba(244,197,106,0.6)]'
              : ''
          } ${
            isWarmTheme
              ? 'bg-[#ffffff] shadow-[#3d2a1c]/12 border border-[#f0dfcc]'
              : 'bg-[#12182e]/90 shadow-black/50 border border-white/10'
          }`}
        >
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
            {!mediaError ? (
              chapter.mediaType === 'video' ? (
                <video
                  src={chapter.mediaPath}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={() => setMediaError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={chapter.mediaPath}
                  alt={chapter.title}
                  width={400}
                  height={300}
                  referrerPolicy="no-referrer"
                  onError={() => setMediaError(true)}
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.03]"
                />
              )
            ) : (
              // Elegant Placeholder Fallback (Never show broken image)
              <div
                className={`w-full h-full flex flex-col items-center justify-center p-4 text-center ${
                  isWarmTheme
                    ? 'bg-gradient-to-br from-[#faecd9] to-[#f4dcc2]'
                    : 'bg-gradient-to-br from-[#121832] to-[#1c264a]'
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-10 h-10 mb-2 opacity-50 ${
                    isWarmTheme ? 'fill-[#b57f49]' : 'fill-[#f4c56a]'
                  }`}
                >
                  <circle cx="6" cy="8" r="2" />
                  <circle cx="11.5" cy="5.5" r="2" />
                  <circle cx="17" cy="8" r="2" />
                  <path d="M11.5 11.5c-3 0-5.5 2-5.5 4.8 0 2.2 1.8 3.7 4 3.7 1 0 1.5-.4 1.5-.4s.5.4 1.5.4c2.2 0 4-1.5 4-3.7 0-2.8-2.5-4.8-5.5-4.8z" />
                </svg>
                <span
                  className={`text-xs font-serif-bengali opacity-70 ${
                    isWarmTheme ? 'text-[#6e4624]' : 'text-[#fff4e0]'
                  }`}
                >
                  মিনুর মধুর স্মৃতি
                </span>
              </div>
            )}

            {/* Active Purring Warm Golden Glow */}
            {isPurringActive && (
              <motion.div
                animate={{ opacity: [0.3, 0.75, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-radial from-[#f4c56a]/40 to-transparent pointer-events-none"
              />
            )}

            {/* Subtle tap hint */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] text-white/90 font-light pointer-events-none">
              ট্যাপ করে বড় করুন
            </div>
          </div>

          {/* Polaroid bottom caption strip */}
          <div className="pt-2 px-1 flex justify-between items-center text-[11px] opacity-70 font-serif-bengali">
            <span className={isWarmTheme ? 'text-[#825c38]' : 'text-[#fff4e0]/70'}>
              {chapter.title}
            </span>
            <span className={isWarmTheme ? 'text-[#a27c59]' : 'text-[#f4c56a]/70'}>
              মিনু &hearts;
            </span>
          </div>
        </motion.div>
      </div>

      {/* Chapter 6 Tactile Purr Affordance */}
      {chapter.id === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-3"
        >
          <button
            type="button"
            onClick={handleFeelPurr}
            className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-medium border transition-all cursor-pointer ${
              isPurringActive
                ? 'bg-[#df8c17] text-white border-[#df8c17] shadow-[0_0_15px_rgba(223,140,23,0.5)]'
                : 'bg-[#faecd9]/80 text-[#8c592a] border-[#e8cbb0] active:scale-95'
            }`}
          >
            <Heart className="w-4 h-4 fill-current animate-pulse text-[#d97706]" />
            <span>
              {isPurringActive
                ? "মিনুর গায়ের ওম ও ঘুরঘুর অনুভব করছো... 🐾"
                : "মিনুর গায়ের ওম অনুভব করো (ঘুরঘুর শব্দ ও কম্পন)"}
            </span>
          </button>
        </motion.div>
      )}

      {/* Chapter 5 Affectionate Eye-Gaze Whisper Affordance */}
      {chapter.id === 5 && (
        <div className="my-2">
          <button
            type="button"
            onClick={handleGazeInEyes}
            className="w-full py-2 px-3 rounded-lg bg-black/20 border border-[#f4c56a]/30 text-xs text-[#f4c56a] flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>মিনুর চোখের দিকে একটু তাকাও</span>
          </button>

          <AnimatePresence>
            {specialGazeWhisper && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-2.5 rounded-lg bg-[#f4c56a]/15 border border-[#f4c56a]/40 text-center"
              >
                <p className="text-xs font-serif-bengali text-[#f4c56a] leading-relaxed">
                  &ldquo;নওরিন, আমি জানি তুমি আমাকে কত ভালোবাসতে... আমিও শুধু তোমার চোখেই আকাশ দেখতাম।&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Chapter Title */}
      <h2
        className={`mt-4 text-2xl sm:text-3xl font-serif-bengali font-bold tracking-tight ${
          isWarmTheme ? 'text-[#382619]' : 'text-[#fff4e0]'
        }`}
      >
        {chapter.title}
      </h2>

      {/* Chapter Text: Sentence by Sentence Blur-to-Clear Reveal */}
      <div
        className={`mt-4 space-y-3 font-normal text-[17px] leading-[1.8] font-sans ${
          isWarmTheme ? 'text-[#443022]' : 'text-[#e6ddcf]'
        }`}
      >
        {sentences.map((sentence, sIdx) => {
          const isVisible = sIdx < revealedSentences;

          // Chapter 6: Highlight "তোমার কোল" with golden glow
          const hasAccent =
            chapter.id === 6 &&
            chapter.accentPhrase &&
            sentence.includes(chapter.accentPhrase);

          return (
            <motion.p
              key={sIdx}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={
                isVisible
                  ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                  : { opacity: 0, filter: 'blur(6px)', y: 10 }
              }
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              {hasAccent ? (
                <>
                  {sentence.split(chapter.accentPhrase!)[0]}
                  <span
                    className={`font-semibold inline-block transition-colors duration-1000 ${
                      accentGlowed || isPurringActive
                        ? 'text-[#df8c17] drop-shadow-[0_0_10px_rgba(223,140,23,0.7)] px-1'
                        : isWarmTheme
                        ? 'text-[#2e1d13]'
                        : 'text-[#f4c56a]'
                    }`}
                  >
                    {chapter.accentPhrase}
                  </span>
                  {sentence.split(chapter.accentPhrase!)[1]}
                </>
              ) : (
                sentence
              )}
            </motion.p>
          );
        })}

        {/* Chapter 4 Mystery Effect Sentence */}
        {chapter.mysteryText && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={
              mysteryRevealed
                ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                : { opacity: 0, filter: 'blur(8px)', y: 12 }
            }
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className={`pt-2 flex items-start gap-2 italic text-[17px] font-serif-bengali ${
              isWarmTheme
                ? 'text-[#9c5a1c] drop-shadow-sm'
                : 'text-[#f4c56a] drop-shadow-[0_0_10px_rgba(244,197,106,0.35)]'
            }`}
          >
            <Sparkles className="w-4 h-4 mt-1 shrink-0 text-[#f4c56a] animate-pulse" />
            <p className="font-medium tracking-wide">
              {chapter.mysteryText}
            </p>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
