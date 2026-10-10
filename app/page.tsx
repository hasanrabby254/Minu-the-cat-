'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { memorialConfig } from '@/src/config';
import Opening from '@/components/Opening';
import Hero from '@/components/Hero';
import MemoryBook from '@/components/MemoryBook';
import MessageVideo from '@/components/MessageVideo';
import LetterToMinu from '@/components/LetterToMinu';
import Ending from '@/components/Ending';
import YouTubeBackgroundAudio from '@/components/YouTubeBackgroundAudio';
import { audioManager } from '@/lib/audio';

export default function HomePage() {
  const [hasStartedStory, setHasStartedStory] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFinalMessageUnlocked, setIsFinalMessageUnlocked] = useState(false);
  const [isLetterUnlocked, setIsLetterUnlocked] = useState(false);

  // Initialize audio system
  useEffect(() => {
    audioManager.init(
      memorialConfig.musicPath,
      memorialConfig.musicStartTime || 0,
      memorialConfig.musicEndTime || 0
    );
  }, []);

  const handleToggleMusic = () => {
    setIsAudioActive(true);
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.toggleMute();
  };

  const handleCandleLit = () => {
    setIsAudioActive(true);
  };

  const handleOpeningComplete = () => {
    setIsAudioActive(true);
    setHasStartedStory(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Called when user finishes all chapters in MemoryBook and taps "মিনুর শেষ বার্তা দেখো"
  const handleFinishBook = () => {
    setIsFinalMessageUnlocked(true);
    setTimeout(() => {
      const videoSection = document.getElementById('minu-message');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Called when user taps "মিনুর উদ্দেশ্যে চিঠি পাঠাও"
  const handleOpenLetter = () => {
    setIsLetterUnlocked(true);
    setTimeout(() => {
      const letterSection = document.getElementById('letter-to-minu');
      if (letterSection) {
        letterSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#03050a] flex justify-center text-[#fff4e0] antialiased overflow-x-hidden">
      {/* Mobile-Only Canvas Container (Max-Width 430px, Native Mobile Experience) */}
      <main className="relative w-full max-w-[430px] min-h-[100dvh] bg-[#060913] shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col overflow-x-hidden">
        {/* Background Violin Music Player */}
        <YouTubeBackgroundAudio
          videoId={memorialConfig.message.youtubeId}
          startSec={memorialConfig.message.startSec}
          endSec={memorialConfig.message.endSec}
          isActive={isAudioActive}
          isMuted={isMuted}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="fixed inset-0 max-w-[430px] mx-auto pointer-events-none z-40 cinematic-vignette" />

        {/* Screen 1: Opening Experience vs Full Memorial Scroll & Book Flow */}
        <AnimatePresence mode="wait">
          {!hasStartedStory ? (
            <motion.div
              key="opening"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
              className="w-full h-[100dvh]"
            >
              <Opening
                config={memorialConfig}
                onComplete={handleOpeningComplete}
                onLightCandle={handleCandleLit}
              />
            </motion.div>
          ) : (
            <motion.div
              key="memorial-journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full flex flex-col"
            >
              {/* Screen 2: Hero Section */}
              <Hero config={memorialConfig} />

              {/* Screen 3: Interactive 3D Scrapbook / Memory Book */}
              <MemoryBook
                chapters={memorialConfig.chapters}
                onFinishBook={handleFinishBook}
                isFinalMessageUnlocked={isFinalMessageUnlocked}
              />

              {/* Screen 4: Minu's Personal Video & Final Message (Appears ONLY after clicking "মিনুর শেষ বার্তা দেখো") */}
              <AnimatePresence>
                {isFinalMessageUnlocked && (
                  <motion.div
                    key="minu-final-message-container"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  >
                    <MessageVideo
                      messageConfig={memorialConfig.message}
                      onOpenLetter={handleOpenLetter}
                      isLetterUnlocked={isLetterUnlocked}
                      isMuted={isMuted}
                      onToggleAudio={handleToggleMusic}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Screen 5: Letter to Minu (Appears ONLY after clicking "মিনুর উদ্দেশ্যে চিঠি পাঠাও") */}
              <AnimatePresence>
                {isLetterUnlocked && (
                  <motion.div
                    key="letter-to-minu-container"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  >
                    <LetterToMinu config={memorialConfig} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Screen 6: Memorial Ending & Love Tribute (Revealed once user reaches the final messages/letter) */}
              <AnimatePresence>
                {isFinalMessageUnlocked && (
                  <motion.div
                    key="ending-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <Ending config={memorialConfig} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
