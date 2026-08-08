import React, { useEffect, useRef, useState } from 'react';
import { NEARBY_ATTRACTIONS } from '../data/attractionsData';
import { getDirectionsUrl } from '../utils/directions';
import SplitText from './SplitText';
import BlurText from './BlurText';

const INITIAL_VISIBLE_COUNT = 8;
const CLOSEST_COUNT = 3;
const CARDS_PER_ROW = 4;

export const NearbyAttractionsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const sorted = [...NEARBY_ATTRACTIONS].sort((a, b) => a.distanceKm - b.distanceKm);
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards: HTMLElement[] = Array.from(grid.querySelectorAll('[data-attraction-card]'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).getAttribute('data-attraction-card');
          if (id) {
            setRevealedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, [visible.length]);

  return (
    <section className="bg-[#f5f3f0] px-5 py-16 md:px-12 md:py-20 border-y border-[#e4e2df]/60">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-4 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f06c52]">Ooty, Tamil Nadu</p>
          <SplitText
            text="Nearby Attractions"
            tag="h2"
            splitType="words"
            delay={40}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.15}
            rootMargin="-80px"
            textAlign="center"
            className="font-headline text-3xl text-[#004449] sm:text-4xl"
          />
          <BlurText
            text="Explore the beauty and attractions of Ooty, all within easy reach of your stay."
            animateBy="words"
            direction="top"
            delay={30}
            className="mx-auto mt-3 max-w-xl justify-center text-sm leading-relaxed text-[#3f4849]"
          />
        </div>

        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[#004449] shadow-sm">
            <span className="material-symbols-outlined text-sm text-[#f06c52]">location_on</span>
            Distance from Cottage — Wings Resort, Ooty
          </span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((attraction, index) => {
            const isClosest = index < CLOSEST_COUNT;
            const isRevealed = revealedIds.has(attraction.id);
            const positionInRow = index % CARDS_PER_ROW;
            return (
              <div
                key={attraction.id}
                data-attraction-card={attraction.id}
                style={{ transitionDelay: isRevealed ? `${positionInRow * 90}ms` : '0ms' }}
                className={`attraction-card hover-lift flex flex-col overflow-hidden rounded-3xl bg-white soft-shadow ${
                  index % 2 === 1 ? 'from-right' : ''
                } ${isRevealed ? 'is-visible' : ''} ${isClosest ? 'ring-1 ring-[#f06c52]/40' : ''}`}
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#004449] to-[#0e5d63]">
                  {attraction.image ? (
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-6xl text-white/25">{attraction.icon}</span>
                  )}
                  {attraction.image && <div className="absolute inset-0 bg-gradient-to-t from-[#00201f]/55 via-transparent to-transparent" />}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#004449] backdrop-blur-sm">
                    {attraction.category}
                  </span>
                  {isClosest && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#f06c52] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Closest
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-headline text-base text-[#004449] leading-snug">{attraction.name}</h3>

                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#3f4849]">
                    <span className="material-symbols-outlined text-base text-[#f06c52]">near_me</span>
                    {attraction.distanceKm} km{attraction.walkingTime ? ` · ${attraction.walkingTime}` : ''}
                  </p>

                  <a
                    href={getDirectionsUrl(attraction.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#004449] px-4 py-2 text-xs font-semibold text-[#004449] transition-colors hover:bg-[#004449] hover:text-white"
                  >
                    View Location <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {NEARBY_ATTRACTIONS.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-[#004449] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#0e5d63]"
            >
              {showAll ? 'Show Fewer' : `View All ${NEARBY_ATTRACTIONS.length} Attractions`}
              <span className="material-symbols-outlined text-base">{showAll ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
