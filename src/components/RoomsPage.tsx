import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RoomCategory } from '../types';
import {
  ROOM_CATEGORIES,
  CANCELLATION_DAYS_BEFORE_CHECKIN,
  CHILD_FREE_AGE,
  EXTRA_BED_CHARGE_PER_NIGHT,
  formatINR,
  getNightlyRate,
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

  const detailRef = useRef<HTMLDivElement>(null);
  const adultsRef = useRef<HTMLDivElement>(null);

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

  const selectedRoom = ROOM_CATEGORIES.find((r) => r.id === selectedRoomId) || null;

  const handleViewDetails = (room: RoomCategory) => {
    setSelectedRoomId(room.id);
    setActiveImage(room.heroImage);
    window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="animate-fadeIn bg-[#4A2E1C] text-[#F5F0E8]">
      {/* Hero */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden sm:min-h-[64vh]">
        <img src="/images/wings_resort_mainbuilding.png" alt="Wings Resort" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1C]/92 via-[#4A2E1C]/50 to-[#4A2E1C]/15" />

        <div className="absolute top-24 left-0 right-0 z-10 px-5 md:px-12">
          <div className="mx-auto flex max-w-[1280px] items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/75">
            <button onClick={onBack} className="hover:text-[#2B1810] transition-colors">Home</button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Rooms &amp; Booking</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 sm:pb-20 md:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D8CFC4]">Wings Resort · Ooty</p>
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
        <div className="mx-auto -mt-8 max-w-[1000px] rounded-3xl border border-[#7A5238] bg-[#6B4530] p-3 shadow-xl sm:-mt-10">
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
                className="group flex w-full min-w-0 items-center gap-3 rounded-full border border-[#7A5238] bg-[#6B4530] px-4 py-3 text-left transition-colors hover:border-[#F0801A]"
              >
                <span className="material-symbols-outlined shrink-0 text-lg text-[#F0801A]">group</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#D8CFC4]/70">Guests</span>
                  <span className="block truncate text-xs font-semibold text-[#F5F0E8]">{adults} adult{adults > 1 ? 's' : ''}</span>
                </span>
              </button>
              {adultsOpen && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-full min-w-[180px] rounded-3xl border border-[#7A5238] bg-[#6B4530] p-2 shadow-2xl animate-fadeIn">
                  {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setAdults(n); setAdultsOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${adults === n ? 'coral-gradient text-white' : 'text-[#F5F0E8] hover:bg-[#6B4530]'}`}
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
              className="flex items-center justify-center gap-2 rounded-full bg-[#F0801A] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#2B1810] transition hover:bg-[#F5A23A]"
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
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#F0801A]">Choose your stay</p>
            <h2 className="font-headline text-3xl text-[#F5F0E8] sm:text-4xl">All Room Categories</h2>
            {checkIn && (
              <p className="mt-3 text-xs font-semibold text-[#D8CFC4]/70">
                Showing rates for {checkIn} — {weekendNight ? 'weekend pricing applies' : 'weekday pricing applies'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rankedRooms.map((room) => {
              const nightlyRate = checkIn ? getNightlyRate(room, checkIn) : room.weekdayPrice;
              const fits = room.maxAdults >= adults;
              const isSelected = selectedRoomId === room.id;
              return (
                <div
                  key={room.id}
                  className={`hover-lift flex flex-col overflow-hidden rounded-3xl border bg-[#6B4530] soft-shadow transition-colors ${
                    isSelected ? 'border-[#F0801A]' : 'border-[#7A5238]'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img src={room.heroImage} alt={room.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#F0801A]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2B1810] backdrop-blur-sm">
                      {room.badge}
                    </span>
                    {!fits && (
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F0801A]">
                        Up to {room.maxAdults}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-headline text-xl text-[#F5F0E8]">{room.name}</h3>
                    <p className="mt-1 text-xs text-[#D8CFC4]/70">{room.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#D8CFC4]">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">square_foot</span>{room.sizeSqft} sq ft</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">group</span>Up to {room.maxAdults}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#F0801A]">king_bed</span>{room.bedType}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="rounded-full bg-[#6B4530] px-2.5 py-1 text-[10px] font-semibold text-[#F5F0E8]">{a}</span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-[#7A5238] pt-4">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wide text-[#D8CFC4]/70">{checkIn ? (weekendNight ? 'Weekend rate' : 'Weekday rate') : 'From'}</span>
                        <span className="font-headline text-2xl text-[#F5F0E8]">{formatINR(nightlyRate)}</span>
                        <span className="text-xs text-[#D8CFC4]/70"> / night</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleViewDetails(room)}
                        className="flex-1 rounded-full border border-[#F0801A] px-4 py-2.5 text-xs font-semibold text-[#F5F0E8] transition-colors hover:bg-[#F0801A] hover:text-[#2B1810]"
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
        <section ref={detailRef} className="scroll-mt-20 border-t border-[#7A5238] bg-[#6B4530] px-5 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <button onClick={() => setSelectedRoomId(null)} className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-[#D8CFC4]/70 hover:text-[#F5F0E8]">
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
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#F0801A]">{selectedRoom.badge}</p>
                <h3 className="mt-1 font-headline text-3xl text-[#F5F0E8]">{selectedRoom.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D8CFC4]">{selectedRoom.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-[#6B4530] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#F5F0E8]">square_foot</span>
                    <span className="mt-1 block text-xs font-semibold text-[#F5F0E8]">{selectedRoom.sizeSqft} sq ft</span>
                  </div>
                  <div className="rounded-xl bg-[#6B4530] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#F5F0E8]">group</span>
                    <span className="mt-1 block text-xs font-semibold text-[#F5F0E8]">Up to {selectedRoom.maxAdults}</span>
                  </div>
                  <div className="rounded-xl bg-[#6B4530] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#F5F0E8]">bathtub</span>
                    <span className="mt-1 block text-xs font-semibold text-[#F5F0E8]">{selectedRoom.bathrooms} Bath{selectedRoom.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="rounded-xl bg-[#6B4530] p-3 text-center">
                    <span className="material-symbols-outlined text-lg text-[#F5F0E8]">home_work</span>
                    <span className="mt-1 block text-xs font-semibold text-[#F5F0E8]">{selectedRoom.roomCount} Available</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-[#6B4530] px-3 py-1.5 text-xs font-semibold text-[#F5F0E8]">{a}</span>
                  ))}
                </div>

                {/* Pricing table */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#7A5238] bg-[#6B4530]">
                  <div className="grid grid-cols-2 divide-x divide-[#7A5238] text-center">
                    <div className="p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-[#D8CFC4]/70">Weekday</span>
                      <span className="mt-1 block font-headline text-xl text-[#F5F0E8]">{formatINR(selectedRoom.weekdayPrice)}</span>
                    </div>
                    <div className="p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-[#D8CFC4]/70">Weekend / Seasonal</span>
                      <span className="mt-1 block font-headline text-xl text-[#F5F0E8]">{formatINR(selectedRoom.weekendPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <ul className="mt-5 space-y-2 text-xs text-[#D8CFC4]">
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">bed</span>Extra bed available for {formatINR(EXTRA_BED_CHARGE_PER_NIGHT)} / night.</li>
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">child_care</span>Children below {CHILD_FREE_AGE} years stay free.</li>
                  <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-sm text-[#F0801A]">event_available</span>Free cancellation up to {CANCELLATION_DAYS_BEFORE_CHECKIN} days before check-in.</li>
                </ul>

                <button
                  onClick={() => setBookingRoom(selectedRoom)}
                  className="mt-6 w-full rounded-full bg-[#F0801A] py-4 text-xs font-bold uppercase tracking-widest text-[#2B1810] shadow-lg transition hover:bg-[#F5A23A] sm:w-auto sm:px-10"
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
