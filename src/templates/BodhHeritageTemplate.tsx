import React, { useRef, useState } from 'react';
import { WeddingData } from '../types/wedding';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';
import { RoyalImage } from '../components/RoyalImage';
import {
  Calendar,
  MapPin,
  ChevronDown,
  Flower,
  Sparkles,
  Phone,
  MessageCircle,
  Navigation,
  ExternalLink,
  Quote,
  Home,
  Heart,
  Edit3,
  Check,
  X,
  Sliders,
} from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface BodhHeritageTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
  onUpdateData?: (newData: WeddingData) => void;
}

export const BodhHeritageTemplate: React.FC<BodhHeritageTemplateProps> = ({
  data,
  onOpenAdmin,
  onUpdateData,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [quickSaved, setQuickSaved] = useState(false);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFieldChange = (field: keyof WeddingData, value: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        [field]: value,
      });
      setQuickSaved(true);
      setTimeout(() => setQuickSaved(false), 2000);
    }
  };

  // Authentic Shlokas from Sahil & Kajal's Wedding Card
  const shlokas = data.shlokas || [
    'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः । निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥',
    'विघ्न हरण मंगल करण, श्री गणपति महाराज । प्रथम निमंत्रण आपको, पूरन करियो काज ॥',
  ];

  return (
    <div className="bg-[#F7F4EE] text-[#2C381F] selection:bg-[#4B5A2B] selection:text-white font-sans">
      {/* 1. Stained-Glass Rose & Sacred Sanctuary Hero */}
      <section className="relative min-h-screen flex items-center justify-center p-3 sm:p-8 md:p-12 overflow-hidden bg-[#EFECE3]">
        {/* Soft Olive & Rose Ambient Halo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4B5A2B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D8A48F]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Stained-Glass Arched Decorative Frame */}
        <div className="absolute inset-1.5 sm:inset-6 border-2 sm:border-4 border-[#4B5A2B]/40 rounded-3xl pointer-events-none shadow-xl" />
        <div className="absolute inset-2.5 sm:inset-7 border border-[#C29B38]/60 rounded-2xl pointer-events-none" />

        {/* Traditional Rose Stained-Glass Medallions */}
        <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 text-[#4B5A2B] text-sm sm:text-xl pointer-events-none">🌹</div>
        <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 text-[#4B5A2B] text-sm sm:text-xl pointer-events-none">🌹</div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-5 sm:left-5 text-[#4B5A2B] text-sm sm:text-xl pointer-events-none">🌹</div>
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-5 sm:right-5 text-[#4B5A2B] text-sm sm:text-xl pointer-events-none">🌹</div>

        <div className="w-full max-w-3xl bg-[#FCFAF5]/95 backdrop-blur-md rounded-2xl border border-[#4B5A2B]/25 shadow-2xl p-4 sm:p-10 md:p-12 text-center relative z-10 my-4 sm:my-8">
          {/* Devanagari Auspicious Inscription */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#EAE6D9] border border-[#4B5A2B]/40 text-[#4B5A2B] text-xs sm:text-sm font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>॥ श्री गणेशाय नमः ॥</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
          </div>

          {/* Authentic Shloka 1 Banner */}
          <div className="max-w-xl mx-auto my-2 px-3 py-2 rounded-xl bg-[#F4EFE3] border border-[#C29B38]/40">
            <p className="font-serif text-xs sm:text-sm text-[#4B5A2B] font-medium leading-relaxed tracking-wide">
              {shlokas[0]}
            </p>
          </div>

          {/* Couple Quote from Wedding Card */}
          {data.quote && (
            <div className="my-3 sm:my-4 flex items-center justify-center space-x-2 text-[#4B5A2B]/90 italic text-xs sm:text-sm font-serif max-w-xl mx-auto">
              <Quote className="w-3.5 h-3.5 text-[#C29B38] flex-shrink-0" />
              <span>"{data.quote}"</span>
            </div>
          )}

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#2C381F]/70 font-semibold mb-3 sm:mb-4">
            Together with their families cordially invite you to celebrate the wedding of
          </p>

          {/* Couple Names in Classical Serif + Calligraphy */}
          <div className="my-3 sm:my-5 py-4 sm:py-6 border-y-2 border-[#C29B38]/30">
            <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#4B5A2B] font-semibold mb-1">
              Shubh Vivah
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-bold text-[#4B5A2B] tracking-tight break-words">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center space-x-3 my-1.5 sm:my-2">
              <div className="h-[1px] w-8 sm:w-16 bg-[#C29B38]" />
              <span className="font-serif italic text-base sm:text-xl text-[#C29B38] font-light">weds</span>
              <div className="h-[1px] w-8 sm:w-16 bg-[#C29B38]" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl md:text-7xl font-bold text-[#2C381F] tracking-tight break-words">
              {data.brideName}
            </h1>
          </div>

          {/* Dates & Primary Venues */}
          <div className="space-y-1.5 sm:space-y-2 my-3 sm:my-5 font-serif text-xs sm:text-base text-[#2C381F]">
            <div className="flex items-center justify-center space-x-2 text-[#4B5A2B] font-semibold">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C29B38]" />
              <span>{data.weddingDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#2C381F]/80 font-sans">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4B5A2B]" />
              <span>{data.primaryVenue} • {data.venueCity}</span>
            </div>
          </div>

          {/* Complete Family Lineage & Residence from Card */}
          <div className="max-w-xl mx-auto my-3 sm:my-5 text-[11px] sm:text-xs text-[#2C381F]/90 border-t border-[#C29B38]/30 pt-3 space-y-1.5">
            {data.grandparentsGroom && (
              <p className="font-serif font-medium text-[#4B5A2B]">
                {data.grandparentsGroom}
              </p>
            )}
            <p className="font-medium">
              <span className="text-[#4B5A2B] font-semibold">Groom: </span>
              {data.parentsGroom}
            </p>
            <p className="font-medium">
              <span className="text-[#4B5A2B] font-semibold">Bride: </span>
              {data.parentsBride}
            </p>
            {data.residenceAddress && (
              <p className="text-[10px] sm:text-[11px] text-[#2C381F]/70 flex items-center justify-center space-x-1 mt-1">
                <Home className="w-3 h-3 text-[#4B5A2B] flex-shrink-0" />
                <span>Residence: {data.residenceAddress}</span>
              </p>
            )}
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-[#C29B38]/30 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsQuickEditOpen(true)}
              className="min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gold-gradient text-burgundy-950 font-serif text-xs sm:text-sm tracking-wider uppercase font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-2 border border-gold-400 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-burgundy-900" />
              <span>Edit Text &amp; Details</span>
            </button>

            <button
              onClick={handleScrollDown}
              className="min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#4B5A2B] hover:bg-[#3B4722] text-white font-serif text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-1.5"
            >
              <span>Explore Invitation</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>

            <button
              onClick={handleScrollToEvents}
              className="min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#FCFAF5] border border-[#4B5A2B] text-[#4B5A2B] hover:bg-[#EAE6D9] font-serif text-xs sm:text-sm tracking-wider uppercase font-semibold transition-all inline-flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Event Itinerary</span>
            </button>

            <a
              href="tel:+919910262576"
              className="min-h-[44px] px-4 py-2.5 sm:py-3 rounded-full bg-[#EAE6D9] border border-[#C29B38] text-[#2C381F] hover:bg-[#E0DAC9] text-xs font-sans font-medium transition-colors inline-flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#4B5A2B]" />
              <span>Call Host</span>
            </a>

            <a
              href="https://wa.me/919910262576?text=Dear%20Arora%20Family%2C%20heartiest%20congratulations%20on%20Sahil%20%26%20Kajal%27s%20wedding%21%20We%20are%20delighted%20to%20confirm%20our%20presence."
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 sm:py-3 rounded-full bg-[#25D366] text-white hover:opacity-95 text-xs font-sans font-medium transition-opacity inline-flex items-center space-x-1.5 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp RSVP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Unfolded */}
      <div ref={contentRef}>
        {/* Sacred Sanskrit Shloka Blessing Section */}
        <section className="py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="bg-[#FCFAF5] border-2 border-[#4B5A2B]/30 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-1.5 border border-[#C29B38]/40 rounded-2xl pointer-events-none" />

            <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#4B5A2B] font-semibold mb-3">
              <Flower className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Sacred Vedic Invocations</span>
              <Flower className="w-3.5 h-3.5 text-[#C29B38]" />
            </div>

            <div className="space-y-4 my-3 font-serif text-[#4B5A2B]">
              <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#C29B38]/30">
                <p className="text-sm sm:text-lg font-medium tracking-wide">
                  {shlokas[0]}
                </p>
                <p className="text-xs text-[#2C381F]/70 italic mt-1 font-sans">
                  "O Lord Ganesha, embodiment of immense radiance, remove all obstacles from our sacred undertakings."
                </p>
              </div>

              {shlokas[1] && (
                <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#C29B38]/30">
                  <p className="text-sm sm:text-lg font-medium tracking-wide">
                    {shlokas[1]}
                  </p>
                  <p className="text-xs text-[#2C381F]/70 italic mt-1 font-sans">
                    "Remover of hurdles, harbinger of auspiciousness, our foremost invitation is unto Thee—fulfill this auspicious celebration."
                  </p>
                </div>
              )}
            </div>

            {/* Direct Venue Navigation Shortcuts */}
            <div className="mt-8 pt-6 border-t border-[#C29B38]/30">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4B5A2B] mb-3">
                Direct Venue Navigation Links (Google Maps)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hotel+Surya+Grand+Community+Centre+J-14+Rajouri+Garden+New+Delhi+110027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#F7F4EE] border border-[#4B5A2B]/30 hover:border-[#4B5A2B] transition-colors flex items-start space-x-2.5 group"
                >
                  <Navigation className="w-4 h-4 text-[#C29B38] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#2C381F] block">Hotel Surya Grand</span>
                    <span className="text-[#2C381F]/70 text-[11px] block">Rajouri Garden • Sagan & Cocktail</span>
                    <span className="text-[#4B5A2B] font-medium text-[10px] inline-flex items-center space-x-1 mt-1">
                      <span>Open Map</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=C-96+Moti+Nagar+New+Delhi+110015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#F7F4EE] border border-[#4B5A2B]/30 hover:border-[#4B5A2B] transition-colors flex items-start space-x-2.5 group"
                >
                  <Navigation className="w-4 h-4 text-[#C29B38] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#2C381F] block">Arora Residence</span>
                    <span className="text-[#2C381F]/70 text-[11px] block">C-96 Moti Nagar • Sehra Bandi</span>
                    <span className="text-[#4B5A2B] font-medium text-[10px] inline-flex items-center space-x-1 mt-1">
                      <span>Open Map</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Andaaj+Mansion+Banquet+63+Rama+Road+Kirti+Nagar+New+Delhi+110015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#F7F4EE] border border-[#4B5A2B]/30 hover:border-[#4B5A2B] transition-colors flex items-start space-x-2.5 group"
                >
                  <Navigation className="w-4 h-4 text-[#C29B38] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#2C381F] block">Andaaj Mansion Banquet</span>
                    <span className="text-[#2C381F]/70 text-[11px] block">Rama Road, Kirti Nagar • Vivah</span>
                    <span className="text-[#4B5A2B] font-medium text-[10px] inline-flex items-center space-x-1 mt-1">
                      <span>Open Map</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Story & Family Journey */}
        <section className="py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#4B5A2B] font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>The Journey of Sahil &amp; Kajal</span>
            <Heart className="w-3.5 h-3.5 text-[#C29B38]" />
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-5xl text-[#4B5A2B] mb-3 sm:mb-4 break-words font-normal">
            Destiny Brought Them Together
          </h2>
          <p className="font-serif text-sm sm:text-lg text-[#2C381F]/90 italic max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            "{data.welcomeNote}"
          </p>

          {/* Visual Highlight */}
          <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#4B5A2B]/30 shadow-lg mb-8 sm:mb-12">
            <RoyalImage
              src={data.gallery[0]?.src || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'}
              alt="Sahil & Kajal Wedding Portrait"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {data.story.map((chapter) => (
              <div
                key={chapter.title}
                className="p-4 sm:p-6 rounded-2xl bg-[#FCFAF5] border border-[#4B5A2B]/30 shadow-xs hover:border-[#4B5A2B] transition-colors"
              >
                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#4B5A2B] bg-[#EAE6D9] px-2.5 py-1 rounded-full inline-block mb-3">
                  {chapter.year}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C381F] mb-1.5 sm:mb-2">{chapter.title}</h3>
                <p className="text-xs text-[#2C381F]/80 leading-relaxed font-sans font-light">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Auspicious Countdown in Sacred Olive */}
        <CountdownTimer
          targetDateIso={data.weddingDateIso}
          locationHint={`${data.primaryVenue} • ${data.venueCity}`}
          variant="olive"
        />

        {/* Multi-Day Rituals & Ceremonies (Sahil & Kajal Itinerary) */}
        <div ref={eventsRef}>
          <EventsSchedule
            events={data.events}
            title="Ceremonies & Wedding Program"
            subtitle="Please grace all the functions with your kind presence and blessings."
            coupleNames={`${data.groomName} & ${data.brideName}`}
          />
        </div>

        {/* Pre-Wedding Memories */}
        <PhotoGallery
          photos={data.gallery}
          title="Celebration Gallery"
          subtitle="Cherished glimpses and festive memories of Sahil & Kajal's wedding celebrations. Drag and drop photos to reorder or drop new photos directly."
          onPhotosChange={(updated) => {
            if (onUpdateData) {
              onUpdateData({ ...data, gallery: updated });
            }
          }}
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

      {/* Direct On-Page Quick Edit Modal for Instant Text Updates */}
      {isQuickEditOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-burgundy-950/75 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-[#FCFAF5] rounded-3xl border-2 border-[#C29B38] p-5 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#C29B38]/40 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-gold-200 text-burgundy-900 flex items-center justify-center shadow-xs">
                  <Edit3 className="w-4 h-4 text-burgundy-900" />
                </div>
                <div>
                  <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-[#4B5A2B]">
                    Quick Edit Text &amp; Details
                  </h3>
                  <p className="text-[11px] text-[#2C381F]/70 font-serif">
                    Live editable • Updates your invitation on the screen in real-time
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickEditOpen(false)}
                className="w-8 h-8 rounded-full bg-[#EAE6D9] hover:bg-[#D8D2C0] flex items-center justify-center text-[#2C381F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Couple Names */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    value={data.groomName || ''}
                    onChange={(e) => handleFieldChange('groomName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] font-serif text-sm focus:ring-1 focus:ring-[#4B5A2B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    value={data.brideName || ''}
                    onChange={(e) => handleFieldChange('brideName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] font-serif text-sm focus:ring-1 focus:ring-[#4B5A2B]"
                  />
                </div>
              </div>

              {/* Wedding Dates & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    Wedding Date Text
                  </label>
                  <input
                    type="text"
                    value={data.weddingDateFormatted || ''}
                    onChange={(e) => handleFieldChange('weddingDateFormatted', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    value={data.venueCity || ''}
                    onChange={(e) => handleFieldChange('venueCity', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                  Primary Venue
                </label>
                <input
                  type="text"
                  value={data.primaryVenue || ''}
                  onChange={(e) => handleFieldChange('primaryVenue', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                />
              </div>

              {/* Parents & Family Lineage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    Groom's Parents
                  </label>
                  <input
                    type="text"
                    value={data.parentsGroom || ''}
                    onChange={(e) => handleFieldChange('parentsGroom', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                    Bride's Parents
                  </label>
                  <input
                    type="text"
                    value={data.parentsBride || ''}
                    onChange={(e) => handleFieldChange('parentsBride', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                  Grandparents &amp; Lineage
                </label>
                <input
                  type="text"
                  value={data.grandparentsGroom || ''}
                  onChange={(e) => handleFieldChange('grandparentsGroom', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                  Residence Address
                </label>
                <input
                  type="text"
                  value={data.residenceAddress || ''}
                  onChange={(e) => handleFieldChange('residenceAddress', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4B5A2B] mb-1">
                  Welcome Story Message
                </label>
                <textarea
                  rows={2}
                  value={data.welcomeNote || ''}
                  onChange={(e) => handleFieldChange('welcomeNote', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#C29B38]/50 bg-white text-[#2C381F] text-xs"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-[#C29B38]/30">
              <button
                type="button"
                onClick={() => {
                  setIsQuickEditOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs font-serif text-[#4B5A2B] hover:text-[#2C381F] underline flex items-center space-x-1"
              >
                <Sliders className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>Open Full Customizer (Events, Photos, Music)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsQuickEditOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#4B5A2B] text-white font-serif text-xs font-bold hover:bg-[#3B4722] transition-colors shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Done &amp; Saved</span>
              </button>
            </div>

            {quickSaved && (
              <div className="mt-2 text-center text-emerald-800 text-xs font-serif font-bold animate-fade-in">
                ✓ Text updated live and saved to device!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
