import React, { useState } from 'react';
import SplitText from './SplitText';

interface AmenityItem {
  icon: string;
  label: string;
  available: boolean;
}

interface AmenityGroup {
  id: string;
  tabLabel: string;
  heading: string;
  icon: string;
  badge?: string;
  items: AmenityItem[];
}

const AMENITY_GROUPS: AmenityGroup[] = [
  {
    id: 'couples',
    tabLabel: 'Amenities for Couples',
    heading: 'Amenities for Couples',
    icon: 'favorite',
    items: [
      { icon: 'kitchen', label: 'Kitchenette', available: true },
      { icon: 'bolt', label: 'Power Backup', available: true },
    ],
  },
  {
    id: 'basic-facilities',
    tabLabel: 'Basic Facilities',
    heading: 'Basic Facilities',
    icon: 'apartment',
    items: [
      { icon: 'kitchen', label: 'Kitchenette', available: true },
      { icon: 'bolt', label: 'Power Backup', available: true },
      { icon: 'room_service', label: 'Room Service', available: true },
      { icon: 'wifi', label: 'Wi-Fi', available: true },
      { icon: 'cleaning_services', label: 'Housekeeping', available: true },
    ],
  },
  {
    id: 'general-services',
    tabLabel: 'General Services',
    heading: 'General Services',
    icon: 'support_agent',
    items: [
      { icon: 'medical_services', label: 'Doctor on Call', available: true },
      { icon: 'luggage', label: 'Luggage Assistance', available: true },
      { icon: 'support_agent', label: 'Caretaker', available: true },
    ],
  },
  {
    id: 'parking',
    tabLabel: 'Parking',
    heading: 'Parking',
    icon: 'local_parking',
    badge: 'Shared',
    items: [{ icon: 'local_parking', label: 'Onsite Parking is available', available: true }],
  },
  {
    id: 'room-amenities',
    tabLabel: 'Room Amenities',
    heading: 'Room Amenities',
    icon: 'bed',
    items: [
      { icon: 'desk', label: 'Work Desk', available: true },
      { icon: 'chair', label: 'Seating Area', available: true },
      { icon: 'power', label: 'Charging Points', available: true },
      { icon: 'water_drop', label: 'Hot & Cold Water', available: true },
    ],
  },
  {
    id: 'safety-security',
    tabLabel: 'Safety and Security',
    heading: 'Safety and Security',
    icon: 'shield',
    items: [
      { icon: 'videocam', label: 'CCTV', available: true },
      { icon: 'fire_extinguisher', label: 'Fire Extinguishers', available: false },
    ],
  },
  {
    id: 'bathroom',
    tabLabel: 'Bathroom',
    heading: 'Bathroom',
    icon: 'bathtub',
    items: [
      { icon: 'water_heater', label: 'Geyser/Water Heater', available: true },
      { icon: 'wc', label: 'Western Toilet Seat', available: true },
    ],
  },
];

export const VillaAmenitiesSection: React.FC = () => {
  const [activeId, setActiveId] = useState(AMENITY_GROUPS[0].id);
  const activeGroup = AMENITY_GROUPS.find((group) => group.id === activeId) ?? AMENITY_GROUPS[0];

  return (
    <section id="villa-amenities" className="bg-[#f5f3f0] px-5 py-16 md:px-12 md:py-20 border-y border-[#e4e2df]/60">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">What's included</p>
          <SplitText
            text="Amenities at Wings Resort 3BHK Ooty"
            tag="h2"
            splitType="words"
            delay={40}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.15}
            rootMargin="-80px"
            textAlign="center"
            className="font-headline text-3xl text-[#004449] sm:text-4xl"
          />
        </div>

        {/* Tab bar */}
        <div className="no-scrollbar mb-8 flex justify-start gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm sm:justify-center">
          {AMENITY_GROUPS.map((group) => {
            const isActive = group.id === activeId;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveId(group.id)}
                aria-current={isActive}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive ? 'bg-[#004449] text-white shadow' : 'text-[#6f797a] hover:bg-[#eef3f2] hover:text-[#004449]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{group.icon}</span>
                {group.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active category panel — swaps in place, no repeated content */}
        <div key={activeGroup.id} className="tab-panel-fade mx-auto max-w-[720px] rounded-3xl border border-[#e8e3dc] bg-white p-6 soft-shadow sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef3f2] text-[#004449]">
              <span className="material-symbols-outlined text-xl">{activeGroup.icon}</span>
            </span>
            <h3 className="font-headline text-xl text-[#004449]">{activeGroup.heading}</h3>
            {activeGroup.badge && (
              <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e0a458] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#c17a1f]">
                {activeGroup.badge}
                <span className="material-symbols-outlined text-xs">info</span>
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
            {activeGroup.items.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 text-xs font-semibold ${
                  item.available ? 'text-[#1b1c1a]' : 'text-[#a7ada9] line-through'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    item.available ? 'bg-[#fdf1ee] text-[#f06c52]' : 'bg-[#f5f3f0] text-[#c9c2b7]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs italic text-[#6f797a]">
          Struck-through amenities are not offered at this property.
        </p>
      </div>
    </section>
  );
};
