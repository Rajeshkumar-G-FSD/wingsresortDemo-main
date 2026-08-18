import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Carousel3DProps {
  images: string[];
  alt?: string;
  autoPlayMs?: number;
  className?: string;
}

/** Coverflow-style 3D image carousel: center image large and sharp, side images recede in perspective. */
export default function Carousel3D({ images, alt = 'Gallery photo', autoPlayMs = 4200, className = '' }: Carousel3DProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(150);
  const count = images.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  // Coverflow spacing scales with viewport so side cards always peek out without overflowing on mobile.
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setStep(w >= 1024 ? 250 : w >= 640 ? 190 : 118);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => window.clearInterval(id);
  }, [paused, count, autoPlayMs]);

  if (count === 0) return null;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: '1400px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[230px] sm:h-[300px] md:h-[400px]">
        {images.map((src, i) => {
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          const isActive = offset === 0;

          return (
            <div
              key={src}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 10 - abs, pointerEvents: 'none' }}
            >
              <motion.button
                type="button"
                aria-label={isActive ? undefined : `Show image ${i + 1}`}
                tabIndex={isActive ? -1 : 0}
                onClick={() => go(i)}
                className="pointer-events-auto overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
                style={{ cursor: isActive ? 'default' : 'pointer' }}
                initial={false}
                animate={{
                  x: offset * step,
                  scale: isActive ? 1 : abs === 1 ? 0.78 : 0.6,
                  rotateY: offset * -28,
                  opacity: isActive ? 1 : abs === 1 ? 0.72 : 0.4,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              >
                <img
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  loading="lazy"
                  className={`h-[180px] w-[250px] object-cover transition-[filter] duration-500 sm:h-[240px] sm:w-[340px] md:h-[340px] md:w-[480px] ${isActive ? '' : 'brightness-75'}`}
                />
              </motion.button>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(index - 1)}
            className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#004449] shadow-lg transition hover:bg-white sm:left-2"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(index + 1)}
            className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#004449] shadow-lg transition hover:bg-white sm:right-2"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
          <div className="mt-5 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#F0801A]' : 'w-1.5 bg-[#004449]/20 hover:bg-[#004449]/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
