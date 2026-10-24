import React, { useState, useEffect } from 'react';
import { WeddingData } from '../types/wedding';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2 } from 'lucide-react';

interface RoyalEnvelopeExperienceProps {
  data: WeddingData;
  onOpenComplete?: () => void;
  isOpen?: boolean;
  onReopen?: () => void;
  variant?: 'crimson-gold' | 'heritage-olive';
}

export const RoyalEnvelopeExperience: React.FC<RoyalEnvelopeExperienceProps> = ({
  data,
  onOpenComplete,
  isOpen: externalIsOpen,
  onReopen,
  variant = 'crimson-gold',
}) => {
  // Envelope animation lifecycle: 'sealed' -> 'unsealing' -> 'dissolving' -> 'opened'
  const [animationPhase, setAnimationPhase] = useState<'sealed' | 'unsealing' | 'dissolving' | 'opened'>(
    externalIsOpen ? 'opened' : 'sealed'
  );

  // Sync external isOpen prop if provided
  useEffect(() => {
    if (externalIsOpen && animationPhase === 'sealed') {
      setAnimationPhase('opened');
    }
  }, [externalIsOpen, animationPhase]);

  const handleOpenEnvelope = () => {
    if (animationPhase !== 'sealed') return;

    // 1. Play celebratory royal confetti shower with gold flecks & rose petals
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.52 },
        colors: ['#D4AF37', '#F5E6C8', '#A12D3A', '#FFFFFF', '#D8A48F'],
        ticks: 200,
        gravity: 0.9,
        scalar: 1.1,
      });

      // Extra subtle secondary burst
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#D4AF37', '#F5E6C8', '#A12D3A'],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#D4AF37', '#F5E6C8', '#A12D3A'],
        });
      }, 250);
    } catch {
      // Graceful fallback if canvas is restricted
    }

    // 2. Start Unsealing Phase: Wax seal releases & flap flips open in 3D
    setAnimationPhase('unsealing');

    // 3. Start Dissolve Phase: Envelope scales up, blurs, and dissolves into the wedding invitation
    setTimeout(() => {
      setAnimationPhase('dissolving');
    }, 450);

    // 4. Complete Phase: Envelope unmounts, revealing the full wedding invitation suite
    setTimeout(() => {
      setAnimationPhase('opened');
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 1300);
  };

  const handleReopen = () => {
    setAnimationPhase('sealed');
    if (onReopen) {
      onReopen();
    }
  };

  const isOlive = variant === 'heritage-olive' || data.brideName === 'Kajal';
  const envelopeBg = isOlive ? 'bg-[#25301B]' : 'bg-[#4B0F1B]';
  const envelopeAccent = isOlive ? 'border-[#C29B38]' : 'border-gold-400';
  const sealColor = isOlive
    ? 'bg-gradient-to-br from-[#8C2333] via-[#65101C] to-[#3B070F]'
    : 'bg-gradient-to-br from-[#A52033] via-[#7B1222] to-[#480A13]';
  const backdropGradient = isOlive
    ? 'bg-gradient-to-b from-[#0F160C]/96 via-[#1A2614]/96 to-[#0A1008]/98'
    : 'bg-gradient-to-b from-[#14080D]/96 via-[#230C16]/96 to-[#0F050A]/98';
  const flapGradient = isOlive
    ? 'bg-gradient-to-b from-[#182212] via-[#2A371F] to-transparent'
    : 'bg-gradient-to-b from-[#320811] via-[#4A0D1A] to-transparent';

  // Floating button to re-live the envelope opening after it has dissolved
  if (animationPhase === 'opened') {
    return (
      <div className="fixed bottom-20 left-4 z-40">
        <button
          onClick={handleReopen}
          className={`group px-4 py-2 rounded-full ${
            isOlive ? 'bg-[#25301B]/95 text-gold-200 border-[#C29B38]/60' : 'bg-burgundy-950/90 text-gold-200 border-gold-400/60'
          } border shadow-royal hover:scale-105 active:scale-95 transition-all text-xs font-serif flex items-center space-x-2 backdrop-blur-md cursor-pointer`}
          title="Experience Royal Envelope Opening Again"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">✉</span>
          <span className="hidden sm:inline">Experience Envelope Again</span>
          <span className="sm:hidden">Envelope</span>
        </button>
      </div>
    );
  }

  const isFlapOpen = animationPhase === 'unsealing' || animationPhase === 'dissolving';
  const isDissolving = animationPhase === 'dissolving';

  return (
    <div
      role="region"
      aria-label="Interactive Royal Wedding Envelope"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden transition-all duration-1000 ${
        isDissolving
          ? 'opacity-0 scale-110 blur-xl pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      } ${backdropGradient} backdrop-blur-xl`}
    >
      {/* Ambient Starlight & Floating Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gold-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-10 left-10 text-gold-400/30 text-xl animate-float">✦</div>
        <div className="absolute top-1/3 right-8 text-gold-400/25 text-sm animate-float [animation-delay:1.5s]">✦</div>
        <div className="absolute bottom-20 left-12 text-gold-400/20 text-base animate-float [animation-delay:2.5s]">✦</div>
        <div className="absolute bottom-12 right-12 text-gold-400/30 text-xl animate-float [animation-delay:1s]">✦</div>
      </div>

      {/* Main Royal Envelope Card Frame (Optimized for Mobile Touch) */}
      <div
        onClick={handleOpenEnvelope}
        className="w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] sm:aspect-[4/5] max-h-[82vh] relative select-none cursor-pointer group transform transition-transform duration-500 hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
      >
        {/* Soft Golden Outer Shadow */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-gold-600/20 blur-md pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Envelope Pocket Base */}
        <div
          className={`relative w-full h-full rounded-2xl sm:rounded-3xl ${envelopeBg} border-2 ${envelopeAccent} shadow-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-6 text-center text-cream-50`}
        >
          {/* Subtle Jaali Texture Layer */}
          <div className="absolute inset-0 bg-jaali-burgundy opacity-25 pointer-events-none" />

          {/* Inner Ornate Gold Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-gold-400/40 pointer-events-none" />
          <div className="absolute inset-2.5 sm:inset-3.5 rounded-lg sm:rounded-xl border border-gold-300/20 pointer-events-none" />

          {/* Corner Floral Ornaments */}
          <div className="absolute top-3.5 left-3.5 text-gold-400/70 text-xs sm:text-sm pointer-events-none">❖</div>
          <div className="absolute top-3.5 right-3.5 text-gold-400/70 text-xs sm:text-sm pointer-events-none">❖</div>
          <div className="absolute bottom-3.5 left-3.5 text-gold-400/70 text-xs sm:text-sm pointer-events-none">❖</div>
          <div className="absolute bottom-3.5 right-3.5 text-gold-400/70 text-xs sm:text-sm pointer-events-none">❖</div>

          {/* Top Section: Divine Sanskrit Invocation */}
          <div className="relative z-10 pt-2 sm:pt-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/40 text-[10px] sm:text-xs font-serif tracking-widest text-gold-300 uppercase shadow-xs">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>{data.invocation || '॥ श्री गणेशाय नमः ॥'}</span>
              <Sparkles className="w-3 h-3 text-gold-400" />
            </div>
            <p className="text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.25em] text-gold-200/60 mt-1.5">
              With Divine Blessings of Elders &amp; Ancestors
            </p>
          </div>

          {/* Center Section: Grand Wedding Addressing & Names */}
          <div className="relative z-10 my-auto py-2 sm:py-3 space-y-1 sm:space-y-2">
            <p className="font-script-accent text-xl sm:text-2xl text-gold-300">
              The Royal Wedding of
            </p>

            <h1 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl font-light text-cream-100 tracking-tight leading-tight px-2">
              <span className="block font-medium text-gold-100">{data.groomName}</span>
              <span className="font-script-accent text-xl sm:text-3xl text-gold-400 my-0.5 block font-normal">
                &amp;
              </span>
              <span className="block font-medium text-cream-100">{data.brideName}</span>
            </h1>

            <div className="pt-2 sm:pt-3 flex items-center justify-center space-x-3 text-gold-400/80">
              <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-gold-200 font-semibold">
                {data.weddingDateFormatted || 'November 2026'}
              </span>
              <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
            </div>

            <p className="text-[10px] sm:text-xs font-sans text-cream-200/70 tracking-wider uppercase">
              {data.venueCity || 'New Delhi'} • {data.primaryVenue?.split('&')[0] || 'Royal Banquet'}
            </p>
          </div>

          {/* 3D Wax Seal on the Flap Tip */}
          <div className="relative z-20 flex flex-col items-center justify-center my-1">
            <div className="relative group/seal">
              {/* Pulsing Golden Aura Ring */}
              <div className="absolute -inset-3 rounded-full bg-gold-400/25 blur-sm animate-ping pointer-events-none" />
              <div className="absolute -inset-1 rounded-full bg-gold-400/40 blur-xs animate-pulse pointer-events-none" />

              {/* Realistic 3D Wax Seal Disc */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${sealColor} border-2 border-gold-300/80 flex items-center justify-center shadow-[0_10px_25px_-4px_rgba(0,0,0,0.8),inset_0_2px_6px_rgba(255,255,255,0.4)] relative transform transition-all duration-300 group-hover:scale-105 active:scale-95`}
              >
                {/* Wax Irregular Rim Effect */}
                <div className="absolute inset-1 rounded-full border border-gold-400/50 border-dashed opacity-75" />
                
                {/* Embossed Couple Monogram Initials */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-serif-royal font-bold text-lg sm:text-2xl text-gold-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {data.monogram || 'S & K'}
                  </span>
                  <span className="text-[7px] font-sans uppercase tracking-[0.2em] text-gold-300/80 -mt-0.5">
                    Royal Seal
                  </span>
                </div>
              </div>
            </div>

            {/* Bouncing Call to Action Hint */}
            <div className="mt-2.5 sm:mt-3 flex items-center space-x-1 text-gold-300 text-xs sm:text-sm font-serif font-bold tracking-widest uppercase animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin [animation-duration:4s]" />
              <span>Tap To Open Envelope</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin [animation-duration:4s]" />
            </div>
            <p className="text-[9px] sm:text-[10px] text-cream-200/60 font-sans tracking-wider mt-0.5">
              Click anywhere for royal dissolve transition
            </p>
          </div>

          {/* Bottom Dispatch Hallmark & Created By Notice */}
          <div className="relative z-10 pt-2 pb-1 border-t border-gold-400/30 flex flex-col items-center space-y-0.5">
            <div className="flex items-center justify-center space-x-2 text-[9px] sm:text-[10px] text-gold-200/90 font-sans tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block" />
              <span>Official Wedding Dispatch • Royal Post</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block" />
            </div>
            <p className="font-sans text-[10px] text-cream-200/50 uppercase tracking-[0.16em]">
              created by Photographically Yours 2026
            </p>
          </div>

          {/* Top Flap Overlay for 3D Opening Effect */}
          <div
            style={{
              transformOrigin: 'top center',
              transform: isFlapOpen ? 'rotateX(170deg) translateY(-8px)' : 'rotateX(0deg)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className={`absolute top-0 inset-x-0 h-28 sm:h-36 ${flapGradient} pointer-events-none rounded-t-2xl sm:rounded-t-3xl border-t border-gold-400/60 z-30`}
          >
            {/* Flap Gold Pinstripe */}
            <div className="w-full h-full border-b-2 border-gold-400/40 relative">
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-gold-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sound & Gesture Guidance */}
      <div className="absolute bottom-6 sm:bottom-9 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center">
        <p className="text-[10px] sm:text-xs text-gold-200/80 font-serif flex items-center space-x-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-gold-400/30 backdrop-blur-sm">
          <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Tap to open • Interactive royal sound &amp; dissolve animation</span>
        </p>
      </div>

      {/* Subtle Bottom Hallmark — Sans-serif, at bottom, slightly visible */}
      <div className="absolute bottom-1.5 sm:bottom-2.5 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center">
        <p className="font-sans text-[10px] sm:text-[11px] text-cream-200/50 tracking-[0.2em] uppercase font-medium select-none">
          created by Photographically Yours 2026
        </p>
      </div>
    </div>
  );
};
