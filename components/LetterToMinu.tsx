'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Sparkles,
  Edit3,
  CheckCircle2,
  Feather,
  X,
  Phone,
  MailOpen,
  Copy,
  Check,
} from 'lucide-react';
import { MemorialConfig } from '@/src/config';
import StarFieldFireflies from './StarFieldFireflies';

interface LetterToMinuProps {
  config: MemorialConfig;
}

const PRESET_THOUGHTS = [
  "খুব মিস করি তোকে সোনা 🐾",
  "তুই আমার জীবনের সবচেয়ে সুন্দর উপহার ছিলি",
  "আমার কোলে তোর খালি জায়গাটা কেউ নিতে পারবে না",
  "ওপারে গিয়ে সুখে থাকিস আমার লক্ষ্মী বিড়াল",
];

// Exact verbatim letter from Minu per user instructions (DO NOT ALTER)
const MINU_RESPONSE_PARAGRAPHS = [
  "একটা কথা তোমাকে বলে যাই, নওরিন। আমার এই গল্পটা এত যত্ন করে তোমার কাছে এনেছে তোমার একজন বন্ধু, তুমি যাকে হাসান সাহেব বলে সম্বোধন করো । সে চেয়েছিল, মিনু আরেকবার তোমার সামনে এসে বসুক, তোমাকে একটু ভালোবাসুক। তুমি আমার ভালোবাসাটা আরেকবার অনুভব করো...।",
  "তুমি কখনো একা নও, নওরিন। তোমার চারপাশে এমন মানুষ আছে, যারা তোমাকে ভালোবাসে।\nআমি যেমন কিছু না বলে পাশে এসে বসতাম, সেও তেমনি তোমার পাশেই আছে...",
  "কখনো মন খারাপ হলে, বা কিছু বলতে ইচ্ছে করলে, তাকে একটা ফোন কোরো। এই যে তার নম্বর : 01898660824  আমি তোমার জন্য রেখে গেলাম...। \nতুমি সব সময় ভালো থেকো  প্রিয় নওরিন",
];

export default function LetterToMinu({ config }: LetterToMinuProps) {
  const [letterText, setLetterText] = useState('');
  const [hasSentLetter, setHasSentLetter] = useState(false);
  const [sentLetterData, setSentLetterData] = useState<{ text: string; date: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [showFlyingEnvelope, setShowFlyingEnvelope] = useState(false);
  const [showMinuResponseModal, setShowMinuResponseModal] = useState(false);
  const [showNowrinSavedLetter, setShowNowrinSavedLetter] = useState(false);
  const [hasCopiedPhone, setHasCopiedPhone] = useState(false);

  // Per user instruction:
  // "আগে কোনো চিঠি থাকবে না মিনুর পক্ষ থেকে।"
  // Initially only the letter writing form is displayed. No letter from Minu exists prior to sending.

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterText.trim() || isSending) return;

    setIsSending(true);
    setShowFlyingEnvelope(true);

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;

    const newLetterData = {
      text: letterText.trim(),
      date: formattedDate,
    };

    // After Nowrin's letter ascends into the stars, Minu's incoming response envelope arrives with animation!
    setTimeout(() => {
      setSentLetterData(newLetterData);
      setIsSending(false);
      setShowFlyingEnvelope(false);
      setHasSentLetter(true);
      // Minu's letter has arrived as a sealed envelope.
      // Nowrin will see it arriving on screen and tap to open it.
    }, 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText('01898660824');
    setHasCopiedPhone(true);
    setTimeout(() => setHasCopiedPhone(false), 2000);
  };

  const handleAddPreset = (thought: string) => {
    setLetterText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return thought;
      return `${trimmed} ${thought}`;
    });
  };

  const handleWriteAnother = () => {
    setHasSentLetter(false);
    setShowMinuResponseModal(false);
    setShowNowrinSavedLetter(false);
    setLetterText('');
  };

  return (
    <section
      id="letter-to-minu"
      className="relative w-full py-16 px-4 bg-gradient-to-b from-[#060913] via-[#0b1026] to-[#060913] text-[#fff4e0] select-none overflow-hidden"
    >
      {/* Background ambient stars & subtle fireflies */}
      <StarFieldFireflies showFireflies={true} density="subtle" />

      {/* Decorative Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#f4a8b8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-sm mx-auto text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f4a8b8]/15 border border-[#f4a8b8]/30 text-xs font-serif-bengali text-[#f4a8b8] mb-3 shadow-[0_0_15px_rgba(244,168,184,0.2)]"
        >
          <Feather className="w-3.5 h-3.5 text-[#f4c56a]" />
          <span>আকাশের ঠিকানায় চিঠি</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-serif-bengali font-bold text-[#fff4e0] tracking-tight leading-snug drop-shadow-md"
        >
          মিনুর উদ্দেশ্যে তোমার চিঠি
        </motion.h2>

        <p className="mt-2 text-xs sm:text-sm font-serif-bengali text-[#e3cebe]/80 leading-relaxed max-w-xs mx-auto">
          যে কথাগুলো মিনুকে সামনাসামনি বলা হয়নি, মনের গভীর থেকে লিখে দাও... আকাশে নক্ষত্র হয়ে মিনু তোমার কথা শুনবে।
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#f4c56a]/50 to-transparent mx-auto mt-4" />
      </div>

      {/* Main Interactive Container */}
      <div className="relative z-10 max-w-[390px] mx-auto">
        <AnimatePresence mode="wait">
          {!hasSentLetter ? (
            /* STEP 1: Letter Writing Form (Initially shown. Before sending, no letter from Minu exists) */
            <motion.form
              key="letter-form"
              onSubmit={handleSendLetter}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#131936]/90 to-[#0b0f24]/95 border border-[#f4a8b8]/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col"
            >
              {/* Top stationery decorative header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-[#f4c56a] font-serif-bengali font-semibold">
                  <span>✉️</span>
                  <span>মিনুর নামীয় খাম</span>
                </div>
                <span className="text-[11px] text-[#f4a8b8]/80 font-serif-bengali">
                  নওরিনের স্মৃতিপত্র
                </span>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  placeholder="মিনু, তোকে খুব বলতে ইচ্ছা করে... তুই যেখানেই থাকিস, ভালো থাকিস। আমি তোকে কত মিস করি তুই যদি জানতে পারতি..."
                  rows={5}
                  required
                  className="w-full p-4 rounded-2xl bg-black/40 border border-[#f4a8b8]/30 text-[15px] font-serif-bengali text-[#fff4e0] placeholder-[#fff4e0]/35 focus:outline-none focus:border-[#f4c56a] focus:ring-1 focus:ring-[#f4c56a] leading-[1.8] resize-none transition-all shadow-inner"
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-white/40 font-mono">
                  {letterText.length} অক্ষর
                </div>
              </div>

              {/* Quick Sentiment Chips */}
              <div className="mt-3">
                <p className="text-[11px] font-serif-bengali text-[#f4c56a]/90 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#f4c56a]" />
                  <span>ছুঁয়ে দেওয়া কিছু কথা (ট্যাপ করে যুক্ত করুন):</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_THOUGHTS.map((thought, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPreset(thought)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-[11px] font-serif-bengali text-[#e8d5c4] transition-all cursor-pointer"
                    >
                      + {thought}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!letterText.trim() || isSending}
                  className={`flex-1 py-3 px-5 rounded-2xl font-serif-bengali text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    !letterText.trim() || isSending
                      ? 'opacity-40 bg-[#3b2d29] text-white/60 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#df7283] via-[#e88d67] to-[#df7283] text-white shadow-[#df7283]/30 hover:brightness-110 active:scale-95'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSending
                      ? 'চিঠিটি আকাশে উড়ে যাচ্ছে...'
                      : 'চিঠিটি মিনুর ঠিকানায় পাঠিয়ে দাও 🕊️'}
                  </span>
                </button>
              </div>
            </motion.form>
          ) : (
            /* STEP 2: Nowrin sent the letter! An incoming animated letter arrives from Minu! */
            <motion.div
              key="minu-arrived-container"
              initial={{ opacity: 0, y: -90, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, type: 'spring', bounce: 0.35 }}
              className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#182046]/95 via-[#111633]/95 to-[#0b0f24]/95 border-2 border-[#f4c56a]/60 shadow-[0_0_50px_rgba(244,197,106,0.35)] backdrop-blur-md text-center overflow-hidden"
            >
              {/* Golden Corner Accents */}
              <div className="absolute top-2.5 left-2.5 text-[#f4c56a]/40 text-xs select-none">✦</div>
              <div className="absolute top-2.5 right-2.5 text-[#f4c56a]/40 text-xs select-none">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-[#f4c56a]/40 text-xs select-none">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-[#f4c56a]/40 text-xs select-none">✦</div>

              {/* Status Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-serif-bengali text-[#4ade80]">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  <span>তোমার চিঠি পৌঁছে গেছে</span>
                </div>
                <span className="text-[11px] text-[#f4a8b8]/70 font-serif-bengali">
                  {sentLetterData?.date}
                </span>
              </div>

              {/* The Incoming Letter Envelope (Animates gently floating down from heaven) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => setShowMinuResponseModal(true)}
                className="my-3 p-5 rounded-2xl bg-gradient-to-b from-[#251d3d]/90 via-[#19142b]/95 to-[#100d1e]/95 border-2 border-[#f4c56a]/70 shadow-[0_10px_35px_rgba(244,197,106,0.3)] cursor-pointer hover:border-[#fbbf24] transition-all group active:scale-95"
              >
                {/* Envelope Graphic with Cat Paw Wax Seal */}
                <div className="relative inline-block my-2">
                  <motion.span
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl inline-block filter drop-shadow-[0_0_25px_rgba(244,197,106,0.9)] select-none"
                  >
                    💌
                  </motion.span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#d97706] to-[#92400e] border border-[#fbbf24] flex items-center justify-center text-xs select-none shadow-md">
                    🐾
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1.5 text-[#f4c56a] text-xs font-serif-bengali font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#fbbf24] animate-spin" style={{ animationDuration: '4s' }} />
                  <span>মিনুর পক্ষ থেকে একটি চিঠি এসেছে!</span>
                </div>

                <p className="mt-1.5 text-xs font-serif-bengali text-[#fff2df]/90 leading-relaxed max-w-[260px] mx-auto">
                  প্রিয় নওরিনের উদ্দেশ্যে মিনু আকাশ থেকে একটি চিঠি পাঠিয়ে দিয়েছে...
                </p>

                {/* Big Inviting Open Button */}
                <div className="mt-4 py-3 px-5 rounded-xl bg-gradient-to-r from-[#f4c56a] via-[#fbbf24] to-[#f59e0b] text-[#1a0f05] font-serif-bengali font-bold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 group-hover:brightness-110 transition-all">
                  <MailOpen className="w-4 h-4 text-[#1a0f05]" />
                  <span>সম্পূর্ণ চিঠিটি পড়তে এখানে ক্লিক করো 🐾</span>
                </div>
              </motion.div>

              {/* View Nowrin's own sent letter toggle */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowNowrinSavedLetter(!showNowrinSavedLetter)}
                  className="text-xs font-serif-bengali text-[#f4a8b8] hover:text-[#fff4e0] underline transition-colors cursor-pointer py-1"
                >
                  {showNowrinSavedLetter ? 'তোমার চিঠিটি লুকান' : 'তোমার পাঠানো চিঠিটি দেখুন'}
                </button>

                {showNowrinSavedLetter && sentLetterData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 text-left text-xs font-serif-bengali text-[#e3cebe] leading-relaxed italic"
                  >
                    &ldquo;{sentLetterData.text}&rdquo;
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={handleWriteAnother}
                  className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs font-serif-bengali text-white/60 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#f4c56a]" />
                  <span>মিনুকে আরেকটি নতুন চিঠি লিখুন</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flying Envelope Starlight Animation (When Nowrin's letter flies to the stars) */}
        <AnimatePresence>
          {showFlyingEnvelope && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -300,
                scale: [0.8, 1.2, 0.9, 0.4],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-30"
            >
              <div className="relative">
                <span className="text-5xl drop-shadow-[0_0_25px_rgba(244,197,106,0.9)]">
                  ✉️
                </span>
                <motion.span
                  animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-3 -right-3 text-2xl text-[#f4c56a]"
                >
                  ✨
                </motion.span>
              </div>
              <p className="mt-3 text-xs font-serif-bengali text-[#f4c56a] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-[#f4c56a]/40">
                মিনুর কাছে উড়ে যাচ্ছে... 🐾
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STEP 3: Complete Minu Response Letter (Parchment Modal - Revealed ONLY on click) */}
      <AnimatePresence>
        {showMinuResponseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            {/* Ambient Falling Starlight Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-10 left-1/4 w-72 h-72 bg-[#f4a8b8]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-[#f4c56a]/20 rounded-full blur-3xl" />
            </div>

            {/* Response Letter Parchment Card */}
            <motion.div
              initial={{ opacity: 0, y: -70, scale: 0.82 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.85 }}
              transition={{ duration: 0.7, type: 'spring', damping: 20, stiffness: 120 }}
              className="relative w-full max-w-md my-auto rounded-3xl bg-gradient-to-b from-[#fffbf4] via-[#faf4e6] to-[#f4ebe0] text-[#26170d] p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(244,197,106,0.4)] border-2 border-[#e8cfa8] overflow-hidden"
            >
              {/* Golden celestial corner ornaments */}
              <div className="absolute top-3 left-3 text-[#d97706]/40 text-sm select-none">✦</div>
              <div className="absolute top-3 right-3 text-[#d97706]/40 text-sm select-none">✦</div>
              <div className="absolute bottom-3 left-3 text-[#d97706]/40 text-sm select-none">✦</div>
              <div className="absolute bottom-3 right-3 text-[#d97706]/40 text-sm select-none">✦</div>

              {/* Close Button at top-right */}
              <button
                type="button"
                onClick={() => setShowMinuResponseModal(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#3b2d29]/10 hover:bg-[#3b2d29]/20 text-[#3b2d29] flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header Banner */}
              <div className="text-center pt-2 pb-3 mb-4 border-b border-[#dfcfbe]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d97706]/10 border border-[#d97706]/25 text-[11px] font-serif-bengali text-[#92400e] mb-2 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>মিনুর পক্ষ থেকে একটি চিঠি 🐾</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-bengali font-bold text-[#3b2011] tracking-tight">
                  প্রিয় নওরিনের উদ্দেশ্যে
                </h3>
              </div>

              {/* Minu's Wax Paw Seal Icon */}
              <div className="flex justify-center -mt-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d97706] to-[#b45309] border-2 border-[#fef3c7] shadow-[0_4px_15px_rgba(217,119,6,0.35)] flex items-center justify-center text-xl select-none text-white">
                  🐾
                </div>
              </div>

              {/* Exact Verbatim Letter Content per User Specification */}
              <div className="space-y-4 font-serif-bengali text-[15px] sm:text-[15.5px] leading-[1.9] text-[#2c1d11] px-1 sm:px-2">
                <p className="whitespace-pre-wrap">
                  {MINU_RESPONSE_PARAGRAPHS[0]}
                </p>

                <p className="whitespace-pre-wrap">
                  {MINU_RESPONSE_PARAGRAPHS[1]}
                </p>

                <p className="whitespace-pre-wrap">
                  {MINU_RESPONSE_PARAGRAPHS[2]}
                </p>
              </div>

              {/* Heartfelt Interactive Phone Actions for Nowrin */}
              <div className="mt-6 pt-4 border-t border-[#dfcfbe] flex flex-col sm:flex-row gap-2">
                <a
                  href="tel:01898660824"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] hover:brightness-110 active:scale-95 text-white font-serif-bengali text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all no-underline cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>হাসান সাহেবকে কল করুন</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="py-3 px-4 rounded-xl bg-[#3b2011]/10 hover:bg-[#3b2011]/15 active:scale-95 text-[#3b2011] font-serif-bengali text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {hasCopiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#3b2011]" />
                      <span>নম্বর কপি করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Close Button at footer */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setShowMinuResponseModal(false)}
                  className="text-xs font-serif-bengali text-[#785b46] hover:text-[#3b2011] underline transition-colors cursor-pointer py-1"
                >
                  চিঠিটি বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
