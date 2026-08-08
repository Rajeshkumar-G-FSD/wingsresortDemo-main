import React, { useEffect, useRef, useState } from 'react';
import { BookingMode, PaymentPlan, RoomCategory } from '../types';
import {
  CAMPFIRE_CHARGE,
  CANCELLATION_DAYS_BEFORE_CHECKIN,
  CHILD_FREE_AGE,
  EXTRA_BED_CHARGE_PER_NIGHT,
  calculateNights,
  calculateRoomSubtotal,
  formatINR,
  getNightlyBreakdown,
} from '../data/roomsData';
import { CONTACT_INFO } from '../data/contactInfo';
import { PAYMENT_INFO, buildUpiPaymentString } from '../data/paymentInfo';
import { DatePickerPopover, toISO } from './DatePickerPopover';
import { QRCodeImage } from './QRCodeImage';
import { createBooking } from '../lib/bookingsRepo';

interface RoomBookingModalProps {
  room: RoomCategory | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  onClose: () => void;
}

interface GuestFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialRequests: string;
}

type GuestFormErrors = Partial<Record<keyof GuestFormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const BOOKING_MODE_OPTIONS: { id: BookingMode; label: string; helper: string; icon: string }[] = [
  { id: 'pay_now', label: 'Pay Now Online', helper: 'UPI, bank transfer or QR', icon: 'qr_code_2' },
  { id: 'pay_at_resort', label: 'Pay at Resort', helper: 'Just book — settle in person', icon: 'storefront' },
];

const PAYMENT_PLAN_OPTIONS: { id: PaymentPlan; label: string; short: string }[] = [
  { id: '40percent', label: 'Pay 40% Advance', short: '40% Advance' },
  { id: 'full', label: 'Pay Full Amount', short: 'Full Amount' },
  { id: 'custom', label: 'Custom Amount', short: 'Custom' },
];

export const RoomBookingModal: React.FC<RoomBookingModalProps> = ({ room, checkIn: initialCheckIn, checkOut: initialCheckOut, adults: initialAdults, onClose }) => {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [adults, setAdults] = useState(Math.max(1, initialAdults));
  const [children, setChildren] = useState(0);
  const [extraBeds, setExtraBeds] = useState(0);
  const [campfire, setCampfire] = useState(false);

  const [guest, setGuest] = useState<GuestFormState>({ name: '', email: '', phone: '', address: '', specialRequests: '' });
  const [errors, setErrors] = useState<GuestFormErrors>({});
  const [occupancyError, setOccupancyError] = useState<string | null>(null);

  const [bookingMode, setBookingMode] = useState<BookingMode>('pay_now');
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>('40percent');
  const [customAmount, setCustomAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showZeroPaymentConfirm, setShowZeroPaymentConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setAdults(Math.max(1, initialAdults));
    setQuantity(1);
    setChildren(0);
    setExtraBeds(0);
    setCampfire(false);
    setGuest({ name: '', email: '', phone: '', address: '', specialRequests: '' });
    setErrors({});
    setOccupancyError(null);
    setBookingMode('pay_now');
    setPaymentPlan('40percent');
    setCustomAmount('');
    setTransactionId('');
    setPaymentError(null);
    setShowZeroPaymentConfirm(false);
    setSubmitError(null);
    setSubmitted(false);
    setBookingRef(null);
    setIsSubmitting(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [room?.id, initialCheckIn, initialCheckOut, initialAdults]);

  if (!room) return null;

  const nights = calculateNights(checkIn, checkOut);
  const breakdown = getNightlyBreakdown(room, checkIn, checkOut);
  const roomSubtotal = calculateRoomSubtotal(room, checkIn, checkOut) * quantity;
  const extraBedTotal = extraBeds * EXTRA_BED_CHARGE_PER_NIGHT * nights;
  const campfireTotal = campfire ? CAMPFIRE_CHARGE : 0;
  const total = roomSubtotal + extraBedTotal + campfireTotal;
  const maxOccupancy = room.maxAdults * quantity;
  const cancellationDeadline = checkIn ? addDays(checkIn, -CANCELLATION_DAYS_BEFORE_CHECKIN) : '';

  const advanceAmount = Math.round(total * 0.4);
  const parsedCustomAmount = Number(customAmount);
  // What the guest *intends* to pay via the selected plan — only meaningful when paying online now.
  const intendedAmount =
    bookingMode !== 'pay_now' ? 0
      : paymentPlan === 'full' ? total
      : paymentPlan === '40percent' ? advanceAmount
      : Number.isFinite(parsedCustomAmount) ? parsedCustomAmount : 0;
  const hasTransactionProof = bookingMode === 'pay_now' && transactionId.trim().length >= 4;
  // A payment only counts once a transaction reference has been entered — otherwise it's recorded as zero paid.
  const confirmedAmountNow = bookingMode === 'pay_now' && hasTransactionProof ? intendedAmount : 0;
  const balanceDue = Math.max(0, total - confirmedAmountNow);
  const upiPaymentString = total > 0 ? buildUpiPaymentString(intendedAmount || total, `${room.name} - Wings Resort`) : '';

  const handleAdultsChange = (value: number) => {
    const next = Math.max(1, value);
    setAdults(next);
    setOccupancyError(next > maxOccupancy ? `Maximum ${maxOccupancy} adult${maxOccupancy > 1 ? 's' : ''} for ${quantity} room${quantity > 1 ? 's' : ''} of this type.` : null);
  };

  const handleQuantityChange = (value: number) => {
    const next = Math.min(room.roomCount, Math.max(1, value));
    setQuantity(next);
    const newMax = room.maxAdults * next;
    setOccupancyError(adults > newMax ? `Maximum ${newMax} adult${newMax > 1 ? 's' : ''} for ${next} room${next > 1 ? 's' : ''} of this type.` : null);
  };

  const handleGuestChange = (field: keyof GuestFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuest((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): GuestFormErrors => {
    const next: GuestFormErrors = {};
    if (!guest.name.trim()) next.name = 'Please enter your name.';
    if (!guest.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_PATTERN.test(guest.email.trim())) next.email = 'Enter a valid email address.';
    if (!guest.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (!PHONE_PATTERN.test(guest.phone.trim().replace(/\s+/g, ''))) next.phone = 'Enter a valid 10-digit phone number.';
    if (!guest.address.trim()) next.address = 'Please enter your address.';
    return next;
  };

  const runValidation = (): boolean => {
    if (!checkIn || !checkOut || nights < 1) {
      setOccupancyError('Please select valid check-in and check-out dates.');
      return false;
    }
    if (adults > maxOccupancy) {
      setOccupancyError(`Maximum ${maxOccupancy} adult${maxOccupancy > 1 ? 's' : ''} for ${quantity} room${quantity > 1 ? 's' : ''} of this type.`);
      return false;
    }
    if (bookingMode === 'pay_now' && paymentPlan === 'custom') {
      if (!parsedCustomAmount || parsedCustomAmount <= 0) {
        setPaymentError('Enter the amount you’d like to pay now.');
        return false;
      }
      if (parsedCustomAmount > total) {
        setPaymentError(`Amount can’t exceed the total of ${formatINR(total)}.`);
        return false;
      }
    }
    setPaymentError(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;
    return true;
  };

  const performSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const id = await createBooking({
        roomId: room.id,
        roomName: room.name,
        checkIn,
        checkOut,
        nights,
        quantity,
        adults,
        children,
        extraBeds,
        campfire,
        roomSubtotal,
        extraBedTotal,
        campfireTotal,
        total,
        bookingMode,
        paymentPlan,
        intendedAmount,
        transactionId: transactionId.trim(),
        amountPayingNow: confirmedAmountNow,
        guestName: guest.name,
        guestEmail: guest.email,
        guestPhone: guest.phone,
        guestAddress: guest.address,
        specialRequests: guest.specialRequests,
      });
      const ref = id.slice(0, 8).toUpperCase();
      setBookingRef(ref);

      const message = [
        `Hello Wings Resort! Here’s my booking for ${quantity} × ${room.name}.`,
        `Booking Ref: ${ref}`,
        '',
        `Check-in: ${checkIn}`,
        `Check-out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})`,
        `Adults: ${adults}${children > 0 ? `, Children: ${children}` : ''}`,
        extraBeds > 0 ? `Extra beds: ${extraBeds}` : null,
        campfire ? `Campfire experience: ${formatINR(CAMPFIRE_CHARGE)}` : null,
        `Total amount: ${formatINR(total)}`,
        bookingMode === 'pay_at_resort'
          ? 'Payment: Pay at Resort (settling in person at check-in)'
          : hasTransactionProof
            ? `Paid now (${PAYMENT_PLAN_OPTIONS.find((p) => p.id === paymentPlan)?.label}): ${formatINR(confirmedAmountNow)}`
            : `Intended to pay now (${PAYMENT_PLAN_OPTIONS.find((p) => p.id === paymentPlan)?.label}): ${formatINR(intendedAmount)} — no transaction ID given yet, recorded as ₹0 paid`,
        balanceDue > 0 ? `Balance due: ${formatINR(balanceDue)}` : null,
        bookingMode === 'pay_now' ? `Transaction ID: ${transactionId.trim() || 'Not provided yet'}` : null,
        '',
        `UPI: ${PAYMENT_INFO.upiId}`,
        `Bank: ${PAYMENT_INFO.bankName}, A/C ${PAYMENT_INFO.accountNumber}, IFSC ${PAYMENT_INFO.ifsc}`,
        '',
        `Name: ${guest.name}`,
        `Email: ${guest.email}`,
        `Phone: ${guest.phone}`,
        `Address: ${guest.address}`,
        guest.specialRequests ? `Special requests: ${guest.specialRequests}` : null,
        '',
        hasTransactionProof || bookingMode === 'pay_at_resort'
          ? 'Please confirm my booking.'
          : 'I’ll share my transaction ID / payment screenshot here once paid.',
      ].filter(Boolean).join('\n');

      window.open(`https://wa.me/91${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    } catch (err) {
      setSubmitError('We could not save your booking just now. Please try again, or message us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidation()) return;

    if (bookingMode === 'pay_now' && !hasTransactionProof) {
      setShowZeroPaymentConfirm(true);
      return;
    }
    await performSubmit();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn sm:p-6" onClick={onClose}>
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#e4e2df] bg-[#fbf9f6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#004449] p-6 text-white sm:p-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8fd2d8]">{submitted ? 'Request Sent' : 'Book This Room'}</span>
            <h2 className="mt-1 font-headline text-2xl font-semibold sm:text-3xl">{room.name}</h2>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20" aria-label="Close">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div ref={scrollRef} className="overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="space-y-6 py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#004449]/10 text-[#004449]">
                <span className="material-symbols-outlined text-5xl">task_alt</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-[#004449]">Your Request Is On Its Way</h3>
              {bookingRef && (
                <p className="inline-block rounded-full bg-[#eef3f2] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#004449]">
                  Booking Ref: {bookingRef}
                </p>
              )}
              <p className="mx-auto max-w-md text-sm leading-relaxed text-[#3f4849]">
                {bookingMode === 'pay_at_resort'
                  ? `We saved your ${room.name} booking for ${checkIn} to ${checkOut} and opened WhatsApp with the full bill. You can pay the full amount directly at the resort during check-in.`
                  : hasTransactionProof
                    ? `We saved your ${room.name} booking for ${checkIn} to ${checkOut} and opened WhatsApp with the full bill and your transaction ID. Our team will verify and confirm shortly.`
                    : `We saved your ${room.name} booking for ${checkIn} to ${checkOut} as an unpaid request and opened WhatsApp with the bill. Scan the QR or use the UPI/bank details to pay ${formatINR(intendedAmount)}, then share your transaction ID on WhatsApp so we can confirm it.`}
              </p>
              <button onClick={onClose} className="rounded-full coral-gradient px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Dates */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#a93721]">Your Stay</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <DatePickerPopover
                    label="Check-In"
                    icon="calendar_month"
                    value={checkIn}
                    minDate={toISO(new Date())}
                    onSelect={(date) => {
                      setCheckIn(date);
                      setCheckInOpen(false);
                      if (checkOut && new Date(checkOut) <= new Date(date)) setCheckOut(addDays(date, 1));
                    }}
                    open={checkInOpen}
                    onOpenChange={(o) => { setCheckInOpen(o); if (o) setCheckOutOpen(false); }}
                  />
                  <DatePickerPopover
                    label="Check-Out"
                    icon="event_available"
                    value={checkOut}
                    minDate={checkIn ? addDays(checkIn, 1) : toISO(new Date())}
                    onSelect={(date) => { setCheckOut(date); setCheckOutOpen(false); }}
                    open={checkOutOpen}
                    onOpenChange={(o) => { setCheckOutOpen(o); if (o) setCheckInOpen(false); }}
                  />
                </div>
              </div>

              {/* Room configuration */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#004449]">Rooms</label>
                  <div className="flex items-center rounded-xl border border-[#e0dcd3] bg-white">
                    <button type="button" onClick={() => handleQuantityChange(quantity - 1)} className="px-3 py-2.5 text-[#004449] disabled:opacity-30" disabled={quantity <= 1}>−</button>
                    <span className="flex-1 text-center text-sm font-semibold text-[#1b1c1a]">{quantity}</span>
                    <button type="button" onClick={() => handleQuantityChange(quantity + 1)} className="px-3 py-2.5 text-[#004449] disabled:opacity-30" disabled={quantity >= room.roomCount}>+</button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#004449]">Adults</label>
                  <div className="flex items-center rounded-xl border border-[#e0dcd3] bg-white">
                    <button type="button" onClick={() => handleAdultsChange(adults - 1)} className="px-3 py-2.5 text-[#004449] disabled:opacity-30" disabled={adults <= 1}>−</button>
                    <span className="flex-1 text-center text-sm font-semibold text-[#1b1c1a]">{adults}</span>
                    <button type="button" onClick={() => handleAdultsChange(adults + 1)} className="px-3 py-2.5 text-[#004449]">+</button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#004449]">Children</label>
                  <div className="flex items-center rounded-xl border border-[#e0dcd3] bg-white">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="px-3 py-2.5 text-[#004449] disabled:opacity-30" disabled={children <= 0}>−</button>
                    <span className="flex-1 text-center text-sm font-semibold text-[#1b1c1a]">{children}</span>
                    <button type="button" onClick={() => setChildren(children + 1)} className="px-3 py-2.5 text-[#004449]">+</button>
                  </div>
                </div>
                {room.extraBedAllowed && (
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#004449]">Extra Beds</label>
                    <div className="flex items-center rounded-xl border border-[#e0dcd3] bg-white">
                      <button type="button" onClick={() => setExtraBeds(Math.max(0, extraBeds - 1))} className="px-3 py-2.5 text-[#004449] disabled:opacity-30" disabled={extraBeds <= 0}>−</button>
                      <span className="flex-1 text-center text-sm font-semibold text-[#1b1c1a]">{extraBeds}</span>
                      <button type="button" onClick={() => setExtraBeds(Math.min(3, extraBeds + 1))} className="px-3 py-2.5 text-[#004449]">+</button>
                    </div>
                  </div>
                )}
              </div>
              {occupancyError && <p className="text-xs font-semibold text-[#c0392b]">{occupancyError}</p>}
              <p className="text-xs text-[#6f797a]">Children below {CHILD_FREE_AGE} years stay free. Max {room.maxAdults} adults per room.</p>

              {/* Campfire add-on */}
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#e0dcd3] bg-white px-4 py-3">
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg text-[#f06c52]">local_fire_department</span>
                  <span>
                    <span className="block text-xs font-bold text-[#1b1c1a]">Add Campfire Experience</span>
                    <span className="block text-[11px] text-[#6f797a]">One-time evening campfire, {formatINR(CAMPFIRE_CHARGE)}</span>
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={campfire}
                  onChange={(e) => setCampfire(e.target.checked)}
                  className="h-4 w-4 accent-[#004449]"
                />
              </label>

              {/* Guest details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Full Name</label>
                  <input
                    type="text"
                    value={guest.name}
                    onChange={handleGuestChange('name')}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.name ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-[#c0392b]">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Phone</label>
                  <input
                    type="tel"
                    value={guest.phone}
                    onChange={handleGuestChange('phone')}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.phone ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#c0392b]">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Email</label>
                  <input
                    type="email"
                    value={guest.email}
                    onChange={handleGuestChange('email')}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.email ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#c0392b]">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Address</label>
                  <input
                    type="text"
                    value={guest.address}
                    onChange={handleGuestChange('address')}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.address ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="City, State"
                  />
                  {errors.address && <p className="mt-1 text-xs text-[#c0392b]">{errors.address}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Special Requests (optional)</label>
                <textarea
                  rows={2}
                  value={guest.specialRequests}
                  onChange={handleGuestChange('specialRequests')}
                  className="w-full resize-none rounded-xl border border-[#e0dcd3] px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                  placeholder="Celebrating something? Need an early check-in? Let us know."
                />
              </div>

              {/* Booking mode: Pay Now vs Pay at Resort */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#a93721]">How Would You Like to Book?</label>
                <div className="grid grid-cols-2 gap-2">
                  {BOOKING_MODE_OPTIONS.map((option) => {
                    const isActive = bookingMode === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => { setBookingMode(option.id); setPaymentError(null); }}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                          isActive ? 'border-[#004449] bg-[#004449] text-white' : 'border-[#e0dcd3] bg-white text-[#1b1c1a] hover:border-[#004449]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{option.icon}</span>
                        <span>
                          <span className="block text-xs font-bold">{option.label}</span>
                          <span className={`block text-[10px] ${isActive ? 'text-white/75' : 'text-[#6f797a]'}`}>{option.helper}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {bookingMode === 'pay_at_resort' ? (
                  <p className="mt-3 rounded-xl bg-[#eef3f2] px-4 py-3 text-xs text-[#004449]">
                    You'll pay the full amount of <strong>{formatINR(total)}</strong> directly at the resort during check-in. No payment needed now — we'll just reserve your dates.
                  </p>
                ) : (
                  <>
                    {/* Compact payment plan row */}
                    <div className="mt-3 flex gap-2">
                      {PAYMENT_PLAN_OPTIONS.map((option) => {
                        const isActive = paymentPlan === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => { setPaymentPlan(option.id); setPaymentError(null); }}
                            className={`flex-1 rounded-full border px-3 py-2 text-center text-[11px] font-bold transition-colors ${
                              isActive ? 'border-[#004449] bg-[#004449] text-white' : 'border-[#e0dcd3] bg-white text-[#1b1c1a] hover:border-[#004449]'
                            }`}
                          >
                            {option.short}
                          </button>
                        );
                      })}
                    </div>

                    {paymentPlan === 'custom' && (
                      <div className="mt-3">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Amount to Pay Now (₹)</label>
                        <input
                          type="number"
                          min={1}
                          max={total}
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setPaymentError(null); }}
                          className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${paymentError ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                          placeholder={`Up to ${formatINR(total)}`}
                        />
                      </div>
                    )}
                    {paymentError && <p className="mt-1.5 text-xs font-semibold text-[#c0392b]">{paymentError}</p>}

                    <div className="mt-3">
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Transaction ID / UTR Reference</label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full rounded-xl border border-[#e0dcd3] px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                        placeholder="Paid already? Enter your UPI/bank reference number"
                      />
                      <p className="mt-1.5 text-[11px] text-[#6f797a]">
                        Already paid via the QR/UPI/bank details below? Enter the transaction ID so we can confirm it instantly. Without one, this booking is recorded as unpaid until you share it.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Stay details summary / bill */}
              <div className="rounded-2xl border border-[#e0dcd3] bg-white p-5 sm:p-6">
                <p className="mb-4 border-b border-[#e8e3dc] pb-3 text-xs font-bold uppercase tracking-widest text-[#004449]">Stay Details Summary</p>

                <div className="mb-4 flex items-center gap-3">
                  <img src={room.heroImage} alt={room.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-[#f06c52]">Selected Suite</span>
                    <span className="block text-sm font-bold text-[#1b1c1a]">{room.name}</span>
                    <span className="block text-xs text-[#6f797a]">{formatINR(room.weekdayPrice)} / night onwards</span>
                  </div>
                </div>

                <div className="mb-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-[#6f797a]">Stay Duration</span><span className="font-bold text-[#1b1c1a]">{nights} Night{nights > 1 ? 's' : ''}</span></div>
                  <div className="flex justify-between"><span className="text-[#6f797a]">Stay Dates</span><span className="font-bold text-[#1b1c1a]">{checkIn || '—'} to {checkOut || '—'}</span></div>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-3 rounded-xl bg-[#eef3f2] p-3 text-xs">
                  <div><span className="block text-[#6f797a]">Adults</span><span className="font-bold text-[#004449]">{adults}</span></div>
                  <div><span className="block text-[#6f797a]">Total Guests</span><span className="font-bold text-[#004449]">{adults + children}</span></div>
                </div>

                <div className="mb-3 flex justify-between text-xs"><span className="text-[#6f797a]">Room(s) Booked</span><span className="font-bold text-[#1b1c1a]">{quantity}</span></div>

                <div className="space-y-2 rounded-xl bg-[#f5f3f0] p-4 text-xs">
                  {breakdown.map((night) => (
                    <div key={night.date} className="flex justify-between text-[#3f4849]">
                      <span>
                        {night.date} {night.isWeekend && <span className="ml-1 rounded-full bg-[#f06c52]/15 px-2 py-0.5 text-[9px] font-bold uppercase text-[#f06c52]">Weekend</span>}
                      </span>
                      <span>{formatINR(night.rate)} × {quantity}</span>
                    </div>
                  ))}
                  {extraBeds > 0 && (
                    <div className="flex justify-between text-[#3f4849]">
                      <span>Extra bed ({extraBeds} × {nights} night{nights > 1 ? 's' : ''})</span>
                      <span>{formatINR(extraBedTotal)}</span>
                    </div>
                  )}
                  {campfire && (
                    <div className="flex justify-between text-[#3f4849]">
                      <span>Campfire Experience</span>
                      <span>{formatINR(campfireTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#e0dcd3] pt-2 text-sm font-bold text-[#004449]">
                    <span>TOTAL</span>
                    <span>{formatINR(total)}</span>
                  </div>

                  <div className="mt-1 border-t border-[#e0dcd3] pt-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">
                      {bookingMode === 'pay_at_resort' ? 'Pay at Resort' : PAYMENT_PLAN_OPTIONS.find((p) => p.id === paymentPlan)?.label}
                    </span>
                    {bookingMode === 'pay_at_resort' ? (
                      <div className="mt-1 flex justify-between">
                        <span className="font-bold text-[#004449]">Due at Check-In</span>
                        <span className="font-bold text-[#004449]">{formatINR(total)}</span>
                      </div>
                    ) : (
                      <>
                        <div className="mt-1 flex justify-between">
                          <span className="font-bold text-[#f06c52]">{hasTransactionProof ? 'Paid Now' : 'Intended (Unconfirmed)'}</span>
                          <span className="font-bold text-[#f06c52]">{formatINR((hasTransactionProof ? confirmedAmountNow : intendedAmount) || 0)}</span>
                        </div>
                        {!hasTransactionProof && (
                          <p className="mt-1 text-[10px] font-semibold text-[#c17a1f]">No transaction ID yet — this books as ₹0 paid until you add one.</p>
                        )}
                        {balanceDue > 0 && hasTransactionProof && (
                          <div className="mt-1 flex justify-between text-[#6f797a]">
                            <span>Balance at property</span>
                            <span>{formatINR(balanceDue)}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#6f797a]">
                Free cancellation until <strong className="text-[#004449]">{cancellationDeadline || '—'}</strong> (5 days before check-in).
              </p>

              {/* Payment details: QR + bank/UPI */}
              {bookingMode === 'pay_now' && (
                <div className="rounded-2xl border border-[#e0dcd3] bg-white p-4 sm:p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#004449]">Scan &amp; Pay</p>
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 rounded-xl border border-[#e0dcd3] p-2">
                      <QRCodeImage value={upiPaymentString || PAYMENT_INFO.upiId} size={140} />
                    </div>
                    <div className="w-full space-y-1.5 text-xs text-[#3f4849]">
                      <div className="flex justify-between"><span className="text-[#6f797a]">Merchant</span><span className="font-semibold text-[#004449]">{PAYMENT_INFO.payeeName}</span></div>
                      <div className="flex justify-between"><span className="text-[#6f797a]">UPI ID</span><span className="font-semibold text-[#004449]">{PAYMENT_INFO.upiId}</span></div>
                      <div className="flex justify-between"><span className="text-[#6f797a]">Bank</span><span className="font-semibold text-[#004449]">{PAYMENT_INFO.bankName}</span></div>
                      <div className="flex justify-between"><span className="text-[#6f797a]">Account No.</span><span className="font-semibold text-[#004449]">{PAYMENT_INFO.accountNumber}</span></div>
                      <div className="flex justify-between"><span className="text-[#6f797a]">IFSC</span><span className="font-semibold text-[#004449]">{PAYMENT_INFO.ifsc}</span></div>
                      <div className="flex justify-between"><span className="text-[#6f797a]">Full payment</span><span className="font-semibold text-[#0e5d63]">Available</span></div>
                      <p className="pt-1.5 text-[11px] leading-relaxed text-[#6f797a]">
                        Scan with GPay, PhonePe, Paytm or any UPI app, or transfer directly via bank details. After paying, enter your transaction ID above so we can confirm your booking.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitError && <p className="text-xs font-semibold text-[#c0392b]">{submitError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#004449] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#0e5d63] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Saving your booking…' : 'Confirm Booking & Send Bill via WhatsApp'}
              </button>
            </form>
          )}
        </div>

        {/* Zero-payment confirmation alert */}
        {showZeroPaymentConfirm && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-6" onClick={() => setShowZeroPaymentConfirm(false)}>
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e6c8] text-[#8a6d1f]">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <h3 className="text-center font-headline text-lg font-bold text-[#004449]">No Transaction ID Added</h3>
              <p className="mt-2 text-center text-xs leading-relaxed text-[#3f4849]">
                You haven't entered a transaction ID, so this booking will be recorded as <strong>₹0 paid</strong> until you confirm payment. You can still book now and pay later.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowZeroPaymentConfirm(false)}
                  className="w-full rounded-full border border-[#004449] py-3 text-xs font-bold uppercase tracking-wide text-[#004449] hover:bg-[#eef3f2]"
                >
                  Go Back &amp; Add Transaction ID
                </button>
                <button
                  type="button"
                  onClick={() => { setShowZeroPaymentConfirm(false); performSubmit(); }}
                  className="w-full rounded-full bg-[#004449] py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#0e5d63]"
                >
                  Continue Without Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
