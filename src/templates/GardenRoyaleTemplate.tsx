import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { Calendar, MapPin, ChevronDown, Flower2, Heart } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface GardenRoyaleTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const GardenRoyaleTemplate: React.FC<GardenRoyaleTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C3B34] selection:bg-[#4A6B5D] selection:text-white">
      {/* 1. Airy Botanical Garden Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden bg-botanical-sage">
        {/* Soft Organic Vignettes */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#E8D2CB]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#CCDCD2]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Botanical Border Frame */}
        <div className="absolute inset-2 sm:inset-8 border border-[#4A6B5D]/30 rounded-2xl sm:rounded-3xl pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#E8D2CB] rounded-xl sm:rounded-2xl pointer-events-none" />

        <div className="w-full max-w-3xl bg-[#FAF7F2]/90 backdrop-blur-md rounded-2xl border border-[#4A6B5D]/20 shadow-xl p-4 sm:p-14 text-center relative z-10">
          {/* Floral Wreath Monogram */}
          <div className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E5EDE8] border border-[#4A6B5D]/40 flex items-center justify-center text-[#4A6B5D] shadow-sm mb-2 relative">
              <Flower2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#4A6B5D]" />
              <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-[#4A6B5D] text-white text-[9px] font-serif font-bold uppercase tracking-wider">
                {data.monogram}
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#4A6B5D] font-medium">
              {data.invocation}
            </span>
          </div>

          <p className="font-script-accent text-2xl sm:text-4xl text-[#4A6B5D] mb-1">
            A Garden Celebration of Love
          </p>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#2C3B34]/60 font-light mb-4 sm:mb-6">
            Together with their families invite you to share the joy of
          </p>

          {/* Couple Names */}
          <div className="my-4 sm:my-6 py-3 sm:py-4 border-y border-[#4A6B5D]/20">
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-light text-[#233930] tracking-tight break-words">
              {data.brideName}
            </h1>
            <span className="font-script-accent text-xl sm:text-3xl text-[#AF7565] my-1 block">
              &amp;
            </span>
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-light text-[#233930] tracking-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Date & Garden Venue */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 font-serif text-xs sm:text-base text-[#2C3B34]">
            <div className="flex items-center justify-center space-x-2 text-[#4A6B5D] font-semibold">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A6B5D]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#2C3B34]/70 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4A6B5D]" />
              <span>The Crescent Lawns • {data.venueCity}</span>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#4A6B5D] text-white font-serif text-xs sm:text-sm tracking-wider uppercase font-medium hover:bg-[#365346] shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>Explore The Garden Festivities</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Botanical Story Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#4A6B5D] font-semibold mb-2">
            <Flower2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Under Marigolds &amp; Jasmine</span>
            <Flower2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#233930] mb-4 sm:mb-6 break-words">
            A Blooming Union in the City of Lakes
          </h2>
          {/* Romantic Botanical Portrait Feature */}
          <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#CCDCD2] shadow-md mb-8 sm:mb-12">
            <RoyalImage
              src={data.gallery[1]?.src || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
              alt="Garden Celebration portrait"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {data.story.map((chapter) => (
              <div
                key={chapter.title}
                className="p-4 sm:p-6 rounded-2xl bg-white border border-[#CCDCD2] shadow-sm hover:border-[#4A6B5D] transition-colors"
              >
                <div className="flex items-center space-x-1.5 text-xs font-serif font-bold text-[#4A6B5D] mb-2 sm:mb-3">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E8D2CB] text-[#4A6B5D]" />
                  <span>{chapter.year}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#233930] mb-1.5 sm:mb-2">{chapter.title}</h3>
                <p className="text-xs text-[#2C3B34]/80 leading-relaxed font-sans font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown in Sage */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          variant="charcoal"
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
