import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/resortData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative pt-14 pb-0 md:pt-20 bg-[#d9f1f0] px-5 md:px-12">
      {/* Top Wave Divider transitioning from the surface section above */}
      <div className="wave-divider wave-divider-top">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="wave-fill-mist" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative Palm Leaves (clipped to section bounds) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-10 bottom-0 opacity-15 w-64 h-64">
          <span className="material-symbols-outlined text-[200px] text-[#004449]">forest</span>
        </div>
        <div className="absolute -right-8 bottom-0 opacity-15 w-72 h-72 rotate-12">
          <span className="material-symbols-outlined text-[220px] text-[#a93721]">forest</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pb-14 md:pb-16">
        {/* Quote Block */}
        <div className="w-full lg:w-3/5 flex flex-col items-start">
          <span className="material-symbols-outlined text-5xl text-[#004449]/30 mb-2">format_quote</span>
          <blockquote className="font-headline text-xl sm:text-2xl text-[#004449] font-medium leading-relaxed italic mb-5 max-w-md">
            "{current.quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#a93721]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#004449]">
                {current.author}
              </p>
              <p className="text-[11px] text-[#a93721] uppercase tracking-wider font-semibold">
                {current.location} • Stayed in {current.villaStayed}
              </p>
            </div>
          </div>
        </div>

        {/* Circular Avatar Gallery Selection */}
        <div className="w-full lg:w-2/5 flex flex-wrap justify-center lg:justify-end gap-4">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 transition-all ${
                  isActive
                    ? 'border-[#004449] scale-110 shadow-lg'
                    : 'border-white opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
