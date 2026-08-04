import React from 'react';

interface ConsultationCTAProps {
  onOpenBooking: () => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-0 pb-16 md:pb-20 px-5 md:px-12 bg-[#d9f1f0] text-white overflow-visible">
      <div className="max-w-[1060px] px-7 py-8 md:px-14 md:py-10 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-20 coral-gradient rounded-[24px] shadow-xl mb-[-64px] md:mb-[-72px] overflow-hidden">
        {/* Decorative Leaf Accent */}
        <span className="material-symbols-outlined absolute -right-6 -bottom-10 text-[180px] text-white/10 pointer-events-none rotate-12">
          eco
        </span>

        <div className="text-center md:text-left relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 block mb-2">
            Wings Resort
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium text-white italic">
            Ready to love your stay again?
          </h2>
          <p className="text-sm text-white/90 mt-2 max-w-xl font-body">
            Let’s create a stay that inspires you every day.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-9 py-4 rounded-full bg-white text-[#a93721] text-xs font-bold uppercase tracking-widest hover:bg-[#fbf9f6] transition-all shadow-lg transform hover:-translate-y-0.5 shrink-0 relative z-10"
        >
          Book Your Consultation
        </button>
      </div>
    </section>
  );
};
