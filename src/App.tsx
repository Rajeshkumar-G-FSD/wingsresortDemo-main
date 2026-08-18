import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedVillas } from './components/FeaturedVillas';
import { OurStory } from './components/OurStory';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ResortMapSection } from './components/ResortMapSection';
import { ConsultationCTA } from './components/ConsultationCTA';
import { RoomDetailPage } from './components/RoomDetailPage';
import { ExperienceModal } from './components/ExperienceModal';
import { BookingModal } from './components/BookingModal';
import { LoadingScreen } from './components/LoadingScreen';
import { FaqSection } from './components/FaqSection';
import { PropertyDetails } from './components/PropertyDetails';
import { NearbyExploreSection } from './components/NearbyExploreSection';
import { NearbyAttractionsSection } from './components/NearbyAttractionsSection';
import { AboutVillaSection } from './components/AboutVillaSection';
import { VillaAmenitiesSection } from './components/VillaAmenitiesSection';
import { HouseRulesSection } from './components/HouseRulesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { RoomsPage } from './components/RoomsPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { RoomCategory, Experience } from './types';
import { SERVICES } from './data/resortData';
import { subscribeToRoomPricing } from './lib/roomsRepo';

const ADMIN_SESSION_KEY = 'wr_admin_authed';
// Must stay in sync with the nav item ids in Header.tsx.
const NAV_SECTION_IDS = ['hero', 'villas', 'story', 'faq', 'testimonials', 'contact'];

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedRoom, setSelectedRoom] = useState<RoomCategory | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPreselectRoom, setBookingPreselectRoom] = useState<RoomCategory | null>(null);
  const [bookingPreset, setBookingPreset] = useState<{ checkIn: string; checkOut: string; guests: number } | null>(null);
  const [openCheckInTrigger, setOpenCheckInTrigger] = useState(0);
  const [showRoomsPage, setShowRoomsPage] = useState(false);
  const [roomsSearch, setRoomsSearch] = useState<{ checkIn: string; checkOut: string; adults: number }>({
    checkIn: '',
    checkOut: '',
    adults: 2,
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthed, setIsAdminAuthed] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  // Bumped whenever admin-set room prices change in Firestore, so every page re-reads the (mutated-in-place)
  // ROOM_CATEGORIES pricing without each component needing its own subscription.
  const [, setPricingVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToRoomPricing(
      () => setPricingVersion((v) => v + 1),
      () => {} // Pricing overrides are best-effort; silently fall back to the code defaults on error.
    );
    return unsubscribe;
  }, []);

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

  // Scroll-spy: highlight whichever nav item corresponds to the section currently in view.
  useEffect(() => {
    if (activeServiceId || showRoomsPage || showAdminDashboard || selectedRoom) return;

    let ticking = false;
    const HEADER_OFFSET = 140;

    const updateActiveSection = () => {
      ticking = false;
      let current = NAV_SECTION_IDS[0];
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - HEADER_OFFSET <= 0) {
          current = id;
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeServiceId, showRoomsPage, showAdminDashboard, selectedRoom]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeServiceId || showRoomsPage || showAdminDashboard || selectedRoom) {
      setActiveServiceId(null);
      setShowRoomsPage(false);
      setShowAdminDashboard(false);
      setSelectedRoom(null);
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

  const handleOpenBookingWithRoom = (room: RoomCategory) => {
    setBookingPreselectRoom(room);
    setIsBookingOpen(true);
  };

  const handleCheckAvailability = (checkIn: string, checkOut: string, guests: number) => {
    setRoomsSearch({ checkIn, checkOut, adults: guests });
    setShowRoomsPage(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleViewAllRooms = () => {
    setRoomsSearch((prev) => (prev.checkIn && prev.checkOut ? prev : { ...prev, checkIn: '', checkOut: '' }));
    setShowRoomsPage(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBackFromRooms = () => {
    setShowRoomsPage(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  const handleSelectRoom = (room: RoomCategory) => {
    setSelectedRoom(room);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBackFromRoomDetail = () => {
    setSelectedRoom(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  const handleOpenAdmin = () => {
    setActiveServiceId(null);
    setShowRoomsPage(false);
    if (isAdminAuthed) {
      setShowAdminDashboard(true);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    setIsAdminAuthed(true);
    setIsAdminLoginOpen(false);
    setShowAdminDashboard(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminAuthed(false);
    setShowAdminDashboard(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-body selection:bg-[#004449] selection:text-white">
      <LoadingScreen />

      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content */}
      <main>
        {showAdminDashboard ? (
          <AdminDashboardPage onLogout={handleAdminLogout} />
        ) : showRoomsPage ? (
          <RoomsPage
            initialCheckIn={roomsSearch.checkIn}
            initialCheckOut={roomsSearch.checkOut}
            initialAdults={roomsSearch.adults}
            onBack={handleBackFromRooms}
          />
        ) : selectedRoom ? (
          <RoomDetailPage
            room={selectedRoom}
            onBack={handleBackFromRoomDetail}
            onBookDirect={handleOpenBookingWithRoom}
          />
        ) : activeServiceId ? (
          <ServiceDetailPage
            service={SERVICES.find((s) => s.id === activeServiceId) ?? SERVICES[0]}
            relatedServices={SERVICES.filter((s) => s.id !== activeServiceId)}
            onBack={handleBackFromService}
            onSelectService={handleSelectService}
            onOpenBooking={() => {
              setBookingPreselectRoom(null);
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
              onSelectRoom={handleSelectRoom}
              onBookRoomDirect={handleOpenBookingWithRoom}
              onCheckAvailability={handleCheckAvailability}
              onViewAllRooms={handleViewAllRooms}
              openCheckInTrigger={openCheckInTrigger}
            />

            {/* Our Story / Founders */}
            <OurStory />

            {/* About The Villa */}
            <AboutVillaSection />

            <PropertyDetails />

            {/* Nearby Attractions */}
            <NearbyAttractionsSection />

            {/* Food & Shopping / Transportation */}
            <NearbyExploreSection />

            {/* Resort Map (real Google Map embed) */}
            <ResortMapSection />

            {/* Amenities at Wings Resort 3BHK Ooty */}
            <VillaAmenitiesSection />

            {/* House Rules & Information */}
            <HouseRulesSection />

            <FaqSection />

            {/* Guest Reviews: real Google reviews, auto-advancing quote carousel */}
            <GoogleReviewsSection />

            {/* Contact Wings Resort */}
            <ContactSection />

            {/* Coral Banner CTA */}
            <ConsultationCTA onOpenBooking={handleOpenConsultation} />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
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
          setBookingPreselectRoom(null);
          setBookingPreset(null);
        }}
        preselectedRoom={bookingPreselectRoom}
        presetCheckIn={bookingPreset?.checkIn}
        presetCheckOut={bookingPreset?.checkOut}
        presetGuests={bookingPreset?.guests}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      <WhatsAppChatWidget onNavigateToBooking={handleCheckAvailability} />
    </div>
  );
}

export default App;
