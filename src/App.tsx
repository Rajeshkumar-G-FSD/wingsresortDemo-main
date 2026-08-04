import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedVillas } from './components/FeaturedVillas';
import { OurStory } from './components/OurStory';
import { AmenitiesSection } from './components/AmenitiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResortMapSection } from './components/ResortMapSection';
import { ConsultationCTA } from './components/ConsultationCTA';
import { JournalSection } from './components/JournalSection';
import { VillaModal } from './components/VillaModal';
import { ExperienceModal } from './components/ExperienceModal';
import { BookingModal } from './components/BookingModal';
import { LoadingScreen } from './components/LoadingScreen';
import { FaqSection } from './components/FaqSection';
import { PropertyDetails } from './components/PropertyDetails';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { Villa, Experience, JournalPost } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedJournalPost, setSelectedJournalPost] = useState<JournalPost | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPreselectVilla, setBookingPreselectVilla] = useState<Villa | null>(null);
  const [bookingPreset, setBookingPreset] = useState<{ checkIn: string; checkOut: string; guests: number } | null>(null);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main > *'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 }
    );
    targets.forEach((target, index) => {
      target.classList.add('reveal-section');
      if (index === 0) target.classList.add('is-visible');
      else observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingWithVilla = (villa: Villa) => {
    setBookingPreselectVilla(villa);
    setIsBookingOpen(true);
  };

  const handleQuickSearch = (
    checkIn: string,
    checkOut: string,
    guests: number,
    category: string
  ) => {
    // Scroll smoothly to villas section
    handleNavigate('villas');
  };

  const handleCheckAvailability = (checkIn: string, checkOut: string, guests: number) => {
    setBookingPreselectVilla(null);
    setBookingPreset({ checkIn, checkOut, guests });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-body selection:bg-[#004449] selection:text-white">
      <LoadingScreen />

      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setBookingPreselectVilla(null);
          setBookingPreset(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section with Integrated Services Cards */}
        <HeroSection
          onExploreVillas={() => handleNavigate('services')}
          onOpenBooking={() => {
            setBookingPreselectVilla(null);
            setBookingPreset(null);
            setIsBookingOpen(true);
          }}
          onSearchQuick={handleQuickSearch}
        />

        {/* Featured Villas & Spaces (Teal Dark Section) */}
        <FeaturedVillas
          onSelectVilla={(v) => setSelectedVilla(v)}
          onBookVillaDirect={handleOpenBookingWithVilla}
          onCheckAvailability={handleCheckAvailability}
        />

        {/* Our Story / Founders */}
        <OurStory />

        <PropertyDetails />

        {/* Resort Map */}
        <ResortMapSection />

        {/* Why Clients Choose & Process */}
        <AmenitiesSection />

        {/* Design Journal */}
        <JournalSection onSelectPost={(post) => setSelectedJournalPost(post)} />

        <FaqSection />

        {/* Testimonials Quote Slider */}
        <TestimonialsSection />

        {/* Coral Banner CTA */}
        <ConsultationCTA
          onOpenBooking={() => {
            setBookingPreselectVilla(null);
            setBookingPreset(null);
            setIsBookingOpen(true);
          }}
        />
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setBookingPreselectVilla(null);
          setBookingPreset(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Modals */}
      <VillaModal
        villa={selectedVilla}
        onClose={() => setSelectedVilla(null)}
        onBookDirect={handleOpenBookingWithVilla}
      />

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onOpenBooking={() => {
          setSelectedExperience(null);
          setBookingPreset(null);
          setIsBookingOpen(true);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingPreselectVilla(null);
          setBookingPreset(null);
        }}
        preselectedVilla={bookingPreselectVilla}
        presetCheckIn={bookingPreset?.checkIn}
        presetCheckOut={bookingPreset?.checkOut}
        presetGuests={bookingPreset?.guests}
      />

      {/* Journal Post Simple Modal */}
      {selectedJournalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#fbf9f6] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] max-h-[90vh] flex flex-col p-6 sm:p-8">
            <button
              onClick={() => setSelectedJournalPost(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#004449]/10 text-[#004449] flex items-center justify-center hover:bg-[#004449] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a93721] mb-2">
              {selectedJournalPost.category} • {selectedJournalPost.date}
            </span>

            <h2 className="font-headline text-3xl text-[#004449] font-bold mb-4">
              {selectedJournalPost.title}
            </h2>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={selectedJournalPost.imageUrl}
                alt={selectedJournalPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#3f4849] leading-relaxed overflow-y-auto pr-2">
              {selectedJournalPost.content} Architecture isn’t merely about structural shelter; it is an acoustic and thermal instrument that shapes our daily state of mind. At Wings Resort, every villa is angled according to prevailing ocean breeze trade winds, inviting natural cooling without acoustic noise. Light wood accents, organic linens, and native flora complete the sanctuary.
            </p>
          </div>
        </div>
      )}

      <WhatsAppChatWidget />
    </div>
  );
}

export default App;
