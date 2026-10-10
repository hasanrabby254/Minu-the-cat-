'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChapterConfig } from '@/src/config';
import { ChevronLeft, ChevronRight, Heart, Sparkles, BookOpen } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { useTypewriter } from '@/hooks/useTypewriter';
import Lightbox from './Lightbox';

interface MemoryBookProps {
  chapters: ChapterConfig[];
  onFinishBook?: () => void;
  isFinalMessageUnlocked?: boolean;
}

interface MemoryPageCardProps {
  chapter: ChapterConfig;
  currentPage: number;
  totalPages: number;
  isPurringActive: boolean;
  onFeelPurr: () => void;
  onGazeInEyes: () => void;
  specialGazeWhisper: boolean;
  onSelectImage: (src: string, caption: string) => void;
}

function MemoryPageCard({
  chapter,
  currentPage,
  totalPages,
  isPurringActive,
  onFeelPurr,
  onGazeInEyes,
  specialGazeWhisper,
  onSelectImage,
}: MemoryPageCardProps) {
  // Custom Typewriter Hook for main chapter text (graceful handwriting without clicking sound)
  const {
    displayedText,
    isComplete: isMainComplete,
    skip: skipMain,
  } = useTypewriter(chapter.text, {
    speed: 32,
    startDelay: 350,
    soundEnabled: false,
    naturalVariation: true,
  });

  // Custom Typewriter Hook for Chapter 4 mystery secret text
  const {
    displayedText: displayedMystery,
    isComplete: isMysteryComplete,
    skip: skipMystery,
  } = useTypewriter(chapter.mysteryText || '', {
    speed: 36,
    startDelay: 1200,
    soundEnabled: false,
    naturalVariation: true,
    enabled: isMainComplete && Boolean(chapter.mysteryText),
  });

  const handleInstantReveal = () => {
    skipMain();
    if (chapter.mysteryText) {
      skipMystery();
    }
  };

  return (
    <div className="relative w-full bg-[#fffdfa] rounded-3xl p-5 shadow-[0_12px_35px_rgba(115,75,40,0.14)] border-2 border-dashed border-[#f4a8b8] flex flex-col items-center">
      {/* Cute Pink Bow at Top Center */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
        <div className="w-9 h-7 bg-[#f47285] rounded-md shadow-md flex items-center justify-center text-white text-xs">
          <span className="text-sm">🎀</span>
        </div>
      </div>

      {/* Little Flower Stickers at Corners */}
      <div className="absolute top-3 right-3 text-lg z-10 select-none animate-bounce" style={{ animationDuration: '3s' }}>
        🌻
      </div>
      <div className="absolute bottom-3 left-3 text-base z-10 select-none">
        🌸
      </div>
      <div className="absolute bottom-3 right-3 text-sm z-10 select-none text-[#f47285]">
        🐾
      </div>

      {/* Top Text Header */}
      <div className="w-full text-center mt-2 mb-3 px-2">
        <span className="text-xs uppercase tracking-wider text-[#d96677] font-semibold font-serif-bengali">
          অধ্যায় {chapter.bnNumber}
        </span>
        <h3 className="text-2xl font-serif-bengali font-bold text-[#4a2e1b] mt-0.5">
          {chapter.title}
        </h3>
      </div>

      {/* Centered Framed Photo */}
      <div
        onClick={() => onSelectImage(chapter.mediaPath, chapter.title)}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f5ebe1] border-4 border-white shadow-md cursor-pointer group active:scale-[0.98] transition-transform"
      >
        <Image
          src={chapter.mediaPath}
          alt={chapter.title}
          width={400}
          height={300}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.97] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
        />

        {isPurringActive && chapter.id === 6 && (
          <motion.div
            animate={{ opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-radial from-[#f4c56a]/50 via-transparent to-transparent pointer-events-none"
          />
        )}

        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px] text-white font-serif-bengali">
          🔍 ট্যাপে বড় করো
        </div>
      </div>

      {/* Special Interactive Trigger for Chapter 6 (Tactile Cat Purr) */}
      {chapter.id === 6 && (
        <div className="w-full mt-3">
          <button
            type="button"
            onClick={onFeelPurr}
            className={`w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-serif-bengali font-medium border transition-all cursor-pointer ${
              isPurringActive
                ? 'bg-[#df8c17] text-white border-[#df8c17] shadow-[0_0_15px_rgba(223,140,23,0.5)]'
                : 'bg-[#faecd9] text-[#8c592a] border-[#e8cbb0] active:scale-95'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-[#d97706]" />
            <span>
              {isPurringActive
                ? "মিনুর গায়ের ওম ও ঘুরঘুর অনুভব করছো... 🐾"
                : "মিনুর গায়ের ওম অনুভব করো (ঘুরঘুর ও কম্পন)"}
            </span>
          </button>
        </div>
      )}

      {/* Special Interactive Trigger for Chapter 5 (Gaze in Eyes) */}
      {chapter.id === 5 && (
        <div className="w-full mt-2.5">
          <button
            type="button"
            onClick={onGazeInEyes}
            className="w-full py-1.5 px-3 rounded-xl bg-[#faecd9] border border-[#e8cbb0] text-xs font-serif-bengali text-[#8c592a] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>মিনুর চোখের দিকে একটু তাকাও</span>
          </button>
          <AnimatePresence>
            {specialGazeWhisper && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-2 rounded-xl bg-[#fff0f3] border border-[#f4a8b8] text-center"
              >
                <p className="text-xs font-serif-bengali text-[#d96677] leading-relaxed">
                  &ldquo;নওরিন, আমি জানি তুমি আমাকে কত ভালোবাসতে... আমিও শুধু তোমার চোখেই আকাশ দেখতাম।&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Bengali Story Text with useTypewriter Hook & Animated Paw Cursor */}
      <div
        onClick={handleInstantReveal}
        className="w-full mt-4 text-[#4a3424] text-[16px] leading-[1.8] font-sans px-1 min-h-[90px] cursor-pointer"
        title="ট্যাপ করলে পুরো লেখা একসাথে দেখাবে"
      >
        <p className="relative inline">
          <span>{displayedText}</span>

          {/* Animated Writing Cat Paw Cursor that moves along with the text */}
          {!isMainComplete && (
            <span className="inline-flex items-center ml-1 select-none align-middle">
              <motion.span
                animate={{
                  y: [0, -6, 0],
                  rotate: [-14, 14, -14],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.24,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block text-base origin-bottom text-[#f47285] drop-shadow-[0_2px_5px_rgba(244,114,133,0.5)]"
              >
                🐾
              </motion.span>
              <span className="w-1 h-4 bg-[#e06b80] ml-0.5 rounded-full animate-pulse inline-block" />
            </span>
          )}
        </p>

        {/* Chapter 4 Mystery Sentence Typewriter with Paw */}
        {chapter.mysteryText && displayedMystery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2.5 rounded-xl bg-[#fff8eb] border border-[#f5d799] flex items-start gap-1.5 text-[15px] font-serif-bengali text-[#a86532] italic"
          >
            <Sparkles className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5 animate-pulse" />
            <p className="relative inline">
              <span>{displayedMystery}</span>
              {!isMysteryComplete && (
                <span className="inline-flex items-center ml-1 select-none align-middle">
                  <motion.span
                    animate={{
                      y: [0, -5, 0],
                      rotate: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 0.22,
                      repeat: Infinity,
                    }}
                    className="inline-block text-sm text-[#d97706]"
                  >
                    🐾
                  </motion.span>
                </span>
              )}
            </p>
          </motion.div>
        )}

        {/* Subtle Typewriter Hint */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#a87a60]/70 font-serif-bengali select-none">
          <span>
            {!isMainComplete
              ? "মিনুর ছোট্ট পা লিখছে... 🐾"
              : "লেখা সম্পন্ন ♡"}
          </span>
          {!isMainComplete && (
            <span className="underline underline-offset-2 opacity-80">
              ট্যাপে পুরোটা পড়ো
            </span>
          )}
        </div>
      </div>

      {/* Bottom Sweet Sign-off Line */}
      <div className="w-full mt-4 pt-3 border-t border-[#f7d6de] flex items-center justify-between text-xs text-[#d96677] font-serif-bengali">
        <span>♡ সবসময় তোমার মিনু ♡</span>
        <span className="font-mono text-[11px] text-[#a87a60]">
          পাতা {currentPage + 1} / {totalPages}
        </span>
      </div>
    </div>
  );
}

export default function MemoryBook({
  chapters,
  onFinishBook,
  isFinalMessageUnlocked = false,
}: MemoryBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  const [isPurringActive, setIsPurringActive] = useState(false);
  const [specialGazeWhisper, setSpecialGazeWhisper] = useState(false);

  const totalPages = chapters.length;
  const currentChapter = chapters[currentPage];

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      audioManager.playPageTurnSound();
      audioManager.haptic([15, 20]);
      setCurrentPage((prev) => prev + 1);
    } else if (onFinishBook) {
      onFinishBook();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      audioManager.playPageTurnSound();
      audioManager.haptic(15);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFeelPurr = () => {
    setIsPurringActive(true);
    audioManager.playCatPurr(4.5);
    setTimeout(() => {
      setIsPurringActive(false);
    }, 4500);
  };

  const handleGazeInEyes = () => {
    audioManager.playStarTwinkleSound();
    audioManager.haptic([20, 30, 20]);
    setSpecialGazeWhisper(true);
    setTimeout(() => setSpecialGazeWhisper(false), 4500);
  };

  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      transition: {
        duration: 0.55,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
      transition: {
        duration: 0.45,
        ease: 'easeIn' as const,
      },
    }),
  };

  return (
    <section
      id="memory-book"
      className="relative w-full py-12 px-4 flex flex-col items-center select-none overflow-hidden"
      style={{
        backgroundColor: '#fbf4ea',
        backgroundImage: 'radial-gradient(#d6c3ad 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
      aria-label="মিনুর স্মৃতির বই"
    >
      <Lightbox
        imageSrc={selectedImage?.src || null}
        caption={selectedImage?.caption}
        onClose={() => setSelectedImage(null)}
      />

      {/* Book Header Title & Theme */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a86532] font-serif-bengali font-semibold">
          <BookOpen className="w-4 h-4 text-[#d97706]" />
          <span>মিনুর স্মৃতির ডায়েরি</span>
        </div>
        <p className="mt-1 text-xs text-[#8c5f3b]/80 font-serif-bengali">
          পাতা উল্টে উল্টে মিনুর গল্পটা পড়ো
        </p>

        {/* Page progress paws */}
        <div className="flex items-center gap-1.5 mt-3">
          {chapters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx !== currentPage) {
                  setDirection(idx > currentPage ? 1 : -1);
                  audioManager.playPageTurnSound();
                  audioManager.haptic(15);
                  setCurrentPage(idx);
                }
              }}
              aria-label={`পাতা ${idx + 1}`}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                idx === currentPage
                  ? 'bg-[#d97706] text-white scale-110 shadow-md shadow-[#d97706]/40'
                  : 'bg-white/80 text-[#b58b68] border border-[#e8d2bd] hover:bg-[#faeedd]'
              }`}
            >
              <span className="text-[10px] font-serif-bengali font-bold">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Book Container with Perspective */}
      <div
        className="relative w-full max-w-[390px] min-h-[580px] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full relative"
          >
            <MemoryPageCard
              key={currentPage}
              chapter={currentChapter}
              currentPage={currentPage}
              totalPages={totalPages}
              isPurringActive={isPurringActive}
              onFeelPurr={handleFeelPurr}
              onGazeInEyes={handleGazeInEyes}
              specialGazeWhisper={specialGazeWhisper}
              onSelectImage={(src, caption) => setSelectedImage({ src, caption })}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Final Chapter Prompt when on last page */}
      {currentPage === totalPages - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[390px] mt-4 p-3.5 rounded-2xl bg-[#fff5e8] border border-[#f5d799] text-center shadow-sm"
        >
          <p className="text-xs font-serif-bengali text-[#a86532] leading-relaxed">
            ✨ মিনুর সব স্মৃতির পাতা পড়া শেষ হয়েছে। এবার মিনুর শেষ বার্তা দেখতে নিচের বোতামে চাপ দাও।
          </p>
        </motion.div>
      )}

      {/* Book Navigation Bar: "পূর্ববর্তী পাতা" & "পরবর্তী পাতা" Buttons */}
      <div className="w-full max-w-[390px] mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`min-h-[48px] px-5 py-2.5 rounded-full flex items-center gap-1.5 text-sm font-serif-bengali font-medium transition-all cursor-pointer ${
            currentPage === 0
              ? 'opacity-35 cursor-not-allowed bg-[#ebd9c8] text-[#9c785b]'
              : 'bg-white text-[#6b4226] border border-[#e3ceba] shadow-sm hover:bg-[#faede0] active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>পূর্ববর্তী পাতা</span>
        </button>

        <button
          type="button"
          onClick={handleNextPage}
          className={`min-h-[48px] flex-1 px-5 py-2.5 rounded-full text-white shadow-md flex items-center justify-center gap-2 text-sm font-serif-bengali font-semibold active:scale-95 transition-transform cursor-pointer ${
            currentPage === totalPages - 1
              ? 'bg-gradient-to-r from-[#df7283] via-[#e88d67] to-[#df7283] shadow-[#df7283]/40 animate-pulse'
              : 'bg-gradient-to-r from-[#e06b80] to-[#e88d67] shadow-[#e06b80]/30'
          }`}
        >
          <span>
            {currentPage === totalPages - 1
              ? (isFinalMessageUnlocked ? "মিনুর শেষ বার্তা নিচে দেখুন ⬇️" : "মিনুর শেষ বার্তা দেখো 🐾 ➔")
              : "পরবর্তী পাতা ➔"}
          </span>
          {currentPage < totalPages - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
