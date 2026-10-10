'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { MemorialConfig } from '@/src/config';
import { audioManager } from '@/lib/audio';
import StarFieldFireflies from './StarFieldFireflies';

interface EndingProps {
  config: MemorialConfig;
}

interface FloatingTribute {
  id: number;
  type: 'paw' | 'heart';
  x: number;
  rotation: number;
  scale: number;
}

interface SkyLantern {
  id: number;
  text: string;
  x: number;
}

const MEMORY_WHISPERS = [
  "আমি তোকে খুব মিস করি রে মিনু...",
  "আমার কোল সবসময় তোর জন্যই থাকবে।",
  "ওপারে গিয়ে ভালো থাকিস, আমার লক্ষ্মী বিড়াল।",
  "তোর ওই নরম তুলতুলে ডাকটা খুব মনে পড়ে...",
];

let globalTributeId = 1;
const X_OFFSETS = [-45, 30, -15, 50, -35, 20, -55, 40];

export default function Ending({ config }: EndingProps) {
  const [tributes, setTributes] = useState<FloatingTribute[]>([]);
  const [loveCount, setLoveCount] = useState(0);
  const [skyLanterns, setSkyLanterns] = useState<SkyLantern[]>([]);
  const [customText, setCustomText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleSendLove = () => {
    audioManager.haptic([20, 25, 20]);
    audioManager.playStarTwinkleSound();
    setLoveCount((prev) => prev + 1);

    const id1 = ++globalTributeId;
    const id2 = ++globalTributeId;
    const offset1 = X_OFFSETS[id1 % X_OFFSETS.length];
    const offset2 = X_OFFSETS[id2 % X_OFFSETS.length];

    const newItems: FloatingTribute[] = [
      {
        id: id1,
        type: id1 % 2 === 0 ? 'heart' : 'paw',
        x: offset1,
        rotation: (id1 % 30) - 15,
        scale: 1,
      },
      {
        id: id2,
        type: id2 % 2 === 0 ? 'paw' : 'heart',
        x: offset2,
        rotation: (id2 % 30) - 15,
        scale: 0.9,
      },
    ];

    setTributes((prev) => {
      const combined = [...prev, ...newItems];
      return combined.slice(-12);
    });

    setTimeout(() => {
      setTributes((prev) => prev.filter((item) => !newItems.some((n) => n.id === item.id)));
    }, 2800);
  };

  const handleSendLantern = (textToSend: string) => {
    if (!textToSend.trim()) return;

    audioManager.playCandleIgnitionSound();
    audioManager.haptic([30, 40, 30]);

    const id = ++globalTributeId;
    const newLantern: SkyLantern = {
      id,
      text: textToSend,
      x: X_OFFSETS[id % X_OFFSETS.length] * 0.7,
    };

    setSkyLanterns((prev) => [...prev.slice(-3), newLantern]);
    setCustomText('');
    setShowNoteInput(false);

    // Clean up lantern after floating into sky
    setTimeout(() => {
      setSkyLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, 7000);
  };

  return (
    <footer className="relative w-full min-h-[92dvh] flex flex-col items-center justify-between px-6 pt-16 pb-[calc(env(safe-area-inset-bottom)+2.5rem)] bg-gradient-to-b from-[#060913] via-[#090d1f] to-[#04060c] text-[#fff4e0] overflow-hidden select-none">
      {/* Background stars and upward floating embers */}
      <StarFieldFireflies showFireflies={true} density="subtle" />

      {/* Floating Sky Lanterns Layer */}
      <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-end overflow-hidden">
        <AnimatePresence>
          {skyLanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                y: -580,
                x: lantern.x,
                scale: [0.8, 1, 0.9, 0.7],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6.5, ease: 'easeOut' }}
              className="absolute bottom-40 px-4 py-3 rounded-2xl bg-gradient-to-b from-[#f4c56a]/30 via-[#2a1d3a]/80 to-[#120f26]/90 border border-[#f4c56a]/60 backdrop-blur-md shadow-[0_0_25px_rgba(244,197,106,0.6)] flex items-center gap-2 text-center max-w-[280px]"
            >
              <Sparkles className="w-4 h-4 text-[#f4c56a] shrink-0" />
              <span className="text-xs font-serif-bengali text-[#fff4e0] leading-relaxed">
                {lantern.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lit Memorial Candle Reprise */}
      <div className="relative z-10 flex flex-col items-center mt-2">
        {/* Ambient flame glow bloom */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 w-32 h-32 rounded-full bg-radial from-[#f4c56a]/30 via-transparent to-transparent blur-xl pointer-events-none"
        />

        {/* Cute Wide-Eyed Kitten Illustration */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center drop-shadow-[0_10px_25px_rgba(244,197,106,0.3)]"
          >
            <Image
              src="/assets/photos/kitten-end.png"
              alt="মিনু"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
              priority
            />
          </motion.div>
        </div>

        {/* Minu's Final Words */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-xl sm:text-2xl font-serif-bengali text-center text-[#fff4e0] font-normal leading-relaxed max-w-xs drop-shadow-sm"
        >
          &ldquo;{config.ending.finalLine}&rdquo;
        </motion.p>
      </div>

      {/* Interactive Love Tribute Button and Floating Emitter */}
      <div className="relative z-10 w-full max-w-xs my-6 flex flex-col items-center gap-3">
        {/* Floating animated tributes container */}
        <div className="absolute -top-16 inset-x-0 h-40 pointer-events-none flex justify-center items-end">
          <AnimatePresence>
            {tributes.map((item) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0.9,
                  scale: 0.4,
                  x: item.x,
                  y: 0,
                  rotate: item.rotation,
                }}
                animate={{
                  opacity: 0,
                  scale: item.scale,
                  x: item.x * 1.3,
                  y: -180,
                  rotate: item.rotation * 1.5,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.4, ease: 'easeOut' }}
                className="absolute text-[#f4c56a]"
              >
                {item.type === 'heart' ? (
                  <Heart className="w-6 h-6 fill-[#e8a5a5] text-[#e8a5a5] drop-shadow-[0_0_8px_rgba(232,165,165,0.7)]" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-[#f4c56a] drop-shadow-[0_0_8px_rgba(244,197,106,0.7)]"
                  >
                    <ellipse cx="6" cy="7" rx="1.6" ry="2.2" />
                    <ellipse cx="11.5" cy="5" rx="1.6" ry="2.2" />
                    <ellipse cx="17" cy="7" rx="1.6" ry="2.2" />
                    <path d="M11.5 11.5c-2.8 0-5 1.8-5 4.2 0 1.9 1.5 3.3 3.4 3.3 1 0 1.4-.4 1.6-.4s.6.4 1.6.4c1.9 0 3.4-1.4 3.4-3.3 0-2.4-2.2-4.2-5-4.2z" />
                  </svg>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Primary Tribute Button */}
        <button
          type="button"
          onClick={handleSendLove}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#17203b] via-[#212b4e] to-[#17203b] border border-[#f4c56a]/40 text-[#fff4e0] font-medium text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,197,106,0.25)] active:scale-95 transition-transform cursor-pointer"
        >
          <Heart className="w-5 h-5 text-[#e8a5a5] fill-[#e8a5a5]/40" />
          <span>{config.ending.actionButton}</span>
          {loveCount > 0 && (
            <span className="text-xs font-mono tabular-nums text-[#f4c56a] ml-1">
              +{loveCount}
            </span>
          )}
        </button>

        {/* Secondary Emotional Feature: আকাশে চিঠি পাঠাও (Whisper to the Sky) */}
        {!showNoteInput ? (
          <button
            type="button"
            onClick={() => setShowNoteInput(true)}
            className="text-xs font-serif-bengali text-[#f4c56a]/80 underline underline-offset-4 decoration-[#f4c56a]/40 p-2 cursor-pointer active:opacity-75"
          >
            ✦ মিনুর উদ্দেশ্যে আকাশে একটি চিঠি পাঠাও ✦
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full p-4 rounded-2xl bg-[#0e1633]/90 border border-[#f4c56a]/30 backdrop-blur-md flex flex-col gap-2.5"
          >
            <span className="text-xs font-serif-bengali text-[#f4c56a] text-center font-medium">
              একটি বার্তা নির্বাচন করো অথবা লিখো:
            </span>

            {/* Quick emotional presets */}
            <div className="flex flex-col gap-1.5">
              {MEMORY_WHISPERS.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendLantern(w)}
                  className="text-left text-xs font-serif-bengali py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#f4c56a]/40 text-[#fff4e0]/90 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  &ldquo;{w}&rdquo;
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-1.5 mt-1">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="নিজের ভাষায় কিছু বলো..."
                maxLength={60}
                className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-[#f4c56a]/20 text-xs text-[#fff4e0] placeholder-[#fff4e0]/40 focus:outline-none focus:border-[#f4c56a]"
              />
              <button
                type="button"
                onClick={() => handleSendLantern(customText)}
                disabled={!customText.trim()}
                className="w-10 h-10 rounded-xl bg-[#f4c56a] text-[#0b1026] flex items-center justify-center disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Line */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-xs text-[#fff4e0]/60 font-serif-bengali tracking-wide">
          {config.ending.footerText}
        </p>
      </div>
    </footer>
  );
}
