import React from 'react';
import { WeddingEvent } from '../types/wedding';
import { X, MapPin, Navigation, ExternalLink, Info } from 'lucide-react';
import { RoyalDivider } from './JaaliDecor';

interface DirectionsModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const googleMapsUrl = event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.venueName}, ${event.venueAddress}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-burgundy-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-cream-50 rounded-2xl sm:rounded-3xl border border-gold-400/80 shadow-royal overflow-hidden p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close directions modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-cream-200/60 hover:bg-gold-200 text-charcoal-800 flex items-center justify-center transition-colors focus:outline-none min-h-[36px]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold-100 text-burgundy-900 mb-2 sm:mb-3 border border-gold-300">
            <Navigation className="w-5 h-5 text-gold-700" />
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-700 font-medium block">
            Directions & Venue Access
          </span>
          <h3 id="modal-title" className="font-serif-royal text-xl sm:text-3xl text-burgundy-900 mt-1 break-words">
            {event.title}
          </h3>
          <p className="text-xs font-sans text-charcoal-800/60 mt-0.5">{event.date} • {event.time}</p>
        </div>

        <RoyalDivider />

        {/* Venue Information */}
        <div className="space-y-4 my-4 text-left">
          <div className="p-4 rounded-2xl bg-cream-100 border border-gold-200">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg font-semibold text-burgundy-950">
                  {event.venueName}
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-800/80 mt-1 leading-relaxed">
                  {event.venueAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Guest Advisory Note */}
          <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-300/40 text-xs sm:text-sm text-charcoal-800/90 leading-relaxed flex items-start space-x-3">
            <Info className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-burgundy-900 block mb-0.5">
                {event.note ? 'Program Note:' : 'Guest Valet & Escort:'}
              </span>
              {event.note || 'Complimentary valet parking and chauffeured escort are available at the main venue entrance. Please contact the family coordinators for assistance.'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-burgundy-gradient text-gold-100 text-sm font-serif tracking-wider font-medium hover:shadow-gold-glow transition-all"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-gold-300 text-charcoal-800 text-sm font-sans hover:bg-cream-200/50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
