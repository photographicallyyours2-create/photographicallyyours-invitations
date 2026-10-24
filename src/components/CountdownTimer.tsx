import React, { useState, useEffect } from 'react';
import { RoyalDivider } from './JaaliDecor';
import { Clock } from 'lucide-react';

export type CountdownVariant = 'burgundy' | 'olive' | 'charcoal' | 'navy' | 'sandstone';

interface CountdownTimerProps {
  targetDateIso: string;
  locationHint?: string;
  subtitle?: string;
  variant?: CountdownVariant;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const themeStyles: Record<
  CountdownVariant,
  {
    sectionBg: string;
    cardBg: string;
    cardBorder: string;
    numberColor: string;
    labelColor: string;
    headingColor: string;
    subColor: string;
    cornerColor: string;
  }
> = {
  burgundy: {
    sectionBg: 'bg-jaali-burgundy text-cream-50',
    cardBg: 'bg-burgundy-950/80',
    cardBorder: 'border-gold-500/40 hover:border-gold-400',
    numberColor: 'text-gold-300',
    labelColor: 'text-cream-200/75',
    headingColor: 'text-cream-100',
    subColor: 'text-gold-300/80',
    cornerColor: 'border-gold-400/60',
  },
  olive: {
    sectionBg: 'bg-[#2E3A18] text-[#FAF6EC]',
    cardBg: 'bg-[#1F2810]/85',
    cardBorder: 'border-[#C29B38]/50 hover:border-[#E6CF7A]',
    numberColor: 'text-[#E6CF7A]',
    labelColor: 'text-[#D8A48F]',
    headingColor: 'text-[#FAF6EC]',
    subColor: 'text-[#D8A48F]/90',
    cornerColor: 'border-[#C29B38]/60',
  },
  charcoal: {
    sectionBg: 'bg-[#232B25] text-[#FFFBF5]',
    cardBg: 'bg-[#181F1A]/85',
    cardBorder: 'border-[#7C9D86]/45 hover:border-[#E8927C]',
    numberColor: 'text-[#E8927C]',
    labelColor: 'text-[#C5D7CC]',
    headingColor: 'text-[#FFFBF5]',
    subColor: 'text-[#E8927C]/90',
    cornerColor: 'border-[#7C9D86]/60',
  },
  navy: {
    sectionBg: 'bg-[#0A1526] text-cream-50',
    cardBg: 'bg-[#050C17]/85',
    cardBorder: 'border-gold-500/40 hover:border-gold-400',
    numberColor: 'text-gold-300',
    labelColor: 'text-cream-200/75',
    headingColor: 'text-cream-100',
    subColor: 'text-gold-300/80',
    cornerColor: 'border-gold-400/60',
  },
  sandstone: {
    sectionBg: 'bg-[#4A271E] text-cream-50',
    cardBg: 'bg-[#351912]/85',
    cardBorder: 'border-gold-400/40 hover:border-gold-300',
    numberColor: 'text-[#F3E5AB]',
    labelColor: 'text-[#E8D2CB]',
    headingColor: 'text-cream-100',
    subColor: 'text-[#F3E5AB]/85',
    cornerColor: 'border-gold-400/60',
  },
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateIso,
  locationHint = 'Lake Pichola • Udaipur • Rajasthan',
  subtitle = 'Until The Sacred Pheras at Sunset',
  variant = 'burgundy',
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateIso]);

  const timeUnits = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  const currentTheme = themeStyles[variant] || themeStyles.burgundy;

  return (
    <section className={`py-12 sm:py-16 px-3 sm:px-6 relative overflow-hidden ${currentTheme.sectionBg}`}>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-gold-400">
            Auspicious Moments Await
          </span>
          <Clock className="w-3.5 h-3.5 text-gold-400" />
        </div>

        <h2 className={`font-serif-royal text-2xl sm:text-4xl md:text-5xl font-light tracking-wide mb-2 sm:mb-3 break-words ${currentTheme.headingColor}`}>
          Counting Down to Forever
        </h2>

        <p className={`text-[11px] sm:text-sm font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-5 sm:mb-7 ${currentTheme.subColor}`}>
          {subtitle}
        </p>

        <RoyalDivider dark />

        {/* Numerical Timer Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-6 max-w-2xl mx-auto mt-6 sm:mt-8 countdown-timer-grid">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className={`relative p-2 sm:p-5 rounded-xl sm:rounded-2xl border backdrop-blur-sm shadow-royal flex flex-col items-center justify-center transition-colors duration-300 min-w-0 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
            >
              {/* Corner filigree accents */}
              <div className={`hidden sm:block absolute top-1.5 left-1.5 w-2 h-2 border-t border-l ${currentTheme.cornerColor}`} />
              <div className={`hidden sm:block absolute top-1.5 right-1.5 w-2 h-2 border-t border-r ${currentTheme.cornerColor}`} />
              <div className={`hidden sm:block absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l ${currentTheme.cornerColor}`} />
              <div className={`hidden sm:block absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r ${currentTheme.cornerColor}`} />

              <span className={`countdown-number-digit font-serif-royal text-2xl sm:text-5xl md:text-6xl font-semibold tracking-tight ${currentTheme.numberColor}`}>
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className={`countdown-unit-label text-[9px] sm:text-xs font-sans tracking-wider uppercase mt-1 sm:mt-2 font-medium truncate block max-w-full text-center ${currentTheme.labelColor}`}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {locationHint && (
          <p className="mt-6 sm:mt-8 text-xs font-sans text-gold-300/70 italic tracking-wider px-2">
            {locationHint}
          </p>
        )}
      </div>
    </section>
  );
};
