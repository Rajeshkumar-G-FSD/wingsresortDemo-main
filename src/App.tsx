import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedVillas } from './components/FeaturedVillas';
import { OurStory } from './components/OurStory';
import { AmenitiesSection } from './components/AmenitiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResortMapSection } from './components/ResortMapSection';
import { ConsultationCTA } from './components/ConsultationCTA';
import { VillaModal } from './components/VillaModal';
import { ExperienceModal } from './components/ExperienceModal';
import { BookingModal } from './components/BookingModal';
import { LoadingScreen } from './components/LoadingScreen';
import { FaqSection } from './components/FaqSection';
import { PropertyDetails } from './components/PropertyDetails';
import { NearbyExploreSection } from './components/NearbyExploreSection';
import { AboutVillaSection } from './components/AboutVillaSection';
import { VillaAmenitiesSection } from './components/VillaAmenitiesSection';
import { HouseRulesSection } from './components/HouseRulesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { Villa, Experience } from './types';
import { SERVICES } from './data/resortData';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPreselectVilla, setBookingPreselectVilla] = useState<Villa | null>(null);
  const [bookingPreset, setBookingPreset] = useState<{ checkIn: string; checkOut: string; guests: number } | null>(null);
  const [openCheckInTrigger, setOpenCheckInTrigger] = useState(0);

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
    if (activeServiceId) {
      setActiveServiceId(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        });
      });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setActiveServiceId(serviceId);
  };

  const handleBackFromService = () => {
    setActiveServiceId(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  const handleOpenConsultation = () => {
    handleNavigate('villas');
    setOpenCheckInTrigger((t) => t + 1);
  };

  const handleOpenBookingWithVilla = (villa: Villa) => {
    setBookingPreselectVilla(villa);
    setIsBookingOpen(true);
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
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Content */}
      <main>
        {activeServiceId ? (
          <ServiceDetailPage
            service={SERVICES.find((s) => s.id === activeServiceId) ?? SERVICES[0]}
            relatedServices={SERVICES.filter((s) => s.id !== activeServiceId)}
            onBack={handleBackFromService}
            onSelectService={handleSelectService}
            onOpenBooking={() => {
              setBookingPreselectVilla(null);
              setBookingPreset(null);
              setIsBookingOpen(true);
            }}
          />
        ) : (
          <>
            {/* Hero Section with Integrated Services Cards */}
            <HeroSection onSelectService={handleSelectService} />

            {/* Featured Villas & Spaces (Teal Dark Section) */}
            <FeaturedVillas
              onSelectVilla={(v) => setSelectedVilla(v)}
              onBookVillaDirect={handleOpenBookingWithVilla}
              onCheckAvailability={handleCheckAvailability}
              openCheckInTrigger={openCheckInTrigger}
            />

            {/* Our Story / Founders */}
            <OurStory />

            <PropertyDetails />

            {/* Contact Wings Resort */}
            <ContactSection />

            {/* About The Villa */}
            <AboutVillaSection />

            {/* Nearby Landmarks / Food & Shopping / Transportation */}
            <NearbyExploreSection />

            {/* Resort Map (real Google Map embed) */}
            <ResortMapSection />

            {/* Amenities at Wings Resort 3BHK Ooty */}
            <VillaAmenitiesSection />

            {/* House Rules & Information */}
            <HouseRulesSection />

            {/* Why Clients Choose & Process */}
            <AmenitiesSection />

            <FaqSection />

            {/* Testimonials Quote Slider */}
            <TestimonialsSection />

            {/* Coral Banner CTA */}
            <ConsultationCTA onOpenBooking={handleOpenConsultation} />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

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

      <WhatsAppChatWidget />
    </div>
  );
}

export default App;
