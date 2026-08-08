import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenConsultation: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, activeSection, onNavigate }) => {
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
    { id: 'faq', label: 'FAQ' },
    { id: 'testimonials', label: 'REVIEWS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-[#fbf9f6] transition-all duration-300 ${scrolled ? 'shadow-sm py-4' : 'py-6'}`}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Logo Mark */}
          <img
            src="/images/wings_resort_ooty_icon.png"
            alt="Wings Resort"
            className="h-9 md:h-10 w-auto"
          />
          <span className="leading-none">
            <span className="block font-headline text-lg md:text-xl font-bold tracking-wide text-[#004449] uppercase">
              Wings Resort
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.24em] text-[#a93721] uppercase mt-0.5">
              Luxury Resort Living
            </span>
          </span>
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
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-2 px-7 py-3 rounded-full coral-gradient text-white text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-95 transition-all shadow-md shadow-[#a93721]/20 transform hover:-translate-y-0.5"
          >
            Reserve Now
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
                onOpenConsultation();
              }}
              className="mt-4 w-full py-4 rounded-full coral-gradient text-white text-sm font-semibold uppercase tracking-wider text-center shadow-lg"
            >
              Reserve Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
