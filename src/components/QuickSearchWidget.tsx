import React, { useState } from 'react';

interface QuickSearchWidgetProps {
  onSearch: (checkIn: string, checkOut: string, guests: number, category: string) => void;
}

export const QuickSearchWidget: React.FC<QuickSearchWidgetProps> = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-15');
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(checkIn, checkOut, guests, category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-10 relative z-30 px-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-3xl p-4 md:p-6 soft-shadow border border-[#e4e2df] grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
      >
        {/* Check-In */}
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[#e4e2df] pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#a93721] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">calendar_month</span> Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="text-sm font-medium text-[#1b1c1a] bg-transparent focus:outline-none cursor-pointer"
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[#e4e2df] pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#a93721] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">event_busy</span> Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="text-sm font-medium text-[#1b1c1a] bg-transparent focus:outline-none cursor-pointer"
          />
        </div>

        {/* Guests & Category */}
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[#e4e2df] pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#a93721] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">group</span> Guests & Type
          </label>
          <div className="flex items-center gap-2">
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="text-sm font-medium text-[#1b1c1a] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={6}>6+ Guests</option>
            </select>
            <span className="text-gray-300">|</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm font-medium text-[#1b1c1a] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">All Villas</option>
              <option value="Oceanfront">Oceanfront</option>
              <option value="Garden">Garden</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Private Island">Island</option>
            </select>
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full h-full min-h-[52px] rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
        >
          <span>Search Availability</span>
          <span className="material-symbols-outlined text-lg">search</span>
        </button>
      </form>
    </div>
  );
};
