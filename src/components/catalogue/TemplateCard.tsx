import React from 'react';
import { TemplateDefinition } from '../../types/template';
import { RoyalImage } from '../RoyalImage';
import { ArrowRight, CheckCircle2, Eye, Sparkles, Info } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateDefinition;
  onSelect: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onCustomize?: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onViewDetails,
  onCustomize,
}) => {
  return (
    <div className="group relative rounded-3xl bg-cream-50 border border-gold-300/70 shadow-sm hover:shadow-royal transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* Top Banner Tag */}
      {template.accentBadge && (
        <div className="absolute top-4 left-4 z-20 bg-burgundy-900 text-gold-200 text-[10px] font-serif uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400 shadow-md flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>{template.accentBadge}</span>
        </div>
      )}

      {/* Number Emblem */}
      <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-cream-50/90 backdrop-blur-md border border-gold-400/80 text-burgundy-900 font-serif-royal font-bold text-xs flex items-center justify-center shadow-sm">
        {template.number}
      </div>

      {/* Image Thumbnail */}
      <div>
        <div
          onClick={() => onSelect(template.id)}
          className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-cream-200"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(template.id)}
          aria-label={`Preview ${template.name}`}
        >
          <RoyalImage
            src={template.thumbnail}
            alt={template.name}
            fallbackTitle={template.name}
            className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id);
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-burgundy-900 text-gold-200 font-serif text-xs font-semibold shadow-royal border border-gold-400 hover:bg-burgundy-800 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-gold-400" />
              <span>Preview</span>
            </button>
            {onViewDetails && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(template.id);
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-cream-50/95 text-burgundy-900 font-serif text-xs font-semibold shadow-royal border border-gold-400 hover:bg-white transition-all"
              >
                <Info className="w-3.5 h-3.5 text-gold-600" />
                <span>Details</span>
              </button>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6">
          {/* Category & Status */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-sans uppercase tracking-[0.2em] text-gold-800 font-semibold text-[10px] sm:text-[11px]">
              {template.categoryLabel}
            </span>
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Ready for Customization</span>
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3
            onClick={() => onViewDetails ? onViewDetails(template.id) : onSelect(template.id)}
            className="font-serif-royal text-xl sm:text-2xl text-burgundy-900 font-normal tracking-wide group-hover:text-gold-700 transition-colors cursor-pointer"
          >
            {template.name}
          </h3>
          <p className="font-sans text-xs text-charcoal-800/70 italic mt-0.5 mb-2 sm:mb-3 font-light">
            {template.subtitle}
          </p>

          {/* Description */}
          <p className="font-sans text-xs text-charcoal-800/80 leading-relaxed font-light mb-3 sm:mb-4 line-clamp-2">
            {template.description}
          </p>

          {/* Color Palette Swatches */}
          <div className="border-t border-gold-200/60 pt-3 mb-3 sm:mb-4">
            <span className="block text-[10px] uppercase tracking-wider text-charcoal-800/60 font-semibold mb-1.5 sm:mb-2">
              Bespoke Palette
            </span>
            <div className="flex items-center space-x-2">
              {template.palette.map((color) => (
                <div
                  key={color.name}
                  className="group/swatch relative flex items-center justify-center"
                >
                  <div
                    className="w-5 h-5 rounded-full border border-black/15 shadow-xs transition-transform duration-200 hover:scale-125 cursor-help"
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute bottom-full mb-1.5 hidden group-hover/swatch:block whitespace-nowrap rounded bg-burgundy-950 px-2 py-1 text-[10px] text-cream-50 font-sans shadow-md z-30">
                    {color.name} ({color.hex})
                  </span>
                </div>
              ))}
              <span className="text-[11px] text-charcoal-800/50 font-sans italic ml-1 truncate">
                {template.aestheticMood}
              </span>
            </div>
          </div>

          {/* Key highlights */}
          <div className="space-y-1 text-[11px] text-charcoal-800/75 font-sans mb-3 sm:mb-4">
            {template.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="p-3.5 sm:p-4 px-4 sm:px-6 bg-cream-100/60 border-t border-gold-200/50 flex items-center justify-between gap-2">
        {onViewDetails ? (
          <button
            onClick={() => onViewDetails(template.id)}
            className="text-xs font-serif text-burgundy-900 hover:text-gold-700 underline underline-offset-2 transition-colors font-medium py-1"
          >
            Suite Details
          </button>
        ) : (
          <span className="text-[11px] font-sans text-charcoal-800/60 truncate">
            {template.typographyPairing}
          </span>
        )}

        <div className="flex items-center space-x-2">
          {onCustomize && (
            <button
              onClick={() => onCustomize(template.id)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full border border-gold-400 bg-white text-burgundy-900 text-xs font-serif hover:bg-gold-50 transition-colors shadow-xs min-h-[34px]"
            >
              Customize
            </button>
          )}

          <button
            onClick={() => onSelect(template.id)}
            className="inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif tracking-wider hover:bg-burgundy-800 hover:shadow-gold-glow transition-all min-h-[34px]"
          >
            <span>Preview</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
