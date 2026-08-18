import React, { useEffect, useRef, useState } from 'react';
import { ROOM_CATEGORIES, formatINR } from '../data/roomsData';
import { RoomCategory } from '../types';
import { DatePickerPopover, toISO } from './DatePickerPopover';
import SplitText from './SplitText';

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const today = toISO(new Date());

// Two extra bookable room categories to round out the static Wings Resort photo grid below.
const FEATURED_EXTRA_ROOM_IDS = ['2bhk-villa', 'wood-house'];
const featuredExtraRooms = ROOM_CATEGORIES.filter((r) => FEATURED_EXTRA_ROOM_IDS.includes(r.id));

// One photo per distinct Wings Resort property/room type — no repeats of the same property from a
// different angle (e.g. the A-Type house and Wood House each show up once here; the Wood House and
// 2BHK Villa get their one appearance as bookable cards below instead). The Five Bedroom House card
// (mapped to 3bhk-villa) has been removed from this grid.
const STATIC_PROPERTY_PHOTOS = [
  { src: '/images/wings_resort_a_type_house.jpg', label: 'A-Type Bedroom', roomId: 'a-type-wood-house' },
  { src: '/images/wings_resort_mainbuilding.png', label: 'Three Bedroom Residence', roomId: '3bhk-villa' },
  { src: '/images/wings_deluex_three_room.jpg.png', label: 'Deluxe Three Room Suite', roomId: '3bhk-villa' },
  { src: '/images/wings_resort_family_bed_room_2.png', label: 'Family Bed Room', roomId: 'family-room' },
  { src: '/images/wings_resort_parking.png', label: 'Resort Grounds & Parking', roomId: '2bhk-villa' },
];

interface FeaturedVillasProps {
  onSelectRoom: (room: RoomCategory) => void;
  onBookRoomDirect: (room: RoomCategory) => void;
  onCheckAvailability: (checkIn: string, checkOut: string, guests: number) => void;
  onViewAllRooms: () => void;
  openCheckInTrigger?: number;
}

export const FeaturedVillas: React.FC<FeaturedVillasProps> = ({
  onSelectRoom,
  onBookRoomDirect,
  onCheckAvailability,
  onViewAllRooms,
  openCheckInTrigger
}) => {
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
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

  return (
    <section id="villas" className="relative py-12 md:py-14 bg-[#fbf9f6] text-[#004449] px-5 md:px-12 z-0">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-8">
          <div className="mb-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#3f4849]">Find your perfect stay</p>
            <SplitText
              text="Explore our properties"
              tag="h2"
              splitType="words"
              delay={40}
              duration={0.9}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-80px"
              textAlign="center"
              className="mt-1 font-headline text-2xl text-[#004449] sm:text-3xl"
            />
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
                <span className="material-symbols-outlined text-[#F0801A]">group</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#3f4849]">Guests</span>
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
                        guests === n ? 'coral-gradient text-[#2B1810]' : 'text-[#004449] hover:bg-[#f5f3f0]'
                      }`}
                    >
                      <span>{n}{n === 6 ? '+' : ''} Guest{n > 1 ? 's' : ''}</span>
                      {guests === n && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#F0801A] px-6 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#2B1810] transition hover:bg-[#F5A23A]">
              Check availability <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Villa Cards Grid */}
        <div ref={propertiesRef} className="properties-reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {STATIC_PROPERTY_PHOTOS.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => {
                const room = ROOM_CATEGORIES.find((category) => category.id === photo.roomId);
                if (room) onSelectRoom(room);
              }}
              className="group flex flex-col overflow-hidden text-left"
              aria-label={`View ${photo.label} details`}
            >
              <div className="relative aspect-[1.22/1] w-full overflow-hidden rounded-sm">
                <img src={photo.src} alt={`Wings Resort ${photo.label}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-grow flex-col pt-3 text-center">
                <h3 className="text-[10px] font-bold uppercase tracking-[.08em] text-[#004449]">{photo.label}</h3>
                <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-[#3f4849]">Wings Resort</p>
              </div>
            </button>
          ))}
          {featuredExtraRooms.map((room) => (
            <div
              key={room.id}
              className="group overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div
                onClick={() => onSelectRoom(room)}
                className="relative w-full aspect-[1.22/1] overflow-hidden cursor-pointer rounded-sm"
              >
                <div className="absolute inset-0 bg-[#004449]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 z-20 hidden">
                  <span className="bg-white/90 backdrop-blur-md text-[#F0801A] text-[10px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow">
                    {room.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-3 flex flex-col flex-grow text-center">
                <div className="flex justify-center items-start mb-1">
                  <h3
                    onClick={() => onSelectRoom(room)}
                    className="text-[10px] text-[#004449] font-bold uppercase tracking-[.08em] cursor-pointer hover:text-[#F0801A] transition-colors"
                  >
                    {room.name}
                  </h3>
                </div>

                <p className="text-[8px] font-semibold text-[#3f4849] uppercase tracking-wider">
                  Wings Resort
                </p>

                <p className="hidden text-xs text-[#3f4849] line-clamp-2 mb-6 font-body leading-relaxed">
                  {room.description}
                </p>

                {/* Room Specs */}
                <div className="hidden flex items-center gap-4 text-xs text-[#3f4849] border-t border-[#e4e2df] pt-4 mb-6">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">king_bed</span> {room.bedType}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">group</span> Up to {room.maxAdults}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">square_foot</span> {room.sizeSqft} sqft
                  </span>
                </div>

                {/* Footer with Price & Actions */}
                <div className="hidden mt-auto flex items-center justify-between gap-3 pt-2">
                  <div>
                    <span className="text-xl font-bold text-[#F0801A]">{formatINR(room.weekdayPrice)}</span>
                    <span className="text-xs text-[#6f797a]"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectRoom(room)}
                      className="px-4 py-2 rounded-full border border-[#e4e2df] text-[#004449] text-xs font-semibold hover:bg-[#f5f3f0] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onBookRoomDirect(room)}
                      className="px-4 py-2 rounded-full coral-gradient text-[#2B1810] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow"
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
            onClick={onViewAllRooms}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#F0801A] text-[#F0801A] hover:bg-[#F0801A] hover:text-[#2B1810] transition-all duration-300 text-[9px] font-semibold uppercase tracking-widest"
          >
            Explore All Accommodations
            <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
