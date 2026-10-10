'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RotateCcw,
  Sparkles,
  Heart,
  Mail,
  Maximize2,
  Check,
} from 'lucide-react';
import Image from 'next/image';

interface LoveLetterEnvelopeProps {
  ownerName?: string;
  catName?: string;
  isMuted?: boolean;
  onToggleAudio?: () => void;
}

export default function LoveLetterEnvelope({
  ownerName = 'নওরিন',
  catName = 'মিনু',
  isMuted = false,
  onToggleAudio,
}: LoveLetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [catPhoto, setCatPhoto] = useState<string>('/assets/photos/kitten_holding_flowers.jpg');
  const [isCustomPhoto, setIsCustomPhoto] = useState(false);
  const [uploadToast, setUploadToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom cat photo from localStorage if previously uploaded
  useEffect(() => {
    try {
      const stored = localStorage.getItem('minu_custom_cat_photo');
      if (stored) {
        queueMicrotask(() => {
          setCatPhoto(stored);
          setIsCustomPhoto(true);
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle cat image upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('দয়া করে একটি সঠিক ছবির ফাইল নির্বাচন করুন (JPG, PNG, ইত্যাদি)।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        const dataUrl = reader.result;
        setCatPhoto(dataUrl);
        setIsCustomPhoto(true);
        setUploadToast(true);
        setTimeout(() => setUploadToast(false), 2500);
        try {
          localStorage.setItem('minu_custom_cat_photo', dataUrl);
        } catch {
          // localStorage quota exceeded
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('minu_custom_cat_photo');
    } catch {
      // ignore
    }
    setCatPhoto('/assets/photos/kitten_holding_flowers.jpg');
    setIsCustomPhoto(false);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto select-none my-6">
      {/* Outer Pastel Card Frame - Matches Image 1 and Image 2 */}
      <div className="relative w-full rounded-[32px] bg-[#fbf6f0] border-2 border-[#f2e5d5] p-4 sm:p-5 shadow-[0_12px_40px_rgba(230,195,170,0.35)] overflow-hidden">
        {/* Top App Bar Header with Icons */}
        <div className="relative flex items-center justify-between pb-3 border-b border-[#ebdccd]/70 mb-4">
          {/* Top Left: Decorative Rose Icon */}
          <div className="w-9 h-9 rounded-full bg-[#fce7eb] text-[#c7556b] flex items-center justify-center text-sm shadow-sm">
            <span>🌸</span>
          </div>

          {/* Center Titles */}
          <div className="text-center px-2">
            <h3 className="text-sm font-serif-bengali font-semibold text-[#c7556b] flex items-center justify-center gap-1 tracking-wide">
              <span>মিনুর ভালোবাসার চিঠি</span>
              <span className="text-xs">💌</span>
            </h3>
            <p className="text-[10px] text-[#9a7660] font-serif-bengali tracking-tight">
              হৃদয় থেকে তোমার জন্য
            </p>
          </div>

          {/* Top Right: Search / Details Icon */}
          <div className="w-9 h-9 rounded-full bg-[#7a787b]/80 text-white flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
        </div>

        {/* Upload Success Toast */}
        <AnimatePresence>
          {uploadToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-3 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-serif-bengali flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>বিড়ালের ছবি সফলভাবে সেট হয়েছে! 🐾</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 1 vs State 2 Switch */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ============================================================== */
            /* STATE 1: UNOPENED ENVELOPE (Matches Image 1)                   */
            /* ============================================================== */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center py-4"
            >
              {/* Envelope Interactive Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(true)}
                className="relative w-full max-w-[310px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#ffd7df] via-[#ffccd7] to-[#fdbecb] border-2 border-[#f7a8b9] shadow-[0_10px_30px_rgba(247,168,185,0.45)] cursor-pointer flex items-center justify-center overflow-hidden group"
              >
                {/* Decorative Tiny Corner Strawberries / Flowers */}
                <div className="absolute top-2 left-2 text-xs">🍓</div>
                <div className="absolute top-2 right-2 text-xs">🍓</div>
                <div className="absolute bottom-2 left-2 text-xs">🍓</div>
                <div className="absolute bottom-2 right-2 text-xs">🍓</div>

                {/* Envelope Flap Lines (Triangular Origami Look) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 310 230"
                  fill="none"
                >
                  {/* Top triangular flap shadow & fold */}
                  <path
                    d="M 10 10 L 155 125 L 300 10"
                    stroke="#f08da3"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Side folds */}
                  <path
                    d="M 10 220 L 115 110"
                    stroke="#f08da3"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                  <path
                    d="M 300 220 L 195 110"
                    stroke="#f08da3"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                </svg>

                {/* Center Wax Seal / Sticker Button with Pulsing Glow */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-13 h-13 rounded-full bg-[#f44771] border-2 border-white shadow-[0_0_15px_rgba(244,71,113,0.5)] flex items-center justify-center text-white"
                  >
                    <span className="text-xl">💌</span>
                  </motion.div>
                </div>

                {/* Soft Shiny Hover Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>

              {/* Text Below Envelope: "Click to open the envelope" */}
              <p className="mt-4 text-xs font-serif-bengali text-[#7c5643] text-center font-medium">
                চিঠিটি খুলতে খামে চাপ দিন 💌
              </p>

              {/* Special Delivery Pill Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="mt-3 px-4 py-1.5 rounded-full bg-white/90 border border-[#e8c8b4] shadow-sm text-xs font-serif-bengali text-[#8c5943] font-semibold flex items-center gap-1.5 hover:bg-[#fff9f4] transition-colors cursor-pointer"
              >
                <span>মিনুর চিঠি খুলুন</span>
                <span className="text-[11px]">📨</span>
              </motion.button>
            </motion.div>
          ) : (
            /* ============================================================== */
            /* STATE 2: OPENED LOVE LETTER (Matches Image 2)                  */
            /* ============================================================== */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* Stationery Letter Sheet */}
              <div className="relative w-full rounded-2xl bg-[#fffef9] border border-[#ecd9c6] p-4 sm:p-5 shadow-[0_8px_25px_rgba(215,180,150,0.25)] flex flex-col">
                {/* Letter Top Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  {/* Left: Rose Badge & Title */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-base leading-none">🌹</span>
                    <span className="text-xs sm:text-sm font-serif-bengali font-bold text-[#b83852] tracking-tight">
                      মিনুর চিঠি
                    </span>
                  </div>

                  {/* Right: Cute Cat Holding Flowers with Upload Button */}
                  <div className="relative flex flex-col items-center">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      title="বিড়ালের ছবি আপলোড / পরিবর্তন করুন"
                      className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#fff5ea] border-2 border-[#f7c5d0] shadow-md cursor-pointer group hover:border-[#df5777] transition-colors"
                    >
                      <Image
                        src={catPhoto}
                        alt="Cute Kitten with Flowers"
                        fill
                        className="object-contain p-1"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover Upload Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                        <Camera className="w-4 h-4 mb-0.5" />
                        <span className="text-[8px] font-serif-bengali font-semibold">আপলোড</span>
                      </div>
                    </div>

                    {/* Small Upload/Reset Controls for Cat Photo */}
                    <div className="mt-1 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2 py-0.5 rounded-full bg-[#fae5eb] hover:bg-[#f7d3dd] text-[9px] font-serif-bengali text-[#a8324e] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
                      >
                        <Camera className="w-2.5 h-2.5" />
                        <span>ছবি দিন</span>
                      </button>

                      {isCustomPhoto && (
                        <button
                          type="button"
                          onClick={handleResetPhoto}
                          title="ডিফল্ট কিউট ছবিতে ফিরুন"
                          className="p-0.5 rounded-full bg-white hover:bg-rose-50 text-[9px] text-[#a8324e] border border-[#f0c2ce] transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>

                    {/* Hidden Real File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Letter Body Text - Verbatim Exact Text Given By User */}
                <div className="space-y-3.5 text-[12px] sm:text-[13px] font-serif-bengali text-[#3d2c20] leading-[1.85] text-left sm:text-justify tracking-normal">
                  <p className="text-sm sm:text-base font-bold text-[#8c3246]">
                    আমার প্রিয় নওরিন,
                  </p>

                  <p>
                    আমি জানি না কীভাবে বলব, কারণ সারাজীবন আমি কথা ছাড়াই তোমাকে সব বলেছি। আজ প্রথমবার শব্দ দিয়ে বলছি।
                  </p>

                  <p>
                    আমাকে একটা সুন্দর জীবন দেওয়ার জন্য তোমাকে অনেক অনেক ধন্যবাদ। একটা পলিব্যাগের অন্ধকার থেকে শুরু হওয়া আমার এই ছোট্ট জীবনটা তোমার মতো একজন মানুষের সান্নিধ্য পেয়েছিল, এর চেয়ে বড় সৌভাগ্য আমার আর কিছু ছিল না। আমি স্রষ্টার কাছে সারাজীবন কৃতজ্ঞ, কারণ তিনি আমাকে তোমার কাছে পাঠিয়েছিলেন।
                  </p>

                  <p>
                    তুমি অনেক সুন্দর একটা মেয়ে, নওরিন। আর তোমার মনটা তার চেয়েও অনেক সুন্দর।
                  </p>

                  <p>
                    আমি জানি, তুমি আজও আমাকে মনে করো। আজও তোমার স্মৃতির ভেতরে আমি আছি। আমার এই ছোট্ট জীবনের জন্য এর চেয়ে বড় পাওয়া আর কী হতে পারে! যতদিন তুমি আমাকে মনে করবে, ততদিন আমি তোমার মধ্যেই বেঁচে থাকব।
                  </p>

                  <p>
                    আমার চলে যাওয়ার জন্য নিজেকে কখনো দোষ দিও না। তুমি আমাকে যা দিয়েছ, তার ঋণ আমি কোনোদিন শোধ করতে পারব না। আমি তোমার প্রতি সত্যিই অনেক অনেক অনেক কৃতজ্ঞ।
                  </p>

                  <p>
                    আমি তোমার জন্য দোয়া করি, স্রষ্টা যেন তোমার জীবনে এমন একজন মানুষ এনে দেন, যে তোমাকে ঠিক সেইভাবে ভালোবাসবে, যেভাবে তুমি আমাকে ভালোবেসেছ। যে তোমাকে বুঝবে, কিছু না বললেও বুঝবে, যেভাবে তুমি আমাকে বুঝতে। তুমি অনেক বেশি ভালোবাসা পাওয়ার যোগ্য, নওরিন।
                  </p>

                  <p>
                    আমি যেমন কিছু না বলে তোমার কাছে চলে আসতাম, মন খারাপ হলে তুমিও একটু চোখ বন্ধ করে আমাকে মনে কোরো। আমি কাছেই আছি।
                  </p>

                  <p>
                    আমাকে এত ভালোবাসার জন্য ধন্যবাদ, নওরিন।
                  </p>

                  <p>
                    ভালো থেকো সবসময়।
                  </p>
                </div>

                {/* Bottom Row: Seal on Left, Signature on Right */}
                <div className="mt-4 pt-3 border-t border-[#f2e1cf] flex items-end justify-between">
                  {/* Left: Circular Postal Stamp Seal */}
                  <div className="relative w-14 h-14 rounded-full border border-dashed border-[#df768f] flex flex-col items-center justify-center p-1 bg-[#fff5f7]">
                    <div className="w-10 h-10 rounded-full border border-[#f2aab9] flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-[#df768f] text-[#df768f]" />
                    </div>
                  </div>

                  {/* Right: Signature */}
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-serif-bengali font-bold text-[#b83852] mt-0.5">
                      — তোমার চিরদিনের {catName} 🐾
                    </p>
                  </div>
                </div>
              </div>

              {/* Button to Re-close Envelope */}
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-1 rounded-full bg-white/80 hover:bg-white text-[11px] font-serif-bengali text-[#8c5943] border border-[#e8c8b4] shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <Mail className="w-3 h-3 text-[#c7556b]" />
                  <span>খামটি আবার বন্ধ করুন</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
