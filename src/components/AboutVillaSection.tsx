import React from 'react';
import { ScrollReveal } from './lightswind/scroll-reveal';

export const AboutVillaSection: React.FC = () => (
  <section className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
    <div className="mx-auto max-w-[900px]">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Get to know it</p>
        <ScrollReveal
          containerClassName="my-0"
          textClassName="font-headline text-3xl sm:text-4xl"
          align="center"
          variant="primary"
          baseRotation={0}
          threshold={0.15}
        >
          About The Villa
        </ScrollReveal>
      </div>
      <div className="rounded-2xl border border-[#e8e3dc] bg-white p-6 shadow-sm md:p-8">
        <ScrollReveal
          containerClassName="my-0"
          textClassName="text-sm! font-normal! leading-7! text-[#3f4849]"
          align="left"
          baseRotation={0}
          staggerDelay={0.012}
          duration={0.5}
          blurStrength={3}
          threshold={0.15}
        >
          Welcome to Ooty, the picturesque hill station known for its lush landscapes, tranquil lakes, and refreshing climate. If you're seeking comfortable accommodation that won't stretch your budget, our budget homestay offers the perfect blend of affordability and charm. Situated amidst the verdant hills of Ooty, our homestay provides a cozy retreat for travelers seeking a peaceful escape without breaking the bank.
        </ScrollReveal>

        <p className="mt-5 text-sm font-bold text-[#004449]">Comfortable Accommodation</p>
        <ScrollReveal
          containerClassName="my-0 mt-1"
          textClassName="text-sm! font-normal! leading-7! text-[#3f4849]"
          align="left"
          baseRotation={0}
          staggerDelay={0.012}
          duration={0.5}
          blurStrength={3}
          threshold={0.15}
        >
          Our budget homestay features cozy rooms designed to provide a relaxing and enjoyable stay for budget-conscious travelers. Furnished with comfortable beds, clean linens, and basic amenities, our accommodations ensure a comfortable and restful experience after a day of exploring the beauty of Ooty.
        </ScrollReveal>
      </div>
    </div>
  </section>
);
