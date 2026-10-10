'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Mail,
} from 'lucide-react';
import { MemorialConfig } from '@/src/config';
import StarFieldFireflies from './StarFieldFireflies';
import LoveLetterEnvelope from './LoveLetterEnvelope';

interface MessageVideoProps {
  messageConfig: MemorialConfig['message'];
  onOpenLetter?: () => void;
  isLetterUnlocked?: boolean;
  isMuted?: boolean;
  onToggleAudio?: () => void;
}

export default function MessageVideo({
  messageConfig,
  onOpenLetter,
  isLetterUnlocked = false,
  isMuted = false,
  onToggleAudio,
}: MessageVideoProps) {
  const embedUrl = messageConfig.streamableEmbedUrl || 'https://streamable.com/e/w04166';

  return (
    <section
      id="minu-message"
      className="relative w-full py-16 px-4 bg-gradient-to-b from-[#060913] via-[#090e23] to-[#060913] text-[#fff4e0] select-none overflow-hidden"
    >
      {/* Background Soft Fireflies & Stars */}
      <StarFieldFireflies showFireflies={true} density="subtle" />

      {/* Decorative Golden Ambient Backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#f4c56a]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-sm mx-auto text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f4c56a]/15 border border-[#f4c56a]/30 text-xs font-serif-bengali text-[#f4c56a] mb-3 shadow-[0_0_15px_rgba(244,197,106,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#f4c56a]" />
          <span>মিনুর শেষ বার্তা ও চিঠি</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-serif-bengali font-bold text-[#fff4e0] tracking-tight drop-shadow-md"
        >
          {messageConfig.transitionLine || 'মিনু তোমাকে কিছু বলতে চায়...'}
        </motion.h2>

        <p className="mt-2 text-xs sm:text-sm font-serif-bengali text-[#e8d2be]/80 leading-relaxed max-w-xs mx-auto">
          এই মুহূর্তে মিনুর কথাগুলো অনুভব করো, যে ভালোবাসা মিনু রেখে গেছে তা চিরদিনের।
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#f4c56a]/50 to-transparent mx-auto mt-4" />
      </div>

      {/* 💌 The Love Letter Envelope Experience (Matches Image 1 & Image 2) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <LoveLetterEnvelope
          ownerName="নওরিন"
          catName="মিনু"
          isMuted={isMuted}
          onToggleAudio={onToggleAudio}
        />
      </motion.div>

      {/* 🐾 Minu's Memorial Video - Seamless & Borderless */}
      <div className="relative z-10 max-w-[390px] w-full mx-auto mt-8 flex flex-col items-center">
        {/* Video Player Display: Streamable embed, blended without borders */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 shadow-2xl shadow-black">
          <iframe
            src={embedUrl}
            title="মিনুর ভিডিও - Streamable"
            className="w-full h-full border-0 rounded-2xl"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Transition to Letter to Minu Section Button */}
      {onOpenLetter && (
        <div className="relative z-10 max-w-[390px] mx-auto mt-10 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={onOpenLetter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#e06b80] via-[#e88d67] to-[#e06b80] text-white shadow-lg shadow-[#e06b80]/30 flex items-center justify-center gap-2 text-sm font-serif-bengali font-semibold cursor-pointer active:scale-95 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>
              {isLetterUnlocked
                ? 'মিনুর উদ্দেশ্যে চিঠি নিচে দেখুন ⬇️'
                : 'মিনুর উদ্দেশ্যে চিঠি পাঠাও 💌'}
            </span>
          </motion.button>
          <span className="mt-2 text-[11px] font-serif-bengali text-[#f4c56a]/80">
            যে কথাগুলো মিনুকে বলা হয়নি, আকাশের ঠিকানায় লিখে দাও
          </span>
        </div>
      )}
    </section>
  );
}
