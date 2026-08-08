import React, { useEffect, useRef, useState } from 'react';

const RESORT_WHATSAPP_E164 = '919894088044';
const RESORT_WHATSAPP_DISPLAY = '098940 88044';

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

type BookingStep = 'idle' | 'name' | 'phone' | 'checkin' | 'checkout' | 'guests' | 'summary';

interface BookingDraft {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number | null;
}

const now = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

interface CountryOption {
  name: string;
  flag: string;
  dial: string;
}

const COUNTRY_CODES: CountryOption[] = [
  { name: 'India', flag: '🇮🇳', dial: '+91' },
  { name: 'United States', flag: '🇺🇸', dial: '+1' },
  { name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { name: 'UAE', flag: '🇦🇪', dial: '+971' },
  { name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { name: 'France', flag: '🇫🇷', dial: '+33' },
  { name: 'Sri Lanka', flag: '🇱🇰', dial: '+94' },
  { name: 'Nepal', flag: '🇳🇵', dial: '+977' },
  { name: 'Bangladesh', flag: '🇧🇩', dial: '+880' },
  { name: 'Saudi Arabia', flag: '🇸🇦', dial: '+966' },
  { name: 'Qatar', flag: '🇶🇦', dial: '+974' },
  { name: 'Malaysia', flag: '🇲🇾', dial: '+60' },
];

const KNOWLEDGE_BASE: { test: RegExp; reply: string }[] = [
  {
    test: /\b(hi|hello|hey|namaste)\b/i,
    reply: "Hello! 👋 Welcome to Wings Resort, Ooty. I can help with rooms, pricing, amenities, location, or policies — or tap Quick Book below to reserve your stay."
  },
  {
    test: /\b(room|rooms|accommodation|suite|bedroom|stay options?)\b/i,
    reply: 'We offer A-Type Bedroom, Three Bedroom Residence, Deluxe Three Room Suite, Couples Bed Room, and Family Bed Room — each with cozy tropical-luxury interiors, private bathroom, and TV.'
  },
  {
    test: /\b(price|prices|pricing|cost|rate|rates|charge|how much|expensive)\b/i,
    reply: "Pricing depends on room type, dates, and number of guests. Tap Quick Book and share your dates — our team will confirm the best available rate on WhatsApp right away."
  },
  {
    test: /\b(where|location|address|directions|situated|map)\b/i,
    reply: 'We\'re located at 190, A19, Ooty, Tamil Nadu 643001. Ooty Railway Station is 1.2 km away and Ooty Bus Station is a 15-minute walk.'
  },
  {
    test: /\b(amenit(y|ies)|facilit(y|ies)|wifi|wi-fi|internet|parking|breakfast|food|restaurant|fireplace)\b/i,
    reply: 'Our facilities include free WiFi throughout, free private on-site parking, an outdoor fireplace, daily room service, private bathrooms, and flat-screen TVs in every room.'
  },
  {
    test: /\b(check.?in|check.?out|timing|timings|hours|open|opening)\b/i,
    reply: 'Our front desk and concierge are open 24 hours, every day of the week — so you can check in or out whenever suits your travel plans.'
  },
  {
    test: /\b(cancel|cancellation|refund|reschedule)\b/i,
    reply: 'Cancellation terms depend on your rate plan. Share your booking details with our team on WhatsApp and we\'ll confirm the exact policy for your reservation.'
  },
  {
    test: /\b(contact|phone|number|call|reach|email)\b/i,
    reply: `You can reach us anytime at ${RESORT_WHATSAPP_DISPLAY}, or just keep chatting with me right here!`
  },
  {
    test: /\b(nearby|attraction|attractions|visit|things to do|doddabetta|lake|garden|sightseeing)\b/i,
    reply: 'Nearby highlights include Ooty Rose Garden (2.1 km), Ooty Botanical Gardens (2.2 km), Doddabetta Peak (9 km), and Ooty Lake (3.3 km) — all an easy trip from Wings Cottage.'
  },
  {
    test: /\b(pet|pets|dog|cat|animal)\b/i,
    reply: "We'd love to confirm pet arrangements for you directly — please share your details on WhatsApp and our team will help."
  },
  {
    test: /\b(payment|pay|card|cash|upi)\b/i,
    reply: 'We accept major cards, UPI, and cash on arrival. Full payment details will be shared once your booking is confirmed.'
  },
  {
    test: /\b(furnish|furnished|interior)\b/i,
    reply: 'Every property is curated with a complete tropical-luxury interior package and premium finishes.'
  },
  {
    test: /\b(view|viewing|tour|visit the property)\b/i,
    reply: 'Yes, we\'re happy to arrange a property viewing — tap Quick Book or message us your preferred date and time on WhatsApp.'
  }
];

const getKnowledgeReply = (text: string): string | null => {
  const match = KNOWLEDGE_BASE.find((entry) => entry.test.test(text));
  return match ? match.reply : null;
};

const isBookingIntent = (text: string) => /\b(book|booking|reserve|reservation|availability|quick book)\b/i.test(text);

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const toISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const formatDisplay = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const MiniCalendar: React.FC<{ minDate?: string; onSelect: (iso: string) => void }> = ({ minDate, onSelect }) => {
  const base = minDate ? new Date(`${minDate}T00:00:00`) : new Date();
  const [viewMonth, setViewMonth] = useState(new Date(base.getFullYear(), base.getMonth(), 1));
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  ];
  const minDateObj = minDate ? new Date(`${minDate}T00:00:00`) : null;
  const isDisabled = (d: Date) => (minDateObj ? d.getTime() < minDateObj.getTime() - 12 * 60 * 60 * 1000 : false);

  return (
    <div className="mt-2 w-full rounded-2xl bg-white p-3 shadow-sm border border-[#e4e2df]">
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={() => setViewMonth(new Date(year, month - 1, 1))} className="w-7 h-7 rounded-full flex items-center justify-center text-[#075E54] hover:bg-[#f0f2f1]">
          <span className="material-symbols-outlined text-base">chevron_left</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-[#075E54]">
          {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button type="button" onClick={() => setViewMonth(new Date(year, month + 1, 1))} className="w-7 h-7 rounded-full flex items-center justify-center text-[#075E54] hover:bg-[#f0f2f1]">
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div key={`${w}-${i}`} className="h-6 flex items-center justify-center text-[9px] font-bold text-[#6f797a]">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) =>
          d ? (
            <button
              key={i}
              type="button"
              disabled={isDisabled(d)}
              onClick={() => onSelect(toISO(d))}
              className={`h-7 w-7 rounded-full text-xs font-semibold transition-colors flex items-center justify-center ${
                isDisabled(d) ? 'text-[#e4e2df] cursor-not-allowed' : 'text-[#111b21] hover:bg-[#dcf8c6]'
              }`}
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
};

const PhoneEntry: React.FC<{ onSubmit: (fullPhone: string) => void }> = ({ onSubmit }) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const digits = localNumber.replace(/[^\d]/g, '');
    if (digits.length < 7) {
      setError('Please enter a valid number.');
      return;
    }
    setError(null);
    onSubmit(`${countryCode} ${digits}`);
  };

  return (
    <div className="mt-2 w-full rounded-2xl bg-white p-3 shadow-sm border border-[#e4e2df]">
      <div className="flex items-center gap-2">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          aria-label="Country code"
          className="shrink-0 rounded-full border border-[#e4e2df] bg-white px-2.5 py-2.5 text-xs font-semibold text-[#111b21] focus:outline-none focus:border-[#25D366]"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={`${c.name}-${c.dial}`} value={c.dial}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="numeric"
          value={localNumber}
          onChange={(e) => { setLocalNumber(e.target.value.replace(/[^\d]/g, '')); setError(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          placeholder="WhatsApp number"
          className="min-w-0 flex-1 rounded-full border border-[#e4e2df] bg-white px-3.5 py-2.5 text-xs text-[#111b21] focus:outline-none focus:border-[#25D366]"
        />
        <button
          type="button"
          onClick={submit}
          aria-label="Submit phone number"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-base">send</span>
        </button>
      </div>
      {error && <p className="mt-1.5 text-[11px] font-semibold text-[#c0392b]">{error}</p>}
    </div>
  );
};

interface WhatsAppChatWidgetProps {
  /** Called with (checkIn, checkOut, guests) when the guest taps "Book Now" after completing the chat booking flow. */
  onNavigateToBooking?: (checkIn: string, checkOut: string, guests: number) => void;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({ onNavigateToBooking }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<BookingStep>('idle');
  const [draft, setDraft] = useState<BookingDraft>({ name: '', phone: '', checkIn: '', checkOut: '', guests: null });
  const [fallbackCta, setFallbackCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (open && messages.length === 0) {
      pushBot("Hello! 👋 Welcome to Wings Resort, Ooty. I'm here to answer any question about your stay, or you can tap Quick Book to reserve in under a minute.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, step, fallbackCta]);

  const pushUser = (text: string) => {
    setMessages((m) => [...m, { id: idRef.current++, from: 'user', text, time: now() }]);
  };

  const pushBot = (text: string, delay = 0) => {
    if (delay > 0) {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: idRef.current++, from: 'bot', text, time: now() }]);
      }, delay);
    } else {
      setMessages((m) => [...m, { id: idRef.current++, from: 'bot', text, time: now() }]);
    }
  };

  const startBooking = () => {
    setDraft({ name: '', phone: '', checkIn: '', checkOut: '', guests: null });
    setStep('name');
    pushBot("Wonderful! Let's get you booked. First, what's your full name?", 500);
  };

  const advanceFromPhone = (fullPhone: string) => {
    setDraft((d) => ({ ...d, phone: fullPhone }));
    setStep('checkin');
    pushBot('Perfect. Please pick your check-in date below 👇', 600);
  };

  const handlePhoneWidgetSubmit = (fullPhone: string) => {
    setFallbackCta(false);
    pushUser(fullPhone);
    advanceFromPhone(fullPhone);
  };

  const handleSend = (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text) return;
    pushUser(text);
    setInput('');
    setFallbackCta(false);

    if (step === 'name') {
      setDraft((d) => ({ ...d, name: text }));
      setStep('phone');
      pushBot(`Thanks, ${text}! What's the best WhatsApp number to reach you on? (include country code)`, 600);
      return;
    }

    if (step === 'phone') {
      const digits = text.replace(/[^\d]/g, '');
      if (digits.length < 10) {
        pushBot("That number looks incomplete — could you pick your country above and enter your number, or share it again with the country code, e.g. +91 98765 43210?", 500);
        return;
      }
      advanceFromPhone(text);
      return;
    }

    // Free-text chat outside the guided steps
    if (isBookingIntent(text)) {
      startBooking();
      return;
    }

    const reply = getKnowledgeReply(text);
    if (reply) {
      pushBot(reply, 600);
    } else {
      pushBot(
        "Great question! I don't have that on hand, but our team can help right away — tap below to continue on WhatsApp, or ask me about rooms, pricing, amenities, or location.",
        600
      );
      window.setTimeout(() => setFallbackCta(true), 650);
    }
  };

  const handleCheckIn = (iso: string) => {
    pushUser(formatDisplay(iso));
    const earliestCheckout = addDays(iso, 1);
    setDraft((d) => ({ ...d, checkIn: iso, checkOut: d.checkOut && new Date(d.checkOut) >= new Date(earliestCheckout) ? d.checkOut : '' }));
    setStep('checkout');
    pushBot('Got it. And your check-out date?', 500);
  };

  const handleCheckOut = (iso: string) => {
    pushUser(formatDisplay(iso));
    setDraft((d) => ({ ...d, checkOut: iso }));
    setStep('guests');
    pushBot('How many guests will be staying?', 500);
  };

  const handleGuests = (n: number) => {
    pushUser(`${n} guest${n > 1 ? 's' : ''}`);
    setDraft((d) => ({ ...d, guests: n }));
    setStep('summary');
    pushBot("All set! Here's your booking enquiry — tap Book Now to continue to booking with these details.", 600);
  };

  const handleBookNow = () => {
    setOpen(false);
    setStep('idle');
    onNavigateToBooking?.(draft.checkIn, draft.checkOut, draft.guests ?? 2);
  };

  const fallbackWhatsAppHref = `https://wa.me/${RESORT_WHATSAPP_E164}?text=${encodeURIComponent('Hi Wings Resort! I have a question about my stay.')}`;

  const quickReplies: string[] =
    step === 'idle'
      ? ['📅 Quick Book', '🏨 Rooms & Pricing', '📍 Location', '🛎️ Amenities']
      : step === 'guests'
      ? []
      : [];

  const handleQuickReply = (label: string) => {
    setFallbackCta(false);
    if (label === '📅 Quick Book') {
      pushUser(label);
      startBooking();
      return;
    }
    if (label === '🏨 Rooms & Pricing') {
      pushUser(label);
      pushBot(getKnowledgeReply('rooms') ?? '', 500);
      return;
    }
    if (label === '📍 Location') {
      pushUser(label);
      pushBot(getKnowledgeReply('location') ?? '', 500);
      return;
    }
    if (label === '🛎️ Amenities') {
      pushUser(label);
      pushBot(getKnowledgeReply('amenities') ?? '', 500);
      return;
    }
  };

  return (
    <>
      {/* Floating Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us on WhatsApp'}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {!open && <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />}
        <span className="relative">
          {open ? (
            <span className="material-symbols-outlined text-white text-3xl">close</span>
          ) : (
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
              <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.223.607 4.377 1.76 6.266L4 29l7.9-1.727A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.94-1.352l-.354-.21-4.688 1.026 1.05-4.568-.23-.372A9.7 9.7 0 0 1 5.25 15c0-5.93 4.823-10.75 10.754-10.75S26.75 9.07 26.75 15 21.935 24.75 16.004 24.75Zm5.63-7.98c-.31-.155-1.83-.902-2.113-1.005-.284-.104-.49-.155-.697.155-.207.31-.8 1.005-.98 1.212-.18.207-.362.233-.672.078-.31-.155-1.31-.483-2.496-1.54-.923-.823-1.546-1.84-1.727-2.15-.18-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.18.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.697-1.68-.955-2.3-.252-.605-.508-.523-.697-.533-.18-.008-.388-.01-.595-.01-.207 0-.543.078-.827.388-.284.31-1.084 1.06-1.084 2.585 0 1.526 1.11 3 1.264 3.207.155.207 2.184 3.334 5.29 4.676.74.32 1.317.512 1.767.655.742.236 1.418.203 1.953.123.596-.089 1.83-.748 2.088-1.47.258-.723.258-1.343.18-1.47-.078-.128-.284-.207-.594-.362Z" />
            </svg>
          )}
        </span>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] max-w-[380px] h-[70vh] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">spa</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Wings Resort Concierge</p>
              <p className="text-[11px] text-white/75">{typing ? 'typing…' : 'Online'}</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10">
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#ece5dd]" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                    m.from === 'user' ? 'bg-[#dcf8c6] text-[#111b21] rounded-tr-sm' : 'bg-white text-[#111b21] rounded-tl-sm'
                  }`}
                >
                  {m.text}
                  <span className="block mt-1 text-[10px] text-[#6f797a] text-right">{m.time}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f797a] animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f797a] animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f797a] animate-bounce" />
                </div>
              </div>
            )}

            {!typing && fallbackCta && step === 'idle' && (
              <div className="flex justify-start">
                <a
                  href={fallbackWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setFallbackCta(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-sm hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Chat on WhatsApp
                </a>
              </div>
            )}

            {/* Guided booking widgets */}
            {!typing && step === 'phone' && <PhoneEntry onSubmit={handlePhoneWidgetSubmit} />}
            {!typing && step === 'checkin' && <MiniCalendar minDate={toISO(new Date())} onSelect={handleCheckIn} />}
            {!typing && step === 'checkout' && (
              <MiniCalendar minDate={draft.checkIn ? addDays(draft.checkIn, 1) : toISO(new Date())} onSelect={handleCheckOut} />
            )}
            {!typing && step === 'guests' && (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleGuests(n)}
                    className="px-3.5 py-2 rounded-full bg-white border border-[#e4e2df] text-xs font-semibold text-[#111b21] hover:bg-[#dcf8c6] transition-colors shadow-sm"
                  >
                    {n}{n === 6 ? '+' : ''} Guest{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            )}
            {!typing && step === 'summary' && (
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#e4e2df] space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#075E54] mb-1">Booking Enquiry</p>
                <p className="text-xs text-[#111b21]"><strong>Name:</strong> {draft.name}</p>
                <p className="text-xs text-[#111b21]"><strong>WhatsApp:</strong> {draft.phone}</p>
                <p className="text-xs text-[#111b21]"><strong>Check-in:</strong> {draft.checkIn && formatDisplay(draft.checkIn)}</p>
                <p className="text-xs text-[#111b21]"><strong>Check-out:</strong> {draft.checkOut && formatDisplay(draft.checkOut)}</p>
                <p className="text-xs text-[#111b21]"><strong>Guests:</strong> {draft.guests}</p>
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">event_available</span>
                  Book Now
                </button>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 px-3 pt-2 bg-[#ece5dd] shrink-0">
              {quickReplies.map((label) => (
                <button
                  key={label}
                  onClick={() => handleQuickReply(label)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#e4e2df] text-[11px] font-semibold text-[#075E54] hover:bg-[#dcf8c6] transition-colors shadow-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 px-3 py-3 bg-[#f0f2f1] border-t border-[#e4e2df] shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                step === 'name' ? 'Type your name…' : step === 'phone' ? 'Type your WhatsApp number…' : 'Type a message…'
              }
              className="flex-1 min-w-0 rounded-full bg-white border border-[#e4e2df] px-4 py-2.5 text-xs text-[#111b21] focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-10 h-10 shrink-0 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
