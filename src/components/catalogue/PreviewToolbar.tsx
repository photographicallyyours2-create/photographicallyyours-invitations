import React, { useState } from 'react';
import { templateRegistry } from '../../data/templateRegistry';
import { ArrowLeft, Monitor, Smartphone, Sliders, ChevronDown, Share2, Check } from 'lucide-react';

interface PreviewToolbarProps {
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onBackToCatalogue: () => void;
  onOpenAdmin: () => void;
  viewportMode: 'desktop' | 'mobile';
  onToggleViewport: (mode: 'desktop' | 'mobile') => void;
}

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  currentTemplateId,
  onSelectTemplate,
  onBackToCatalogue,
  onOpenAdmin,
  viewportMode,
  onToggleViewport,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const currentTemplate =
    templateRegistry.find((t) => t.id === currentTemplateId) || templateRegistry[0];

  const handleCopyClientLink = () => {
    // Generate clean client invitation link
    const cleanRoute =
      currentTemplateId === 'bodh-heritage'
        ? '#/photographicallyyours/sahil-kajal'
        : `#/template/${currentTemplateId}`;
    const fullUrl = `${window.location.origin}${window.location.pathname}${cleanRoute}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-burgundy-950/95 backdrop-blur-md border-b border-gold-500/40 text-cream-50 px-3 sm:px-6 py-2.5 shadow-royal">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Brand Logo & Back to Catalogue */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onBackToCatalogue}
            className="inline-flex items-center space-x-1.5 text-xs font-serif tracking-wider text-gold-300 hover:text-gold-100 transition-colors py-1 px-2 rounded-lg hover:bg-burgundy-900/60"
            aria-label="Return to Template Catalogue"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catalogue</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Official Photographically Yours Logo Badge */}
          <div className="hidden xs:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-burgundy-900 border border-gold-500/50">
            <img
              src="./py-logo.png"
              alt="Photographically Yours"
              className="w-5 h-5 rounded-full object-contain bg-cream-50 p-0.5"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/py-logo.png';
              }}
            />
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-gold-200">
              Photographically Yours
            </span>
          </div>
        </div>

        {/* Template Selector Dropdown */}
        <div className="relative flex items-center">
          <div className="flex items-center space-x-2">
            <span className="hidden md:inline text-[11px] uppercase tracking-widest text-gold-400 font-sans">
              Suite:
            </span>
            <div className="relative">
              <select
                value={currentTemplateId}
                onChange={(e) => onSelectTemplate(e.target.value)}
                className="appearance-none bg-burgundy-900 border border-gold-400/60 text-gold-200 text-xs font-serif tracking-wide py-1.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer max-w-[130px] xs:max-w-[170px] sm:max-w-xs truncate"
                aria-label="Switch wedding template"
              >
                {templateRegistry.map((tpl) => (
                  <option key={tpl.id} value={tpl.id} className="bg-burgundy-950 text-cream-100">
                    {tpl.number} — {tpl.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gold-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Current status tag */}
            <span
              className={`hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-sans font-medium ${
                currentTemplate.status === 'live'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                  : 'bg-amber-950 text-amber-300 border border-amber-700/60'
              }`}
            >
              {currentTemplate.status === 'live' ? '● Interactive Suite' : '◐ Studio Preview'}
            </span>
          </div>
        </div>

        {/* Viewport, Share Link & Customizer Controls */}
        <div className="flex items-center space-x-2">
          {/* Share Client Link Button */}
          <button
            onClick={handleCopyClientLink}
            title="Copy clean client link (#/photographicallyyours/sahil-kajal)"
            className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-burgundy-900 border border-gold-400/60 text-gold-200 hover:bg-burgundy-800 text-xs font-sans transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium text-[11px]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gold-300" />
                <span className="hidden sm:inline text-[11px]">Share Link</span>
              </>
            )}
          </button>

          {/* Viewport switcher */}
          <div className="hidden sm:flex items-center bg-burgundy-900 rounded-full p-0.5 border border-gold-400/40">
            <button
              onClick={() => onToggleViewport('desktop')}
              title="Desktop View"
              className={`p-1.5 rounded-full transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-gold-500 text-burgundy-950 shadow-sm'
                  : 'text-gold-300 hover:text-gold-100'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewport('mobile')}
              title="WhatsApp Mobile View"
              className={`p-1.5 rounded-full transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-gold-500 text-burgundy-950 shadow-sm'
                  : 'text-gold-300 hover:text-gold-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customize Demo Content Button */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gold-gradient text-burgundy-950 text-xs font-serif font-semibold shadow-gold-subtle hover:shadow-gold-glow transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-burgundy-900" />
            <span className="hidden sm:inline">Customize Demo</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
