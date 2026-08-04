import React, { useState } from 'react';
import { Villa } from '../types';

interface VillaModalProps {
  villa: Villa | null;
  onClose: () => void;
  onBookDirect: (villa: Villa) => void;
}

export const VillaModal: React.FC<VillaModalProps> = ({ villa, onClose, onBookDirect }) => {
  if (!villa) return null;

  const [activeImg, setActiveImg] = useState(villa.imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fbf9f6] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] max-h-[90vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#fbf9f6]/95 backdrop-blur-md px-6 py-4 border-b border-[#e4e2df] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a93721]">
              {villa.category} • {villa.location}
            </span>
            <h2 className="font-headline text-2xl text-[#004449] font-bold">{villa.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#004449]/10 text-[#004449] flex items-center justify-center hover:bg-[#004449] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Photo & Gallery Thumbnails */}
          <div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md mb-4">
              <img src={activeImg} alt={villa.name} className="w-full h-full object-cover" />
            </div>
            {villa.gallery && villa.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[villa.imageUrl, ...villa.gallery].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${
                      activeImg === img ? 'border-[#004449]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#f5f3f0] border border-[#e4e2df]">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#a93721]">Guests</p>
              <p className="text-base font-bold text-[#004449]">{villa.guests} Persons</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#a93721]">Bedrooms</p>
              <p className="text-base font-bold text-[#004449]">{villa.bedrooms} Suites</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#a93721]">Bathrooms</p>
              <p className="text-base font-bold text-[#004449]">{villa.bathrooms} En-Suite</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#a93721]">Size</p>
              <p className="text-base font-bold text-[#004449]">{villa.sqft} sq ft</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-headline text-xl text-[#004449] font-semibold mb-2">About the Villa</h3>
            <p className="text-sm text-[#3f4849] leading-relaxed">{villa.description}</p>
          </div>

          {/* Included Amenities */}
          <div>
            <h3 className="font-headline text-xl text-[#004449] font-semibold mb-3">Included Luxury Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {villa.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#1b1c1a]">
                  <span className="material-symbols-outlined text-[#004449] text-base">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 bg-[#fbf9f6] p-6 border-t border-[#e4e2df] flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-[#004449]">${villa.pricePerNight}</span>
            <span className="text-xs text-[#3f4849]"> / night</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookDirect(villa);
            }}
            className="px-8 py-3.5 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:opacity-95"
          >
            Reserve Villa Now
          </button>
        </div>
      </div>
    </div>
  );
};
