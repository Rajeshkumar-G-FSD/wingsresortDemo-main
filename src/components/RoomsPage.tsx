import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RoomCategory } from '../types';
import {
  ROOM_CATEGORIES,
  CANCELLATION_DAYS_BEFORE_CHECKIN,
  CHILD_FREE_AGE,
  EXTRA_BED_CHARGE_PER_NIGHT,
  formatINR,
  getNightlyRate,
  getGuestRoomUnits,
  getUnitBedType,
  getUnitMaxAdults,
  isWeekendDate,
} from '../data/roomsData';
import { DatePickerPopover, toISO } from './DatePickerPopover';
import { RoomBookingModal } from './RoomBookingModal';
import BlurText from './BlurText';

interface RoomsPageProps {
  initialCheckIn: string;
  initialCheckOut: string;
  initialAdults: number;
  onBack: () => void;
}

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const today = toISO(new Date());
const CARDS_PER_ROW = 3;

export const RoomsPage: React.FC<RoomsPageProps> = ({ initialCheckIn, initialCheckOut, initialAdults, onBack }) => {
  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || addDays(today, 1));
  const [adults, setAdults] = useState(Math.max(1, initialAdults || 2));
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [adultsOpen, setAdultsOpen] = useState(false);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [bookingRoom, setBookingRoom] = useState<RoomCategory | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const detailRef = useRef<HTMLDivElement>(null);
  const adultsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    if (!adultsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (adultsRef.current && !adultsRef.current.contains(e.target as Node)) setAdultsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [adultsOpen]);

  const weekendNight = checkIn && isWeekendDate(checkIn);

  const rankedRooms = useMemo(() => {
    return [...ROOM_CATEGORIES].sort((a, b) => {
      const aFits = a.maxAdults >= adults;
      const bFits = b.maxAdults >= adults;
      if (aFits === bFits) return a.weekdayPrice - b.weekdayPrice;
      return aFits ? -1 : 1;
    });
  }, [adults]);

  // Cards slide in from alternating left/right as the grid scrolls into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards: HTMLElement[] = Array.from(grid.querySelectorAll('[data-room-card]'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).getAttribute('data-room-card');
          if (id) {
            setRevealedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, [rankedRooms.length]);

  const selectedRoom = ROOM_CATEGORIES.find((r) => r.id === selectedRoomId) || null;

  const handleViewDetails = (room: RoomCategory) => {
    setSelectedRoomId(room.id);
    setActiveImage(room.heroImage);
    window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="animate-fadeIn bg-[#fbf9f6] text-[#004449]">
      {/* Hero */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden sm:min-h-[64vh]">
        <img src="/images/wings_resort_mainbuilding.png" alt="Wings Resort" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#004449]/92 via-[#004449]/50 to-[#004449]/15" />

        <div className="absolute top-24 left-0 right-0 z-10 px-5 md:px-12">
          <div className="mx-auto flex max-w-[1280px] items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/75">
            <button onClick={onBack} className="hover:text-[#F0801A] transition-colors">Home</button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Rooms &amp; Booking</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 sm:pb-20 md:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F5A23A]">Wings Resort · Ooty</p>
          <h1 className="font-headline text-4xl font-medium text-white sm:text-5xl lg:text-6xl">Escape to Nature.<br />Stay in Comfort.</h1>
          <BlurText
            text="From private villas to cozy cabins, choose the stay that fits your group — with transparent weekday, weekend, and seasonal pricing."
            animateBy="words"
            direction="top"
            delay={20}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base"
          />
        </div>
      </section>

      {/* Search bar */}
      <div className="relative z-20 px-5 md:px-12">
        <div className="mx-auto -mt-8 max-w-[1000px] rounded-3xl border border-[#e4e2df] bg-white p-3 shadow-xl sm:-mt-10">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <DatePickerPopover
              label="Check-In"
              icon="calendar_month"
              value={checkIn}
              minDate={today}
              onSelect={(date) => {
                setCheckIn(date);
                setCheckInOpen(false);
                if (checkOut && new Date(checkOut) <= new Date(date)) setCheckOut(addDays(date, 1));
                window.setTimeout(() => setCheckOutOpen(true), 150);
              }}
              open={checkInOpen}
              onOpenChange={(o) => { setCheckInOpen(o); if (o) { setCheckOutOpen(false); setAdultsOpen(false); } }}
            />
            <DatePickerPopover
              label="Check-Out"
              icon="event_available"
              value={checkOut}
              minDate={checkIn ? addDays(checkIn, 1) : today}
              onSelect={(date) => { setCheckOut(date); setCheckOutOpen(false); }}
              open={checkOutOpen}
              onOpenChange={(o) => { setCheckOutOpen(o); if (o) { setCheckInOpen(false); setAdultsOpen(false); } }}
            />
            <div ref={adultsRef} className="relative min-w-0">
              <button
                type="button"
                onClick={() => { setAdultsOpen(!adultsOpen); setCheckInOpen(false); setCheckOutOpen(false); }}
                className="group flex w-full min-w-0 items-center gap-3 rounded-full border border-[#e4e2df] bg-[#f5f3f0] px-4 py-3 text-left transition-colors hover:border-[#004449]"
              >
                <span className="material-symbols-outlined shrink-0 text-lg text-[#f06c52]">group</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Guests</span>
                  <span className="block truncate text-xs font-semibold text-[#004449]">{adults} adult{adults > 1 ? 's' : ''}</span>
                </span>
              </button>
              {adultsOpen && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-full min-w-[180px] rounded-3xl border border-[#e4e2df] bg-white p-2 shadow-2xl animate-fadeIn">
                  {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setAdults(n); setAdultsOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${adults === n ? 'coral-gradient text-white' : 'text-[#004449] hover:bg-[#f5f3f0]'}`}
                    >
                      <span>{n} Adult{n > 1 ? 's' : ''}</span>
                      {adults === n && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('room-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex items-center justify-center gap-2 rounded-full bg-[#F0801A] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#F5A23A]"
            >
              Search Availability <span className="material-symbols-outlined text-base">search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Room category grid */}
      <section id="room-grid" className="px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Choose your stay</p>
            <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">All Room Categories</h2>
            {checkIn && (
              <p className="mt-3 text-xs font-semibold text-[#6f797a]">
                Showing rates for {checkIn} — {weekendNight ? 'weekend pricing applies' : 'weekday pricing applies'}
              </p>
            )}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rankedRooms.map((room, index) => {
              const nightlyRate = checkIn ? getNightlyRate(room, checkIn) : room.weekdayPrice;
              const fits = room.maxAdults >= adults;
              const isSelected = selectedRoomId === room.id;
              const isRevealed = revealedIds.has(room.id);
              const positionInRow = index % CARDS_PER_ROW;
              return (
                <div
                  key={room.id}
                  data-room-card={room.id}
                  style={{ transitionDelay: isRevealed ? `${positionInRow * 100}ms` : '0ms' }}
                  className={`reveal-card hover-lift flex flex-col overflow-hidden rounded-3xl border bg-white soft-shadow transition-colors ${
                    index % 2 === 1 ? 'from-right' : ''
                  } ${isRevealed ? 'is-visible' : ''} ${isSelected ? 'border-[#F0801A]' : 'border-[#e8e3dc]'}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img src={room.heroImage} alt={room.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#F0801A]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {room.badge}
                    </span>
                    {!fits && (
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F0801A]">
                        Up to {room.maxAdults}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-headline text-xl text-[#004449]">{room.name}</h3>
                    <p className="mt-1 text-xs text-[#6f797a]">{room.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#3f4849]">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">square_foot</span>{room.sizeSqft} sq ft</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">group</span>Up to {room.maxAdults}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">king_bed</span>{room.bedType}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="rounded-full bg-[#f5f3f0] px-2.5 py-1 text-[10px] font-semibold text-[#004449]">{a}</span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-[#e8e3dc] pt-4">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">{checkIn ? (weekendNight ? 'Weekend rate' : 'Weekday rate') : 'From'}</span>
                        <span className="font-headline text-2xl text-[#004449]">{formatINR(nightlyRate)}</span>
                        <span className="text-xs text-[#6f797a]"> / night</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleViewDetails(room)}
                        className="flex-1 rounded-full border border-[#F0801A] px-4 py-2.5 text-xs font-semibold text-[#F0801A] transition-colors hover:bg-[#F0801A] hover:text-white"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setBookingRoom(room)}
                        className="flex-1 rounded-full coral-gradient px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow transition-opacity hover:opacity-90"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail spotlight */}
      {selectedRoom && (
        <section ref={detailRef} className="scroll-mt-20 border-t border-[#e4e2df] bg-white px-5 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <button onClick={() => setSelectedRoomId(null)} className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-[#6f797a] hover:text-[#004449]">
              <span className="material-symbols-outlined text-base">close</span> Close details
            </button>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Gallery */}
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl soft-shadow">
                  <img src={activeImage || selectedRoom.heroImage} alt={selectedRoom.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                  {selectedRoom.gallery.map((img) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(img)}
                      className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${activeImage === img ? 'border-[#F0801A]' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">{selectedRoom.badge}</p>
                <h3 className="mt-1 font-headline text-3xl text-[#004449]">{selectedRoom.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3f4849]">{selectedRoom.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-[#f5f3f0] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#004449]">square_foot</span>
                    <span className="mt-1 block text-xs font-semibold text-[#004449]">{selectedRoom.sizeSqft} sq ft</span>
                  </div>
                  <div className="rounded-xl bg-[#f5f3f0] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#004449]">group</span>
                    <span className="mt-1 block text-xs font-semibold text-[#004449]">Up to {selectedRoom.maxAdults}</span>
                  </div>
                  <div className="rounded-xl bg-[#f5f3f0] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#004449]">bathtub</span>
                    <span className="mt-1 block text-xs font-semibold text-[#004449]">{selectedRoom.bathrooms} Bath{selectedRoom.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="rounded-xl bg-[#f5f3f0] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#004449]">home_work</span>
                    <span className="mt-1 block text-xs font-semibold text-[#004449]">{getGuestRoomUnits(selectedRoom).length} Available</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-[#f5f3f0] px-3 py-1.5 text-xs font-semibold text-[#004449]">{a}</span>
                  ))}
                </div>

                {/* Individual rooms in this category */}
                {(selectedRoom.roomCount > 1 || selectedRoom.id === 'family-room') && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#f06c52]">Available Rooms</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {getGuestRoomUnits(selectedRoom).map((unit) => (
                        <div key={unit.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#e4e2df] bg-[#f5f3f0] px-4 py-2.5">
                          <div>
                            <span className="block text-xs font-bold text-[#004449]">{unit.label}</span>
                            <span className="block text-[10px] text-[#6f797a]">{getUnitBedType(selectedRoom, unit)}{unit.note ? ` · ${unit.note}` : ''}</span>
                          </div>
                          <span className="shrink-0 rounded-full bg-[#F0801A]/15 px-2.5 py-1 text-[10px] font-bold text-[#F0801A]">
                            Up to {getUnitMaxAdults(selectedRoom, unit)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-[#6f797a]">You'll choose the specific room(s) you want when booking.</p>
                  </div>
                )}

                {/* Pricing table */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#e4e2df] bg-[#f5f3f0]">
                  <div className="grid grid-cols-2 divide-x divide-[#e4e2df] text-center">
                    <div className="p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekday</span>
                      <span className="mt-1 block font-headline text-xl text-[#004449]">{formatINR(selectedRoom.weekdayPrice)}</span>
                    </div>
                    <div className="p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekend / Seasonal</span>
                      <span className="mt-1 block font-headline text-xl text-[#004449]">{formatINR(selectedRoom.weekendPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <ul className="mt-5 space-y-2 text-xs text-[#3f4849]">
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">bed</span>Extra bed available for {formatINR(EXTRA_BED_CHARGE_PER_NIGHT)} / night.</li>
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">child_care</span>Children below {CHILD_FREE_AGE} years stay free.</li>
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">event_available</span>Free cancellation up to {CANCELLATION_DAYS_BEFORE_CHECKIN} days before check-in.</li>
                </ul>

                <button
                  onClick={() => setBookingRoom(selectedRoom)}
                  className="mt-6 w-full rounded-full coral-gradient py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 sm:w-auto sm:px-10"
                >
                  Book This Room
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <RoomBookingModal
        room={bookingRoom}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        onClose={() => setBookingRoom(null)}
      />
    </div>
  );
};
