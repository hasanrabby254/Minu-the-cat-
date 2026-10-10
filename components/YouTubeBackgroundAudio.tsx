'use client';

import React, { useEffect, useRef, useState } from 'react';

interface YouTubeBackgroundAudioProps {
  videoId: string;
  startSec: number;
  endSec: number;
  isActive: boolean; // True once user has tapped candle
  isMuted: boolean;
  onToggleMute?: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubeBackgroundAudio({
  videoId,
  startSec = 111,
  endSec = 192,
  isActive,
  isMuted,
}: YouTubeBackgroundAudioProps) {
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const checkIntervalRef = useRef<any>(null);

  // Load YouTube IFrame API Script once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player('youtube-audio-iframe', {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: startSec,
            end: endSec,
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              event.target.setVolume(75);
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              if (isActive) {
                event.target.seekTo(startSec, true);
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.ENDED ||
                event.data === window.YT.PlayerState.PAUSED
              ) {
                // Continuous seamless loop: if playback ends or pauses near endSec, restart from startSec
                try {
                  const cur = playerRef.current?.getCurrentTime();
                  if (
                    event.data === window.YT.PlayerState.ENDED ||
                    (cur !== undefined && (cur >= endSec - 1 || cur < startSec))
                  ) {
                    playerRef.current?.seekTo(startSec, true);
                    playerRef.current?.playVideo();
                    setIsPlaying(true);
                  }
                } catch {
                  // ignore
                }
              }
            },
          },
        });
      } catch {
        // Fallback handled gracefully
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [videoId, startSec, endSec, isMuted, isActive]);

  // Monitor playback range (startSec to endSec seamless continuous loop)
  useEffect(() => {
    if (isPlaying && isPlayerReady && playerRef.current) {
      checkIntervalRef.current = setInterval(() => {
        try {
          const currentTime = playerRef.current?.getCurrentTime();
          // Loop back immediately when reaching endSec or drifting outside interval
          if (currentTime !== undefined && (currentTime >= endSec || currentTime < startSec - 1.5)) {
            playerRef.current?.seekTo(startSec, true);
            playerRef.current?.playVideo();
          }
        } catch {
          // ignore
        }
      }, 300);
    } else {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    }
    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [isPlaying, isPlayerReady, startSec, endSec]);

  // Sync mute state and playback control
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (isMuted) {
          playerRef.current.mute();
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.unMute();
          playerRef.current.setVolume(85);
          if (isActive) {
            playerRef.current.playVideo();
          }
        }
      } catch {
        // ignore
      }
    }
  }, [isMuted, isPlayerReady, isActive]);

  // Start playback when experience becomes active
  useEffect(() => {
    if (isActive && isPlayerReady && playerRef.current) {
      try {
        playerRef.current.seekTo(startSec, true);
        playerRef.current.playVideo();
      } catch {
        // ignore
      }
    }
  }, [isActive, isPlayerReady, startSec]);

  // Fallback to start audio on user first tap anywhere if browser autoplay is restricted
  useEffect(() => {
    const handleFirstUserGesture = () => {
      if (isActive && playerRef.current && isPlayerReady) {
        try {
          if (!isMuted) {
            playerRef.current.unMute();
          }
          playerRef.current.playVideo();
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('click', handleFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
    };
  }, [isActive, isPlayerReady, isMuted]);

  return (
    /* Hidden container with the real YouTube Iframe Player */
    <div
      className="fixed -bottom-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div id="youtube-audio-iframe" />
    </div>
  );
}
