import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface FloralMinimalTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const FloralMinimalTemplate: React.FC<FloralMinimalTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFAF7] text-[#4A3F3B] selection:bg-[#C49486] selection:text-white font-sans">
      {/* 1. Delicate Line-Art Minimalist Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-12 md:p-16 text-center">
        {/* Subtle Botanical Line Drawing in Background */}
        <div className="w-full max-w-2xl py-6 sm:py-12 px-3 sm:px-8">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#C49486] font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 text-[#C49486]" />
            <span>{data.invocation}</span>
            <Sparkles className="w-3 h-3 text-[#C49486]" />
          </div>

          <p className="font-serif italic text-sm sm:text-lg text-[#4A3F3B]/70 mb-2 sm:mb-4">
            Together with their families
          </p>

          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#4A3F3B]/60 font-light mb-6 sm:mb-8">
            request the pleasure of your company at the wedding of
          </p>

          {/* Names in Ultra-Refined Serif */}
          <div className="my-5 sm:my-8 py-3 sm:py-4 border-t border-b border-[#4A3F3B]/10">
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-[#2A2421] tracking-normal leading-tight break-words">
              {data.brideName}
            </h1>
            <span className="font-script-accent text-2xl sm:text-4xl text-[#C49486] my-1 sm:my-2 block">
              and
            </span>
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-[#2A2421] tracking-normal leading-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Date & Location */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-10 font-serif text-xs sm:text-sm text-[#4A3F3B]/80">
            <div className="flex items-center justify-center space-x-2 text-[#4A3F3B] tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#C49486]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-[#4A3F3B]/60 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C49486]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-8 py-3 rounded-full border border-[#4A3F3B]/30 text-[#4A3F3B] text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium hover:bg-[#C49486] hover:text-white hover:border-[#C49486] transition-all inline-flex items-center space-x-2"
          >
            <span>View Invitation</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef} className="bg-[#FAF7F2]">
        {/* Minimal Narrative Spread */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#C49486] font-semibold block mb-2">
            The Union
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2A2421] font-light mb-4 sm:mb-6 break-words">
            A Quiet Promise in Udaipur
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#4A3F3B]/90 italic leading-relaxed mb-8 sm:mb-12">
            "{data.welcomeNote}"
          </p>

          <div className="space-y-4 sm:space-y-8 text-left">
            {data.story.map((chapter) => (
              <div key={chapter.title} className="p-4 sm:p-6 bg-white border border-[#4A3F3B]/10 rounded-xl shadow-xs">
                <span className="font-serif text-[11px] sm:text-xs text-[#C49486] uppercase tracking-wider sm:tracking-widest font-semibold block mb-1">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#2A2421] mb-1.5 sm:mb-2">{chapter.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-[#4A3F3B]/80 leading-relaxed font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown */}
        <div className="bg-[#4A3F3B]">
          <CountdownTimer targetDateIso={data.weddingDateIso} />
        </div>

        {/* Multi-Day Events */}
        <EventsSchedule events={data.events} />

        {/* Photography Gallery */}
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
