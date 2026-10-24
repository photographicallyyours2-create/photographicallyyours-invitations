import React from 'react';
import { WeddingData } from '../types/wedding';
import { RoyalDivider } from './JaaliDecor';
import { Heart, Sparkles } from 'lucide-react';

export const WelcomeStory: React.FC<{ data: WeddingData }> = ({ data }) => {
  return (
    <section id="story-section" className="py-14 sm:py-20 px-3 sm:px-6 md:px-8 max-w-5xl mx-auto">
      {/* Formal Royal Invitation Welcome Card */}
      <div className="bg-cream-50 border border-gold-300/60 rounded-2xl sm:rounded-3xl p-5 sm:p-12 md:p-16 shadow-royal mb-14 sm:mb-20 text-center relative overflow-hidden">
        {/* Subtle Arch Decor Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gold-400/50 rounded-b-full" />

        <div className="flex justify-center items-center space-x-2 text-gold-600 mb-2 sm:mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold">
            In Celebration of Love
          </span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 mb-4 sm:mb-6 font-normal break-words">
          A Royal Union of Hearts & Heritage
        </h2>

        {/* Parents' Section */}
        <div className="max-w-2xl mx-auto my-4 sm:my-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm font-sans tracking-wide text-charcoal-800/80 border-y border-gold-300/40 py-4 sm:py-6">
          <div className="px-2 sm:px-3">
            <span className="block font-serif text-sm sm:text-base font-semibold text-burgundy-950 mb-1">
              The Singhania Family
            </span>
            <p className="italic text-charcoal-800/70">{data.parentsBride}</p>
          </div>
          <div className="px-2 sm:px-3 border-t md:border-t-0 md:border-l border-gold-300/40 pt-3 md:pt-0">
            <span className="block font-serif text-sm sm:text-base font-semibold text-burgundy-950 mb-1">
              The Rathore Family
            </span>
            <p className="italic text-charcoal-800/70">{data.parentsGroom}</p>
          </div>
        </div>

        {/* Welcome message */}
        <div className="max-w-2xl mx-auto mt-4 sm:mt-6">
          <p className="font-serif text-base sm:text-xl text-charcoal-800/90 leading-relaxed italic">
            "{data.welcomeNote}"
          </p>
          <div className="mt-3 sm:mt-4 font-script-accent text-xl sm:text-3xl text-gold-700">
            With warmest love, {data.brideName} & {data.groomName}
          </div>
        </div>
      </div>

      {/* Couple Story Section */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-700 font-semibold font-sans">
          The Journey So Far
        </span>
        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 mt-1 mb-2 sm:mb-3 break-words">
          Our Story of Forever
        </h2>
        <p className="text-xs sm:text-base text-charcoal-800/70 max-w-lg mx-auto font-sans font-light">
          From a serendipitous monsoon afternoon in the Pink City to our vows under the Udaipur twilight.
        </p>
        <RoyalDivider />
      </div>

      {/* Story Timeline */}
      <div className="relative">
        {/* Timeline Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-300 -translate-x-1/2" />

        <div className="space-y-12 md:space-y-16">
          {data.story.map((chapter, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={chapter.title}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cream-50 border-2 border-gold-500 items-center justify-center text-gold-600 shadow-gold-subtle z-10">
                  <Heart className="w-3.5 h-3.5 fill-gold-500/20" />
                </div>

                {/* Content Box */}
                <div className="w-full md:w-1/2 p-4 md:p-8">
                  <div className="bg-cream-50/80 backdrop-blur-sm border border-gold-300/50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-gold-subtle transition-shadow duration-300">
                    {chapter.year && (
                      <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 font-serif text-xs font-semibold tracking-wider mb-3">
                        {chapter.year}
                      </span>
                    )}
                    <h3 className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 mb-3 font-semibold">
                      {chapter.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-charcoal-800/80 leading-relaxed font-light">
                      {chapter.text}
                    </p>
                  </div>
                </div>

                {/* Empty Half for balance on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
