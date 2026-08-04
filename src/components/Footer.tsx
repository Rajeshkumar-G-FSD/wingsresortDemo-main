import React, { useState } from 'react';
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { id: 'mail', label: 'Email', icon: Mail, href: 'mailto:concierge@wingsresort.com' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-[#004449] text-white pt-24 pb-6 md:pt-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/15">
          {/* Brand Col */}
          <div>
            <button onClick={() => onNavigate('hero')} className="flex items-center gap-3 mb-4 text-left">
              <span className="text-white">
                <svg className="w-9 h-9 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8c2.76 0 5 2.24 5 5" />
                  <path d="M13 8c0-2.76 2.24-5 5-5s5 2.24 5 5c-2.76 0-5 2.24-5 5" />
                  <path d="M12 13a5 5 0 0 0-5-5" />
                  <path d="M12 13a5 5 0 0 1 5-5" />
                  <path d="M12 21V8" />
                </svg>
              </span>
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
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#f06c52] transition-colors">
                  Design Journal
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
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#f06c52] mt-0.5">location_on</span>
                <span>190, A19, Ooty, Tamil Nadu 643001</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#f06c52]">call</span>
                <span>098940 88044</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#f06c52]">mail</span>
                <span>concierge@wingsresort.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#f06c52] mt-0.5">schedule</span>
                <span>Open 24 hours<br />Every day, Mon – Sun</span>
              </li>
            </ul>
          </div>

          {/* Stay Inspired */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Stay Inspired
            </h4>
            <p className="text-xs leading-relaxed mb-4">
              Get stay tips, behind the scenes, and tropical vibes to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-white border border-white/15 text-xs text-[#004449] focus:outline-none flex-grow min-w-0"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-9 h-9 shrink-0 rounded-full coral-gradient text-white flex items-center justify-center hover:opacity-95"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-semibold text-[#8fd2d8]">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </form>
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
