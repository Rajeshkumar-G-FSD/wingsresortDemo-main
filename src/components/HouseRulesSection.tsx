import React, { useRef, useState } from 'react';

interface RuleGroup {
  id: string;
  tabLabel: string;
  heading: string;
  icon: string;
  rules: string[];
}

const RULE_GROUPS: RuleGroup[] = [
  {
    id: 'must-read-rules',
    tabLabel: 'Must Read Rules',
    heading: 'Must Read Rules',
    icon: 'menu_book',
    rules: [
      'Primary Guest should be atleast 18 years of age.',
      'Groups with only male guests are allowed at the property',
      'Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)',
      'Pets are not allowed',
    ],
  },
  {
    id: 'guest-profile',
    tabLabel: 'Guest Profile',
    heading: 'Guest Profile',
    icon: 'group',
    rules: ['Unmarried couples allowed', 'Groups with only male guests are allowed at the property'],
  },
  {
    id: 'guest-profile-hourly',
    tabLabel: 'Guest Profile (Hourly)',
    heading: 'Guest Profile (Hourly)',
    icon: 'schedule',
    rules: ['Unmarried couples are not allowed in hourly stay rooms'],
  },
  {
    id: 'id-proof',
    tabLabel: 'ID Proof Related',
    heading: 'ID Proof Related',
    icon: 'badge',
    rules: ['Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)', 'Local ids are allowed'],
  },
  {
    id: 'smoking-alcohol',
    tabLabel: 'Smoking/Alcohol Rules',
    heading: 'Smoking/Alcohol consumption Rules',
    icon: 'smoking_rooms',
    rules: ['Smoking within the premises is allowed'],
  },
  {
    id: 'accessibility',
    tabLabel: 'Property Accessibility',
    heading: 'Property Accessibility',
    icon: 'accessible',
    rules: ['This property is not accessible to guests who use a wheelchair. Please make arrangements accordingly.'],
  },
  {
    id: 'pets',
    tabLabel: "Pet(s) Related",
    heading: "Pet(s) Related",
    icon: 'pets',
    rules: ['Pets are not allowed', 'There are no pets living on the property'],
  },
  {
    id: 'keys',
    tabLabel: 'Finding Keys',
    heading: 'Finding keys to the property',
    icon: 'key',
    rules: ['Host Greets You & Helps You Check-in', 'Caretaker Greets You & Helps You Check-in', 'Self check-in via Smart Door is not available'],
  },
  {
    id: 'other-rules',
    tabLabel: 'Other Rules',
    heading: 'Other Rules',
    icon: 'gavel',
    rules: ['Does not allow private parties or events', 'Guests are requested not to invite outside visitors in the room during their stay.'],
  },
];

export const HouseRulesSection: React.FC = () => {
  const [activeId, setActiveId] = useState(RULE_GROUPS[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleTabClick = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="house-rules" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Before you book</p>
          <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">House Rules &amp; Information</h2>
        </div>

        {/* Quick-jump pill tab bar */}
        <div className="no-scrollbar mb-8 flex justify-start gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm sm:justify-center">
          {RULE_GROUPS.map((group) => {
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

        {/* Rule card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RULE_GROUPS.map((group) => (
            <div
              key={group.id}
              ref={(el) => { sectionRefs.current[group.id] = el; }}
              className="hover-lift scroll-mt-28 rounded-3xl border border-[#e8e3dc] bg-white p-6 soft-shadow"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef3f2] text-[#004449]">
                  <span className="material-symbols-outlined text-lg">{group.icon}</span>
                </span>
                <h3 className="font-headline text-lg text-[#004449]">{group.heading}</h3>
              </div>
              <ul className="space-y-2.5">
                {group.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed text-[#3f4849]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f06c52]" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
