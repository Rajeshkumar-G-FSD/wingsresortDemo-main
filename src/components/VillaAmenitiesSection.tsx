import React, { useRef, useState } from 'react';

interface AmenityItem {
  icon: string;
  label: string;
  available: boolean;
}

interface AmenityGroup {
  id: string;
  tabLabel: string;
  heading: string;
  badge?: string;
  items: AmenityItem[];
}

const AMENITY_GROUPS: AmenityGroup[] = [
  {
    id: 'couples',
    tabLabel: 'Amenities for Couples',
    heading: 'Amenities for Couples',
    items: [
      { icon: 'kitchen', label: 'Kitchenette', available: true },
      { icon: 'bolt', label: 'Power Backup', available: true },
    ],
  },
  {
    id: 'basic-facilities',
    tabLabel: 'Basic Facilities',
    heading: 'Basic Facilities',
    items: [
      { icon: 'kitchen', label: 'Kitchenette', available: true },
      { icon: 'bolt', label: 'Power Backup', available: true },
      { icon: 'room_service', label: 'Room Service', available: true },
      { icon: 'wifi', label: 'Wi-Fi', available: false },
      { icon: 'cleaning_services', label: 'Housekeeping', available: false },
    ],
  },
  {
    id: 'general-services',
    tabLabel: 'General Services',
    heading: 'General Services',
    items: [
      { icon: 'medical_services', label: 'Doctor on Call', available: true },
      { icon: 'luggage', label: 'Luggage Assistance', available: false },
      { icon: 'support_agent', label: 'Caretaker', available: false },
    ],
  },
  {
    id: 'parking',
    tabLabel: 'Parking',
    heading: 'Parking',
    badge: 'Shared',
    items: [{ icon: 'local_parking', label: 'Onsite Parking is available', available: true }],
  },
  {
    id: 'room-amenities',
    tabLabel: 'Room Amenities',
    heading: 'Room Amenities',
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
    items: [
      { icon: 'videocam', label: 'CCTV', available: true },
      { icon: 'fire_extinguisher', label: 'Fire Extinguishers', available: false },
    ],
  },
  {
    id: 'bathroom',
    tabLabel: 'Bathroom',
    heading: 'Bathroom',
    items: [
      { icon: 'water_heater', label: 'Geyser/Water Heater', available: true },
      { icon: 'wc', label: 'Western Toilet Seat', available: true },
    ],
  },
];

export const VillaAmenitiesSection: React.FC = () => {
  const [activeId, setActiveId] = useState(AMENITY_GROUPS[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleTabClick = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="villa-amenities" className="bg-[#f5f3f0] px-5 py-16 md:px-12 md:py-20 border-y border-[#e4e2df]/60">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">What's included</p>
          <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">Amenities at Wings Resort 3BHK Ooty</h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e8e3dc] bg-white shadow-sm">
          {/* Quick-jump tab bar */}
          <div className="no-scrollbar flex overflow-x-auto border-b border-[#e8e3dc]">
            {AMENITY_GROUPS.map((group) => {
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleTabClick(group.id)}
                  aria-current={isActive}
                  className={`shrink-0 whitespace-nowrap border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-wide transition-colors ${
                    isActive ? 'border-[#004449] text-[#004449]' : 'border-transparent text-[#8a9192] hover:text-[#004449]'
                  }`}
                >
                  {group.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Stacked amenity groups */}
          <div className="divide-y divide-[#e8e3dc] px-5 py-2 sm:px-8">
            {AMENITY_GROUPS.map((group) => (
              <div
                key={group.id}
                ref={(el) => { sectionRefs.current[group.id] = el; }}
                className="scroll-mt-24 py-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-headline text-lg text-[#004449]">{group.heading}</h3>
                  {group.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#e0a458] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#c17a1f]">
                      {group.badge}
                      <span className="material-symbols-outlined text-xs">info</span>
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2.5 text-sm ${
                        item.available ? 'text-[#1b1c1a]' : 'text-[#a7ada9] line-through'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-lg ${item.available ? 'text-[#004449]' : 'text-[#c9c2b7]'}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-center text-xs italic text-[#6f797a]">
          Struck-through amenities are not offered at this property.
        </p>
      </div>
    </section>
  );
};
