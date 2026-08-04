import React from 'react';
import { JOURNAL_POSTS } from '../data/resortData';
import { JournalPost } from '../types';

interface JournalSectionProps {
  onSelectPost: (post: JournalPost) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectPost }) => {
  return (
    <section id="journal" className="py-24 md:py-32 bg-[#fbf9f6] px-5 md:px-12 border-t border-[#e4e2df]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#a93721]">auto_stories</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a93721]">
                Wings Journal
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#004449] font-medium">
              Stories of Design & Living
            </h2>
          </div>

          <p className="text-sm text-[#3f4849] max-w-md">
            Articles, inspiration, and insider guidance on tropical sanctuary living, botanical spa rituals, and island gastronomy.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-[#f5f3f0] rounded-3xl overflow-hidden soft-shadow border border-[#e4e2df] hover-lift cursor-pointer flex flex-col group"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#004449] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-[11px] text-[#a93721] font-semibold mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-headline text-2xl text-[#004449] font-semibold mb-2 group-hover:text-[#a93721] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-[#3f4849] leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#004449] group-hover:text-[#a93721] uppercase tracking-wider mt-auto">
                  Read Article
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
