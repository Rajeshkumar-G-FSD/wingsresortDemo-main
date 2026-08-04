import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'villas', label: 'PROPERTY' },
    { id: 'story', label: 'ABOUT US' },
    { id: 'testimonials', label: 'REVIEW' },
    { id: 'faq', label: 'FAQ' },
    { id: 'footer', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass-header shadow-sm py-4' : 'bg-[#fbf9f6]/90 backdrop-blur-md py-6'}`}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Palm Tree Logo Mark */}
          <div className="w-11 h-11 flex items-center justify-center text-[#004449] transition-colors duration-300">
            <svg
              className="w-10 h-10 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8c2.76 0 5 2.24 5 5" />
              <path d="M13 8c0-2.76 2.24-5 5-5s5 2.24 5 5c-2.76 0-5 2.24-5 5" />
              <path d="M12 13a5 5 0 0 0-5-5" />
              <path d="M12 13a5 5 0 0 1 5-5" />
              <path d="M12 21V8" />
            </svg>
          </div>
          <div>
            <span className="font-headline text-[22px] font-bold tracking-tight text-[#004449] block leading-none uppercase">
              Palm & Coast
            </span>
            <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-[#004449] block mt-1">
              Home Styling Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-[#004449] font-bold'
                    : 'text-[#3f4849] hover:text-[#a93721]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#004449] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Book CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-7 py-3 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-95 transition-all shadow-md shadow-[#a93721]/20 transform hover:-translate-y-0.5"
          >
            Book a Consultation
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#004449] focus:outline-none rounded-lg hover:bg-[#004449]/5"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f6] border-b border-[#e4e2df] px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-base font-medium text-[#1b1c1a] hover:text-[#a93721] py-2 border-b border-[#efeeeb] flex items-center justify-between"
              >
                {item.label}
                <span className="material-symbols-outlined text-sm text-[#6f797a]">chevron_right</span>
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-4 w-full py-4 rounded-full coral-gradient text-white text-sm font-semibold uppercase tracking-wider text-center shadow-lg"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
