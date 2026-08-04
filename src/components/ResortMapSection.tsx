import React, { useState } from 'react';
import { RESORT_PINS } from '../data/resortData';
import { ResortPin } from '../types';

export const ResortMapSection: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<ResortPin>(RESORT_PINS[0]);

  return (
    <section id="map" className="py-24 md:py-32 bg-[#fbf9f6] px-5 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#a93721]">explore</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a93721]">
              Sanctuary Map
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#004449] font-medium">
            Explore the Resort Estate
          </h2>
          <p className="text-sm text-[#3f4849] mt-3 max-w-xl mx-auto">
            Click on any hotspot location to preview private villas, dining decks, infinity pools, and secluded beach coves.
          </p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-[#f5f3f0] rounded-3xl p-6 sm:p-8 border border-[#e4e2df] soft-shadow">
          {/* Interactive Map Visual (Left 2 Columns) */}
          <div className="lg:col-span-2 relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-inner border border-white">
            {/* Map background image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg"
              alt="Resort Aerial Map"
              className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-[#004449]/20" />

            {/* Hotspot Pins */}
            {RESORT_PINS.map((pin) => {
              const isSelected = selectedPin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(pin)}
                  style={{ top: `${pin.yPercent}%`, left: `${pin.xPercent}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                    isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                  }`}
                  aria-label={pin.name}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-[#a93721]' : 'bg-[#8fd2d8]'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs font-bold shadow-md border-2 border-white ${
                        isSelected ? 'bg-[#a93721] text-white' : 'bg-[#004449] text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {pin.category === 'Pool'
                          ? 'pool'
                          : pin.category === 'Villa'
                          ? 'villa'
                          : pin.category === 'Wellness'
                          ? 'spa'
                          : pin.category === 'Dining'
                          ? 'restaurant'
                          : 'beach_access'}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pin Preview Details Box (Right Column) */}
          <div className="lg:col-span-1 bg-[#fbf9f6] rounded-2xl p-6 sm:p-8 border border-[#e4e2df] flex flex-col justify-between h-full min-h-[320px]">
            <div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 shadow-md">
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#004449] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {selectedPin.category}
                </div>
              </div>

              <h3 className="font-headline text-2xl text-[#004449] font-semibold mb-2">
                {selectedPin.name}
              </h3>

              <p className="text-xs text-[#3f4849] leading-relaxed mb-6">
                {selectedPin.description}
              </p>
            </div>

            <a
              href="#villas"
              className="w-full py-3 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider text-center shadow hover:opacity-90 transition-opacity block"
            >
              Explore Near This Spot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
