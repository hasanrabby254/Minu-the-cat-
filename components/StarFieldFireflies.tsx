'use client';

import React, { useEffect, useRef } from 'react';

interface StarFieldFirefliesProps {
  showFireflies?: boolean;
  highlightOneStar?: boolean;
  density?: 'subtle' | 'full';
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  isSpecial?: boolean;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  color: string;
}

export default function StarFieldFireflies({
  showFireflies = false,
  highlightOneStar = false,
  density = 'full',
}: StarFieldFirefliesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Subtle passive touch listener to repel fireflies gently without breaking scroll
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        touchRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true,
        };
      }
    };

    const handleTouchEnd = () => {
      touchRef.current.active = false;
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initialize Stars
    const starCount = density === 'subtle' ? 35 : 55;
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
          isSpecial: i === 0, // One prominent star
        });
      }
    };
    initStars();

    // Initialize Fireflies (soft golden embers drifting gently upward)
    const fireflyCount = showFireflies ? (density === 'subtle' ? 16 : 28) : 0;
    const fireflies: Firefly[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.25), // Float gently upward
        size: Math.random() * 2.2 + 1.2,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        color: Math.random() > 0.3 ? '#f4c56a' : '#ffe194', // warm candle gold
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.85 || s.alpha < 0.2) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        if (s.isSpecial && highlightOneStar) {
          // One star glows visibly brighter and warmer (symbolizing Minu)
          const glowSize = 3.5 + Math.sin(time * 3) * 0.8;
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowSize * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244, 197, 106, 0.22)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 244, 224, 0.95)';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, s.alpha)})`;
          ctx.fill();
        }
      }

      // Render fireflies
      if (showFireflies) {
        for (let i = 0; i < fireflies.length; i++) {
          const f = fireflies[i];

          // Touch repulsion physics: softly drifts away from user touch
          if (touchRef.current.active) {
            const dx = f.x - touchRef.current.x;
            const dy = f.y - touchRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && dist > 1) {
              const force = (90 - dist) / 90;
              f.vx += (dx / dist) * force * 0.6;
              f.vy += (dy / dist) * force * 0.6;
            }
          }

          // Gentle drag
          f.vx *= 0.98;
          if (f.vy > -0.2) f.vy -= 0.01;

          f.x += f.vx + Math.sin(time * 1.5 + i) * 0.2;
          f.y += f.vy;

          // Pulse opacity
          f.alpha = 0.4 + 0.45 * Math.sin(time * 2 + i * 1.2);

          // Wrap edges
          if (f.y < -10) {
            f.y = height + 10;
            f.x = Math.random() * width;
          }
          if (f.x < -10) f.x = width + 10;
          if (f.x > width + 10) f.x = -10;

          // Draw firefly soft glow bloom
          const glowRad = f.size * 3.2;
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRad);
          grad.addColorStop(0, `rgba(244, 197, 106, ${Math.max(0, f.alpha)})`);
          grad.addColorStop(0.5, `rgba(244, 197, 106, ${Math.max(0, f.alpha * 0.4)})`);
          grad.addColorStop(1, 'rgba(244, 197, 106, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(f.x, f.y, glowRad, 0, Math.PI * 2);
          ctx.fill();

          // Firefly core
          ctx.fillStyle = `rgba(255, 255, 230, ${Math.max(0, f.alpha * 0.9)})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showFireflies, highlightOneStar, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
