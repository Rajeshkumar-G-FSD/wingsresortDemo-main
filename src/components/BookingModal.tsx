import React, { useState } from 'react';
import { VILLAS } from '../data/resortData';
import { Villa } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVilla?: Villa | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedVilla
}) => {
  if (!isOpen) return null;

  const [selectedVillaId, setSelectedVillaId] = useState<string>(
    preselectedVilla?.id || VILLAS[0].id
  );
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-15');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Add-ons
  const [addons, setAddons] = useState({
    airportTransfer: true,
    privateChef: false,
    spaPackage: true,
    champagneArrival: true
  });

  const [submitted, setSubmitted] = useState(false);

  const selectedVilla = VILLAS.find((v) => v.id === selectedVillaId) || VILLAS[0];

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 5 : diffDays;
  };

  const nights = calculateNights();
  const subtotal = selectedVilla.pricePerNight * nights;
  
  let addonTotal = 0;
  if (addons.airportTransfer) addonTotal += 150;
  if (addons.privateChef) addonTotal += 400;
  if (addons.spaPackage) addonTotal += 250;
  if (addons.champagneArrival) addonTotal += 120;

  const total = subtotal + addonTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#fbf9f6] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-[#004449] text-white p-6 sm:p-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8fd2d8]">
              Wings Concierge Engine
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold mt-1">
              {submitted ? 'Reservation Confirmed' : 'Book Your Sanctuary'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#004449]/10 text-[#004449] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl">task_alt</span>
            </div>

            <h3 className="font-headline text-3xl text-[#004449] font-bold">
              We Look Forward to Welcoming You
            </h3>

            <p className="text-sm text-[#3f4849] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#004449]">{name || 'Valued Guest'}</strong>. Your reservation request for <strong className="text-[#004449]">{selectedVilla.name}</strong> ({checkIn} to {checkOut}) has been received. Our dedicated island butler team will send your complete itinerary to <strong className="text-[#004449]">{email || 'your email'}</strong> within 2 hours.
            </p>

            <div className="p-6 bg-[#f5f3f0] rounded-2xl max-w-md mx-auto border border-[#e4e2df] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#a93721] font-semibold">CONFIRMATION CODE:</span>
                <span className="font-mono font-bold text-[#004449]">WING-2026-9842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a93721] font-semibold">TOTAL ESTIMATE:</span>
                <span className="font-bold text-[#004449]">${total} USD</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              Return to Wings Resort
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Villa Selection & Stay Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Select Accommodation
                </label>
                <select
                  value={selectedVillaId}
                  onChange={(e) => setSelectedVillaId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                >
                  {VILLAS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} (${v.pricePerNight}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6+ Guests</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                  required
                />
              </div>
            </div>

            {/* Bespoke Add-ons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-2">
                Enhance Your Stay (Optional Add-ons)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] cursor-pointer hover:bg-[#efeeeb] transition-colors">
                  <span className="text-xs font-medium text-[#1b1c1a]">Private Helipad/Airport Transfer (+$150)</span>
                  <input
                    type="checkbox"
                    checked={addons.airportTransfer}
                    onChange={(e) => setAddons({ ...addons, airportTransfer: e.target.checked })}
                    className="accent-[#004449] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] cursor-pointer hover:bg-[#efeeeb] transition-colors">
                  <span className="text-xs font-medium text-[#1b1c1a]">In-Villa Private Chef Evening (+$400)</span>
                  <input
                    type="checkbox"
                    checked={addons.privateChef}
                    onChange={(e) => setAddons({ ...addons, privateChef: e.target.checked })}
                    className="accent-[#004449] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] cursor-pointer hover:bg-[#efeeeb] transition-colors">
                  <span className="text-xs font-medium text-[#1b1c1a]">Full Botanical Spa Package (+$250)</span>
                  <input
                    type="checkbox"
                    checked={addons.spaPackage}
                    onChange={(e) => setAddons({ ...addons, spaPackage: e.target.checked })}
                    className="accent-[#004449] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] cursor-pointer hover:bg-[#efeeeb] transition-colors">
                  <span className="text-xs font-medium text-[#1b1c1a]">Chilled Vintage Champagne Arrival (+$120)</span>
                  <input
                    type="checkbox"
                    checked={addons.champagneArrival}
                    onChange={(e) => setAddons({ ...addons, champagneArrival: e.target.checked })}
                    className="accent-[#004449] w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#a93721] block mb-1">
                Special Requests or Dietary Preferences
              </label>
              <textarea
                rows={2}
                placeholder="Let us know if you are celebrating an anniversary, require specific pillows, or have dietary requests..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a] focus:outline-none focus:border-[#004449]"
              />
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-[#004449]/5 border border-[#004449]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#3f4849]">
                <span>{selectedVilla.name} ({nights} nights @ ${selectedVilla.pricePerNight})</span>
                <span>${subtotal}</span>
              </div>
              {addonTotal > 0 && (
                <div className="flex justify-between text-[#3f4849]">
                  <span>Concierge Add-ons</span>
                  <span>+${addonTotal}</span>
                </div>
              )}
              <div className="border-t border-[#004449]/10 pt-2 flex justify-between font-bold text-sm text-[#004449]">
                <span>Estimated Total</span>
                <span>${total} USD</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full coral-gradient text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95"
            >
              Complete Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
