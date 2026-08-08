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
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleTabClick = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="villa-amenities" className="bg-[#f5f3f0] px-5 py-16 md:px-12 md:py-20 border-y border-[#e4e2df]/60">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">What's included</p>
          <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">Amenities at Wings Resort 3BHK Ooty</h2>
        </div>

        {/* Quick-jump pill tab bar */}
        <div className="no-scrollbar mb-8 flex justify-start gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm sm:justify-center">
          {AMENITY_GROUPS.map((group) => {
            const isActive = group.id === activeId;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => handleTabClick(group.id)}
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

        {/* Category card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITY_GROUPS.map((group) => (
            <div
              key={group.id}
              ref={(el) => { sectionRefs.current[group.id] = el; }}
              className="hover-lift scroll-mt-28 rounded-3xl border border-[#e8e3dc] bg-white p-6 soft-shadow"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef3f2] text-[#004449]">
                  <span className="material-symbols-outlined text-lg">{group.icon}</span>
                </span>
                <h3 className="font-headline text-lg text-[#004449]">{group.heading}</h3>
                {group.badge && (
                  <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e0a458] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#c17a1f]">
                    {group.badge}
                    <span className="material-symbols-outlined text-xs">info</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 text-xs font-semibold ${
                      item.available ? 'text-[#1b1c1a]' : 'text-[#a7ada9] line-through'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
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
          ))}
        </div>

        <p className="mt-6 text-center text-xs italic text-[#6f797a]">
          Struck-through amenities are not offered at this property.
        </p>
      </div>
    </section>
  );
};
