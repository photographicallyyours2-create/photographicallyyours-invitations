import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { Calendar, MapPin, ChevronDown, Flower2, Heart } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface PastelCourtyardTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const PastelCourtyardTemplate: React.FC<PastelCourtyardTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFBF5] text-[#2D2A26] selection:bg-[#E8927C] selection:text-white font-sans">
      {/* 1. Soft Floral Minimalist Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-8 md:p-12 overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FFFBF5] to-[#FDF5ED]">
        {/* Soft Watercolor Halo Vignettes */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#E8927C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7C9D86]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Delicate Floral Corner Accents */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-[#E8927C] text-lg sm:text-2xl pointer-events-none opacity-80">🌸</div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[#7C9D86] text-lg sm:text-2xl pointer-events-none opacity-80">🌿</div>
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-[#7C9D86] text-lg sm:text-2xl pointer-events-none opacity-80">🌿</div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-[#E8927C] text-lg sm:text-2xl pointer-events-none opacity-80">🌸</div>

        {/* Fine Double Frame Line */}
        <div className="absolute inset-2 sm:inset-8 border border-[#E8927C]/25 rounded-3xl pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#7C9D86]/20 rounded-2xl pointer-events-none" />

        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E8927C]/20 shadow-sm p-5 sm:p-14 text-center relative z-10">
          {/* Subtle Botanical Monogram */}
          <div className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF0EB] border border-[#E8927C]/30 flex items-center justify-center text-[#E8927C] shadow-xs mb-2">
              <Flower2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8927C]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#7C9D86] font-medium">
              {data.invocation}
            </span>
          </div>

          <p className="font-serif italic text-sm sm:text-base text-[#2D2A26]/75 mb-2">
            Designed to embrace simplicity and soft florals
          </p>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#2D2A26]/60 font-light mb-6">
            Cordially invite you to celebrate the wedding of
          </p>

          {/* Couple Names in Graceful Serif */}
          <div className="my-4 sm:my-6 py-4 sm:py-6 border-y border-[#E8927C]/20">
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-[#2D2A26] tracking-normal leading-tight break-words">
              {data.brideName}
            </h1>
            <span className="font-script-accent text-2xl sm:text-4xl text-[#E8927C] my-1 sm:my-2 block">
              and
            </span>
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-[#2D2A26] tracking-normal leading-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Dates & Courtyard Haven */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 font-serif text-xs sm:text-base text-[#2D2A26]">
            <div className="flex items-center justify-center space-x-2 text-[#E8927C] font-medium">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8927C]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#7C9D86] font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7C9D86]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Manifesto Quote from Designs by Inaara */}
          <p className="font-serif italic text-xs sm:text-sm text-[#2D2A26]/70 max-w-md mx-auto mb-6 leading-relaxed">
            "A timeless aesthetic where soft florals and authentic moments let love take centre stage."
          </p>

          {/* Call to Action */}
          <button
            onClick={handleScrollDown}
            className="min-h-[44px] px-6 sm:px-8 py-3 rounded-full bg-[#E8927C] hover:bg-[#D77C65] text-white font-serif text-xs sm:text-sm tracking-wider uppercase font-medium shadow-sm hover:shadow-md transition-all inline-flex items-center space-x-2"
          >
            <span>Celebrate With Us</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Soft Floral Story Spread */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#7C9D86] font-semibold mb-2">
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E8927C]/30 text-[#E8927C]" />
            <span>Soft Floral Elegance</span>
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E8927C]/30 text-[#E8927C]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl text-[#2D2A26] mb-3 sm:mb-4 break-words font-light">
            Love, Simplicity &amp; Timeless Grace
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#2D2A26]/80 italic max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            "{data.welcomeNote}"
          </p>

          {/* Soft Pastel Portrait Feature */}
          <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#E8927C]/30 shadow-sm mb-8 sm:mb-12">
            <RoyalImage
              src={data.gallery[1]?.src || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'}
              alt="Soft Floral Portrait"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {data.story.map((chapter) => (
              <div
                key={chapter.title}
                className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E8927C]/20 shadow-xs hover:border-[#E8927C] transition-colors"
              >
                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#E8927C] bg-[#FAF0EB] px-2.5 py-1 rounded-full inline-block mb-3">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2A26] mb-1.5 sm:mb-2">{chapter.title}</h3>
                <p className="text-xs text-[#2D2A26]/80 leading-relaxed font-sans font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown in Warm Botanical Charcoal */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          locationHint={`${data.primaryVenue} • ${data.venueCity}`}
          variant="charcoal"
        />

        {/* Multi-Day Events Schedule */}
        <EventsSchedule
          events={data.events}
          title="Courtyard Celebrations"
          subtitle="Three days of intimate gatherings, acoustic melodies, and starlit banquets in Kanpur."
          coupleNames={`${data.brideName} & ${data.groomName}`}
        />

        {/* Photography Gallery */}
        <PhotoGallery
          photos={data.gallery}
          title="Moments of Grace"
          subtitle="A quiet chronicle of love, soft florals, and timeless simplicity."
        />

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
