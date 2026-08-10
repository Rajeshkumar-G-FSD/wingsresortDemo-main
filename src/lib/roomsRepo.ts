import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { NewRoomBlockInput, RoomBlock, RoomPricingOverride } from '../types';
import { applyPricingOverrides } from '../data/roomsData';

const ROOM_BLOCKS_COLLECTION = 'roomBlocks';
const ROOM_PRICING_COLLECTION = 'roomPricing';

/** Creates a block that removes one physical room unit from availability for a date range. */
export const createRoomBlock = async (input: NewRoomBlockInput): Promise<string> => {
  const docRef = await addDoc(collection(db, ROOM_BLOCKS_COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

/** Removes a block, restoring the room unit to availability. */
export const deleteRoomBlock = async (blockId: string): Promise<void> => {
  await deleteDoc(doc(db, ROOM_BLOCKS_COLLECTION, blockId));
};

/** Subscribes to all room blocks in real time, newest first. Returns an unsubscribe function. */
export const subscribeToRoomBlocks = (
  onChange: (blocks: RoomBlock[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  const q = query(collection(db, ROOM_BLOCKS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const blocks: RoomBlock[] = snapshot.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now();
        return { ...(data as Omit<RoomBlock, 'id' | 'createdAt'>), id: d.id, createdAt };
      });
      onChange(blocks);
    },
    onError
  );
};

/** Saves (or updates) the admin-set weekday/weekend price for a room category. */
export const updateRoomPricing = async (roomId: string, weekdayPrice: number, weekendPrice: number): Promise<void> => {
  await setDoc(doc(db, ROOM_PRICING_COLLECTION, roomId), {
    weekdayPrice,
    weekendPrice,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Subscribes to price overrides in real time, applies them onto the shared ROOM_CATEGORIES array, and calls
 * `onChange` (with the raw overrides map, keyed by roomId) after every update so callers can force a re-render.
 */
export const subscribeToRoomPricing = (
  onChange: (overrides: Record<string, RoomPricingOverride>) => void,
  onError: (error: Error) => void
): (() => void) => {
  const q = collection(db, ROOM_PRICING_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      const overrides: Record<string, RoomPricingOverride> = {};
      snapshot.docs.forEach((d) => {
        const data = d.data() as Record<string, unknown>;
        const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : Date.now();
        overrides[d.id] = {
          weekdayPrice: Number(data.weekdayPrice) || 0,
          weekendPrice: Number(data.weekendPrice) || 0,
          updatedAt,
        };
      });
      applyPricingOverrides(overrides);
      onChange(overrides);
    },
    onError
  );
};
