import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Transcribed verbatim from real, unedited Google review screenshots (see `screenshot` for the source
// image — kept so a guest can click through and verify the quote themselves). Names are shown exactly
// as the reviewer's public Google display name; wording is untouched, including minor grammar quirks.
interface GoogleReview {
  name: string;
  quote: string;
  timeAgo: string;
  rating: number;
  screenshot: string;
  avatarColor: string;
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: 'Pavan Pavan',
    quote: 'Very good place and nice location but the parking is only the little bit problem.',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_one.png',
    avatarColor: '#8e44ad',
  },
  {
    name: 'Shalik S.',
    quote:
      "Very good support..... even we're very late night to came to the resort... best rooms.... nice management support.... and the manager Mr. Christopher quick response for all the time.",
    timeAgo: '6 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_two.png',
    avatarColor: '#0f9d8b',
  },
  {
    name: 'Pushyami Pathi',
    quote: 'Check in was smooth and service was the best. Umar and Ryan helped us a lot.',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_three.png',
    avatarColor: '#c2185b',
  },
  {
    name: 'John Jabes',
    quote: "I Really loved this resort nd service's, This place are very affordable nd safe resort i loved it 😊💙",
    timeAgo: '3 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_four.png',
    avatarColor: '#004449',
  },
  {
    name: 'Mahesh Mahesh',
    quote: 'Experiences very quantity rooms Good...budget wise u think very happy and safe and secure.',
    timeAgo: '5 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_five.png',
    avatarColor: '#ad1457',
  },
  {
    name: 'Sreekuttan Sivan',
    quote: 'Very friendly communication. Super location and very good rooms.',
    timeAgo: 'a month ago',
    rating: 4,
    screenshot: 'wings_resort_google_review_six.png',
    avatarColor: '#a93721',
  },
  {
    name: 'R Sai Pranav',
    quote:
      'The stay was peaceful and beautiful, and we enjoyed every moment. The firecamp was a memorable experience, though it would have been even better if it was included in the service, as travellers usually expect it.',
    timeAgo: '8 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_seven.png',
    avatarColor: '#f06c52',
  },
  {
    name: 'Zaithun Bee',
    quote: "I love it very much 💞 It's very comfortable place and very peaceful.",
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_eight.png',
    avatarColor: '#1a73e8',
  },
  {
    name: 'Naveen Prabhu',
    quote: 'Awesome n mesmerizing place ,.... Never expected for a such beautiful accommodation thanks too wings resort... 🤩👍👍👍👍',
    timeAgo: '5 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_nine.png',
    avatarColor: '#e8710a',
  },
  {
    name: 'Mohammed Riyaz',
    quote:
      'We had stayed 3 days with my friends in Wings Resort, Ooty. We experienced a calm and peaceful stay for all days. Since we had stayed 3 days they gave us a free fire camp with DJ for a day. Highly recommend to stay here.',
    timeAgo: 'a year ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_ten.png',
    avatarColor: '#8fd2d8',
  },
  {
    name: 'Sangram Kishore Das',
    quote: 'Awesome service and rooms. Recommend for budget stay.',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_eleven.png',
    avatarColor: '#00897b',
  },
  {
    name: 'Arshu 213',
    quote:
      'Hi, We have choose wooden house. The room was spacious and comfortable. Staffs were very friendly and good services provided. They provided tooth kit, blankets and extra towel. 24 hours of heat water was available, noise free even it is located in the city, room was clean and neat. I recommend this for everyone, especially for couples.',
    timeAgo: 'a year ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_tweleve.png',
    avatarColor: '#6d4c41',
  },
  {
    name: 'Bhatsha',
    quote:
      'The stay at wings resort was a splendid, I went with my family and stayed their for 2 days. The caretaker is such a good person he is very cooperative and helpful, we had all our meals cooked by their room service staff and it was very tasty. The cottage rooms and bathroom is very clean and well maintained.',
    timeAgo: '2 years ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_thirteen.png',
    avatarColor: '#004449',
  },
  {
    name: 'Quinn Wanda',
    quote: 'Such a beautiful place and service also good... Servant behavior also polite and good...',
    timeAgo: '4 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_fourteen.png',
    avatarColor: '#8e44ad',
  },
  {
    name: 'Babu V',
    quote:
      'We came Ooty for family trip with aged people and kids, the rooms were clean and stay was very comfortable..!!!!! The food was also very good and on-time.. We enjoyed our time… Thanking them for the care taking….',
    timeAgo: '6 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_fifteen.png',
    avatarColor: '#607d8b',
  },
  {
    name: 'Vengad',
    quote: 'We booked 2 days in Wings resort. Location, rooms and service are good. This is good for family stay.',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_fsixteen.png',
    avatarColor: '#f06c52',
  },
  {
    name: 'Nithish. S',
    quote: 'One of the best place for stays and good location with good amenities and the service is awesome with friendly staffs … Highly recommended…',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_seventeen.png',
    avatarColor: '#a93721',
  },
  {
    name: 'Mahasarvesh Sarvesh',
    quote: 'Very good property with good ambience with extrodinary services provided by umar, rayan and nithish. Highly recommend for families and couples with attractive location.',
    timeAgo: '2 months ago',
    rating: 5,
    screenshot: 'wings_resort_google_review_eightteen.png',
    avatarColor: '#5c6bc0',
  },
];

const AUTO_ADVANCE_MS = 3000;

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="text-[#f0b429]" aria-label={`${rating} out of 5 stars`}>
    {'★'.repeat(rating)}
    <span className="text-[#e4e2df]">{'★'.repeat(5 - rating)}</span>
  </span>
);

export const GoogleReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = GOOGLE_REVIEWS.length;
  const current = GOOGLE_REVIEWS[activeIndex];

  // Auto-advance every 3s; pauses while a visitor is looking at the card or has the lightbox open.
  useEffect(() => {
    if (isHovered || lightboxOpen) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [isHovered, lightboxOpen, total]);

  const goTo = useCallback((i: number) => setActiveIndex((i + total) % total), [total]);
  const step = useCallback((delta: number) => goTo(activeIndex + delta), [activeIndex, goTo]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, step]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#d9f1f0] px-5 pb-14 pt-14 md:px-12 md:pb-16 md:pt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative palm leaves, matching the rest of the site's "reviews" styling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 bottom-0 h-64 w-64 opacity-15">
          <span className="material-symbols-outlined text-[200px] text-[#004449]">forest</span>
        </div>
        <div className="absolute -right-8 bottom-0 h-72 w-72 rotate-12 opacity-15">
          <span className="material-symbols-outlined text-[220px] text-[#a93721]">forest</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-8 flex max-w-[1100px] items-center justify-center gap-1.5">
        <span className="text-base font-bold text-[#4285F4]">G</span>
        <span className="text-base font-bold text-[#EA4335]">o</span>
        <span className="text-base font-bold text-[#FBBC05]">o</span>
        <span className="text-base font-bold text-[#4285F4]">g</span>
        <span className="text-base font-bold text-[#34A853]">l</span>
        <span className="text-base font-bold text-[#EA4335]">e</span>
        <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a93721]">Verified Reviews</span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-start gap-8 lg:flex-row lg:gap-12">
        {/* Quote block — fixed height so swapping reviews never reflows the section or shifts the avatar grid */}
        <div className="flex w-full flex-col items-start lg:w-1/2">
          <span className="material-symbols-outlined mb-2 text-5xl text-[#004449]/30">format_quote</span>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex min-h-[9rem] w-full max-w-xl items-start text-left focus:outline-none sm:min-h-[10.5rem]"
            aria-label="View the original Google review screenshot"
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-headline line-clamp-4 text-xl font-medium italic leading-relaxed text-[#004449] transition-colors hover:text-[#0e5d63] sm:text-2xl"
              >
                "{current.quote}"
              </motion.blockquote>
            </AnimatePresence>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-[#a93721]" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#004449]">{current.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#a93721]">
                  Google Review • {current.timeAgo} • <Stars rating={current.rating} />
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Avatar gallery — auto-advances, click to jump directly to a review */}
        <div className="flex w-full flex-wrap justify-center gap-3 lg:w-1/2 lg:justify-end">
          {GOOGLE_REVIEWS.map((review, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={review.name}
                onClick={() => goTo(idx)}
                aria-label={`Show review from ${review.name}`}
                className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] transition-all duration-300 sm:h-14 sm:w-14 ${
                  isActive ? 'scale-110 border-[#004449] shadow-lg' : 'border-white opacity-60 hover:opacity-100'
                }`}
              >
                <span
                  className="flex h-full w-full items-center justify-center font-headline text-base font-bold text-white sm:text-lg"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.name.trim().charAt(0)}
                </span>
                {isActive && (
                  <motion.svg
                    className="absolute -inset-1"
                    viewBox="0 0 100 100"
                    initial={{ rotate: -90 }}
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="#a93721"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 47}
                      initial={{ strokeDashoffset: 2 * Math.PI * 47 }}
                      animate={isHovered || lightboxOpen ? {} : { strokeDashoffset: 0 }}
                      transition={isHovered || lightboxOpen ? { duration: 0 } : { duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                      key={`${activeIndex}-${isHovered}-${lightboxOpen}`}
                    />
                  </motion.svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox: the actual Google screenshot behind the quote, for full verification/detail */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Original Google review"
          >
            <motion.div
              key={current.screenshot}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#1b1c1a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/${current.screenshot}`}
                alt={`Original Google review from ${current.name}`}
                className="max-h-[85vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous review"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next review"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                {activeIndex + 1} / {total}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GoogleReviewsSection;
