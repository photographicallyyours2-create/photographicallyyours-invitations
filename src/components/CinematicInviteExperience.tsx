import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WeddingData } from '../types/wedding';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Phone,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface CinematicInviteExperienceProps {
  data: WeddingData;
  isOpen: boolean;
  onClose: () => void;
  autoPlayAudio?: boolean;
}

interface SceneData {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export const CinematicInviteExperience: React.FC<CinematicInviteExperienceProps> = ({
  data,
  isOpen,
  onClose,
  autoPlayAudio = true,
}) => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const rawBase = import.meta.env.BASE_URL || './';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  const audioSrc = `${cleanBase}assets/media/cinematic_invite_audio.mp3`;

  // 8 Exact Visual Scenes Extracted from the Reference Video
  const scenes: SceneData[] = [
    {
      id: 'ganesh',
      image: `${cleanBase}assets/images/cinematic/01_ganesh_entrance.jpg`,
      title: '॥ श्री गणेशाय नमः ॥',
      subtitle: 'Divine Invocations',
    },
    {
      id: 'peacock-crest',
      image: `${cleanBase}assets/images/cinematic/02_peacock_crest.jpg`,
      tag: 'Royal Wedding Celebration',
      title: `${data.groomName} & ${data.brideName}`,
      subtitle: data.weddingDateFormatted,
    },
    {
      id: 'couple-walk',
      image: `${cleanBase}assets/images/cinematic/03_couple_garden_walk.jpg`,
      tag: 'The Cordial Invitation',
      title: 'Two Families, One Sacred Union',
      subtitle: data.quote || 'Destiny brought them together and now love will seal their bond......forever',
    },
    {
      id: 'haldi',
      image: `${cleanBase}assets/images/cinematic/04_haldi_courtyard.jpg`,
      tag: 'Auspicious Turmeric Ritual',
      title: 'Haldi Ceremony',
      subtitle: 'Sunday, 22nd November, 2026 • 11:00 AM',
    },
    {
      id: 'sagan-ring',
      image: `${cleanBase}assets/images/cinematic/05_sangeet_fairy_lights.jpg`,
      tag: 'Ceremony of Rings & Celebrations',
      title: 'Sagan & Ring Ceremony',
      subtitle: 'Friday, 20th November, 2026 • 07:00 PM',
    },
    {
      id: 'baarat',
      image: `${cleanBase}assets/images/cinematic/06_baarat_chariot_fireworks.jpg`,
      tag: 'Turban Rites & Procession',
      title: 'Sehra Bandi & Departure of Barat',
      subtitle: 'Sunday, 22nd November, 2026 • 06:00 PM',
    },
    {
      id: 'wedding-vivah',
      image: `${cleanBase}assets/images/cinematic/07_wedding_mandap_moonlight.jpg`,
      tag: 'The Sacred Seven Vows',
      title: 'Shubh Vivah & Vedic Pheras',
      subtitle: 'Sunday, 22nd November, 2026 • 08:00 PM onwards',
    },
    {
      id: 'rsvp-palace',
      image: `${cleanBase}assets/images/cinematic/08_rsvp_sunset_palace.jpg`,
      tag: 'Cordially Invited',
      title: 'With Best Compliments & RSVP',
      subtitle: 'We eagerly look forward to welcoming you',
    },
  ];

  const TOTAL_SCENES = scenes.length;
  // Scene duration: ~9 seconds per slide (8 scenes * 9.5s = 76s, perfectly matching the 77.5s music track)
  const SCENE_DURATION_MS = 9500;
  const TICK_MS = 100;

  const nextScene = useCallback(() => {
    setCurrentScene((prev) => (prev + 1) % TOTAL_SCENES);
    progressRef.current = 0;
    setProgressPercent(0);
  }, [TOTAL_SCENES]);

  const prevScene = useCallback(() => {
    setCurrentScene((prev) => (prev - 1 + TOTAL_SCENES) % TOTAL_SCENES);
    progressRef.current = 0;
    setProgressPercent(0);
  }, [TOTAL_SCENES]);

  // Audio Playback Lifecycle
  useEffect(() => {
    if (isOpen) {
      if (autoPlayAudio && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setIsAudioPlaying(true))
          .catch((err) => console.warn('Audio auto-play prevented:', err));
      }
      setIsPlaying(true);
      setCurrentScene(0);
      progressRef.current = 0;
      setProgressPercent(0);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  }, [isOpen, autoPlayAudio]);

  // Timer loop for auto-advancing slides
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      progressRef.current += TICK_MS;
      const pct = Math.min(100, (progressRef.current / SCENE_DURATION_MS) * 100);
      setProgressPercent(pct);

      if (progressRef.current >= SCENE_DURATION_MS) {
        nextScene();
      }
    }, TICK_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, nextScene]);

  // Handle Keyboard Arrows and Spacebar
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevScene();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextScene, prevScene, onClose]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  const toggleAudioMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextMuted = !isAudioMuted;
    audioRef.current.muted = nextMuted;
    setIsAudioMuted(nextMuted);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.groomName} & ${data.brideName} Royal Wedding Invitation`,
          text: `You are cordially invited to celebrate the royal wedding of ${data.groomName} & ${data.brideName}!`,
          url: shareUrl,
        });
        return;
      } catch {
        // fall back to copy
      }
    }
    navigator.clipboard.writeText(shareUrl);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Royal E-Invite Experience"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none touch-manipulation animate-fade-in"
    >
      {/* Background Wedding Music Track from Reference Video */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Main 9:16 Vertical Mobile Player Container */}
      <div className="relative w-full h-full max-w-[480px] max-h-[100vh] sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl border-0 sm:border-2 border-[#D4AF37]/50 flex flex-col justify-between bg-[#120406]">
        {/* Top Floating Controls Header */}
        <div className="absolute top-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
          {/* Progress Indicators Bar (Instagram Stories Style) */}
          <div className="flex items-center space-x-1.5 mb-2.5">
            {scenes.map((scene, idx) => {
              let widthStyle = '0%';
              if (idx < currentScene) widthStyle = '100%';
              else if (idx === currentScene) widthStyle = `${progressPercent}%`;

              return (
                <div
                  key={scene.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentScene(idx);
                    progressRef.current = 0;
                    setProgressPercent(0);
                  }}
                  className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden cursor-pointer py-1 -my-1"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6C8] rounded-full transition-all duration-100 ease-linear"
                    style={{ width: widthStyle }}
                  />
                </div>
              );
            })}
          </div>

          {/* Action Icons Row */}
          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#D4AF37] font-semibold bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/40 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Scene {currentScene + 1} of {TOTAL_SCENES}</span>
              </span>

              {/* Animated Equalizer Visualizer */}
              <div className="flex items-end space-x-0.5 h-3.5 w-4.5 px-1 bg-black/40 rounded">
                <span
                  className={`w-0.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                    isAudioPlaying ? 'h-3 animate-pulse [animation-duration:0.6s]' : 'h-1 opacity-40'
                  }`}
                />
                <span
                  className={`w-0.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                    isAudioPlaying ? 'h-3.5 animate-pulse [animation-duration:0.4s]' : 'h-1 opacity-40'
                  }`}
                />
                <span
                  className={`w-0.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                    isAudioPlaying ? 'h-2 animate-pulse [animation-duration:0.7s]' : 'h-1 opacity-40'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              {/* Audio Mute/Unmute */}
              <button
                type="button"
                onClick={toggleAudioMute}
                aria-label={isAudioMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>

              {/* Share Invitation Link */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share Invitation"
                className="w-8 h-8 rounded-full bg-black/50 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close Cinematic Invite"
                className="w-8 h-8 rounded-full bg-black/60 border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center text-gold-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Interactive Canvas: Background Imagery & Typography Overlay */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {scenes.map((scene, index) => {
            const isActive = index === currentScene;
            return (
              <div
                key={scene.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
                  isActive
                    ? 'opacity-100 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                {/* Scene Artwork Image */}
                <img
                  src={scene.image}
                  alt={scene.title || `Scene ${index + 1}`}
                  className="w-full h-full object-cover object-center select-none"
                />

                {/* Subtle Cinematic Shading Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                {/* Dynamic Content Typography per Scene */}
                <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 px-4 sm:px-6 text-center text-white">
                  {/* Scene 0: Lord Ganesha Invocation */}
                  {index === 0 && (
                    <div className="space-y-2.5 animate-fade-in bg-black/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
                      <div className="text-gold-300 text-xs sm:text-sm font-serif tracking-[0.25em] uppercase font-semibold">
                        ॥ श्री गणेशाय नमः ॥
                      </div>
                      <p className="font-serif text-xs sm:text-sm text-gold-100 leading-relaxed font-medium">
                        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br />
                        निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥
                      </p>
                      <p className="font-serif text-[11px] sm:text-xs text-gold-200/90 leading-relaxed italic border-t border-[#D4AF37]/30 pt-2">
                        विघ्न हरण मंगल करण, श्री गणपति महाराज ।<br />
                        प्रथम निमंत्रण आपको, पूरन करियो काज ॥
                      </p>
                    </div>
                  )}

                  {/* Scene 1: Peacock Monogram Crest */}
                  {index === 1 && (
                    <div className="space-y-2 animate-fade-in bg-black/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
                      <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-gold-300">
                        Royal Wedding Invitation
                      </div>
                      <h2 className="font-serif-royal text-2xl sm:text-4xl font-bold text-gold-200">
                        {data.groomName} <span className="font-serif italic text-base sm:text-xl font-light text-gold-400">weds</span> {data.brideName}
                      </h2>
                      <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto my-1" />
                      <p className="font-serif text-xs sm:text-sm text-white/90 tracking-wide">
                        {data.weddingDateFormatted}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-gold-300/80 font-sans tracking-widest uppercase">
                        {data.venueCity}
                      </p>
                    </div>
                  )}

                  {/* Scene 2: Family Invitation & Couple Walk */}
                  {index === 2 && (
                    <div className="space-y-2 animate-fade-in bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl text-left">
                      <div className="text-center">
                        <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-gold-300 block">
                          Cordial Invitation
                        </span>
                        <div className="w-10 h-[1px] bg-[#D4AF37] mx-auto my-1" />
                      </div>
                      <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed text-center font-serif">
                        With the divine blessings of our revered ancestors<br />
                        <span className="font-bold text-gold-200">{data.grandparentsGroom || 'Late Smt. Raj Kumari & Late Sh. Vishnu Bhagwan'}</span>
                      </p>
                      <div className="border-t border-[#D4AF37]/30 pt-2 text-[11px] sm:text-xs text-white/90 space-y-1">
                        <p><strong className="text-gold-300">Arora Family:</strong> {data.parentsGroom}</p>
                        <p><strong className="text-gold-300">Tuteja Family:</strong> {data.parentsBride}</p>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gold-200/80 italic text-center border-t border-[#D4AF37]/30 pt-1.5 font-serif">
                        "{data.quote || 'Destiny brought them together and now love will seal their bond......forever'}"
                      </p>
                    </div>
                  )}

                  {/* Scene 3: Haldi Ceremony */}
                  {index === 3 && (
                    <div className="space-y-2 animate-fade-in bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-yellow-500/50 shadow-2xl">
                      <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs uppercase tracking-widest font-serif border border-yellow-400/40">
                        ॥ Haldi Ceremony ॥
                      </div>
                      <h3 className="font-serif-royal text-xl sm:text-3xl text-yellow-200 font-bold">
                        Auspicious Turmeric &amp; Marigold Rites
                      </h3>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Sunday, 22nd November, 2026 • 11:00 AM onwards
                      </p>
                      <div className="text-[11px] sm:text-xs text-yellow-100/90 border-t border-yellow-500/30 pt-2 font-sans">
                        <p className="font-semibold text-yellow-300">Arora Residence</p>
                        <p className="text-white/80">{data.residenceAddress || 'H. No.- C-96, Moti Nagar, New Delhi-110015'}</p>
                        <p className="text-[10px] text-yellow-200/70 mt-1 italic">Suggested Attire: Festive Haldi Yellows &amp; Marigolds</p>
                      </div>
                    </div>
                  )}

                  {/* Scene 4: Sagan & Ring Ceremony */}
                  {index === 4 && (
                    <div className="space-y-2 animate-fade-in bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
                      <div className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-[10px] sm:text-xs uppercase tracking-widest font-serif border border-[#D4AF37]/40">
                        ॥ Sagan &amp; Ring Ceremony ॥
                      </div>
                      <h3 className="font-serif-royal text-xl sm:text-3xl text-gold-200 font-bold">
                        Ceremony of Rings &amp; Gala Dinner
                      </h3>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Friday, 20th November, 2026
                      </p>
                      <p className="text-[11px] sm:text-xs text-gold-300">
                        07:00 PM: Sagan Ceremony | 09:00 PM: Dinner &amp; Cocktail
                      </p>
                      <div className="text-[11px] sm:text-xs text-gold-100/90 border-t border-[#D4AF37]/30 pt-2 font-sans">
                        <p className="font-semibold text-gold-300">Hotel Surya Grand</p>
                        <p className="text-white/80">Community Centre, J-14, Near MKW Hospital, Rajouri Garden, New Delhi</p>
                        <p className="text-[10px] text-gold-200/70 mt-1 italic">Suggested Attire: Evening Elegance / Cocktail Festive</p>
                      </div>
                    </div>
                  )}

                  {/* Scene 5: Sehra Bandi & Departure of Barat */}
                  {index === 5 && (
                    <div className="space-y-2 animate-fade-in bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-red-500/50 shadow-2xl">
                      <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-[10px] sm:text-xs uppercase tracking-widest font-serif border border-red-400/40">
                        ॥ Sehra Bandi &amp; Barat ॥
                      </div>
                      <h3 className="font-serif-royal text-xl sm:text-3xl text-red-100 font-bold">
                        Turban Rites &amp; Royal Procession
                      </h3>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Sunday, 22nd November, 2026
                      </p>
                      <p className="text-[11px] sm:text-xs text-gold-300">
                        06:00 PM: Sehra Bandi | 07:00 PM: Departure of Barat
                      </p>
                      <div className="text-[11px] sm:text-xs text-white/90 border-t border-red-500/30 pt-2 font-sans">
                        <p className="font-semibold text-gold-300">Arora Residence</p>
                        <p className="text-white/80">C-96, Moti Nagar, New Delhi-110015</p>
                        <p className="text-[10px] text-gold-200/90 mt-1 font-medium bg-red-950/60 p-1.5 rounded border border-red-500/30">
                          Barat will reassemble near Andaaj Mansion Banquet at 8:00 PM &amp; proceed to venue
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Scene 6: Shubh Vivah & Vedic Pheras */}
                  {index === 6 && (
                    <div className="space-y-2 animate-fade-in bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-widest font-serif border border-[#D4AF37]/40">
                        ॥ शुभ विवाह ॥
                      </div>
                      <h3 className="font-serif-royal text-xl sm:text-3xl text-gold-200 font-bold">
                        Varmala, Vedic Pheras &amp; Banquet
                      </h3>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Sunday, 22nd November, 2026
                      </p>
                      <p className="text-[11px] sm:text-xs text-gold-300">
                        08:00 PM: Barat Reassembly | 09:15 PM onwards: Varmala &amp; Vedic Pheras
                      </p>
                      <div className="text-[11px] sm:text-xs text-gold-100/90 border-t border-[#D4AF37]/30 pt-2 font-sans">
                        <p className="font-semibold text-gold-300">Andaaj Mansion Banquet</p>
                        <p className="text-white/80">63, Rama Road, opp. Kirti Nagar Metro Station, New Delhi-110015</p>
                        <p className="text-[10px] text-gold-200/70 mt-1 italic">Suggested Attire: Regal Traditional Indian / Lehengas &amp; Sherwanis</p>
                      </div>
                    </div>
                  )}

                  {/* Scene 7: RSVP & Blessings */}
                  {index === 7 && (
                    <div className="space-y-2 animate-fade-in bg-black/65 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
                      <div className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-gold-300 font-semibold">
                        With Best Compliments From
                      </div>
                      <p className="text-xs sm:text-sm text-gold-100 font-serif">
                        {data.complimentsFrom || 'Narang Family, All Relatives & Friends'}
                      </p>

                      <div className="border-t border-[#D4AF37]/30 pt-2 text-[11px] sm:text-xs space-y-1.5 text-left">
                        <div className="text-center font-bold text-gold-300 uppercase tracking-wider text-[10px]">
                          RSVP &amp; Event Coordination
                        </div>
                        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                          <div>
                            <span className="font-semibold text-white block">Arora Family</span>
                            <span className="text-[11px] text-gold-300">+91 99102 62576</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <a
                              href="tel:+919910262576"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full bg-gold-400 text-black hover:bg-gold-300 transition-colors"
                              title="Call Arora Family"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                            <a
                              href="https://wa.me/919910262576?text=Dear%20Arora%20Family%2C%20heartiest%20congratulations%20on%20Sahil%20%26%20Kajal%27s%20wedding%21%20We%20are%20delighted%20to%20confirm%20our%20presence."
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                              title="WhatsApp Arora Family"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                          <div>
                            <span className="font-semibold text-white block">Makkar Family</span>
                            <span className="text-[11px] text-gold-300">+91 99998 81688</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <a
                              href="tel:+919999881688"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full bg-gold-400 text-black hover:bg-gold-300 transition-colors"
                              title="Call Makkar Family"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                            <a
                              href="https://wa.me/919999881688?text=Dear%20Makkar%20Family%2C%20heartiest%20congratulations%20on%20Sahil%20%26%20Kajal%27s%20wedding%21%20We%20are%20delighted%20to%20confirm%20our%20presence."
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                              title="WhatsApp Makkar Family"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/30 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                          }}
                          className="px-4 py-1.5 rounded-full bg-gold-gradient text-burgundy-950 font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Explore Full Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Left / Right Invisible Tap Zones for Story Navigation */}
          <div
            onClick={prevScene}
            aria-label="Previous Slide"
            className="absolute inset-y-16 left-0 w-1/3 z-20 cursor-pointer touch-manipulation"
          />
          <div
            onClick={nextScene}
            aria-label="Next Slide"
            className="absolute inset-y-16 right-0 w-1/3 z-20 cursor-pointer touch-manipulation"
          />

          {/* Prev/Next Arrow Badges on Hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevScene();
            }}
            aria-label="Previous Slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextScene();
            }}
            aria-label="Next Slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer opacity-70 hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Hallmark — created by Photographically Yours 2026 in sans-serif */}
        <div className="relative z-30 py-2.5 px-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center text-center">
          <p className="font-sans text-[11px] sm:text-xs text-cream-100/55 tracking-[0.2em] uppercase font-normal select-none">
            created by Photographically Yours 2026
          </p>
        </div>

        {/* Copied URL Toast Notification */}
        {copiedNotification && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-[#1A0910] text-[#D4AF37] border border-[#D4AF37] text-xs font-serif shadow-2xl animate-fade-in flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Invitation Link Copied to Clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
