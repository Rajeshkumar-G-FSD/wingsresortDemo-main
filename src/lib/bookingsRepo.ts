import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { BookingRecord, BookingStatus, NewBookingInput } from '../types';

const BOOKINGS_COLLECTION = 'bookings';

/** Creates a booking document; returns the new Firestore document id. */
export const createBooking = async (input: NewBookingInput): Promise<string> => {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...input,
    status: 'Pending Payment' as BookingStatus,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

/** Subscribes to all bookings in real time, newest first. Returns an unsubscribe function. */
export const subscribeToBookings = (
  onChange: (bookings: BookingRecord[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const bookings: BookingRecord[] = snapshot.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now();
        return { ...(data as Omit<BookingRecord, 'id' | 'createdAt'>), id: d.id, createdAt };
      });
      onChange(bookings);
    },
    onError
  );
};

export const updateBookingStatus = async (bookingId: string, status: BookingStatus): Promise<void> => {
  await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), { status });
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
};
