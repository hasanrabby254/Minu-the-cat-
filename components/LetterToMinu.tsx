'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Heart, Sparkles, Edit3, CheckCircle2, Feather, Star } from 'lucide-react';
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

export default function LetterToMinu({ config }: LetterToMinuProps) {
  const [letterText, setLetterText] = useState('');
  const [savedLetter, setSavedLetter] = useState<{ text: string; date: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showFlyingEnvelope, setShowFlyingEnvelope] = useState(false);

  // Load any previously saved letter from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('minu_memorial_letter');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.text) {
          queueMicrotask(() => {
            setSavedLetter(parsed);
            setLetterText(parsed.text);
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterText.trim()) return;

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

    try {
      localStorage.setItem('minu_memorial_letter', JSON.stringify(newLetterData));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSavedLetter(newLetterData);
      setIsSending(false);
      setIsEditing(false);
      setShowFlyingEnvelope(false);
    }, 2400);
  };

  const handleAddPreset = (thought: string) => {
    setLetterText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return thought;
      return `${trimmed} ${thought}`;
    });
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

      {/* Letter Box Container */}
      <div className="relative z-10 max-w-[390px] mx-auto">
        <AnimatePresence mode="wait">
          {savedLetter && !isEditing ? (
            /* Sent Keepsake Letter View (Gold Sealed Parchment Card) */
            <motion.div
              key="sent-letter-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="relative p-6 rounded-3xl bg-gradient-to-b from-[#161c38]/95 to-[#0e1329]/95 border border-[#f4c56a]/40 shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden"
            >
              {/* Golden Corner Accents */}
              <div className="absolute top-2 left-2 text-[#f4c56a]/30 text-xs select-none">✦</div>
              <div className="absolute top-2 right-2 text-[#f4c56a]/30 text-xs select-none">✦</div>
              <div className="absolute bottom-2 left-2 text-[#f4c56a]/30 text-xs select-none">✦</div>
              <div className="absolute bottom-2 right-2 text-[#f4c56a]/30 text-xs select-none">✦</div>

              {/* Status Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-serif-bengali text-[#4ade80]">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  <span>আকাশের ঠিকানায় পৌঁছে গেছে</span>
                </div>
                <span className="text-[11px] text-[#f4a8b8]/70 font-serif-bengali">
                  {savedLetter.date}
                </span>
              </div>

              {/* Wax Seal Badge */}
              <div className="flex justify-center -mt-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d97706] to-[#92400e] border-2 border-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center text-xl select-none">
                  🐾
                </div>
              </div>

              {/* Letter Content */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 relative">
                <p className="text-[15px] font-serif-bengali text-[#fff2df] leading-[1.85] italic whitespace-pre-wrap">
                  &ldquo;{savedLetter.text}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  <span className="text-xs font-serif-bengali text-[#f4a8b8]">
                    — ভালোবাসা সহ, নওরিন ♥
                  </span>
                </div>
              </div>

              {/* Action: Edit or Write Another */}
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-serif-bengali text-[#fff4e0] flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#f4c56a]" />
                  <span>চিঠিটি সম্পাদনা বা নতুন করে লিখুন</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Letter Writing Form */
            <motion.form
              key="letter-form"
              onSubmit={handleSendLetter}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
                {savedLetter && isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3 px-4 rounded-2xl bg-white/10 border border-white/15 text-xs font-serif-bengali text-white/80 transition-all cursor-pointer active:scale-95"
                  >
                    বাতিল
                  </button>
                )}

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
          )}
        </AnimatePresence>

        {/* Flying Envelope Starlight Animation */}
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
    </section>
  );
}
