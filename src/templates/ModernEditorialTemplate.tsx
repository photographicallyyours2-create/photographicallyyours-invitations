import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface ModernEditorialTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const ModernEditorialTemplate: React.FC<ModernEditorialTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFFFF] text-[#141414] selection:bg-[#141414] selection:text-white font-sans">
      {/* 1. Magazine Cover Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between p-4 sm:p-12 md:p-16 border-b border-black/10">
        {/* Top Editorial Masthead */}
        <div className="border-b border-black pb-3 sm:pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-sans gap-1 sm:gap-0">
          <span>The Matrimonial Edition • Issue 01</span>
          <span className="font-serif italic capitalize tracking-normal text-sm sm:text-base">
            Udaipur, Rajasthan
          </span>
          <span>{data.weddingDateFormatted}</span>
        </div>

        {/* Center Editorial Layout: Oversized Headline & Portrait */}
        <div className="my-6 sm:my-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Headline Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B89B5E] font-semibold block">
              Editorial Feature
            </span>
            <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl font-normal leading-[0.95] tracking-tight text-black break-words">
              {data.brideName}
              <span className="block font-serif italic font-light text-black/60">&amp;</span>
              {data.groomName}
            </h1>

            <p className="font-sans text-xs sm:text-base text-black/70 max-w-lg leading-relaxed pt-1 sm:pt-2">
              "{data.welcomeNote}"
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-[11px] sm:text-xs uppercase tracking-wider font-medium text-black/80">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B5E]" />
                <span>{data.weddingDateFormatted}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B5E]" />
                <span>{data.primaryVenue}</span>
              </div>
            </div>

            <div className="pt-3 sm:pt-6">
              <button
                onClick={handleScrollDown}
                className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors inline-flex items-center space-x-3"
              >
                <span>Read The Festivities</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Photographic Column */}
          <div className="lg:col-span-5 relative mt-4 sm:mt-0">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-black/10">
              <RoyalImage
                src={data.gallery[0]?.src || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'}
                alt={`${data.brideName} and ${data.groomName}`}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-4 bg-[#F3F2EE] border border-black/10 p-2.5 sm:p-4 rounded-xl text-xs max-w-[170px] sm:max-w-[220px]">
              <span className="font-serif italic font-bold block truncate">{data.hashtag}</span>
              <span className="text-[10px] sm:text-[11px] text-black/60 font-sans">Photographed in Rajasthan</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div className="border-t border-black pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs text-black/60 tracking-wider gap-1 sm:gap-0">
          <span>{data.parentsBride}</span>
          <span className="hidden sm:inline my-1 sm:my-0">•</span>
          <span>{data.parentsGroom}</span>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef} className="bg-[#FAF9F6]">
        {/* Story Spread */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B89B5E] font-semibold block mb-2">
              Curated Retrospective
            </span>
            <h2 className="font-serif text-3xl sm:text-6xl text-black font-light break-words">
              The Journey to Udaipur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {data.story.map((chapter) => (
              <div key={chapter.title} className="p-5 sm:p-8 bg-white border border-black/10 rounded-2xl shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl text-black/20 font-bold block mb-2 sm:mb-4">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{chapter.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-black/70 leading-relaxed font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Countdown */}
        <div className="bg-[#141414]">
          <CountdownTimer targetDateIso={data.weddingDateIso} />
        </div>

        {/* Events */}
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
