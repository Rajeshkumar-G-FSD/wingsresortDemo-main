import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

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
    <footer id="footer" className="bg-[#004449] text-white pt-14 pb-6 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/15">
          {/* Brand Col */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#004449] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">spa</span>
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white">
                Palm &amp; Coast
              </span>
            </div>
            <p className="text-xs text-[#3f4849] leading-relaxed mb-6 font-body max-w-sm">
              Bringing the calm, beauty, and soul of the tropics into your home.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#a93721] block">
                Join the Wings Society Newsletter
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-[#f5f3f0] border border-[#e4e2df] text-xs focus:outline-none focus:border-[#004449] flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-semibold text-[#004449]">
                  ✓ Thank you for subscribing to our journal!
                </p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#004449] mb-4">
              Sanctuary
            </h4>
            <ul className="space-y-3 text-xs text-[#3f4849]">
              <li>
                <button onClick={() => onNavigate('villas')} className="hover:text-[#a93721] transition-colors">
                  Our Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#a93721] transition-colors">
                  Amenities & Spa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#a93721] transition-colors">
                  Resort Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#a93721] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#a93721] transition-colors">
                  Design Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#004449] mb-4">
              Experiences
            </h4>
            <ul className="space-y-3 text-xs text-[#3f4849]">
              <li><button onClick={onOpenBooking} className="hover:text-[#a93721]">Infinity Pools</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#a93721]">Fine Dining</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#a93721]">Holistic Wellness</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#a93721]">Private Yacht Charter</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#a93721]">In-Villa Dining</button></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#004449] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-[#3f4849]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#a93721]">call</span>
                <span>+1 (800) WINGS-RESORT</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#a93721]">mail</span>
                <span>concierge@wingsresort.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#a93721]">location_on</span>
                <span>Tulum, Mexico & Exuma, Bahamas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#3f4849] gap-4">
          <p>© 2026 Wings Resort. All Rights Reserved. Luxury Hospitality & Design.</p>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-[#a93721]">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#a93721]">Terms of Service</a>
            <a href="#hero" className="hover:text-[#a93721]">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
