'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LightboxProps {
  imageSrc: string | null;
  caption?: string;
  onClose: () => void;
}

export default function Lightbox({ imageSrc, caption, onClose }: LightboxProps) {
  if (!imageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 select-none touch-none"
      >
        {/* Close Button (48x48px hit area) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="ছবি বন্ধ করুন"
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center z-10 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Zoomed Image Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-sm w-full max-h-[82vh] flex flex-col items-center"
        >
          <Image
            src={imageSrc}
            alt={caption || "মিনুর স্মৃতি"}
            width={600}
            height={800}
            referrerPolicy="no-referrer"
            className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
          {caption && (
            <p className="mt-3 text-center text-sm font-serif-bengali text-[#fff4e0]/80">
              {caption}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
