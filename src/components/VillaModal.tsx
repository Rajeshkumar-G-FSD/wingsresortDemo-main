import React, { useState } from 'react';
import { RoomCategory } from '../types';
import { formatINR } from '../data/roomsData';

interface VillaModalProps {
  room: RoomCategory | null;
  onClose: () => void;
  onBookDirect: (room: RoomCategory) => void;
}

export const VillaModal: React.FC<VillaModalProps> = ({ room, onClose, onBookDirect }) => {
  if (!room) return null;

  const [activeImg, setActiveImg] = useState(room.heroImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#4A2E1C] rounded-3xl overflow-hidden shadow-2xl border border-[#7A5238] max-h-[90vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#4A2E1C]/95 backdrop-blur-md px-6 py-4 border-b border-[#7A5238] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F0801A]">
              {room.badge} • Wings Resort
            </span>
            <h2 className="font-headline text-2xl text-[#F5F0E8] font-bold">{room.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F0801A]/10 text-[#F0801A] flex items-center justify-center hover:bg-[#F0801A] hover:text-[#2B1810] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Photo & Gallery Thumbnails */}
          <div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md mb-4">
              <img src={activeImg} alt={room.name} className="w-full h-full object-cover" />
            </div>
            {room.gallery && room.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[room.heroImage, ...room.gallery].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${
                      activeImg === img ? 'border-[#F0801A]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#6B4530] border border-[#7A5238]">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#F0801A]">Guests</p>
              <p className="text-base font-bold text-[#F5F0E8]">{room.maxAdults} Persons</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#F0801A]">Bed Type</p>
              <p className="text-base font-bold text-[#F5F0E8]">{room.bedType}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#F0801A]">Bathrooms</p>
              <p className="text-base font-bold text-[#F5F0E8]">{room.bathrooms} Attached</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-[#F0801A]">Size</p>
              <p className="text-base font-bold text-[#F5F0E8]">{room.sizeSqft} sq ft</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-headline text-xl text-[#F5F0E8] font-semibold mb-2">About the Room</h3>
            <p className="text-sm text-[#D8CFC4] leading-relaxed">{room.description}</p>
          </div>

          {/* Included Amenities */}
          <div>
            <h3 className="font-headline text-xl text-[#F5F0E8] font-semibold mb-3">Included Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#F5F0E8]">
                  <span className="material-symbols-outlined text-[#F5F0E8] text-base">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 bg-[#4A2E1C] p-6 border-t border-[#7A5238] flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-[#F5F0E8]">{formatINR(room.weekdayPrice)}</span>
            <span className="text-xs text-[#D8CFC4]"> / night onwards</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookDirect(room);
            }}
            className="px-8 py-3.5 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:opacity-95"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};
