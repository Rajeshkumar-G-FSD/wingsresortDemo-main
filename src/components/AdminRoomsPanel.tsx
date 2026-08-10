import React, { useEffect, useMemo, useState } from 'react';
import { BookingRecord, RoomBlock } from '../types';
import { ROOM_CATEGORIES, formatINR, getNightlyRate, getRoomUnits, getUnitMaxAdults, isWeekendDate } from '../data/roomsData';
import { createRoomBlock, deleteRoomBlock, subscribeToRoomBlocks, updateRoomPricing } from '../lib/roomsRepo';
import { toISO } from './DatePickerPopover';

interface AdminRoomsPanelProps {
  bookings: BookingRecord[];
}

/** How many months ahead the availability calendar covers — a full rolling year, starting this month. */
const YEAR_MONTHS = 12;
const WEEKDAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const todayISO = () => toISO(new Date());

const formatShortDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

/** Compact price for tight calendar cells, e.g. ₹8,000 → "₹8k", ₹14,000 → "₹14k". Full price is still in the tooltip. */
const formatCompactINR = (amount: number): string =>
  amount >= 1000 ? `₹${Math.round(amount / 100) / 10}k` : `₹${amount}`;

/** Cells for one month's grid: nulls for the leading blank days, then one Date per day of the month. */
const buildMonthCells = (monthStart: Date): (Date | null)[] => {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
};

interface BlockFormTarget {
  roomId: string;
  roomName: string;
  unitId: string;
  unitLabel: string;
  maxAdults: number;
  note?: string;
}

export const AdminRoomsPanel: React.FC<AdminRoomsPanelProps> = ({ bookings }) => {
  const [blocks, setBlocks] = useState<RoomBlock[]>([]);
  const [blocksError, setBlocksError] = useState<string | null>(null);
  const [blocksLoading, setBlocksLoading] = useState(true);

  const [blockTarget, setBlockTarget] = useState<BlockFormTarget | null>(null);
  const [blockStart, setBlockStart] = useState(todayISO());
  const [blockEnd, setBlockEnd] = useState(todayISO());
  const [blockReason, setBlockReason] = useState('');
  const [blockSaving, setBlockSaving] = useState(false);
  const [blockFormError, setBlockFormError] = useState<string | null>(null);

  const [unblockTarget, setUnblockTarget] = useState<RoomBlock | null>(null);
  const [unblockingId, setUnblockingId] = useState<string | null>(null);
  const [unblockError, setUnblockError] = useState<string | null>(null);

  const [priceDrafts, setPriceDrafts] = useState<Record<string, { weekday: string; weekend: string }>>(() =>
    Object.fromEntries(ROOM_CATEGORIES.map((r) => [r.id, { weekday: String(r.weekdayPrice), weekend: String(r.weekendPrice) }]))
  );
  const [priceSavingId, setPriceSavingId] = useState<string | null>(null);
  const [priceSavedId, setPriceSavedId] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const [calendarRoomId, setCalendarRoomId] = useState(ROOM_CATEGORIES[0].id);

  useEffect(() => {
    const unsubscribe = subscribeToRoomBlocks(
      (data) => { setBlocks(data); setBlocksLoading(false); setBlocksError(null); },
      (err) => { setBlocksError(err.message || 'Could not load room blocks.'); setBlocksLoading(false); }
    );
    return unsubscribe;
  }, []);

  const today = todayISO();

  /** A unit is "blocked" right now if any of its blocks covers today or a future date. */
  const activeBlockByUnit = useMemo(() => {
    const map = new Map<string, RoomBlock>();
    blocks
      .filter((b) => b.endDate >= today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .forEach((b) => { if (!map.has(b.unitId)) map.set(b.unitId, b); });
    return map;
  }, [blocks, today]);

  /** This month plus the next 11 — a rolling year of month grids for the availability calendar. */
  const upcomingMonths = useMemo(() => {
    const now = new Date();
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return Array.from({ length: YEAR_MONTHS }, (_, i) => new Date(firstOfThisMonth.getFullYear(), firstOfThisMonth.getMonth() + i, 1));
  }, []);

  const activeBookings = useMemo(
    () => bookings.filter((b) => b.status !== 'Cancelled'),
    [bookings]
  );

  const bookedQtyOnDate = (roomId: string, date: string) =>
    activeBookings
      .filter((b) => b.roomId === roomId && date >= b.checkIn && date < b.checkOut)
      .reduce((sum, b) => sum + b.quantity, 0);

  const blockedUnitsOnDate = (roomId: string, date: string) =>
    new Set(
      blocks
        .filter((b) => b.roomId === roomId && date >= b.startDate && date <= b.endDate)
        .map((b) => b.unitId)
    );

  const openBlockForm = (target: BlockFormTarget) => {
    setBlockTarget(target);
    setBlockStart(today);
    setBlockEnd(today);
    setBlockReason('');
    setBlockFormError(null);
  };

  const closeBlockForm = () => setBlockTarget(null);

  // Keep From/To linked: pushing "From" past the current "To" carries "To" along, and "To" can never land before "From".
  const handleBlockStartChange = (value: string) => {
    setBlockStart(value);
    if (blockEnd < value) setBlockEnd(value);
  };

  const handleBlockEndChange = (value: string) => {
    setBlockEnd(value < blockStart ? blockStart : value);
  };

  const submitBlock = async () => {
    if (!blockTarget) return;
    if (!blockStart || !blockEnd || blockEnd < blockStart) {
      setBlockFormError('Choose a valid start and end date.');
      return;
    }
    setBlockSaving(true);
    setBlockFormError(null);
    try {
      await createRoomBlock({
        roomId: blockTarget.roomId,
        roomName: blockTarget.roomName,
        unitId: blockTarget.unitId,
        unitLabel: blockTarget.unitLabel,
        startDate: blockStart,
        endDate: blockEnd,
        reason: blockReason.trim(),
      });
      closeBlockForm();
    } catch (err) {
      setBlockFormError(
        err instanceof Error && /permission/i.test(err.message)
          ? 'Missing Firestore permissions for room blocks. Ask your developer to publish the updated security rules (see FIREBASE_SETUP.md), then try again.'
          : 'Could not save this block. Please try again.'
      );
    } finally {
      setBlockSaving(false);
    }
  };

  const closeUnblockConfirm = () => { setUnblockTarget(null); setUnblockError(null); };

  const handleUnblock = async (block: RoomBlock) => {
    setUnblockingId(block.id);
    setUnblockError(null);
    try {
      await deleteRoomBlock(block.id);
      setUnblockTarget(null);
    } catch (err) {
      setUnblockError(
        err instanceof Error && /permission/i.test(err.message)
          ? 'Missing Firestore permissions for room blocks. Ask your developer to publish the updated security rules (see FIREBASE_SETUP.md), then try again.'
          : 'Could not remove this block. Please try again.'
      );
    } finally {
      setUnblockingId(null);
    }
  };

  const handlePriceDraftChange = (roomId: string, field: 'weekday' | 'weekend', value: string) => {
    setPriceDrafts((prev) => ({ ...prev, [roomId]: { ...prev[roomId], [field]: value } }));
    setPriceSavedId((prev) => (prev === roomId ? null : prev));
  };

  const savePrice = async (roomId: string) => {
    const draft = priceDrafts[roomId];
    const weekday = Number(draft?.weekday);
    const weekend = Number(draft?.weekend);
    if (!Number.isFinite(weekday) || weekday <= 0 || !Number.isFinite(weekend) || weekend <= 0) {
      setPriceError('Enter valid prices greater than 0 for both weekday and weekend.');
      return;
    }
    setPriceError(null);
    setPriceSavingId(roomId);
    try {
      await updateRoomPricing(roomId, weekday, weekend);
      setPriceSavedId(roomId);
    } catch {
      setPriceError('Could not save the new price. Please try again.');
    } finally {
      setPriceSavingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {(blocksError || priceError) && (
        <div className="rounded-xl border border-[#f3c9c2] bg-[#fbe2df] px-4 py-3 text-xs font-semibold text-[#c0392b]">
          {blocksError || priceError}
        </div>
      )}

      {/* Pricing */}
      <section>
        <h2 className="mb-1 font-headline text-xl text-[#004449]">Room Pricing</h2>
        <p className="mb-4 text-xs text-[#6f797a]">Update the weekday and weekend rate for each room category. Changes apply instantly across the site.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ROOM_CATEGORIES.map((room) => {
            const draft = priceDrafts[room.id] ?? { weekday: String(room.weekdayPrice), weekend: String(room.weekendPrice) };
            const isSaving = priceSavingId === room.id;
            const isSaved = priceSavedId === room.id;
            return (
              <div key={room.id} className="rounded-2xl border border-[#e4e2df] bg-white p-5 soft-shadow">
                <p className="font-headline text-base text-[#004449]">{room.name}</p>
                <p className="mb-3 text-[10px] uppercase tracking-wide text-[#a7ada9]">{room.roomCount} room{room.roomCount > 1 ? 's' : ''}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekday (₹)</label>
                    <input
                      type="number"
                      min={1}
                      value={draft.weekday}
                      onChange={(e) => handlePriceDraftChange(room.id, 'weekday', e.target.value)}
                      className="w-full rounded-lg border border-[#e4e2df] px-3 py-2 text-sm font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Weekend (₹)</label>
                    <input
                      type="number"
                      min={1}
                      value={draft.weekend}
                      onChange={(e) => handlePriceDraftChange(room.id, 'weekend', e.target.value)}
                      className="w-full rounded-lg border border-[#e4e2df] px-3 py-2 text-sm font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                    />
                  </div>
                </div>
                <button
                  onClick={() => savePrice(room.id)}
                  disabled={isSaving}
                  className={`mt-3 w-full rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                    isSaved ? 'bg-[#dcf1ea] text-[#0e5d63]' : 'bg-[#004449] text-white hover:bg-[#00363a]'
                  } disabled:opacity-60`}
                >
                  {isSaving ? 'Saving…' : isSaved ? 'Saved ✓' : 'Save Price'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Room units — block / unblock */}
      <section>
        <h2 className="mb-1 font-headline text-xl text-[#004449]">Rooms — Block / Unblock</h2>
        <p className="mb-4 text-xs text-[#6f797a]">Block a specific room for maintenance or owner use. Blocked rooms are highlighted below and removed from the availability calendar.</p>
        {blocksLoading ? (
          <div className="flex items-center gap-2 py-8 text-xs font-semibold uppercase tracking-wide text-[#6f797a]">
            <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Loading rooms…
          </div>
        ) : (
          <div className="space-y-6">
            {ROOM_CATEGORIES.map((room) => {
              const units = getRoomUnits(room);
              return (
                <div key={room.id} className="rounded-2xl border border-[#e4e2df] bg-white p-5 soft-shadow">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-headline text-base text-[#004449]">{room.name}</p>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#a7ada9]">{units.length} unit{units.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {units.map((unit) => {
                      const activeBlock = activeBlockByUnit.get(unit.id);
                      const isBlocked = Boolean(activeBlock);
                      return (
                        <div
                          key={unit.id}
                          className={`min-w-[150px] rounded-xl border px-3.5 py-3 ${
                            isBlocked ? 'border-[#f3c9c2] bg-[#fbe2df]' : 'border-[#dcf1ea] bg-[#f4faf8]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#1b1c1a]">{unit.label}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                                isBlocked ? 'bg-[#c0392b] text-white' : 'bg-[#0e5d63] text-white'
                              }`}
                            >
                              {isBlocked ? 'Blocked' : 'Available'}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[10px] text-[#6f797a]">
                            Up to {getUnitMaxAdults(room, unit)} adult{getUnitMaxAdults(room, unit) > 1 ? 's' : ''}{unit.note ? ` · ${unit.note}` : ''}
                          </p>
                          {isBlocked && activeBlock ? (
                            <>
                              <p className="mt-1.5 text-[10px] text-[#8a4038]">
                                {formatShortDate(activeBlock.startDate)} → {formatShortDate(activeBlock.endDate)}
                              </p>
                              {activeBlock.reason && <p className="text-[10px] italic text-[#8a4038]">{activeBlock.reason}</p>}
                              <button
                                onClick={() => setUnblockTarget(activeBlock)}
                                className="mt-2 w-full rounded-full border border-[#c0392b] py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#c0392b] hover:bg-[#c0392b] hover:text-white"
                              >
                                Unblock
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => openBlockForm({ roomId: room.id, roomName: room.name, unitId: unit.id, unitLabel: unit.label, maxAdults: getUnitMaxAdults(room, unit), note: unit.note })}
                              className="mt-2 w-full rounded-full border border-[#004449] py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#004449] hover:bg-[#004449] hover:text-white"
                            >
                              Block
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming calendar — full year, one room at a time */}
      <section>
        <h2 className="mb-1 font-headline text-xl text-[#004449]">Upcoming Calendar — Rates &amp; Availability</h2>
        <p className="mb-4 text-xs text-[#6f797a]">Every month for the next year. Each date shows the nightly rate; blocked or fully booked dates are highlighted. Hover a date for details.</p>

        {/* Room picker */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
          {ROOM_CATEGORIES.map((room) => (
            <button
              key={room.id}
              onClick={() => setCalendarRoomId(room.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                calendarRoomId === room.id ? 'bg-[#004449] text-white' : 'bg-white text-[#3f4849] hover:bg-[#eef3f2]'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4 text-[10px] font-semibold text-[#6f797a]">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#0e5d63]" /> Open</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#8a6d1f]" /> Limited</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#c0392b]" /> Fully booked (guests)</span>
          <span className="flex items-center gap-1.5">
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#7a1f1f]" /> Blocked by admin
          </span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#c8c4bd]" /> Past date</span>
        </div>

        {(() => {
          const room = ROOM_CATEGORIES.find((r) => r.id === calendarRoomId) ?? ROOM_CATEGORIES[0];
          const units = getRoomUnits(room);
          return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {upcomingMonths.map((monthStart) => (
                <div key={monthStart.toISOString()} className="rounded-2xl border border-[#e4e2df] bg-white p-4 soft-shadow">
                  <p className="mb-3 text-center font-headline text-sm text-[#004449]">
                    {monthStart.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {WEEKDAY_HEADERS.map((w, i) => (
                      <div key={`${w}-${i}`} className="flex h-5 items-center justify-center text-[9px] font-bold text-[#a7ada9]">{w}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {buildMonthCells(monthStart).map((date, i) => {
                      if (!date) return <div key={i} />;
                      const dateISO = toISO(date);
                      const isPast = dateISO < today;
                      const rate = getNightlyRate(room, dateISO);
                      const blockedSet = blockedUnitsOnDate(room.id, dateISO);
                      const hasBlocked = blockedSet.size > 0;
                      const booked = bookedQtyOnDate(room.id, dateISO);
                      const open = Math.max(0, room.roomCount - blockedSet.size - booked);
                      // Admin blocks get their own unmistakable dark-red tone — kept separate from "fully booked
                      // by guests" so it's obvious at a glance which dates need an unblock vs. are just sold out.
                      const tone = isPast
                        ? 'bg-[#f5f3f0] text-[#a7ada9]'
                        : hasBlocked
                          ? 'bg-[#7a1f1f] text-white'
                          : open === 0
                            ? 'bg-[#fbe2df] text-[#c0392b]'
                            : open <= Math.ceil(room.roomCount / 2)
                              ? 'bg-[#f5e6c8] text-[#8a6d1f]'
                              : 'bg-[#f4faf8] text-[#0e5d63]';
                      const blockedLabels = Array.from(blockedSet)
                        .map((unitId) => units.find((u) => u.id === unitId)?.label)
                        .filter(Boolean)
                        .join(', ');
                      const tooltip = [
                        formatINR(rate) + (isWeekendDate(dateISO) ? ' (weekend)' : ''),
                        `${open}/${room.roomCount} open`,
                        blockedLabels ? `Blocked: ${blockedLabels}` : null,
                      ].filter(Boolean).join(' — ');
                      return (
                        <div
                          key={dateISO}
                          title={tooltip}
                          className={`flex h-12 flex-col items-center justify-center rounded-lg text-[9px] font-semibold leading-tight ${tone} ${
                            hasBlocked ? 'ring-2 ring-inset ring-[#4a0f0f]' : isWeekendDate(dateISO) && !isPast ? 'ring-1 ring-inset ring-[#f06c52]/40' : ''
                          }`}
                        >
                          <span className="flex items-center gap-0.5 text-[10px] font-bold">
                            {date.getDate()}
                            {hasBlocked && <span className="material-symbols-outlined text-[10px] leading-none">block</span>}
                          </span>
                          <span>{formatCompactINR(rate)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* Block form modal */}
      {blockTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={closeBlockForm}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#f06c52]">Block Room</p>
            <h3 className="mt-1 font-headline text-lg text-[#004449]">{blockTarget.roomName} — {blockTarget.unitLabel}</h3>
            <p className="text-[10px] text-[#6f797a]">Up to {blockTarget.maxAdults} adult{blockTarget.maxAdults > 1 ? 's' : ''}{blockTarget.note ? ` · ${blockTarget.note}` : ''}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">From</label>
                <input
                  type="date"
                  value={blockStart}
                  min={today}
                  onChange={(e) => handleBlockStartChange(e.target.value)}
                  className="w-full rounded-lg border border-[#e4e2df] px-3 py-2 text-xs font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">To</label>
                <input
                  type="date"
                  value={blockEnd}
                  min={blockStart || today}
                  onChange={(e) => handleBlockEndChange(e.target.value)}
                  className="w-full rounded-lg border border-[#e4e2df] px-3 py-2 text-xs font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Reason (optional)</label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Maintenance, owner stay"
                className="w-full rounded-lg border border-[#e4e2df] px-3 py-2 text-xs text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30"
              />
            </div>
            {blockFormError && <p className="mt-2 text-xs font-semibold text-[#c0392b]">{blockFormError}</p>}
            <div className="mt-5 flex gap-2">
              <button onClick={closeBlockForm} className="flex-1 rounded-full border border-[#e0dcd3] py-2.5 text-xs font-bold uppercase tracking-wide text-[#3f4849]">Cancel</button>
              <button
                onClick={submitBlock}
                disabled={blockSaving}
                className="flex-1 rounded-full bg-[#c0392b] py-2.5 text-xs font-bold uppercase tracking-wide text-white disabled:opacity-60"
              >
                {blockSaving ? 'Blocking…' : 'Block Room'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unblock confirmation modal */}
      {unblockTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={closeUnblockConfirm}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#dcf1ea] text-[#0e5d63]">
              <span className="material-symbols-outlined text-2xl">lock_open</span>
            </div>
            <h3 className="text-center font-headline text-lg text-[#004449]">Unblock {unblockTarget.roomName} — {unblockTarget.unitLabel}?</h3>
            <p className="mt-2 text-center text-xs leading-relaxed text-[#6f797a]">
              This room will become available for booking again from{' '}
              <strong className="text-[#1b1c1a]">{formatShortDate(unblockTarget.startDate)}</strong> to{' '}
              <strong className="text-[#1b1c1a]">{formatShortDate(unblockTarget.endDate)}</strong>.
            </p>
            {unblockError && <p className="mt-2 text-center text-xs font-semibold text-[#c0392b]">{unblockError}</p>}
            <div className="mt-5 flex gap-2">
              <button onClick={closeUnblockConfirm} className="flex-1 rounded-full border border-[#e0dcd3] py-2.5 text-xs font-bold uppercase tracking-wide text-[#3f4849]">Cancel</button>
              <button
                onClick={() => handleUnblock(unblockTarget)}
                disabled={unblockingId === unblockTarget.id}
                className="flex-1 rounded-full bg-[#0e5d63] py-2.5 text-xs font-bold uppercase tracking-wide text-white disabled:opacity-60"
              >
                {unblockingId === unblockTarget.id ? 'Unblocking…' : 'Unblock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
