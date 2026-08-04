import React from 'react';

interface ConsultationCTAProps {
  onOpenBooking: () => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-10 px-5 md:px-12 bg-[#fbf9f6] text-white overflow-hidden">
      {/* Subtle organic background wave pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-[1060px] px-7 py-7 md:px-12 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 coral-gradient rounded-t-[20px]">
        <div className="text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 block mb-2">
            Palm &amp; Coast Studio
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium text-white italic">
            Ready to love your home again?
          </h2>
          <p className="text-sm text-white/90 mt-2 max-w-xl font-body">
            Let’s create a space that inspires you every day.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-9 py-4 rounded-full bg-white text-[#a93721] text-xs font-bold uppercase tracking-widest hover:bg-[#fbf9f6] transition-all shadow-lg transform hover:-translate-y-0.5 shrink-0"
        >
          Book Your Consultation
        </button>
      </div>
    </section>
  );
};
