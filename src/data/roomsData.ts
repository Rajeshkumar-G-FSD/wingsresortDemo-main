import { RoomCategory, RoomUnit } from '../types';

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: '3bhk-villa',
    name: '3BHK Villa',
    tagline: "The resort's largest private villa",
    description:
      'Our signature 3BHK villa is a private, self-contained retreat — a spacious 1,200 sq ft home with its own common hall and three attached bathrooms, built for big families and multi-generational getaways.',
    roomCount: 2,
    maxAdults: 12,
    extraBedAllowed: true,
    sizeSqft: 1200,
    bedType: '3 King Size Beds',
    bathrooms: 3,
    weekdayPrice: 8000,
    weekendPrice: 14000,
    heroImage: '/images/wings_resort_threebedroom.png',
    gallery: ['/images/wings_resort_threebedroom.png', '/images/wings_resort_five_bh_house.jpg', '/images/wings_deluex_three_room.jpg.png', '/images/wings_resort_rooms_frontview.png'],
    amenities: ['3 King Size Beds', 'Common Hall', '3 Attached Bathrooms', 'Western Toilets', '32" Flat-Screen TV', 'Free Wi-Fi', '24-Hour Hot Water', 'Free Parking'],
    badge: 'Best for Big Groups',
  },
  {
    id: '2bhk-villa',
    name: '2BHK Villa',
    tagline: 'Cozy villa living for families',
    description:
      'A warm 600 sq ft villa with its own common hall and sofa seating — ideal for two families travelling together, or a mid-sized group who still want a private, self-contained space.',
    roomCount: 7,
    maxAdults: 6,
    extraBedAllowed: true,
    sizeSqft: 600,
    bedType: '2 King Size Beds',
    bathrooms: 2,
    weekdayPrice: 5500,
    weekendPrice: 7000,
    heroImage: '/images/wings_resort_mainbuilding.png',
    gallery: ['/images/wings_resort_mainbuilding.png', '/images/wings_resort_rooms_frontview.png', '/images/wings_resort_5bh_rooms_frontview.png'],
    amenities: ['2 King Size Beds', 'Common Hall & Sofa', '2 Western Toilets', '32" Flat-Screen TV', 'Free Wi-Fi', '24-Hour Hot Water', 'Parking Inside Campus'],
    badge: 'Family Favorite',
  },
  {
    id: 'couples-room',
    name: 'Couples Room',
    tagline: 'Intimate comfort for two',
    description:
      'A snug 350 sq ft room with a king bed and an attached western bathroom — perfectly sized for couples and honeymooners who want privacy without the extra space.',
    roomCount: 5,
    maxAdults: 3,
    extraBedAllowed: true,
    sizeSqft: 350,
    bedType: '1 King Size Bed',
    bathrooms: 1,
    weekdayPrice: 2500,
    weekendPrice: 3000,
    heroImage: '/images/wings_resort_couples_bed_room.png',
    gallery: ['/images/wings_resort_couples_bed_room.png', '/images/wings_resort_rooms_frontview.png'],
    amenities: ['1 King Size Bed', 'Attached Western Toilet', 'Free Wi-Fi', 'Hot Water', 'Free Parking'],
    badge: 'Most Popular',
  },
  {
    id: 'wood-house',
    name: 'Wood House',
    tagline: 'Rustic charm, real comfort',
    description:
      'A single 350 sq ft wood-panelled room with the same comforts as our Couples Room, wrapped in a rustic timber-cabin feel guests love.',
    roomCount: 1,
    maxAdults: 3,
    extraBedAllowed: true,
    sizeSqft: 350,
    bedType: '1 King Size Bed',
    bathrooms: 1,
    weekdayPrice: 2500,
    weekendPrice: 3000,
    heroImage: '/images/wings_resort_wooden_house.jpg',
    gallery: ['/images/wings_resort_wooden_house.jpg', '/images/wings_resort_wood_house_rooms_fontview.png'],
    amenities: ['1 King Size Bed', 'Attached Western Toilet', 'Free Wi-Fi', 'Hot Water', 'Free Parking'],
    badge: 'Rustic Retreat',
  },
  {
    id: 'a-type-wood-house',
    name: 'A Type Wood House',
    tagline: 'A-frame charm with room to spare',
    description:
      'Our distinctive A-type wood house pairs a king bed with an upper loft bed inside a 450 sq ft cabin — a favorite with small families and groups of friends.',
    roomCount: 1,
    maxAdults: 5,
    extraBedAllowed: true,
    sizeSqft: 450,
    bedType: '1 King Size Bed + Upper Bed',
    bathrooms: 1,
    weekdayPrice: 4000,
    weekendPrice: 5500,
    heroImage: '/images/wings_resort_a_type_house.jpg',
    gallery: ['/images/wings_resort_a_type_house.jpg', '/images/wings_resort_a_type_building.png', '/images/wings_resort_a_type_bedroom.png', '/images/wings_resort_a_house_fontview.png'],
    amenities: ['1 King Size Bed', 'Upper Loft Bed', 'Attached Western Toilet', 'Free Wi-Fi', 'Hot Water', 'Free Parking'],
    badge: 'Unique Stay',
  },
  {
    id: 'family-room',
    name: 'Family Room',
    tagline: 'Built for family time',
    description:
      'A 500 sq ft room with two king beds and two attached toilets, giving families the space and privacy to settle in comfortably.',
    roomCount: 1,
    maxAdults: 6,
    extraBedAllowed: true,
    sizeSqft: 500,
    bedType: '2 King Size Beds',
    bathrooms: 2,
    weekdayPrice: 4500,
    weekendPrice: 5500,
    heroImage: '/images/wings_resort_family_bed_room.png',
    gallery: ['/images/wings_resort_family_bed_room.png', '/images/wings_resort_5bh_rooms_frontview.png'],
    amenities: ['2 King Size Beds', '2 Attached Toilets', 'Free Wi-Fi', 'Hot Water', 'Free Parking'],
    badge: 'Spacious Comfort',
  },
];

/** Nights considered "weekend" (higher demand) pricing — Friday & Saturday. */
const WEEKEND_DAYS = [5, 6];

/** Optional seasonal date ranges (inclusive) that use seasonal pricing. Empty by default — add ranges here to activate. */
export const SEASONAL_DATE_RANGES: { start: string; end: string }[] = [];

export const CHILD_FREE_AGE = 7;
export const CANCELLATION_DAYS_BEFORE_CHECKIN = 5;
/** Flat per-night charge for an extra bed — not specified in the source pricing sheet; adjust to your actual rate. */
export const EXTRA_BED_CHARGE_PER_NIGHT = 700;
/** One-time charge for the campfire experience add-on. */
export const CAMPFIRE_CHARGE = 1500;

export const formatINR = (amount: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

/**
 * 2BHK Villa's seven numbered rooms don't share one occupancy — each is its own physical room with its own
 * bed setup, per the resort's actual layout. Room 205 in particular is a full Family Room (2 king beds).
 */
const TWO_BHK_UNIT_SPECS: Record<number, { maxAdults: number; bedType: string; note: string }> = {
  201: { maxAdults: 3, bedType: '1 King Size Bed', note: 'Single Room' },
  202: { maxAdults: 3, bedType: '1 King Size Bed', note: 'Single Room' },
  203: { maxAdults: 2, bedType: '1 King Size Bed', note: 'Double Occupancy' },
  204: { maxAdults: 3, bedType: '1 King Size Bed', note: 'Single Room' },
  205: { maxAdults: 6, bedType: '2 King Size Beds', note: 'Family Room' },
  206: { maxAdults: 3, bedType: '1 King Size Bed', note: 'Single Room' },
  207: { maxAdults: 3, bedType: '1 King Size Bed', note: 'Single Room' },
};

/**
 * The individual, physically bookable rooms inside a category — what the admin dashboard blocks/unblocks
 * and prices, and what guests pick from when booking. 2BHK Villa rooms are numbered 201–20N, each with its
 * own occupancy (see TWO_BHK_UNIT_SPECS); every other multi-room category is Room 1..N sharing the
 * category's occupancy; single-room categories (Couples-sized cabins, etc.) use the category name as the
 * one unit.
 */
export const getRoomUnits = (room: RoomCategory): RoomUnit[] => {
  if (room.id === '2bhk-villa') {
    return Array.from({ length: room.roomCount }, (_, i) => {
      const num = 201 + i;
      const spec = TWO_BHK_UNIT_SPECS[num];
      return { id: `${room.id}-${num}`, label: `Room ${num}`, maxAdults: spec?.maxAdults, bedType: spec?.bedType, note: spec?.note };
    });
  }
  if (room.roomCount > 1) {
    return Array.from({ length: room.roomCount }, (_, i) => ({ id: `${room.id}-r${i + 1}`, label: `Room ${i + 1}` }));
  }
  return [{ id: `${room.id}-main`, label: room.name }];
};

/** A unit's max guests — its own override if set, otherwise the category default. */
export const getUnitMaxAdults = (room: RoomCategory, unit: RoomUnit): number => unit.maxAdults ?? room.maxAdults;

/** A unit's bed configuration — its own override if set, otherwise the category default. */
export const getUnitBedType = (room: RoomCategory, unit: RoomUnit): string => unit.bedType ?? room.bedType;

/**
 * Mutates the shared ROOM_CATEGORIES array in place with admin-set price overrides so every component that
 * imported the array (site pages, booking modal) reflects the new price on their next render — no prop
 * drilling needed. Callers should trigger a re-render (e.g. a counter bump in App.tsx) after calling this.
 */
export const applyPricingOverrides = (overrides: Record<string, { weekdayPrice: number; weekendPrice: number }>): void => {
  ROOM_CATEGORIES.forEach((room) => {
    const override = overrides[room.id];
    if (override) {
      room.weekdayPrice = override.weekdayPrice;
      room.weekendPrice = override.weekendPrice;
    }
  });
};

const isDateInRanges = (dateISO: string, ranges: { start: string; end: string }[]): boolean =>
  ranges.some((range) => dateISO >= range.start && dateISO <= range.end);

export const isWeekendDate = (dateISO: string): boolean => {
  const day = new Date(`${dateISO}T00:00:00`).getDay();
  return WEEKEND_DAYS.includes(day);
};

/** Seasonal price always equals weekend price per resort policy, so seasonal dates just widen which nights get the weekend rate. */
export const getNightlyRate = (room: RoomCategory, dateISO: string): number =>
  isWeekendDate(dateISO) || isDateInRanges(dateISO, SEASONAL_DATE_RANGES) ? room.weekendPrice : room.weekdayPrice;

export interface NightlyBreakdownEntry {
  date: string;
  rate: number;
  isWeekend: boolean;
}

/** One entry per night stayed, from check-in (inclusive) to the night before check-out. */
export const getNightlyBreakdown = (room: RoomCategory, checkIn: string, checkOut: string): NightlyBreakdownEntry[] => {
  if (!checkIn || !checkOut) return [];
  const entries: NightlyBreakdownEntry[] = [];
  const cursor = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  while (cursor < end) {
    const date = cursor.toISOString().slice(0, 10);
    entries.push({ date, rate: getNightlyRate(room, date), isWeekend: isWeekendDate(date) || isDateInRanges(date, SEASONAL_DATE_RANGES) });
    cursor.setDate(cursor.getDate() + 1);
  }
  return entries;
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

export const calculateRoomSubtotal = (room: RoomCategory, checkIn: string, checkOut: string): number =>
  getNightlyBreakdown(room, checkIn, checkOut).reduce((sum, night) => sum + night.rate, 0);
