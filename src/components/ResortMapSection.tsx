import React from 'react';
import { GOOGLE_MAPS_PLACE_URL, GOOGLE_MAPS_EMBED_URL } from '../data/contactInfo';

export const ResortMapSection: React.FC = () => {
  return (
    <section id="map" className="py-24 md:py-32 bg-[#fbf9f6] px-5 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#a93721]">explore</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a93721]">
              Find Us
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#004449] font-medium">
            Wings Resort 3BHK Ooty on the Map
          </h2>
          <p className="text-sm text-[#3f4849] mt-3 max-w-xl mx-auto">
            Just minutes from Ooty Lake, the Main Bazaar, and the railway station. Open the map for turn-by-turn directions.
          </p>
        </div>

        <div className="bg-[#f5f3f0] rounded-3xl p-4 sm:p-6 border border-[#e4e2df] soft-shadow">
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white shadow-inner">
            <iframe
              title="Wings Resort 3BHK Ooty location on Google Maps"
              src={GOOGLE_MAPS_EMBED_URL}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[#3f4849]">
              <span className="font-bold text-[#004449]">Wings Resort 3BHK Ooty</span> — Ooty, Tamil Nadu
            </p>
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full coral-gradient px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow hover:opacity-90 transition-opacity"
            >
              Get Directions <span className="material-symbols-outlined text-base">directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
