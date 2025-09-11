"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BannerPreloader
 * A simple banner preloader component for Next.js using Tailwind + Framer Motion.
 *
 * Props:
 *  - images: array of { src: string, alt?: string } (required)
 *  - height: tailwind height class (default: 'h-64')
 *  - duration: ms each slide is shown (default: 3000)
 *  - showProgress: boolean, show progress bar (default: true)
 *  - loop: boolean, whether to loop slides (default: true)
 *  - onFinish: optional callback called when slides finish (if loop=false)
 */

export default function BannerPreloader({
  images = [],
  height = "h-64",
  duration = 3000,
  showProgress = true,
  loop = true,
  onFinish,
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (!images || images.length === 0) return;

    let rafId;
    let start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      if (!mounted.current) return;
      setProgress(pct);
      if (elapsed >= duration) {
        start = now;
        setProgress(0);
        setIndex((prev) => {
          const next = prev + 1;
          if (next >= images.length) {
            if (loop) return 0;
            // not looping: call onFinish and stop
            if (onFinish) onFinish();
            cancelAnimationFrame(rafId);
            return prev;
          }
          return next;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      mounted.current = false;
      cancelAnimationFrame(rafId);
    };
  }, [images, duration, loop, onFinish]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`${height} w-full bg-gray-100 flex items-center justify-center`}
      >
        <div className="text-sm text-gray-500">No banner images provided</div>
      </div>
    );
  }

  return (
    <div className={`w-full relative overflow-hidden ${height}`}>
      <AnimatePresence>
        {images.map((img, i) =>
          i === index ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={img.src}
                alt={img.alt || `banner-${i}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
              {/* optional overlay content center */}
              {img.children && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {img.children}
                </div>
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Progress bar */}
      {showProgress && (
        <div className="absolute left-4 right-4 bottom-3 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-white/90 shadow-sm"
            style={{ width: `${progress}%`, transition: "width 120ms linear" }}
          />
        </div>
      )}

      {/* Dots */}
      <div className="absolute left-4 bottom-4 flex gap-2 items-center">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`go-to-${i}`}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === index ? "scale-110" : "opacity-60"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
