import React from 'react';
import { ScrollReveal } from './lightswind/scroll-reveal';

const facilities = ['Free WiFi', 'Free parking', 'Room service', 'Private bathroom', 'Private parking', 'Flat-screen TV'];

export const PropertyDetails: React.FC = () => (
  <section id="about" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-24">
    <div className="mx-auto max-w-[1120px]">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#f06c52]">About Wings Resort</p>
        <ScrollReveal
          containerClassName="my-0"
          textClassName="font-headline text-3xl sm:text-4xl"
          align="left"
          variant="primary"
          baseRotation={0}
          threshold={0.15}
        >
          About this property
        </ScrollReveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-2xl border border-[#e8e3dc] bg-white p-6 shadow-sm md:p-8">
          <ScrollReveal containerClassName="my-0 mb-3" textClassName="font-headline text-2xl" align="left" variant="primary" baseRotation={0} threshold={0.15}>
            Comfortable Accommodation
          </ScrollReveal>
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
            Wings Cottage in Ooty offers a villa with free WiFi, private check-in and check-out services, an outdoor fireplace, and room service. Each room includes a private bathroom and TV.
          </ScrollReveal>

          <ScrollReveal containerClassName="my-0 mb-3 mt-7" textClassName="font-headline text-2xl" align="left" variant="primary" baseRotation={0} threshold={0.15}>
            Convenient Facilities
          </ScrollReveal>
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
            Guests can enjoy free on-site private parking, ensuring easy access to the property. The villa provides a relaxing environment with ample amenities for a comfortable stay.
          </ScrollReveal>

          <ScrollReveal containerClassName="my-0 mb-3 mt-7" textClassName="font-headline text-2xl" align="left" variant="primary" baseRotation={0} threshold={0.15}>
            Local Attractions
          </ScrollReveal>
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
            Ooty Bus Station is a 15-minute walk away, while Ooty Railway Station lies 1.2 km from the property. Ooty Lake is 3.3 km distant, Ooty Botanical Gardens are 2.2 km nearby, and Doddabetta Peak is 9 km away.
          </ScrollReveal>
          <p className="mt-5 text-xs italic text-[#6f797a]">Distance in property description is calculated using © OpenStreetMap.</p>
        </article>

        <aside className="rounded-2xl bg-[#004449] p-6 text-white md:p-8">
          <h3 className="font-headline text-2xl">Most popular facilities</h3>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {facilities.map((facility) => <div key={facility} className="rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-xs font-semibold">{facility}</div>)}
          </div>
          <div className="mt-7 border-t border-white/15 pt-6 text-sm leading-7 text-white/80">
            <p><strong className="text-white">Parking:</strong> Free private parking is possible on site; no reservation is needed.</p>
            <p className="mt-3"><strong className="text-white">Internet:</strong> WiFi is available in all areas and is free of charge.</p>
            <p className="mt-3"><strong className="text-white">More:</strong> Outdoor fireplace, room service, invoice provided, allergy-free rooms, and English-speaking staff.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
);
