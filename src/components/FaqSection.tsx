import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/contactInfo';

const faqs = [
  ['How many types of rooms are available at Wings Resort 3BHK Ooty?', 'Wings Resort 3BHK Ooty offers a spacious 3BHK villa along with our main building suites and A-type villas. Check each room type for detailed features, images, and the latest availability — every room is designed to make your stay unforgettable.'],
  ['How far is Wings Resort 3BHK Ooty from the city center?', 'Wings Resort 3BHK Ooty is just 0.27 km from Ooty city center, putting the Main Bazaar, restaurants, and local attractions within easy walking distance.'],
  ['What are the customer ratings for Wings Resort 3BHK Ooty?', 'We’re a newly listed property and are actively gathering guest reviews. Check MakeMyTrip and our other booking platforms for the latest overall rating and to browse photos shared by verified guests.'],
  ['What are the Check-In and Check-Out times at Wings Resort 3BHK Ooty?', `Check-in is at ${CONTACT_INFO.checkIn} and check-out is at ${CONTACT_INFO.checkOut}. Early check-ins and late check-outs are subject to availability — just let our team know in advance.`],
  ['What amenities and facilities are included in the stay?', 'Every villa includes free WiFi, free private parking, room service, a private bathroom, a flat-screen TV, and an outdoor fireplace. Invoices are provided on request and our staff are English-speaking.'],
  ['Is parking available on site?', 'Yes, free private parking is available on site and no advance reservation is needed.'],
  ['How close are Ooty Lake and other key landmarks?', 'Ooty Lake is about 2.5 km away, Government Botanical Garden is 2.2 km, and Doddabetta Peak is around 9 km — see the full Key Landmarks, Food & Shopping, and Transportation guide above for exact distances.'],
  ['Is Wings Resort 3BHK Ooty suitable for families and large groups?', 'Yes. The 3BHK villa and multi-bedroom houses are ideal for families, groups, and celebrations, with shared living spaces plus private bedrooms and bathrooms for everyone.'],
  ['How do I book or check availability?', 'Use the Check Availability button on this page to pick your dates and guest count, or reach out via our consultation form and our team will confirm your booking directly.'],
  ['What is the cancellation policy?', 'Cancellation terms depend on the rate plan selected at booking. Please review the policy shown at checkout, or contact our team before booking if you need flexible dates.'],
];

export const FaqSection: React.FC = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Frequently asked questions</p>
          <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">Everything you need to know.</h2>
        </div>
        <div className="border-y border-[#e8e3dc]">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="border-b border-[#e8e3dc] last:border-0">
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold text-[#004449]"
                aria-expanded={open === index}
              >
                {question}
                <span className="text-xl font-normal text-[#f06c52]">{open === index ? '−' : '+'}</span>
              </button>
              {open === index && <p className="max-w-2xl pb-5 text-sm leading-relaxed text-[#3f4849]">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
