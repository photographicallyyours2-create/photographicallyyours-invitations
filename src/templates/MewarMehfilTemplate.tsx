import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface MewarMehfilTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const MewarMehfilTemplate: React.FC<MewarMehfilTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollToFestivities = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFDF9] text-[#2A1E17] selection:bg-[#E67E22] selection:text-white">
      {/* 1. Hero: Miniature Painting Inspired Opening */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-8 md:p-12 overflow-hidden bg-[#FAF4EB]">
        {/* Rajasthani Miniature Floral Frame Borders */}
        <div className="absolute inset-1.5 sm:inset-6 border-2 sm:border-4 border-[#C53726] rounded-2xl sm:rounded-3xl pointer-events-none" />
        <div className="absolute inset-2.5 sm:inset-7 border border-[#D4AF37] rounded-xl sm:rounded-[22px] pointer-events-none" />

        {/* Traditional Corner Flower Medallions */}
        <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 text-[#C53726] text-sm sm:text-xl pointer-events-none">⚜️</div>
        <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 text-[#C53726] text-sm sm:text-xl pointer-events-none">⚜️</div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-5 sm:left-5 text-[#C53726] text-sm sm:text-xl pointer-events-none">⚜️</div>
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-5 sm:right-5 text-[#C53726] text-sm sm:text-xl pointer-events-none">⚜️</div>

        <div className="w-full max-w-3xl bg-[#FFFDF9] rounded-2xl border-2 border-[#D4AF37]/60 shadow-2xl p-4 sm:p-12 text-center relative z-10">
          {/* Invocation */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 rounded-full bg-[#FAF0E4] border border-[#E67E22]/50 text-[#C53726] text-[10px] sm:text-xs font-serif tracking-widest uppercase mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E67E22]" />
            <span>{data.invocation}</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E67E22]" />
          </div>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#0C4B35] font-semibold mb-2">
            The Rajasthani Wedding Festivities of
          </p>

          {/* Couple Names */}
          <div className="my-4 sm:my-6 py-3 sm:py-4 border-y-2 border-[#D4AF37]/40">
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-bold text-[#C53726] tracking-tight break-words">
              {data.brideName}
            </h1>
            <div className="flex items-center justify-center space-x-3 my-1.5 sm:my-2">
              <div className="h-[1px] w-8 sm:w-12 bg-[#E67E22]" />
              <span className="font-script-accent text-2xl sm:text-4xl text-[#E67E22]">weds</span>
              <div className="h-[1px] w-8 sm:w-12 bg-[#E67E22]" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-bold text-[#0C4B35] tracking-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Date & Location in Saffron & Emerald */}
          <div className="space-y-1.5 sm:space-y-2 my-4 sm:my-6 font-serif text-xs sm:text-base text-[#2A1E17]">
            <div className="flex items-center justify-center space-x-2 text-[#C53726] font-semibold">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E67E22]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#0C4B35] font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0C4B35]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Parents blessings */}
          <div className="max-w-xl mx-auto my-4 sm:my-6 text-[11px] sm:text-xs text-[#2A1E17]/80 italic border-t border-[#D4AF37]/30 pt-3 sm:pt-4">
            <p>{data.parentsBride}</p>
            <p className="mt-1">{data.parentsGroom}</p>
          </div>

          {/* CTA */}
          <button
            onClick={handleScrollToFestivities}
            className="mt-3 sm:mt-4 min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#C53726] via-[#E67E22] to-[#C53726] text-white font-serif text-xs sm:text-base tracking-wider font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
          >
            <span>Enter The Mehfil Festivities</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Welcome & Story Chapter */}
        <section className="py-12 sm:py-20 px-4 max-w-4xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E67E22] font-semibold block mb-2">
            Mewar Court Narrative
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#C53726] mb-4 sm:mb-6 break-words">
            Two Royal Clans, One Eternal Promise
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#2A1E17]/90 italic max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            "{data.welcomeNote}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {data.story.map((chapter) => (
              <div
                key={chapter.title}
                className="p-4 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E67E22]/40 shadow-sm hover:border-[#C53726] transition-colors"
              >
                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#0C4B35] bg-[#FAF0E4] px-2.5 py-1 rounded-full inline-block mb-3">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#C53726] mb-2">{chapter.title}</h3>
                <p className="text-xs text-[#2A1E17]/80 leading-relaxed font-sans font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown */}
        <div className="bg-[#0C4B35]">
          <CountdownTimer targetDateIso={data.weddingDateIso} />
        </div>

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
