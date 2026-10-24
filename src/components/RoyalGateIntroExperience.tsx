import React, { useState, useRef, useEffect } from 'react';
import { WeddingData } from '../types/wedding';
import confetti from 'canvas-confetti';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface RoyalGateIntroExperienceProps {
  data: WeddingData;
  onOpenComplete?: () => void;
  isOpen?: boolean;
  onReopen?: () => void;
}

export const RoyalGateIntroExperience: React.FC<RoyalGateIntroExperienceProps> = ({
  data,
  onOpenComplete,
  isOpen: externalIsOpen,
  onReopen,
}) => {
  // Phase lifecycle: 'sealed' -> 'opening' -> 'dissolving' -> 'dismissed'
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'dissolving' | 'dismissed'>(
    externalIsOpen ? 'dismissed' : 'sealed'
  );
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const rawBase = import.meta.env.BASE_URL || './';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const videoSrc = `${cleanBase}assets/video/royal_gate_intro.mp4`;
  const audioSrc = `${cleanBase}assets/media/wedding_music.mp3`;

  // Sync external isOpen prop if provided
  useEffect(() => {
    if (externalIsOpen && phase === 'sealed') {
      setPhase('dismissed');
    }
  }, [externalIsOpen, phase]);

  // Handle video ready state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsVideoReady(true);
    if (video.readyState >= 2) {
      setIsVideoReady(true);
    } else {
      video.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const handleStartGateOpening = async () => {
    if (phase !== 'sealed') return;

    // 1. Trigger celebratory golden sparkle confetti
    try {
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F5E6C8', '#C29B38', '#FFFFFF', '#A12D3A'],
        ticks: 200,
        gravity: 0.85,
      });
    } catch {
      // ignore
    }

    // 2. Start audio playback
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((e) => console.warn('Audio waiting for interaction:', e));
    }

    // 3. Enter opening phase: play the palace gate opening video
    setPhase('opening');

    if (videoRef.current) {
      try {
        videoRef.current.muted = true;
        await videoRef.current.play();
      } catch (err) {
        console.warn('Video autoplay restriction, transitioning gracefully:', err);
        // Fallback after 2.5s if video restricted
        setTimeout(handleGateEnded, 2500);
      }
    } else {
      setTimeout(handleGateEnded, 2500);
    }
  };

  const handleGateEnded = () => {
    // 4. Dissolve phase: Video & gate frame dissolves smoothly into the wedding invitation
    setPhase('dissolving');

    setTimeout(() => {
      setPhase('dismissed');
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 850);
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleReopenGate = () => {
    setPhase('sealed');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    if (onReopen) {
      onReopen();
    }
  };

  return (
    <>
      {/* Background Wedding Audio Element (Akash & Rashmi Soundtrack) */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      {/* Floating Royal Music Controller Widget with Animated Equalizer Bars */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center bg-[#1D0C13]/90 text-gold-200 backdrop-blur-md border border-[#D4AF37]/50 rounded-full px-3 sm:px-4 py-2 shadow-2xl space-x-2.5 transition-all hover:scale-105 select-none">
        <button
          onClick={handleToggleAudio}
          type="button"
          aria-label={isMusicPlaying ? 'Pause wedding soundtrack' : 'Play wedding soundtrack'}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 flex items-center justify-center text-gold-300 transition-colors cursor-pointer"
        >
          {isMusicPlaying ? (
            <span className="text-xs font-bold">❚❚</span>
          ) : (
            <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
          )}
        </button>

        {/* Animated 4 Equalizer Bars */}
        <div className="flex items-end space-x-1 h-3.5 sm:h-4 w-5">
          <span
            className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isMusicPlaying ? 'h-3.5 animate-pulse [animation-duration:0.6s]' : 'h-1 opacity-50'
            }`}
          />
          <span
            className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isMusicPlaying ? 'h-4 animate-pulse [animation-duration:0.4s]' : 'h-1 opacity-50'
            }`}
          />
          <span
            className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isMusicPlaying ? 'h-2.5 animate-pulse [animation-duration:0.7s]' : 'h-1 opacity-50'
            }`}
          />
          <span
            className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isMusicPlaying ? 'h-3.5 animate-pulse [animation-duration:0.5s]' : 'h-1 opacity-50'
            }`}
          />
        </div>

        <button
          onClick={handleToggleAudio}
          type="button"
          className="font-serif text-[11px] sm:text-xs tracking-wider uppercase text-gold-200/90 font-medium hidden sm:inline cursor-pointer"
        >
          {isMusicPlaying ? 'Royal Music Playing' : 'Play Royal Music'}
        </button>

        <button
          onClick={handleToggleMute}
          type="button"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="text-gold-400/80 hover:text-gold-200 transition-colors p-1 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Floating Re-play Palace Gate Experience Button */}
      {phase === 'dismissed' && (
        <div className="fixed bottom-16 sm:bottom-20 left-4 sm:left-6 z-40">
          <button
            onClick={handleReopenGate}
            className="px-3.5 py-1.5 rounded-full bg-[#1A0910]/85 text-gold-300/80 hover:text-gold-100 border border-[#D4AF37]/40 shadow-royal hover:scale-105 active:scale-95 transition-all text-[11px] font-sans tracking-wider flex items-center space-x-1.5 backdrop-blur-md cursor-pointer"
            title="Experience Royal Palace Gate Opening Again"
          >
            <span>🏛</span>
            <span>Re-open Palace Gate</span>
          </button>
        </div>
      )}

      {/* Fullscreen Royal Palace Gate Opening Section (Modeled after dilseinvite) */}
      {phase !== 'dismissed' && (
        <section
          role="region"
          aria-label="Royal Palace Gate Opening"
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ${
            phase === 'dissolving'
              ? 'opacity-0 scale-105 blur-md pointer-events-none'
              : 'opacity-100 scale-100 blur-0'
          } bg-[#120406]`}
        >
          {/* Background Palace Gate Video Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              preload="auto"
              muted
              onEnded={handleGateEnded}
              className={`w-full h-full object-cover object-center transform scale-[1.002] transition-opacity duration-700 ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Cinematic Radial Vignette Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-radial-at-c from-black/20 via-[#180509]/75 to-[#0D0204]/95 pointer-events-none transition-opacity duration-1000 ${
                phase === 'opening' ? 'opacity-30' : 'opacity-85'
              }`}
            />
          </div>

          {/* Centered AR Royal Wax Seal Medallion */}
          <div
            onClick={handleStartGateOpening}
            className={`relative z-20 flex flex-col items-center justify-center cursor-pointer select-none text-center transform transition-all duration-700 group ${
              phase === 'opening' || phase === 'dissolving'
                ? 'opacity-0 scale-125 pointer-events-none'
                : 'opacity-100 scale-100'
            }`}
          >
            {/* Pulsating Golden Aura Rings */}
            <div className="absolute -inset-6 rounded-full bg-[#D4AF37]/20 blur-md animate-ping pointer-events-none" />
            <div className="absolute -inset-2 rounded-full bg-[#D4AF37]/35 blur-xs animate-pulse pointer-events-none" />

            {/* Embossed Royal Wax Seal Disc */}
            <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#8C1B2A] via-[#5A0F1B] to-[#2B050B] border-2 sm:border-4 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.45)] group-hover:scale-105 active:scale-95 transition-transform duration-300 relative overflow-hidden">
              {/* Inner Ornamental Rim */}
              <div className="absolute inset-1.5 sm:inset-2.5 rounded-full border border-[#D4AF37]/50 border-dashed pointer-events-none" />

              {/* Traditional Ganesh Motif / Floral Crest */}
              <div className="text-gold-300 text-xs sm:text-sm font-serif tracking-widest uppercase mb-0.5 opacity-90">
                ॥ ॐ ॥
              </div>

              {/* Couple Royal Monogram Initials */}
              <span className="font-serif-royal font-bold text-3xl sm:text-5xl md:text-6xl text-[#FDFBF7] tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                {data.monogram || 'S & K'}
              </span>

              {/* Sub-label */}
              <span className="text-[8px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-gold-300/90 mt-0.5">
                Royal Seal
              </span>
            </div>

            {/* Tap to Open Shimmering Prompt */}
            <div className="mt-4 sm:mt-5 flex items-center space-x-2 text-gold-200 text-xs sm:text-sm font-serif tracking-[0.28em] uppercase font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] animate-bounce">
              <span className="text-gold-400 text-xs">❖</span>
              <span>Tap to Open</span>
              <span className="text-gold-400 text-xs">❖</span>
            </div>

            <p className="text-[10px] sm:text-xs text-cream-200/60 font-sans tracking-widest uppercase mt-1">
              Royal Gate Opening • {data.brideName} &amp; {data.groomName}
            </p>
          </div>

          {/* Bottom Hallmark — Sans-serif font, at bottom, slightly visible not too much slight to be ignored */}
          <div className="absolute bottom-3 sm:bottom-5 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center">
            <p className="font-sans text-[11px] sm:text-xs text-cream-100/55 tracking-[0.2em] uppercase font-normal select-none">
              created by Photographically Yours 2026
            </p>
          </div>
        </section>
      )}
    </>
  );
};
