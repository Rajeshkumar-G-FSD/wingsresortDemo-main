import React, { useState } from 'react';
import { getDirectionsUrl } from '../utils/directions';
import SplitText from './SplitText';
import BlurText from './BlurText';

interface NearbyItem {
  name: string;
  distance: string;
  meta?: string;
}

interface NearbyGroup {
  heading: string;
  items: NearbyItem[];
}

interface NearbyTab {
  id: string;
  label: string;
  icon: string;
  groups: NearbyGroup[];
}

const TABS: NearbyTab[] = [
  {
    id: 'food',
    label: 'Food & Shopping',
    icon: 'restaurant',
    groups: [
      {
        heading: 'Restaurants',
        items: [
          { name: 'Savoy, Ooty - IHCL SeleQtions', distance: '7 min walk' },
          { name: 'The Periodic Table', distance: '860 m walk' },
          { name: "King's Cliff", distance: '1.7 km' },
          { name: 'The Paradise Pure Veg Restaurant', distance: '1.9 km' },
          { name: "Willy's Coffee Pub", distance: '2 km' },
          { name: 'Club Mahindra Resort - Derby Green, Ooty, Tamil Nadu', distance: '2.1 km' },
          { name: 'Angaara Restaurant Ooty', distance: '2.3 km' },
          { name: 'Bollywood Adda', distance: '2.4 km' },
          { name: 'Jade Garden Chinese Speciality Restaurant', distance: '2.9 km' },
          { name: 'Sherlock', distance: '4.1 km' },
        ],
      },
      {
        heading: 'Shopping',
        items: [
          { name: 'Main Bazaar', distance: '1.6 km' },
          { name: 'Tibetan Market', distance: '1.9 km' },
          { name: 'The Municipal Market', distance: '1.9 km' },
        ],
      },
    ],
  },
  {
    id: 'transport',
    label: 'Transportation',
    icon: 'directions_bus',
    groups: [
      {
        heading: 'Bus Terminals',
        items: [
          { name: 'Ooty Bus Station', distance: '1.5 km' },
          { name: 'ATC Bus Stand', distance: '1.9 km' },
        ],
      },
      {
        heading: 'Nearby Transit Points',
        items: [
          { name: 'Udhagamandalam Railway Station', distance: '1.3 km', meta: 'Railway' },
          { name: 'Ooty Bus Station', distance: '1.5 km', meta: 'Bus Terminal' },
          { name: 'Ooty Taxi Stand', distance: '1.7 km', meta: 'Transit Point' },
          { name: 'ATC Bus Stand', distance: '1.9 km', meta: 'Bus Terminal' },
        ],
      },
    ],
  },
];

export const NearbyExploreSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const currentTab = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];

  return (
    <section id="explore" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Around the resort</p>
          <SplitText
            text="Know Your Stay, Inside Out"
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
          <BlurText
            text="Everything a guest needs to plan their trip — dining, shopping, and how to get around Ooty from Wings Resort."
            animateBy="words"
            direction="top"
            delay={30}
            className="mx-auto mt-3 max-w-xl justify-center text-sm leading-relaxed text-[#3f4849]"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e8e3dc] bg-white shadow-sm">
          {/* Tab bar */}
          <div className="no-scrollbar flex overflow-x-auto border-b border-[#e8e3dc]">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={isActive}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-6 py-4 text-sm font-bold transition-colors ${
                    isActive
                      ? 'border-[#004449] text-[#004449]'
                      : 'border-transparent text-[#8a9192] hover:text-[#004449]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="px-5 py-6 sm:px-8">
            {currentTab.groups.map((group) => (
              <div key={group.heading} className="mb-6 last:mb-0">
                <span className="mb-3 inline-block rounded-md bg-[#eef3f2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#004449]">
                  {group.heading}
                </span>
                <div className="divide-y divide-[#e8e3dc]">
                  {group.items.map((item) => {
                    const key = `${currentTab.id}-${group.heading}-${item.name}`;
                    return (
                      <a
                        key={key}
                        href={getDirectionsUrl(item.name)}
                        target="_blank"
                        rel="noreferrer"
                        title={`Get directions from Wings Resort to ${item.name}`}
                        className="flex w-full items-center gap-4 py-3.5 text-left group"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef3f2] text-[#004449] transition-colors group-hover:bg-[#004449] group-hover:text-white">
                          <span className="material-symbols-outlined text-lg">directions</span>
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-[#1b1c1a]">{item.name}</span>
                          {item.meta && <span className="text-[11px] uppercase tracking-wide text-[#8a9192]">{item.meta}</span>}
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-[#3f4849]">{item.distance}</span>
                        <span className="material-symbols-outlined shrink-0 text-lg text-[#f06c52]">open_in_new</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs italic text-[#6f797a]">
          Distances shown are approximate and calculated from Wings Resort 3BHK Ooty. Tap any place to open driving directions from the resort in Google Maps.
        </p>
      </div>
    </section>
  );
};
