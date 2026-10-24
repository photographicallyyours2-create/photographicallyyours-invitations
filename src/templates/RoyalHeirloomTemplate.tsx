import React, { useRef } from 'react';
import { WeddingData } from '../types/wedding';
import { HeroInvitation } from '../components/HeroInvitation';
import { WelcomeStory } from '../components/WelcomeStory';
import { CountdownTimer } from '../components/CountdownTimer';
import { EventsSchedule } from '../components/EventsSchedule';
import { PhotoGallery } from '../components/PhotoGallery';
import { RsvpSection } from '../components/RsvpSection';
import { Footer } from '../components/Footer';

interface RoyalHeirloomTemplateProps {
  data: WeddingData;
  onOpenAdmin: () => void;
}

export const RoyalHeirloomTemplate: React.FC<RoyalHeirloomTemplateProps> = ({
  data,
  onOpenAdmin,
}) => {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-cream-100 text-charcoal-800 relative selection:bg-gold-500 selection:text-white">
      {/* 1. Royal Opening Arch Invitation */}
      <HeroInvitation
        data={data}
        onOpenInvitation={handleOpenInvitation}
        isOpened={isOpened}
      />

      {/* Main Celebration Content Unfolded */}
      <div ref={mainContentRef} className="relative">
        {/* 2. Welcome & Couple Story */}
        <WelcomeStory data={data} />

        {/* 3. Auspicious Countdown */}
        <CountdownTimer targetDateIso={data.weddingDateIso} />

        {/* 4. Multi-Day Wedding Events Schedule */}
        <EventsSchedule events={data.events} />

        {/* 5. Pre-Wedding Photography Gallery & Lightbox */}
        <PhotoGallery photos={data.gallery} />

        {/* 6. Guest RSVP with Validation & WhatsApp Share */}
        <RsvpSection data={data} />

        {/* 7. Tasteful Closing Footer */}
        <Footer
          data={data}
          onOpenAdmin={onOpenAdmin}
          onScrollToTop={handleScrollToTop}
        />
      </div>
    </div>
  );
};
