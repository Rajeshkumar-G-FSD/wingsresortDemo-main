import React from 'react';
import { EXPERIENCES } from '../data/resortData';
import { Experience } from '../types';

interface ServicesSectionProps {
  onSelectExperience: (experience: Experience) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectExperience }) => {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-[#f5f3f0] px-5 md:px-12 z-0 my-12">
      {/* Top Wave Divider */}
      <div className="wave-divider wave-divider-top">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="wave-fill-surface" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#a93721]">flare</span>
            <span className="text-[#a93721] text-xs font-semibold uppercase tracking-[0.2em]">
              Our Services
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#004449] max-w-2xl mx-auto font-medium">
            Curated Experiences for the Discerning Traveler
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="bg-[#fbf9f6] rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center soft-shadow hover-lift border border-[#e4e2df]/60 cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-[#004449]/10 group-hover:bg-[#004449] flex items-center justify-center mb-6 text-[#004449] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-4xl">{exp.iconName}</span>
              </div>
              <h3 className="font-headline text-2xl text-[#004449] mb-4 font-semibold">
                {exp.title}
              </h3>
              <p className="text-sm text-[#3f4849] mb-8 flex-grow leading-relaxed">
                {exp.description}
              </p>
              <button className="text-xs font-semibold uppercase tracking-widest text-[#a93721] group-hover:text-[#004449] transition-colors inline-flex items-center gap-1 mt-auto">
                LEARN MORE
                <span className="material-symbols-outlined text-base transform group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider transitioning into dark primary section */}
      <div className="wave-divider wave-divider-bottom z-10">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="wave-fill-primary" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};
