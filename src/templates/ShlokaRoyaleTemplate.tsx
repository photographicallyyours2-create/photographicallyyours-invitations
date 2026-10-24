import React, { useState, useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { Bell, Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface ShlokaRoyaleTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const ShlokaRoyaleTemplate: React.FC<ShlokaRoyaleTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const [isSealOpened, setIsSealOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenGate = () => {
    setIsSealOpened(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="bg-[#FAF4E6] text-[#2F1D15] selection:bg-[#6B1724] selection:text-white font-sans">
      {/* 1. Scene 1 — Interactive Wax Seal Gate Opening */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-8 md:p-12 overflow-hidden bg-radial-at-c from-[#FBF2DF] via-[#F4E3C1] to-[#E9CE99]">
        {/* Ornate Gold Border & Starlight Embers */}
        <div className="absolute inset-2 sm:inset-8 border-2 border-[#D4AF37]/50 rounded-3xl pointer-events-none shadow-2xl" />
        <div className="absolute inset-3.5 sm:inset-10 border border-[#6B1724]/20 rounded-2xl pointer-events-none" />

        {/* Traditional Hanging Temple Bells */}
        <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none opacity-40 px-6">
          <div className="flex flex-col items-center animate-bounce [animation-duration:3s]">
            <div className="w-[1px] h-12 sm:h-20 bg-[#D4AF37]" />
            <Bell className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col items-center animate-bounce [animation-duration:2.4s]">
            <div className="w-[1px] h-16 sm:h-28 bg-[#D4AF37]" />
            <Bell className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col items-center animate-bounce [animation-duration:3.6s]">
            <div className="w-[1px] h-14 sm:h-24 bg-[#D4AF37]" />
            <Bell className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col items-center animate-bounce [animation-duration:2.8s]">
            <div className="w-[1px] h-10 sm:h-16 bg-[#D4AF37]" />
            <Bell className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>

        <div className="w-full max-w-3xl bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#D4AF37]/50 shadow-2xl p-4 sm:p-12 text-center relative z-10">
          {/* Ganesh Inscription */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/60 text-[#6B1724] text-[10px] sm:text-xs font-serif tracking-[0.25em] uppercase mb-4 sm:mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>|| ॐ श्री गणेशाय नमः ||</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          {/* Sacred Sanskrit Mangalam Shloka Card */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FBF4E4] border border-[#D4AF37]/40 max-w-xl mx-auto my-3 sm:my-4">
            <p className="font-serif text-sm sm:text-lg text-[#6B1724] leading-relaxed font-semibold">
              मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ।<br />
              मङ्गलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः ॥
            </p>
            <div className="flex items-center justify-center space-x-3 my-2">
              <div className="h-[1px] w-8 sm:w-16 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs">❖</span>
              <div className="h-[1px] w-8 sm:w-16 bg-[#D4AF37]" />
            </div>
            <p className="font-serif italic text-[11px] sm:text-xs text-[#2F1D15]/80">
              Mangalam Bhagwan Vishnu · Mangalam Garudadhwajah<br />
              Mangalam Pundarikakshah · Mangalaya Tano Harih
            </p>
          </div>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#6B1724] font-semibold mt-4 mb-2">
            Together with their families request the honour of your presence
          </p>

          {/* Grand Couple Names */}
          <div className="my-4 sm:my-6 py-4 sm:py-6 border-y-2 border-[#D4AF37]/40">
            <h1 className="font-serif-royal text-4xl sm:text-7xl font-bold text-[#6B1724] tracking-tight break-words">
              {data.brideName}
            </h1>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-2 text-[#D4AF37]">
              <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="font-serif tracking-widest text-xs sm:text-sm uppercase font-bold text-[#6B1724]">WEDS</span>
              <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
            <h1 className="font-serif-royal text-4xl sm:text-7xl font-bold text-[#2F1D15] tracking-tight break-words">
              {data.groomName}
            </h1>
          </div>

          {/* Multi-City Itinerary Dates */}
          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 font-serif text-xs sm:text-base text-[#2F1D15]">
            <div className="flex items-center justify-center space-x-2 text-[#6B1724] font-semibold text-sm sm:text-lg">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#8C5835] font-sans font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Interactive Royal Wax Seal Button */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={handleOpenGate}
              className="group relative inline-flex flex-col items-center justify-center p-3 rounded-full hover:scale-105 active:scale-95 transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8C1B2A] to-[#480E1A] border-2 border-[#D4AF37] flex items-center justify-center text-white shadow-xl group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <span className="font-serif font-bold text-lg sm:text-xl text-[#FBF2DF]">
                  {data.monogram || 'AR'}
                </span>
              </div>
              <span className="mt-2 text-xs font-serif uppercase tracking-widest text-[#6B1724] font-semibold flex items-center space-x-1">
                <span>{isSealOpened ? 'Scroll To Celebrate' : 'Tap Wax Seal to Open'}</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Auspicious Beginning / Parents Blessing Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
            Auspicious Beginning
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#6B1724] mb-4 sm:mb-6 break-words">
            With Love, Honor &amp; Eternal Blessings
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#2F1D15]/90 italic max-w-2xl mx-auto leading-relaxed mb-10">
            "{data.welcomeNote}"
          </p>

          {/* Parental Framing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto text-left mb-12">
            <div className="p-5 sm:p-7 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-md">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37] font-bold block mb-1">
                Groom's Family
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#6B1724] mb-2">{data.parentsGroom}</h3>
              <p className="text-xs text-[#2F1D15]/80 leading-relaxed font-sans font-light">
                Request your blessings and gracious presence as our family celebrates this auspicious union across cities.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-md">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37] font-bold block mb-1">
                Bride's Family
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#6B1724] mb-2">{data.parentsBride}</h3>
              <p className="text-xs text-[#2F1D15]/80 leading-relaxed font-sans font-light">
                Warmly welcome you with joy in our hearts to share in the laughter, traditions, and lifelong memories.
              </p>
            </div>
          </div>
        </section>

        {/* Auspicious Countdown in Shloka Maroon */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          locationHint={`${data.primaryVenue} • ${data.venueCity}`}
          variant="burgundy"
        />

        {/* Multi-City Events Schedule */}
        <EventsSchedule
          events={data.events}
          title="Multi-City Wedding Itinerary"
          subtitle="Five days of sacred rituals, high-energy celebrations, and grand banquets across three cities."
          coupleNames={`${data.brideName} & ${data.groomName}`}
        />

        {/* Photography Gallery */}
        <PhotoGallery
          photos={data.gallery}
          title="Celebration Moments"
          subtitle="Glimpses of love, tradition, and timeless joy captured across Delhi and Mumbai."
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
