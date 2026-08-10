export interface Experience {
  id: string;
  title: string;
  iconName: string;
  description: string;
  fullDescription: string;
  duration: string;
  price: string;
  category: 'Wellness' | 'Culinary' | 'Adventure' | 'Sanctuary';
  imageUrl: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatarUrl: string;
  stayDate: string;
  villaStayed: string;
}

export interface JournalPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
}

export interface ServiceOffering {
  id: string;
  icon: 'vase' | 'armchair' | 'palm' | 'shell';
  title: string;
  shortTitle: [string, string];
  tagline: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
}

export interface ResortPin {
  id: string;
  name: string;
  category: 'Villa' | 'Dining' | 'Pool' | 'Wellness' | 'Beach';
  xPercent: number;
  yPercent: number;
  description: string;
  imageUrl: string;
}

export interface BookingDetails {
  villaId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addons: {
    airportTransfer: boolean;
    privateChef: boolean;
    spaPackage: boolean;
    champagneArrival: boolean;
  };
  guestName: string;
  guestEmail: string;
  specialRequests: string;
}

export interface RoomCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  roomCount: number;
  maxAdults: number;
  extraBedAllowed: boolean;
  sizeSqft: number;
  bedType: string;
  bathrooms: number;
  weekdayPrice: number;
  weekendPrice: number;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  badge: string;
}

/** A single physical room within a category, e.g. "Room 1" inside 3BHK Villa, or "Room 204" inside 2BHK Villa. */
export interface RoomUnit {
  id: string;
  label: string;
  /** Overrides the category's default `maxAdults` when this specific room sleeps a different number of guests. */
  maxAdults?: number;
  /** Overrides the category's default `bedType` for this specific room. */
  bedType?: string;
  /** Short tag shown next to the room, e.g. "Family Room", "Double Occupancy". */
  note?: string;
}

/** An admin-created block that takes a specific room unit out of availability for a date range (maintenance, owner use, etc). */
export interface RoomBlock {
  id: string;
  roomId: string;
  roomName: string;
  unitId: string;
  unitLabel: string;
  /** Inclusive ISO date of the first blocked night. */
  startDate: string;
  /** Inclusive ISO date of the last blocked night. */
  endDate: string;
  reason: string;
  createdAt: number;
}

export type NewRoomBlockInput = Omit<RoomBlock, 'id' | 'createdAt'>;

/** Admin-editable price override for a room category, persisted separately from the code defaults in roomsData.ts. */
export interface RoomPricingOverride {
  weekdayPrice: number;
  weekendPrice: number;
  updatedAt: number;
}

export type PaymentPlan = 'full' | '40percent' | 'custom';

export type BookingMode = 'pay_at_resort' | 'pay_now';

export type BookingStatus = 'Pending Payment' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';

export interface NearbyAttraction {
  id: string;
  name: string;
  distanceKm: number;
  walkingTime?: string;
  category: string;
  icon: string;
  image?: string;
}

export interface BookingRecord {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  quantity: number;
  /** Labels of the specific rooms reserved, e.g. ["Room 201", "Room 205 (Family Room)"]. Empty for bookings made before per-room selection existed. */
  units: string[];
  adults: number;
  children: number;
  extraBeds: number;
  campfire: boolean;
  roomSubtotal: number;
  extraBedTotal: number;
  campfireTotal: number;
  total: number;
  bookingMode: BookingMode;
  paymentPlan: PaymentPlan;
  intendedAmount: number;
  transactionId: string;
  amountPayingNow: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  specialRequests: string;
  status: BookingStatus;
  createdAt: number;
}

export type NewBookingInput = Omit<BookingRecord, 'id' | 'createdAt' | 'status'>;
