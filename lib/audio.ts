'use client';

/**
 * AudioManager:
 * Clean, serene audio coordinator.
 * Per user instruction: All synthetic noises, clicking sounds ('চ্যাক চ্যাক'),
 * purr vibrations, page-turn swooshes, and chimes are completely silenced.
 * ONLY the pure authentic background violin is kept, playing continuously on loop.
 */

class AudioManager {
  private isMuted: boolean = false;
  private isPlaying: boolean = false;

  constructor() {
    // Serene silent coordinator
  }

  public init(
    _src?: string,
    _startTimeSec: number = 0,
    _endTimeSec: number = 0
  ) {
    // Intentionally no-op: YouTube background player handles the violin audio exclusively
  }

  public playWithFade(_durationMs: number = 3000) {
    this.isPlaying = true;
  }

  public duck(_lower: boolean) {
    // No-op
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Haptics silenced to prevent device vibration motor rattle
  public haptic(_ms: number | number[] = 15) {
    // Intentionally no-op to eliminate device vibration rattle/clicking
  }

  // Page turn sound completely silenced (Eliminating "চ্যাক চ্যাক" noise)
  public playPageTurnSound() {
    // Intentionally silent
  }

  // Typewriter / handwriting click completely silenced
  public playTypingSound() {
    // Intentionally silent
  }

  // Candle ignition chime completely silenced
  public playCandleIgnitionSound() {
    // Intentionally silent
  }

  // Star sparkle chime completely silenced
  public playStarTwinkleSound() {
    // Intentionally silent
  }

  // Cat purring synthesis completely silenced (Eliminating 23Hz buzz/clatter)
  public playCatPurr(_durationSec: number = 3.2) {
    // Intentionally silent
  }
}

export const audioManager = new AudioManager();
