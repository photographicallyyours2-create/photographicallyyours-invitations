import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import { Calendar, MapPin, ChevronDown, Compass, Ship, Plane, SunMedium } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface DestinationEditTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const DestinationEditTemplate: React.FC<DestinationEditTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F9F8F5] text-[#1C3D5A] selection:bg-[#1C3D5A] selection:text-white font-sans">
      {/* 1. Travel Romance & Destination Boarding Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-8 md:p-12 overflow-hidden bg-[#EFF3F6]">
        {/* Subtle Water Reflection Vignette */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1C3D5A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Boarding Pass Styled Travel Frame */}
        <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl border border-[#1C3D5A]/20 shadow-2xl overflow-hidden relative z-10">
          {/* Top Itinerary Advisory Strip */}
          <div className="bg-[#1C3D5A] text-white px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-mono gap-1.5 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-[#DBC5A4]" />
              <span>EXPEDITION: UDAIPUR • LAKE PICHOLA</span>
            </div>
            <span>GATEWAY: RAJASTHAN, INDIA</span>
            <span>{data.weddingDateFormatted}</span>
          </div>

          <div className="p-4 sm:p-14 text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#DBC5A4] font-bold block mb-2">
              {data.invocation}
            </span>

            <p className="font-serif italic text-sm sm:text-lg text-[#1C3D5A]/70 mb-2">
              Cordially request the honour of your presence at the destination wedding of
            </p>

            {/* Couple Destination Title */}
            <div className="my-4 sm:my-6 py-4 sm:py-6 border-y border-[#1C3D5A]/15">
              <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-normal text-[#1C3D5A] tracking-tight leading-tight break-words">
                {data.brideName}
                <span className="font-script-accent text-2xl sm:text-4xl text-[#DBC5A4] mx-2 sm:mx-3">&amp;</span>
                {data.groomName}
              </h1>
            </div>

            {/* Travel Details Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 sm:my-8 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F9F8F5] border border-[#1C3D5A]/10 text-left text-xs">
              <div className="flex items-start space-x-2.5">
                <Calendar className="w-4 h-4 text-[#1C3D5A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block text-[#1C3D5A]">Dates of Voyage</span>
                  <span className="text-[#1C3D5A]/70">{data.weddingDateFormatted}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Ship className="w-4 h-4 text-[#1C3D5A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block text-[#1C3D5A]">Island Transfers</span>
                  <span className="text-[#1C3D5A]/70">Private Jetty Boat Service</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#1C3D5A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block text-[#1C3D5A]">Primary Haven</span>
                  <span className="text-[#1C3D5A]/70">{data.primaryVenue}</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={handleScrollDown}
              className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#1C3D5A] text-white font-serif text-xs sm:text-sm tracking-wider uppercase font-medium hover:bg-[#142B3F] shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
            >
              <span>Explore The Destination Itinerary</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Destination Travel Guide / Concierge Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#DBC5A4] font-bold block mb-2">
              Guest Concierge &amp; Arrival
            </span>
            <h2 className="font-serif text-2xl sm:text-5xl text-[#1C3D5A] font-light break-words">
              Welcome to the City of Lakes
            </h2>
            <p className="font-serif text-sm sm:text-lg text-[#1C3D5A]/80 italic max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
              "{data.welcomeNote}"
            </p>
          </div>

          {/* Concierge 3-Col Travel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#1C3D5A]/10 shadow-sm">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C3D5A] mb-2 sm:mb-3" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C3D5A] mb-1.5 sm:mb-2">Airport Transfers</h3>
              <p className="text-xs text-[#1C3D5A]/75 leading-relaxed font-light">
                Chauffeured royal transfers will be arranged from Maharana Pratap Airport (UDR) directly to your hotel suites upon sharing flight itineraries.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#1C3D5A]/10 shadow-sm">
              <Ship className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C3D5A] mb-2 sm:mb-3" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C3D5A] mb-1.5 sm:mb-2">Lake Pichola Escort</h3>
              <p className="text-xs text-[#1C3D5A]/75 leading-relaxed font-light">
                Private royal motorboats depart from the Udaivilas Private Jetty every 15 minutes for island ceremonies at Jagmandir Palace.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#1C3D5A]/10 shadow-sm">
              <SunMedium className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C3D5A] mb-2 sm:mb-3" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C3D5A] mb-1.5 sm:mb-2">Winter Climate &amp; Attire</h3>
              <p className="text-xs text-[#1C3D5A]/75 leading-relaxed font-light">
                Expect warm sunny afternoons (24°C) transitioning to crisp starlit evenings (12°C). Light shawls and festive evening wraps are recommended.
              </p>
            </div>
          </div>

          {/* Landscape Photo Feature */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[21/9] border border-[#1C3D5A]/20 shadow-xl mb-8 sm:mb-12">
            <RoyalImage
              src={data.gallery[2]?.src || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'}
              alt="Lake Pichola Panorama"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>
        </section>

        {/* Countdown */}
        <div className="bg-[#1C3D5A]">
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
