import React, { useState } from 'react';

const faqs = [
  ['What types of properties do you offer?', 'We offer thoughtfully designed resort residences, including our main building suites and distinctive A-type villas.'],
  ['Can I schedule a property viewing?', 'Yes. Use the consultation button and our team will arrange a convenient viewing time for you.'],
  ['Are the homes furnished?', 'Each property is curated with a complete tropical-luxury interior package and premium finishes.'],
  ['How can I get more details?', 'Contact us through the form below or book a consultation to receive the complete property information.'],
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
