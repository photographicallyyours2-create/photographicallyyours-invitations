import { useState } from 'react';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';

interface StudioNavProps {
  currentRoute: string; // e.g. 'home', 'catalogue', 'enquire', 'template-detail', 'template'
  onNavigate: (route: string) => void;
}

export const StudioNav: React.FC<StudioNavProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#/' },
    { id: 'catalogue', label: 'The Collection', href: '#/catalogue' },
    { id: 'process', label: 'The Process', href: '#/process' },
    { id: 'features', label: 'Features', href: '#/features' },
    { id: 'enquire', label: 'Enquire', href: '#/enquire' },
  ];

  const handleNavClick = (routeId: string) => {
    setMobileMenuOpen(false);
    if (routeId === 'process' || routeId === 'features') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(routeId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    onNavigate(routeId);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-gold-300/70 shadow-sm text-charcoal-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left focus:outline-none group min-h-[44px]"
            aria-label="Photographically Yours Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-400/80 bg-cream-50 p-0.5 flex items-center justify-center shadow-gold-subtle group-hover:border-gold-600 transition-colors flex-shrink-0 overflow-hidden">
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
              <span className="font-serif-royal text-base sm:text-xl font-bold text-burgundy-950 tracking-wider block leading-none">
                PHOTOGRAPHICALLY YOURS
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.25em] text-gold-800 font-semibold block mt-1">
                Luxury Digital Wedding Stationery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs uppercase tracking-[0.2em] font-sans font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-burgundy-900 font-semibold'
                      : 'text-charcoal-800/75 hover:text-burgundy-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('enquire')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif tracking-wider uppercase font-semibold shadow-gold-subtle hover:bg-burgundy-800 hover:shadow-gold-glow transition-all min-h-[40px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Create Your Invitation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={() => handleNavClick('enquire')}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-burgundy-900 text-gold-200 text-[11px] font-serif uppercase tracking-wider min-h-[36px]"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-800 hover:text-burgundy-900 hover:bg-cream-200 focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-gold-300/80 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-serif tracking-wider flex items-center justify-between min-h-[44px] ${
                  currentRoute === link.id
                    ? 'bg-burgundy-900 text-gold-200 font-semibold'
                    : 'text-charcoal-800 hover:bg-cream-100'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gold-200/60">
            <button
              onClick={() => handleNavClick('enquire')}
              className="w-full py-3.5 rounded-full bg-burgundy-900 text-gold-200 text-xs font-serif uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 shadow-md min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Create Your Invitation</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
