import React from 'react';
import { WeddingData } from '../types/wedding';
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { RoyalDivider, MonogramBadge } from './JaaliDecor';

interface HeroInvitationProps {
  data: WeddingData;
  onOpenInvitation: () => void;
  isOpened: boolean;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({
  data,
  onOpenInvitation,
  isOpened,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 sm:py-16 md:py-20 overflow-hidden bg-jaali-subtle">
      {/* Decorative Corner Ornaments scaled for mobile */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 md:w-28 md:h-28 border-t-2 border-l-2 border-gold-400/50 pointer-events-none" />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 md:w-28 md:h-28 border-t-2 border-r-2 border-gold-400/50 pointer-events-none" />
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 md:w-28 md:h-28 border-b-2 border-l-2 border-gold-400/50 pointer-events-none" />
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 md:w-28 md:h-28 border-b-2 border-r-2 border-gold-400/50 pointer-events-none" />

      {/* Main Royal Arch Invitation Card */}
      <div className="w-full max-w-2xl relative">
        {/* Outer Shadow & Glow */}
        <div className="absolute -inset-1 rounded-t-[140px] sm:rounded-t-[160px] md:rounded-t-[220px] rounded-b-3xl bg-gradient-to-b from-gold-300/40 via-gold-500/20 to-burgundy-900/10 blur-sm pointer-events-none" />

        <div className="relative bg-cream-50 rounded-t-[135px] sm:rounded-t-[155px] md:rounded-t-[215px] rounded-b-3xl border border-gold-400/60 shadow-royal overflow-hidden p-5 sm:p-10 md:p-14 text-center">
          {/* Inner Double Inset Border */}
          <div className="absolute inset-2 sm:inset-4 rounded-t-[125px] sm:rounded-t-[145px] md:rounded-t-[205px] rounded-b-2xl border border-gold-300/40 pointer-events-none" />

          {/* Top Traditional Invocation */}
          <div className="pt-4 sm:pt-6 md:pt-10 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm md:text-base font-serif tracking-widest text-gold-700 font-medium">
              {data.invocation}
            </span>
          </div>

          {/* Royal Monogram Medallion */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative group">
              <MonogramBadge initials={data.monogram} size="lg" />
              <div className="absolute -top-1 -right-1 text-gold-500">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Invitation Lead Text */}
          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
            <p className="font-script-accent text-xl sm:text-2xl md:text-3xl text-gold-700">
              The Royal Wedding of
            </p>
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-charcoal-800/60 max-w-md mx-auto leading-relaxed px-2 sm:px-0">
              Together with their families, cordially invite you to celebrate
            </p>
          </div>

          {/* Couple High Contrast Names */}
          <div className="py-2 sm:py-4 my-1 sm:my-2">
            <h1 className="font-serif-royal text-3xl sm:text-5xl md:text-7xl font-light text-burgundy-900 tracking-tight leading-tight break-words">
              <span>{data.brideName}</span>
              <span className="block font-script-accent text-2xl sm:text-4xl md:text-5xl text-gold-600 my-1 font-normal">
                &
              </span>
              <span>{data.groomName}</span>
            </h1>
          </div>

          <RoyalDivider />

          {/* Wedding Date & City */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-charcoal-800">
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-base font-serif tracking-wide text-burgundy-900">
              <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span className="font-semibold">{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[11px] sm:text-sm font-sans tracking-wider uppercase text-charcoal-800/70">
              <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span>{data.primaryVenue}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-gold-800 font-sans tracking-widest uppercase">
              {data.venueCity}
            </p>
          </div>

          {/* Royal Call to Action Button */}
          <div className="pt-2 pb-3 sm:pb-4">
            <button
              onClick={onOpenInvitation}
              aria-label="Open Royal Wedding Invitation"
              className="relative inline-flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-burgundy-gradient text-gold-200 font-serif tracking-wider text-sm sm:text-base md:text-lg shadow-royal hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gold-400/40 group min-h-[44px]"
            >
              <span className="font-medium">
                {isOpened ? 'Explore Festivities' : 'Open Royal Invitation'}
              </span>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transition-transform duration-500 ${
                  isOpened ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>
          </div>

          {/* Subtle note */}
          <p className="text-[11px] font-sans tracking-wider text-charcoal-800/50 uppercase mt-3">
            Swipe or click to view events & RSVP
          </p>
        </div>
      </div>
    </section>
  );
};
