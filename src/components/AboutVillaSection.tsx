import React from 'react';
import SplitText from './SplitText';

export const AboutVillaSection: React.FC = () => (
  <section className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
    <div className="mx-auto max-w-[900px]">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Get to know it</p>
        <SplitText
          text="About The Villa"
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
      <div className="rounded-2xl border border-[#e8e3dc] bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm leading-7 text-[#3f4849]">
          Welcome to Ooty, the picturesque hill station known for its lush landscapes, tranquil lakes, and
          refreshing climate. If you're seeking comfortable accommodation that won't stretch your budget, our
          budget homestay offers the perfect blend of affordability and charm. Situated amidst the verdant hills
          of Ooty, our homestay provides a cozy retreat for travelers seeking a peaceful escape without breaking
          the bank.
        </p>
        <p className="mt-4 text-sm leading-7 text-[#3f4849]">
          <strong className="text-[#004449]">Comfortable Accommodation:</strong> Our budget homestay features
          cozy rooms designed to provide a relaxing and enjoyable stay for budget-conscious travelers. Furnished
          with comfortable beds, clean linens, and basic amenities, our accommodations ensure a comfortable and
          restful experience after a day of exploring the beauty of Ooty.
        </p>
      </div>
    </div>
  </section>
);
