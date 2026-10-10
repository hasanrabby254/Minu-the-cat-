'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MusicToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  visible: boolean;
}

export default function MusicToggle({ isMuted, onToggle, visible = true }: MusicToggleProps) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 right-4 z-50 pointer-events-auto sm:right-[max(1rem,calc(50vw-215px+1rem))]"
        aria-label="ভায়োলিনের সুর নিয়ন্ত্রণ"
      >
        <button
          onClick={onToggle}
          type="button"
          aria-label={isMuted ? "ভায়োলিনের সুর চালু করুন" : "ভায়োলিনের সুর বন্ধ করুন"}
          title={isMuted ? "ভায়োলিনের সুর চালু করুন" : "ভায়োলিনের সুর বন্ধ করুন"}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0b1026]/85 backdrop-blur-md border border-[#f4c56a]/40 text-[#fff4e0] flex items-center justify-center shadow-lg shadow-black/60 hover:border-[#f4c56a] hover:bg-[#0f1738] active:scale-95 transition-all cursor-pointer"
        >
          {isMuted ? (
            <div className="relative flex items-center justify-center text-[#f4c56a]/60">
              <VolumeX className="w-5 h-5 text-[#f4c56a]/70" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center text-[#f4c56a]">
              <Volume2 className="w-5 h-5 text-[#f4c56a]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f4c56a] animate-ping opacity-75" />
            </div>
          )}
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
