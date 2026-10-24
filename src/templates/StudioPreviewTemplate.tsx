import React from 'react';
import { TemplateDefinition } from '../types/template';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { CountdownTimer } from '../components/CountdownTimer';
import { RoyalImage } from '../components/RoyalImage';
import { Sparkles, Palette, Type, CheckCircle, Info, Calendar, MapPin } from 'lucide-react';

interface StudioPreviewTemplateProps {
  template: TemplateDefinition;
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const StudioPreviewTemplate: React.FC<StudioPreviewTemplateProps> = ({
  template,
  data,
  onOpenAdmin,
}) => {
  return (
    <div className="bg-cream-100 text-charcoal-800 selection:bg-gold-500 selection:text-white">
      {/* 1. Studio Specification & Moodboard Header */}
      <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-16 px-3 sm:px-8 bg-cream-50 border-b border-gold-300/80">
        <div className="max-w-5xl mx-auto">
          {/* Transparency Notice */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 flex items-start space-x-2.5 sm:space-x-3 text-xs leading-relaxed shadow-sm">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block font-serif text-xs sm:text-sm text-amber-900 mb-0.5">
                Studio Concept Preview — Suite {template.number} ({template.name})
              </span>
              This suite is in active design specification. Below is the bespoke aesthetic moodboard, color palette tokens, and typography system. The interactive RSVP, multi-event itinerary, photo gallery, and content customizer are fully live and functional.
            </div>
          </div>

          {/* Hero Suite Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-7 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-800 font-semibold font-sans">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Suite {template.number} • {template.categoryLabel}</span>
              </div>

              <h1 className="font-serif-royal text-3xl sm:text-6xl text-burgundy-900 font-light break-words">
                {template.name}
              </h1>

              <p className="font-serif italic text-base sm:text-xl text-gold-700">
                {template.subtitle}
              </p>

              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light max-w-lg">
                {template.description}
              </p>

              {/* Sample Couple Headline */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cream-100/80 border border-gold-300/60 text-xs">
                <span className="font-serif font-semibold text-burgundy-950 block text-xs sm:text-sm mb-1">
                  Invitation Preview for: {data.brideName} &amp; {data.groomName}
                </span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-charcoal-800/70 text-[11px] sm:text-xs">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>{data.weddingDateFormatted}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{data.venueCity}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Moodboard Card */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-royal border-2 border-gold-400/50">
                <RoyalImage
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-cream-50">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-gold-300 font-sans block mb-1">
                    Aesthetic Mood
                  </span>
                  <p className="font-serif text-base sm:text-lg font-medium">{template.aestheticMood}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Palette Tokens & Typography Specimen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gold-300/60">
            {/* Color Tokens */}
            <div className="p-4 sm:p-6 rounded-2xl bg-cream-100/70 border border-gold-300/60">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-burgundy-900 font-semibold mb-3 sm:mb-4">
                <Palette className="w-4 h-4 text-gold-600" />
                <span>Bespoke Color Token System</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {template.palette.map((color) => (
                  <div key={color.name} className="space-y-1 sm:space-y-1.5 text-center">
                    <div
                      className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border border-black/10 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-charcoal-800 truncate">
                      {color.name}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-charcoal-800/60">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Specimen */}
            <div className="p-4 sm:p-6 rounded-2xl bg-cream-100/70 border border-gold-300/60">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-burgundy-900 font-semibold mb-3 sm:mb-4">
                <Type className="w-4 h-4 text-gold-600" />
                <span>Typography Specimen &amp; Features</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-burgundy-950 mb-2">
                Pairing: <span className="font-semibold">{template.typographyPairing}</span>
              </p>
              <div className="space-y-1.5 text-xs text-charcoal-800/80 font-sans">
                {template.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Celebration Modules */}
      <div>
        <CountdownTimer targetDateIso={data.weddingDateIso} />
        <EventsSchedule events={data.events} />
        <PhotoGallery photos={data.gallery} />
        <RsvpSection data={data} />
        <Footer
          data={data}
          onOpenAdmin={onOpenAdmin}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  );
};
