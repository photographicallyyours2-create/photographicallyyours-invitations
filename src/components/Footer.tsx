import React, { useState } from 'react';
import { WeddingData } from '../types/wedding';
import { MonogramBadge, RoyalDivider } from './JaaliDecor';
import { Copy, Check, ArrowUp } from 'lucide-react';

interface FooterProps {
  data: WeddingData;
  onOpenAdmin: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenAdmin, onScrollToTop }) => {
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(data.hashtag);
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2000);
  };

  return (
    <footer className="bg-burgundy-950 text-cream-50 pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 border-t-2 border-gold-500/40 relative overflow-hidden">
      {/* Background Jaali filigree */}
      <div className="absolute inset-0 bg-jaali-burgundy opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Monogram */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <MonogramBadge initials={data.monogram} size="md" />
        </div>

        {/* Names */}
        <h2 className="font-serif-royal text-2xl sm:text-5xl text-cream-100 font-light mb-2 break-words">
          {data.brideName} <span className="font-script-accent text-gold-400 text-2xl sm:text-4xl">&</span> {data.groomName}
        </h2>

        <p className="font-serif text-xs sm:text-base text-gold-300 tracking-wider sm:tracking-widest uppercase mb-3 sm:mb-4">
          {data.weddingDateFormatted} • {data.venueCity}
        </p>

        {/* Hashtag with copy interaction */}
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-burgundy-900/80 border border-gold-500/40 text-gold-200 text-xs sm:text-sm my-3 sm:my-4">
          <span className="font-serif tracking-wider font-semibold">{data.hashtag}</span>
          <button
            onClick={handleCopyHashtag}
            title="Copy wedding hashtag"
            className="hover:text-gold-100 transition-colors p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
          >
            {copiedHashtag ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gold-400" />
            )}
          </button>
        </div>

        <RoyalDivider dark />

        {/* Tasteful Closing Sanskrit Blessing */}
        <p className="font-serif text-sm sm:text-lg text-gold-200/90 italic max-w-xl mx-auto my-4 sm:my-6 leading-relaxed">
          "With gratitude for your love, your prayers, and for being part of our royal celebration in Udaipur."
        </p>

        <p className="font-serif text-[11px] sm:text-xs text-gold-400/80 tracking-widest mb-6 sm:mb-8">
          ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
        </p>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/70 font-sans gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <img
              src="./py-logo.png"
              alt="Photographically Yours"
              className="w-5 h-5 rounded-full object-contain border border-gold-400/50"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/py-logo.png';
              }}
            />
            <span className="font-sans text-[11px] text-cream-200/55 tracking-widest uppercase">
              created by Photographically Yours 2026
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="min-h-[40px] py-1 text-gold-300/80 hover:text-gold-200 underline underline-offset-4 decoration-gold-400/40 transition-colors"
            >
              Customizer Editor
            </button>
            <button
              onClick={onScrollToTop}
              className="min-h-[40px] py-1 inline-flex items-center space-x-1 hover:text-gold-200 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
