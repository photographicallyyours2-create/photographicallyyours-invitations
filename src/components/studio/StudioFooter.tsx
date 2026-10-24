import { Sparkles, MessageCircle, Mail, Phone, Heart } from 'lucide-react';

interface StudioFooterProps {
  onNavigate: (route: string) => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-burgundy-950 text-cream-50 pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-gold-500/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-jaali-burgundy opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-16 border-b border-gold-500/20">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold-400 bg-cream-50 p-0.5 flex items-center justify-center shadow-gold-subtle overflow-hidden">
                <img
                  src="./py-logo.png"
                  alt="Photographically Yours Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/py-logo.png';
                  }}
                />
              </div>
              <div>
                <span className="font-serif-royal text-lg sm:text-xl font-bold text-cream-100 tracking-wider block">
                  PHOTOGRAPHICALLY YOURS
                </span>
                <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-gold-400 font-semibold block">
                  Luxury Digital Wedding Invitations
                </span>
              </div>
            </div>

            <p className="font-serif text-base sm:text-lg text-gold-200/90 italic leading-relaxed max-w-sm">
              "Your wedding. Your story. Beautifully invited."
            </p>

            <p className="font-sans text-xs text-cream-200/70 leading-relaxed font-light max-w-sm">
              Crafting bespoke digital wedding invitations for Indian celebrations globally. Palace-inspired architecture, authentic Vedic invocations, real-time RSVP coordination, and seamless WhatsApp delivery.
            </p>

            <div className="pt-1 sm:pt-2 flex items-center space-x-3 text-xs text-gold-300">
              <a
                href="https://api.whatsapp.com/send?text=Hello%20Photographically%20Yours!%20I%20would%20like%20to%20create%20a%20bespoke%20wedding%20invitation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 min-h-[40px] rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-white hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Photographically Yours</span>
              </a>
            </div>
          </div>

          {/* Suites Column */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-widest text-gold-400 font-semibold mb-2 sm:mb-4">
              The Collections
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs font-sans text-cream-200/80">
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-gold-200 transition-colors text-left py-1 min-h-[36px] inline-flex items-center"
                >
                  Indian Heritage Suites (01, 02, 11)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-gold-200 transition-colors text-left py-1 min-h-[36px] inline-flex items-center"
                >
                  Royal &amp; Destination Suites (03–06, 12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-gold-200 transition-colors text-left py-1 min-h-[36px] inline-flex items-center"
                >
                  Minimal &amp; Editorial Suites (07–10, 13)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-gold-200 transition-colors text-left font-medium text-gold-300 py-1 min-h-[36px] inline-flex items-center"
                >
                  View All 13 Designs →
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Studio Info */}
          <div className="md:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-widest text-gold-400 font-semibold mb-2 sm:mb-4">
              Atelier Concierge
            </h4>
            <div className="space-y-2 text-xs text-cream-200/80 font-sans">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span className="break-all">concierge@royalinviations.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>+91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
              </div>
              <p className="text-[11px] text-cream-200/60 leading-relaxed font-light pt-1">
                Studio locations: Lake Palace Road, Udaipur • Nariman Point, Mumbai • Mayfair, London
              </p>
            </div>

            <div className="pt-2 sm:pt-3">
              <button
                onClick={() => onNavigate('enquire')}
                className="min-h-[44px] inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gold-gradient text-burgundy-950 font-serif text-xs font-semibold uppercase tracking-wider hover:shadow-gold-glow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book a Design Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sanskrit blessing & copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/60 font-sans gap-3 sm:gap-4 text-center sm:text-left">
          <p className="font-serif text-gold-400 tracking-wider">
            ॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥
          </p>

          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span>for Royal Indian Weddings Globally</span>
          </div>

          <p className="font-sans text-[11px] text-cream-200/55 tracking-widest uppercase">
            created by Photographically Yours 2026 • Premium Digital Wedding Stationery &amp; Photography
          </p>
        </div>
      </div>
    </footer>
  );
};
