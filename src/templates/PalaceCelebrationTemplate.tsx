import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { Sparkles, Calendar, MapPin, ChevronDown, Flame } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface PalaceCelebrationTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const PalaceCelebrationTemplate: React.FC<PalaceCelebrationTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#1C060B] text-[#FDF5E6] selection:bg-[#B38F4D] selection:text-[#1C060B]">
      {/* 1. Dramatic Velvet & Candlelit Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden bg-velvet-burgundy">
        {/* Subtle Candlelight & Chandelier Starlight Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ECC870]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#75172C]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Velvet Frame with Inset Gold Foil Lines */}
        <div className="absolute inset-2 sm:inset-8 border border-[#B38F4D]/40 rounded-2xl sm:rounded-3xl pointer-events-none shadow-2xl" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#B38F4D]/20 rounded-xl sm:rounded-2xl pointer-events-none" />

        <div className="w-full max-w-4xl relative z-10 py-6 sm:py-12 px-3 sm:px-10 text-center">
          {/* Invocation with Candle Emblem */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#340811]/80 border border-[#B38F4D]/60 text-[#ECC870] text-[10px] sm:text-xs font-serif tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6 shadow-lg">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ECC870] animate-pulse" />
            <span>{data.invocation}</span>
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ECC870] animate-pulse" />
          </div>

          <p className="font-serif text-[11px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#D4AF37]/90 font-light mb-3 sm:mb-4">
            Under Starlit Chandeliers &amp; Palace Arches
          </p>

          {/* Couple High Drama Titles */}
          <div className="my-5 sm:my-8 py-4 sm:py-6 border-y border-[#B38F4D]/30 relative">
            <h1 className="font-serif-royal text-4xl sm:text-7xl md:text-8xl font-normal text-[#FDF5E6] tracking-tight leading-tight sm:leading-none drop-shadow-md break-words">
              {data.brideName}
            </h1>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-2 sm:my-3 text-[#ECC870]">
              <div className="h-[1px] w-10 sm:w-24 bg-gradient-to-r from-transparent to-[#B38F4D]" />
              <span className="font-script-accent text-2xl sm:text-5xl text-[#ECC870] font-normal">
                and
              </span>
              <div className="h-[1px] w-10 sm:w-24 bg-gradient-to-l from-transparent to-[#B38F4D]" />
            </div>
            <h1 className="font-serif-royal text-4xl sm:text-7xl md:text-8xl font-normal text-[#FDF5E6] tracking-tight leading-tight sm:leading-none drop-shadow-md break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Date, Palace & City */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-10 text-[#FDF5E6]/90 font-serif">
            <div className="flex items-center justify-center space-x-2 text-sm sm:text-lg text-[#ECC870] tracking-wider sm:tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B38F4D]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] text-[#FDF5E6]/70 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38F4D]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#B38F4D] via-[#ECC870] to-[#A98338] text-[#1C060B] font-serif text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase font-semibold hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all inline-flex items-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Enter The Starlit Soirée</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C060B]" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef} className="bg-cream-100 text-charcoal-800">
        {/* Palace Celebration Story Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="flex items-center justify-center space-x-2 text-gold-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold">
                Grand Royal Hospitality
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#5E1924] mb-3 sm:mb-4 break-words">
              A Starlit Celebration of Two Dynasties
            </h2>
            <p className="font-serif text-sm sm:text-lg text-charcoal-800/90 italic max-w-2xl mx-auto leading-relaxed">
              "{data.welcomeNote}"
            </p>
          </div>

          {/* Visual Banquet Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#FAF6F0] p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-gold-300 shadow-royal mb-10 sm:mb-16">
            <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/5] border border-gold-400/50 shadow-md">
              <RoyalImage
                src={data.gallery[3]?.src || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                alt="Palace courtyard celebration"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            <div className="md:col-span-7 space-y-3 sm:space-y-4 text-left">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-800 font-sans font-semibold">
                The Heritage Banquet
              </span>
              <h3 className="font-serif-royal text-xl sm:text-3xl text-burgundy-900 font-semibold break-words">
                A Regal Journey Across Centuries
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
                From the arrival of the royal Baraat by vintage boat under twilight skies to starlit Pheras accompanied by traditional mangal vadya and Sufi musicians.
              </p>
              <div className="pt-2 border-t border-gold-300/40 text-[11px] sm:text-xs text-charcoal-800/80 italic">
                Hosted with royal love by {data.parentsBride} and {data.parentsGroom}
              </div>
            </div>
          </div>
        </section>

        {/* Auspicious Countdown */}
        <CountdownTimer targetDateIso={data.weddingDateIso} />

        {/* Multi-Day Events Schedule */}
        <EventsSchedule events={data.events} />

        {/* Pre-Wedding Photography Gallery */}
        <PhotoGallery photos={data.gallery} />

        {/* RSVP Section */}
        <RsvpSection data={data} />

        {/* Footer */}
        <Footer
          data={data}
          onOpenAdmin={onOpenAdmin}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  );
};
