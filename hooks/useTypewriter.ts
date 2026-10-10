'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { audioManager } from '@/lib/audio';

export interface UseTypewriterOptions {
  speed?: number; // Base speed per character in ms (default ~34ms)
  startDelay?: number; // Initial delay before typing begins in ms (default 350ms)
  soundEnabled?: boolean; // Play handwriting/paw-typewriter sound
  naturalVariation?: boolean; // Organic handwriting cadence with punctuation pauses
  enabled?: boolean; // Control when typewriter starts
  onComplete?: () => void;
}

export interface UseTypewriterResult {
  displayedText: string;
  isComplete: boolean;
  progress: number;
  skip: () => void;
  restart: () => void;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
): UseTypewriterResult {
  const {
    speed = 34,
    startDelay = 350,
    soundEnabled = false,
    naturalVariation = true,
    enabled = true,
    onComplete,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const skip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentIndex(text.length);
    setIsComplete(true);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [text.length]);

  const restart = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentIndex(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!enabled || !text) {
      return;
    }

    let isCancelled = false;

    // Recursive timeout to allow organic handwriting variations per character
    const typeNextChar = (index: number) => {
      if (isCancelled) return;

      if (index >= text.length) {
        setIsComplete(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }

      setCurrentIndex(index + 1);

      // Typing sound completely removed to maintain serene, quiet emotional ambiance
      const char = text[index];

      // Calculate handwriting delay for next character
      let nextDelay = speed;
      if (naturalVariation) {
        // Pauses on Bengali & standard punctuation marks
        if (char === '।' || char === '?' || char === '!' || char === '.') {
          nextDelay = speed + 240;
        } else if (char === ',' || char === ';' || char === '—') {
          nextDelay = speed + 120;
        } else if (char === ' ') {
          nextDelay = speed + 30;
        } else {
          // Slight natural handwriting jitter (±12ms)
          const jitter = (index % 5 - 2) * 4;
          nextDelay = Math.max(18, speed + jitter);
        }
      }

      timeoutRef.current = setTimeout(() => {
        typeNextChar(index + 1);
      }, nextDelay);
    };

    // Initial delay before first character appears
    timeoutRef.current = setTimeout(() => {
      typeNextChar(0);
    }, startDelay);

    return () => {
      isCancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay, soundEnabled, naturalVariation, enabled]);

  const displayedText = text.slice(0, currentIndex);
  const progress = text.length > 0 ? currentIndex / text.length : 1;

  return {
    displayedText,
    isComplete,
    progress,
    skip,
    restart,
  };
}
