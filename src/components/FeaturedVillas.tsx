import React, { useState } from 'react';
import { VILLAS } from '../data/resortData';
import { Villa } from '../types';

interface FeaturedVillasProps {
  onSelectVilla: (villa: Villa) => void;
  onBookVillaDirect: (villa: Villa) => void;
}

export const FeaturedVillas: React.FC<FeaturedVillasProps> = ({
  onSelectVilla,
  onBookVillaDirect
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const categories = ['All', 'Oceanfront', 'Garden', 'Penthouse', 'Private Island'];

  const filteredVillas = activeCategory === 'All'
    ? VILLAS
    : VILLAS.filter((v) => v.category === activeCategory);

  return (
    <section id="villas" className="relative py-12 md:py-14 bg-[#004449] text-white px-5 md:px-12 z-0">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-8">
          <div className="mb-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#8fd2d8]">Find your perfect stay</p>
            <h2 className="mt-1 font-headline text-2xl text-white sm:text-3xl">Explore our properties</h2>
          </div>
          <form className="mx-auto grid max-w-[940px] grid-cols-1 gap-2 rounded-2xl bg-white p-2 shadow-xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={(event) => event.preventDefault()}>
            <label className="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f3f0]">
              <span className="material-symbols-outlined text-[#f06c52]">calendar_month</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Check-in</span>
                <input aria-label="Check-in date" required type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-[#004449] outline-none" />
              </span>
            </label>
            <label className="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f3f0]">
              <span className="material-symbols-outlined text-[#f06c52]">event_available</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Check-out</span>
                <input aria-label="Check-out date" required type="date" value={checkOut} min={checkIn || undefined} onChange={(event) => setCheckOut(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-[#004449] outline-none" />
              </span>
            </label>
            <label className="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f3f0]">
              <span className="material-symbols-outlined text-[#f06c52]">group</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Guests</span>
                <select aria-label="Number of guests" value={guests} onChange={(event) => setGuests(event.target.value)} className="w-full appearance-none bg-transparent text-sm font-semibold text-[#004449] outline-none">
                  <option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6+ guests</option>
                </select>
              </span>
              <span className="material-symbols-outlined text-base text-[#004449]">keyboard_arrow_down</span>
            </label>
            <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#f06c52] px-6 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#de573e]">
              Check availability <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredVillas.slice(0, 5).map((villa) => (
            <div
              key={villa.id}
              className="group overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div 
                onClick={() => onSelectVilla(villa)}
                className="relative w-full aspect-[1.22/1] overflow-hidden cursor-pointer rounded-sm"
              >
                <div className="absolute inset-0 bg-[#004449]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={villa.imageUrl}
                  alt={villa.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 z-20 hidden">
                  <span className="bg-[#fbf9f6]/90 backdrop-blur-md text-[#004449] text-[10px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow">
                    {villa.badge}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 z-20 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[9px] font-medium flex items-center gap-1 hidden">
                  <span className="material-symbols-outlined text-amber-300 text-sm">star</span>
                  <span>{villa.rating}</span>
                  <span className="text-white/60">({villa.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-3 flex flex-col flex-grow text-center">
                <div className="flex justify-center items-start mb-1">
                  <h3 
                    onClick={() => onSelectVilla(villa)}
                    className="text-[10px] text-white font-bold uppercase tracking-[.08em] cursor-pointer hover:text-[#8fd2d8] transition-colors"
                  >
                    {villa.name}
                  </h3>
                </div>

                <p className="text-[8px] font-semibold text-[#8fd2d8] uppercase tracking-wider">
                  {villa.location}
                </p>

                <p className="hidden text-xs text-white/70 line-clamp-2 mb-6 font-body leading-relaxed">
                  {villa.description}
                </p>

                {/* Villa Specs */}
                <div className="hidden flex items-center gap-4 text-xs text-white/80 border-t border-white/10 pt-4 mb-6">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">king_bed</span> {villa.bedrooms} Beds
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">group</span> Up to {villa.guests}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">square_foot</span> {villa.sqft} sqft
                  </span>
                </div>

                {/* Footer with Price & Actions */}
                <div className="hidden mt-auto flex items-center justify-between gap-3 pt-2">
                  <div>
                    <span className="text-xl font-bold text-white">${villa.pricePerNight}</span>
                    <span className="text-xs text-white/60"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectVilla(villa)}
                      className="px-4 py-2 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onBookVillaDirect(villa)}
                      className="px-4 py-2 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setActiveCategory('All')}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#8fd2d8] text-[#8fd2d8] hover:bg-[#8fd2d8] hover:text-[#004449] transition-all duration-300 text-[9px] font-semibold uppercase tracking-widest"
          >
            Explore All Accommodations
            <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bottom Wave Divider transitioning back to surface */}
      <div className="wave-divider wave-divider-bottom z-10">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="wave-fill-surface" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};
