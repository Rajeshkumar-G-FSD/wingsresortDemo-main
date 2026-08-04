import React from 'react';
import { Experience } from '../types';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  onOpenBooking
}) => {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fbf9f6] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] max-h-[90vh] flex flex-col">
        {/* Modal Image Header */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors z-20"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <div className="absolute top-4 left-4 bg-[#004449] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
            {experience.category}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h2 className="font-headline text-3xl text-[#004449] font-bold mb-2">
              {experience.title}
            </h2>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#a93721]">
              <span>Duration: {experience.duration}</span>
              <span>•</span>
              <span>{experience.price}</span>
            </div>
          </div>

          <p className="text-sm text-[#3f4849] leading-relaxed">
            {experience.fullDescription}
          </p>

          <div>
            <h4 className="font-headline text-lg text-[#004449] font-semibold mb-3">
              Experience Highlights
            </h4>
            <div className="space-y-2">
              {experience.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#1b1c1a]">
                  <span className="material-symbols-outlined text-[#004449] text-base">check_circle</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#f5f3f0] border-t border-[#e4e2df] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-[#004449] text-[#004449] text-xs font-semibold uppercase tracking-wider"
          >
            Back to Services
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-8 py-3 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider shadow hover:opacity-90"
          >
            Book Experience
          </button>
        </div>
      </div>
    </div>
  );
};
