import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface TimelessEditorialTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const TimelessEditorialTemplate: React.FC<TimelessEditorialTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0D0D0D] text-[#FFFFFF] selection:bg-[#FFFFFF] selection:text-[#0D0D0D] font-sans">
      {/* 1. Stark Black-and-White Monograph Hero */}
      <section className="relative min-h-screen flex flex-col justify-between p-4 sm:p-12 md:p-16 border-b border-white/20">
        {/* Monograph Top Index */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/60 border-b border-white/20 pb-3 sm:pb-4 gap-1 sm:gap-0">
          <span>MONOGRAPH VOL. I</span>
          <span>{data.weddingDateFormatted}</span>
          <span>UDAIPUR</span>
        </div>

        {/* Center Editorial Monolith */}
        <div className="my-6 sm:my-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white/50 block">
              {data.invocation}
            </span>

            <h1 className="font-serif text-3xl sm:text-7xl md:text-8xl font-light uppercase tracking-wider sm:tracking-widest leading-tight sm:leading-none text-white break-words">
              {data.brideName}
              <span className="block font-serif italic text-white/40 my-1.5 sm:my-2">&amp;</span>
              {data.groomName}
            </h1>

            <p className="font-serif italic text-sm sm:text-lg text-white/80 max-w-md leading-relaxed pt-1 sm:pt-2">
              "{data.welcomeNote}"
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/70">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-white/50" />
                <span>{data.weddingDateFormatted}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-white/50" />
                <span>{data.primaryVenue}</span>
              </div>
            </div>

            <div className="pt-3 sm:pt-6">
              <button
                onClick={handleScrollDown}
                className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-none border border-white text-white text-xs uppercase tracking-wider sm:tracking-[0.25em] font-medium hover:bg-white hover:text-black transition-all inline-flex items-center space-x-3"
              >
                <span>Read The Monograph</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grayscale Architectural Portrait */}
          <div className="lg:col-span-5 mt-4 sm:mt-0">
            <div className="relative aspect-[3/4] overflow-hidden grayscale contrast-125 border border-white/20 shadow-2xl">
              <RoyalImage
                src={data.gallery[0]?.src || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'}
                alt={`${data.brideName} and ${data.groomName}`}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-4 bg-black/80 backdrop-blur-sm p-2 sm:p-3 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-white/70 text-center border border-white/10">
                PLATE I • A &amp; V IN UDAIPUR
              </div>
            </div>
          </div>
        </div>

        {/* Footer Index Line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-[11px] text-white/50 tracking-wider sm:tracking-widest uppercase border-t border-white/20 pt-3 sm:pt-4 gap-1 sm:gap-0">
          <span>{data.parentsBride}</span>
          <span className="hidden sm:inline my-1 sm:my-0">•</span>
          <span>{data.parentsGroom}</span>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef} className="bg-[#141414] text-white">
        {/* Monograph Chapters */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/50 block mb-2">
              Chronicle
            </span>
            <h2 className="font-serif text-2xl sm:text-5xl text-white font-light uppercase tracking-wider sm:tracking-widest break-words">
              The Plates of Our Journey
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-8">
            {data.story.map((chapter, idx) => (
              <div key={chapter.title} className="p-4 sm:p-8 bg-[#0D0D0D] border border-white/15 rounded-none">
                <span className="text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] uppercase text-white/40 block mb-1.5 sm:mb-2">
                  PLATE 0{idx + 1} • {chapter.year}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl text-white mb-2 sm:mb-3 font-normal">{chapter.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Countdown */}
        <div className="bg-black border-y border-white/20">
          <CountdownTimer targetDateIso={data.weddingDateIso} />
        </div>

        {/* Events */}
        <div className="bg-[#141414]">
          <EventsSchedule events={data.events} />
        </div>

        {/* Photography */}
        <div className="grayscale">
          <PhotoGallery photos={data.gallery} />
        </div>

        {/* RSVP Form */}
        <div className="bg-[#0D0D0D]">
          <RsvpSection data={data} />
        </div>

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
