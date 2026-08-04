import React, { useEffect, useRef } from 'react';
import FoldText from './FoldText';
import BlurText from './BlurText';

interface HeroSectionProps {
  onExploreVillas: () => void;
  onOpenBooking: () => void;
  onSearchQuick?: (checkIn: string, checkOut: string, guests: number, category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreVillas
}) => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = servicesRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: .2 });
    const timer = window.setTimeout(() => observer.observe(element), 1600);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative bg-[#fbf9f6] text-[#1b1c1a] overflow-hidden">
      <section id="hero" className="relative z-10 pt-2 md:pt-3 pb-4 px-5 md:px-12 max-w-[1440px] mx-auto">
        <div className="absolute left-5 top-4 z-30 md:left-12" aria-label="Wings Resort">
          <div className="h-14 w-28 overflow-hidden md:h-16 md:w-32">
            <img src="/images/wings_resort_logo.png" alt="Wings" className="h-full w-full object-cover object-center mix-blend-multiply" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 min-h-[470px] xl:min-h-[510px]">
          
          {/* Left Column Content */}
          <div className="relative z-20 w-full lg:w-[45%] flex flex-col items-start text-left pt-24 md:pt-28 lg:pl-10 xl:pl-12">
            {/* Coral Line-Art Palm Tree Icon */}
            <div className="mb-3 text-[#f06c52]">
              <svg
                className="w-11 h-11 stroke-current fill-none"
                viewBox="0 0 32 32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 11c0-4-3.5-7.5-8-7.5S0 7 0 11c4 0 8 3.5 8 7.5" />
                <path d="M16 11c0-4 3.5-7.5 8-7.5s8 3.5 8 7.5c-4 0-8 3.5-8 7.5" />
                <path d="M16 18a7 7 0 0 0-7-7" />
                <path d="M16 18a7 7 0 0 1 7-7" />
                <path d="M16 11c0-3.5 2-6 5-7.5" />
                <path d="M16 11c0-3.5-2-6-5-7.5" />
                <path d="M16 30c0-6 1-13 0-19" />
                <path d="M14.5 24c1.5 0.5 3 0.5 4.5 0" />
              </svg>
            </div>

            {/* Headline */}
            <h1 className="font-headline mb-4 leading-[1.02] tracking-[-0.04em]">
              <FoldText text="Tropical Soul." splitBy="char" hinge="top" trigger="mount" duration={0.65} stagger={0.045} ease="power3.out" perspective={700} creaseShading={0.55} fontSize="clamp(48px, 5vw, 66px)" fontWeight={700} color="#004449" />
              <br />
              <FoldText text="Beautifully Styled." splitBy="char" hinge="top" trigger="mount" duration={0.65} stagger={0.045} ease="power3.out" perspective={700} creaseShading={0.55} fontSize="clamp(48px, 5vw, 66px)" fontWeight={400} color="#004449" className="italic" />
            </h1>

            {/* Subtext */}
            <BlurText
              text="We create relaxed, refined, and resort-inspired homes that bring vacation feelings to everyday living."
              delay={120}
              animateBy="words"
              direction="top"
              startDelay={1.55}
              onAnimationComplete={() => undefined}
              className="text-[15px] sm:text-base text-[#3f4849] mb-7 max-w-[310px] leading-[1.75] font-body font-medium"
            />

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreVillas}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#f06c52] hover:bg-[#e05b41] text-white text-[11px] font-bold uppercase tracking-[0.13em] transition-all shadow-lg shadow-[#f06c52]/25 transform hover:-translate-y-0.5 group"
              >
                <span>EXPLORE OUR SERVICES</span>
                <span className="material-symbols-outlined ml-3 text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Full-bleed editorial image, shaped by the same sweeping white wave as the reference. */}
          <div className="w-full lg:absolute lg:inset-y-0 lg:right-[-2.9rem] lg:w-[63%] relative mt-2 lg:mt-0">
            <div className="relative w-full aspect-[4/3] lg:h-full lg:aspect-auto overflow-hidden rounded-[34px] lg:rounded-none shadow-xl bg-[#e8e3dc]">
              <img
                src="/images/wings_resort_mainbuilding.png"
                alt="Wings Resort main building"
                className="w-full h-full object-cover object-[55%_58%] transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f6]/35 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 -right-1 h-24 lg:h-32 pointer-events-none z-10">
                <svg
                  className="w-full h-full fill-[#fbf9f6]"
                  viewBox="0 0 1000 120"
                  preserveAspectRatio="none"
                >
                  <path d="M0,120 L0,55 C180,125 420,5 650,67 C820,112 930,39 1000,73 L1000,120 Z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid Section with Overlapping Arched Portal */}
      <section id="services" className="relative z-20 pb-12 pt-2 px-5 md:px-12 max-w-[1440px] mx-auto">
        <div className="relative">

          {/* OUR SERVICES Label with Coral Palm Icon */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 lg:ml-[25%]">
            <span className="text-[#f06c52] text-xs font-bold uppercase tracking-[0.25em]">
              OUR SERVICES
            </span>
            <span className="text-[#f06c52] text-base">🌴</span>
          </div>

          {/* Grid Layout: 4 Service Cards + Overlapping Arch Portal on Desktop */}
          <div ref={servicesRef} className="services-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 lg:pr-60 xl:pr-72">
            
            {/* Card 1: Full Service Interior Design */}
            <div className="bg-[#fbf9f6] rounded-xl p-6 min-h-[258px] flex flex-col items-center text-center border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group">
              {/* Icon: Vase with monstera plant */}
              <div className="w-12 h-12 mb-3 text-[#004449] flex items-center justify-center">
                <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M12 3v6m0 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M7 8c2.5 0 3-3 5-3s2.5 3 5 3" />
                  <path d="M8 12h8l-1 8H9l-1-8z" />
                  <path d="M10 20h4" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#004449] mb-3 leading-snug">
                FULL SERVICE<br />INTERIOR DESIGN
              </h3>
              <p className="text-[11px] text-[#3f4849] mb-5 flex-grow leading-relaxed font-body">
                From concept to completion, we handle every detail to transform your space.
              </p>
              <button className="text-[11px] font-bold uppercase tracking-wider text-[#004449] group-hover:text-[#f06c52] transition-colors inline-flex items-center gap-1.5 mt-auto">
                <span>LEARN MORE</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 2: Room Refresh & Styling */}
            <div className="bg-[#fbf9f6] rounded-xl p-6 min-h-[258px] flex flex-col items-center text-center border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group">
              {/* Icon: Armchair */}
              <div className="w-12 h-12 mb-3 text-[#004449] flex items-center justify-center">
                <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                  <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
                  <path d="M6 17v3M18 17v3" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#004449] mb-3 leading-snug">
                ROOM REFRESH<br />& STYLING
              </h3>
              <p className="text-[11px] text-[#3f4849] mb-5 flex-grow leading-relaxed font-body">
                Elevate your space with curated pieces, color, and coastal layers.
              </p>
              <button className="text-[11px] font-bold uppercase tracking-wider text-[#004449] group-hover:text-[#f06c52] transition-colors inline-flex items-center gap-1.5 mt-auto">
                <span>LEARN MORE</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 3: Vacation Home Design */}
            <div className="bg-[#fbf9f6] rounded-xl p-6 min-h-[258px] flex flex-col items-center text-center border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group">
              {/* Icon: Palm Tree */}
              <div className="w-12 h-12 mb-3 text-[#004449] flex items-center justify-center">
                <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8c2.76 0 5 2.24 5 5" />
                  <path d="M13 8c0-2.76 2.24-5 5-5s5 2.24 5 5c-2.76 0-5 2.24-5 5" />
                  <path d="M12 13a5 5 0 0 0-5-5" />
                  <path d="M12 13a5 5 0 0 1 5-5" />
                  <path d="M12 21V8" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#004449] mb-3 leading-snug">
                VACATION HOME<br />DESIGN
              </h3>
              <p className="text-[11px] text-[#3f4849] mb-5 flex-grow leading-relaxed font-body">
                We design effortless, durable, and beautiful spaces made for getaway living.
              </p>
              <button className="text-[11px] font-bold uppercase tracking-wider text-[#004449] group-hover:text-[#f06c52] transition-colors inline-flex items-center gap-1.5 mt-auto">
                <span>LEARN MORE</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 4: Custom Furniture & Decor */}
            <div className="bg-[#fbf9f6] rounded-xl p-6 min-h-[258px] flex flex-col items-center text-center border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group">
              {/* Icon: Seashell */}
              <div className="w-12 h-12 mb-3 text-[#004449] flex items-center justify-center">
                <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
                  <path d="M12 3v18M7.5 4.5c3 4.5 3 10.5 0 15M16.5 4.5c-3 4.5-3 10.5 0 15" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#004449] mb-3 leading-snug">
                CUSTOM FURNITURE<br />& DECOR
              </h3>
              <p className="text-[11px] text-[#3f4849] mb-5 flex-grow leading-relaxed font-body">
                Bespoke pieces and curated finishing touches to bring vision to life.
              </p>
              <button className="text-[11px] font-bold uppercase tracking-wider text-[#004449] group-hover:text-[#f06c52] transition-colors inline-flex items-center gap-1.5 mt-auto">
                <span>LEARN MORE</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

          </div>

          {/* Arched Window Portal Overlaying the Right Side */}
          <div className="hidden lg:block absolute -top-24 right-0 w-[280px] xl:w-[330px] aspect-[1/1.5] z-30 pointer-events-none">
            {/* Arched Image Container with Dark Teal Outer Ring & Double Outline */}
            <div className="relative w-full h-full p-2.5 rounded-t-[180px] rounded-b-3xl bg-[#004449] shadow-2xl border-2 border-[#004449]">
              <div className="relative w-full h-full rounded-t-[170px] rounded-b-2xl overflow-hidden pointer-events-auto group">
                <img
                  src="/images/wings_resort_a_type_building.png"
                  alt="Wings Resort A-type building"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004449]/20 via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
