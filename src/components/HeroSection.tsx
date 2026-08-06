import React, { useEffect, useRef, useState } from 'react';
import FoldText from './FoldText';
import BlurText from './BlurText';
import { ServiceIcon } from './ServiceIcon';
import { SERVICES } from '../data/resortData';

const HERO_SLIDES = [
  { src: '/images/wings_resort_mainbuilding.png', alt: 'Wings Resort main building' },
  { src: '/images/wings_resort_a_house_fontview.png', alt: 'A-type house, front view' },
  { src: '/images/wings_resort_five_bh_house.jpg', alt: 'Five bedroom house' },
  { src: '/images/wings_resort_wooden_house.jpg', alt: 'Wooden house' },
  { src: '/images/wings_resort_rooms_frontview.png', alt: 'Guest rooms, front view' },
  { src: '/images/wings_resort_wood_house_rooms_fontview.png', alt: 'Wood house rooms, front view' },
  { src: '/images/wings_resort_5bh_rooms_frontview.png', alt: '5BH rooms, front view' },
  { src: '/images/wings_resort_a_type_house.jpg', alt: 'A-type house' },
  { src: '/images/wings_resort_parking.png', alt: 'Resort parking' },
];

const ARCH_SLIDES = [
  { src: '/images/wings_resort_a_type_building.png', alt: 'Wings Resort A-type building' },
  { src: '/images/wings_resort_a_house_fontview.png', alt: 'A-type house, front view' },
  { src: '/images/wings_resort_wooden_house.jpg', alt: 'Wooden house' },
];

const SLIDE_INTERVAL = 3000;

interface HeroSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectService }) => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const [archIndex, setArchIndex] = useState(0);

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

  useEffect(() => {
    if (isHovered) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(id);
  }, [isHovered]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setArchIndex((i) => (i + 1) % ARCH_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const goToSlide = (i: number) => setSlideIndex((i + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => goToSlide(slideIndex + 1);
  const prevSlide = () => goToSlide(slideIndex - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? nextSlide() : prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative bg-[#fbf9f6] text-[#1b1c1a] overflow-hidden">
      <section
        id="hero"
        className="hero-slideshow relative z-10 overflow-hidden min-h-[600px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[760px] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-bleed background slideshow */}
        {HERO_SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide absolute inset-0 w-full h-full object-cover object-[55%_45%] ${
              i === slideIndex ? `opacity-100 z-[1] hero-slide-active ${i % 2 === 1 ? 'hero-kenburns-alt' : ''}` : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Legibility scrim: strong on the left where the text sits, easing off to the right */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-[#00201f]/85 via-[#00201f]/45 to-[#00201f]/10 lg:from-[#00201f]/88 lg:via-[#00201f]/40 lg:to-transparent" />
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[#00201f]/55 via-transparent to-transparent" />

        {/* Prev / Next arrows */}
        <button
          aria-label="Previous slide"
          onClick={prevSlide}
          className="hero-arrow absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <button
          aria-label="Next slide"
          onClick={nextSlide}
          className="hero-arrow absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>

        {/* Dot navigation */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`hero-dot ${i === slideIndex ? 'hero-dot-active' : ''}`}
            />
          ))}
        </div>

        {/* Bottom sweeping curve, matching the cream page background */}
        <div className="absolute -bottom-1 -left-1 -right-1 h-16 sm:h-20 lg:h-28 pointer-events-none z-10">
          <svg
            className="w-full h-full fill-[#fbf9f6]"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
          >
            <path d="M0,120 L0,55 C180,125 420,5 650,67 C820,112 930,39 1000,73 L1000,120 Z" />
          </svg>
        </div>

        {/* Content, layered above the background */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 md:px-12 pt-20 pb-16 sm:pb-20">
          <div className="w-full lg:w-[52%] xl:w-[46%] flex flex-col items-start text-left lg:pl-6 xl:pl-10">
            {/* Headline */}
            <h1 className="font-headline mb-4 leading-[1.02] tracking-[-0.04em]">
              <FoldText text="Tropical Soul." splitBy="char" hinge="top" trigger="mount" duration={0.65} stagger={0.045} ease="power3.out" perspective={700} creaseShading={0.55} fontSize="clamp(48px, 5vw, 66px)" fontWeight={700} color="#fbf9f6" />
              <br />
              <FoldText text="Beautifully Styled." splitBy="char" hinge="top" trigger="mount" duration={0.65} stagger={0.045} ease="power3.out" perspective={700} creaseShading={0.55} fontSize="clamp(48px, 5vw, 66px)" fontWeight={400} color="#fbf9f6" className="italic" />
            </h1>

            {/* Subtext */}
            <BlurText
              text="We create relaxed, refined, and resort-inspired homes that bring vacation feelings to everyday living."
              delay={120}
              animateBy="words"
              direction="top"
              startDelay={1.55}
              onAnimationComplete={() => undefined}
              className="text-[15px] sm:text-base text-white/85 mb-1 max-w-[340px] leading-[1.75] font-body font-medium"
            />
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

          {/* Arched slideshow badge — mobile-only, sits in the normal flow above the service cards */}
          <div className="mb-10 flex justify-center lg:hidden">
            <div className="relative w-40 sm:w-48 aspect-[1/1.3]">
              <div className="relative w-full h-full p-2 rounded-t-[110px] rounded-b-2xl bg-[#004449] shadow-2xl border-2 border-[#004449]">
                <div className="relative w-full h-full rounded-t-[102px] rounded-b-xl overflow-hidden">
                  {ARCH_SLIDES.map((slide, i) => (
                    <img
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      className={`hero-slide absolute inset-0 w-full h-full object-cover ${
                        i === archIndex ? `opacity-100 z-[1] hero-slide-active ${i % 2 === 1 ? 'hero-kenburns-alt' : ''}` : 'opacity-0 z-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004449]/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#f06c52] text-white text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-md">
                Our Signature Stays
              </span>
            </div>
          </div>

          {/* Grid Layout: 4 Service Cards + Overlapping Arch Portal on Desktop */}
          <div ref={servicesRef} className="services-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 lg:pr-60 xl:pr-72">

            {SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="bg-[#fbf9f6] rounded-xl p-6 min-h-[258px] flex flex-col items-center text-center border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 text-[#004449] flex items-center justify-center">
                  <ServiceIcon icon={service.icon} className="w-10 h-10" />
                </div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#004449] mb-3 leading-snug">
                  {service.shortTitle[0]}<br />{service.shortTitle[1]}
                </h3>
                <p className="text-[11px] text-[#3f4849] mb-5 flex-grow leading-relaxed font-body">
                  {service.tagline}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service.id);
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#004449] group-hover:text-[#f06c52] transition-colors inline-flex items-center gap-1.5 mt-auto"
                >
                  <span>LEARN MORE</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            ))}

          </div>

          {/* Arched Window Portal Overlaying the Right Side */}
          <div className="hidden lg:block absolute -top-24 right-0 w-[280px] xl:w-[330px] aspect-[1/1.5] z-30 pointer-events-none">
            {/* Arched Image Container with Dark Teal Outer Ring & Double Outline */}
            <div className="relative w-full h-full p-2.5 rounded-t-[180px] rounded-b-3xl bg-[#004449] shadow-2xl border-2 border-[#004449]">
              <div className="relative w-full h-full rounded-t-[170px] rounded-b-2xl overflow-hidden pointer-events-auto">
                {ARCH_SLIDES.map((slide, i) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={`hero-slide absolute inset-0 w-full h-full object-cover ${
                      i === archIndex ? `opacity-100 z-[1] hero-slide-active ${i % 2 === 1 ? 'hero-kenburns-alt' : ''}` : 'opacity-0 z-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#004449]/20 via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
