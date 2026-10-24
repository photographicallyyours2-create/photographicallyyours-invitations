import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, ChevronDown, Compass, Sun } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface DesertRoyaleTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const DesertRoyaleTemplate: React.FC<DesertRoyaleTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F8F3EA] text-[#3A2E2B] selection:bg-[#C86D51] selection:text-white">
      {/* 1. Sandstone & Sunset Fortress Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden bg-sandstone-warm">
        {/* Golden Hour Sun Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E09F67]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Rajput Stepped Architectural Stone Frame */}
        <div className="absolute inset-2 sm:inset-8 border-2 border-[#C86D51]/40 rounded-2xl pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#E09F67]/30 pointer-events-none" />

        <div className="w-full max-w-3xl bg-[#FAF5EE]/95 rounded-2xl border border-[#C86D51]/30 shadow-2xl p-4 sm:p-14 text-center relative z-10">
          {/* Fortress Stepped Sun Emblem */}
          <div className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F0E6D8] border border-[#C86D51]/50 flex items-center justify-center text-[#C86D51] shadow-sm mb-2 transform rotate-45">
              <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-[#C86D51] transform -rotate-45" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#C86D51] font-semibold mt-3">
              {data.invocation}
            </span>
          </div>

          <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#8D493A] font-medium mb-2 sm:mb-3">
            Under Rajasthan's Golden Skies
          </p>

          <h2 className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3A2E2B]/70 font-light mb-4 sm:mb-6">
            The Royal Nuptials of
          </h2>

          {/* Couple Names */}
          <div className="my-4 sm:my-6 py-4 sm:py-6 border-y-2 border-[#E09F67]/50">
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-normal text-[#733320] tracking-tight break-words">
              {data.brideName}
            </h1>
            <div className="flex items-center justify-center space-x-3 my-1.5 sm:my-2 text-[#C86D51]">
              <div className="h-[1px] w-8 sm:w-12 bg-[#E09F67]" />
              <span className="font-script-accent text-2xl sm:text-4xl text-[#C86D51]">with</span>
              <div className="h-[1px] w-8 sm:w-12 bg-[#E09F67]" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-normal text-[#733320] tracking-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Date & Fortress Location */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 font-serif text-xs sm:text-base text-[#3A2E2B]">
            <div className="flex items-center justify-center space-x-2 text-[#C86D51] font-semibold">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C86D51]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#3A2E2B]/70 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C86D51]" />
              <span>Heritage Bastions &amp; Courtyards • {data.venueCity}</span>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#C86D51] text-white font-serif text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase font-semibold hover:bg-[#B0583D] shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
          >
            <span>Enter The Desert Festivities</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Desert Story Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C86D51] font-semibold mb-2">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Vows Under the Sunset Skies</span>
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#733320] mb-4 sm:mb-6 break-words">
            Timeless Sandstone, Eternal Devotion
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#3A2E2B]/90 italic max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
            "{data.welcomeNote}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {data.story.map((chapter) => (
              <div
                key={chapter.title}
                className="p-4 sm:p-6 rounded-2xl bg-[#FAF5EE] border border-[#E09F67]/50 shadow-sm hover:border-[#C86D51] transition-colors"
              >
                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#C86D51] bg-[#F0E6D8] px-2.5 py-1 rounded-full inline-block mb-3">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#733320] mb-1.5 sm:mb-2">{chapter.title}</h3>
                <p className="text-xs text-[#3A2E2B]/80 leading-relaxed font-sans font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown in Terracotta */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          variant="sandstone"
          locationHint={`${data.primaryVenue} • ${data.venueCity}`}
        />

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
