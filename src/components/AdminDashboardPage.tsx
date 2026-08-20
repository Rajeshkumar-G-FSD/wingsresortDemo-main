import React, { useEffect, useMemo, useState } from 'react';
import { BookingRecord, BookingStatus } from '../types';
import { subscribeToBookings, updateBookingStatus, deleteBooking } from '../lib/bookingsRepo';
import { formatINR } from '../data/roomsData';
import { CONTACT_INFO } from '../data/contactInfo';
import { AdminRoomsPanel } from './AdminRoomsPanel';

interface AdminDashboardPageProps {
  onLogout: () => void;
}

type AdminTab = 'bookings' | 'rooms';

const STATUS_FILTERS: (BookingStatus | 'All')[] = ['All', 'Pending Payment', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled'];

const STATUS_OPTIONS: BookingStatus[] = ['Pending Payment', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled'];

const STATUS_STYLES: Record<BookingStatus, string> = {
  'Pending Payment': 'bg-[#f5e6c8] text-[#8a6d1f]',
  Confirmed: 'bg-[#dcf1ea] text-[#0e5d63]',
  'Checked In': 'bg-[#eef3f2] text-[#004449]',
  'Checked Out': 'bg-[#eae8e5] text-[#6f797a]',
  Cancelled: 'bg-[#fbe2df] text-[#c0392b]',
};

const formatDate = (iso: string) => {
  if (!iso) return '—';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>('bookings');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const unsubscribe = subscribeToBookings(
      (data) => { setBookings(data); setLoading(false); setError(null); },
      (err) => { setError(err.message || 'Could not load bookings.'); setLoading(false); }
    );
    return unsubscribe;
  }, []);

  const filtered = useMemo(
    () => (statusFilter === 'All' ? bookings : bookings.filter((b) => b.status === statusFilter)),
    [bookings, statusFilter]
  );

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === 'Pending Payment').length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Checked In').length;
    const revenue = bookings.reduce((sum, b) => sum + (b.amountPayingNow || 0), 0);
    const unpaid = bookings.filter((b) => b.bookingMode === 'pay_now' && !b.transactionId).length;
    return { total, pending, confirmed, revenue, unpaid };
  }, [bookings]);

  const handleStatusChange = async (booking: BookingRecord, status: BookingStatus) => {
    setUpdatingId(booking.id);
    try {
      await updateBookingStatus(booking.id, status);
      // Cancelling from the admin panel shares the full details to the resort's WhatsApp so
      // whoever's on the ground knows immediately — no need to check the dashboard separately.
      if (status === 'Cancelled') {
        const ref = booking.id.slice(0, 8).toUpperCase();
        const message = [
          `Booking Cancelled — Ref ${ref}`,
          `Room: ${booking.roomName}${booking.units && booking.units.length > 0 ? ` (${booking.units.join(', ')})` : ''}`,
          `Stay: ${formatDate(booking.checkIn)} → ${formatDate(booking.checkOut)} (${booking.nights} night${booking.nights > 1 ? 's' : ''})`,
          `Guest: ${booking.guestName}`,
          `Phone: ${booking.guestPhone}`,
          booking.guestEmail ? `Email: ${booking.guestEmail}` : null,
          `Amount paid: ${formatINR(booking.amountPayingNow)} of ${formatINR(booking.total)} total`,
          'Cancelled via the admin dashboard.',
        ].filter(Boolean).join('\n');
        window.open(`https://wa.me/91${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setError('Could not update booking status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
    } catch {
      setError('Could not delete booking. Please try again.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="min-h-[80vh] animate-fadeIn bg-[#f5f3f0] px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Admin</p>
            <h1 className="font-headline text-3xl text-[#004449]">Bookings Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[#e0dcd3] bg-white px-5 py-2.5 text-xs font-semibold text-[#3f4849] hover:border-[#004449] hover:text-[#004449]"
          >
            <span className="material-symbols-outlined text-base">logout</span> Log Out
          </button>
        </div>

        {/* Top-level tabs */}
        <div className="mb-8 flex gap-2">
          {([
            { id: 'bookings' as const, label: 'Bookings', icon: 'event_note' },
            { id: 'rooms' as const, label: 'Rooms & Pricing', icon: 'meeting_room' },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                tab === t.id ? 'bg-[#004449] text-white' : 'bg-white text-[#3f4849] hover:bg-[#eef3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-base">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {tab === 'rooms' ? (
          <AdminRoomsPanel bookings={bookings} />
        ) : (
          <>
        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-5 soft-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Total Bookings</span>
            <p className="mt-1 font-headline text-3xl text-[#004449]">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 soft-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Pending Payment</span>
            <p className="mt-1 font-headline text-3xl text-[#8a6d1f]">{stats.pending}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 soft-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Confirmed / In-House</span>
            <p className="mt-1 font-headline text-3xl text-[#0e5d63]">{stats.confirmed}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 soft-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">No Transaction ID</span>
            <p className="mt-1 font-headline text-3xl text-[#c0392b]">{stats.unpaid}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 soft-shadow">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">Collected (Recorded)</span>
            <p className="mt-1 font-headline text-3xl text-[#004449]">{formatINR(stats.revenue)}</p>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                statusFilter === status ? 'bg-[#004449] text-white' : 'bg-white text-[#3f4849] hover:bg-[#eef3f2]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-[#f3c9c2] bg-[#fbe2df] px-4 py-3 text-xs font-semibold text-[#c0392b]">{error}</div>
        )}

        {/* Bookings table */}
        <div className="overflow-hidden rounded-2xl border border-[#e4e2df] bg-white soft-shadow">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#6f797a]">
              <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
              <span className="text-xs font-semibold uppercase tracking-wide">Loading bookings…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-center text-[#6f797a]">
              <span className="material-symbols-outlined text-3xl">event_busy</span>
              <p className="text-sm font-semibold">No bookings {statusFilter !== 'All' ? `with status "${statusFilter}"` : 'yet'}.</p>
              <p className="text-xs">New requests from the website will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs">
                <thead className="bg-[#f5f3f0] text-[10px] font-bold uppercase tracking-wide text-[#6f797a]">
                  <tr>
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3">Stay</th>
                    <th className="px-4 py-3">Guests</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efeeeb]">
                  {filtered.map((b) => (
                    <tr key={b.id} className="align-top">
                      <td className="px-4 py-4">
                        <span className="block font-semibold text-[#1b1c1a]">{b.guestName}</span>
                        <span className="block text-[#6f797a]">{b.guestPhone}</span>
                        <span className="block text-[#6f797a]">{b.guestEmail}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="block font-semibold text-[#1b1c1a]">{b.roomName}</span>
                        <span className="block text-[#6f797a]">
                          {b.units && b.units.length > 0 ? b.units.join(', ') : `Qty ${b.quantity}`}
                        </span>
                        <span className="block text-[10px] text-[#a7ada9]">Ref {b.id.slice(0, 8).toUpperCase()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="block text-[#1b1c1a]">{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</span>
                        <span className="block text-[#6f797a]">{b.nights} night{b.nights > 1 ? 's' : ''}</span>
                      </td>
                      <td className="px-4 py-4 text-[#1b1c1a]">
                        {b.adults} adult{b.adults > 1 ? 's' : ''}
                        {b.children > 0 && <>, {b.children} child{b.children > 1 ? 'ren' : ''}</>}
                        {b.extraBeds > 0 && <span className="block text-[#6f797a]">+{b.extraBeds} extra bed{b.extraBeds > 1 ? 's' : ''}</span>}
                      </td>
                      <td className="px-4 py-4">
                        <span className="block font-semibold text-[#004449]">{formatINR(b.amountPayingNow)} <span className="font-normal text-[#6f797a]">now</span></span>
                        <span className="block text-[#6f797a]">of {formatINR(b.total)} total</span>
                        {b.total - b.amountPayingNow > 0 && (
                          <span className="block font-semibold text-[#c17a1f]">Balance: {formatINR(b.total - b.amountPayingNow)}</span>
                        )}
                        {b.bookingMode === 'pay_at_resort' ? (
                          <span className="mt-1 inline-block rounded-full bg-[#eef3f2] px-2 py-0.5 text-[10px] font-bold uppercase text-[#004449]">Pay at Resort</span>
                        ) : b.transactionId ? (
                          <span className="mt-1 block text-[10px] text-[#0e5d63]">Txn: {b.transactionId}</span>
                        ) : (
                          <span className="mt-1 inline-block rounded-full bg-[#fbe2df] px-2 py-0.5 text-[10px] font-bold uppercase text-[#c0392b]">No Transaction ID</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleStatusChange(b, e.target.value as BookingStatus)}
                          className={`rounded-full border-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${STATUS_STYLES[b.status]}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {pendingDeleteId === b.id ? (
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => handleDelete(b.id)} className="rounded-full bg-[#c0392b] px-3 py-1.5 text-[10px] font-bold uppercase text-white">Confirm</button>
                            <button onClick={() => setPendingDeleteId(null)} className="rounded-full border border-[#e0dcd3] px-3 py-1.5 text-[10px] font-bold uppercase text-[#3f4849]">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setPendingDeleteId(b.id)} className="rounded-full p-2 text-[#a7ada9] hover:bg-[#fbe2df] hover:text-[#c0392b]" aria-label="Delete booking">
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};
