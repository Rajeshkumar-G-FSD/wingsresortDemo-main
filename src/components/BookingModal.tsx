import React, { useEffect, useRef, useState } from 'react';
import { ROOM_CATEGORIES, formatINR, CAMPFIRE_CHARGE } from '../data/roomsData';
import { RoomCategory } from '../types';
import { DatePickerPopover, toISO } from './DatePickerPopover';

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const today = toISO(new Date());
const PHONE_PATTERN = /^[0-9]{10}$/;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: RoomCategory | null;
  presetCheckIn?: string;
  presetCheckOut?: string;
  presetGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
  presetCheckIn,
  presetCheckOut,
  presetGuests
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preselectedRoom?.id || ROOM_CATEGORIES[0].id
  );
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Guided check-in -> check-out -> guests flow
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Add-ons
  const [addons, setAddons] = useState({
    stationTransfer: true,
    candlelightDinner: false,
    campfire: true,
    welcomeHamper: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (preselectedRoom) setSelectedRoomId(preselectedRoom.id);

      const hasPreset = Boolean(presetCheckIn && presetCheckOut);
      if (presetCheckIn) setCheckIn(presetCheckIn);
      if (presetCheckOut) setCheckOut(presetCheckOut);
      if (presetGuests) setGuests(presetGuests);

      // Only auto-open the check-in calendar when the guest hasn't already
      // chosen dates from the "Explore our properties" search bar.
      if (!hasPreset) {
        const timer = window.setTimeout(() => setCheckInOpen(true), 350);
        return () => window.clearTimeout(timer);
      }
      return;
    }
    setCheckInOpen(false);
    setCheckOutOpen(false);
    setGuestsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const handleCheckInSelect = (date: string) => {
    setCheckIn(date);
    setCheckInOpen(false);
    if (new Date(checkOut) <= new Date(date)) {
      const next = new Date(`${date}T00:00:00`);
      next.setDate(next.getDate() + 5);
      setCheckOut(toISO(next));
    }
    window.setTimeout(() => setCheckOutOpen(true), 200);
  };

  const handleCheckOutSelect = (date: string) => {
    setCheckOut(date);
    setCheckOutOpen(false);
    window.setTimeout(() => setGuestsOpen(true), 200);
  };

  if (!isOpen) return null;

  const selectedRoom = ROOM_CATEGORIES.find((r) => r.id === selectedRoomId) || ROOM_CATEGORIES[0];

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 5 : diffDays;
  };

  const nights = calculateNights();
  const subtotal = selectedRoom.weekdayPrice * nights;

  let addonTotal = 0;
  if (addons.stationTransfer) addonTotal += 1500;
  if (addons.candlelightDinner) addonTotal += 2000;
  if (addons.campfire) addonTotal += CAMPFIRE_CHARGE;
  if (addons.welcomeHamper) addonTotal += 800;

  const total = subtotal + addonTotal;

  // Only Full Name and Mobile Number are mandatory — everything else on this form is optional.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!phone.trim()) nextErrors.phone = 'Please enter your mobile number.';
    else if (!PHONE_PATTERN.test(phone.trim().replace(/\s+/g, ''))) nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-white text-[#004449] p-6 sm:p-8 border-b border-[#e4e2df] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3f4849]">
              Wings Concierge Engine
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold mt-1">
              {submitted ? 'Reservation Confirmed' : 'Book Your Sanctuary'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#f5f3f0] text-[#004449] flex items-center justify-center hover:bg-[#e4e2df] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#F0801A]/10 text-[#F0801A] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl">task_alt</span>
            </div>

            <h3 className="font-headline text-3xl text-[#004449] font-bold">
              We Look Forward to Welcoming You
            </h3>

            <p className="text-sm text-[#3f4849] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#004449]">{name || 'Valued Guest'}</strong>. Your reservation request for <strong className="text-[#004449]">{selectedRoom.name}</strong> ({checkIn} to {checkOut}) has been received. Our Wings Resort team will send your complete itinerary to <strong className="text-[#004449]">{email || 'your email'}</strong> within 2 hours.
            </p>

            <div className="p-6 bg-white rounded-2xl max-w-md mx-auto border border-[#e4e2df] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#F0801A] font-semibold">CONFIRMATION CODE:</span>
                <span className="font-mono font-bold text-[#004449]">WING-2026-9842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F0801A] font-semibold">TOTAL ESTIMATE:</span>
                <span className="font-bold text-[#004449]">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full coral-gradient text-[#2B1810] text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              Return to Wings Resort
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Accommodation Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                Select Accommodation
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full p-3 rounded-full bg-white border border-[#e4e2df] text-xs font-medium text-[#004449] focus:outline-none focus:border-[#F0801A]"
              >
                {ROOM_CATEGORIES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({formatINR(r.weekdayPrice)}/night)
                  </option>
                ))}
              </select>
            </div>

            {/* Guided Stay Dates & Guests */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                Your Stay
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <DatePickerPopover
                  label="Check-In"
                  icon="calendar_month"
                  value={checkIn}
                  minDate={today}
                  onSelect={handleCheckInSelect}
                  open={checkInOpen}
                  onOpenChange={(o) => {
                    setCheckInOpen(o);
                    if (o) { setCheckOutOpen(false); setGuestsOpen(false); }
                  }}
                />
                <DatePickerPopover
                  label="Check-Out"
                  icon="event_available"
                  value={checkOut}
                  minDate={checkIn ? addDays(checkIn, 1) : today}
                  onSelect={handleCheckOutSelect}
                  open={checkOutOpen}
                  onOpenChange={(o) => {
                    setCheckOutOpen(o);
                    if (o) { setCheckInOpen(false); setGuestsOpen(false); }
                  }}
                />

                {/* Guests: custom curved dropdown */}
                <div ref={guestsRef} className="relative flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      setGuestsOpen(!guestsOpen);
                      setCheckInOpen(false);
                      setCheckOutOpen(false);
                    }}
                    className="group flex w-full min-w-0 items-center gap-3 rounded-full bg-white border border-[#e4e2df] px-4 py-3 text-left hover:border-[#F0801A] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#F0801A] text-lg shrink-0">group</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">Guests</span>
                      <span className="block truncate text-xs font-semibold text-[#004449]">{guests} Guest{guests > 1 ? 's' : ''}</span>
                    </span>
                    <span className="material-symbols-outlined text-base text-[#004449] shrink-0">
                      {guestsOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {guestsOpen && (
                    <div className="absolute right-0 sm:left-0 top-[calc(100%+8px)] z-40 w-full min-w-[200px] rounded-3xl bg-white p-2 shadow-2xl border border-[#e4e2df] animate-fadeIn">
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
              </div>
            </div>

            {/* Bespoke Add-ons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-2">
                Enhance Your Stay (Optional Add-ons)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e4e2df] cursor-pointer hover:bg-[#f5f3f0] transition-colors">
                  <span className="text-xs font-medium text-[#004449]">Railway/Bus Stand Pickup &amp; Drop (+{formatINR(1500)})</span>
                  <input
                    type="checkbox"
                    checked={addons.stationTransfer}
                    onChange={(e) => setAddons({ ...addons, stationTransfer: e.target.checked })}
                    className="accent-[#F0801A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e4e2df] cursor-pointer hover:bg-[#f5f3f0] transition-colors">
                  <span className="text-xs font-medium text-[#004449]">Candlelight Private Dinner Setup (+{formatINR(2000)})</span>
                  <input
                    type="checkbox"
                    checked={addons.candlelightDinner}
                    onChange={(e) => setAddons({ ...addons, candlelightDinner: e.target.checked })}
                    className="accent-[#F0801A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e4e2df] cursor-pointer hover:bg-[#f5f3f0] transition-colors">
                  <span className="text-xs font-medium text-[#004449]">Bonfire / Campfire Evening (+{formatINR(CAMPFIRE_CHARGE)})</span>
                  <input
                    type="checkbox"
                    checked={addons.campfire}
                    onChange={(e) => setAddons({ ...addons, campfire: e.target.checked })}
                    className="accent-[#F0801A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e4e2df] cursor-pointer hover:bg-[#f5f3f0] transition-colors">
                  <span className="text-xs font-medium text-[#004449]">Welcome Fruit Basket &amp; Local Snacks (+{formatINR(800)})</span>
                  <input
                    type="checkbox"
                    checked={addons.welcomeHamper}
                    onChange={(e) => setAddons({ ...addons, welcomeHamper: e.target.checked })}
                    className="accent-[#F0801A] w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Guest Contact Details — only Full Name and Mobile Number are required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((prev) => ({ ...prev, name: undefined })); }}
                  className={`w-full p-3 rounded-xl bg-white border text-xs font-medium text-[#004449] focus:outline-none focus:border-[#F0801A] ${errors.name ? 'border-[#c0392b]' : 'border-[#e4e2df]'}`}
                  required
                />
                {errors.name && <p className="mt-1 text-[10px] font-semibold text-[#c0392b]">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined })); }}
                  className={`w-full p-3 rounded-xl bg-white border text-xs font-medium text-[#004449] focus:outline-none focus:border-[#F0801A] ${errors.phone ? 'border-[#c0392b]' : 'border-[#e4e2df]'}`}
                  required
                />
                {errors.phone && <p className="mt-1 text-[10px] font-semibold text-[#c0392b]">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#e4e2df] text-xs font-medium text-[#004449] focus:outline-none focus:border-[#F0801A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#F0801A] block mb-1">
                Special Requests or Dietary Preferences (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Let us know if you are celebrating an anniversary, require specific pillows, or have dietary requests..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#e4e2df] text-xs font-medium text-[#004449] focus:outline-none focus:border-[#F0801A]"
              />
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-white border border-[#F0801A]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#3f4849]">
                <span>{selectedRoom.name} ({nights} nights @ {formatINR(selectedRoom.weekdayPrice)})</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {addonTotal > 0 && (
                <div className="flex justify-between text-[#3f4849]">
                  <span>Concierge Add-ons</span>
                  <span>+{formatINR(addonTotal)}</span>
                </div>
              )}
              <div className="border-t border-[#F0801A]/10 pt-2 flex justify-between font-bold text-sm text-[#004449]">
                <span>Estimated Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full coral-gradient text-[#2B1810] text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95"
            >
              Complete Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
