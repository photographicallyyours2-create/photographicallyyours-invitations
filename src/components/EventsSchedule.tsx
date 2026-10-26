import React, { useState } from 'react';
import { WeddingEvent } from '../types/wedding';
import { RoyalDivider } from './JaaliDecor';
import { DirectionsModal } from './DirectionsModal';
import { RoyalImage } from './RoyalImage';
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus } from 'lucide-react';

interface EventsScheduleProps {
  events: WeddingEvent[];
  title?: string;
  subtitle?: string;
  coupleNames?: string;
}

export const EventsSchedule: React.FC<EventsScheduleProps> = ({
  events,
  title = "The Wedding Festivities",
  subtitle = "Sacred vows, cherished traditions, and joyous celebrations with family and loved ones.",
  coupleNames = "Wedding Celebration",
}) => {
  const [selectedDirectionEvent, setSelectedDirectionEvent] = useState<WeddingEvent | null>(null);

  // Helper to generate a downloadable .ics calendar file
  const handleAddToCalendar = (event: WeddingEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//Royal Wedding//${coupleNames}//EN`,
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - ${coupleNames}`,
      `DESCRIPTION:${event.description}\\nAttire: ${event.attire}`,
      `LOCATION:${event.venueName}, ${event.venueAddress}`,
      `DTSTART:${event.calendarDateStart}`,
      `DTEND:${event.calendarDateEnd}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-wedding-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="events-section" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center space-x-2 text-gold-600 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
            Wedding Itinerary
          </span>
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 mt-1 mb-2 sm:mb-3 break-words">
          {title}
        </h2>
        <p className="text-xs sm:text-base text-charcoal-800/70 max-w-lg mx-auto font-sans font-light">
          {subtitle}
        </p>
        <RoyalDivider />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event) => {
          const isMainCeremony = event.id === 'wedding';
          return (
            <div
              key={event.id}
              className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-cream-50 border transition-all duration-300 hover:-translate-y-1 hover:shadow-royal ${
                isMainCeremony
                  ? 'border-gold-500 shadow-gold-subtle lg:col-span-1 md:scale-[1.02]'
                  : 'border-gold-300/60 shadow-sm'
              }`}
            >
              {/* Special Badge for Ceremony */}
              {isMainCeremony && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-burgundy-900 text-gold-200 text-[10px] sm:text-[11px] font-serif uppercase tracking-widest px-3 sm:px-4 py-1 rounded-full border border-gold-400 shadow-sm whitespace-nowrap">
                  Sacred Auspicious Vows
                </div>
              )}

              {/* Event Scenic Illustration Banner */}
              {event.image && (
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl sm:rounded-t-3xl border-b border-gold-300/40 bg-cream-200">
                  <RoyalImage
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Event Content Header */}
              <div className="p-5 sm:p-8">
                {event.hindiTitle && (
                  <span className="block text-xs font-serif text-gold-700 tracking-wider mb-1">
                    {event.hindiTitle}
                  </span>
                )}
                <h3 className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 font-semibold tracking-wide">
                  {event.title}
                </h3>
                <p className="font-sans text-xs text-charcoal-800/60 mt-1 font-light italic">
                  {event.subTitle}
                </p>

                <div className="my-4 sm:my-5 border-t border-gold-200/60 pt-3.5 sm:pt-4 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center text-xs sm:text-sm text-charcoal-800 space-x-2.5">
                    <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-charcoal-800 space-x-2.5">
                    <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start text-xs sm:text-sm text-charcoal-800 space-x-2.5">
                    <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block text-burgundy-950">{event.venueName}</span>
                      <span className="text-[11px] text-charcoal-800/70">{event.venueAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Attire Guidance */}
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-cream-100/90 border border-gold-200/50 mb-3 sm:mb-4">
                  <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-gold-800 font-semibold mb-1">
                    Suggested Attire:
                  </div>
                  <div className="text-xs text-charcoal-800/90 font-medium">
                    {event.attire}
                  </div>
                  {event.attireColorHint && (
                    <div className="text-[10px] sm:text-[11px] text-charcoal-800/60 italic mt-0.5">
                      Palettes: {event.attireColorHint}
                    </div>
                  )}
                </div>

                <p className="text-xs text-charcoal-800/70 font-sans leading-relaxed">
                  {event.description}
                </p>

                {event.note && (
                  <div className="mt-3 p-2.5 rounded-xl bg-gold-100/80 border border-gold-300/60 text-[11px] text-burgundy-950 font-medium flex items-start space-x-2">
                    <span className="text-gold-700 flex-shrink-0">📍</span>
                    <span>{event.note}</span>
                  </div>
                )}
              </div>

              {/* Event Actions Footer */}
              <div className="p-3.5 sm:p-6 bg-cream-100/60 border-t border-gold-200/40 rounded-b-2xl sm:rounded-b-3xl flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDirectionEvent(event)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-serif text-burgundy-900 border border-gold-400/60 hover:bg-gold-100/60 transition-colors min-h-[40px]"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-700" />
                  <span>Directions</span>
                </button>
                <button
                  onClick={() => handleAddToCalendar(event)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full text-xs font-serif bg-burgundy-900 text-gold-200 hover:bg-burgundy-800 transition-colors min-h-[40px]"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-gold-400" />
                  <span>Add to Cal</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directions Modal */}
      <DirectionsModal
        event={selectedDirectionEvent}
        onClose={() => setSelectedDirectionEvent(null)}
      />
    </section>
  );
};
