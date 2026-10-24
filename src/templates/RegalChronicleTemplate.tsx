import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { Shield, Crown, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface RegalChronicleTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const RegalChronicleTemplate: React.FC<RegalChronicleTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#070D18] text-[#F3F5F9] selection:bg-[#D4AF37] selection:text-[#070D18]">
      {/* 1. Stately Symmetrical Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-12 text-center bg-radial-at-c from-[#0E1E38] via-[#070D18] to-[#040810] overflow-hidden">
        {/* Subtle Gold Stars / Constellations Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Bilateral Architectural Gold Framing */}
        <div className="absolute inset-2 sm:inset-8 border border-[#D4AF37]/30 pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#D4AF37]/15 pointer-events-none" />

        <div className="w-full max-w-4xl relative z-10 py-6 sm:py-12 px-3 sm:px-8">
          {/* Imperial Crest Monogram */}
          <div className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] bg-[#0A1526] flex items-center justify-center text-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.25)] relative mb-3">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />
              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#070D18] font-serif font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">
                {data.monogram}
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#D4AF37]/80">
              {data.invocation}
            </span>
          </div>

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-300 mb-3 sm:mb-4 font-light">
            Solemn Imperial Proclamation of Matrimony
          </p>

          {/* Symmetrical Names */}
          <div className="my-5 sm:my-8">
            <h1 className="font-serif-royal text-3xl sm:text-7xl font-extralight tracking-wider sm:tracking-widest text-white uppercase break-words leading-tight sm:leading-none">
              {data.brideName}
            </h1>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-2 sm:my-3 text-[#D4AF37]">
              <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-7xl font-extralight tracking-wider sm:tracking-widest text-white uppercase break-words leading-tight sm:leading-none">
              {data.groomName}
            </h1>
          </div>

          {/* Date & Location */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-10 text-slate-300 font-serif">
            <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-sm sm:text-base tracking-wider sm:tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-slate-400 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Proclamation CTA */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#ECC870] to-[#A98338] text-[#070D18] font-serif text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all inline-flex items-center space-x-2 transform hover:-translate-y-0.5"
          >
            <span>Read The Imperial Chronicle</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef} className="bg-cream-100 text-charcoal-800">
        {/* Ceremonial Narrative */}
        <section className="py-12 sm:py-20 px-4 max-w-4xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            The Stately Union
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#0A1526] mb-4 sm:mb-6 break-words">
            A Union of Lineage, Honor & Devotion
          </h2>
          <p className="font-serif text-sm sm:text-lg text-charcoal-800/90 italic max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            "{data.welcomeNote}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs font-sans text-charcoal-800/80 max-w-xl mx-auto border-t border-b border-gold-300/40 py-3 sm:py-4 mb-8 sm:mb-12">
            <div>
              <span className="font-semibold block text-burgundy-900">{data.parentsBride}</span>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gold-300/40 pt-2 md:pt-0">
              <span className="font-semibold block text-burgundy-900">{data.parentsGroom}</span>
            </div>
          </div>
        </section>

        {/* Auspicious Countdown */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          variant="navy"
          locationHint={`${data.primaryVenue} • ${data.venueCity}`}
        />

        {/* Multi-Day Events */}
        <EventsSchedule events={data.events} />

        {/* Gallery */}
        <PhotoGallery photos={data.gallery} />

        {/* RSVP Form */}
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
