import React from 'react';
import SplitText from './SplitText';
import BlurText from './BlurText';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-20 px-5 md:px-12 bg-[#fbf9f6] relative">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-14">
        {/* Property Photo Container with Organic Crop */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full max-w-[390px] mx-auto aspect-[.82/1] rounded-t-[190px] overflow-hidden soft-shadow border-4 border-white">
            <img
              src="/images/wings_resort_a_type_building.png"
              alt="Wings Resort A-Type wooden house, front view"
              className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#a93721] text-xs font-semibold uppercase tracking-[0.2em]">
              Our Story
            </span>
            <span className="material-symbols-outlined text-[#a93721] text-lg">local_florist</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl text-[#004449] mb-4 leading-tight font-medium">
            <SplitText
              text="Thoughtful Design."
              tag="span"
              splitType="words"
              delay={40}
              duration={0.9}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-80px"
              textAlign="left"
            />
            <br />
            <SplitText
              text="Meaningful Spaces."
              tag="span"
              splitType="words"
              delay={40}
              duration={0.9}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-80px"
              textAlign="left"
              className="italic font-normal"
            />
          </h2>

          <BlurText
            text="Wings Resort was founded on a love for travel, nature, and the feeling of homes that breathe easy. We believe good design should look beautiful and feel like you."
            animateBy="words"
            direction="top"
            delay={20}
            className="text-sm text-[#3f4849] mb-5 leading-relaxed font-body max-w-md"
          />

          <div className="mt-2 border-l-2 border-[#a93721] pl-6 py-2">
            <p className="font-headline text-lg text-[#004449] italic mb-1">
              ~ Y Hassan
            </p>
            <p className="text-xs font-semibold text-[#3f4849] uppercase tracking-wider">
              Founder
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Right Arch Image (clipped to section bounds so it can't cause horizontal overflow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-96 rounded-l-[120px] overflow-hidden opacity-20 lg:opacity-80 border-l-8 border-[#efeeeb]">
          <img
            src="/images/wings_resort_mainbuilding.png"
            alt="Wings Resort main building, surrounded by garden greenery"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
