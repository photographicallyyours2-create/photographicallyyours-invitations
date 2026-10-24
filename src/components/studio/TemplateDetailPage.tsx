import React, { useState } from 'react';
import { templateRegistry } from '../../data/templateRegistry';
import { WeddingData } from '../../types/wedding';
import { getTemplateDefaultData } from '../../data/weddingData';
import { ArrowLeft, Monitor, Smartphone, Sparkles, ExternalLink, ArrowRight, Palette, Type, CheckCircle2 } from 'lucide-react';

// Templates
import { RoyalHeirloomTemplate } from '../../templates/RoyalHeirloomTemplate';
import { MewarMehfilTemplate } from '../../templates/MewarMehfilTemplate';
import { PalaceCelebrationTemplate } from '../../templates/PalaceCelebrationTemplate';
import { RegalChronicleTemplate } from '../../templates/RegalChronicleTemplate';
import { GardenRoyaleTemplate } from '../../templates/GardenRoyaleTemplate';
import { DesertRoyaleTemplate } from '../../templates/DesertRoyaleTemplate';
import { ModernEditorialTemplate } from '../../templates/ModernEditorialTemplate';
import { FloralMinimalTemplate } from '../../templates/FloralMinimalTemplate';
import { TimelessEditorialTemplate } from '../../templates/TimelessEditorialTemplate';
import { DestinationEditTemplate } from '../../templates/DestinationEditTemplate';
import { BodhHeritageTemplate } from '../../templates/BodhHeritageTemplate';
import { ShlokaRoyaleTemplate } from '../../templates/ShlokaRoyaleTemplate';
import { PastelCourtyardTemplate } from '../../templates/PastelCourtyardTemplate';

interface TemplateDetailPageProps {
  templateId: string;
  weddingData: WeddingData;
  onNavigate: (route: string) => void;
  onSelectInteractiveTemplate: (templateId: string) => void;
  onOpenEnquiryWithTemplate: (templateId: string) => void;
}

export const TemplateDetailPage: React.FC<TemplateDetailPageProps> = ({
  templateId,
  weddingData,
  onNavigate,
  onSelectInteractiveTemplate,
  onOpenEnquiryWithTemplate,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const template =
    templateRegistry.find((t) => t.id === templateId) || templateRegistry[0];

  // Prefer authentic template-specific couple data for detail previews
  const previewData = getTemplateDefaultData(template.id) || weddingData;

  // Helper to render the live template in the embedded frame
  const renderTemplateComponent = () => {
    switch (template.id) {
      case 'royal-heirloom':
        return <RoyalHeirloomTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'mewar-mehfil':
        return <MewarMehfilTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'palace-celebration':
        return <PalaceCelebrationTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'regal-chronicle':
        return <RegalChronicleTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'garden-royale':
        return <GardenRoyaleTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'desert-royale':
        return <DesertRoyaleTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'modern-editorial':
        return <ModernEditorialTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'floral-minimal':
        return <FloralMinimalTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'timeless-editorial':
        return <TimelessEditorialTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'destination-edit':
        return <DestinationEditTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'bodh-heritage':
        return <BodhHeritageTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'shloka-royale':
        return <ShlokaRoyaleTemplate data={previewData} onOpenAdmin={() => {}} />;
      case 'pastel-courtyard':
        return <PastelCourtyardTemplate data={previewData} onOpenAdmin={() => {}} />;
      default:
        return <RoyalHeirloomTemplate data={previewData} onOpenAdmin={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-cream-50 border-b border-gold-300/80 px-3 sm:px-8 py-2.5 sm:py-3 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center space-x-1.5 text-xs font-serif text-burgundy-900 hover:text-gold-700 transition-colors truncate max-w-[170px] sm:max-w-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">The Collection</span>
            <span className="hidden sm:inline text-charcoal-800/40">/</span>
            <span className="font-semibold truncate">{template.name}</span>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button
              onClick={() => onSelectInteractiveTemplate(template.id)}
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-serif text-charcoal-800 hover:text-burgundy-900 transition-colors"
            >
              <span>Open Fullscreen</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
            </button>

            <button
              onClick={() => onOpenEnquiryWithTemplate(template.id)}
              className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-burgundy-900 text-gold-200 text-[11px] sm:text-xs font-serif tracking-wider uppercase font-semibold hover:bg-burgundy-800 shadow-sm transition-all min-h-[36px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden sm:inline">Customize This Design</span>
              <span className="sm:hidden">Customize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Suite Presentation Header */}
      <section className="pt-6 sm:pt-10 pb-12 px-3 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Metadata & Story */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gold-800 font-semibold font-sans">
              <span className="w-6 h-6 rounded-full bg-gold-200 text-burgundy-900 flex items-center justify-center font-serif text-xs font-bold">
                {template.number}
              </span>
              <span>{template.categoryLabel} Collection</span>
            </div>

            <h1 className="font-serif-royal text-3xl sm:text-5xl text-burgundy-900 font-light leading-tight break-words">
              {template.name}
            </h1>

            <p className="font-serif italic text-base sm:text-xl text-gold-800">
              {template.subtitle}
            </p>

            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
              {template.description}
            </p>

            {/* Bespoke Color Palette Swatches */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-gold-300/80">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-burgundy-900 font-semibold mb-3">
                <Palette className="w-4 h-4 text-gold-600" />
                <span>Bespoke Color Palette</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {template.palette.map((c) => (
                  <div key={c.name} className="space-y-1 text-center">
                    <div
                      className="w-full h-9 rounded-lg border border-black/10 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="block text-[11px] font-semibold text-charcoal-800 truncate">
                      {c.name}
                    </span>
                    <span className="block text-[9px] font-mono text-charcoal-800/60">
                      {c.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography & Features */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-gold-300/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 uppercase tracking-wider text-burgundy-900 font-semibold">
                <Type className="w-4 h-4 text-gold-600" />
                <span>Typography Specimen</span>
              </div>
              <p className="font-serif text-base text-burgundy-950">
                {template.typographyPairing}
              </p>
              <div className="pt-2 border-t border-gold-200/60 space-y-1.5 text-charcoal-800/80 font-sans">
                {template.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onOpenEnquiryWithTemplate(template.id)}
                className="w-full py-3.5 rounded-full bg-burgundy-gradient text-gold-200 font-serif text-sm uppercase tracking-wider font-semibold shadow-royal hover:shadow-gold-glow transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Customize This Suite For Your Wedding</span>
              </button>

              <button
                onClick={() => onSelectInteractiveTemplate(template.id)}
                className="w-full py-3 rounded-full border border-gold-400 bg-white text-burgundy-900 font-serif text-xs uppercase tracking-wider hover:bg-cream-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Full Interactive Invitation Suite</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
              </button>
            </div>
          </div>

          {/* Right Live Embedded Preview & Viewport Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewport bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-cream-50 border border-gold-300/80">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider text-charcoal-800/70 font-sans font-medium">
                  Preview Mode:
                </span>
                <span className="text-xs font-serif font-semibold text-burgundy-900">
                  {viewportMode === 'desktop' ? 'Desktop View' : 'WhatsApp Mobile View'}
                </span>
              </div>

              <div className="flex items-center space-x-1.5 bg-cream-200/60 rounded-full p-1 border border-gold-300/50">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-3 py-1 rounded-full text-xs font-serif flex items-center space-x-1.5 transition-colors ${
                    viewportMode === 'desktop'
                      ? 'bg-burgundy-900 text-gold-200 font-semibold shadow-xs'
                      : 'text-charcoal-800 hover:text-burgundy-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-3 py-1 rounded-full text-xs font-serif flex items-center space-x-1.5 transition-colors ${
                    viewportMode === 'mobile'
                      ? 'bg-burgundy-900 text-gold-200 font-semibold shadow-xs'
                      : 'text-charcoal-800 hover:text-burgundy-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Embedded Live Preview Container */}
            <div className="rounded-2xl sm:rounded-3xl border border-gold-400/80 shadow-royal overflow-hidden bg-white">
              {viewportMode === 'mobile' ? (
                /* Mobile Phone Frame Simulation */
                <div className="py-3 sm:py-8 px-1 sm:px-4 flex justify-center items-center bg-cream-200/50 min-h-[480px] sm:min-h-[600px]">
                  <div className="w-full max-w-[390px] rounded-2xl sm:rounded-[44px] overflow-hidden shadow-2xl border-2 sm:border-[8px] border-burgundy-950 bg-cream-50">
                    <div className="h-3.5 sm:h-5 bg-burgundy-950 flex items-center justify-center">
                      <div className="w-14 sm:w-20 h-1.5 sm:h-2.5 bg-burgundy-900 rounded-full" />
                    </div>
                    <div className="h-[520px] sm:h-[620px] overflow-y-auto simulated-mobile-canvas">
                      {renderTemplateComponent()}
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Canvas Container */
                <div className="h-[520px] sm:h-[680px] overflow-y-auto border-t border-gold-200">
                  {renderTemplateComponent()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
