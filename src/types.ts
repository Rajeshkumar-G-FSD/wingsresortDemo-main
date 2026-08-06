export interface Villa {
  id: string;
  name: string;
  location: string;
  category: 'Oceanfront' | 'Garden' | 'Penthouse' | 'Private Island';
  badge: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  features: string[];
  featured?: boolean;
}

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
