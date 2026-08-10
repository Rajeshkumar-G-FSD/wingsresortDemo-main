import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="footer" className="bg-[#f5f3f0] text-[#1b1c1a] pt-24 pb-6 md:pt-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-[#e4e2df]">
          {/* Brand Col */}
          <div>
            <button onClick={() => onNavigate('hero')} className="flex items-center gap-3 mb-4 text-left">
              <img
                src="/images/wings_resort_ooty_icon.png"
                alt=""
                className="w-11 h-auto shrink-0"
              />
              <span>
                <span className="font-headline text-xl font-bold tracking-tight text-[#F0801A] block leading-none uppercase">
                  Wings Resort
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-[#6f797a] block mt-1">
                  Luxury Resort
                </span>
              </span>
            </button>
            <p className="text-xs leading-relaxed mb-6 font-body max-w-sm">
              Bringing the calm, beauty, and soul of the tropics into your home.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ id, label, icon: Icon, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[#3f4849] hover:text-[#F0801A] transition-colors"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#004449] mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => onNavigate('villas')} className="hover:text-[#F0801A] transition-colors">
                  Our Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F0801A] transition-colors">
                  Property Details
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('villa-amenities')} className="hover:text-[#F0801A] transition-colors">
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#F0801A] transition-colors">
                  Resort Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#F0801A] transition-colors">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#004449] mb-4">
              Help
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#F0801A] transition-colors">
                  Nearby Attractions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('house-rules')} className="hover:text-[#F0801A] transition-colors">
                  House Rules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#F0801A] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-[#F0801A] transition-colors">
                  Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#F0801A] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 text-center text-[11px] text-[#6f797a]">
          <p>© 2026 Wings Resort. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
