import React, { useEffect, useRef, useState } from 'react';
import { VILLAS } from '../data/resortData';
import { Villa } from '../types';
import { DatePickerPopover, toISO } from './DatePickerPopover';

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

interface FeaturedVillasProps {
  onSelectVilla: (villa: Villa) => void;
  onBookVillaDirect: (villa: Villa) => void;
  onCheckAvailability: (checkIn: string, checkOut: string, guests: number) => void;
  openCheckInTrigger?: number;
}

export const FeaturedVillas: React.FC<FeaturedVillasProps> = ({
  onSelectVilla,
  onBookVillaDirect,
  onCheckAvailability,
  openCheckInTrigger
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lastHandledTrigger = useRef(openCheckInTrigger);

  useEffect(() => {
    if (!guestsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [guestsOpen]);

  useEffect(() => {
    if (openCheckInTrigger === undefined || openCheckInTrigger === lastHandledTrigger.current) return;
    lastHandledTrigger.current = openCheckInTrigger;
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setCheckOutOpen(false);
    setGuestsOpen(false);
    const timer = window.setTimeout(() => setCheckInOpen(true), 450);
    return () => window.clearTimeout(timer);
  }, [openCheckInTrigger]);

  const handleCheckInSelect = (date: string) => {
    setCheckIn(date);
    setCheckInOpen(false);
    if (checkOut && new Date(checkOut) <= new Date(date)) {
      setCheckOut('');
    }
    window.setTimeout(() => setCheckOutOpen(true), 200);
  };

  const handleCheckOutSelect = (date: string) => {
    setCheckOut(date);
    setCheckOutOpen(false);
    window.setTimeout(() => setGuestsOpen(true), 200);
  };

  useEffect(() => {
    const element = propertiesRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: .15 });
    const timer = window.setTimeout(() => observer.observe(element), 1600);
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

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
          <form
            ref={formRef}
            className="mx-auto grid max-w-[940px] grid-cols-1 gap-2 rounded-2xl bg-white p-2 shadow-xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              onCheckAvailability(checkIn, checkOut, guests);
            }}
          >
            <DatePickerPopover
              label="Check-in"
              icon="calendar_month"
              value={checkIn}
              minDate={toISO(new Date())}
              onSelect={handleCheckInSelect}
              open={checkInOpen}
              onOpenChange={(o) => {
                setCheckInOpen(o);
                if (o) { setCheckOutOpen(false); setGuestsOpen(false); }
              }}
            />
            <DatePickerPopover
              label="Check-out"
              icon="event_available"
              value={checkOut}
              minDate={checkIn ? addDays(checkIn, 1) : toISO(new Date())}
              onSelect={handleCheckOutSelect}
              open={checkOutOpen}
              onOpenChange={(o) => {
                setCheckOutOpen(o);
                if (o) { setCheckInOpen(false); setGuestsOpen(false); }
              }}
            />

            {/* Guests: custom curved dropdown */}
            <div ref={guestsRef} className="relative min-w-0">
              <button
                type="button"
                onClick={() => {
                  setGuestsOpen(!guestsOpen);
                  setCheckInOpen(false);
                  setCheckOutOpen(false);
                }}
                className="group flex w-full min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f3f0]"
              >
                <span className="material-symbols-outlined text-[#f06c52]">group</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Guests</span>
                  <span className="block text-sm font-semibold text-[#004449]">{guests} guest{guests > 1 ? 's' : ''}</span>
                </span>
                <span className="material-symbols-outlined text-base text-[#004449]">
                  {guestsOpen ? 'expand_less' : 'keyboard_arrow_down'}
                </span>
              </button>

              {guestsOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 rounded-3xl bg-white p-2 shadow-2xl border border-[#e4e2df] animate-fadeIn">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setGuests(n);
                        setGuestsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold transition-colors ${
                        guests === n ? 'coral-gradient text-white' : 'text-[#1b1c1a] hover:bg-[#f5f3f0]'
                      }`}
                    >
                      <span>{n}{n === 6 ? '+' : ''} Guest{n > 1 ? 's' : ''}</span>
                      {guests === n && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#f06c52] px-6 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#de573e]">
              Check availability <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Villa Cards Grid */}
        <div ref={propertiesRef} className="properties-reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <article className="group flex flex-col overflow-hidden" aria-label="A-Type Bedroom">
            <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
              <img src="/images/wings_resort_a_type_bedroom.png" alt="Wings Resort A-Type Bedroom" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-grow flex-col pt-3 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-white">A-Type Bedroom</h3>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#8fd2d8]">Wings Resort</p>
            </div>
          </article>
          <article className="group flex flex-col overflow-hidden" aria-label="Three Bedroom Residence">
            <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
              <img src="/images/wings_resort_threebedroom.png" alt="Wings Resort Three Bedroom Residence" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-grow flex-col pt-3 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-white">Three Bedroom Residence</h3>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#8fd2d8]">Wings Resort</p>
            </div>
          </article>
          <article className="group flex flex-col overflow-hidden" aria-label="Deluxe Three Room Suite">
            <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
              <img src="/images/wings_deluex_three_room.jpg.png" alt="Wings Resort Deluxe Three Room Suite" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-grow flex-col pt-3 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-white">Deluxe Three Room Suite</h3>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#8fd2d8]">Wings Resort</p>
            </div>
          </article>
          <article className="group flex flex-col overflow-hidden" aria-label="Couples Bed Room">
            <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
              <img src="/images/wings_resort_couples_bed_room.png" alt="Wings Resort Couples Bed Room" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-grow flex-col pt-3 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-white">Couples Bed Room</h3>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#8fd2d8]">Wings Resort</p>
            </div>
          </article>
          <article className="group flex flex-col overflow-hidden" aria-label="Family Bed Room">
            <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
              <img src="/images/wings_resort_family_bed_room.png" alt="Wings Resort Family Bed Room" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-grow flex-col pt-3 text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-white">Family Bed Room</h3>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#8fd2d8]">Wings Resort</p>
            </div>
          </article>
          {filteredVillas.slice(0, 2).map((villa) => (
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
    </section>
  );
};
