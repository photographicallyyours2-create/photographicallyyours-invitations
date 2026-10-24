import React from 'react';
import { templateRegistry } from '../../data/templateRegistry';
import { RoyalImage } from '../RoyalImage';
import { RoyalDivider } from '../JaaliDecor';
import { Sparkles, ArrowRight, Smartphone, Music, CalendarCheck, ShieldCheck, Heart, Eye } from 'lucide-react';

interface StudioHomePageProps {
  onNavigate: (route: string) => void;
  onSelectInteractiveTemplate: (templateId: string) => void;
  onViewTemplateDetails: (templateId: string) => void;
  onCustomizeTemplate: (templateId: string) => void;
}

export const StudioHomePage: React.FC<StudioHomePageProps> = ({
  onNavigate,
  onSelectInteractiveTemplate,
  onViewTemplateDetails,
  onCustomizeTemplate,
}) => {
  // Highlight 4 iconic featured suites across the 3 categories
  const featuredTemplates = templateRegistry.filter((t) =>
    ['royal-heirloom', 'mewar-mehfil', 'regal-chronicle', 'modern-editorial'].includes(t.id)
  );

  // The 3 newly commissioned real-world suites
  const newAdditions = templateRegistry.filter((t) =>
    ['bodh-heritage', 'shloka-royale', 'pastel-courtyard'].includes(t.id)
  );

  return (
    <div className="bg-cream-100 text-charcoal-800 selection:bg-gold-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-24 bg-jaali-subtle overflow-hidden border-b border-gold-300/60">
        {/* Subtle Decorative Golden Corner Borders */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-l-2 border-gold-400/50 pointer-events-none" />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-r-2 border-gold-400/50 pointer-events-none" />
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-l-2 border-gold-400/50 pointer-events-none" />
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-r-2 border-gold-400/50 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Top Atelier Badge */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-cream-50 border border-gold-400 shadow-xs text-[10px] sm:text-xs font-serif tracking-[0.15em] sm:tracking-[0.25em] text-burgundy-900 uppercase mb-4 sm:mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
            <span className="hidden sm:inline">Created by Photographically Yours, 2026 • Royal Wedding Stationery</span>
            <span className="sm:hidden">Created by Photographically Yours, 2026</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-8xl font-light text-burgundy-950 tracking-tight leading-[1.08] mb-4 sm:mb-6 break-words">
            Your wedding. Your story. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-burgundy-900">
              Beautifully invited.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-sm sm:text-lg md:text-xl text-charcoal-800/80 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
            We craft bespoke digital wedding websites and interactive invitation suites for discerning Indian couples. Inspired by royal palace architecture, tailored around your love story, and delivered effortlessly to your guests on WhatsApp.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <button
              onClick={() => onSelectInteractiveTemplate('bodh-heritage')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold-gradient text-burgundy-950 font-serif text-sm sm:text-base tracking-wider uppercase font-bold shadow-royal hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-gold-400 min-h-[44px]"
            >
              <span className="text-base">✉</span>
              <span>Phone Envelope Experience</span>
            </button>

            <button
              onClick={() => onNavigate('catalogue')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-burgundy-gradient text-gold-200 font-serif text-sm sm:text-base tracking-wider uppercase font-semibold shadow-royal hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-gold-400/50 min-h-[44px]"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>

            <button
              onClick={() => onNavigate('enquire')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-gold-400 bg-cream-50/90 text-burgundy-950 font-serif text-sm sm:text-base tracking-wider uppercase font-medium hover:bg-cream-200/80 shadow-xs transition-colors min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Custom Consultation</span>
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300 shadow-royal p-4 sm:p-8 md:p-10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] border border-gold-400/50 shadow-md">
                <RoyalImage
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Wedding Couple Showcase"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
                <div className="flex items-center space-x-2 text-gold-700 text-xs font-sans uppercase tracking-widest font-semibold">
                  <span>Signature Demo</span>
                  <span>•</span>
                  <span>Aadhya &amp; Veer</span>
                </div>
                <h3 className="font-serif-royal text-xl sm:text-2xl md:text-3xl text-burgundy-900 font-medium">
                  The Royal Heirloom Suite in Udaipur
                </h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal-800/75 leading-relaxed font-light">
                  Experience our flagship interactive digital invitation featuring an unfolding wax seal, ambient tanpura soundtrack, multi-day itinerary, and real-time RSVP.
                </p>
                <div className="pt-1 sm:pt-2 flex items-center space-x-4">
                  <button
                    onClick={() => onSelectInteractiveTemplate('royal-heirloom')}
                    className="inline-flex items-center space-x-1.5 text-xs font-serif text-burgundy-900 font-semibold hover:text-gold-700 transition-colors py-1"
                  >
                    <span>Launch Live Interactive Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Newly Commissioned Design Suites Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gold-300/50">
        <div className="bg-radial-at-c from-gold-100/70 via-cream-50 to-cream-100 rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-2 border-gold-400 shadow-royal">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-gold-300/60 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-900 text-gold-200 text-[10px] sm:text-xs font-serif font-bold tracking-widest uppercase mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>New Additions • Real Client Commissions</span>
              </div>
              <h2 className="font-serif-royal text-2xl sm:text-4xl text-burgundy-950 font-medium">
                Latest Additions in Our Design Catalogue
              </h2>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 max-w-2xl mt-1.5 font-light leading-relaxed">
                Featuring our bespoke wedding commissions: Sahil &amp; Kajal (New Delhi Andaaj Mansion &amp; Hotel Surya Grand), Akash &amp; Rashmi (Vedic Royale Multi-City), and Radhika &amp; Priyansh (Kanpur Pastel Courtyard). Every suite includes complete event itineraries, direct maps, and customizable photo galleries.
              </p>
            </div>
            <button
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center space-x-1.5 text-xs font-serif text-burgundy-900 font-bold hover:text-gold-700 whitespace-nowrap self-start lg:self-auto"
            >
              <span>Explore All 13 Suites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 New Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newAdditions.map((template) => {
              const coupleName =
                template.id === 'bodh-heritage'
                  ? 'Sahil & Kajal'
                  : template.id === 'shloka-royale'
                  ? 'Akash & Rashmi'
                  : 'Radhika & Priyansh';

              const locationTag =
                template.id === 'bodh-heritage'
                  ? 'Andaaj Mansion Banquet & Hotel Surya Grand, New Delhi'
                  : template.id === 'shloka-royale'
                  ? 'Noida • Delhi • Mumbai'
                  : 'The Landmark & Courtyard, Kanpur';

              return (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl border border-gold-300 p-4 sm:p-5 shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => onSelectInteractiveTemplate(template.id)}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 cursor-pointer group"
                    >
                      <RoyalImage
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-burgundy-900 text-gold-200 font-serif font-bold text-xs shadow-xs border border-gold-400">
                        {template.number}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-sans font-semibold border border-emerald-600/70 shadow-xs">
                        NEW ADDITION
                      </div>
                      <div className="absolute inset-0 bg-burgundy-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-cream-50 text-burgundy-950 font-serif text-xs font-bold shadow-md">
                          Open Live Invitation ↗
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-gold-800 font-bold">
                        {template.categoryLabel}
                      </span>
                      <span className="text-[10px] font-sans text-charcoal-800/70 font-medium">
                        {locationTag}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectInteractiveTemplate(template.id)}
                      className="font-serif-royal text-lg sm:text-xl text-burgundy-900 font-medium hover:text-gold-700 transition-colors cursor-pointer"
                    >
                      {template.name}
                    </h3>
                    <p className="text-xs font-serif text-burgundy-950 font-semibold mb-2">
                      Couple: {coupleName}
                    </p>

                    <p className="font-sans text-xs text-charcoal-800/70 leading-relaxed font-light mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Color Swatches */}
                    <div className="flex items-center space-x-1.5 mb-4">
                      {template.palette.map((color) => (
                        <span
                          key={color.name}
                          title={`${color.name} (${color.hex})`}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-xs"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gold-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectInteractiveTemplate(template.id)}
                      className="flex-1 py-2 px-3 rounded-full bg-burgundy-900 text-gold-200 font-serif text-xs font-semibold hover:bg-burgundy-800 transition-colors shadow-xs text-center"
                    >
                      View Live Invitation
                    </button>
                    <button
                      onClick={() => onViewTemplateDetails(template.id)}
                      className="py-2 px-3 rounded-full border border-gold-400 text-charcoal-800 font-serif text-xs hover:bg-gold-100 transition-colors"
                      title="View design details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Featured Template Previews */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gold-800 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Curated Design Suites</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-950 font-light mb-3 sm:mb-4 break-words">
            Featured Wedding Stationery Collections
          </h2>
          <p className="font-sans text-xs sm:text-base text-charcoal-800/75 max-w-xl mx-auto font-light leading-relaxed">
            From palace-inspired traditional suites to contemporary high-fashion editorials. Each design is ready for custom personalization.
          </p>
          <RoyalDivider />
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-cream-50 rounded-2xl sm:rounded-3xl border border-gold-300/70 p-4 sm:p-5 shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => onViewTemplateDetails(template.id)}
                  className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 cursor-pointer"
                >
                  <RoyalImage
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-cream-50/90 text-burgundy-900 font-serif font-bold text-xs shadow-xs border border-gold-400">
                    {template.number}
                  </div>
                </div>

                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-gold-800 font-semibold block mb-1">
                  {template.categoryLabel}
                </span>

                <h3
                  onClick={() => onViewTemplateDetails(template.id)}
                  className="font-serif-royal text-lg sm:text-xl text-burgundy-900 font-medium group-hover:text-gold-700 transition-colors cursor-pointer"
                >
                  {template.name}
                </h3>

                <p className="font-sans text-xs text-charcoal-800/70 leading-relaxed font-light mt-1 mb-3 line-clamp-2">
                  {template.description}
                </p>

                {/* Swatches */}
                <div className="flex items-center space-x-1.5 mb-3 sm:mb-4">
                  {template.palette.map((color) => (
                    <span
                      key={color.name}
                      title={`${color.name} (${color.hex})`}
                      className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-gold-200/60 flex items-center justify-between">
                <button
                  onClick={() => onViewTemplateDetails(template.id)}
                  className="text-xs font-serif text-burgundy-900 hover:text-gold-700 font-medium underline underline-offset-2 transition-colors py-1"
                >
                  Details
                </button>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onCustomizeTemplate(template.id)}
                    className="px-2.5 py-1 rounded-full border border-gold-400 bg-white text-burgundy-900 text-[11px] font-serif hover:bg-gold-50 transition-colors"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => onSelectInteractiveTemplate(template.id)}
                    className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif hover:bg-burgundy-800 transition-colors"
                  >
                    <span>Preview</span>
                    <ArrowRight className="w-3 h-3 text-gold-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collection Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => onNavigate('catalogue')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 rounded-full border border-gold-400 bg-cream-50 text-burgundy-950 font-serif text-xs uppercase tracking-widest font-semibold hover:bg-cream-200 transition-colors shadow-sm min-h-[44px]"
          >
            <span>View All 13 Invitation Suites</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
          </button>
        </div>
      </section>

      {/* 3. The Bespoke Process */}
      <section id="process" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-50 border-y border-gold-300/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-800 font-semibold block mb-2 font-sans">
              Simple &amp; Seamless Experience
            </span>
            <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-950 font-light mb-3 sm:mb-4 break-words">
              How We Create Your Wedding Website
            </h2>
            <p className="font-sans text-xs sm:text-base text-charcoal-800/75 max-w-lg mx-auto font-light leading-relaxed">
              From your initial consultation to delivering your personalized link to wedding guests on WhatsApp.
            </p>
            <RoyalDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-100/70 border border-gold-300/80 shadow-xs relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-burgundy-900 text-gold-200 flex items-center justify-center font-serif text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-5 shadow-sm">
                01
              </div>
              <h3 className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 font-medium mb-2 sm:mb-3">
                Select Your Aesthetic
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
                Choose from our 10 architectural suites across Indian Heritage, Royal Destination, and Minimal Editorial, or commission a bespoke custom crest and watercolor artwork.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-100/70 border border-gold-300/80 shadow-xs relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-burgundy-900 text-gold-200 flex items-center justify-center font-serif text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-5 shadow-sm">
                02
              </div>
              <h3 className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 font-medium mb-2 sm:mb-3">
                Curate Your Story
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
                Our design team weaves your multi-day events schedule (Mehendi to Reception), attire guidance, venue directions, love story chapters, and raga soundtrack into a polished website.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-100/70 border border-gold-300/80 shadow-xs relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-burgundy-900 text-gold-200 flex items-center justify-center font-serif text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-5 shadow-sm">
                03
              </div>
              <h3 className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 font-medium mb-2 sm:mb-3">
                Share on WhatsApp
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
                Receive your custom couple domain with high-end WhatsApp preview cards. Guests open their invitation instantly on mobile and confirm attendance with dietary choices in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-800 font-semibold block mb-2 font-sans">
            Crafted for Royal Indian Celebrations
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-950 font-light mb-3 sm:mb-4 break-words">
            Everything Your Guests Need, Thoughtfully Included
          </h2>
          <p className="font-sans text-xs sm:text-base text-charcoal-800/75 max-w-xl mx-auto font-light leading-relaxed">
            Eliminate endless PDF sharing and lost message threads with an all-inclusive digital wedding concierge.
          </p>
          <RoyalDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1: Multi-Event Itinerary */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <CalendarCheck className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-burgundy-900">
              Multi-Day Celebration Schedules
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Clear timelines for Mehendi, Haldi, Sangeet, Pheras, and Reception with dress codes, venue directions, and one-click phone calendar exports.
            </p>
          </div>

          {/* Feature 2: RSVP & Hospitality */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <Heart className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-burgundy-900">
              Interactive RSVP &amp; Dietary Tracking
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Guest attendance by event, plus-ones count, and specific Indian hospitality requirements including Pure Jain, Sattvic Vegetarian, Vegan, and allergies.
            </p>
          </div>

          {/* Feature 3: WhatsApp Distribution */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <Smartphone className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-burgundy-900">
              WhatsApp-First Sharing Engine
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Rich Open Graph preview cards tailored for WhatsApp. Guests can view their invitation and send confirmation messages back to you with a single tap.
            </p>
          </div>

          {/* Feature 4: Classical Ambient Raga */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <Music className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-burgundy-900">
              Ambient Sitar &amp; Tanpura Soundscapes
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Culturally resonant Indian raga harmonies with polite user-activated controls. Never jarring or forced on mobile visitors.
            </p>
          </div>

          {/* Feature 5: Curated Photography Lightbox */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <Eye className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-burgundy-900">
              Cinematic Pre-Wedding Gallery
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Responsive editorial photo grids with keyboard-navigable Lightbox, photo captions, and resilient fallback states so images never break the layout.
            </p>
          </div>

          {/* Feature 6: Private Custom Domain */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream-50 border border-gold-300/80 shadow-xs space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 border border-gold-300 text-burgundy-900 flex items-center justify-center mb-3 sm:mb-4">
              <ShieldCheck className="w-5 h-5 text-gold-700" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-burgundy-900">
              Private Branded Wedding Domain
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              Your own memorable link (e.g. `aadhyaandveer.com`) with zero third-party ads, watermark logos, or generic template badges.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Final Enquiry CTA Banner */}
      <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-burgundy-950 text-cream-50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 border border-gold-400 shadow-royal text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-jaali-burgundy opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-400 font-serif">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commission Your Royal Invitation</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-6xl text-cream-100 font-light leading-tight break-words">
              Ready to bring your celebration to life?
            </h2>

            <p className="font-sans text-xs sm:text-sm text-gold-200/85 leading-relaxed font-light max-w-xl mx-auto">
              Share your wedding dates, guest scale, and preferred aesthetic. Our creative director will guide you through bespoke stationery design and onboarding.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('enquire')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gold-gradient text-burgundy-950 font-serif text-sm tracking-wider uppercase font-semibold hover:shadow-gold-glow transition-all min-h-[44px]"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('catalogue')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-gold-400/80 text-gold-200 font-serif text-sm tracking-wider uppercase hover:bg-gold-500/10 transition-colors min-h-[44px]"
              >
                Explore All 10 Suites
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
