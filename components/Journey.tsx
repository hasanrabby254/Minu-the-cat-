'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ChapterConfig } from '@/src/config';
import Chapter from './Chapter';
import Lightbox from './Lightbox';

interface JourneyProps {
  chapters: ChapterConfig[];
}

export default function Journey({ chapters }: JourneyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
  const [isWarmMode, setIsWarmMode] = useState(false);

  // Scroll tracking across the journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  // Emotional visual arc: Dark cool -> Warm soft cream -> Dusky calm night
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.14, 0.24, 0.72, 0.84, 1],
    ['#0b1026', '#0b1026', '#fdf6ec', '#fdf6ec', '#0c152e', '#070b18']
  );

  // Glowing timeline line height / path length
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Track if current background is in warm mode to optimize text colors
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Warm mode between roughly chapter 2 and chapter 6
    if (latest >= 0.2 && latest <= 0.76) {
      if (!isWarmMode) setIsWarmMode(true);
    } else {
      if (isWarmMode) setIsWarmMode(false);
    }
  });

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full py-12 transition-colors duration-700 ease-out select-none"
      aria-label="মিনুর জীবনের গল্প"
    >
      {/* Lightbox Modal */}
      <Lightbox
        imageSrc={selectedImage?.src || null}
        caption={selectedImage?.caption}
        onClose={() => setSelectedImage(null)}
      />

      {/* Decorative journey introduction kicker */}
      <div className="px-6 mb-8 text-center">
        <span
          className={`text-xs tracking-widest uppercase font-serif-bengali font-semibold transition-colors duration-500 ${
            isWarmMode ? 'text-[#8c592a]' : 'text-[#f4c56a]'
          }`}
        >
          স্মৃতির পথরেখা
        </span>
        <div
          className={`mt-2 w-12 h-[1px] mx-auto transition-colors duration-500 ${
            isWarmMode ? 'bg-[#b88556]/40' : 'bg-[#f4c56a]/40'
          }`}
        />
      </div>

      {/* Timeline Layout with Left Paw-Trail and Chapters */}
      <div className="relative max-w-md mx-auto">
        {/* Continuous glowing vertical line on the left side */}
        <div className="absolute top-4 bottom-12 left-5 w-[2px] bg-black/10 dark:bg-white/10 overflow-hidden">
          <motion.div
            style={{ scaleY: lineProgress, originY: 0 }}
            className={`w-full h-full transition-colors duration-500 ${
              isWarmMode
                ? 'bg-gradient-to-b from-[#d97706] via-[#f59e0b] to-[#b45309]'
                : 'bg-gradient-to-b from-[#f4c56a] via-[#f87171] to-[#60a5fa]'
            }`}
          />
        </div>

        {/* Chapters list */}
        <div className="relative z-10 flex flex-col">
          {chapters.map((chapter, idx) => {
            // Chapter is warm if between 2 and 6
            const chapterIsWarm = chapter.id >= 2 && chapter.id <= 6;

            return (
              <div key={chapter.id} className="relative">
                {/* Paw print timeline node */}
                <div className="absolute left-[13px] top-7 z-20">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.3 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-500 ${
                      chapterIsWarm
                        ? 'bg-[#ffffff] text-[#c26e25] border border-[#f0c797]'
                        : 'bg-[#12182e] text-[#f4c56a] border border-[#f4c56a]/40'
                    }`}
                  >
                    {/* SVG Paw Print */}
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <ellipse cx="6" cy="7" rx="1.6" ry="2.2" />
                      <ellipse cx="11.5" cy="5" rx="1.6" ry="2.2" />
                      <ellipse cx="17" cy="7" rx="1.6" ry="2.2" />
                      <path d="M11.5 11.5c-2.8 0-5 1.8-5 4.2 0 1.9 1.5 3.3 3.4 3.3 1 0 1.4-.4 1.6-.4s.6.4 1.6.4c1.9 0 3.4-1.4 3.4-3.3 0-2.4-2.2-4.2-5-4.2z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Chapter Content Card */}
                <Chapter
                  chapter={chapter}
                  index={idx}
                  isWarmTheme={chapterIsWarm}
                  onOpenLightbox={(src, caption) => setSelectedImage({ src, caption })}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
