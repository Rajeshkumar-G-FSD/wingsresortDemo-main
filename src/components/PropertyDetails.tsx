import React from 'react';
import BlurText from './BlurText';

const facilities = ['Free WiFi', 'Free parking', 'Room service', 'Private bathroom', 'Private parking', 'Flat-screen TV'];
const surroundings = [
  ['Top attractions', 'Ooty Rose Garden · 2.1 km\nOoty Botanical Gardens · 2.1 km'],
  ['Restaurants & cafés', 'Place To Bee · 5 m\nGreen Shop · 5 m\nAdharsh Bhojnalaya · 150 m'],
  ['Natural beauty', 'Ooty Doddabetta Peak · 7 km\nWellington Lake · 14 km'],
  ['Public transport', 'Ooty Railway Station · 1.2 km\nOoty Bus Station · 1.3 km\nLovedale · 4.4 km'],
  ['Closest airport', 'Coimbatore International Airport · 86 km'],
];

export const PropertyDetails: React.FC = () => (
  <section id="about" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-24">
    <div className="mx-auto max-w-[1120px]">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#f06c52]">About Wings Resort</p>
        <BlurText text="About this property" delay={105} animateBy="words" direction="top" className="font-headline text-3xl text-[#004449] sm:text-4xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-2xl border border-[#e8e3dc] bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-3 font-headline text-2xl text-[#004449]">Comfortable Accommodation</h3>
          <p className="text-sm leading-7 text-[#3f4849]">Wings Cottage in Ooty offers a villa with free WiFi, private check-in and check-out services, an outdoor fireplace, and room service. Each room includes a private bathroom and TV.</p>
          <h3 className="mb-3 mt-7 font-headline text-2xl text-[#004449]">Convenient Facilities</h3>
          <p className="text-sm leading-7 text-[#3f4849]">Guests can enjoy free on-site private parking, ensuring easy access to the property. The villa provides a relaxing environment with ample amenities for a comfortable stay.</p>
          <h3 className="mb-3 mt-7 font-headline text-2xl text-[#004449]">Local Attractions</h3>
          <p className="text-sm leading-7 text-[#3f4849]">Ooty Bus Station is a 15-minute walk away, while Ooty Railway Station lies 1.2 km from the property. Ooty Lake is 3.3 km distant, Ooty Botanical Gardens are 2.2 km nearby, and Doddabetta Peak is 9 km away.</p>
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

      <div className="mt-12 border-t border-[#e8e3dc] pt-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f06c52]">Property surroundings</p>
            <h2 className="mt-2 font-headline text-3xl text-[#004449]">Explore Ooty from Wings Cottage</h2>
          </div>
          <a className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f06c52] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#de573e]" href="https://www.booking.com/hotel/in/wings-cottage.en-gb.html?aid=356980&label=gog235jc-10CAsobEINd2luZ3MtY290dGFnZUgzWANobIgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgCs6bI0wbAAgHSAiRkODI3NTdmYi00ZTY2LTQ4MGItYjk4Mi0yMmI0NDE1NjdkYWPYAgHgAgE&sid=98d06939d61c7c4ad8001cb8fbdd9b78&all_sr_blocks=1533084103_424840966_2_0_0&checkin=2026-08-04&checkout=2026-08-05&dest_id=-2113628&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1533084103_424840966_2_0_0&hpos=1&matching_block_id=1533084103_424840966_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1533084103_424840966_2_0_0__300000&srepoch=1785860920&srpvid=bd9173da77f1009a&type=total&ucfs=1#map_opened-hotel_surroundings" target="_blank" rel="noreferrer">See availability <span className="material-symbols-outlined text-base">map</span></a>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {surroundings.map(([title, details]) => <article key={title} className="rounded-xl bg-[#f5f3f0] p-4"><h3 className="text-xs font-bold uppercase tracking-wide text-[#004449]">{title}</h3><p className="mt-3 whitespace-pre-line text-xs leading-6 text-[#3f4849]">{details}</p></article>)}
        </div>
      </div>
    </div>
  </section>
);
