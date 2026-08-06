import React, { useEffect } from 'react';
import { ServiceOffering } from '../types';
import { ServiceIcon } from './ServiceIcon';

interface ServiceDetailPageProps {
  service: ServiceOffering;
  relatedServices: ServiceOffering[];
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  relatedServices,
  onBack,
  onSelectService,
  onOpenBooking
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [service.id]);

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a] animate-fadeIn">
      {/* Large Hero */}
      <section className="relative min-h-[68vh] sm:min-h-[74vh] flex items-end overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00201f]/90 via-[#00201f]/45 to-[#00201f]/10" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10 px-5 md:px-12">
          <div className="max-w-[1280px] mx-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/75">
            <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <button onClick={onBack} className="hover:text-white transition-colors">Services</button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">{service.title}</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-12 pb-16 sm:pb-20">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-5">
            <ServiceIcon icon={service.icon} className="w-8 h-8" />
          </div>
          <span className="text-[#f06c52] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            Our Services
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-white font-medium max-w-2xl leading-[1.05]">
            {service.title}
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-5 max-w-xl leading-relaxed">
            {service.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full coral-gradient text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
            >
              Book a Consultation
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 rounded-full border border-white/40 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Back to Services
            </button>
          </div>
        </div>
      </section>

      {/* Overview + Highlights */}
      <section className="px-5 md:px-12 py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-headline text-2xl sm:text-3xl text-[#004449] font-semibold mb-5">
              Designed the Wings Resort Way
            </h2>
            <p className="text-[#3f4849] leading-relaxed text-base">
              {service.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {service.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden soft-shadow">
                  <img src={src} alt={service.title} className="w-full h-full object-cover hover-lift" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f5f3f0] rounded-3xl p-8 h-fit border border-[#e4e2df]/60 lg:sticky lg:top-28">
            <h3 className="font-headline text-lg text-[#004449] font-semibold mb-5">
              What's Included
            </h3>
            <div className="space-y-3">
              {service.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-sm text-[#1b1c1a]">
                  <span className="material-symbols-outlined text-[#004449] text-base mt-0.5">check_circle</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full mt-8 px-6 py-3.5 rounded-full coral-gradient text-white text-xs font-bold uppercase tracking-widest shadow hover:opacity-90 transition-all"
            >
              Book This Service
            </button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="px-5 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-headline text-2xl sm:text-3xl text-[#004449] font-semibold mb-8 text-center">
            Explore More Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((rs) => (
              <div
                key={rs.id}
                onClick={() => onSelectService(rs.id)}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rs.heroImage}
                    alt={rs.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-headline text-lg text-[#004449] font-semibold mb-2">
                    {rs.title}
                  </h3>
                  <p className="text-xs text-[#3f4849] mb-4 flex-grow leading-relaxed">
                    {rs.tagline}
                  </p>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#a93721] group-hover:text-[#004449] transition-colors inline-flex items-center gap-1.5">
                    LEARN MORE
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
