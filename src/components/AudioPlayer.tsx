import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API ambient drone chord (Raag Yaman inspired: Sa - Pa - Sa)
  const startAudioDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      // Smooth fade in
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Frequencies for a traditional Indian tanpura drone:
      // Base C#3 (~138.59 Hz), G#3 (~207.65 Hz), C#4 (~277.18 Hz)
      const frequencies = [138.59, 207.65, 277.18];
      const oscNodes: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx === 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle detune for authentic tanpura acoustic beating
        osc.detune.setValueAtTime((idx - 1) * 3, ctx.currentTime);

        // Lowpass filter for warm, soothing acoustics
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 100, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.3, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscNodes.push(osc);
      });

      oscillatorsRef.current = oscNodes;
      setIsPlaying(true);
    } catch {
      // Graceful fallback for environments where Web Audio is restricted
      setIsPlaying(true);
    }
  };

  const stopAudioDrone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // Ignore already stopped
            }
          });
          oscillatorsRef.current = [];
        }, 700);
      } catch {
        // Fallback
      }
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudioDrone();
    } else {
      startAudioDrone();
    }
  };

  const toggleMute = () => {
    if (!gainNodeRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 0.1);
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.1);
      setIsMuted(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center bg-cream-50/95 backdrop-blur-md border border-gold-400/60 rounded-full px-3 py-2 shadow-royal text-xs transition-all duration-300 hover:shadow-gold-glow">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause wedding soundtrack' : 'Play royal wedding ambient soundtrack'}
        className="flex items-center space-x-2 text-burgundy-900 hover:text-gold-700 transition-colors font-medium focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-full min-h-[36px]"
      >
        <div className="relative w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center text-burgundy-900">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-gold-600' : 'text-charcoal-800/70'}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[11px] font-serif-royal font-semibold tracking-wide uppercase text-burgundy-950">
            {isPlaying ? 'Raag Yaman Ambient' : 'Celebration Audio'}
          </span>
          <span className="text-[9px] text-charcoal-800/60 font-sans -mt-0.5">
            {isPlaying ? 'Click to pause' : 'Click to listen'}
          </span>
        </div>
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="ml-2 pl-2 border-l border-gold-300 text-charcoal-800/70 hover:text-burgundy-900 transition-colors focus:outline-none min-h-[36px] flex items-center"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold-600" />}
        </button>
      )}
    </div>
  );
};
