import React from 'react';
import { Sparkles, Smartphone, Music, CalendarCheck, ShieldCheck } from 'lucide-react';
import { RoyalDivider } from '../JaaliDecor';

export const StudioHeader: React.FC = () => {
  return (
    <header className="relative pt-10 sm:pt-16 pb-10 sm:pb-12 px-3 sm:px-4 md:px-8 text-center bg-jaali-subtle border-b border-gold-300/60 overflow-hidden">
      {/* Decorative Corner Ornaments */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-gold-400/40 pointer-events-none" />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-gold-400/40 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-cream-50 border border-gold-400/70 shadow-sm text-[10px] sm:text-xs font-serif tracking-[0.15em] sm:tracking-[0.25em] text-burgundy-900 uppercase mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
          <span className="hidden sm:inline">The Atelier • Bespoke Digital Stationery</span>
          <span className="sm:hidden">The Atelier • Digital Stationery</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
        </div>

        <h1 className="font-serif-royal text-3xl sm:text-5xl md:text-7xl text-burgundy-900 font-light tracking-tight leading-tight mb-3 sm:mb-4 break-words">
          Royal Wedding Invitation Catalogue
        </h1>

        <p className="font-sans text-xs sm:text-base md:text-lg text-charcoal-800/80 max-w-2xl mx-auto font-light leading-relaxed mb-6 px-2 sm:px-0">
          Ten architectural, heirloom, and contemporary digital invitation suites designed for high-profile Indian weddings. Crafted to be shared with family and guests seamlessly through WhatsApp.
        </p>

        <RoyalDivider />

        {/* Studio Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto mt-6 text-left">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-gold-300/40 shadow-sm flex items-start space-x-2.5">
            <Smartphone className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block font-serif text-sm font-semibold text-burgundy-900">WhatsApp First</span>
              <span className="text-[11px] text-charcoal-800/70 font-sans">Instant guest delivery & open graph cards</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-gold-300/40 shadow-sm flex items-start space-x-2.5">
            <Music className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block font-serif text-sm font-semibold text-burgundy-900">Ambient Raga</span>
              <span className="text-[11px] text-charcoal-800/70 font-sans">Traditional tanpura & sitar soundscapes</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-gold-300/40 shadow-sm flex items-start space-x-2.5">
            <CalendarCheck className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block font-serif text-sm font-semibold text-burgundy-900">Multi-Day RSVP</span>
              <span className="text-[11px] text-charcoal-800/70 font-sans">Event-by-event guest attendance</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-gold-300/40 shadow-sm flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block font-serif text-sm font-semibold text-burgundy-900">Personal Domain</span>
              <span className="text-[11px] text-charcoal-800/70 font-sans">Private, custom-branded couple links</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
