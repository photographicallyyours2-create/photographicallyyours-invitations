import { useState, useEffect } from 'react';
import { getTemplateDefaultData } from './data/weddingData';
import { WeddingData } from './types/wedding';
import { templateRegistry } from './data/templateRegistry';
import { Sliders } from 'lucide-react';

// Studio Website Components
import { StudioNav } from './components/studio/StudioNav';
import { StudioHomePage } from './components/studio/StudioHomePage';
import { StudioFooter } from './components/studio/StudioFooter';
import { TemplateDetailPage } from './components/studio/TemplateDetailPage';
import { EnquiryView } from './components/studio/EnquiryView';
import { CatalogueView } from './components/catalogue/CatalogueView';
import { PreviewToolbar } from './components/catalogue/PreviewToolbar';

// 13 Distinct Interactive Templates
import { RoyalHeirloomTemplate } from './templates/RoyalHeirloomTemplate';
import { MewarMehfilTemplate } from './templates/MewarMehfilTemplate';
import { PalaceCelebrationTemplate } from './templates/PalaceCelebrationTemplate';
import { RegalChronicleTemplate } from './templates/RegalChronicleTemplate';
import { GardenRoyaleTemplate } from './templates/GardenRoyaleTemplate';
import { DesertRoyaleTemplate } from './templates/DesertRoyaleTemplate';
import { ModernEditorialTemplate } from './templates/ModernEditorialTemplate';
import { FloralMinimalTemplate } from './templates/FloralMinimalTemplate';
import { TimelessEditorialTemplate } from './templates/TimelessEditorialTemplate';
import { DestinationEditTemplate } from './templates/DestinationEditTemplate';
import { BodhHeritageTemplate } from './templates/BodhHeritageTemplate';
import { ShlokaRoyaleTemplate } from './templates/ShlokaRoyaleTemplate';
import { PastelCourtyardTemplate } from './templates/PastelCourtyardTemplate';

// Global Helpers
import { AdminEditorDrawer } from './components/AdminEditorDrawer';
import { RoyalGateIntroExperience } from './components/RoyalGateIntroExperience';
import { CinematicInviteExperience } from './components/CinematicInviteExperience';
import { loadAllFromIndexedDB, persistWeddingData, PY_STORAGE_KEY } from './utils/storage';

import savedWeddingDataJson from './data/savedWeddingData.json';

type AppView = 'home' | 'catalogue' | 'template-detail' | 'template' | 'enquire';

const loadSavedData = (): Record<string, WeddingData> => {
  const diskData = (savedWeddingDataJson as Record<string, WeddingData>) || {};
  try {
    const raw = localStorage.getItem(PY_STORAGE_KEY);
    if (raw) {
      const local = JSON.parse(raw);
      return {
        ...diskData,
        ...local,
      };
    }
  } catch (e) {
    console.warn('Could not read saved wedding data from localStorage', e);
  }
  return diskData;
};

export function App() {
  // Store customized data per template ID in state (hydrated by saved disk data, IndexedDB & localStorage)
  const [customizedData, setCustomizedData] = useState<Record<string, WeddingData>>(loadSavedData);
  const [currentView, setCurrentView] = useState<AppView>('template');
  const [activeTemplateId, setActiveTemplateId] = useState<string>('bodh-heritage');
  const [enquiryTemplateId, setEnquiryTemplateId] = useState<string>('bodh-heritage');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCinematicModalOpen, setIsCinematicModalOpen] = useState<boolean>(false);

  // Hydrate permanently saved photos & data from IndexedDB on startup
  useEffect(() => {
    loadAllFromIndexedDB().then((indexedData) => {
      if (indexedData && Object.keys(indexedData).length > 0) {
        setCustomizedData((prev) => ({
          ...prev,
          ...indexedData,
        }));
      }
    });
  }, []);

  const getActiveWeddingData = (): WeddingData => {
    const raw = customizedData[activeTemplateId] || customizedData['bodh-heritage'];
    const defaultData = getTemplateDefaultData(activeTemplateId);
    if (!raw) return defaultData;
    return {
      ...defaultData,
      ...raw,
      brideName: raw.brideName || defaultData.brideName,
      groomName: raw.groomName || defaultData.groomName,
      events: Array.isArray(raw.events) && raw.events.length > 0 ? raw.events : defaultData.events,
      gallery: Array.isArray(raw.gallery) && raw.gallery.length > 0 ? raw.gallery : defaultData.gallery,
      story: Array.isArray(raw.story) && raw.story.length > 0 ? raw.story : defaultData.story,
      shlokas: Array.isArray(raw.shlokas) && raw.shlokas.length > 0 ? raw.shlokas : defaultData.shlokas,
      rsvpContacts: Array.isArray(raw.rsvpContacts) && raw.rsvpContacts.length > 0 ? raw.rsvpContacts : defaultData.rsvpContacts,
    };
  };

  const handleUpdateData = (newData: WeddingData) => {
    const updated = {
      ...customizedData,
      [activeTemplateId]: newData,
    };
    if (
      activeTemplateId === 'bodh-heritage' ||
      newData.brideName === 'Kajal' ||
      newData.groomName === 'Sahil'
    ) {
      updated['bodh-heritage'] = newData;
    }
    setCustomizedData(updated);
    // Save to IndexedDB, LocalStorage, and POST to Vite disk file
    persistWeddingData(activeTemplateId, newData, updated);
  };

  // Synchronize router state with URL hash
  useEffect(() => {
    const parseHash = () => {
      const hostname = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const rawHash = window.location.hash || '#/';
      const decodedHash = decodeURIComponent(rawHash).toLowerCase().trim();

      // Dedicated Cinematic Animated Video Invite Route
      if (
        decodedHash.includes('cinematic') ||
        decodedHash.includes('video') ||
        decodedHash.includes('story') ||
        decodedHash.includes('e-invite')
      ) {
        setActiveTemplateId('bodh-heritage');
        setCurrentView('template');
        setIsCinematicModalOpen(true);
        document.title = 'Sahil & Kajal Animated Wedding Invitation | Photographically Yours';
        return;
      }

      // Clean Subdomain & Client Routes
      // e.g. sahil-kajal.photographicallyyours.com, sahil-kajal.photographicallyyours.in,
      // #/photographicallyyours/sahil&kajal, #/sahil-kajal, /sahil-kajal
      const isSahilKajal =
        hostname.includes('sahil') ||
        hostname.includes('kajal') ||
        pathname.includes('sahil') ||
        pathname.includes('kajal') ||
        decodedHash.includes('photographicallyyours/sahil') ||
        decodedHash.includes('sahil') ||
        decodedHash.includes('kajal');

      if (isSahilKajal) {
        setActiveTemplateId('bodh-heritage');
        setCurrentView('template');
        document.title = 'Sahil & Kajal Wedding Invitation | Photographically Yours';
        return;
      }

      if (
        decodedHash === '#/studio' ||
        decodedHash === '#/home' ||
        decodedHash === '#/photographicallyyours' ||
        decodedHash === '#/py'
      ) {
        setCurrentView('home');
        document.title = 'Photographically Yours | Luxury Bespoke Wedding Invitations';
        return;
      }

      if (rawHash.startsWith('#/template/')) {
        const id = rawHash.replace('#/template/', '').trim();
        const found = templateRegistry.find((t) => t.id === id);
        if (found) {
          setActiveTemplateId(found.id);
          setCurrentView('template');
          if (found.id === 'bodh-heritage') {
            document.title = 'Sahil & Kajal Wedding Invitation | Photographically Yours';
          }
          return;
        }
      }

      if (rawHash.startsWith('#/template-detail/')) {
        const id = rawHash.replace('#/template-detail/', '').trim();
        const found = templateRegistry.find((t) => t.id === id);
        if (found) {
          setActiveTemplateId(found.id);
          setCurrentView('template-detail');
          return;
        }
      }

      if (rawHash.startsWith('#/catalogue')) {
        setCurrentView('catalogue');
        return;
      }

      if (rawHash.startsWith('#/enquire')) {
        const query = rawHash.split('?')[1];
        if (query) {
          const params = new URLSearchParams(query);
          const tpl = params.get('template');
          if (tpl) setEnquiryTemplateId(tpl);
        }
        setCurrentView('enquire');
        return;
      }

      // Default route for all guests (desktop & mobile):
      // Sahil & Kajal Bodh Heritage Royal Wedding Invitation with Palace Gate Opening!
      setActiveTemplateId('bodh-heritage');
      setCurrentView('template');
      document.title = 'Sahil & Kajal Wedding Invitation | Photographically Yours';
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (route: string) => {
    switch (route) {
      case 'home':
        window.location.hash = '#/';
        setCurrentView('home');
        break;
      case 'catalogue':
        window.location.hash = '#/catalogue';
        setCurrentView('catalogue');
        break;
      case 'enquire':
        window.location.hash = `#/enquire${enquiryTemplateId ? `?template=${enquiryTemplateId}` : ''}`;
        setCurrentView('enquire');
        break;
      default:
        window.location.hash = '#/';
        setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInteractiveTemplate = (templateId: string) => {
    setActiveTemplateId(templateId);
    setCurrentView('template');
    window.location.hash = `#/template/${templateId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTemplateDetails = (templateId: string) => {
    setActiveTemplateId(templateId);
    setCurrentView('template-detail');
    window.location.hash = `#/template-detail/${templateId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomizeTemplate = (templateId: string) => {
    setActiveTemplateId(templateId);
    setCurrentView('template');
    setIsAdminOpen(true);
    const route =
      templateId === 'bodh-heritage'
        ? `#/photographicallyyours/sahil-kajal`
        : `#/template/${templateId}`;
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderInteractiveTemplate = () => {
    const currentWeddingData = getActiveWeddingData();
    switch (activeTemplateId) {
      case 'royal-heirloom':
        return (
          <RoyalHeirloomTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'mewar-mehfil':
        return (
          <MewarMehfilTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'palace-celebration':
        return (
          <PalaceCelebrationTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'regal-chronicle':
        return (
          <RegalChronicleTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'garden-royale':
        return (
          <GardenRoyaleTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'desert-royale':
        return (
          <DesertRoyaleTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'modern-editorial':
        return (
          <ModernEditorialTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'floral-minimal':
        return (
          <FloralMinimalTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'timeless-editorial':
        return (
          <TimelessEditorialTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'destination-edit':
        return (
          <DestinationEditTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'bodh-heritage':
        return (
          <BodhHeritageTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onUpdateData={handleUpdateData}
            onWatchCinematic={() => setIsCinematicModalOpen(true)}
          />
        );
      case 'shloka-royale':
        return (
          <ShlokaRoyaleTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      case 'pastel-courtyard':
        return (
          <PastelCourtyardTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
      default:
        return (
          <RoyalHeirloomTemplate
            data={currentWeddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 relative selection:bg-gold-500 selection:text-white flex flex-col justify-between">
      {/* Top Navigation for Studio Pages */}
      {currentView !== 'template' && (
        <StudioNav currentRoute={currentView} onNavigate={handleNavigate} />
      )}

      {/* View Dispatcher */}
      <div className="flex-1">
        {currentView === 'home' && (
          <StudioHomePage
            onNavigate={handleNavigate}
            onSelectInteractiveTemplate={handleSelectInteractiveTemplate}
            onViewTemplateDetails={handleViewTemplateDetails}
            onCustomizeTemplate={handleCustomizeTemplate}
          />
        )}

        {currentView === 'catalogue' && (
          <CatalogueView
            onSelectTemplate={handleSelectInteractiveTemplate}
            onViewDetails={handleViewTemplateDetails}
            onCustomize={handleCustomizeTemplate}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'template-detail' && (
          <TemplateDetailPage
            templateId={activeTemplateId}
            weddingData={getActiveWeddingData()}
            onNavigate={handleNavigate}
            onSelectInteractiveTemplate={handleSelectInteractiveTemplate}
            onOpenEnquiryWithTemplate={handleCustomizeTemplate}
          />
        )}

        {currentView === 'enquire' && (
          <EnquiryView
            initialTemplateId={enquiryTemplateId}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'template' && (
          <div className="min-h-screen flex flex-col">
            {/* Studio Preview Toolbar */}
            <PreviewToolbar
              currentTemplateId={activeTemplateId}
              onSelectTemplate={handleSelectInteractiveTemplate}
              onBackToCatalogue={() => handleNavigate('catalogue')}
              onOpenAdmin={() => setIsAdminOpen(true)}
              viewportMode={viewportMode}
              onToggleViewport={setViewportMode}
            />

            {/* Template Container Canvas */}
            <main className="flex-1 w-full bg-cream-200/50">
              {viewportMode === 'mobile' ? (
                /* Simulated Mobile Device Frame */
                <div className="py-3 sm:py-8 px-1 sm:px-4 flex justify-center items-center">
                  <div className="w-full max-w-[420px] rounded-2xl sm:rounded-[44px] overflow-hidden shadow-2xl border-2 sm:border-[8px] border-burgundy-950 bg-cream-50 relative">
                    <div className="h-3.5 sm:h-5 bg-burgundy-950 flex items-center justify-center">
                      <div className="w-14 sm:w-20 h-1.5 sm:h-3 bg-burgundy-900 rounded-full" />
                    </div>
                    <div className="max-h-[85vh] overflow-y-auto simulated-mobile-canvas">
                      {renderInteractiveTemplate()}
                    </div>
                  </div>
                </div>
              ) : (
                /* Full-Width Desktop Canvas */
                <div className="w-full">{renderInteractiveTemplate()}</div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Floating Action Button to Edit Content & Imagery on Interactive Views */}
      {currentView === 'template' && (
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gold-gradient text-burgundy-950 font-serif font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-gold-400 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer group"
          title="Customize & Edit Event Details or Images"
        >
          <Sliders className="w-4 h-4 text-burgundy-900 group-hover:rotate-45 transition-transform" />
          <span>Customize &amp; Edit Details</span>
        </button>
      )}

      {/* Professional Studio Footer for Studio Pages */}
      {currentView !== 'template' && (
        <StudioFooter onNavigate={handleNavigate} />
      )}

      {/* Admin Content Customization Drawer */}
      <AdminEditorDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={getActiveWeddingData()}
        activeTemplateId={activeTemplateId}
        onUpdateData={handleUpdateData}
      />

      {/* Interactive Royal Palace Gate Opening Experience with Dissolve Transition & Wedding Track */}
      {currentView === 'template' && (
        <RoyalGateIntroExperience
          data={getActiveWeddingData()}
          onWatchCinematic={() => setIsCinematicModalOpen(true)}
        />
      )}

      {/* Dedicated Fullscreen Cinematic Animated E-Invite Experience Modal */}
      <CinematicInviteExperience
        data={getActiveWeddingData()}
        isOpen={isCinematicModalOpen}
        onClose={() => setIsCinematicModalOpen(false)}
      />
    </div>
  );
}

export default App;
