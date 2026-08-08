import React from 'react';
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { id: 'mail', label: 'Email', icon: Mail, href: `mailto:${CONTACT_INFO.email}` },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer id="footer" className="bg-[#004449] text-white pt-24 pb-6 md:pt-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-white/15">
          {/* Brand Col */}
          <div>
            <button onClick={() => onNavigate('hero')} className="flex items-center gap-3 mb-4 text-left">
              <img
                src="/images/wings_resort_ooty_icon.png"
                alt=""
                className="w-11 h-auto shrink-0"
              />
              <span>
                <span className="font-headline text-xl font-bold tracking-tight text-white block leading-none uppercase">
                  Wings Resort
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-white/70 block mt-1">
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
                  className="text-white/80 hover:text-[#f06c52] transition-colors"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => onNavigate('villas')} className="hover:text-[#f06c52] transition-colors">
                  Our Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#f06c52] transition-colors">
                  Amenities & Spa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#f06c52] transition-colors">
                  Resort Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#f06c52] transition-colors">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Help
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#f06c52] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#f06c52] transition-colors">
                  Booking Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#f06c52] transition-colors">
                  Guest Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#f06c52] transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#f06c52] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 text-center text-[11px] text-white/70">
          <p>© 2026 Wings Resort. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
