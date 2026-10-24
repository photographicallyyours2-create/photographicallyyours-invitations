import React, { useState, useMemo } from 'react';
import { templateRegistry } from '../../data/templateRegistry';
import { TemplateCategory } from '../../types/template';
import { StudioHeader } from './StudioHeader';
import { TemplateCard } from './TemplateCard';
import { Search, Sparkles, MessageCircle } from 'lucide-react';
import { RoyalDivider } from '../JaaliDecor';

interface CatalogueViewProps {
  onSelectTemplate: (templateId: string) => void;
  onViewDetails: (templateId: string) => void;
  onCustomize: (templateId: string) => void;
  onNavigate: (route: string) => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectTemplate,
  onViewDetails,
  onCustomize,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = useMemo(() => {
    return templateRegistry.filter((template) => {
      const matchesCategory =
        activeCategory === 'all' || template.category === activeCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.aestheticMood.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories = useMemo(() => [
    { id: 'all', label: 'All Collections', count: templateRegistry.length },
    {
      id: 'indian-heritage',
      label: 'Indian Heritage',
      count: templateRegistry.filter((t) => t.category === 'indian-heritage').length,
    },
    {
      id: 'royal-destination',
      label: 'Royal & Destination',
      count: templateRegistry.filter((t) => t.category === 'royal-destination').length,
    },
    {
      id: 'minimal-editorial',
      label: 'Minimal & Editorial',
      count: templateRegistry.filter((t) => t.category === 'minimal-editorial').length,
    },
  ], []);

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 pb-20">
      {/* Studio Banner & Philosophy */}
      <StudioHeader />

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-cream-50/95 backdrop-blur-md border border-gold-300/80 rounded-2xl p-3 sm:p-4 shadow-royal flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as TemplateCategory | 'all')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif tracking-wider transition-all duration-200 min-h-[36px] flex items-center ${
                    isActive
                      ? 'bg-burgundy-900 text-gold-200 shadow-sm border border-gold-400/60 font-semibold'
                      : 'bg-cream-100 text-charcoal-800/80 hover:bg-gold-100/70 border border-gold-200/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1 sm:ml-1.5 text-[10px] ${isActive ? 'text-gold-300' : 'text-charcoal-800/50'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search palettes or mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gold-300/80 bg-white text-base sm:text-xs text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-gold-500 placeholder:text-charcoal-800/40 min-h-[38px]"
            />
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gold-200/60">
          <div>
            <h2 className="font-serif-royal text-2xl text-burgundy-900 font-semibold">
              {activeCategory === 'all'
                ? 'All Curated Invitation Suites'
                : categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <p className="text-xs text-charcoal-800/60 font-sans mt-0.5">
              Showing {filteredTemplates.length} invitation designs tailored for WhatsApp distribution
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-serif text-gold-800">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Handcrafted in Mewar &amp; Jaipur Tradition</span>
          </div>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelectTemplate}
                onViewDetails={onViewDetails}
                onCustomize={onCustomize}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-cream-50 rounded-3xl border border-gold-300/60 max-w-lg mx-auto p-8">
            <h3 className="font-serif-royal text-2xl text-burgundy-900 mb-2">No Suites Found</h3>
            <p className="text-xs text-charcoal-800/70 mb-4">
              We couldn't find any designs matching "{searchQuery}". Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Bespoke Studio Atelier Banner */}
      <section className="max-w-5xl mx-auto px-4 mt-24">
        <div className="bg-burgundy-950 text-cream-50 rounded-3xl p-8 sm:p-12 border border-gold-500/50 shadow-royal text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-jaali-burgundy opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-serif font-medium">
              Bespoke Digital Commission
            </span>
            <h3 className="font-serif-royal text-3xl sm:text-4xl text-cream-100 font-light mt-2 mb-4">
              Need a Completely Custom Heritage Monogram or Architectural Artwork?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gold-200/80 leading-relaxed font-light mb-6">
              Our studio works directly with royal families and couples across India, London, Dubai, and New York to commission hand-painted miniatures, royal wax seals, and bespoke WhatsApp invitation links.
            </p>
            <RoyalDivider dark />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={() => onNavigate('enquire')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold-gradient text-burgundy-950 font-serif text-xs font-semibold uppercase tracking-wider hover:shadow-gold-glow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Your Custom Invitation</span>
              </button>
              <a
                href="https://api.whatsapp.com/send?text=Hello%20Royal%20Wedding%20Atelier!%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20wedding%20invitation%20suite."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-medium hover:opacity-95 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
