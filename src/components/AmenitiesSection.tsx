import React from 'react';

export const AmenitiesSection: React.FC = () => {
  const chooseReasons = [
    {
      icon: 'content_cut',
      title: 'PERSONALIZED APPROACH',
      description: 'We take time to get to know your lifestyle and personal preferences.'
    },
    {
      icon: 'eco',
      title: 'CREATIVE EXPERTISE',
      description: 'Timeless design with a refined tropical point of view.'
    },
    {
      icon: 'verified',
      title: 'QUALITY FIRST',
      description: 'We source the best natural materials for lasting beauty.'
    },
    {
      icon: 'spa',
      title: 'STRESS-FREE PROCESS',
      description: 'Relax while we bring your vision seamlessly to life.'
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'DISCOVER',
      description: 'We learn about you, your style, and your dream vacation.'
    },
    {
      number: '2',
      title: 'DESIGN',
      description: 'We create a custom concept tailored specifically to your stay.'
    },
    {
      number: '3',
      title: 'REFINE',
      description: 'We perfect every detail together to guarantee perfection.'
    },
    {
      number: '4',
      title: 'BRING TO LIFE',
      description: 'We style, prepare, and make it beautifully come together.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f5f3f0] px-5 md:px-12 border-y border-[#e4e2df]/60">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 divide-y lg:divide-y-0 lg:divide-x divide-[#e4e2df]">
        {/* Left Column: Why Clients Choose */}
        <div className="pr-0 lg:pr-10 pt-4 lg:pt-0">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a93721]">
              Why Guests Choose Wings Resort
            </span>
            <span className="material-symbols-outlined text-[#a93721] text-sm">filter_vintage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {chooseReasons.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-full bg-[#004449]/10 flex items-center justify-center mb-4 text-[#004449]">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#004449] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#3f4849] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Our Process */}
        <div className="pl-0 lg:pl-10 pt-10 lg:pt-0">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a93721]">
              Our Process
            </span>
            <span className="material-symbols-outlined text-[#a93721] text-sm">auto_awesome</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-14 h-14 rounded-full bg-[#004449] text-white text-xl font-bold font-headline flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#004449] mb-2">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#3f4849] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
