import React, { useEffect, useRef } from 'react';
import { RoomCategory } from '../types';
import {
  CANCELLATION_DAYS_BEFORE_CHECKIN,
  CHILD_FREE_AGE,
  EXTRA_BED_CHARGE_PER_NIGHT,
  formatINR,
  getGuestRoomUnits,
  getUnitBedType,
  getUnitMaxAdults,
} from '../data/roomsData';
import Carousel3D from './Carousel3D';
import SplitText from './SplitText';
import BlurText from './BlurText';

interface RoomDetailPageProps {
  room: RoomCategory;
  onBack: () => void;
  onBookDirect: (room: RoomCategory) => void;
}

/** Full-page room detail: large hero, 3D gallery carousel, and specs/amenities that fade+lift into view as you scroll. */
export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ room, onBack, onBookDirect }) => {
  const guestUnits = getGuestRoomUnits(room);
  const gallery = Array.from(new Set([room.heroImage, ...room.gallery]));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [room.id]);

  // Each section fades + lifts into place independently as it scrolls into view.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    sections.forEach((section: HTMLElement) => observer.observe(section));
    return () => observer.disconnect();
  }, [room.id]);

  return (
    <div ref={containerRef} className="animate-fadeIn bg-[#fbf9f6] text-[#004449]">
      {/* Hero */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden sm:min-h-[86vh]">
        <img src={room.heroImage} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#004449]/94 via-[#004449]/45 to-[#004449]/10" />

        <div className="absolute top-24 left-0 right-0 z-10 px-5 md:px-12">
          <div className="mx-auto flex max-w-[1280px] items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/75">
            <button onClick={onBack} className="hover:text-[#F0801A] transition-colors">Home</button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">{room.name}</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 sm:pb-20 md:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F5A23A]">{room.badge} · Wings Resort</p>
          <SplitText
            text={room.name}
            tag="h1"
            splitType="words"
            delay={45}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 36 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-40px"
            textAlign="left"
            repeat={false}
            className="font-headline text-4xl font-medium text-white sm:text-5xl lg:text-6xl"
          />
          <BlurText
            text={room.tagline}
            animateBy="words"
            direction="top"
            delay={22}
            startDelay={0.4}
            repeat={false}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onBookDirect(room)}
              className="rounded-full coral-gradient px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2B1810] shadow-lg transition hover:opacity-90"
            >
              Reserve Now
            </button>
            <button
              onClick={() => document.getElementById('room-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="rounded-full border border-white/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10"
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Gallery — 3D carousel */}
      <section id="room-gallery" data-reveal className="reveal-section px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Take a closer look</p>
            <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">Photo Gallery</h2>
          </div>
          <Carousel3D images={gallery} alt={room.name} />
        </div>
      </section>

      {/* Key specs */}
      <section data-reveal className="reveal-section border-t border-[#e4e2df] bg-white px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-[#f5f3f0] p-5 text-center">
              <span className="material-symbols-outlined text-2xl text-[#F0801A]">group</span>
              <span className="mt-2 block text-sm font-bold text-[#004449]">Up to {room.maxAdults}</span>
              <span className="block text-[10px] uppercase tracking-wide text-[#6f797a]">Guests</span>
            </div>
            <div className="rounded-2xl bg-[#f5f3f0] p-5 text-center">
              <span className="material-symbols-outlined text-2xl text-[#F0801A]">king_bed</span>
              <span className="mt-2 block text-sm font-bold text-[#004449]">{room.bedType}</span>
              <span className="block text-[10px] uppercase tracking-wide text-[#6f797a]">Bed Type</span>
            </div>
            <div className="rounded-2xl bg-[#f5f3f0] p-5 text-center">
              <span className="material-symbols-outlined text-2xl text-[#F0801A]">bathtub</span>
              <span className="mt-2 block text-sm font-bold text-[#004449]">{room.bathrooms} Attached</span>
              <span className="block text-[10px] uppercase tracking-wide text-[#6f797a]">Bathrooms</span>
            </div>
            <div className="rounded-2xl bg-[#f5f3f0] p-5 text-center">
              <span className="material-symbols-outlined text-2xl text-[#F0801A]">square_foot</span>
              <span className="mt-2 block text-sm font-bold text-[#004449]">{room.sizeSqft} sq ft</span>
              <span className="block text-[10px] uppercase tracking-wide text-[#6f797a]">Size</span>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <h3 className="font-headline text-2xl text-[#004449]">About the Room</h3>
            <BlurText
              text={room.description}
              animateBy="words"
              direction="top"
              delay={10}
              threshold={0.2}
              className="mt-3 text-sm leading-relaxed text-[#3f4849] sm:text-base"
            />
          </div>
        </div>
      </section>

      {/* Available rooms (guest-facing subset) */}
      {guestUnits.length > 0 && (room.roomCount > 1 || room.id === 'family-room') && (
        <section data-reveal className="reveal-section border-t border-[#e4e2df] px-5 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <h3 className="mb-6 font-headline text-2xl text-[#004449]">Available Rooms</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {guestUnits.map((unit) => (
                <div key={unit.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#e4e2df] bg-[#f5f3f0] px-5 py-4">
                  <div>
                    <span className="block text-sm font-bold text-[#004449]">{unit.label}</span>
                    <span className="block text-xs text-[#6f797a]">{getUnitBedType(room, unit)}{unit.note ? ` · ${unit.note}` : ''}</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#F0801A]/15 px-3 py-1.5 text-xs font-bold text-[#F0801A]">
                    Up to {getUnitMaxAdults(room, unit)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#6f797a]">You'll choose the specific room(s) you want when booking.</p>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section data-reveal className="reveal-section border-t border-[#e4e2df] bg-white px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <h3 className="mb-6 font-headline text-2xl text-[#004449]">Included Amenities</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 rounded-xl bg-[#f5f3f0] px-4 py-3 text-sm font-medium text-[#004449]">
                <span className="material-symbols-outlined text-base text-[#004449]">check_circle</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & policies */}
      <section data-reveal className="reveal-section border-t border-[#e4e2df] px-5 py-16 pb-28 md:px-12 md:py-20 md:pb-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[#e4e2df] bg-[#f5f3f0]">
              <div className="grid grid-cols-2 divide-x divide-[#e4e2df] text-center">
                <div className="p-6">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekday</span>
                  <span className="mt-1 block font-headline text-2xl text-[#004449]">{formatINR(room.weekdayPrice)}</span>
                </div>
                <div className="p-6">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekend / Seasonal</span>
                  <span className="mt-1 block font-headline text-2xl text-[#004449]">{formatINR(room.weekendPrice)}</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-[#3f4849]">
              <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-base text-[#F0801A]">bed</span>Extra bed available for {formatINR(EXTRA_BED_CHARGE_PER_NIGHT)} / night.</li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-base text-[#F0801A]">child_care</span>Children below {CHILD_FREE_AGE} years stay free.</li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined mt-0.5 text-base text-[#F0801A]">event_available</span>Free cancellation up to {CANCELLATION_DAYS_BEFORE_CHECKIN} days before check-in.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sticky reserve bar */}
      <div className="sticky bottom-0 z-30 border-t border-[#e4e2df] bg-white/95 px-5 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-[#004449] sm:text-2xl">{formatINR(room.weekdayPrice)}</span>
            <span className="text-xs text-[#6f797a]"> / night onwards</span>
          </div>
          <button
            onClick={() => onBookDirect(room)}
            className="rounded-full coral-gradient px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2B1810] shadow-lg transition hover:opacity-90"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};
